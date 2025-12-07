"use client";

import Link from "next/link";
import { Edit } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Service } from "../types";

interface ServicePreviewDialogProps {
  service: Service | null;
  onClose: () => void;
}

export function ServicePreviewDialog({ service, onClose }: ServicePreviewDialogProps) {
  if (!service) return null;

  return (
    <Dialog open={!!service} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Service Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{service.name}</h3>
            {service.description && (
              <p className="text-muted-foreground">{service.description}</p>
            )}
          </div>
          <Separator />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Price</p>
              <p className="font-semibold text-lg">{service.price}</p>
            </div>
            {service.duration && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Duration</p>
                <p className="font-medium">{service.duration}</p>
              </div>
            )}
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" asChild>
              <Link href="/services">
                <Edit className="h-4 w-4 mr-2" />
                Manage Services
              </Link>
            </Button>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
