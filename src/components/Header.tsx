import { Search, Menu, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import urealLogo from '@/assets/ureal-logo.png';

interface HeaderProps {
  currentTab: string;
}

export const Header = ({ currentTab }: HeaderProps) => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Signed out successfully",
        description: "Come back soon! 👋",
      });
      navigate('/');
    }
  };

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

        {/* Center - Logo/Title or Search */}
        <div className="flex-1 flex justify-center">
          {currentTab === 'discover' ? (
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search videos, creators, sounds..."
                className="pl-10 bg-muted/50 border-0 rounded-full"
              />
            </div>
          ) : currentTab === 'home' ? (
            <div className="flex items-center gap-3">
              <img src={urealLogo} alt="Ureal" className="w-8 h-8" />
              <div className="flex gap-4">
                <span className="text-lg font-bold text-muted-foreground">Following</span>
                <span className="text-lg font-bold bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
                  For You
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <img src={urealLogo} alt="Ureal" className="w-8 h-8" />
              <h1 className="text-lg font-bold bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
                {getTitle()}
              </h1>
            </div>
          )}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {currentTab === 'home' && (
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Search className="w-5 h-5" />
            </Button>
          )}
          
          {user ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8"
              onClick={handleSignOut}
            >
              <LogOut className="w-4 h-4" />
            </Button>
          ) : (
            <Button 
              variant="ghost" 
              size="icon" 
              className="w-8 h-8"
              onClick={() => navigate('/auth')}
            >
              <User className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};