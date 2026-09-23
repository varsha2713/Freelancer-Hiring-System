# Freelancer Hiring System

A full-stack Freelancer Hiring System that connects clients and freelancers through a structured project-based hiring platform. The system supports project management, proposal submission, real-time communication, contract generation, payments, reviews, and dashboards for tracking project activities.

## Features

- User registration and role-based profiles
- Client project posting and management
- Freelancer project browsing and proposal submission
- Proposal review and hiring workflow
- Contract generation and downloadable PDF contracts
- Payment management
- Real-time chat between clients and freelancers
- Client and freelancer dashboards
- Project progress and activity tracking
- Reviews and ratings
- Form validation and exception handling
- RESTful API-based frontend-backend communication

## Technology Stack

### Frontend
- React.js
- HTML
- CSS
- JavaScript

### Backend
- Java
- Spring Boot
- Spring Data JPA
- REST APIs
- Bean Validation

### Database
- MySQL

### Development Tools
- Git
- GitHub
- Visual Studio Code
- Maven

## System Workflow

1. Users register and access the system based on their role.
2. Clients create projects by providing project details, budget, deadline, and required skills.
3. Freelancers browse available projects and submit proposals with their bid and estimated delivery time.
4. Clients review proposals and select a suitable freelancer.
5. A contract is generated with project terms and can be downloaded as a PDF.
6. Clients and freelancers communicate through the integrated chat system.
7. Payments are processed based on the project workflow.
8. Dashboards allow users to track projects, proposals, contracts, payments, and activities.
9. Users can provide reviews and ratings after project completion.

## Project Structure

```text
Freelancer-Hiring-System/
│
├── reactapp/
│   └── React Frontend
│
├── springapp/
│   └── Spring Boot Backend
│
├── README.md
└── .gitignore


Backend Architecture

The backend follows a layered architecture:

Controller
     ↓
Service
     ↓
Repository
     ↓
MySQL Database


Controller layer handles REST API requests.
Service layer contains business logic.
Repository layer manages database operations using JPA.
Exception handling provides structured error responses.
Validation ensures correct and consistent input data.
Key Modules
Project Management

Clients can create, update, view, and manage projects with budgets, deadlines, and required skills.

Proposal Management

Freelancers can submit proposals with bid amounts, proposal descriptions, and estimated delivery time.

Contract Management

Approved proposals can be converted into contracts containing project terms and payment details. Contracts can be generated and downloaded as PDF documents.

Payment Management

The system supports payment-related operations associated with freelancer projects and contracts.

Chat

Clients and freelancers can communicate through the integrated chat functionality.

Dashboard

Role-based dashboards provide users with a centralized view of their projects, proposals, contracts, payments, and activities.

Reviews

Users can provide reviews and ratings based on completed project interactions.

Objective

The main objective of the Freelancer Hiring System is to provide a centralized digital platform that simplifies the complete freelancer hiring process, from project posting and proposal submission to communication, contract management, payment, and project completion.

Benefits
Simplifies the hiring process
Centralizes project and contract management
Improves communication between clients and freelancers
Provides transparent project and payment tracking
Reduces manual documentation
Provides downloadable digital contracts
Enables efficient project monitoring through dashboards
Future Enhancements
AI-based freelancer recommendation
Advanced project analytics
Automated notifications
Secure online payment gateway integration
Advanced search and filtering
Mobile application
Enhanced authentication and authorization
AI-assisted proposal analysis
Author

Varsha K S

B.Tech – Information Technology
