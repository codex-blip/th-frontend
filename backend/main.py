from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from typing import List, Optional
import sqlite3
import json
from datetime import datetime
import os
from threading import Lock

app = FastAPI(title="Treasure Hunt Login System", version="1.0.0")

# Database lock for thread safety with high concurrency
db_lock = Lock()

# CORS middleware - Updated for production
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000", 
        "http://127.0.0.1:3000",
        "https://*.vercel.app",  # For Vercel deployment
        "https://*.railway.app"   # For Railway deployment
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Security
security = HTTPBearer()

# Database setup
DATABASE = "treasure_hunt.db"

def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            team_captain_entry TEXT NOT NULL,
            login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_admin BOOLEAN DEFAULT FALSE
        )
    ''')
    conn.commit()
    conn.close()

# Initialize database
init_db()

# Pydantic models
class LoginRequest(BaseModel):
    username: str
    password: str
    team_captain_entry: str

class LoginResponse(BaseModel):
    success: bool
    message: str
    is_admin: bool = False
    token: Optional[str] = None

class User(BaseModel):
    id: int
    username: str
    team_captain_entry: str
    login_time: str
    is_admin: bool

class WinnerRequest(BaseModel):
    user_id: int

# Hardcoded credentials
VALID_CREDENTIALS = {
    "ismp@esportz": {"password": "iitropargoat", "is_admin": False},
    "max1112": {"password": "moelester", "is_admin": True}
}

def verify_credentials(username: str, password: str) -> bool:
    if username in VALID_CREDENTIALS:
        return VALID_CREDENTIALS[username]["password"] == password
    return False

def is_admin(username: str) -> bool:
    if username in VALID_CREDENTIALS:
        return VALID_CREDENTIALS[username]["is_admin"]
    return False

def save_user_to_db(username: str, team_captain_entry: str, is_admin: bool = False):
    with db_lock:  # Thread-safe database operation
        conn = sqlite3.connect(DATABASE, timeout=10.0)  # Add timeout for high concurrency
        cursor = conn.cursor()
        try:
            cursor.execute('''
                INSERT OR REPLACE INTO users (username, password, team_captain_entry, is_admin)
                VALUES (?, ?, ?, ?)
            ''', (username, "***", team_captain_entry, is_admin))
            conn.commit()
        except Exception as e:
            print(f"Error saving user: {e}")
        finally:
            conn.close()

def get_all_users():
    with db_lock:  # Thread-safe database operation
        conn = sqlite3.connect(DATABASE, timeout=10.0)  # Add timeout for high concurrency
        cursor = conn.cursor()
        cursor.execute('''
            SELECT id, username, team_captain_entry, login_time, is_admin
            FROM users
            ORDER BY login_time DESC
        ''')
        users = cursor.fetchall()
        conn.close()
        return [
            User(
                id=user[0],
                username=user[1],
                team_captain_entry=user[2],
                login_time=user[3],
                is_admin=bool(user[4])
            )
            for user in users
        ]

# Health check endpoint for monitoring
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Treasure Hunt API",
        "version": "1.0.0"
    }

@app.post("/api/login", response_model=LoginResponse)
async def login(login_data: LoginRequest):
    if not verify_credentials(login_data.username, login_data.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Save user to database
    admin_status = is_admin(login_data.username)
    save_user_to_db(login_data.username, login_data.team_captain_entry, admin_status)
    
    return LoginResponse(
        success=True,
        message="Login successful!",
        is_admin=admin_status,
        token=f"token_{login_data.username}_{datetime.now().timestamp()}"
    )

@app.get("/api/admin/users", response_model=List[User])
async def get_users():
    """Get all users (admin only)"""
    users = get_all_users()
    return users

@app.post("/api/admin/declare-winner")
async def declare_winner(winner_request: WinnerRequest):
    """Declare a winner (admin only)"""
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    
    # Get user details
    cursor.execute('SELECT username, team_captain_entry FROM users WHERE id = ?', (winner_request.user_id,))
    user = cursor.fetchone()
    
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    conn.close()
    
    return {
        "success": True,
        "message": f"Winner declared: {user[0]} (Team: {user[1]})",
        "winner": {
            "username": user[0],
            "team_captain_entry": user[1]
        }
    }

@app.get("/")
async def root():
    return {"message": "Treasure Hunt Login System API"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000) 