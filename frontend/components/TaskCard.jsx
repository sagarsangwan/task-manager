"use client";
import React from "react";
import { formatReadableDateTime } from "@/lib/utils";

export default function TaskCard({ task, onToggle }) {
  console.log(task.tags);
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "High":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
          <p className=" text-xs text-gray-600">{task.description}</p>
          {task.tags && task.tags.length > 0 && (
            <div>
              {task.tags.map((tag) => (
                <span
                  className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full border border-gray-300"
                  key={tag.id}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
        <input
          type="checkbox"
          checked={task.is_completed}
          onChange={() => onToggle(task.id)}
          className="ml-3 h-4 w-4 text-blue-600 rounded border-gray-300"
        />
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {formatReadableDateTime(task.deadline)}
        </span>
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
            task.priority
          )}`}
        >
          {task.priority ? task.priority : "no priority set"}
        </span>
      </div>
    </div>
  );
}
