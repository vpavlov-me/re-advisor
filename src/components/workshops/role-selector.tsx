"use client";

import { useState } from "react";
import { Users, UserCircle, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { WorkshopRole } from "@/types/workshop-constructor";

interface RoleSelectorProps {
  selectedRole: WorkshopRole;
  onRoleChange: (role: WorkshopRole) => void;
  compact?: boolean;
}

const roleConfig: Record<WorkshopRole, {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  badgeVariant: "default" | "secondary" | "outline";
}> = {
  "family-member": {
    label: "Family Member",
    description: "Проходит воркшоп как участник",
    icon: UserCircle,
    color: "text-blue-600",
    badgeVariant: "default",
  },
  "family-consul": {
    label: "Family Consul",
    description: "Ведет воркшоп и проходит как участник",
    icon: Users,
    color: "text-purple-600",
    badgeVariant: "secondary",
  },
  "external-advisor": {
    label: "External Advisor",
    description: "Ведет воркшоп, видит экраны участников",
    icon: Briefcase,
    color: "text-orange-600",
    badgeVariant: "outline",
  },
};

export function RoleSelector({ selectedRole, onRoleChange, compact = false }: RoleSelectorProps) {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center gap-2">
        {(Object.keys(roleConfig) as WorkshopRole[]).map((role) => {
          const config = roleConfig[role];
          const Icon = config.icon;
          const isSelected = selectedRole === role;

          return (
            <Button
              key={role}
              variant={isSelected ? "default" : "outline"}
              size="sm"
              onClick={() => onRoleChange(role)}
              className={`flex-shrink-0 ${isSelected ? "bg-primary text-primary-foreground" : "bg-white text-gray-900 hover:bg-gray-100"}`}
            >
              <Icon className="h-4 w-4 mr-2" />
              {config.label}
            </Button>
          );
        })}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {(Object.keys(roleConfig) as WorkshopRole[]).map((role) => {
        const config = roleConfig[role];
        const Icon = config.icon;
        const isSelected = selectedRole === role;

        return (
          <Card
            key={role}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected ? "ring-2 ring-primary shadow-md" : ""
            }`}
            onClick={() => onRoleChange(role)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg bg-muted ${config.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{config.label}</h3>
                    {isSelected && (
                      <Badge variant={config.badgeVariant}>Selected</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {config.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function getRoleConfig(role: WorkshopRole) {
  return roleConfig[role];
}
