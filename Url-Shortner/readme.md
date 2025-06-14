# URL Shortener Project

This project is a simple and efficient URL Shortener built with Node.js. It allows users to convert long URLs into short, manageable links and redirect them to the original long URLs. This project demonstrates fundamental backend skills such as REST API development, database integration, and basic authentication.

## Features

- **Shorten URLs**: Generate unique short links for any valid URL.
- **Redirection**: Redirect users to the original URL when accessing the short link.
- **API Endpoints**: RESTful API endpoints for creating and retrieving short URLs.
- **Database Integration**: Stores original and shortened URLs in a database (MongoDB).
- **Basic Error Handling**: Handles invalid URLs and non-existent short codes gracefully.
- **Extensible Structure**: Designed for easy addition of features like user authentication, analytics, or custom URL aliases.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose ODM)
- **Other Tools**: dotenv for environment variables, shortid or nanoid for generating unique short codes

## Folder Structure

```
Url-Shortner/
├── controllers/     # Request handlers (business logic)
├── models/          # Database schemas (Mongoose models)
├── routes/          # API route definitions
├── .env             # Environment variables (e.g., DB URL)
├── app.js           # Main Express app
├── package.json     # Project metadata and dependencies
└── README.md        # Project documentation
```

## How It Works

1. **User submits a long URL** via the API (POST request).
2. **Server generates a short code** and saves the mapping in MongoDB.
3. **User receives a short URL** (e.g., `https://yourdomain.com/abc123`).
4. **When the short URL is accessed**, the server redirects to the original long URL.

## Sample API Usage

### Shorten a URL

- **Endpoint:** `POST /api/shorten`
- **Request Body:**
  ```json
  {
    "originalUrl": "https://www.example.com"
  }
  ```
- **Response:**
  ```json
  {
    "shortUrl": "https://yourdomain.com/abc123"
  }
  ```

### Redirect

- **Endpoint:** `GET /:shortCode`
- **Action:** Redirects to the original URL mapped to `shortCode`.

## How to Run Locally

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Sonupandit9693/Learning-Node-js-Project.git
   cd Learning-Node-js-Project/Url-Shortner
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Create a `.env` file with your MongoDB connection string and other configs.
4. **Start the server:**
   ```sh
   npm start
   ```
5. **Test the API** using Postman or cURL.

## What I Learned

- Designing REST APIs and structuring a Node.js backend project.
- Integrating MongoDB using Mongoose.
- Handling asynchronous operations and errors in Express.
- Best practices for environment management and modular code.

## Future Improvements

- Add user authentication and URL history.
- Integrate analytics (click tracking).
- Allow custom short codes.
- Deploy to a cloud platform.

---

**This project is a strong demonstration of backend development skills and is suitable to showcase in your resume.**
