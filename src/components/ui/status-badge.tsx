"use client";

import * as React from "react";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const statusBadgeVariants = cva("", {
  variants: {
    status: {
      // General statuses
      active: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      inactive: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",

      // Payment statuses
      paid: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      awaiting: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      overdue: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      "no-invoices": "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",

      // Advisor roles
      "external-consul": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      consultant: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      "personal-advisor": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      "lead-advisor": "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",

      // Consultation/workflow statuses
      scheduled: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      confirmed: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      completed: "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300",
      cancelled: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      "in-progress": "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      delivered: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",

      // Service request statuses
      "pending-consultant": "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      "awaiting-family-approval": "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      "completed-paid": "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      "declined-consultant": "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
      "declined-family": "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",

      // Notification types
      message: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
      meeting: "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
      system: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300",

      // Resource types (for knowledge)
      article: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
      video: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300",
      document: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      template: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      guide: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300",
      workshop: "bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300",
      webinar: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300",
      course: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300",

      // Priority levels
      low: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
      medium: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      high: "bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300",
      urgent: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    },
  },
});

export type StatusType = VariantProps<typeof statusBadgeVariants>["status"];

const statusLabels: Record<NonNullable<StatusType>, string> = {
  // General
  active: "Active",
  pending: "Pending",
  inactive: "Inactive",

  // Payment
  paid: "Paid",
  awaiting: "Awaiting Payment",
  overdue: "Overdue",
  "no-invoices": "No Invoices",

  // Roles
  "external-consul": "External Consul",
  consultant: "Consultant",
  "personal-advisor": "Personal Family Advisor",
  "lead-advisor": "Lead Advisor",

  // Workflow
  scheduled: "Scheduled",
  confirmed: "Confirmed",
  completed: "Completed",
  cancelled: "Cancelled",
  "in-progress": "In Progress",
  delivered: "Delivered",

  // Service requests
  "pending-consultant": "Pending Your Review",
  "awaiting-family-approval": "Awaiting Family Approval",
  "completed-paid": "Completed & Paid",
  "declined-consultant": "Declined",
  "declined-family": "Family Declined",

  // Notifications
  message: "Message",
  meeting: "Meeting",
  system: "System",

  // Resources
  article: "Article",
  video: "Video",
  document: "Document",
  template: "Template",
  guide: "Guide",
  workshop: "Workshop",
  webinar: "Webinar",
  course: "Course",

  // Priority
  low: "Low",
  medium: "Medium",
  high: "High",
  urgent: "Urgent",
};

interface StatusBadgeProps extends Omit<BadgeProps, "variant"> {
  status: NonNullable<StatusType>;
  label?: string;
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  return (
    <Badge
      variant="secondary"
      className={cn(statusBadgeVariants({ status }), className)}
      {...props}
    >
      {label ?? statusLabels[status]}
    </Badge>
  );
}

export { statusBadgeVariants, statusLabels };
