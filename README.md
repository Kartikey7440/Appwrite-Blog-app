# 📝 Appwrite Blog App

A feature-rich, high-performance, and fully responsive modern blogging platform built with **React 19**, **Vite**, **Tailwind CSS v4**, **Redux Toolkit**, and **Appwrite Cloud**. 

🔗 **Live Demo:** [appwrite-blog-app-liard-pi.vercel.app](https://appwrite-blog-app-liard-pi.vercel.app/)

---

## ✨ Features

- 🔐 **User Authentication**: Secure signup, login, and session persistence powered by Appwrite Auth.
- 📝 **Rich Text Editor**: Richly formatted article creation and editing using the integrated TinyMCE WYSIWYG editor.
- 📁 **Media Storage**: Seamless image uploads, previews, and deletion using Appwrite Buckets.
- ⚡ **Global State**: Session state and post management implemented using Redux Toolkit.
- 🎨 **Modern Interface**: Clean, responsive grid layout and glassmorphism styling built with Tailwind CSS v4.
- 🚦 **Route Protection**: Route guarding using custom `AuthLayout` middleware to prevent unauthorized access.
- 📋 **Optimized Forms**: Lightweight, performant form submission and validation handling via React Hook Form.

---

## 🛠️ Tech Stack

- **Frontend Library**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **State Management**: Redux Toolkit & React Redux
- **Routing**: React Router DOM (v7)
- **Forms**: React Hook Form
- **Rich Text Editor**: TinyMCE React
- **Backend as a Service (BaaS)**: Appwrite Cloud

---

## 📁 Project Structure

```text
src/
├── appwrite/          # Appwrite backend integration & service classes
│   ├── auth.js        # Authentication service wrapper
│   └── config.js      # Databases and Storage bucket service wrapper
├── components/        # Reusable UI & Layout components
│   ├── container/     # Page width container component
│   ├── Footer/        # Standard page footer
│   ├── Header/        # Responsive header with navigation links
│   ├── postform/      # Form logic for creating & editing posts
│   ├── AuthLayout.jsx # Route guard middleware component
│   ├── Button.jsx     # Reusable custom button
│   ├── Input.jsx      # Reusable custom text/email/password inputs
│   ├── Login.jsx      # Dedicated Login component
│   ├── PostCard.jsx   # Grid post card displaying featured images
│   ├── RTE.jsx        # Rich Text Editor wrapper (TinyMCE)
│   └── Select.jsx     # Dropdown list component
├── conf/              # Environment variables wrapper configuration
│   └── conf.js
├── pages/             # Pages mapped to application routes
│   ├── AddPost.jsx
│   ├── AllPost.jsx
│   ├── EditPost.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Post.jsx
│   └── Signup.jsx
├── store/             # Redux Store and Slices
│   ├── authSlice.js
│   └── store.js
├── App.jsx            # Main app controller
├── index.css          # Tailwind CSS directives
└── main.jsx           # App entry point
```

---

## 🚀 Getting Started

### 📋 Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (v18.x or later)
- **npm** or **bun** package manager
- An active **Appwrite Cloud** account

### ⚙️ Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Kartikey7440/Appwrite-Blog-app.git
   cd "Appwrite Blog App"
   ```

2. **Install Dependencies**
   Using `npm`:
   ```bash
   npm install
   ```
   Or using `bun`:
   ```bash
   bun install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory by copying the sample:
   ```bash
   cp .env.sample .env
   ```
   Populate the variables with your own Appwrite Project and Database credentials:
   ```env
   VITE_APPWRITE_URL="https://cloud.appwrite.io/v1"
   VITE_APPWRITE_PROJECT_ID="your_project_id"
   VITE_APPWRITE_DATABASE_ID="your_database_id"
   VITE_APPWRITE_COLLECTION_ID="your_collection_id"
   VITE_APPWRITE_BUCKETLIST_ID="your_bucket_id"
   VITE_TINYMCE_API_KEY="your_tinymce_api_key"
   ```

4. **Run Locally**
   ```bash
   npm run dev
   # or
   bun dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## ⚙️ Appwrite Backend Setup

To run this project fully, you need to configure your Appwrite console:

### 1. Database & Collections
Create a database in your project, then create a collection named `article` (or your chosen Collection ID) with the following attributes:

| Key | Type | Size | Required | Array |
| :--- | :--- | :--- | :--- | :--- |
| **title** | String | 255 | Yes | No |
| **slug** | String | 255 | Yes | No |
| **content** | String | 1000000 | Yes | No |
| **featureimage** | String | 255 | Yes | No |
| **status** | String | 50 | Yes | No |
| **userID** | String | 255 | Yes | No |

> [!IMPORTANT]
> **Index Setup**: You must create a **Key** index for the attribute `status` in the collection dashboard. The backend filters posts using `Query.equal("status", "active")`, which requires a status index to work.

### 2. Storage Bucket
Create a new storage bucket to store post header/featured images:
- Set the **Bucket ID** and update your `.env` file under `VITE_APPWRITE_BUCKETLIST_ID`.
- Update the permissions of the bucket to allow **All users** (or authenticated users, depending on your use case) to have Read and Write accesses.

---

## 📄 License

This project is licensed under the MIT License.
