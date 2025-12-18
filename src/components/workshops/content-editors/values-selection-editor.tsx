"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ValuesSelectionEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function ValuesSelectionEditor({ content, onChange }: ValuesSelectionEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const valueOptions = content.valueOptions || [];

  const addValue = () => {
    updateField("valueOptions", [...valueOptions, ""]);
  };

  const updateValue = (index: number, value: string) => {
    const newValues = [...valueOptions];
    newValues[index] = value;
    updateField("valueOptions", newValues);
  };

  const removeValue = (index: number) => {
    const newValues = valueOptions.filter((_val: string, i: number) => i !== index);
    updateField("valueOptions", newValues);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Values Assessment"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Instructions for selecting values"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="max-selections">Maximum Selections</Label>
        <Input
          id="max-selections"
          type="number"
          min="1"
          max="20"
          value={content.maxSelections || 5}
          onChange={(e) => updateField("maxSelections", parseInt(e.target.value) || 5)}
        />
        <p className="text-xs text-muted-foreground">
          Number of values participants can select
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Value Options</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addValue}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Value
          </Button>
        </div>

        {valueOptions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No values yet. Add values for participants to choose from.
          </p>
        ) : (
          <div className="space-y-2">
            {valueOptions.map((value: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={value}
                  onChange={(e) => updateValue(index, e.target.value)}
                  placeholder={`Value ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeValue(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        <p className="text-xs text-muted-foreground mt-2">
          Common values: Integrity, Innovation, Collaboration, Transparency, Excellence, etc.
        </p>
      </div>
    </div>
  );
}
