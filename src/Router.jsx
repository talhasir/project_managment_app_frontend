import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import GuestUser from "./Layouts/GuestUser";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./views/Dashboard";
import Default from "./Layouts/Default";
import Users from "./views/Users";
import Projects from "./views/Projects";
import Tasks from "./views/Tasks";
import ProjectDescription from "./components/ProjectDescription";
import AddNewProject from "./components/AddNewProject";
import UpdateProject from "./components/UpdateProject";
import AddNewUser from "./components/AddNewUser";
import UpdateUser from "./components/UpdateUser";
import AddNewTask from "./components/AddNewTask";
import UpdateTask from "./components/UpdateTask";
import TaskDescription from "./components/TaskDescription";
import MyTasks from "./views/MyTasks";

const Routes = createBrowserRouter([
  {
    path: "/regestration",
    element: <GuestUser />,
    children: [
      { path: "signup", element: <Signup /> },
      { path: "login", element: <Login /> },
    ],
  },
  {
    path: "/",
    element: <Default />,
    children: [
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/", element: <Navigate to={"/dashboard"} /> },
      //  #######################################
      //              Users Routes
      //  #######################################
      { path: "/users", element: <Users /> },
      { path: "/user/create", element: <AddNewUser /> },
      { path: "/user/update/:id", element: <UpdateUser /> },
      //  #######################################
      //              Projects Routes
      //  #######################################
      {path: "/projects", element: <Projects />,},
      { path: "/projects/create", element: <AddNewProject /> },
      { path: "/projects/update/:id", element: <UpdateProject /> },
      { path: "/projects/detials/:id", element: <ProjectDescription /> },
      //  #######################################
      //              Tasks Routes
      //  #######################################
      { path: "/tasks", element: <Tasks /> },
      { path: "/task/create", element: <AddNewTask /> },
      { path: "/task/update/:id", element: <UpdateTask /> },
      { path: "/task/detials/:id", element: <TaskDescription /> },
      //  #######################################
      //             My Tasks Routes
      //  #######################################
      { path: "/task/my-tasks", element: <MyTasks /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/dashboard"} />,
  },
]);

export default Routes;
