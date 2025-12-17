"use client";

import { ScreenContent } from "@/types/workshop-constructor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface RaciMatrixEditorProps {
  content: ScreenContent;
  onChange: (content: ScreenContent) => void;
}

export function RaciMatrixEditor({ content, onChange }: RaciMatrixEditorProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...content, [field]: value });
  };

  const decisions = content.decisions || [];
  const roles = content.roles || [];

  const addDecision = () => {
    updateField("decisions", [...decisions, ""]);
  };

  const updateDecision = (index: number, value: string) => {
    const newDecisions = [...decisions];
    newDecisions[index] = value;
    updateField("decisions", newDecisions);
  };

  const removeDecision = (index: number) => {
    const newDecisions = decisions.filter((_dec: string, i: number) => i !== index);
    updateField("decisions", newDecisions);
  };

  const addRole = () => {
    updateField("roles", [...roles, ""]);
  };

  const updateRole = (index: number, value: string) => {
    const newRoles = [...roles];
    newRoles[index] = value;
    updateField("roles", newRoles);
  };

  const removeRole = (index: number) => {
    const newRoles = roles.filter((_role: string, i: number) => i !== index);
    updateField("roles", newRoles);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content-title">Title</Label>
        <Input
          id="content-title"
          value={content.title || ""}
          onChange={(e) => updateField("title", e.target.value)}
          placeholder="RACI Matrix - Decision Rights"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="content-description">Description</Label>
        <Textarea
          id="content-description"
          value={content.description || ""}
          onChange={(e) => updateField("description", e.target.value)}
          rows={3}
          placeholder="Define who is Responsible, Accountable, Consulted, and Informed"
        />
      </div>

      <div className="p-4 border rounded-lg bg-blue-50/50">
        <h4 className="font-medium mb-2 text-sm">RACI Legend</h4>
        <ul className="text-xs space-y-1 text-muted-foreground">
          <li><strong className="text-foreground">R</strong> - Responsible: Does the work</li>
          <li><strong className="text-foreground">A</strong> - Accountable: Ultimately answerable</li>
          <li><strong className="text-foreground">C</strong> - Consulted: Provides input</li>
          <li><strong className="text-foreground">I</strong> - Informed: Kept up to date</li>
        </ul>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Decisions/Tasks</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addDecision}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Decision
          </Button>
        </div>

        {decisions.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No decisions yet. Add decisions that need role assignment.
          </p>
        ) : (
          <div className="space-y-2">
            {decisions.map((decision: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={decision}
                  onChange={(e) => updateDecision(index, e.target.value)}
                  placeholder={`Decision ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeDecision(index)}
                  className="flex-shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label>Roles/People</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={addRole}
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Role
          </Button>
        </div>

        {roles.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No roles yet. Add roles/people to assign to decisions.
          </p>
        ) : (
          <div className="space-y-2">
            {roles.map((role: string, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={role}
                  onChange={(e) => updateRole(index, e.target.value)}
                  placeholder={`Role ${index + 1}`}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRole(index)}
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
