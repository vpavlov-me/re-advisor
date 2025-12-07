"use client";

import { Plus, Briefcase, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Experience } from "../types";

interface ProfileExperienceProps {
  experience: Experience[];
  onAdd: () => void;
  onEdit: (exp: Experience) => void;
}

export function ProfileExperience({ experience, onAdd, onEdit }: ProfileExperienceProps) {
  return (
    <Card id="experience" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Professional Experience</CardTitle>
          <p className="text-sm text-muted-foreground">Work history and career progression</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {experience.length > 0 ? (
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="group flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground">{exp.company}</p>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground">{exp.location}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">{exp.period}</p>
                  {exp.description && (
                    <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEdit(exp)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No experience added yet</p>
        )}
      </CardContent>
    </Card>
  );
}
