"use client";

import { Plus, Star, Edit, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { Recommendation } from "../types";

interface ProfileRecommendationsProps {
  recommendations: Recommendation[];
  onAdd: () => void;
  onEdit: (rec: Recommendation) => void;
  onClick: (rec: Recommendation) => void;
}

export function ProfileRecommendations({ 
  recommendations, 
  onAdd, 
  onEdit, 
  onClick 
}: ProfileRecommendationsProps) {
  return (
    <Card id="recommendations" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Recommendations</CardTitle>
          <p className="text-sm text-muted-foreground">Client testimonials and peer endorsements</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {recommendations.length > 0 ? (
          <div className="space-y-3">
            {recommendations.map((rec) => (
              <Card 
                key={rec.id} 
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group relative"
                onClick={() => onClick(rec)}
              >
                <div className="flex items-start gap-3" style={{ paddingRight: rec.featured ? '90px' : '0' }}>
                  {rec.featured && (
                    <Badge variant="secondary" className="absolute top-3 right-3 text-xs z-10">
                      <Star className="h-3 w-3 mr-1 fill-current" />
                      Featured
                    </Badge>
                  )}
                  <Avatar className="h-11 w-11 shrink-0">
                    <AvatarFallback colorSeed={rec.author}>{rec.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">{rec.author}</p>
                        {rec.title && (
                          <p className="text-sm text-muted-foreground truncate">{rec.title}</p>
                        )}
                        {rec.company && (
                          <p className="text-xs text-muted-foreground truncate">{rec.company}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3.5 w-3.5 ${i < rec.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground/30'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      "{rec.text}"
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      className="h-auto p-0 mt-2 text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClick(rec);
                      }}
                    >
                      Read more <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 h-8 w-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(rec);
                    }}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Star className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">No recommendations yet</p>
            <Button variant="outline" size="sm" onClick={onAdd}>
              <Plus className="h-4 w-4 mr-1" />
              Add Recommendation
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
