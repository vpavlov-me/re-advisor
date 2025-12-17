"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface BrainstormEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function BrainstormEditor({ content, onChange }: BrainstormEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const categories = content.categories || [];

  const addCategory = () => {
    updateField("categories", [...categories, ""]);
  };

  const updateCategory = (index: number, value: string) => {
    const newCategories = [...categories];
    newCategories[index] = value;
    updateField("categories", newCategories);
  };

  const removeCategory = (index: number) => {
    const newCategories = categories.filter((_cat: string, i: number) => i !== index);
    updateField("categories", newCategories);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Brainstorm Session"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Describe what participants should brainstorm about"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-prompt">Brainstorm Prompt</Label>
        <Textarea
          id="content-prompt"
          value={content.prompt || ""}
          onChange={(e) => updateField("prompt", e.target.value)}
          rows={4}
          placeholder="What question or challenge should participants address?"
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="space-y-0.5">
          <Label>Anonymous Contributions</Label>
          <p className="text-sm text-muted-foreground">
            Allow participants to contribute ideas anonymously
          </p>
        </div>
        <Switch
          checked={content.allowAnonymous || false}
          onCheckedChange={(checked) => updateField("allowAnonymous", checked)}
        />
      </div>

      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="space-y-0.5">
          <Label>Enable Voting</Label>
          <p className="text-sm text-muted-foreground">
            Let participants vote on ideas after brainstorming
          </p>
        </div>
        <Switch
          checked={content.enableVoting || false}
          onCheckedChange={(checked) => updateField("enableVoting", checked)}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Categories (Optional)</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addCategory}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Category
          </Button>
        </div>

        {categories.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No categories. Leave empty for free-form brainstorming, or add categories to organize ideas.
          </p>
        ) : (
          <div className="space-y-2">
            {categories.map((category: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={category}
                  onChange={(e) => updateCategory(index, e.target.value)}
                  placeholder={`Category ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCategory(index)}
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
