# Job Portal API - Postman Testing Guide

Base URL: `http://localhost:5000`

---

## 🏢 COMPANY/RECRUITER ROUTES

### 1. Register Company
- **Method:** POST
- **URL:** `http://localhost:5000/api/company/register`
- **Body (JSON):**
```json
{
  "name": "Tech Corp",
  "email": "recruiter@techcorp.com",
  "password": "password123",
  "location": "San Francisco, CA",
  "description": "Leading tech company"
}
```

### 2. Company Login
- **Method:** POST
- **URL:** `http://localhost:5000/api/company/login`
- **Body (JSON):**
```json
{
  "email": "recruiter@techcorp.com",
  "password": "password123"
}
```
- **Response:** Copy the `token` from response for authenticated requests

### 3. Get Company Profile
- **Method:** GET
- **URL:** `http://localhost:5000/api/company/profile`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

### 4. Update Company Profile
- **Method:** PUT
- **URL:** `http://localhost:5000/api/company/profile`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body (JSON):**
```json
{
  "name": "Tech Corp Updated",
  "location": "New York, NY",
  "description": "Updated description",
  "image": "https://example.com/logo.png"
}
```

### 5. Company Dashboard Stats
- **Method:** GET
- **URL:** `http://localhost:5000/api/company/dashboard`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

### 6. Manage Jobs (Get All Company Jobs)
- **Method:** GET
- **URL:** `http://localhost:5000/api/company/manage-jobs`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

---

## 💼 JOB ROUTES

### 1. Create New Job
- **Method:** POST
- **URL:** `http://localhost:5000/api/jobs`
- **Headers:**
  - `Authorization: Bearer YOUR_COMPANY_TOKEN`
- **Body (JSON):**
```json
{
  "title": "Full Stack Developer",
  "description": "<p>We are looking for a talented developer...</p>",
  "requirements": "<ul><li>3+ years experience</li><li>Node.js & React</li></ul>",
  "responsibilities": "<ul><li>Develop features</li><li>Code reviews</li></ul>",
  "location": "San Francisco, CA",
  "category": "Software Development",
  "level": "Mid Level",
  "salary": "$80,000 - $120,000"
}
```

### 2. Get All Jobs (with filters)
- **Method:** GET
- **URL:** `http://localhost:5000/api/jobs`
- **Query Parameters (optional):**
  - `title=developer`
  - `location=San Francisco`
  - `category=Software Development`
  - `page=1`
  - `limit=10`
- **Example:** `http://localhost:5000/api/jobs?title=developer&location=San%20Francisco`

### 3. Get Single Job
- **Method:** GET
- **URL:** `http://localhost:5000/api/jobs/:jobId`
- **Example:** `http://localhost:5000/api/jobs/67895f4d3e2a1b0012345678`

### 4. Update Job
- **Method:** PUT
- **URL:** `http://localhost:5000/api/jobs/:jobId`
- **Headers:**
  - `Authorization: Bearer YOUR_COMPANY_TOKEN`
- **Body (JSON):**
```json
{
  "title": "Senior Full Stack Developer",
  "salary": "$100,000 - $150,000"
}
```

### 5. Delete Job (Soft Delete)
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/jobs/:jobId`
- **Headers:**
  - `Authorization: Bearer YOUR_COMPANY_TOKEN`

### 6. Get Jobs by Company
- **Method:** GET
- **URL:** `http://localhost:5000/api/jobs/company/:companyId`
- **Example:** `http://localhost:5000/api/jobs/company/67895f4d3e2a1b0012345678`

---

## 📝 APPLICATION ROUTES

### 1. Submit Job Application
- **Method:** POST
- **URL:** `http://localhost:5000/api/applications`
- **Body (form-data):**
  - `jobId`: `67895f4d3e2a1b0012345678`
  - `userId`: `user_clerk_id_here`
  - `companyId`: `67895f4d3e2a1b0012345678`
  - `name`: `John Doe`
  - `email`: `john@example.com`
  - `resume`: [File] (Select PDF file)
  - `coverLetter`: `I am interested in this position...`
  - `imgSrc`: `https://example.com/profile.jpg`

### 2. Get User's Applications
- **Method:** GET
- **URL:** `http://localhost:5000/api/applications/user/:userId`
- **Headers:**
  - `Authorization: Bearer YOUR_CLERK_TOKEN`
- **Example:** `http://localhost:5000/api/applications/user/user_clerk_id`

