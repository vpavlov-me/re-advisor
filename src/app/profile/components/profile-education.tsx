"use client";

import { Plus, GraduationCap, Edit } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Education } from "../types";

interface ProfileEducationProps {
  education: Education[];
  onAdd: () => void;
  onEdit: (edu: Education) => void;
}

export function ProfileEducation({ education, onAdd, onEdit }: ProfileEducationProps) {
  return (
    <Card id="education" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Education</CardTitle>
          <p className="text-sm text-muted-foreground">Academic background and qualifications</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {education.length > 0 ? (
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id} className="group flex gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  {edu.field && (
                    <p className="text-sm text-muted-foreground">{edu.field}</p>
                  )}
                  {edu.year && (
                    <p className="text-xs text-muted-foreground mt-1">{edu.year}</p>
                  )}
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mt-2">{edu.description}</p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onEdit(edu)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No education added yet</p>
        )}
      </CardContent>
    </Card>
  );
}
