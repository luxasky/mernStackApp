# Project Name
   
   MERN Portfolio App `LuX_Artist`

# Description
   
   The `LuX_Artist` is a web application designed for graphical designers and artists to showcase their skills and share their artwork posts, allowing users to search for other creative individuals and partners for collaborations and inspiration.
   Key features includes simple interface, easy to use for experienced professionals as well as amateur designers, with the ability to create posts, include art images, leave comments.

## Key Features
- **User Authentication**: Authentication login and account registration for artists (users).
- **Artwork Management**: Users can add, delete, and view artworks, leave comments.
- **Image Uploading**: Integration with Cloudinary for storing images.
- **Web Responsive Design**: Adapted for desktops and mobile devices.


## Technologies and Services Used
- **MongoDB**: For storing user and artwork data.
- **Express.js**: Back-end web application framework.
- **React**: Front-end JavaScript library for building user interfaces.
- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine.

- **Cloudinary**: For managing media storage and transformations.
- **Multer**: Middleware for handling multipart/form-data, primarily used for uploading files.
- **Yup**: For schema validation on the client side.


## Table of Contents

- [About](#about)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)


## About

- Benefits and Purpose of the Application

   The application’s purpose is to promote a simple way to start out when seeking collaboration opportunities, especially for college or self-taught beginner artists who frequently struggle to realise their potential on more advanced platforms such as Freelancer or Upwork. The application shall serve as an entry level portfolio site.

- Target Users 

   Amateur artists, web designers, logo designers, college students, as well as professionals whose aim is to easily share their skills and creative ideas. Users will interact with the application through the web browser. 
   
- Functionality and key features

   Artists can sign up for an account, login, view posts of other users, leave comments. When creating a post of their artwork, users can add descriptions and title to each of them. They can also view the main art gallery, which includes all the posts from all other users, as well as view their own portfolio collection. 

- Selected Technologies (the MERN stack) and Description: 

   * Frontend: The user interface will be implemented using a modern frontend framework React.js to ensure a responsive and dynamic application. 

   * Backend : Node.js as a backend framework for handling business logic, Express.js API for routing and managing HTTP requests, containing components for core business logic, authentication, artwork management, and comments. 

   * Database: (NoSQL)MongoDB will be used to store artwork-related and user information. 


## Getting Started

Instructions on how to get a copy of the project up and running on your local machine for development and testing purposes.

## Prerequisites

### Technologies Used

- **The MERN Stack**

   - [MongoDB]: For storing user and artwork data.
   - [Express.js]: Back-end web application framework.
   - [React]: Front-end JavaScript library for building user interfaces.
   - [Node.js]: JavaScript runtime built on Chrome's V8 JavaScript engine.

- **Adiditonal Middleware and Services Used**

   - [Cloudinary]: A cloud-based service for managing media (i.e. images of artworks) upload and storage. 
   - [Multer]: Middleware for handling 'multipart/form-data', used for uploading files (images of artworks).
   - [Yup]: A schema builder used for schema validation on the client side.

### List of All Software and Online Accounts Required 

   - [MongoDB](https://www.mongodb.com/)
   - [Express](https://expressjs.com/)
   - [React](https://reactjs.org/)
   - [Node.js](https://nodejs.org/)
   
   - [Cloudinary](https://cloudinary.com/)


## Installation

### Backend Setup

1. **Clone the repository**

    ```bash
    git clone https://github.com/luxasky/mernStackApp.git
    cd mernStackApp
    ```

2. **Navigate to the backend directory**

    ```bash
    cd backend
    ```

3. **Install backend dependencies**
   
    -- Core Frameworks and Libraries
    ```bash
    npm install express mongoose dotenv
    ```
    
    -- Authentication
    ```bash
    npm install bcrypt jsonwebtoken crypto
    ```

    -- File Upload 
    ```bash
    npm install cloudinary multer multer-storage-cloudinary 
    ```

    -- Middleware 
   ```bash
    npm install cors cookie-parser
    ```

4. **Create a `.env` file**

    -- Create a `.env` file in the `backend` directory and add the following environment variables:

    ```plaintext

    MONGO_URI=mongodb://your_mongo_db_uri
    PASSWORD=your-mongodb-password
    PORT=4000

    CLOUDINARY_CLOUD_NAME=your-cloudinary-cloud-name
    CLOUDINARY_API_KEY=your-cloudinary-api-key
    CLOUDINARY_API_SECRET=your-cloudinary-api-secret
    CLOUDINARY_URL=your-cloudinary-uri

    ```

5. **Start the backend server**

    ```bash
    npm start
    ```

### Frontend Setup

1. **Navigate back to the root `/` directory**

    ```bash
    cd ..
    ```
2. **Navigate to the frontend directory**

    ```bash
    cd frontend
    ```

3. **Install frontend dependencies**
   
    -- Core React Packages
    ```bash
    npm install react@18.2.0 react-dom@18.2.0
    ```
    
    -- Routing with React Router
    ```bash
    npm install react-router-dom@6.23.1
    ```

    -- HTTP Requests with Axios
    ```bash
    npm install axios@1.7.0 
    ```
    -- Form Handling with Formik and Schema Validation
    ```bash
    npm install formik@2.4.6 yup@1.4.0
    ```

   -- Middleware 
   ```bash
    npm install cors cookie-parser
    ```

4. **Start the frontend development server**

    ```bash
    npm start
    ```

## Running the Application

- Open your browser and navigate to `http://localhost:5173` to use the application.

## Test Cases and Data

### Test Case 1: **User Login**

Objective: To verify that the user can log in with valid credentials.

📝 Preconditions: User has already registered.

🧭 Steps:

1. Navigate to the login page.
2. Enter a valid username and password.
3. Click the "Login" button.

📉 Test Results: 

✅The user should be redirected to the updated `Home` page, showing the welcome message.
CHECK !!! - A welcome message should be displayed.


### Test Case 2: **User Registration**
Objective: To ensure that new users can register.

📝 Preconditions: None.

🧭 Steps:

1. Navigate to the `Home` page (it is also the default page that is opened)
2. Enter a unique username and a password of choice.
3. Click the `Sign up` button.

📉 Test Results: 

✅ The page will automatically reload after the credentials have been saved.
✅ After the page reload, user can enter their login details, press the `Login` button.
✅ They will be logged in and redirected to the updated Home page with contains navigation links to different sections of the application.


### Test Case 3: **Add a New Artwork**
Objective: Check the functionality of creating an artwork post with an image upload feature.

📝 Preconditions:
- User is logged in.

🧭 Steps:

1. Navigate to the `Add_Artwork` page.
2. Fill in the "Artwork Form" with the artwork "Title" and "Description" fields.
3. Choose a valid image file for upload ⬆️.
4. Click the `Add Artwork` button.
5. Once the form is successfully submitted, the user will be redirected to `My_Portfolio` page, where the updated collection of artworks will be displayed in order, showing the most recent artworks first.

📉 Test Results: 

✅ The artwork should be added to the user's portfolio.
✅ The user should be redirected to their `My_Portfolio` page and see their new artwork post added. It should be displayed on top of the previous posts.
✅ The new artwork should display on the `My_Portfolio` (portfolio) page, displaying the new artwork at the top of the page.

# Test Case 4: **Deleting Artwork**
Objective: To ensure that users can delete their artwork.

📝 Preconditions: 
- User has at least one artwork in their portfolio.
- User is logged in and trying to delete one of their own artworks.

🧭 Steps:

1. Navigate to the user's portfolio page, i.e. `My_Portfolio`.
2. Scroll down and choose an artwork you would like to delete and click on it.
3. An individual Artwork Profile page will be opened, showing an Artwork on the left and a comment section on the right.
4. The artwork will have a `🗑️` (bin) icon on the right side near the title.
3. Click on the bin icon and the artwork will be deleted.

📉 Test Results: 

✅ The artwork will be removed both from the Mongo database and Cloudinary storage.
✅ The user is redirected to their portfolio page which no longer displays the deleted artwork.
✅ The portfolio page should no longer display the deleted artwork.
✅ A confirmation appears confirming the deletion and redirects the user to the updated portfolio page.


## FEEDBACK

-- UPDATED DIAGRAM ✅ **Your architecture has an issue**: there is no line back from backend to frontend following the C4 model notation.

The design choices that you made are sufficient for your project.

1. **Include the changes**

Please include the changes to your proposal and why you made them. If there are no, please name that.


-- UPDATED ✅ 2. **Provide test cases and data**

Please provide test cases and data. You can write them as actions to be undertaken and expected results, e.g. click on button X / message Y is shown.

3. **Voice-over or subtitles**

Your screencast would benefit from a voice-over or subtitles.

-- UPDATED ✅  4. **Missing installation instructions**

Your repository is missing installation instructions. Please put them into the readme file.

5. **Add more web responsiveness**
Your app is responsive as it runs on mobile devices. However, some views like the shown list of artworks can be further optimized for mobile devices, especially those with small screens.

-- You can continue with the final phase now. You can submit a revised version of this document during the final submission.