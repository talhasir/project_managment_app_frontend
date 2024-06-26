import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select, Space } from "antd";
import AntModal from "./AntModal";
import { useContext } from "react";
import Context from "../ContextProvider";
import axiosClient from "../axiosClient";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import PageComponent from "../Layouts/ViewLayout";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Dragger } = Upload;

const AddNewProject = () => {
  // debugger
  const [data, setData] = useState({
    name: "",
    description: "",
    status: "in_process",
    due_date: null,
    image_path: "",
  });
  const navigate = useNavigate();
// console.log(navigate());
  const { setIsModalOpen, isModalOpen } = useContext(Context);

  const submitProjectHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axiosClient.post("/projects", data);
      navigate('/projects');
      console.log(res);
    } catch (error) {
      console.log("Error fetching projects:", error);
      // setLoading(false);
    }
  };

  const handleDatePickerChange = (date, dateString) => {
    setData((prevData) => ({
      ...prevData,
      due_date: dateString,
    }));
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
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
    // <AntModal isModalOpen={isModalOpen} heading={"Create New Project"}>
    <PageComponent heading={"Create New Project"}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitProjectHandler}
      >
        <Space direction="vertical" size="large">
          <div>
            <label htmlFor="name">Project Name:</label>
            <Input
              size="large"
              id="name"
              name="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="description">Project Description:</label>
            <Input.TextArea
              rows={3}
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
              id="due_date"
              name="due_date"
              style={{ width: "100%" }}
              onChange={handleDatePickerChange}
            />
          </div>

          <div>
            <label htmlFor="upload_image">Upload Project Image:</label>
            <input
              type="file"
              className="block w-full"
              onChange={onFileChange}
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
              Submit
            </Button>
          </div>
        </Space>
      </form>
    </PageComponent>
    // </AntModal>
  );
};
export default () => <AddNewProject />;