### 3. Get Applications for a Job
- **Method:** GET
- **URL:** `http://localhost:5000/api/applications/job/:jobId`
- **Headers:**
  - `Authorization: Bearer YOUR_COMPANY_TOKEN`
- **Example:** `http://localhost:5000/api/applications/job/67895f4d3e2a1b0012345678`

### 4. Get Single Application
- **Method:** GET
- **URL:** `http://localhost:5000/api/applications/:applicationId`
- **Example:** `http://localhost:5000/api/applications/67895f4d3e2a1b0012345678`

### 5. Update Application Status
- **Method:** PUT
- **URL:** `http://localhost:5000/api/applications/:applicationId/status`
- **Headers:**
  - `Authorization: Bearer YOUR_COMPANY_TOKEN`
- **Body (JSON):**
```json
{
  "status": "Accepted"
}
```
*Valid status values: Pending, Accepted, Rejected*

### 6. Delete Application
- **Method:** DELETE
- **URL:** `http://localhost:5000/api/applications/:applicationId`
- **Example:** `http://localhost:5000/api/applications/67895f4d3e2a1b0012345678`

---

## 👤 USER ROUTES

### 1. Get User Profile
- **Method:** GET
- **URL:** `http://localhost:5000/api/users/profile`
- **Headers:**
  - `Authorization: Bearer YOUR_CLERK_TOKEN`

### 2. Update User Profile
- **Method:** PUT
- **URL:** `http://localhost:5000/api/users/profile`
- **Headers:**
  - `Authorization: Bearer YOUR_CLERK_TOKEN`
- **Body (JSON):**
```json
{
  "name": "John Doe Updated",
  "image": "https://example.com/newprofile.jpg"
}
```

### 3. Upload/Update Resume
- **Method:** POST
- **URL:** `http://localhost:5000/api/users/resume`
- **Headers:**
  - `Authorization: Bearer YOUR_CLERK_TOKEN`
- **Body (form-data):**
  - `resume`: [File] (Select PDF file)

---

## 🔔 WEBHOOK ROUTES

### 1. Clerk Webhook (For Clerk Integration)
- **Method:** POST
- **URL:** `http://localhost:5000/api/webhooks/clerk`
- **Headers:**
  - `svix-id`: webhook_id
  - `svix-timestamp`: timestamp
  - `svix-signature`: signature
- **Body:** Clerk webhook payload

---

## 📊 HEALTH CHECK

### API Health Check
- **Method:** GET
- **URL:** `http://localhost:5000/`
- **Expected Response:**
```json
{
  "success": true,
  "message": "Job Portal API is running",
  "version": "1.0.0"
}
```

---

## 🔐 AUTHENTICATION

### Company Token (JWT)
After company login, you'll receive a token. Add it to requests as:
- **Header:** `Authorization: Bearer YOUR_TOKEN_HERE`

### Clerk Token
For user routes, use Clerk-generated JWT token in the same format.

---

## 📝 TESTING WORKFLOW

1. **Register & Login as Company:**
   - Register: POST `/api/company/register`
   - Login: POST `/api/company/login`
   - Copy the token from response

2. **Create Jobs:**
   - Use company token to create jobs: POST `/api/jobs`

3. **Browse Jobs:**
   - Get all jobs: GET `/api/jobs`
   - Get specific job: GET `/api/jobs/:id`

4. **Apply to Jobs:**
   - Submit application with resume: POST `/api/applications`

5. **Manage Applications:**
   - View applications as company: GET `/api/applications/job/:jobId`
   - Update status: PUT `/api/applications/:id/status`

6. **Dashboard:**
   - Check company stats: GET `/api/company/dashboard`

---

## 🚨 COMMON ERRORS

### 401 Unauthorized
- Missing or invalid token
- Token expired

### 400 Bad Request
- Missing required fields
- Invalid data format

### 404 Not Found
- Resource doesn't exist
- Invalid ID format

### 500 Internal Server Error
- Database connection issues
- Server-side errors

---

## 💡 TIPS

1. **Save Environment Variables in Postman:**
   - Create variable `baseURL` = `http://localhost:5000`
   - Create variable `companyToken` = your token
   - Use: `{{baseURL}}/api/company/profile`

2. **Test File Uploads:**
   - Use form-data, not JSON
   - Select file type for resume field

3. **MongoDB ObjectIDs:**
   - Use actual IDs from created documents
   - Format: 24 hex characters

4. **CORS:**
   - Already configured for localhost:5173
   - No issues testing from Postman
