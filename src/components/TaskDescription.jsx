import React, { useEffect, useState } from "react";
import { Badge, Card, Descriptions, Space } from "antd";
import PageComponent from "../Layouts/ViewLayout";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import {
  TASK_STATUS_TEXT,
  TASK_STATUS_CLASS,
  TASK_PRIORITY_TEXT,
  TASK_PRIORITY_CLASS,
} from "./TableVariables";
import DiscriptionPoper from "./AntPopver";
import TasksTable from "./TasksTable";
import AntPopover from "./AntPopver";

export default function TaskDescription() {
  const [task, setTask] = useState([]);
  const { id } = useParams();

  const fetchTask = async (id) => {
    try {
      const res = await axiosClient.get(`/tasks/${id}`);
      const { task } = res?.data;
      console.log(res);
      setTask(task);
    } catch (error) {
      console.log("Error fetching task:", error);
    }
  };

  useEffect(() => {
    fetchTask(id);
  }, [id]);

  const items = task
    ? [
        {
          label: <span className="font-bold">ID</span>,
          children: task.id,
        },
        {
          label: <span className="font-bold">NAME</span>,
          children: <AntPopover>{task.name}</AntPopover>,
        },
        {
          label: <span className="font-bold">PROJECT NAME</span>,
          children: <AntPopover>{task.projects_id}</AntPopover>,
        },
        {
          label: <span className="font-bold">ASSIGNED USER</span>,
          children: <AntPopover>{task.assigned_user_id}</AntPopover>,
        },
        {
          label: <span className="font-bold">STATUS</span>,
          children: (
            <span
              className={`text-white py-1 px-2 text-xs rounded-md ${
                TASK_STATUS_CLASS[task.status]
              }`}
            >
              {TASK_STATUS_TEXT[task.status]}
            </span>
          ),
        },
        {
          label: <span className="font-bold">PRIORITY</span>,
          children: (
            <span
              className={`text-white py-1 px-2 text-xs rounded-md ${
                TASK_PRIORITY_CLASS[task.priority]
              }`}
            >
              {TASK_PRIORITY_TEXT[task.priority]}
            </span>
          ),
        },
        {
          label: <span className="font-bold">CREATION DATE</span>,
          children: task.created_at,
        },
        {
          label: <span className="font-bold">DUE DATE</span>,
          children: task.due_date,
        },
        {
          label: <span className="font-bold">DESCRIPTION</span>,
          children: <DiscriptionPoper>{task.description}</DiscriptionPoper>,
        },
        {
          label: <span className="font-bold">CREATOR ID</span>,
          children: task.created_by,
        },
      ]
    : [];

  return (
    <PageComponent heading={"Task Detials"}>
      <Card
        hoverable
        cover={
          <img
            alt="image"
            src={task?.image_path}
            className="w-3"
            style={{ height: "200px" }}
          />
        }
      >
        <Descriptions title="Task Info" bordered items={items} />
        {/* <div className="font-bold block w-full text-2xl text-center my-5 underline">
            Tasks Assigned To This Task
          </div> */}
        {/* <TasksTable
          tasks={tasks}
          pagination={pagination}
          loading={loading}
          fetchTasks={fetchTasks}
        /> */}
      </Card>
    </PageComponent>
  );
}
