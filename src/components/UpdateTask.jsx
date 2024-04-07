import { useEffect, useRef, useState } from "react";
import PageComponent from "../Layouts/ViewLayout";
import { Button, Input, Popover, Space, Table, Select } from "antd";
import axiosClient from "../axiosClient";
import { NavLink, useSearchParams, Outlet } from "react-router-dom";
import { PlusCircleOutlined, SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  TASK_STATUS_TEXT,
  TASK_STATUS_CLASS,
  TASK_PRIORITY_TEXT,
  TASK_PRIORITY_CLASS,
} from "../components/TableVariables";
import { useParams } from "react-router-dom";
import moment from "moment";
import { DatePicker } from "antd";
import { useNavigate } from "react-router-dom";

function UpdateTask(props) {
  const [projectOptions, setProjectOptions] = useState([]);
  const [userOptions, setUserOptions] = useState([]);
  const [momentDates, setMomentDates] = useState("");
  const [data, setData] = useState({
    name: "",
    projects_id: "",
    description: "",
    status: "",
    image_path: "",
    due_date: null,
    priority: "",
    assigned_user_id: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const projectOptionsResponse = await axiosClient.get("/projects");
        const userOptionsResponse = await axiosClient.get("/users");

        setProjectOptions(projectOptionsResponse?.data?.projects?.data);
        setUserOptions(userOptionsResponse?.data?.users?.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchOptions();
  }, []);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosClient.get(`/tasks/${id}`);
        const { task } = res?.data;
        setData(task);
        setMomentDates((preDates) => ({
          ...preDates,
          due_date: task?.due_date ? moment(task?.due_date, "DD-MM-YY") : null,
        }));
      } catch (error) {
        console.log("Error fetching task:", error);
      }
    };
    fetchTask();
  }, [id]);

  const updateTaskHandler = async (ev) => {
    ev.preventDefault();
    console.log(data);
    try {
      const res = await axiosClient.put(`/tasks/${id}`, data);
      navigate("/tasks");
      console.log(res);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleDatePickerChange = (date, dateString) => {
    setData((preDates) => ({
      ...preDates,
      due_date: dateString
    }));
      setMomentDates((preDates) => ({
        ...preDates,
        due_date: dateString
          ? moment(dateString, "DD-MM-YY")
          : null,
      }));
  };

  const onFileChange = (ev) => {
    // debugger;
    const imageFile = ev.target.files[0];
    const reader = new FileReader();
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    reader.onload = () => {
      // debugger;
      // setData(preValues => ({ ...preValues, image_path: reader.result }));
      console.log(reader.result); // You should log inside the setState callback or use useEffect to see the updated states
      setData((prevState) => ({ ...prevState, image_path: reader.result }));
      console.log(data);
    };
  };

  return (
    <PageComponent heading={"Update Task"}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={updateTaskHandler}
      >
        <Space direction="vertical" size="large">
          <div>
            <label htmlFor="status">Select Project:</label>
            <Select
              value={data?.projects_id}
              size="large"
              id="projects_id"
              name="projects_id"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("projects_id", value)}
            >
              {projectOptions?.map((option) => (
                <Select.Option value={option.id}>{option.name}</Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="name">Task Name:</label>
            <Input
              size="large"
              value={data?.name}
              id="name"
              name="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Task Description:</label>
            <Input.TextArea
              rows={3}
              size="large"
              value={data?.description}
              id="description"
              name="description"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="status">Select Status:</label>
            <Select
              value={data?.status}
              size="large"
              id="status"
              name="status"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("status", value)}
            >
              <Select.Option value="in_process">In Process</Select.Option>
              <Select.Option value="completed">Completed</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
            </Select>
          </div>

          <div>
            <label htmlFor="priority">Select Priority:</label>
            <Select
              value={data?.priority}
              size="large"
              id="priority"
              name="priority"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("priority", value)}
            >
              <Select.Option value="low">Low</Select.Option>
              <Select.Option value="medium">Medium</Select.Option>
              <Select.Option value="high">High</Select.Option>
            </Select>
          </div>

          <div>
            <label htmlFor="Toassigned">Select Assigned User:</label>
            <Select
              value={data?.assigned_user_id}
              size="large"
              id="assigned_user_id"
              name="assigned_user_id"
              style={{ width: "100%" }}
              onChange={(value) => handleInputChange("assigned_user_id", value)}
            >
              {userOptions?.map((option) => (
                <Select.Option value={option.id}>{option.name}</Select.Option>
              ))}
            </Select>
          </div>

          <div>
            <label htmlFor="due_date">Task Deadline:</label>
            <DatePicker
              size="large"
              value={momentDates?.due_date?.i}
              id="due_date"
              name="due_date"
              style={{ width: "100%" }}
              onChange={handleDatePickerChange}
            />
          </div>

          <div>
            <label htmlFor="upload_image">Upload Task Image:</label>
            <input
              type="file"
              className="block w-full"
              onChange={onFileChange}
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <Button
              key="cancel"
              onClick={() => {
                setData({});
                navigate("/tasks");
              }}
            >
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              className="ml-2"
            >
              Submit
            </Button>
          </div>
        </Space>
      </form>
    </PageComponent>
  );
}

export default UpdateTask;
