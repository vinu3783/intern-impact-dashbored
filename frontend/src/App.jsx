import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Trees, 
  Heart, 
  Users, 
  TrendingUp, 
  Copy,
  Terminal,
  Zap,
  Target,
  Award,
  ChevronRight,
  Rocket,
  Star
} from 'lucide-react';

// Login Component
const Login = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  
  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      onLogin();
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-black to-blue-900/20"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse-slow"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-8 backdrop-blur-sm">
          <div className="flex items-center justify-center mb-8">
            <Terminal className="w-12 h-12 text-green-400 mr-3" />
            <h1 className="text-3xl font-bold text-green-400 font-mono">MISSION CONTROL</h1>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                &gt; ENTER_USERNAME:
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black border border-green-500/50 rounded px-4 py-2 text-green-400 font-mono focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                placeholder="intern_id"
                required
              />
            </div>
            
            <div>
              <label className="block text-green-400 text-sm font-mono mb-2">
                &gt; ACCESS_CODE:
              </label>
              <input
                type="password"
                className="w-full bg-black border border-green-500/50 rounded px-4 py-2 text-green-400 font-mono focus:outline-none focus:border-green-400 focus:shadow-[0_0_10px_rgba(0,255,65,0.5)]"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-500/20 border border-green-500 text-green-400 py-3 rounded font-mono font-bold hover:bg-green-500/30 hover:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <span className="animate-spin mr-2">⟳</span> AUTHENTICATING...
                </span>
              ) : (
                'INITIALIZE_SESSION'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-green-400/60 text-xs font-mono">
              SYSTEM_STATUS: <span className="text-green-400">ONLINE</span>
            </p>
            <p className="text-green-400/60 text-xs font-mono mt-1 terminal-cursor">
              AWAITING_CREDENTIALS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Dashboard Component
const Dashboard = ({ onNavigate }) => {
  const [internData, setInternData] = useState({
    name: "Vinayaka GC",
    referralCode: "vinayaka2025",
    totalDonations: 7250,
    missionsCompleted: 12,
    treesPlanted: 145,
    livesImpacted: 29,
    level: 2,
    badge: "silver",
    achievements: ["First Donation", "Weekend Warrior", "Impact Maker"]
  });

  const [copied, setCopied] = useState(false);

  const copyReferralCode = () => {
    navigator.clipboard.writeText(internData.referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'bronze': return 'text-orange-500 border-orange-500';
      case 'silver': return 'text-gray-300 border-gray-300';
      case 'gold': return 'text-yellow-400 border-yellow-400';
      default: return 'text-green-500 border-green-500';
    }
  };

  const progressToNextLevel = () => {
    if (internData.level === 1) return (internData.totalDonations / 5000) * 100;
    if (internData.level === 2) return ((internData.totalDonations - 5000) / 5000) * 100;
    return 100;
  };

  return (
    <div className="min-h-screen bg-black p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Rocket className="w-8 h-8 text-green-400 mr-3" />
            <h1 className="text-2xl font-bold text-green-400 font-mono">MISSION CONTROL</h1>
          </div>
          <button
            onClick={() => onNavigate('leaderboard')}
            className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded font-mono text-sm hover:bg-green-500/30 transition-all duration-300 flex items-center"
          >
            LEADERBOARD <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Agent Profile */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm col-span-1 md:col-span-2 lg:col-span-1">
          <h2 className="text-green-400 font-mono text-sm mb-4 flex items-center">
            <Terminal className="w-4 h-4 mr-2" /> AGENT_PROFILE
          </h2>
          <div className="space-y-3">
            <div>
              <p className="text-green-400/60 text-xs font-mono">NAME:</p>
              <p className="text-green-400 text-xl font-bold font-mono">{internData.name}</p>
            </div>
            <div>
              <p className="text-green-400/60 text-xs font-mono">REFERRAL_CODE:</p>
              <div className="flex items-center gap-2">
                <p className="text-green-400 font-mono">{internData.referralCode}</p>
                <button
                  onClick={copyReferralCode}
                  className="text-green-400/60 hover:text-green-400 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                {copied && <span className="text-green-400 text-xs">COPIED!</span>}
              </div>
            </div>
            <div className="pt-4 border-t border-green-500/20">
              <div className={`inline-flex items-center px-3 py-1 rounded-full border ${getBadgeColor(internData.badge)}`}>
                <Award className="w-4 h-4 mr-2" />
                <span className="font-mono text-sm uppercase">{internData.badge} AGENT</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Stats */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-green-400 font-mono text-sm mb-4 flex items-center">
            <Target className="w-4 h-4 mr-2" /> MISSION_STATS
          </h2>
          <div className="text-3xl font-bold text-green-400 font-mono mb-4">
            ₹{internData.totalDonations.toLocaleString()}
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-green-400/60 text-sm font-mono">Missions:</span>
              <span className="text-green-400 font-mono">{internData.missionsCompleted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-400/60 text-sm font-mono flex items-center">
                <Trees className="w-4 h-4 mr-1" /> Trees:
              </span>
              <span className="text-green-400 font-mono">{internData.treesPlanted}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-green-400/60 text-sm font-mono flex items-center">
                <Heart className="w-4 h-4 mr-1" /> Lives:
              </span>
              <span className="text-green-400 font-mono">{internData.livesImpacted}</span>
            </div>
          </div>
        </div>

        {/* Level Progress */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm">
          <h2 className="text-green-400 font-mono text-sm mb-4 flex items-center">
            <TrendingUp className="w-4 h-4 mr-2" /> LEVEL_PROGRESS
          </h2>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-400 font-mono">LEVEL {internData.level}</span>
                <span className="text-green-400/60 text-sm font-mono">
                  {internData.level < 3 ? `LEVEL ${internData.level + 1}` : 'MAX'}
                </span>
              </div>
              <div className="w-full bg-green-900/20 rounded-full h-3 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full transition-all duration-1000 relative"
                  style={{ width: `${progressToNextLevel()}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
            <div className="text-xs text-green-400/60 font-mono">
              {internData.level === 1 && `₹${5000 - internData.totalDonations} to Silver`}
              {internData.level === 2 && `₹${10000 - internData.totalDonations} to Gold`}
              {internData.level === 3 && 'Maximum level achieved!'}
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-green-400 font-mono text-sm mb-4 flex items-center">
            <Trophy className="w-4 h-4 mr-2" /> ACHIEVEMENTS_UNLOCKED
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {internData.achievements.map((achievement, idx) => (
              <div key={idx} className="bg-green-500/10 border border-green-500/50 rounded-lg p-4 flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-green-400" />
                </div>
                <span className="text-green-400 font-mono text-sm">{achievement}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Briefing */}
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-green-400 font-mono text-sm mb-4 flex items-center">
            <Zap className="w-4 h-4 mr-2" /> ACTIVE_MISSION_BRIEFING
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-400 font-mono glitch">1000+</div>
              <p className="text-green-400/60 text-sm font-mono mt-2">BRONZE_THRESHOLD</p>
              <div className="mt-2">
                {internData.totalDonations >= 1000 ? (
                  <span className="text-green-400 text-xs">✓ ACHIEVED</span>
                ) : (
                  <span className="text-orange-400 text-xs">IN PROGRESS</span>
                )}
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">5000+</div>
              <p className="text-green-400/60 text-sm font-mono mt-2">SILVER_THRESHOLD</p>
              <div className="mt-2">
                {internData.totalDonations >= 5000 ? (
                  <span className="text-green-400 text-xs">✓ ACHIEVED</span>
                ) : (
                  <span className="text-orange-400 text-xs">IN PROGRESS</span>
                )}
              </div>
            </div>
            <div className="text-center p-4">
              <div className="text-2xl font-bold text-green-400 font-mono">10000+</div>
              <p className="text-green-400/60 text-sm font-mono mt-2">GOLD_THRESHOLD</p>
              <div className="mt-2">
                {internData.totalDonations >= 10000 ? (
                  <span className="text-green-400 text-xs">✓ ACHIEVED</span>
                ) : (
                  <span className="text-orange-400 text-xs">IN PROGRESS</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Leaderboard Component
const Leaderboard = ({ onNavigate }) => {
  const [leaderboardData] = useState([
    {
      rank: 1,
      name: "Alex Kumar",
      totalDonations: 15000,
      badge: "gold",
      missionsCompleted: 30,
      trend: "up"
    },
    {
      rank: 2,
      name: "Sarah Chen",
      totalDonations: 12500,
      badge: "gold",
      missionsCompleted: 25,
      trend: "up"
    },
    {
      rank: 3,
      name: "Emma Wilson",
      totalDonations: 9200,
      badge: "silver",
      missionsCompleted: 18,
      trend: "same"
    },
    {
      rank: 4,
      name: "Vinayaka GC",
      totalDonations: 7250,
      badge: "silver",
      missionsCompleted: 12,
      trend: "up"
    },
    {
      rank: 5,
      name: "Raj Patel",
      totalDonations: 4800,
      badge: "bronze",
      missionsCompleted: 8,
      trend: "down"
    }
  ]);

  const getBadgeColor = (badge) => {
    switch(badge) {
      case 'bronze': return 'text-orange-500';
      case 'silver': return 'text-gray-300';
      case 'gold': return 'text-yellow-400';
      default: return 'text-green-500';
    }
  };

  const getTrendIcon = (trend) => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '→';
  };

  const getTrendColor = (trend) => {
    if (trend === 'up') return 'text-green-400';
    if (trend === 'down') return 'text-red-400';
    return 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-black p-4">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Trophy className="w-8 h-8 text-green-400 mr-3" />
            <h1 className="text-2xl font-bold text-green-400 font-mono">GLOBAL_LEADERBOARD</h1>
          </div>
          <button
            onClick={() => onNavigate('dashboard')}
            className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded font-mono text-sm hover:bg-green-500/30 transition-all duration-300"
          >
            ← BACK_TO_DASHBOARD
          </button>
        </div>
      </header>

      {/* Leaderboard Table */}
      <div className="bg-black/80 border border-green-500/30 rounded-lg overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-green-500/30">
                <th className="text-left p-4 text-green-400 font-mono text-sm">RANK</th>
                <th className="text-left p-4 text-green-400 font-mono text-sm">AGENT</th>
                <th className="text-left p-4 text-green-400 font-mono text-sm">BADGE</th>
                <th className="text-right p-4 text-green-400 font-mono text-sm">DONATIONS</th>
                <th className="text-right p-4 text-green-400 font-mono text-sm">MISSIONS</th>
                <th className="text-center p-4 text-green-400 font-mono text-sm">TREND</th>
              </tr>
            </thead>
            <tbody>
              {leaderboardData.map((intern, idx) => (
                <tr 
                  key={idx} 
                  className={`border-b border-green-500/20 hover:bg-green-500/10 transition-colors ${intern.name === "Vinayaka GC" ? 'bg-green-500/5' : ''}`}
                >
                  <td className="p-4">
                    <div className="flex items-center">
                      {intern.rank <= 3 ? (
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          intern.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                          intern.rank === 2 ? 'bg-gray-300/20 text-gray-300' :
                          'bg-orange-500/20 text-orange-500'
                        }`}>
                          {intern.rank}
                        </div>
                      ) : (
                        <span className="text-green-400 font-mono ml-2">{intern.rank}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="text-green-400 font-mono">{intern.name}</p>
                      {intern.name === "Vinayaka GC" && (
                        <p className="text-green-400/60 text-xs font-mono">(YOU)</p>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`font-mono text-sm uppercase ${getBadgeColor(intern.badge)}`}>
                      {intern.badge}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-green-400 font-mono">₹{intern.totalDonations.toLocaleString()}</span>
                  </td>
                  <td className="p-4 text-right">
                    <span className="text-green-400 font-mono">{intern.missionsCompleted}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className={`font-mono text-lg ${getTrendColor(intern.trend)}`}>
                      {getTrendIcon(intern.trend)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm text-center">
          <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 font-mono">248</div>
          <p className="text-green-400/60 text-sm font-mono mt-1">ACTIVE_AGENTS</p>
        </div>
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm text-center">
          <Target className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 font-mono">₹2.4M</div>
          <p className="text-green-400/60 text-sm font-mono mt-1">TOTAL_RAISED</p>
        </div>
        <div className="bg-black/80 border border-green-500/30 rounded-lg p-6 backdrop-blur-sm text-center">
          <Trees className="w-8 h-8 text-green-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-green-400 font-mono">12,450</div>
          <p className="text-green-400/60 text-sm font-mono mt-1">TREES_PLANTED</p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="relative">
      {currentPage === 'login' && <Login onLogin={handleLogin} />}
      {currentPage === 'dashboard' && <Dashboard onNavigate={handleNavigate} />}
      {currentPage === 'leaderboard' && <Leaderboard onNavigate={handleNavigate} />}
    </div>
  );
}