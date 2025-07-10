const API_URL = "http://localhost:8000/api/v1/tasks/";

export async function fetchTasksFromApi() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function updateTasks(taskData) {
  const res = await fetch(`${API_URL}${taskData.id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taskData),
  });
  console.log(res);
  return res;
}

export async function AddNewTask(newTask) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTask),
  });
  console.log(res);
  return res;
}
export async function deleteTask(taskId) {
  const res = await fetch(`${API_URL}${taskId}/`, {
    method: "DELETE",
  });
  console.log(res);
  return res;
}
