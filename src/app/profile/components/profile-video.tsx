"use client";

import { Play, Plus, Edit, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ProfileVideoProps {
  videoUrl?: string | null;
  onEdit: () => void;
}

// Extract video ID and platform from URL
function parseVideoUrl(url: string): { platform: 'youtube' | 'vimeo' | 'loom' | 'unknown'; videoId: string | null } {
  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return { platform: 'youtube', videoId: match[1] };
    }
  }

  // Vimeo patterns
  const vimeoPattern = /(?:vimeo\.com\/)(\d+)/;
  const vimeoMatch = url.match(vimeoPattern);
  if (vimeoMatch) {
    return { platform: 'vimeo', videoId: vimeoMatch[1] };
  }

  // Loom patterns
  const loomPattern = /(?:loom\.com\/share\/)([a-zA-Z0-9]+)/;
  const loomMatch = url.match(loomPattern);
  if (loomMatch) {
    return { platform: 'loom', videoId: loomMatch[1] };
  }

  return { platform: 'unknown', videoId: null };
}

function getEmbedUrl(platform: string, videoId: string): string {
  switch (platform) {
    case 'youtube':
      return `https://www.youtube.com/embed/${videoId}`;
    case 'vimeo':
      return `https://player.vimeo.com/video/${videoId}`;
    case 'loom':
      return `https://www.loom.com/embed/${videoId}`;
    default:
      return '';
  }
}

export function ProfileVideo({ videoUrl, onEdit }: ProfileVideoProps) {
  if (!videoUrl) {
    return (
      <Card className="overflow-hidden group hover:bg-muted/50 transition-colors cursor-pointer" onClick={onEdit}>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">Add intro video</p>
              <p className="text-xs text-muted-foreground">Share a YouTube, Vimeo, or Loom video introduction</p>
            </div>
            <Plus className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    );
  }

  const { platform, videoId } = parseVideoUrl(videoUrl);
  const embedUrl = videoId ? getEmbedUrl(platform, videoId) : null;

  return (
    <Card id="video" className="overflow-hidden scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div className="space-y-1">
          <CardTitle className="text-lg">Intro Video</CardTitle>
          <p className="text-sm text-muted-foreground">Get to know me better</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {embedUrl ? (
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-muted">
            <iframe
              src={embedUrl}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Intro Video"
            />
          </div>
        ) : (
          <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Play className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium mb-1">External Video</p>
              <Link
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline flex items-center gap-1"
              >
                Open video
                <ExternalLink className="h-3 w-3 shrink-0" />
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
