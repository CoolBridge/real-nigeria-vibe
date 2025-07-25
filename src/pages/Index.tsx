import { useState } from 'react';
import { VideoFeed } from '@/components/VideoFeed';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';
import nigerianHeroBg from '@/assets/nigerian-hero-bg.jpg';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'discover':
        return (
          <div 
            className="h-screen pt-16 pb-16 flex items-center justify-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${nigerianHeroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="text-center animate-float-up">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
                Discover Naija Content
              </h2>
              <p className="text-nigerian-white mb-4">Explore trending videos from Nigerian creators</p>
              <p className="text-sm text-nigerian-white/80">#AfrobeatsDance #NaijaComedy #LagosFashion #JollofWars</p>
            </div>
          </div>
        );
      case 'create':
        return (
          <div 
            className="h-screen flex items-center justify-center relative"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.8)), url(${nigerianHeroBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="text-center animate-float-up">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-ureal-gold to-nigerian-green bg-clip-text text-transparent">
                Create Your Ureal
              </h2>
              <p className="text-nigerian-white mb-6">Share your Nigerian story with the world 🇳🇬</p>
              <div className="text-sm text-nigerian-white/80 mb-4">
                📱 Video recording and upload coming soon
              </div>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-ureal-gold">
                <span>#NaijaContent</span>
                <span>#AfrobeatVibes</span>
                <span>#LagosCulture</span>
                <span>#NigerianCreators</span>
              </div>
            </div>
          </div>
        );
      case 'inbox':
        return (
          <div className="h-screen pt-16 pb-16 flex items-center justify-center">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
                Your Messages
              </h2>
              <p className="text-muted-foreground">Connect with Naija creators and friends 💬</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="h-screen pt-16 pb-16 flex items-center justify-center">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
                Your Profile
              </h2>
              <p className="text-muted-foreground">Showcase your unique Nigerian creativity 🌟</p>
            </div>
          </div>
        );
      default:
        return <VideoFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Header currentTab={activeTab} />
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
