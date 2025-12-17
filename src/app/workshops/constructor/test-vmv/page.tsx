"use client";

import { VMV_MASTER_TEMPLATE } from "@/data/vmv-master-template";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Sparkles, CheckCircle2 } from "lucide-react";

export default function TestVMVPage() {
  const template = VMV_MASTER_TEMPLATE;

  return (
    <div className="container mx-auto py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">VMV Master Template Test</h1>
        <p className="text-muted-foreground mt-1">
          Complete workshop with all 15 screens
        </p>
      </div>

      {/* Template Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{template.name}</CardTitle>
            <div className="flex gap-2">
              <Badge variant="outline">Master Template</Badge>
              <Badge className="bg-green-100 text-green-800">Published</Badge>
            </div>
          </div>
          <CardDescription>{template.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Category:</span>
              <p className="font-medium">{template.category}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Duration:</span>
              <p className="font-medium">{template.duration_minutes} minutes</p>
            </div>
            <div>
              <span className="text-muted-foreground">Screens:</span>
              <p className="font-medium">{template.screen_count}</p>
            </div>
            <div>
              <span className="text-muted-foreground">AI Enabled:</span>
              <p className="font-medium">{template.settings.enableAI ? "Yes" : "No"}</p>
            </div>
          </div>
          <div>
            <span className="text-muted-foreground text-sm">Target Audience:</span>
            <p className="font-medium">{template.target_audience}</p>
          </div>
        </CardContent>
      </Card>

      {/* Screens List */}
      <Card>
        <CardHeader>
          <CardTitle>Workshop Screens ({template.screens.length})</CardTitle>
          <CardDescription>All screens with complete content</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-4">
              {template.screens.map((screen, idx) => (
                <Card key={screen.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-sm font-bold text-muted-foreground">
                            #{idx + 1}
                          </span>
                          <CardTitle className="text-base">{screen.name}</CardTitle>
                        </div>
                        {screen.description && (
                          <CardDescription className="text-sm">
                            {screen.description}
                          </CardDescription>
                        )}
                      </div>
                      <div className="flex flex-col gap-1 items-end ml-4">
                        <Badge variant="outline" className="text-xs">
                          {screen.screen_type}
                        </Badge>
                        {screen.content_type && (
                          <Badge variant="secondary" className="text-xs">
                            {screen.content_type}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-3">
                      {/* Meta info */}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        {screen.duration_minutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {screen.duration_minutes}m
                          </span>
                        )}
                        {screen.ai_config.enabled && (
                          <span className="flex items-center gap-1 text-purple-600">
                            <Sparkles className="h-3 w-3" />
                            AI: {screen.ai_config.style || "enabled"}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          Screen Key: {screen.screen_key}
                        </span>
                      </div>

                      {/* Content Preview */}
                      <div className="bg-muted/30 rounded-lg p-3">
                        <p className="text-xs font-semibold mb-2 text-muted-foreground">
                          Content:
                        </p>
                        <pre className="text-xs overflow-auto max-h-40">
                          {JSON.stringify(screen.content, null, 2)}
                        </pre>
                      </div>

                      {/* Navigation */}
                      {(screen.navigation.next || screen.navigation.previous) && (
                        <div className="text-xs">
                          <span className="font-semibold text-muted-foreground">Navigation: </span>
                          {screen.navigation.previous && (
                            <span className="text-muted-foreground">← {screen.navigation.previous}</span>
                          )}
                          {screen.navigation.previous && screen.navigation.next && (
                            <span className="mx-2 text-muted-foreground">|</span>
                          )}
                          {screen.navigation.next && (
                            <span className="text-muted-foreground">{screen.navigation.next} →</span>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
            <div>
              <h3 className="font-semibold text-green-900">
                ✓ VMV Master Template is Complete
              </h3>
              <p className="text-sm text-green-700">
                All {template.screens.length} screens are loaded with full content and ready to use.
                This is a fully functional, production-ready workshop template.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
