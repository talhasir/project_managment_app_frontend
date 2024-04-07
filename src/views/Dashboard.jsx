import { useContext, useEffect, useState } from "react";
import { Card } from "antd";
import context from "../ContextProvider";
import PageComponent from "../Layouts/ViewLayout";
import TasksTable from "../components/TasksTable";
import axiosClient from "../axiosClient";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({});
  const [loading, setLoading] = useState(false);
  const [tasksCount, setTasksCount] = useState({});

  const fetchTasks = async (page = 1, filters, sorter) => {
    setLoading(true);
    // debugger
    try {
      const res = await axiosClient.get("/dashboard", {
        params: { page, filters, sorter },
      });
      const { data, task_counts, pagination } = res?.data?.tasks;
      setTasks(data);
      console.log(res);
      setTasksCount({...task_counts});
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

  const cardStyle = {
    border: "1px solid #E8E4E4",
    borderRadius: "5px", // Optionally, set border radius
  };

  return (
    <>
      <PageComponent heading="Dashboard">
        <div className="grid grid-cols-3 gap-3">
          <Card hoverable style={cardStyle} loading={loading}>
            <span className="text-3xl font-bold text-amber-500">
              Pending Tasks
            </span>
            <div className="mt-2 flex text-lg">
              <span className="mr-1">{tasksCount?.pending_tasks}</span>/
              <span className="ml-1">{tasksCount?.total_pending_tasks}</span>
            </div>
          </Card>
          <Card hoverable style={cardStyle} loading={loading}>
            <span className="text-3xl font-bold text-blue-500">
              In Progress Tasks
            </span>
            <div className="mt-2 flex text-lg">
              <span className="mr-1">{tasksCount?.in_process_tasks}</span>/
              <span className="ml-1">{tasksCount?.total_in_process_tasks}</span>
            </div>
          </Card>
          <Card hoverable style={cardStyle} loading={loading}>
            <span className="text-3xl font-bold text-green-500">
              Completed Tasks
            </span>
            <div className="mt-2 flex text-lg">
              <span className="mr-1">{tasksCount?.completed_tasks}</span>/
              <span className="ml-1">{tasksCount?.total_completed_tasks}</span>
            </div>
          </Card>
        </div>
        <div className="font-bold block w-full text-3xl text-gray-700 text-center mt-8 mb-4">
            Active Tasks Assigned To Me
          </div>
        <div>
          <TasksTable
            tasks={tasks}
            pagination={pagination}
            loading={loading}
            fetchTasks={fetchTasks}
            flag="dashboardTable"
          />
        </div>
      </PageComponent>
    </>
  );
}
