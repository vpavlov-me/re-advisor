"use client";

import Link from "next/link";
import { Play, ExternalLink, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileVideoProps {
  videoUrl?: string | null;
  onEdit: () => void;
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
              <p className="text-sm font-medium">Add intro video link</p>
              <p className="text-xs text-muted-foreground">Share a video introduction</p>
            </div>
            <Plus className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Play className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">Intro Video</p>
            <Link 
              href={videoUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center gap-1 truncate"
            >
              {videoUrl}
              <ExternalLink className="h-3 w-3 shrink-0" />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
