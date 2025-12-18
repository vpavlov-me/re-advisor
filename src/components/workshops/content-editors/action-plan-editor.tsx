"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ActionPlanEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function ActionPlanEditor({ content, onChange }: ActionPlanEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const columns = content.columns || [
    "Action Item",
    "Owner",
    "Deadline",
    "Status"
  ];

  const updateColumn = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    updateField("columns", newColumns);
  };

  const addColumn = () => {
    updateField("columns", [...columns, ""]);
  };

  const removeColumn = (index: number) => {
    if (columns.length <= 2) {
      return; // Keep at least 2 columns
    }
    const newColumns = columns.filter((_col: string, i: number) => i !== index);
    updateField("columns", newColumns);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="Action Plan"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Instructions for creating the action plan"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Table Columns</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addColumn}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Column
          </Button>
        </div>

        <div className="space-y-2">
          {columns.map((column: string, index: number) => (
            <div key={index} className="flex gap-2">
              <Input
                value={column}
                onChange={(e) => updateColumn(index, e.target.value)}
                placeholder={`Column ${index + 1}`}
              />
              {columns.length > 2 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeColumn(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">
          Define the columns for the action plan table. Participants will be able to add rows during the workshop.
        </p>
      </div>

      <div className="p-4 border rounded-lg bg-muted/5">
        <h4 className="font-medium mb-2 text-sm">Preview</h4>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse border">
            <thead>
              <tr className="bg-muted">
                {columns.map((col: string, i: number) => (
                  <th key={i} className="border p-2 text-left font-medium">
                    {col || `Column ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {columns.map((_col: string, i: number) => (
                  <td key={i} className="border p-2 text-muted-foreground">
                    Example data
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
