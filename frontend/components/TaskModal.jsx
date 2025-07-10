"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import DateTimeInput from "./DateTimeInput";
export function formatDateTimeLocalValue(date) {
  const d = new Date(date);
  const pad = (n) => (n < 10 ? "0" + n : n);
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const min = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${min}`;
}
export default function TaskModal({
  isOpen,
  onClose,
  newTask,
  setNewTask,
  onSubmit,
  loading,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Task</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Description
            </label>
            <input
              type="text"
              value={newTask.description}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline
            </label>
            <input
              type="datetime-local"
              value={newTask.deadline.substring(0, 16)}
              onChange={(e) =>
                setNewTask({ ...newTask, deadline: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* <DateTimeInput
            deadline={newTask.deadline}
            setDeadline={(value) => setNewTask({ ...newTask, deadline: value })}
          /> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              value={newTask.priority}
              onChange={(e) =>
                setNewTask({ ...newTask, priority: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div> */}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
              disabled={loading} // Optional: Disable the button while loading to prevent multiple submissions
            >
              {!loading ? "Add Task" : "Loading..."}{" "}
              {/* Changed to "Loading..." for better UX */}
            </button>
            {loading && <p>Adding your task, please wait...</p>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
