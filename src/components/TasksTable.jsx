import { useRef, useState } from "react";
import { Button, Input, Popover, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  TASK_PRIORITY_CLASS,
  TASK_PRIORITY_TEXT,
  TASK_STATUS_CLASS,
  TASK_STATUS_TEXT,
} from "./TableVariables";
import { NavLink } from "react-router-dom";

function TasksTable({ children, tasks, pagination, loading, fetchTasks }) {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  console.log(tasks);
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
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "PROJECTS NAME",
      dataIndex: "project_name",
      key: "project_name",
      ...getColumnSearchProps("project_name"),
      render: (text) => (
        <NavLink className="font-bold hover:underline">{text}</NavLink>
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "IMAGE",
      dataIndex: "image_path",
      key: "image_path",
      render: (text) => <img src={text} alt="Image" className="w-12 h-auto" />,
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
      dataIndex: "to_assigned",
      key: "to_assigned",
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
      render: (text) => (
        <Popover
          content={<span style={{ whiteSpace: "wrap" }}>{text}</span>}
          style={{ width: 300 }}
        >
          <div
            style={{
              width: 100,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            {text}
          </div>
        </Popover>
      ),
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
          <Button type="primary" size="small">
            Edit
          </Button>
          <Button type="primary" danger size="small">
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    fetchTasks(pagination.current, filters, sorter);
  };

  return (
    <div className="overflow-auto">
      <Table
        loading={loading}
        sticky
        columns={columns}
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
