"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface SwotEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function SwotEditor({ content, onChange }: SwotEditorProps) {
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
          placeholder="SWOT Analysis"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Describe the purpose of this SWOT analysis"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-instructions">Instructions</Label>
        <Textarea
          id="content-instructions"
          value={content.instructions || ""}
          onChange={(e) => updateField("instructions", e.target.value)}
          rows={4}
          placeholder="Guide participants on how to complete the SWOT analysis..."
        />
      </div>

      <div className="p-4 border rounded-lg bg-muted/5">
        <h4 className="font-medium mb-3 text-sm">SWOT Grid Configuration</h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-3 border rounded bg-green-50">
            <strong>Strengths</strong>
            <p className="text-xs text-muted-foreground mt-1">
              Internal positive factors
            </p>
          </div>
          <div className="p-3 border rounded bg-red-50">
            <strong>Weaknesses</strong>
            <p className="text-xs text-muted-foreground mt-1">
              Internal negative factors
            </p>
          </div>
          <div className="p-3 border rounded bg-blue-50">
            <strong>Opportunities</strong>
            <p className="text-xs text-muted-foreground mt-1">
              External positive factors
            </p>
          </div>
          <div className="p-3 border rounded bg-yellow-50">
            <strong>Threats</strong>
            <p className="text-xs text-muted-foreground mt-1">
              External negative factors
            </p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          Participants will be able to add items to each quadrant during the workshop.
        </p>
      </div>
    </div>
  );
}
