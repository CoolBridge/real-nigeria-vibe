import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'discover', icon: Search, label: 'Discover' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'inbox', icon: MessageCircle, label: 'Inbox' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          const isCreate = tab.id === 'create';
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="icon"
              className={`flex flex-col items-center gap-1 h-12 w-16 ${
                isCreate 
                  ? 'bg-gradient-to-r from-nigerian-green to-ureal-gold hover:from-nigerian-green/90 hover:to-ureal-gold/90 shadow-warm' 
                  : isActive 
                    ? 'text-nigerian-green' 
                    : 'text-muted-foreground hover:text-nigerian-green'
              }`}
              onClick={() => onTabChange(tab.id)}
            >
              <Icon className={`w-6 h-6 ${isCreate ? 'text-primary-foreground' : ''}`} />
              <span className={`text-xs ${isCreate ? 'text-primary-foreground' : ''}`}>
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};