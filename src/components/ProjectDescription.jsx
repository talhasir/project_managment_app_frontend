import React, { useEffect, useState } from "react";
import { Badge, Descriptions } from "antd";
import PageComponent from "../Layouts/ViewLayout";
import { useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
import { PORJECT_STATUS_TEXT } from "./TableVariables";

export default function ProjectDescription() {
  const [project, setProject] = useState(null);
  const { id } = useParams();

  const fetchProject = async (id) => {
    try {
      const res = await axiosClient.get(`/projects/${id}`);
      const { project } = res?.data;
      console.log(res);
      setProject(project);
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  useEffect(() => {
    fetchProject(id);
  }, [id]);

  const items = project
    ? [
        {
          label: "ID",
          children: project.id,
        },
        {
          label: "NAME",
          children: project.name,
        },
        {
          label: "IMAGE",
          children: (
            <img src={project.image_path} alt="image" className="w-5 h-auto" />
          ),
        },
        {
          label: "STATUS",
          children: PORJECT_STATUS_TEXT[project.status],
        },
        {
          label: "CREATION DATE",
          children: project.created_at,
        },
        {
          label: "DUE DATE",
          children: project.due_date,
        },
        {
          label: "DESCRIPTION",
          children: project.description,
        },
        {
          label: "CREATOR ID",
          children: project.created_by,
        },
        // Add more items as needed
      ]
    : [];

  return (
    <PageComponent heading="Project Details">
      <Descriptions title="Project Info" bordered items={items} />
    </PageComponent>
  );
}
