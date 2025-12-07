"use client";

import { Plus, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

interface ProfileSkillsProps {
  skills: string[];
  newSkill: string;
  onNewSkillChange: (value: string) => void;
  onAddSkill: () => void;
  onRemoveSkill: (skill: string) => void;
}

export function ProfileSkills({ 
  skills, 
  newSkill, 
  onNewSkillChange, 
  onAddSkill, 
  onRemoveSkill 
}: ProfileSkillsProps) {
  return (
    <Card id="skills" className="scroll-mt-24">
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-lg">Skills</CardTitle>
          <p className="text-sm text-muted-foreground">Core competencies and expertise areas</p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add new skill */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a skill (e.g., Financial Planning)"
            value={newSkill}
            onChange={(e) => onNewSkillChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                onAddSkill();
              }
            }}
          />
          <Button 
            variant="secondary" 
            onClick={onAddSkill}
            disabled={!newSkill.trim()}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Skills list */}
        {skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="px-3 py-1.5 text-sm group hover:bg-destructive/10 cursor-pointer transition-colors"
              >
                <span>{skill}</span>
                <button
                  onClick={() => onRemoveSkill(skill)}
                  className="ml-2 opacity-0 group-hover:opacity-100 hover:text-destructive transition-opacity"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No skills added yet. Add your professional skills above.</p>
        )}
      </CardContent>
    </Card>
  );
}
