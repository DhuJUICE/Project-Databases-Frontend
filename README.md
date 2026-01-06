# DevSocial – Frontend

The React frontend for DevSocial, a developer-focused social network built using a microservices architecture.

## Overview

This frontend provides the user interface for developers to:
- Register and log in
- View a personalized feed
- Post code snippets as images
- Like, comment, and follow other developers

It communicates exclusively with the system through an API Gateway.

## Key Features

- Authentication using JWT
- Developer feed
- Posting code snippets (image-based)
- Social interactions (likes, comments, follow/unfollow)
- API-based communication with backend services

## Tech Stack

- React
- JavaScript
- Node.js

## Project Status

- 🟡 Functional prototype
- Core features implemented

## Running Locally

### Prerequisites

- Node.js
- npm

### Setup

```bash
git clone <frontend-repo-url>
cd frontend
npm install
npm start

The application runs on http://localhost:3000.

Notes

This frontend depends on the DevSocial API Gateway.
Backend services must be running for full functionality.

What This Repo Demonstrates

Frontend application structure
Client-side authentication handling
Integration with a microservices backend via an API Gateway