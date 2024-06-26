import React, { useEffect } from "react";
import { useState } from "react";
import TasksTable from "../components/TasksTable";
import PageComponent from "../Layouts/ViewLayout";
import axiosClient from "../axiosClient";
import { NavLink } from "react-router-dom";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

function Tasks(props) {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);

  const fetchTasks = async (page = 1, filters, sorter) => {
    setLoading(true);
    try {
      const res = await axiosClient.get("/tasks", {
        params: { page, filters, sorter },
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

  console.log(tasks);
  return (
    <PageComponent
      heading="Tasks"
      addNewButton={
        <NavLink to={"/task/create"}>
          <Button type="primary" size="large" icon={<PlusCircleOutlined />}>
            Add New Task
          </Button>
        </NavLink>
      }
    >
      <TasksTable
        tasks={tasks}
        pagination={pagination}
        loading={loading}
        fetchTasks={fetchTasks}
      />
    </PageComponent>
  );
}

export default Tasks;
