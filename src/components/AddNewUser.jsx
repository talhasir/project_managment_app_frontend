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

const AddNewUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();

  const submitUserHandler = async (ev) => {
    ev.preventDefault();
    try {
      const res = await axiosClient.post("/users", data);
      navigate('/users');
      console.log(res);
    } catch (error) {
      console.log("Error fetching users:", error);
      // setLoading(false);
    }
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
    // <AntModal isModalOpen={isModalOpen} heading={"Create New User"}>
    <PageComponent heading={"Create New User"}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={submitUserHandler}
      >
        <Space direction="vertical" size="large">
          <div>
            <label htmlFor="name">User Name:</label>
            <Input
              size="large"
              id="name"
              name="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">User Email:</label>
            <Input
              size="large"
              id="email"
              name="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Input
              size="large"
              id="password"
              name="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password_confirmation">Conform Password:</label>
            <Input
              size="large"
              id="password_confirmation"
              name="password_confirmation"
              onChange={(e) => handleInputChange("password_confirmation", e.target.value)}
            />
          </div>

          <div style={{ textAlign: "right" }}>
            <Button key="cancel" onClick={() => {setData({}); navigate('/users')}}>
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
export default () => <AddNewUser />;
