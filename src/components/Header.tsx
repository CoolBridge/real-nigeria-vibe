import { Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  currentTab: string;
}

export const Header = ({ currentTab }: HeaderProps) => {
  const getTitle = () => {
    switch (currentTab) {
      case 'home':
        return 'Following | For You';
      case 'discover':
        return 'Discover';
      case 'inbox':
        return 'Inbox';
      case 'profile':
        return 'Profile';
      default:
        return 'Ureal';
    }
  };

  if (currentTab === 'create') {
    return null; // No header for create page
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-40">
      <div className="flex items-center justify-between p-4">
        {/* Left side */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="w-8 h-8">
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Center - Title or Search */}
        <div className="flex-1 flex justify-center">
          {currentTab === 'discover' ? (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos, users, sounds..."
                className="pl-10 bg-muted/50 border-0 rounded-full"
              />
            </div>
          ) : (
            <h1 className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {getTitle()}
            </h1>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {currentTab === 'home' && (
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Search className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};