#  Backend Chai — Video Hosting Platform API

A production-grade backend for a video hosting platform with full authentication, content management, and social features — built entirely with industry-standard Node.js practices.

---

##  Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT (Access + Refresh Tokens) |
| Password Hashing | bcrypt |
| File Storage | Cloudinary |
| File Uploads | Multer |
| Environment | dotenv |
| Code Style | Prettier |

---

##  Features

- **User Authentication** — Register, login, logout with secure JWT access & refresh tokens
- **Video Management** — Upload, publish, update, delete, and stream videos

- **Subscriptions** — Subscribe / unsubscribe to channels; view subscriber counts
- **Likes & Dislikes** — Like videos, comments, and tweets
- **Comments** — Add, edit, and delete comments on videos
- **Tweets** — Post short-form content
- **Playlists** — Create and manage video playlists
- **Dashboard** — Channel analytics and stats
- **Watch History** — Track user viewing history
- **Cloudinary Integration** — Secure cloud storage for videos and thumbnails

---

##  Project Structure

```
Backend_chai/
 public/
    temp/               # Temporary file storage before Cloudinary upload
 src/
    controllers/        # Route handler logic
       user.controller.js
       video.controller.js
       comment.controller.js
       like.controller.js
       playlist.controller.js
       subscription.controller.js
       tweet.controller.js
       dashboard.controller.js
    models/             # Mongoose schemas
       user.model.js
       video.model.js
       comment.model.js
       like.model.js
       playlist.model.js
       subscription.model.js
       tweet.model.js
    routes/             # Express route definitions
    middlewares/        # Auth, multer, error handlers
    utils/              # Helpers (ApiResponse, ApiError, asyncHandler, cloudinary)
    db/                 # MongoDB connection
    app.js              # Express app setup
    index.js            # Entry point
 .env.sample             # Environment variable template
 .prettierrc
 package.json
 README.md
```

---

##  Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/mandloi15/Backend_chai.git
cd Backend_chai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

```bash
cp .env.sample .env
```

Then fill in your `.env` file using the `.env.sample` as reference.

### 4. Start the server

```bash
# Development (with nodemon)
npm run dev

# Production
npm start
```

The server runs at `http://localhost:8000`

---

##  API Endpoints

### Auth — `/api/v1/users`

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| POST | `/register` | Register a new user |  |
| POST | `/login` | Login and get tokens |  |
| POST | `/logout` | Logout user |  |
| POST | `/refresh-token` | Refresh access token |  |
| GET | `/current-user` | Get logged-in user info |  |
| PATCH | `/update-account` | Update account details |  |
| PATCH | `/avatar` | Update avatar image |  |
| PATCH | `/cover-image` | Update cover image |  |
| GET | `/c/:username` | Get channel profile |  |
| GET | `/history` | Get watch history |  |

### Videos — `/api/v1/videos`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | Get all videos (with filters) |
| POST | `/` | Upload a new video |
| GET | `/:videoId` | Get video by ID |
| PATCH | `/:videoId` | Update video details |
| DELETE | `/:videoId` | Delete a video |
| PATCH | `/toggle/publish/:videoId` | Toggle publish status |

### Comments — `/api/v1/comments`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/:videoId` | Get all comments for a video |
| POST | `/:videoId` | Add a comment |
| PATCH | `/c/:commentId` | Edit a comment |
| DELETE | `/c/:commentId` | Delete a comment |

### Likes — `/api/v1/likes`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/toggle/v/:videoId` | Toggle like on a video |
| POST | `/toggle/c/:commentId` | Toggle like on a comment |
| POST | `/toggle/t/:tweetId` | Toggle like on a tweet |
| GET | `/videos` | Get all liked videos |

### Subscriptions — `/api/v1/subscriptions`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/c/:channelId` | Toggle subscription |
| GET | `/c/:channelId` | Get channel subscribers |
| GET | `/u/:subscriberId` | Get subscribed channels |

### Playlists — `/api/v1/playlist`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create playlist |
| GET | `/:playlistId` | Get playlist |
| PATCH | `/:playlistId` | Update playlist |
| DELETE | `/:playlistId` | Delete playlist |
| POST | `/add/:videoId/:playlistId` | Add video to playlist |
| DELETE | `/remove/:videoId/:playlistId` | Remove video from playlist |
| GET | `/user/:userId` | Get user's playlists |

### Tweets — `/api/v1/tweets`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/` | Create a tweet |
| GET | `/user/:userId` | Get user's tweets |
| PATCH | `/:tweetId` | Update a tweet |
| DELETE | `/:tweetId` | Delete a tweet |

### Dashboard — `/api/v1/dashboard`

| Method | Endpoint | Description |
|---|---|---|
| GET | `/stats` | Get channel stats |
| GET | `/videos` | Get all channel videos |

---

##  Authentication Flow

This project uses a **dual-token strategy**:

1. **Access Token** — Short-lived (1 day), sent with every protected request
2. **Refresh Token** — Long-lived (10 days), stored in DB and httpOnly cookie; used to issue new access tokens

```
Client → Login → Access Token + Refresh Token (cookie)
Client → API Request → Bearer Access Token in Authorization header
Client → Token Expired → POST /refresh-token → New Access Token
```

---

##  Utilities

| Utility | Purpose |
|---|---|
| `asyncHandler` | Wraps async route handlers; auto-forwards errors |
| `ApiError` | Standardized error class with status codes |
| `ApiResponse` | Standardized success response structure |
| `cloudinary.js` | Upload and delete files from Cloudinary |

---

##  Database Schema Highlights

- **User** — avatar, coverImage, watchHistory, refreshToken (hashed passwords, JWT methods)
- **Video** — videoFile, thumbnail, owner (ref User), views, isPublished
- **Subscription** — subscriber (ref User), channel (ref User)
- **Like** — polymorphic: links to video / comment / tweet + likedBy
- **Comment** — content, video (ref), owner (ref User)
- **Playlist** — name, videos array (ref Video), owner (ref User)
- **Tweet** — content, owner (ref User)

---

##  Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

##  License

This project is for educational purposes.
