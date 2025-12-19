# Smart Fitness Routine & Meal Planner - Backend API

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env` (if it exists) or create a `.env` file
   - Configure your database credentials:
```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=smart_fitness_db
JWT_SECRET=your-secret-key-change-in-production
```

3. Set up MySQL database:
   - Create the database by running the SQL schema:
   ```bash
   mysql -u root -p < src/database/schema.sql
   ```
   Or manually execute the SQL file in your MySQL client.

### Running the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm run build
npm start
```

The server will start on `http://localhost:3000` (or the port specified in `.env`).

### API Endpoints

#### Health Check
- `GET /api/health` - Check if server is running

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Profile
- `GET /api/profile` - Get user profile (requires authentication)
- `PUT /api/profile` - Update user profile (requires authentication)

#### Workouts
- `GET /api/workouts` - Get workout plans (requires authentication)
- `PUT /api/workouts/:day` - Update workout completion status (requires authentication)

#### Meals
- `GET /api/meals` - Get meal plans (requires authentication)
- `PUT /api/meals/:day` - Update meal completion status (requires authentication)

#### Progress
- `GET /api/progress` - Get progress data (requires authentication)

### Database Schema

The database consists of two main tables:

1. **users** - Stores user information and profile data
2. **workout_meal_plans** - Stores weekly workout routines and meal plans per user

See `src/database/schema.sql` for the complete schema.

### Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-token>
```

### Error Handling

All endpoints return consistent error responses:
```json
{
  "error": "Error type",
  "message": "Human-readable error message"
}
```

