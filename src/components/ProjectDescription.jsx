import React, { useEffect, useState } from "react";
import { Badge, Card, Descriptions, Space } from "antd";
import PageComponent from "../Layouts/ViewLayout";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { PORJECT_STATUS_CLASS, PORJECT_STATUS_TEXT } from "./TableVariables";
import DiscriptionPoper from "./AntPopver";
import TasksTable from "./TasksTable";
import AntPopover from "./AntPopver";

export default function ProjectDescription() {
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const fetchTasks = async (page = 1, filters, sorter) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/project-assciated-tasks", {
        params: { page, filters, sorter, id },
      });
      const { data, pagination } = res?.data?.tasks;
      setTasks(data);
      setLoading(false);
      setPagination({
        current: pagination?.current_page,
        pageSize: pagination?.per_page,
        total: pagination?.total,
      });
    } catch (error) {
      setLoading(false);
      console.log("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchProject = async (id) => {
    try {
      const res = await axiosClient.get(`/projects/${id}`);
      const { project } = res?.data;
      console.log(res);
      setProject(project);
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const items = project
    ? [
        {
          label: <span className="font-bold">ID</span>,
          children: project.id,
        },
        {
          label: <span className="font-bold">NAME</span>,
          children: <AntPopover>{project.name}</AntPopover>,
        },
        {
          label: <span className="font-bold">STATUS</span>,
          children: 
          <span
          className={`text-white py-1 px-2 text-xs rounded-md ${
            PORJECT_STATUS_CLASS[project.status]
          }`}
        >
          {PORJECT_STATUS_TEXT[project.status]}
        </span>
        },
        {
          label: <span className="font-bold">CREATION DATE</span>,
          children: project.created_at,
        },
        {
          label: <span className="font-bold">DUE DATE</span>,
          children: project.due_date,
        },
        {
          label: <span className="font-bold">DESCRIPTION</span>,
          children: <DiscriptionPoper>{project.description}</DiscriptionPoper>,
        },
        {
          label: <span className="font-bold">CREATOR ID</span>,
          children: project.created_by,
        },
      ]
    : [];

  return (
    <PageComponent heading={"Project Detials"}>
        <Card
          hoverable
          cover={
            <img
              alt="image"
              src={project?.image_path}
              className="w-3"
              style={{ height: "200px" }}
            />
          }
        >
          <Descriptions title="Project Info" bordered items={items} />
          <div className="font-bold block w-full text-2xl text-center my-5 underline">
            Tasks Assigned To This Project
          </div>
        <TasksTable
          tasks={tasks}
          pagination={pagination}
          loading={loading}
          fetchTasks={fetchTasks}
        />
        </Card>
    </PageComponent>
  );
}
