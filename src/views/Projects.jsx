import { useEffect, useState } from "react";
import PageComponent from "../Layouts/ViewLayout";
import { Button, Input, Pagination, Popover, Space, Table, Tag } from "antd";
import axiosClient from "../axiosClient";

function Projects(props) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  console.log(pagination);
  const fetchProjects = async (page = 1) => {
    setLoading(true);
    try {
      const res = await axiosClient.get(`/projects?page=${page}`);
      const { data } = res?.data?.projects;
      setProjects(data);
      setLoading(false);
      console.log(res);
      setPagination({
        current: res?.data?.projects?.current_page,
        pageSize: res?.data?.projects?.per_page,
        total: res?.data?.projects?.total,
      });
    } catch (error) {
      console.log("Error fetching projects:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const STATUS_TEXT = {
    completed: "Completed",
    pending: "Pending",
    in_process: "In Process",
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => <span>{text}</span>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
      render: (text) => <span>{STATUS_TEXT[text]}</span>,
    },
    {
      title: "CREATE DATE",
      dataIndex: "create_date",
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
      dataIndex: "createdBy",
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
    fetchProjects(pagination.current);
  };

  return (
    <PageComponent heading="Projects">
      <div>
        <Input placeholder="search"/>
        <Table
          loading={loading}
          bordered
          sticky
          columns={columns}
          dataSource={projects}
          pagination={pagination}
          onChange={handleTableChange}
        />
      </div>
    </PageComponent>
  );
}

export default Projects;
