"use client";
import { fetchTasksFromApi, updateTasks } from "@/lib/api";
import React, { useEffect, useState } from "react";
import Column from "./ui/Column";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import TaskModal from "./TaskModal";
function TaskManagement() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
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
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(newTask);
    return;
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
        />
      )}
    </div>
  );
}

export default TaskManagement;
