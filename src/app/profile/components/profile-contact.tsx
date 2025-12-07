"use client";

import { Edit, Mail, Phone, MapPin, Globe, Linkedin, Twitter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContactInfo {
  email?: string | null;
  phone?: string | null;
  location?: string | null;
  website?: string | null;
  linkedin?: string | null;
  twitter?: string | null;
}

interface ProfileContactProps {
  contact: ContactInfo;
  onEdit: () => void;
}

export function ProfileContact({ contact, onEdit }: ProfileContactProps) {
  const contactLinks = [
    { icon: Mail, label: "Email", value: contact.email, href: contact.email ? `mailto:${contact.email}` : undefined },
    { icon: Phone, label: "Phone", value: contact.phone, href: contact.phone ? `tel:${contact.phone}` : undefined },
    { icon: MapPin, label: "Location", value: contact.location },
    { 
      icon: Globe, 
      label: "Website", 
      value: contact.website, 
      href: contact.website && contact.website.startsWith('http') 
        ? contact.website 
        : contact.website 
          ? `https://${contact.website}` 
          : undefined 
    },
    { 
      icon: Linkedin, 
      label: "LinkedIn", 
      value: contact.linkedin, 
      href: contact.linkedin && contact.linkedin.startsWith('http') 
        ? contact.linkedin 
        : contact.linkedin 
          ? `https://linkedin.com/in/${contact.linkedin}` 
          : undefined 
    },
    { 
      icon: Twitter, 
      label: "Twitter", 
      value: contact.twitter, 
      href: contact.twitter && contact.twitter.startsWith('http') 
        ? contact.twitter 
        : contact.twitter 
          ? `https://twitter.com/${contact.twitter}` 
          : undefined 
    },
  ].filter(link => link.value);

  return (
    <Card id="contact" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Contact Information</CardTitle>
          <p className="text-sm text-muted-foreground">Ways to get in touch</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {contactLinks.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const content = (
                <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-muted-foreground">{link.label}</p>
                    <p className="text-sm font-medium truncate">{link.value}</p>
                  </div>
                </div>
              );

              if (link.href) {
                return (
                  <a 
                    key={link.label} 
                    href={link.href}
                    target={link.label !== "Email" && link.label !== "Phone" ? "_blank" : undefined}
                    rel={link.label !== "Email" && link.label !== "Phone" ? "noopener noreferrer" : undefined}
                    className="block"
                  >
                    {content}
                  </a>
                );
              }

              return <div key={link.label}>{content}</div>;
            })}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No contact information added yet</p>
        )}
      </CardContent>
    </Card>
  );
}
