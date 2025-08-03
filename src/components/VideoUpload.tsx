import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Upload, X, Video, Camera } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface VideoUploadProps {
  onUploadComplete?: () => void;
}

export const VideoUpload = ({ onUploadComplete }: VideoUploadProps) => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    hashtags: [] as string[],
    hashtagInput: ''
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('video/')) {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setVideoPreview(url);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a video file.",
          variant: "destructive"
        });
      }
    }
  };

  const addHashtag = () => {
    const tag = formData.hashtagInput.trim().replace('#', '');
    if (tag && !formData.hashtags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        hashtags: [...prev.hashtags, tag],
        hashtagInput: ''
      }));
    }
  };

  const removeHashtag = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      hashtags: prev.hashtags.filter(t => t !== tag)
    }));
  };

  const handleUpload = async () => {
    if (!selectedFile || !user) {
      toast({
        title: "Upload failed",
        description: "Please select a video and make sure you're signed in.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.title.trim()) {
      toast({
        title: "Title required",
        description: "Please add a title for your video.",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      // Create file name with user ID
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      // Upload video to storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);

      // Create video record in database
      const { error: dbError } = await supabase
        .from('videos')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          video_url: publicUrl,
          hashtags: formData.hashtags,
          duration_seconds: 0 // Will be updated when we add video processing
        });

      if (dbError) throw dbError;

      toast({
        title: "Video uploaded! 🎉",
        description: "Your Nigerian story is now live on Ureal!",
      });

      // Reset form
      setSelectedFile(null);
      setVideoPreview(null);
      setFormData({
        title: '',
        description: '',
        hashtags: [],
        hashtagInput: ''
      });

      onUploadComplete?.();

    } catch (error: any) {
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5 text-nigerian-green" />
            Upload Your Video
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* File Upload */}
          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                selectedFile 
                  ? 'border-nigerian-green bg-nigerian-green/5' 
                  : 'border-border hover:border-nigerian-green/50'
              }`}
            >
              {videoPreview ? (
                <div className="space-y-4">
                  <video
                    src={videoPreview}
                    className="w-full max-w-xs mx-auto rounded-lg"
                    controls
                  />
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {selectedFile?.name}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedFile(null);
                        setVideoPreview(null);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="mx-auto w-12 h-12 rounded-full bg-nigerian-green/10 flex items-center justify-center">
                    <Upload className="w-6 h-6 text-nigerian-green" />
                  </div>
                  <div>
                    <p className="text-lg font-medium">Drop your video here</p>
                    <p className="text-sm text-muted-foreground">
                      or click to browse your files
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-nigerian-green text-nigerian-green hover:bg-nigerian-green/10"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Select Video
                  </Button>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {/* Video Details */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="Share your Nigerian story..."
                value={formData.title}
                onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                className="bg-background/50"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Tell us more about your video..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                className="bg-background/50 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="hashtags">Hashtags</Label>
              <div className="flex gap-2">
                <Input
                  id="hashtags"
                  placeholder="Add hashtag (e.g., NaijaVibes)"
                  value={formData.hashtagInput}
                  onChange={(e) => setFormData(prev => ({...prev, hashtagInput: e.target.value}))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addHashtag();
                    }
                  }}
                  className="bg-background/50"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={addHashtag}
                  disabled={!formData.hashtagInput.trim()}
                >
                  Add
                </Button>
              </div>
              
              {formData.hashtags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.hashtags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-nigerian-green/10 text-nigerian-green border-nigerian-green/20"
                    >
                      #{tag}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 ml-1 text-nigerian-green hover:bg-transparent"
                        onClick={() => removeHashtag(tag)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Upload Button */}
          <Button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="w-full bg-gradient-to-r from-nigerian-green to-ureal-gold hover:from-nigerian-green/90 hover:to-ureal-gold/90 text-primary-foreground"
          >
            {uploading ? 'Uploading...' : 'Share with the World 🇳🇬'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};