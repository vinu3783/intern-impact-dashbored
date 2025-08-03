🎯 Overview
This project is a full-stack web application that gamifies intern contributions with a mission control aesthetic. Interns can track donations, unlock achievements, and compete on a global leaderboard.

✨ Features

Terminal-Style Login: Futuristic authentication screen with glitch effects
Real-time Dashboard: Track donations, trees planted, and lives impacted
Gamification System: Bronze, Silver, and Gold badges based on donation milestones
Achievement Unlocks: Earn achievements like "Weekend Warrior" and "Impact Maker"
Global Leaderboard: Compare rankings with other interns
Responsive Design: Works seamlessly on desktop and mobile devices
Animated UI: Pulse effects, progress bars, and smooth transitions

🛠️ Tech Stack
Frontend

React 18: Component-based UI library
Tailwind CSS: Utility-first CSS framework
Lucide React: Modern icon library
React Hooks: State management with useState
CSS Animations: Custom keyframes for glitch effects

Backend

Node.js: JavaScript runtime
Express.js: Web application framework
CORS: Cross-origin resource sharing
JSON Data Store: Mock database (easily replaceable with MongoDB)

📥 Installation
Prerequisites

Node.js 16+ and npm installed
Git for version control

Setup Instructions

Clone the Repository

bashgit clone https://github.com/vinayakagc/mission-impact-dashboard.git
cd mission-impact-dashboard

Backend Setup

bashcd backend
npm install
npm run dev

Frontend Setup (New Terminal)

bashcd frontend
npm install
npm start

Access the Application


Frontend: http://localhost:3000
Backend: http://localhost:5000

📁 Project Structure
mission-impact-dashboard/
├── backend/
│   ├── server.js              # Express server configuration
│   ├── package.json           # Backend dependencies
│   └── data/
│       └── dummyData.json     # Mock intern data
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── App.jsx           # Main app with all components
│   │   ├── index.js          # React DOM render
│   │   └── index.css         # Global styles + Tailwind
│   ├── package.json          # Frontend dependencies
│   └── tailwind.config.js    # Tailwind customization
└── README.md
🔧 How It Works
Frontend Architecture
1. Component Structure
The application uses three main components:
javascript// App.jsx structure
- Login Component     // Terminal-style authentication
- Dashboard Component // Main intern statistics view  
- Leaderboard Component // Global rankings table
2. State Management
javascript// Simple state management with React hooks
const [currentPage, setCurrentPage] = useState('login');
const [isAuthenticated, setIsAuthenticated] = useState(false);
3. Styling Approach

Tailwind CSS for utility classes
Custom CSS for animations (glitch effects, scanlines)
Responsive grid system for layout

Backend Architecture
1. RESTful API Design
javascript// Express routes structure
app.get('/api/health')           // Health check
app.get('/api/intern/:id')       // Get intern data
app.get('/api/leaderboard')      // Get all interns sorted
app.post('/api/intern/:id/donate') // Update donations
2. Data Processing
javascript// Level calculation logic
function calculateLevel(totalDonations) {
  if (totalDonations >= 10000) return { level: 3, badge: 'gold' };
  if (totalDonations >= 5000) return { level: 2, badge: 'silver' };
  if (totalDonations >= 1000) return { level: 1, badge: 'bronze' };
  return { level: 0, badge: 'rookie' };
}
📡 API Documentation
Base URL
http://localhost:5000/api
Endpoints
Get Intern Data
httpGET /api/intern/:id
Response:
json{
  "success": true,
  "data": {
    "id": "vinayaka-gc",
    "name": "Vinayaka GC",
    "referralCode": "vinayaka2025",
    "totalDonations": 7250,
    "level": 2,
    "badge": "silver",
    "achievements": ["First Donation", "Weekend Warrior"]
  }
}
Get Leaderboard
httpGET /api/leaderboard
Response:
json{
  "success": true,
  "data": [
    {
      "rank": 1,
      "name": "Alex Kumar",
      "totalDonations": 15000,
      "badge": "gold",
      "trend": "up"
    }
  ]
}
🎨 Key Components
Login Component

Terminal-style interface with typing animations
Glitch text effects using CSS keyframes
Mock authentication with loading states

Dashboard Component
Features 6 main sections:

Agent Profile: Name, referral code, and badge
Mission Stats: Total donations and impact metrics
Level Progress: Visual progress bar to next level
Achievements: Unlocked badges display
Mission Briefing: Threshold requirements
Navigation: Link to leaderboard

Leaderboard Component

Sortable table with rank indicators
Trend arrows showing position changes
Summary statistics at the bottom

🎮 Game Mechanics
javascript// Conversion rates
treesPlanted = Math.floor(donations / 50);    // 1 tree per ₹50
livesImpacted = Math.floor(donations / 250);  // 1 life per ₹250

// Achievement unlocks
- First Donation: Complete 1 mission
- Weekend Warrior: Complete 5 missions
- Impact Maker: Raise ₹1,000+
- Rising Star: Raise ₹5,000+
- Gold Standard: Raise ₹10,000+
🚀 Deployment
Frontend (Vercel)
bash# Install Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
Backend (Render)

Push to GitHub
Connect to Render
Set build command: npm install
Set start command: npm start

🔍 Code Highlights
Animated Background Effect
css/* Glitch effect implementation */
@keyframes glitch {
  0% { text-shadow: 0.05em 0 0 #00fffc, -0.05em -0.025em 0 #fc00ff; }
  /* ... keyframe animations ... */
}
Progress Bar Component
jsx<div className="w-full bg-green-900/20 rounded-full h-3">
  <div 
    className="bg-gradient-to-r from-green-500 to-green-400 h-full"
    style={{ width: `${progressToNextLevel()}%` }}
  />
</div>
Responsive Grid Layout
jsx<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Dashboard cards */}
</div>
🐛 Troubleshooting
Common Issues

Tailwind CSS not working
bashnpm install -D tailwindcss@3.3.0 postcss@8.4.21 autoprefixer@10.4.14

CORS errors

Ensure backend is running on port 5000
Check .env file has correct API URL


Module not found
bashrm -rf node_modules package-lock.json
npm install
