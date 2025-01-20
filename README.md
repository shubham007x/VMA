# VMA - Video Management Application
![image](https://github.com/user-attachments/assets/75acfa58-1b92-4786-a86e-c8e948f52668)
![image](https://github.com/user-attachments/assets/007409b7-2eec-434f-9e7d-151aa03a955b)



This is a **Video Management Application** built with the **MERN stack** (MongoDB, Express, React, Node.js) and deployed using **Docker**. The app allows users to upload, view, and manage their own video collections. Each user has access to their own videos, and all services are run inside Docker containers.

## Features

- **User Authentication**: Implemented with **JWT**.
- **Video Uploading**: Upload videos directly from **Google Drive**.
- **Video Management**: Features include filtering, pagination, and metadata generation.
- **Responsive UI**: Built with **React** for an optimal user experience.
- **Backend**: **Express.js** for handling API requests, **MongoDB** for storing metadata.

## Technologies Used

- **Frontend**: React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (running in a separate Docker container)
- **Containerization**: Docker
- **Authentication**: JWT (JSON Web Token)

---

## How to Start the Application

### 1. Run Containers Using Docker

To run the application, use the following commands to pull and run the frontend, backend, and MongoDB containers directly from Docker Hub. This will launch each service in separate containers.

#### Step 1: Pull and Run MongoDB Container

```bash

docker pull shubham007x/mongo

docker run -dp 0.0.0.0:27017:27017 shubham007x/mongo

```

This will pull the MongoDB image from Docker Hub and start it in a container. It will be available on port 27017.

Step 2: Pull and Run Backend Container
```bash
docker pull shubham007x/vma-backend

docker run -dp 0.0.0.0:5000:5000 --link mongo:27017 shubham007x/vma-backend
```
This will pull the Backend image and start it on port 5000. It will link to the MongoDB container that you started earlier.

Step 3: Pull and Run Frontend Container
```bash
docker pull shubham007x/vma-frontend

docker run -dp 0.0.0.0:3000:3000 shubham007x/vma-frontend
```
This will pull the Frontend (React app) image and start it on port 3000.

2. Access the Application
Once all containers are running, you can access the application at:

Frontend (React app): http://localhost:3000
Backend (Express API): http://localhost:5000
MongoDB: mongodb://localhost:27017/videoDB (for internal use or admin access)
How to Use the Application
1. User Registration & Login
Register a new user via the /api/register endpoint.
Login using the /api/login endpoint to obtain a JWT token for further interactions.
2. Upload Videos
Use the /api/upload endpoint to upload videos.
Metadata will be automatically stored in MongoDB, including video title, description, tags, and file size.
3. Search Videos
Pagination is available to manage large video collections efficiently.
Troubleshooting
If you run into any issues, make sure to check the following:

Running Containers: Use docker ps to verify that the containers for the frontend, backend, and MongoDB are running.
MongoDB Connection: Ensure the backend is correctly connected to MongoDB via mongodb://mongo:27017/videoDB.
Notes for Deployment
This setup is for local development. For production deployments, you may need to configure MongoDB to use MongoDB Atlas or another cloud provider and update the connection string accordingly.


Final Notes
Users don’t need to clone or manually configure the project. They can simply run the provided docker run -dp commands to get the entire app up and running in a few steps.
