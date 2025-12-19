-- Smart Fitness Routine & Meal Planner Database Schema

CREATE DATABASE IF NOT EXISTS smart_fitness_db;
USE smart_fitness_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    age INT NOT NULL,
    gender ENUM('male', 'female', 'other') NOT NULL,
    height DECIMAL(5,2) NOT NULL COMMENT 'Height in cm',
    weight DECIMAL(5,2) NOT NULL COMMENT 'Weight in kg',
    goal ENUM('weight_loss', 'muscle_gain', 'maintenance') NOT NULL,
    role ENUM('user', 'trainer', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- WorkoutMealPlans Table
CREATE TABLE IF NOT EXISTS workout_meal_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    exercises JSON NOT NULL COMMENT 'Array of exercise objects',
    meals JSON NOT NULL COMMENT 'Array of meal objects with calories',
    completed_exercises JSON DEFAULT '[]' COMMENT 'Array of completed exercise IDs',
    completed_meals JSON DEFAULT '[]' COMMENT 'Array of completed meal IDs',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_user_day (user_id, day)
);

-- Indexes for better performance
CREATE INDEX idx_user_id ON workout_meal_plans(user_id);
CREATE INDEX idx_user_email ON users(email);

