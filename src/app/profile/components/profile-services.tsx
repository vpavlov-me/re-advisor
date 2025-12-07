"use client";

import Link from "next/link";
import { Plus, Briefcase, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Service } from "../types";

interface ProfileServicesProps {
  services: Service[];
  onServiceClick: (service: Service) => void;
}

export function ProfileServices({ services, onServiceClick }: ProfileServicesProps) {
  return (
    <Card id="services" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Services Offered</CardTitle>
          <p className="text-sm text-muted-foreground">Professional services and consulting offerings</p>
        </div>
        <Link href="/services">
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Add Service
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {services.length > 0 ? (
          <div className="space-y-3">
            {services.map((service) => (
              <Card 
                key={service.id} 
                className="p-4 hover:bg-muted/50 transition-colors cursor-pointer group"
                onClick={() => onServiceClick(service)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium group-hover:text-primary transition-colors">{service.name}</h4>
                    </div>
                    {service.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    )}
                    {service.duration && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground pt-1">
                        <Clock className="h-3.5 w-3.5" />
                        {service.duration}
                      </div>
                    )}
                  </div>
                  <span className="font-semibold text-primary shrink-0">{service.price}</span>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <Briefcase className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">No services added yet</p>
            <Link href="/services">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Service
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
