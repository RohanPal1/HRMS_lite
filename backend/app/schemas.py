
from pydantic import BaseModel, EmailStr
from datetime import date

class EmployeeCreate(BaseModel):
    employeeId: str
    fullName: str
    email: EmailStr
    department: str

class AttendanceCreate(BaseModel):
    employeeId: str
    date: date
    status: str

class Attendance(BaseModel):
    employeeId: str
    date: str
    status: str