import { useRef, useState } from "react";
import { Button, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  TASK_PRIORITY_CLASS,
  TASK_PRIORITY_TEXT,
  TASK_STATUS_CLASS,
  TASK_STATUS_TEXT,
} from "./TableVariables";
import { NavLink } from "react-router-dom";
import "../index.css";
import Popover from "./AntPopver";
import AntPopover from "./AntPopver";
import axiosClient from "../axiosClient";

function TasksTable({ children, tasks, pagination, loading, fetchTasks, flag }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    fetchTasks();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <>
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: "block",
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      </>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleTableChange = (pagination, filters, sorter) => {
    fetchTasks(pagination.current, filters, sorter);
  };
  const taskDeleteHandler = async (taskId) => {
    // debugger
      try {
        const res = await axiosClient.delete(`/tasks/${taskId}`);
        const { data } = res;
        if (data?.success) {
          fetchTasks();
        }
      } catch (error) {
        console.log(error);
      }
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "PROJECTS NAME",
      dataIndex: "projects_id",
      key: "projects_id",
      ...getColumnSearchProps("projects_id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (text, task) => (
        <NavLink
          to={`/task/detials/${task.id}`}
          className="font-bold hover:underline"
        >
          <AntPopover>{text}</AntPopover>
        </NavLink>
      ),
    },
    {
      title: "IMAGE",
      dataIndex: "image_path",
      key: "image_path",
      render: (text) => (
        <div className="flex justify-center items-center">
          <img src={text} alt="Image" className="w-12 h-auto" />
        </div>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Completed",
          value: "completed",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "In Process",
          value: "in_process",
        },
      ],
      render: (text) => (
        <span
          className={`text-white py-1 px-2 text-xs rounded-md ${TASK_STATUS_CLASS[text]}`}
        >
          {TASK_STATUS_TEXT[text]}
        </span>
      ),
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      filters: [
        {
          text: "Low",
          value: "low",
        },
        {
          text: "Medium",
          value: "medium",
        },
        {
          text: "High",
          value: "high",
        },
      ],
      render: (text) => (
        <span
          className={`text-white py-1 px-2 text-xs rounded-md ${TASK_PRIORITY_CLASS[text]}`}
        >
          {TASK_PRIORITY_TEXT[text]}
        </span>
      ),
    },
    {
      title: "TO ASSIGNED",
      dataIndex: "assigned_user_id",
      key: "assigned_user_id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "CREATE DATE",
      dataIndex: "created_at",
      key: "create_date",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "DUE DATE",
      dataIndex: "due_date",
      key: "due_date",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "DESCRIPTION",
      dataIndex: "description",
      key: "description",
      render: (text) => <AntPopover>{text}</AntPopover>,
    },
    {
      title: "CREATED BY",
      dataIndex: "created_by",
      key: "createdBy",
      ...getColumnSearchProps("created_by"),
    },
    {
      title: "ACTIONS",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/task/update/${record.id}`}>
            <Button type="primary" size="small">
              Edit
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            size="small"
            onClick={(e) => taskDeleteHandler(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const dashboardTaskCols = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "PROJECTS NAME",
      dataIndex: "projects_id",
      key: "projects_id",
      ...getColumnSearchProps("projects_id"),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (text, task) => (
        <NavLink
          to={`/task/detials/${task.id}`}
          className="font-bold hover:underline"
        >
          <AntPopover>{text}</AntPopover>
        </NavLink>
      ),
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Completed",
          value: "completed",
        },
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "In Process",
          value: "in_process",
        },
      ],
      render: (text) => (
        <span
          className={`text-white py-1 px-2 text-xs rounded-md ${TASK_STATUS_CLASS[text]}`}
        >
          {TASK_STATUS_TEXT[text]}
        </span>
      ),
    },
    {
      title: "DUE DATE",
      dataIndex: "due_date",
      key: "due_date",
      render: (text) => <span>{text}</span>,
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "CREATED BY",
      dataIndex: "created_by",
      key: "createdBy",
      ...getColumnSearchProps("created_by"),
    },
    {
      title: "ACTIONS",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/task/update/${record.id}`}>
            <Button type="primary" size="small">
              Edit
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            size="small"
            onClick={(e) => taskDeleteHandler(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="overflow-auto">
      <Table
        className="custom-table"
        loading={loading}
        sticky
        columns={flag=== 'dashboardTable'?dashboardTaskCols:columns}
        dataSource={tasks}
        pagination={pagination}
        onChange={handleTableChange}
        bordered
      >
        {children}
      </Table>
    </div>
  );
}

export default TasksTable;
