import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Eye, EyeOff, ArrowLeft, Sparkles, Heart, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import urealLogo from '@/assets/ureal-logo.png';

export default function AuthPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentIcon, setCurrentIcon] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    displayName: '',
    confirmPassword: ''
  });

  const floatingIcons = [Sparkles, Heart, Star];

  useEffect(() => {
    setIsVisible(true);
    const iconInterval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % floatingIcons.length);
    }, 2000);
    return () => clearInterval(iconInterval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "Passwords don't match",
            description: "Please make sure your passwords match.",
            variant: "destructive"
          });
          return;
        }

        const { error } = await signUp(formData.email, formData.password, formData.displayName);
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Account already exists",
              description: "This email is already registered. Try signing in instead.",
              variant: "destructive"
            });
          } else {
            toast({
              title: "Sign up failed",
              description: error.message,
              variant: "destructive"
            });
          }
        } else {
          toast({
            title: "Welcome to Ureal! 🇳🇬",
            description: "Check your email to confirm your account, then sign in.",
          });
          setIsSignUp(false);
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Sign in failed",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "Welcome back! 🎉",
            description: "Ready to share your Nigerian story?",
          });
          navigate('/');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden relative">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-nigerian-green/5 via-background to-ureal-gold/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--nigerian-green)/0.1),transparent_50%)]" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-ureal-gold/10 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-nigerian-green/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Floating Icons */}
      {Array.from({ length: 5 }).map((_, i) => {
        const Icon = floatingIcons[currentIcon];
        return (
          <Icon
            key={i}
            className={`absolute text-nigerian-green/20 animate-bounce delay-${i * 200} transform transition-all duration-1000 ${
              i === 0 ? 'top-20 left-10 w-6 h-6' :
              i === 1 ? 'top-32 right-16 w-4 h-4' :
              i === 2 ? 'bottom-40 left-20 w-5 h-5' :
              i === 3 ? 'bottom-60 right-10 w-4 h-4' :
              'top-1/2 right-1/4 w-6 h-6'
            }`}
            style={{
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        );
      })}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className={`w-full max-w-md space-y-6 transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          {/* Header */}
          <div className="text-center space-y-6 relative">
            {/* Back Button */}
            <Button
              variant="ghost"
              size="icon"
              className="absolute -top-4 -left-4 backdrop-blur-sm bg-background/20 hover:bg-background/40 border border-border/20 transition-all duration-300 hover:scale-110"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            {/* Logo with Animation */}
            <div className="flex justify-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-nigerian-green to-ureal-gold rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-all duration-500" />
                <img 
                  src={urealLogo} 
                  alt="Ureal" 
                  className="relative w-20 h-20 transform transition-all duration-500 hover:scale-110 hover:rotate-3"
                />
              </div>
            </div>
            
            {/* Animated Title */}
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-nigerian-green via-ureal-gold to-nigerian-green bg-clip-text text-transparent animate-pulse bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                {isSignUp ? 'Join Ureal' : 'Welcome Back'}
              </h1>
              <div className="overflow-hidden">
                <p className="text-muted-foreground animate-slide-in-right text-lg font-medium">
                  {isSignUp 
                    ? 'Share your unique Nigerian story with the world 🇳🇬' 
                    : 'Continue your creative journey ✨'}
                </p>
              </div>
            </div>
          </div>

          {/* Glassmorphism Auth Form */}
          <Card className="border-border/30 bg-card/60 backdrop-blur-xl shadow-2xl relative overflow-hidden transform transition-all duration-500 hover:scale-[1.02] group">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-nigerian-green/20 via-transparent to-ureal-gold/20 rounded-lg" />
            <div className="absolute inset-[1px] bg-card/80 backdrop-blur-xl rounded-lg" />
            
            {/* Floating Orbs Inside Card */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-nigerian-green rounded-full animate-ping" />
            <div className="absolute bottom-4 left-4 w-1 h-1 bg-ureal-gold rounded-full animate-pulse" />
            
            <CardHeader className="space-y-3 relative z-10">
              <CardTitle className="text-2xl text-center bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent font-bold">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </CardTitle>
              <CardDescription className="text-center text-base">
                {isSignUp 
                  ? 'Start creating amazing content today 🚀' 
                  : 'Welcome back to the community 🎉'}
              </CardDescription>
            </CardHeader>
          
            <CardContent className="space-y-6 relative z-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                {isSignUp && (
                  <div className="space-y-2 transform transition-all duration-300 animate-fade-in">
                    <Label htmlFor="displayName" className="text-sm font-medium">Display Name</Label>
                    <Input
                      id="displayName"
                      placeholder="Your creative name ✨"
                      value={formData.displayName}
                      onChange={(e) => setFormData(prev => ({...prev, displayName: e.target.value}))}
                      className="bg-background/30 backdrop-blur-sm border-border/50 focus:border-nigerian-green focus:ring-nigerian-green/20 transition-all duration-300 h-12 text-base hover:bg-background/50"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email 📧"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                    required
                    className="bg-background/30 backdrop-blur-sm border-border/50 focus:border-nigerian-green focus:ring-nigerian-green/20 transition-all duration-300 h-12 text-base hover:bg-background/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative group">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password 🔒"
                      value={formData.password}
                      onChange={(e) => setFormData(prev => ({...prev, password: e.target.value}))}
                      required
                      className="bg-background/30 backdrop-blur-sm border-border/50 focus:border-nigerian-green focus:ring-nigerian-green/20 transition-all duration-300 h-12 text-base pr-12 hover:bg-background/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 hover:bg-nigerian-green/10 transition-all duration-200"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                {isSignUp && (
                  <div className="space-y-2 transform transition-all duration-300 animate-fade-in">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password 🔐"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
                      required
                      className="bg-background/30 backdrop-blur-sm border-border/50 focus:border-nigerian-green focus:ring-nigerian-green/20 transition-all duration-300 h-12 text-base hover:bg-background/50"
                    />
                  </div>
                )}
                
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-nigerian-green to-ureal-gold hover:from-nigerian-green/90 hover:to-ureal-gold/90 text-primary-foreground font-semibold text-base transform transition-all duration-300 hover:scale-[1.02] hover:shadow-warm active:scale-[0.98] relative overflow-hidden group"
                  disabled={loading}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Loading...</span>
                    </div>
                  ) : (
                    isSignUp ? 'Create Account 🚀' : 'Sign In ✨'
                  )}
                </Button>
              </form>
              
              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-muted-foreground hover:text-nigerian-green transition-all duration-300 hover:scale-105 group relative"
                >
                  <span className="relative z-10">
                    {isSignUp 
                      ? 'Already have an account? Sign in 👋' 
                      : "Don't have an account? Sign up 🌟"}
                  </span>
                  <div className="absolute inset-0 bg-nigerian-green/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}