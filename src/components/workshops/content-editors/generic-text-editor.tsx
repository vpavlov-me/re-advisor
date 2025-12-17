"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface GenericTextEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function GenericTextEditor({ content, onChange }: GenericTextEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Enter screen title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Enter description"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-text">Main Text</Label>
        <Textarea
          id="content-text"
          value={content.text || ""}
          onChange={(e) => updateField("text", e.target.value)}
          rows={8}
          placeholder="Enter the main content for this screen..."
        />
      </div>

      {content.instructions && (
        <div className="space-y-2">
          <Label htmlFor="content-instructions">Instructions</Label>
          <Textarea
            id="content-instructions"
            value={content.instructions || ""}
            onChange={(e) => updateField("instructions", e.target.value)}
            rows={4}
            placeholder="Enter participant instructions"
          />
        </div>
      )}
    </div>
  );
}
