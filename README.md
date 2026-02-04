HRMS Lite – Full Local Setup Guide (React + FastAPI + MongoDB)

Project Overview
HRMS Lite is a lightweight Human Resource Management System that allows a single admin (no authentication) to:
• Add / View / Delete employees
• Mark attendance (Present / Absent)
• View attendance records for each employee
• Prevent duplicate attendance for the same employee on the same date

Tech Stack:
Frontend: React (Create React App)
Backend: Python FastAPI, Pydantic, CORS
Database: MongoDB Atlas (recommended) or Local MongoDB

Folder Structure
hrms-lite/
  backend/
    requirements.txt
    .env
    app/
      database.py 
      main.py                                                                                                                                                                                                     
      schemas.py
  frontend/
    package.json
    public/
      index.html
    src/
      pages/
      components/

Prerequisites
Before running the project, install:
• Python (3.10+ recommended)
• MongoDB Atlas account OR Local MongoDB installed

Recommended tools:
• VS Code
• MongoDB Compass (optional)

Step 1: Extract the Project ZIP
1) Download the project ZIP.
2) Extract it to a folder such as:
   D:\Task\hrms-lite
3) The project will contain:
   • backend folder
   • frontend folder

Step 2: Backend Setup (FastAPI)
1) Open terminal in the backend folder:
   cd backend

2) Create a virtual environment:
   python -m venv venv

3) Activate the virtual environment:

   Windows PowerShell:
   venv\Scripts\Activate.ps1

   Windows CMD:
   venv\Scripts\activate.bat

   Mac/Linux:
   source venv/bin/activate

4) Install dependencies:
   pip install -r requirements.txt

Step 3: MongoDB Atlas Setup (Connection)
1) Go to MongoDB Atlas and open your cluster.
2) Click “Connect”.
3) Select “Drivers”.
4) Copy the connection string (URI). Example:

   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hrms_lite?retryWrites=true&w=majority

5) Important Atlas settings:
   A) Database Access → Create DB user
   B) Network Access → Add your IP address
      (For testing, you can allow 0.0.0.0/0)

Step 4: Change in database.py file
Inside the backend folder, look for database.py file inside app folder paste your MONGO_URI 

Example:

MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hrms_lite?retryWrites=true&w=majority
DB_NAME=hrms_lite

Replace <username> and <password> with your MongoDB Atlas credentials.

Step 5: Run Backend Server
From inside the backend folder (virtual env activated), run:

uvicorn main:app --reload --port 8000

Backend will run at:
http://localhost:8000

Step 6: Frontend Setup (React)
1) Open terminal in the frontend folder:
   cd frontend

2) Install dependencies:
   npm install

3) Run React app:
   npm start

Frontend will run at:
http://localhost:3000

How to Use the Application
1) Add Employees
   • Go to Employees section
   • Fill required fields:
     - Employee ID
     - Full Name
     - Email
     - Department
   • Click Add Employee

2) Mark Attendance
   • Select employee from dropdown
   • Select date
   • Select status (Present/Absent)
   • Click Mark Attendance

3) View Attendance
   • Select employee from dropdown
   • (Optional) Select date range
   • Click View
   • Attendance table will show:
     - Employee Name
     - Date
     - Status

Common Errors & Fixes
1) npm error: package.json not found
   • Make sure you are inside the frontend folder before running npm install.

2) React error: browserslist missing
   • Ensure package.json includes a browserslist key.

3) MongoDB connection failed
   • Check your  MONGO_URI
   • Check Network Access IP whitelist in Atlas
   • Ensure username/password are correct

4) Attendance not showing
   • Ensure you are selecting the correct employeeId
   • Check backend endpoint /api/attendance/{employeeId}

Recommended Run Order
Always run in this order:
1) Start Backend (FastAPI) on port 8000
2) Start Frontend (React) on port 3000
3) Use the app in browser

