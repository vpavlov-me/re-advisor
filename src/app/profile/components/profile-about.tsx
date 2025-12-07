"use client";

import { Edit, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ProfileAboutProps {
  bio?: string | null;
  onEdit: () => void;
}

export function ProfileAbout({ bio, onEdit }: ProfileAboutProps) {
  return (
    <Card id="about" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">About</CardTitle>
          <p className="text-sm text-muted-foreground">Professional background and expertise</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {bio ? (
          <p className="text-muted-foreground whitespace-pre-wrap">{bio}</p>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">No bio added yet</p>
            <Button variant="outline" size="sm" onClick={onEdit}>
              Add Bio
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
