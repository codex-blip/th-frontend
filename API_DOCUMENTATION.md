# API Documentation

## Base URL
```
http://localhost:8000
```

## Endpoints

### 1. Login
**POST** `/api/login`

Authenticates a user with username, password, and team captain entry number.

**Request Body:**
```json
{
  "username": "string",
  "password": "string", 
  "team_captain_entry": "string"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful!",
  "is_admin": false,
  "token": "token_username_timestamp"
}
```

**Error Response:**
```json
{
  "detail": "Invalid credentials"
}
```

### 2. Get All Users (Admin Only)
**GET** `/api/admin/users`

Retrieves all registered users with their login times.

**Response:**
```json
[
  {
    "id": 1,
    "username": "ismp@esportz",
    "team_captain_entry": "TEAM001",
    "login_time": "2024-01-15T10:30:00",
    "is_admin": false
  }
]
```

### 3. Declare Winner (Admin Only)
**POST** `/api/admin/declare-winner`

Declares a user as the winner of the treasure hunt.

**Request Body:**
```json
{
  "user_id": 1
}
```

**Response:**
```json
{
  "success": true,
  "message": "Winner declared: ismp@esportz (Team: TEAM001)",
  "winner": {
    "username": "ismp@esportz",
    "team_captain_entry": "TEAM001"
  }
}
```

### 4. Health Check
**GET** `/health`

Returns the health status of the API.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00"
}
```

## Default Credentials

### Normal User
- **Username:** `ismp@esportz`
- **Password:** `iitropargoat`

### Admin User
- **Username:** `max1112`
- **Password:** `moelester`

## Database Schema

The system uses SQLite with the following table structure:

```sql
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    team_captain_entry TEXT NOT NULL,
    login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_admin BOOLEAN DEFAULT FALSE
);
```

## CORS Configuration

The API allows requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

## Error Handling

All endpoints return appropriate HTTP status codes:
- `200` - Success
- `401` - Unauthorized (invalid credentials)
- `404` - Not Found
- `500` - Internal Server Error 