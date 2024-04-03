import { useEffect, useRef, useState } from "react";
import PageComponent from "../Layouts/ViewLayout";
import { Button, Input, Popover, Space, Table, Select } from "antd";
import axiosClient from "../axiosClient";
import { useSearchParams } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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

  useEffect(() => {
    // debugger;
    if (searchParams) {
      handleTableChange("", searchParams, sortParams);
      // setSortParams({
      //   sortField: "name",
      //   sortDirection: "asc",
      // });
    }
  }, [searchParams]);

  const PORJECT_STATUS_TEXT = {
    completed: "Completed",
    pending: "Pending",
    in_process: "In Process",
  };
  const PORJECT_STATUS_CLASS = {
    completed: " bg-green-500",
    pending: " bg-amber-500",
    in_process: " bg-blue-500",
  };
  const TASK_STATUS_TEXT = {
    completed: "Completed",
    pending: "Pending",
    in_process: "In Process",
  };
  const TASK_STATUS_CLASS = {
    completed: "Completed",
    pending: "Pending",
    in_process: "In Process",
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
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
      title: "NAME",
      dataIndex: "name",
      key: "name",
      showSorterTooltip: {
        target: "full-header",
      },
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
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
    },
    {
      title: "DUE DATE",
      dataIndex: "due_date",
      key: "due_date",
      render: (text) => <span>{text}</span>,
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
    fetchProjects(pagination.current, filters, sorter);
    console.log(filters);
  };

  const SELECT_STATUS_OPTIONS = [
    { lable: "Completed", value: "completed" },
    { lable: "Pending", value: "pending" },
    { lable: "In Process", value: "in_process" },
  ];

  return (
    <PageComponent heading="Projects">
      <>
        <div className="grid grid-cols-10 my-3 gap-3">
          <Input
            placeholder="Search By Name"
            name="search"
            size="large"
            className="col-span-3"
            value={queryParams?.search}
            onChange={(e) =>
              setSearchParams({ ...searchParams, search: e.target.value })
            }
            // onKeyDown={(e) =>
            //   e.key === "Enter" ? fetchProjects("", searchParams) : ""
            // }
          />
          <Select
            defaultValue={"Filter By Status"}
            size="large"
            className="col-span-2"
            options={SELECT_STATUS_OPTIONS}
            value={queryParams?.select}
            onChange={(value) =>
              setSearchParams({ ...searchParams, select: value })
            }
          />
          <Button
            type="primary"
            size="large"
            onClick={() => {
              setQueryParams({});
              setSearchParams({});
            }}
          >
            Reset
          </Button>
        </div>
        <div className="overflow-auto">
          <Table
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
    </PageComponent>
  );
}

export default Projects;
