JobHub is a powerful job board platform designed to connect employers and job seekers, making it easy to post jobs, search for employment, and manage applications. The project is built with a Django REST Framework backend and a separate frontend developed using HTML, CSS, Bootstrap, and JavaScript.
Features
For Employers:

    Job Listings: Employers can post jobs with details such as title, description, requirements, and location.
    Employer Dashboard: A custom dashboard to manage job listings, view applications, and update job details.
    Application Management: Employers can view job applications and resumes and send notifications.
    Email Notifications: Employers receive notifications when a new job application is submitted.

For Job Seekers:

    Job Search: Search for jobs using filters like categories and keywords.
    Apply for Jobs: Upload resumes and apply for jobs with a single click.
    Job Application Tracking: A personal dashboard to track job applications.
    Email Notifications: Job seekers receive notifications upon successfully applying for a job.

General Features:

    User Authentication: Supports both employer and job seeker roles with appropriate permissions.
    Responsive Design: Fully responsive for an optimal experience on both desktop and mobile devices.
    Secure API: Uses token-based authentication to secure API endpoints.
    Category Filtering: Browse job listings by industry categories.

Technologies Used

    Backend: Django REST Framework
    Frontend: HTML, CSS, Bootstrap, JavaScript
    Database: SQLite (development), PostgreSQL (production)
    Email Integration: Send email notifications using Django's email system
    Authentication: Token-based authentication using Django REST Framework

Project Structure

This repository contains the frontend of the JobHub platform.

The backend of this project, developed with Django REST Framework, can be found here.
Installation and Setup

To run the frontend locally:
Clone the repository:

bash

git clone https://github.com/mdomor527461/job_board-frontend.git
cd job_board-frontend

Install dependencies (if any):

Ensure you have installed Bootstrap, JavaScript libraries, or any package managers (if used like npm):

bash

npm install  # if npm is used in the project


Then open http://localhost:8000 in your browser to view the frontend.
Link with Backend:

Make sure the frontend is correctly linked with the backend API. Modify the JavaScript files as necessary to point to the correct backend API endpoints (e.g., https://job-board-backend-zxvu.onrender.com/api/...).
Deployment

For production, you can deploy the frontend to a static hosting service such as GitHub Pages, Netlify, or Vercel. Ensure the API endpoints are properly configured for production.
Example deployment on GitHub Pages:

    Go to your repository settings.
    Scroll down to the GitHub Pages section.
    The site will be available at https://your-mdomor527461.github.io/job_board-frontend/.

API Endpoints

Some of the API endpoints used by the frontend include:

    User Registration: /api/users/register/
    User Login: /api/users/login/
    Employer Dashboard: /api/employer/dashboard/
    Job Seeker Dashboard: /api/job-seeker/dashboard/
    Job Listings: /api/jobs/
    Categories: /api/categories/
