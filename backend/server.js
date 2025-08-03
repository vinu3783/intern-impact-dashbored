const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Import dummy data
const dummyData = require('./data/dummyData.json');

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'Mission Control Online 🚀',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Get intern data by ID
app.get('/api/intern/:id', (req, res) => {
  const { id } = req.params;
  const intern = dummyData.interns.find(i => i.id === id);
  
  if (intern) {
    res.json({
      success: true,
      data: intern
    });
  } else {
    res.status(404).json({ 
      success: false,
      error: 'Intern not found in mission database' 
    });
  }
});

// Get all interns for leaderboard
app.get('/api/leaderboard', (req, res) => {
  const sortedInterns = [...dummyData.interns]
    .sort((a, b) => b.totalDonations - a.totalDonations)
    .map((intern, index) => ({
      ...intern,
      rank: index + 1,
      trend: calculateTrend(intern)
    }));
  
  res.json({
    success: true,
    data: sortedInterns,
    totalAgents: dummyData.interns.length,
    totalRaised: dummyData.interns.reduce((sum, i) => sum + i.totalDonations, 0),
    totalTrees: dummyData.interns.reduce((sum, i) => sum + i.treesPlanted, 0)
  });
});

// Update donation amount
app.post('/api/intern/:id/donate', (req, res) => {
  const { id } = req.params;
  const { amount } = req.body;
  
  if (!amount || amount <= 0) {
    return res.status(400).json({ 
      success: false,
      error: 'Invalid donation amount' 
    });
  }
  
  const internIndex = dummyData.interns.findIndex(i => i.id === id);
  
  if (internIndex !== -1) {
    const intern = dummyData.interns[internIndex];
    
    // Update donation stats
    intern.totalDonations += amount;
    intern.missionsCompleted += 1;
    intern.treesPlanted += Math.floor(amount / 50); // 1 tree per ₹50
    intern.livesImpacted += Math.floor(amount / 250); // 1 life per ₹250
    
    // Update level and badge
    const updatedLevel = calculateLevel(intern.totalDonations);
    intern.level = updatedLevel.level;
    intern.badge = updatedLevel.badge;
    
    // Add achievement if milestone reached
    const newAchievement = checkAchievements(intern);
    if (newAchievement && !intern.achievements.includes(newAchievement)) {
      intern.achievements.push(newAchievement);
    }
    
    res.json({ 
      success: true,
      data: {
        newTotal: intern.totalDonations,
        level: intern.level,
        badge: intern.badge,
        newAchievement: newAchievement
      },
      message: 'Mission progress updated! Keep up the great work!' 
    });
  } else {
    res.status(404).json({ 
      success: false,
      error: 'Intern not found' 
    });
  }
});

// Get mission statistics
app.get('/api/stats', (req, res) => {
  const stats = {
    totalAgents: dummyData.interns.length,
    totalDonations: dummyData.interns.reduce((sum, i) => sum + i.totalDonations, 0),
    totalMissions: dummyData.interns.reduce((sum, i) => sum + i.missionsCompleted, 0),
    totalTrees: dummyData.interns.reduce((sum, i) => sum + i.treesPlanted, 0),
    totalLives: dummyData.interns.reduce((sum, i) => sum + i.livesImpacted, 0),
    topContributor: [...dummyData.interns].sort((a, b) => b.totalDonations - a.totalDonations)[0].name
  };
  
  res.json({
    success: true,
    data: stats
  });
});

// Helper functions
function calculateLevel(totalDonations) {
  if (totalDonations >= 10000) {
    return { level: 3, badge: 'gold' };
  } else if (totalDonations >= 5000) {
    return { level: 2, badge: 'silver' };
  } else if (totalDonations >= 1000) {
    return { level: 1, badge: 'bronze' };
  }
  return { level: 0, badge: 'rookie' };
}

function calculateTrend(intern) {
  // Simulate trend based on recent activity
  const recentDays = new Date() - new Date(intern.joinDate);
  const daysActive = Math.floor(recentDays / (1000 * 60 * 60 * 24));
  const avgPerDay = intern.totalDonations / daysActive;
  
  if (avgPerDay > 100) return 'up';
  if (avgPerDay < 50) return 'down';
  return 'same';
}

function checkAchievements(intern) {
  if (intern.totalDonations >= 25000) return 'Elite Contributor';
  if (intern.missionsCompleted >= 50) return 'Mission Master';
  if (intern.treesPlanted >= 500) return 'Forest Guardian';
  if (intern.livesImpacted >= 100) return 'Life Changer';
  if (intern.totalDonations >= 10000) return 'Gold Standard';
  if (intern.missionsCompleted >= 25) return 'Century Club';
  if (intern.treesPlanted >= 100) return 'Tree Hugger';
  if (intern.missionsCompleted >= 10) return 'Consistency Champion';
  if (intern.totalDonations >= 5000) return 'Rising Star';
  if (intern.missionsCompleted >= 5) return 'Weekend Warrior';
  if (intern.totalDonations >= 1000) return 'Impact Maker';
  if (intern.missionsCompleted >= 1) return 'First Donation';
  return null;
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Mission Control encountered an error',
    message: err.message
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Mission endpoint not found',
    message: `The requested endpoint ${req.originalUrl} does not exist`
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mission Control backend running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`🌟 Health check: http://localhost:${PORT}/api/health`);
});