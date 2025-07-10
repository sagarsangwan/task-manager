"use client";
import { AddNewTask, fetchTasksFromApi, updateTasks } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Column from "./ui/Column";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import TaskModal from "./TaskModal";
const getLocalDatetimeString = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: getLocalDatetimeString(),
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(tasks);

  const loadTasks = async () => {
    const data = await fetchTasksFromApi();
    setTasks(data);
    console.log(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const upcoming = tasks.filter(
    (task) => !task.is_completed && task.status === "Upcoming"
  );
  const completed = tasks.filter((task) => task.is_completed);
  const missed = tasks.filter(
    (task) => !task.is_completed && task.status === "Missed"
  );

  const handleToggleComplete = async (id) => {
    setLoading(true);
    var cTask = tasks.find((task) => task.id == id);
    cTask.is_completed = !cTask.is_completed;
    const result = await updateTasks(cTask);
    const data = await result.json();
    if (!result.ok) {
      toast.error("sorry something went wrong");
      console.log(data);
    }

    toast.success(`${data.title} has been set to ${data.status}`);
    await loadTasks();
    setLoading(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const localDate = new Date(newTask.deadline);
    const utcIsoString = localDate.toISOString();
    const dataToSend = { ...newTask, deadline: utcIsoString };
    const result = await AddNewTask(dataToSend);

    const data = await result.json();
    if (!result.ok) {
      toast.error("sorry something went wrong");
      console.log(data);
    }
    toast.success(`${data.title} has been created`);
    await loadTasks();
    setIsModalOpen(false);
    setNewTask({
      title: "",
      description: "",
      deadline: getLocalDatetimeString(),
    });
    setLoading(false);
  };
  return (
    <div className="min-h-screen  p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-2">Task Management</h1>
          <p className="text-gray-600">
            Organize and track your tasks efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Column
            title="Upcoming"
            tasks={upcoming}
            count={upcoming.length}
            onToggle={handleToggleComplete}
          />
          <Column
            title="Completed"
            tasks={completed}
            count={completed.length}
            onToggle={handleToggleComplete}
          />
          <Column
            title="Missed"
            tasks={missed}
            count={missed.length}
            onToggle={handleToggleComplete}
          />
        </div>
      </div>
      <Button
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg"
        onClick={() => setIsModalOpen(true)}
      >
        <Plus />
      </Button>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          newTask={newTask}
          setNewTask={setNewTask}
          onSubmit={onSubmit}
          loading={loading}
        />
      )}
    </div>
  );
}

export default TaskManagement;
