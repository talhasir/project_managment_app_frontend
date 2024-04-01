import { useContext, useRef, useState } from "react";
import axiosClient from "../axiosClient";
import Context from "../ContextProvider";
import { Navigate } from "react-router-dom";
import { Button, Form, Input } from "antd";

export default function Signup() {
   
  // States For Form input Data //
    const [emailRef, setEmailRef] = useState();
    const [passwordRef, setPasswordRef] = useState();
    // States For Form input Data //

  const [error, setErrors] = useState();
  const { setcurrentUser, setUserToken, currentUser, userToken } =
    useContext(Context);

  const onSubmit = async (ev) => {
    const payload = {
      email: emailRef,
      password: passwordRef,
    };

    const response = await axiosClient
      .post("/login", payload)
      .catch(({ response }) => {
        if (response.status === 422) {
          setErrors(response.data && response.data.errors);
        }
      });
    setcurrentUser(response && response.data && response.data.user);
    setUserToken(response && response.data && response.data.token);
  };

  const onSubmitField = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  
  if (userToken) {
    return <Navigate to={"/"} />;
  }
  
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Login up to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {/* error those met from server */}
        {/* {error &&
          Object.keys(error).map((errKey) => {
            return (
              <>
                <div
                  id="alert-2"
                  className="flex items-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="ms-3 text-sm font-medium">
                    {error[errKey]}
                  </div>
                  <button
                    type="button"
                    className="ms-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                    data-dismiss-target="#alert-2"
                    aria-label="Close"
                  >
                    <span className="sr-only">Close</span>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 14"
                    >
                      <path
                        stroke="currentColor"
                        strokLinecap="round"
                        strokLinejoin="round"
                        strokWidth="2"
                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                      />
                    </svg>
                  </button>
                </div>
              </>
            );
          })} */}
        {/* error those met from server */}

      <div className="">
      <Form
          name="login_form"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onSubmit}
          onFinishFailed={onSubmitField}
          autoComplete="off"
        >
          <Form.Item
          style={{marginBottom: '10px'}}
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please type your email adress!",
              },
            ]}
          >
            <Input size="large" onChange={(e) => setEmailRef(e.target.value)}/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please type your password!",
              },
            ]}
          >
            <Input.Password size="large" onChange={(e) => setPasswordRef(e.target.value)}/>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
      </div>
    </>
  );
}
