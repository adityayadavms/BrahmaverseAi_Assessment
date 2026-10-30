# Brahma AI CRM Backend Assessment

A scalable and secure REST API for a Customer Relationship Management (CRM) system built with Node.js, Express, MongoDB, and JWT.

## Features
- **Authentication & Authorization:** JWT-based auth with Role-Based Access Control (Admin vs. Counselor).
- **Approval Workflow:** Self-registered counselors start as `pending` and must be approved by an Admin.
- **Role Management:** Admins can promote active counselors to Admins.
- **Public Lead Capture:** Unauthenticated endpoints to capture prospective client enquiries.
- **Atomic Lead Claiming:** Race-condition-proof lead claiming using MongoDB `findOneAndUpdate`.
- **Daily Limit Enforcement:** Counselors are restricted to claiming a maximum of 8 leads per day.
- **Service-Layer Architecture:** Clean separation of concerns (Routes -> Controllers -> Services -> Models).

## Tech Stacks
- **Node.js & Express** (Server & Routing)
- **MongoDB & Mongoose** (Database & ODM)
- **JSON Web Tokens (JWT)** (Authentication)
- **Bcrypt.js** (Password Hashing)

## Setup & Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/adityayadavms/BrahmaverseAi_Assessment.git
   cd BrahmaverseAi_Assessment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   Then set `MONGO_URI`, `JWT_SECRET`, and `PORT`.

4. **Start the server**
   ```bash
   npm run dev
   ```
