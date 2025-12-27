<<<<<<< HEAD
# Smart Fitness Routine & Meal Planner 🏋️‍♂️🥗

A full-stack web application that provides personalized fitness routines and meal plans based on user goals. Built with Angular 16, Node.js (TypeScript), Express, and MySQL.

![FitPlanner Dashboard](https://img.shields.io/badge/Status-Active-success)
![Angular](https://img.shields.io/badge/Angular-16-red)
![Node.js](https://img.shields.io/badge/Node.js-TypeScript-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)

## Features

### User Management
- User registration and authentication with JWT
- Profile management (name, age, gender, height, weight)
- Fitness goal selection (Weight Loss, Muscle Gain, Maintenance)
- BMI calculator with visual indicator
- Role-based access control (User, Trainer, Admin)

### Workout Management
- Auto-generated weekly workout routines based on fitness goals
- Day-by-day exercise view with detailed instructions
- Mark exercises as completed (toggle on/off)
- Progress tracking per day and overall
- Rest day support with recovery tips

### Meal Planning
- Personalized daily meal plans with calorie targets
- Meals organized by type (Breakfast, Lunch, Dinner, Snacks)
- Macronutrient tracking (Protein, Carbs, Fat)
- Mark meals as consumed
- Calorie progress visualization

### Progress Tracking
- Weekly exercise progress charts
- Calorie intake trend visualization
- Daily breakdown with completion status
- Achievement badges system
- Overall progress summary

## Tech Stack

### Frontend
- **Framework:** Angular 16
- **UI Library:** Angular Material
- **Charts:** ng2-charts (Chart.js)
- **Styling:** SCSS

### Backend
- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs

### Database
- **Database:** MySQL
- **Tables:** 
  - `users` - User profiles and authentication
  - `workout_meal_plans` - Weekly plans with exercises and meals

## Project Structure

```
smart-fitness/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.ts        # MySQL connection & schema
│   │   ├── controllers/
│   │   │   ├── authController.ts  # Auth endpoints
│   │   │   └── planController.ts  # Plan management
│   │   ├── middleware/
│   │   │   ├── auth.ts            # JWT verification
│   │   │   ├── errorHandler.ts    # Error handling
│   │   │   └── validateRequest.ts # Input validation
│   │   ├── routes/
│   │   │   ├── authRoutes.ts      # Auth routes
│   │   │   └── planRoutes.ts      # Plan routes
│   │   ├── types/
│   │   │   └── index.ts           # TypeScript interfaces
│   │   ├── utils/
│   │   │   └── planGenerator.ts   # Exercise & meal generation
│   │   └── server.ts              # Express app entry
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── dashboard/     # Main dashboard
│   │   │   │   ├── home/          # Landing page
│   │   │   │   ├── login/         # Login form
│   │   │   │   ├── register/      # Registration form
│   │   │   │   ├── profile/       # User profile
│   │   │   │   ├── workout-routine/   # Workouts page
│   │   │   │   ├── meal-planner/      # Nutrition page
│   │   │   │   ├── progress-tracker/  # Progress page
│   │   │   │   ├── sidebar/       # Navigation sidebar
│   │   │   │   ├── header/        # Top header
│   │   │   │   └── settings/      # Account settings
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts  # Authentication guard
│   │   │   │   └── role.guard.ts  # Role-based guard
│   │   │   ├── interceptors/
│   │   │   │   └── auth.interceptor.ts  # JWT interceptor
│   │   │   ├── models/
│   │   │   │   └── user.model.ts  # TypeScript interfaces
│   │   │   ├── services/
│   │   │   │   ├── auth.service.ts    # Auth API calls
│   │   │   │   └── plan.service.ts    # Plan API calls
│   │   │   ├── app.module.ts
│   │   │   ├── app.component.ts
│   │   │   └── app-routing.module.ts
│   │   ├── environments/
│   │   └── styles.scss
│   ├── angular.json
│   └── package.json
│
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL Server (v8.0 or higher)
- Angular CLI (`npm install -g @angular/cli`)

### Database Setup

1. Start MySQL server
2. Create a database (optional - app creates it automatically):
```sql
CREATE DATABASE fitness_planner;
```

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=fitness_planner
JWT_SECRET=your_secret_key_here
PORT=3000
```

4. Start the server:
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Update API URL (if needed) in `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

4. Start the application:
```bash
# Development server
ng serve

# Production build
ng build
```

5. Open browser at `http://localhost:4200`

## API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/profile` | Get user profile |
| PUT | `/api/auth/profile` | Update user profile |

### Plans
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/plans/generate` | Generate weekly plan |
| GET | `/api/plans/weekly` | Get weekly plan |
| GET | `/api/plans/day/:day` | Get specific day plan |
| POST | `/api/plans/exercise/complete` | Toggle exercise completion |
| POST | `/api/plans/meal/consume` | Toggle meal consumption |
| GET | `/api/plans/progress` | Get progress summary |

## Database Schema

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| email | VARCHAR(255) | Unique email |
| password | VARCHAR(255) | Hashed password |
| name | VARCHAR(100) | User's name |
| age | INT | User's age |
| gender | ENUM | male/female/other |
| height | DECIMAL | Height in cm |
| weight | DECIMAL | Weight in kg |
| goal | ENUM | weight_loss/muscle_gain/maintenance |
| role | ENUM | user/trainer/admin |
| created_at | TIMESTAMP | Registration date |

### Workout Meal Plans Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT | Primary key |
| user_id | INT | Foreign key to users |
| day | ENUM | Monday-Sunday |
| exercises | JSON | Array of exercises |
| meals | JSON | Array of meals |
| completed_status | JSON | Completion tracking |

## Usage Guide

1. **Register/Login**: Create an account or login with existing credentials

2. **Complete Profile**: Add your personal details (age, height, weight) and select your fitness goal

3. **Generate Plan**: Click "Generate Plan" to create a personalized weekly workout and meal plan

4. **Track Workouts**: 
   - Navigate to Workouts page
   - Select a day to view exercises
   - Check off exercises as you complete them

5. **Track Nutrition**:
   - Navigate to Nutrition page
   - View daily meals and calorie targets
   - Mark meals as consumed

6. **Monitor Progress**:
   - Navigate to Progress page
   - View charts and statistics
   - Unlock achievements by completing goals

## Screenshots

### Home Page
- Clean landing page with sign in/register options
- Professional design with fitness-themed content

### Dashboard
- Welcome message with user's name
- Quick stats (workout progress, nutrition progress, calories, goal)
- Weekly overview with progress rings
- Quick action links

### Workouts
- Day tabs for easy navigation
- Exercise cards with sets, reps, and instructions
- Completion checkboxes with visual feedback
- Rest day support

### Nutrition
- Calorie tracking with progress ring
- Macronutrient breakdown
- Meals grouped by type
- Easy meal logging

### Progress
- Bar chart for exercise completion
- Line chart for calorie trends
- Daily breakdown table
- Achievement badges

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Angular Material for UI components
- Chart.js for data visualization
- Express.js for backend framework
- MySQL for database management
=======
# Smart Fitness Routine & Meal Planner

## Objective
A full-stack web application that provides personalized fitness routines and meal plans based on user goals.

## Tech Stack
- Frontend: Angular
- Backend: Node.js (TypeScript, Express)
- Database: MySQL

## Features
- User authentication
- Profile & goal management
- Weekly workout routine generation
- Meal planning with calorie tracking
- Progress tracking dashboard
- Role-based access control

## Project Structure
smart-fitness-routine-meal-planner/
├── backend/
├── frontend/
└── README.md

## Status
Capstone Project – In Progress
>>>>>>> 519f709e43c7e95fa57c44864e52a4317045d85b
