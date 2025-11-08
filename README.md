# Learnato Discussion

A lightweight discussion forum where learners can:
- Create posts
- View posts
- Upvote posts
- Reply to posts

Built with:
- **Frontend:** React + TypeScript + Tailwind + Vite
- **Backend:** Node.js + Express + TypeScript + LowDB (JSON storage)
- **Deployment Ready:** Docker & Docker Compose

---

## Features

| Feature | Status |
|--------|--------|
| Create Post | ✅ Done |
| List Posts | ✅ Done |
| View Single Post | ✅ Done |
| Add Replies | ✅ Done |
| Upvote Posts | ✅ Done |
| Responsive UI | ✅ Done |

---

## Project Structure

│
├─ backend/ # Node.js + Express + LowDB storage
│ ├─ src/
│ ├─ data/db.json
│ ├─ .env
│ └─ Dockerfile
│
├─ frontend/ # React + Vite + Tailwind
│ ├─ src/
│ ├─ .env
│ └─ Dockerfile
│
└─ docker-compose.yml


## 🖥️ Running Locally (Without Docker)

### Backend
add .env file with (PORT=8011) (already added .env in the repo)
cd backend
npm install
npm run build
npm run dev

Backend runs on: 8011

### Frontend

cd frontend
add .env file with (VITE_API_URL=http://localhost:8011) (already added .env in the repo)
npm install
npm run build
npm run dev

Frontend runs on: http://localhost:5173





## 🐳 Running with Docker

### Requirements
- Docker Desktop must be open and running.

### Command

docker-compose up --build


### Result
| Service | URL |
|--------|-----|
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |

---

## ⚙️ Environment Variables

| Location | Variable | Default |
|---------|----------|---------|
| Backend | `PORT` | `4000` |
| Frontend | `VITE_API_URL` | `http://localhost:4000` |



## 📝 API Endpoints (Backend)

| Method | Endpoint | Description |
|--------|---------|-------------|
| POST | `/posts` | Create a post |
| GET | `/posts` | Get all posts |
| GET | `/posts/:id` | Get a single post |
| POST | `/posts/:id/reply` | Add a reply |
| POST | `/posts/:id/upvote` | Upvote a post |


