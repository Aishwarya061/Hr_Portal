# HR Letter PDF Generation Portal

This project is a web-based portal that allows HR teams to generate HR-related documents dynamically.

## 📂 Project Structure
- *frontend/* → Next.js (React) UI
- *backend/* → Node.js + Express API
- *database/* → MySQL scripts (hr_letter_portal.sql)

  # Backend-DB
HR_PORTAL-Backend connection to Database 

# This code is created to connect Database to Backend
- The Backend code is pushed in the git respository.
- The code is in node.js language with DB connections.

# The Database Creation
- The created Database is named "hr_portal".
- It has 4 tables Users, Templates, Roles and AuditLogs.
  * Users - Stores admin and HR personnel details
  * Templates - Stores predefined HR letter templates
  * Roles - Defines user roles
  * AuditLogs - Tracks template modifications for security
    
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

ROLES:
---------------------------------------------------------------------------------------------------
Column Name	  |Data Type	                           |  Description
--------------|--------------------------------------|---------------------------------------------
id	          |INT (Primary Key, AUTO_INCREMENT)	   |  Unique ID for each role
role_name	    |ENUM ('Admin', 'HR Personnel')        |	Defines if the user is an Admin or HR
-----------------------------------------------------------------------------------------------------

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
