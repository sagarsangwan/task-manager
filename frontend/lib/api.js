const API_URL = "http://localhost:8000/api/v1/tasks/";

export async function fetchTasksFromApi() {
  const res = await fetch(API_URL);
  return res.json();
}
