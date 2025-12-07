"use client";

import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Recommendation } from "../types";

interface RecommendationDialogProps {
  recommendation: Recommendation | null;
  onClose: () => void;
}

export function RecommendationDialog({ recommendation, onClose }: RecommendationDialogProps) {
  if (!recommendation) return null;

  return (
    <Dialog open={!!recommendation} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Recommendation</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarFallback colorSeed={recommendation.author} className="text-xl">
                {recommendation.author.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{recommendation.author}</h3>
                  {recommendation.title && (
                    <p className="text-muted-foreground">{recommendation.title}</p>
                  )}
                  {recommendation.company && (
                    <p className="text-sm text-muted-foreground">{recommendation.company}</p>
                  )}
                  {recommendation.relationship && (
                    <p className="text-xs text-muted-foreground mt-1">{recommendation.relationship}</p>
                  )}
                </div>
                {recommendation.featured && (
                  <Badge variant="secondary">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < recommendation.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pl-20">
            <p className="text-muted-foreground whitespace-pre-wrap">"{recommendation.text}"</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
