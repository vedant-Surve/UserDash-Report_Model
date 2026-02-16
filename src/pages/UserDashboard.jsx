import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import ReportModal from '../components/ReportModal'; // Ensure this path is correct

const UserDashboard = () => {
  const { user, logout } = useAuth();
  
  // State to control the visibility of the Report Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const successStories = [
    { 
      id: 1, 
      before: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=400", 
      after: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400", 
      text: "River cleaned within 24hr after complaint" 
    },
    { 
      id: 2, 
      before: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400", 
      after: "https://images.unsplash.com/photo-1584467541268-b040f83be3fd?w=400", 
      text: "Road cleared of litter & debris" 
    }
  ];

  const features = [
    { title: "How it Works", desc: "Submit a complaint in minutes", icon: "📋" },
    { title: "Quick response", desc: "Issues addressed by authorities fast.", icon: "⚙️" },
    { title: "Real results", desc: "See problems resolved in your area", icon: "📑" }
  ];

  return (
    <div className="user-dash-container">
      {/* Navbar Area */}
      <nav className="dash-nav">
        <div className="logo">CIVICLENS</div>
        <div className="nav-right">
          <span>Welcome, {user?.username || user?.email}</span>
          <button onClick={logout} className="logout-link">Logout</button>
        </div>
      </nav>

      <main className="dash-main">
        {/* Hero Section */}
        <section className="dash-hero">
          <h1 className='hero-title'>Help improve your Community</h1>
          <p className='hero-description'>Report local issues easily and get them fixed</p>
        </section>

        {/* Gallery of Impact */}
        <div className="impact-gallery">
          {successStories.map((story) => (
            <div key={story.id} className="impact-card">
              <div className="comparison-container">
                <div className="img-wrapper">
                  <img src={story.before} alt="Before" />
                  <span className="label">Before</span>
                </div>
                <div className="img-wrapper">
                  <img src={story.after} alt="After" />
                  <span className="label">After</span>
                </div>
              </div>
              <p className="impact-caption">{story.text}</p>
            </div>
          ))}
        </div>

        {/* Central Call to Action */}
        <section className="action-hub">
          <h2 className="cta-heading">Ready to make a difference?</h2>
          <p className="cta-subtext">Report an issue in your neighbourhood, now!</p>
          
          {/* Trigger to open the Modal */}
          <button 
            className="main-cta-btn" 
            onClick={() => setIsModalOpen(true)}
          >
            Report an issue
          </button>
          
          <div className="logic-divider">
            <span className="divider-line"></span>
            <span className="divider-text">How does it works?</span>
            <span className="divider-line"></span>
          </div>
        </section>

        {/* Bottom Feature Bar */}
        <footer className="info-bar">
          {features.map((item, index) => (
            <div key={index} className="info-column">
              <div className="info-icon">{item.icon}</div>
              <div className="info-text">
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </footer>
      </main>

      {/* Report Modal Component - It only renders when isModalOpen is true */}
      <ReportModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default UserDashboard;