import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Select, Space } from "antd";
import axiosClient from "../axiosClient";
import PageComponent from "../Layouts/ViewLayout";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const UpdateProject = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    status: "in_process",
    due_date: null,
    image_path: null,
  });
  const [momentDates, setMomentDates] = useState();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axiosClient.get(`/projects/${id}`);
        const { project } = res?.data;
        setData(project);
        setMomentDates((preDates) => ({
          ...preDates,
          due_date: project.due_date
            ? moment(project.due_date, "DD-MM-YY")
            : null,
        }));
      } catch (error) {
        console.log("Error fetching project:", error);
      }
    };
    fetchProject();
  }, [id]);

  const updateProjectHandler = async (ev) => {
    ev.preventDefault();
    // debugger
    try {
      const res = await axiosClient.patch(`/projects/${id}`, {...data});
      if(res){
        navigate('/projects');
      }
    } catch (error) {
      console.log("Error updating project:", error);
    }
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

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };
  return (
    <PageComponent heading={"Update Project"}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={updateProjectHandler}
      >
        <Space direction="vertical" size="large">
          <div>
            <label htmlFor="name">Project Name:</label>
            <Input
              size="large"
              id="name"
              value={data.name}
              name="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Project Description:</label>
            <Input.TextArea
              rows={3}
              value={data.description}
              size="large"
              id="description"
              name="description"
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="status">Select Status:</label>
            <Select
              defaultValue="in_process"
              value={data.status}
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
            <label htmlFor="due_date">Project Deadline:</label>
            <DatePicker
              size="large"
              value={momentDates?.due_date}
              id="due_date"
              name="due_date"
              style={{ width: "100%" }}
              onChange={handleDatePickerChange}
              format="DD-MM-YYYY"
            />
          </div>

          <div>
            <label htmlFor="upload_image">Upload Project Image:</label>
            <input
              type="file"
              className="block w-full"
              // onChange={onFileChange}
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={() => {setData({}); navigate('/projects')}}>
              Cancel
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              className="ml-2"
            >
              Update
            </Button>
          </div>
        </Space>
      </form>
    </PageComponent>
  );
};

export default UpdateProject;
