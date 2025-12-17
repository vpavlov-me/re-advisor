"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface IntroductionEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function IntroductionEditor({ content, onChange }: IntroductionEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const objectives = content.objectives || [];

  const addObjective = () => {
    updateField("objectives", [...objectives, ""]);
  };

  const updateObjective = (index: number, value: string) => {
    const newObjectives = [...objectives];
    newObjectives[index] = value;
    updateField("objectives", newObjectives);
  };

  const removeObjective = (index: number) => {
    const newObjectives = objectives.filter((_obj: string, i: number) => i !== index);
    updateField("objectives", newObjectives);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Welcome to the Workshop"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Brief introduction to the workshop"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-text">Main Content</Label>
        <Textarea
          id="content-text"
          value={content.text || ""}
          onChange={(e) => updateField("text", e.target.value)}
          rows={6}
          placeholder="Detailed content for the introduction screen..."
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Objectives</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addObjective}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Objective
          </Button>
        </div>

        {objectives.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No objectives yet. Click "Add Objective" to create one.
          </p>
        ) : (
          <div className="space-y-2">
            {objectives.map((objective: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={objective}
                  onChange={(e) => updateObjective(index, e.target.value)}
                  placeholder={`Objective ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeObjective(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
