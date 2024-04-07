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
// import {
//   USER_STATUS_CLASS,
//   USER_STATUS_TEXT,
// } from "../components/TableVariables";
import { useContext } from "react";
import Context from "../ContextProvider";
import AntPopover from "../components/AntPopver";
import "../index.css";
import AddNewUser from "../components/AddNewUser";
import UpdateUser from "../components/UpdateUser";

function Users(props) {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});
  const [sortParams, setSortParams] = useState({});
  const [queryParams, setQueryParams] = useState();
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const { setIsModalOpen, isModalOpen } = useContext(Context);
  const searchInput = useRef(null);

  const fetchUsers = async (page = 1, filters, sorter) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/users", {
        params: { page, filters, sorter },
      });
      console.log(res);
      const { data, pagination, queryParams } = res?.data?.users;
      setUsers(data);
      setLoading(false);
      setQueryParams(queryParams && queryParams);
      setPagination({
        current: pagination?.current_page,
        pageSize: pagination?.per_page,
        total: pagination?.total,
      });
    } catch (error) {
      console.log("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    fetchUsers();
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

  const userEditHandler = () => {};

  const userDeleteHandler = async (userId) => {
    // if (!window.prompt("Are you sure to want to delete this user")) {
    //   return;
    // }
    // console.log(user.id);
    try {
      const res = await axiosClient.delete(`/users/${userId}`);
      const {data} = res;
      if(data?.success === "deleted user successfully"){
        console.log(data);
        fetchUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTableChange = (pagination, filters, sorter) => {
    fetchUsers(pagination.current, filters, sorter);
  };

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
      render: (text, user) => (
          <AntPopover>
            <span className="text-center font-bold">{text}</span>
          </AntPopover>
      ),
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
      render: (text, user) => (
          <AntPopover>{text}</AntPopover>
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
      title: "ACTIONS",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <NavLink to={`/user/update/${record.id}`}>
            <Button type="primary" size="small">
              Edit
            </Button>
          </NavLink>
          <Button
            type="primary"
            danger
            size="small"
            onClick={(e) => userDeleteHandler(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <PageComponent
      heading="Users"
      addNewButton={
        <NavLink to={"/user/create"}>
          <Button
            type="primary"
            size="large"
            icon={<PlusCircleOutlined />}
          >
            Add New User
          </Button>
        </NavLink>
      }
    >
      <>
        {/* {isModalOpen.modalForCreateUser && <AddNewUser />} */}
        <div className="overflow-auto">
          <Table
            className="custom-table"
            loading={loading}
            sticky
            columns={columns}
            dataSource={users}
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

export default Users;
