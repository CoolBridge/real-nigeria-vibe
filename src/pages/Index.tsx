import { useState } from 'react';
import { VideoFeed } from '@/components/VideoFeed';
import { BottomNavigation } from '@/components/BottomNavigation';
import { Header } from '@/components/Header';

const Index = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <VideoFeed />;
      case 'discover':
        return (
          <div className="h-screen pt-16 pb-16 flex items-center justify-center">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4">Discover Amazing Content</h2>
              <p className="text-muted-foreground">Search for videos, creators, and trending content</p>
            </div>
          </div>
        );
      case 'create':
        return (
          <div className="h-screen flex items-center justify-center bg-card">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4">Create Your Ureal</h2>
              <p className="text-muted-foreground mb-6">Share your story with Nigeria and the world</p>
              <div className="text-sm text-muted-foreground">
                Video recording and upload features will be available with backend integration
              </div>
            </div>
          </div>
        );
      case 'inbox':
        return (
          <div className="h-screen pt-16 pb-16 flex items-center justify-center">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4">Your Messages</h2>
              <p className="text-muted-foreground">Connect with creators and friends</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="h-screen pt-16 pb-16 flex items-center justify-center">
            <div className="text-center animate-float-up">
              <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
              <p className="text-muted-foreground">Manage your Ureal profile and content</p>
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
