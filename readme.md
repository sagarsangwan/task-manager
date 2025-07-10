
# Time-Aware Task Manager

This is a full-stack task management application with a smart backend and a responsive frontend.
It includes:

* A REST API built using Django and Django REST Framework.
* A frontend interface built with Next.js and styled using ShadCN UI.
* An AI-powered priority assignment feature using OpenAI.
* Time-aware task categorization (Upcoming, Missed, Completed).

---

## Project Structure

```
time-aware-task-manager/
├── backend/     # Django + DRF backend
├── frontend/    # Next.js + ShadCN UI frontend
```

---

## How to Set Up and Run the Project

### 1. Clone the Repository

```bash
git clone https://github.com/sagarsangwan/task-manager.git
cd time-aware-task-manager
```

---

### 2. Backend Setup (Django)

```bash
cd backend
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` folder:

```
OPENAI_API_KEY=your_openai_key_here
```

Run migrations and start the server:

```bash
python manage.py migrate
python manage.py runserver
```

The backend will be running at `http://localhost:8000/api/tasks/`

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

This is handled automatically by the backend when tasks are retrieved.

---

### AI-Powered Priority Classification

When a new task is created, the backend sends the task's title and description to the OpenAI API.
The AI classifies the priority as one of the following:

* Low
* Medium
* High
* Critical

This helps users focus on the most important tasks without needing to manually prioritize.

---

### Frontend Interface

The frontend allows users to:

* View tasks in three separate columns: Upcoming, Completed, and Missed
* Add a new task using a modal with:

  * Title input
  * ShadCN calendar date picker
  * Time input field
* Mark a task as completed using a checkbox
* See the deadline and priority for each task

The interface is responsive and works well on both desktop and mobile.

---

## API Overview

* `GET /api/tasks/`: List all tasks
* `POST /api/tasks/`: Create a new task
* `GET /api/tasks/<id>/`: Retrieve a single task
* `PUT /api/tasks/<id>/`: Update a task
* `DELETE /api/tasks/<id>/`: Delete a task

Query parameters supported:

* `?priority=High`
* `?ordering=-deadline`
* `?search=keyword`

---

## Requirements

**Backend:**

* Python 
* Django
* Django REST Framework
* OpenAI Python SDK

**Frontend:**

* React.js
* Next.js  (App Router )
* Tailwind CSS
* ShadCN UI

---

