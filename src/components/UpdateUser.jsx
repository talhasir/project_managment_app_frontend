import React, { useEffect, useState } from "react";
import { Button, DatePicker, Input, Select, Space } from "antd";
import axiosClient from "../axiosClient";
import PageComponent from "../Layouts/ViewLayout";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const { TextArea } = Input;

const UpdateUser = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get(`/users/${id}`);
        const { user } = res?.data;
        setData(user);
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  const updateUserHandler = async (ev) => {
    ev.preventDefault();
    // debugger
    try {
      const res = await axiosClient.patch(`/users/${id}`, {...data});
      if(res){
        navigate('/users');
      }
    } catch (error) {
      console.log("Error updating user:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  return (
     <PageComponent heading={"Update User"}>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={updateUserHandler}
      >
        <Space direction="vertical" size="large">
          <div>
            <label htmlFor="name">User Name:</label>
            <Input
              size="large"
              id="name"
              value={data?.name}
              name="name"
              onChange={(e) => handleInputChange("name", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email">User Email:</label>
            <Input
              size="large"
              value={data?.email}
              id="email"
              name="email"
              onChange={(e) => handleInputChange("email", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password">Password:</label>
            <Input
              size="large"
              // value={data?.password}
              id="password"
              name="password"
              onChange={(e) => handleInputChange("password", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password_confirmation">Conform Password:</label>
            <Input
              size="large"
              // value={data?.password_confirmation}
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
  );
};

export default UpdateUser;
