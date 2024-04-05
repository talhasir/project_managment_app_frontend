import { useEffect, useRef, useState } from "react";
import PageComponent from "../Layouts/ViewLayout";
import { Button, Input, Popover, Space, Table, Select } from "antd";
import axiosClient from "../axiosClient";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";
import {
  PlusCircleFilled,
  PlusCircleOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  PORJECT_STATUS_CLASS,
  PORJECT_STATUS_TEXT,
} from "../components/TableVariables";
import { useContext } from "react";
import Context from "../ContextProvider";
import AntPopover from "../components/AntPopver";
import "../index.css";
import AddNewProject from "../components/AddNewProject";

function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [sortParams, setSortParams] = useState({});
  const [queryParams, setQueryParams] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

  const fetchProjects = async (page = 1, filters, sorter) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/projects", {
        params: { page, filters, sorter },
      });
      const { data, pagination, queryParams } = res?.data?.projects;
      setProjects(data);
      setLoading(false);
      setQueryParams(queryParams && queryParams);
      setPagination({
        current: pagination?.current_page,
        pageSize: pagination?.per_page,
        total: pagination?.total,
      });
    } catch (error) {
      console.log("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    fetchProjects();
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

  const { setIsModalOpen, isModalOpen } = useContext(Context);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span className="font-bold">{text}</span>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
      render: (text, project) => (
        <NavLink
          to={`/projects/${project?.id}`}
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
          className={`text-white py-1 px-2 text-xs rounded-md ${PORJECT_STATUS_CLASS[text]}`}
        >
          {PORJECT_STATUS_TEXT[text]}
        </span>
      ),
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

  const handleTableChange = (pagination, filters, sorter) =>
    fetchProjects(pagination.current, filters, sorter);
  console.log(isModalOpen);
  return (
    <PageComponent
      heading="Projects"
      addNewButtProj={
        <Button
          type="primary"
          size="large"
          icon={<PlusCircleOutlined />}
          onClick={() => setIsModalOpen(true)}
        >
          Add New Project
        </Button>
      }
    >
      <>
        {isModalOpen === true && <AddNewProject />}
        <div className="overflow-auto">
          <Table
            className="custom-table"
            loading={loading}
            sticky
            columns={columns}
            dataSource={projects}
            pagination={pagination}
            onChange={handleTableChange}
            bordered
          />
        </div>
      </>
      <Outlet />
    </PageComponent>
  );
}

export default Projects;
