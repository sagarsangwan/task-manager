
# Time-Aware Task Manager [https://task-manager-git-main-sagar-sangwans-projects.vercel.app/]

This is a full-stack task management application with a smart backend and a responsive frontend.
It includes:

* A REST API built using Django and Django REST Framework
* A frontend interface built with Next.js and styled using ShadCN UI
* An AI-powered priority assignment feature using Gemini AI
* An AI-powered task tagging feature to organize tasks
* Time-aware task categorization (Upcoming, Missed, Completed)

---

## Project Structure

```
task-manager/
├── backend/     # Django + DRF backend
├── frontend/    # Next.js + ShadCN UI frontend
```

---

## Deploy

Used free tiers from the services - 
1. Used [vercel](https://vercel.com/) for hosting next.js app. Visit frontend [here](https://task-manager-git-main-sagar-sangwans-projects.vercel.app/)
2. Used [pythonanywhere](https://www.pythonanywhere.com/) for hosting django app. Visit django APIs [here](https://sagarkush.pythonanywhere.com/api/v1/tasks)

## How to Set Up and Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/sagarsangwan/task-manager.git
cd task-manager
```

---

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder: you can see .env.sample for all keys

```
GEMINI_API_KEY=your_gemini_api_key_here
SECRET_KEY="a key for django any random key will work"


```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The backend will be running at `http://localhost:8000/api/v1/tasks/`

---

### 3. Frontend Setup (Next.js)

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`

---

## How Features Work

### Task Bucketing

Each task is automatically assigned one of three statuses:

* **Upcoming**: deadline is in the future and task is not completed
* **Missed**: deadline has passed and task is not completed
* **Completed**: user manually marks the task as completed

This logic is handled by the backend and updated in real time when tasks are fetched.

---

### AI-Powered Priority Classification

When a new task is created, the backend sends the task's title and description to the Gemini API.
The AI then classifies the task's priority as one of the following:

* Low
* Medium
* High
* Critical

This helps users focus on the most important work without manually choosing priorities.

---

### AI-Powered Task Tagging

Along with priority, the system also uses AI to generate relevant tags for each task automatically.
This makes tasks easier to search and organize.

Tags are selected from a predefined list:

`[Work, Personal, Health, Finance, Learning, Urgent, Shopping]`

When a task is created:

* The title and description are sent to the Gemini API
* Gemini returns up to 3 tags
* The backend associates those tags with the task

---

### Frontend Interface

The frontend allows users to:

* View tasks in three columns: Upcoming, Completed, and Missed
* Add new tasks with a modal that includes:

  * Title input
  * Description Input
  * Time input field
* View assigned priority and tags
* Mark tasks as completed
* Responsive layout for both mobile and desktop

---

## API Overview

* `GET /api/v1/tasks/`: List all tasks
* `POST /api/v1/tasks/`: Create a new task (AI tags and priority are applied automatically)
* `GET /api/v1/tasks/<id>/`: Retrieve a single task
* `PUT /api/v1/tasks/<id>/`: Update a task
* `DELETE /api/v1/tasks/<id>/`: Delete a task

---

## Requirements

**Backend:**

* Python
* Django
* Django REST Framework
* Google Generative AI SDK (Gemini)

**Frontend:**

* React.js
* Next.js (App Router)
* Tailwind CSS
* ShadCN UI

---

## Creator

This project was built by **sagarsangwan**.

---

