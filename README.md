# Blog Project: Assignment Requirements

## Overview
The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.

## Technologies
- TypeScript
- Node.js
- Express.js
- MongoDB with Mongoose

## Features and Requirements

### 1. User Roles
#### Admin
- Manually created in the database with predefined credentials.
- Can delete any blog.
- Can block any user by updating a property `isBlocked`.
- Cannot update any blog.

#### User
- Can register and log in.
- Can create blogs (only when logged in).
- Can update and delete their own blogs.
- Cannot perform admin actions.

### 2. Authentication & Authorization
- **Authentication**: Users must log in to perform write, update, and delete operations.
- **Authorization**: Admin and User roles are differentiated and secured.

### 3. Blog API
#### Public API for Reading Blogs
- Includes blog title, content, author details, and other necessary information.
- Supports search, sorting, and filtering functionalities.

## Models

### User Model
- **name**: string – The full name of the user.
- **email**: string – The email address of the user, used for authentication and communication.
- **password**: string – The password for the user, securely stored.
- **role**: "admin" | "user" – The role of the user, determining their access level. Default is "user".
- **isBlocked**: boolean – A flag indicating whether the user is blocked or not. Default is false.
- **createdAt**: Date – The timestamp when the user was created.
- **updatedAt**: Date – The timestamp of the last update to the user.

### Blog Model
- **title**: string – The title of the blog post.
- **content**: string – The main body or content of the blog post.
- **author**: ObjectId – A reference to the User model, indicating the author of the blog post.
- **isPublished**: boolean – A flag indicating whether the blog post is published. Default is true (published).
- **createdAt**: Date – The timestamp when the blog post was created.
- **updatedAt**: Date – The timestamp of the last update to the blog post.

## API Endpoints

### 1. Authentication
#### Register User
`POST /api/auth/register`
- Registers a new user with the platform.

#### Login User
`POST /api/auth/login`
- Authenticates a user with their email and password and generates a JWT token.

### 2. Blog Management
#### Create Blog
`POST /api/blogs`
- Allows a logged-in user to create a blog by providing a title and content.

#### Update Blog
`PATCH /api/blogs/:id`
- Allows a logged-in user to update their own blog by its ID.

#### Delete Blog
`DELETE /api/blogs/:id`
- Allows a logged-in user to delete their own blog by its ID.

#### Get All Blogs (Public)
`GET /api/blogs`
- Provides a public API to fetch all blogs with options for searching, sorting, and filtering.

### 3. Admin Actions
#### Block User
`PATCH /api/admin/users/:userId/block`
- Allows an admin to block a user by updating the `isBlocked` property to true.

#### Delete Blog
`DELETE /api/admin/blogs/:id`
- Allows an admin to delete any blog by its ID.

---
This project aims to implement all the listed features following the specified requirements and best practices for backend development.
