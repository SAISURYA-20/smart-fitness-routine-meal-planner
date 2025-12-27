import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div class="home-page">
      <!-- Hero Section -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">🏆 #1 Fitness Planning App</div>
          <h1>Transform Your Body,<br>Transform Your Life</h1>
          <p>Get personalized workout routines and meal plans tailored to your unique fitness goals. Start your journey to a healthier, stronger you today.</p>
          <div class="hero-actions">
            <a mat-flat-button color="primary" routerLink="/register" class="cta-btn">
              Start Free Today
              <mat-icon>arrow_forward</mat-icon>
            </a>
            <a mat-stroked-button routerLink="/login" class="secondary-btn">
              Sign In
            </a>
          </div>
          <div class="hero-stats">
            <div class="stat">
              <span class="stat-value">10K+</span>
              <span class="stat-label">Active Users</span>
            </div>
            <div class="stat">
              <span class="stat-value">500+</span>
              <span class="stat-label">Workout Plans</span>
            </div>
            <div class="stat">
              <span class="stat-value">1000+</span>
              <span class="stat-label">Healthy Recipes</span>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="visual-card card1">
            <mat-icon>fitness_center</mat-icon>
            <span>Daily Workouts</span>
          </div>
          <div class="visual-card card2">
            <mat-icon>restaurant</mat-icon>
            <span>Meal Plans</span>
          </div>
          <div class="visual-card card3">
            <mat-icon>trending_up</mat-icon>
            <span>Track Progress</span>
          </div>
        </div>
      </section>

      <!-- Features Section -->
      <section class="features">
        <div class="section-header">
          <h2>Everything You Need to Succeed</h2>
          <p>Comprehensive tools designed to help you achieve your fitness goals</p>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon workout">
              <mat-icon>directions_run</mat-icon>
            </div>
            <h3>Smart Workout Plans</h3>
            <p>AI-powered workout routines customized to your fitness level and goals. Whether you want to lose weight, build muscle, or maintain fitness.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon nutrition">
              <mat-icon>restaurant_menu</mat-icon>
            </div>
            <h3>Personalized Nutrition</h3>
            <p>Get meal plans with detailed calorie and macro tracking. Delicious recipes that fit your dietary preferences and fitness objectives.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon progress">
              <mat-icon>insights</mat-icon>
            </div>
            <h3>Progress Tracking</h3>
            <p>Visual charts and analytics to monitor your journey. Celebrate achievements and stay motivated with detailed progress reports.</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon goals">
              <mat-icon>emoji_events</mat-icon>
            </div>
            <h3>Goal-Based Planning</h3>
            <p>Choose your goal - weight loss, muscle gain, or maintenance. Our system adapts everything to help you reach your target.</p>
          </div>
        </div>
      </section>

      <!-- Quotes Section -->
      <section class="quotes">
        <div class="quotes-container">
          <div class="quote-card">
            <mat-icon class="quote-icon">format_quote</mat-icon>
            <p class="quote-text">"The only bad workout is the one that didn't happen."</p>
            <span class="quote-author">— Fitness Wisdom</span>
          </div>
          <div class="quote-card featured">
            <mat-icon class="quote-icon">format_quote</mat-icon>
            <p class="quote-text">"Take care of your body. It's the only place you have to live."</p>
            <span class="quote-author">— Jim Rohn</span>
          </div>
          <div class="quote-card">
            <mat-icon class="quote-icon">format_quote</mat-icon>
            <p class="quote-text">"Fitness is not about being better than someone else. It's about being better than you used to be."</p>
            <span class="quote-author">— Khloe Kardashian</span>
          </div>
        </div>
      </section>

      <!-- How It Works -->
      <section class="how-it-works">
        <div class="section-header">
          <h2>How It Works</h2>
          <p>Get started in just 3 simple steps</p>
        </div>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and tell us about yourself - your age, weight, height, and fitness goals.</p>
          </div>
          <div class="step-arrow">
            <mat-icon>arrow_forward</mat-icon>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <h3>Get Your Plan</h3>
            <p>Receive a personalized weekly workout routine and meal plan tailored just for you.</p>
          </div>
          <div class="step-arrow">
            <mat-icon>arrow_forward</mat-icon>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <h3>Track & Achieve</h3>
            <p>Follow your plan, track your progress, and watch yourself transform!</p>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="cta-section">
        <div class="cta-content">
          <h2>Ready to Start Your Fitness Journey?</h2>
          <p>Join thousands of users who have transformed their lives with FitPlanner</p>
          <a mat-flat-button routerLink="/register" class="cta-btn large">
            Get Started Free
            <mat-icon>arrow_forward</mat-icon>
          </a>
        </div>
      </section>

      <!-- Footer -->
      <footer class="footer">
        <div class="footer-content">
          <div class="footer-brand">
            <div class="logo">
              <div class="logo-icon">
                <mat-icon>fitness_center</mat-icon>
              </div>
              <span>FitPlanner</span>
            </div>
            <p>Your personal fitness companion for a healthier lifestyle.</p>
          </div>
          <div class="footer-links">
            <a routerLink="/login">Sign In</a>
            <a routerLink="/register">Register</a>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© 2024 FitPlanner. All rights reserved.</p>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .home-page { overflow-x: hidden; }

    /* Hero Section */
    .hero {
      min-height: 100vh;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      padding: 120px 80px 80px;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: -50%;
      right: -20%;
      width: 80%;
      height: 150%;
      background: radial-gradient(circle, rgba(94, 53, 177, 0.3) 0%, transparent 60%);
    }
    .hero-content { position: relative; z-index: 1; }
    .hero-badge {
      display: inline-block;
      background: rgba(255,255,255,0.1);
      color: #00bfa5;
      padding: 8px 20px;
      border-radius: 30px;
      font-size: 0.875rem;
      font-weight: 600;
      margin-bottom: 24px;
      border: 1px solid rgba(0, 191, 165, 0.3);
    }
    .hero h1 {
      font-size: 3.5rem;
      font-weight: 800;
      color: white;
      line-height: 1.1;
      margin-bottom: 24px;
    }
    .hero p {
      font-size: 1.2rem;
      color: rgba(255,255,255,0.7);
      max-width: 500px;
      margin-bottom: 32px;
      line-height: 1.7;
    }
    .hero-actions { display: flex; gap: 16px; margin-bottom: 48px; }
    .cta-btn {
      height: 56px;
      padding: 0 32px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .cta-btn.large { height: 60px; padding: 0 40px; font-size: 1.1rem; }
    .secondary-btn {
      height: 56px;
      padding: 0 32px;
      font-size: 1rem;
      font-weight: 600;
      border-radius: 14px;
      color: white;
      border-color: rgba(255,255,255,0.3);
    }
    .hero-stats { display: flex; gap: 48px; }
    .stat { text-align: left; }
    .stat-value { display: block; font-size: 2rem; font-weight: 800; color: white; }
    .stat-label { font-size: 0.875rem; color: rgba(255,255,255,0.6); }
    .hero-visual {
      position: relative;
      height: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .visual-card {
      position: absolute;
      background: white;
      border-radius: 20px;
      padding: 24px 32px;
      display: flex;
      align-items: center;
      gap: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.3);
      font-weight: 600;
      color: #1a1a2e;
    }
    .visual-card mat-icon { font-size: 32px; width: 32px; height: 32px; color: #5e35b1; }
    .visual-card.card1 { top: 60px; left: 20px; animation: float 6s ease-in-out infinite; }
    .visual-card.card2 { top: 200px; right: 0; animation: float 6s ease-in-out infinite 1s; }
    .visual-card.card3 { bottom: 80px; left: 60px; animation: float 6s ease-in-out infinite 2s; }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    /* Features Section */
    .features {
      padding: 100px 80px;
      background: #f8fafc;
    }
    .section-header {
      text-align: center;
      margin-bottom: 60px;
    }
    .section-header h2 {
      font-size: 2.5rem;
      font-weight: 800;
      color: #1a1a2e;
      margin-bottom: 16px;
    }
    .section-header p { color: #64748b; font-size: 1.1rem; }
    .features-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .feature-card {
      background: white;
      border-radius: 24px;
      padding: 40px 32px;
      text-align: center;
      box-shadow: 0 4px 20px rgba(0,0,0,0.05);
      transition: transform 0.3s, box-shadow 0.3s;
    }
    .feature-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.1);
    }
    .feature-icon {
      width: 80px;
      height: 80px;
      border-radius: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 24px;
    }
    .feature-icon mat-icon { font-size: 36px; width: 36px; height: 36px; color: white; }
    .feature-icon.workout { background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%); }
    .feature-icon.nutrition { background: linear-gradient(135deg, #00897b 0%, #00bfa5 100%); }
    .feature-icon.progress { background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%); }
    .feature-icon.goals { background: linear-gradient(135deg, #ef4444 0%, #f87171 100%); }
    .feature-card h3 { font-size: 1.25rem; font-weight: 700; color: #1a1a2e; margin-bottom: 12px; }
    .feature-card p { color: #64748b; line-height: 1.6; }

    /* Quotes Section */
    .quotes {
      padding: 80px;
      background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
    }
    .quotes-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 32px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .quote-card {
      background: rgba(255,255,255,0.1);
      border-radius: 24px;
      padding: 40px;
      text-align: center;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .quote-card.featured {
      background: white;
      transform: scale(1.05);
    }
    .quote-card.featured .quote-text { color: #1a1a2e; }
    .quote-card.featured .quote-author { color: #5e35b1; }
    .quote-card.featured .quote-icon { color: #5e35b1; }
    .quote-icon { font-size: 48px; width: 48px; height: 48px; color: rgba(255,255,255,0.5); margin-bottom: 20px; }
    .quote-text { font-size: 1.1rem; color: white; line-height: 1.7; margin-bottom: 20px; font-style: italic; }
    .quote-author { color: rgba(255,255,255,0.7); font-weight: 600; }

    /* How It Works */
    .how-it-works {
      padding: 100px 80px;
      background: white;
    }
    .steps {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 24px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .step {
      text-align: center;
      flex: 1;
      max-width: 300px;
    }
    .step-number {
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      font-weight: 800;
      margin: 0 auto 20px;
    }
    .step h3 { font-size: 1.25rem; font-weight: 700; color: #1a1a2e; margin-bottom: 12px; }
    .step p { color: #64748b; line-height: 1.6; }
    .step-arrow { color: #cbd5e1; }
    .step-arrow mat-icon { font-size: 32px; width: 32px; height: 32px; }

    /* CTA Section */
    .cta-section {
      padding: 100px 80px;
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
      text-align: center;
    }
    .cta-content h2 { font-size: 2.5rem; font-weight: 800; color: white; margin-bottom: 16px; }
    .cta-content p { color: rgba(255,255,255,0.7); font-size: 1.1rem; margin-bottom: 32px; }

    /* Footer */
    .footer {
      background: #0f172a;
      padding: 60px 80px 30px;
    }
    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1400px;
      margin: 0 auto 40px;
      padding-bottom: 40px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    .footer-brand .logo {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .footer-brand .logo-icon {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }
    .footer-brand .logo span { font-size: 1.25rem; font-weight: 700; color: white; }
    .footer-brand p { color: rgba(255,255,255,0.5); max-width: 300px; }
    .footer-links { display: flex; gap: 32px; }
    .footer-links a { color: rgba(255,255,255,0.7); text-decoration: none; font-weight: 500; transition: color 0.2s; }
    .footer-links a:hover { color: white; }
    .footer-bottom { text-align: center; }
    .footer-bottom p { color: rgba(255,255,255,0.4); font-size: 0.875rem; }

    @media (max-width: 1200px) {
      .features-grid { grid-template-columns: repeat(2, 1fr); }
      .quotes-container { grid-template-columns: 1fr; }
      .quote-card.featured { transform: none; }
    }
    @media (max-width: 900px) {
      .hero { grid-template-columns: 1fr; padding: 120px 32px 60px; text-align: center; }
      .hero h1 { font-size: 2.5rem; }
      .hero p { margin: 0 auto 32px; }
      .hero-actions { justify-content: center; }
      .hero-stats { justify-content: center; }
      .hero-visual { display: none; }
      .features, .quotes, .how-it-works, .cta-section, .footer { padding: 60px 24px; }
      .steps { flex-direction: column; }
      .step-arrow { transform: rotate(90deg); }
      .footer-content { flex-direction: column; text-align: center; gap: 32px; }
    }
    @media (max-width: 600px) {
      .features-grid { grid-template-columns: 1fr; }
      .hero-actions { flex-direction: column; }
      .hero-stats { flex-direction: column; gap: 16px; }
    }
  `]
})
export class HomeComponent {}
