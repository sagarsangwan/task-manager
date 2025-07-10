"use client";
import { fetchTasksFromApi } from "@/lib/api";
import React, { useEffect, useState } from "react";

function TaskManagement() {
  const [Tasks, setTasks] = useState([]);
  console.log(Tasks);
  useEffect(() => {
    const fetchFromApi = async () => {
      const res = await fetchTasksFromApi();
      setTasks(res);
      console.log(res, ";;;;;;;;;;;;;;;;;;;;;;;;");
    };
    fetchFromApi();
  }, []);
  return <div>hii</div>;
}

export default TaskManagement;
