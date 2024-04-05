import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Input, Select, Space } from "antd";
import AntModal from "./AntModal";
import { useContext } from "react";
import Context from "../ContextProvider";
import axiosClient from "../axiosClient";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Dragger } = Upload;

const props = {
  name: "file",
  action: "https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const AddNewProject = () => {
  const [data, setData] = useState({
    name: "",
    description: "",
    status: "in_process",
    due_date: null,
    image_path: null,
  });
  const { setIsModalOpen } = useContext(Context);

  const submitProjectHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axiosClient.post("/projects", data);
      // setLoading(false);
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
    const imageFile = ev.target.files[0];
    setData((preValues = { ...preValues, image_path: imageFile }));
    console.log(data);
  };

  return (
    <AntModal heading={"Create New Project"}>
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
            <Button key="cancel" onClick={() => setIsModalOpen(false)}>
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
    </AntModal>
  );
};
export default () => <AddNewProject />;
