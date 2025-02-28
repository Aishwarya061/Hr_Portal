# HR Letter PDF Generation Portal

This project is a web-based portal that allows HR teams to generate HR-related documents dynamically.

## 📂 Project Structure
- *frontend/* → Next.js (React) UI
- *backend/* → Node.js + Express API
- *database/* → MySQL scripts (hr_letter_portal.sql)

# Backend
  # 1. Connecting Database to Backend (Node.js + MySQL)
    Step 1: Install Dependencies
            Node.js backend project, install mysql2 for database connectivity
    Step 2: Create a Database Connection
            Create a db.js file in the backend
# 2. Backend API Integration
Step 1: Create an API to Fetch Templates
        Inside routes/templates.js:
Step 2: Add API Routes in server.js

 # Frontend
   Frontend (Next.js) Integration
   In the Next.js frontend, fetch templates from the backend

# This code is created to connect Database to Backend and Frontend
- The Backend and frontend code is pushed in the git respository.
- The code is in node.js and next.js language with DB connections.

# The Database Creation
- The created Database is named "hr_portal".
- It has 4 tables Users, Templates, Roles and AuditLogs.
  * Users     - Stores admin and HR personnel details
  * Templates - Stores predefined HR letter templates
  * Roles     - Defines user roles
  * AuditLogs - Tracks template modifications for security
 
  # ER-Diagram
  ![Screenshot 2025-02-28 094628](https://github.com/user-attachments/assets/83f67384-5d04-43c8-ae3c-a86ce6aeb432)

    
Fields which were considered are:

USERS:
---------------------------------------------------------------------------------------------------
Column Name	  |Data Type	                           |  Description
--------------|--------------------------------------|---------------------------------------------
id	          | INT (Primary Key, AUTO_INCREMENT)	   | Unique ID for each user
name	        | VARCHAR(255)	                       | User's full name
email       	| VARCHAR(255), UNIQUE	               | User's email for login
password_hash |	VARCHAR(255)	                       | Hashed password for security
role_id	      | INT (Foreign Key → Roles.id)         | Defines whether the user is an Admin or HR
created_at	  | TIMESTAMP DEFAULT CURRENT_TIMESTAMP	 | User registration timestamp
-----------------------------------------------------------------------------------------------------
✅ Why? To manage system access and differentiate between Admin and HR Personnel.

ROLES:
---------------------------------------------------------------------------------------------------
Column Name	  |Data Type	                           |  Description
--------------|--------------------------------------|---------------------------------------------
id	          |INT (Primary Key, AUTO_INCREMENT)	   |  Unique ID for each role
role_name	    |ENUM ('Admin', 'HR Personnel')        |	Defines if the user is an Admin or HR
-----------------------------------------------------------------------------------------------------
✅ Why? Ensures that only Admins can upload/edit templates, while HR personnel can generate PDFs

Templates:
---------------------------------------------------------------------------------------------------
Column Name	  |Data Type	                           |  Description
--------------|--------------------------------------|---------------------------------------------
id	          | INT (Primary Key, AUTO_INCREMENT)	   |  Unique template ID
title	        |VARCHAR(255)	                         | Name of the template (e.g., "Offer Letter")
content	      |TEXT	                                 | HR Letter format with placeholders
uploaded_by	  |INT(Foreign Key → Users.id)	         | User who uploaded the template
created_at	  |TIMESTAMP DEFAULT CURRENT_TIMESTAMP	 | Upload timestamp
-----------------------------------------------------------------------------------------------------
✅ Why? To provide predefined HR document formats for consistent, standardized letters.

AuditLogs:
---------------------------------------------------------------------------------------------------
Column Name	  |Data Type	                            |  Description
--------------|-------------------------------------- |---------------------------------------------
id	          | INT (Primary Key, AUTO_INCREMENT)	    | Unique log ID
template_id   |	INT (Foreign Key → Templates.id)	    | Template that was modified
user_id       |	INT (Foreign Key → Users.id)	        | User who made the change
action	      | ENUM ('Created', 'Updated', 'Deleted')| Type of action performed
timestamp	    | TIMESTAMP DEFAULT CURRENT_TIMESTAMP	  | Time of modification
-----------------------------------------------------------------------------------------------------
✅ Why? Ensures security and compliance by tracking all template modifications.

- These fields can be updated or changed according to the requirement of Main project.

# To create this Database follow these cammands
CREATE DATABASE hr_portal;

USE hr_portal;

CREATE TABLE Users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (role_id) REFERENCES Roles(id) ON DELETE CASCADE
);


CREATE TABLE Roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);


CREATE TABLE Templates (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    uploaded_by INT NULL, 
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (uploaded_by) REFERENCES Users(id) ON DELETE SET NULL
);


CREATE TABLE AuditLogs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT NOT NULL,
    user_id INT NOT NULL,
    action ENUM('Created', 'Updated', 'Deleted') NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (template_id) REFERENCES Templates(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE
);


SELECT * FROM Users;
SELECT * FROM Roles;
SELECT * FROM templates;
SELECT * FROM AuditLogs;
SELECT * FROM hr_portal;
