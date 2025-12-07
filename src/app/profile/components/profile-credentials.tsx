"use client";

import { Plus, Award } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import type { Credential } from "../types";

interface ProfileCredentialsProps {
  credentials: Credential[];
  onAdd: () => void;
}

export function ProfileCredentials({ credentials, onAdd }: ProfileCredentialsProps) {
  return (
    <Card id="credentials" className="scroll-mt-24">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle className="text-lg">Credentials & Certifications</CardTitle>
          <p className="text-sm text-muted-foreground">Professional certifications and licenses</p>
        </div>
        <Button variant="ghost" size="sm" onClick={onAdd}>
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent>
        {credentials.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            {credentials.map((cred) => (
              <div key={cred.id} className="flex gap-3 p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-2 mb-1">
                    <h4 className="font-medium text-sm flex-1">{cred.name}</h4>
                    <Badge variant="success" className="h-5 text-xs shrink-0">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                  {cred.issuer && (
                    <p className="text-xs text-muted-foreground">{cred.issuer}</p>
                  )}
                  {cred.year && (
                    <p className="text-xs text-muted-foreground mt-1">Obtained: {cred.year}</p>
                  )}
                  {cred.credential_id && (
                    <p className="text-xs text-muted-foreground mt-1">ID: {cred.credential_id}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <Award className="h-10 w-10 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-sm text-muted-foreground mb-3">No credentials added yet</p>
            <Button variant="outline" size="sm" onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Credential
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
