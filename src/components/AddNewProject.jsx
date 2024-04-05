import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Input,
  Select,
  Space,
  Upload,
} from "antd";
import AntModal from "./AntModal";
import { useContext } from "react";
import Context from "../ContextProvider";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
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
  const handleSubmitProject = (e) => {
    e.preventDefault();
    console.log(data);
  };
  return (
    <AntModal heading={'Create New Project'}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmitProject}
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
            <label htmlFor="image">Upload Image:</label>
            <Upload
              action="/upload.do"
              name="image_path"
              listType="picture-card"
              showUploadList={false}
              onChange={(e) => handleInputChange("image_path", e)}
            >
              <Button>
                <PlusOutlined /> Upload Image
              </Button>
            </Upload>
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
