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
      { path: "/users", element: <Users /> },
      { path: "/projects", element: <Projects /> },
      { path: "/projects/:id", element: <ProjectDescription /> },
      { path: "/tasks", element: <Tasks /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/dashboard"} />,
  },
]);

export default Routes;
