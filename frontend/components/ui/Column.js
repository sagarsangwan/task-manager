"use client";
import React from "react";
import TaskCard from "../TaskCard";
function Column({ title, tasks, count, onToggle, onDelete }) {
  return (
    <div className="flex-1 min-w-0">
      <div className="mb-4">
        <h2 className="text-lg font-semibold  mb-1">{title}</h2>
        <span className="text-sm text-gray-500">{count} tasks</span>
      </div>
      <div className="space-y-3">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            <p>No tasks</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Column;
