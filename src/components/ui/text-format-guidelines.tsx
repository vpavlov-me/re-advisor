"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, XCircle, Lightbulb, Info } from "lucide-react";
import type { TextFormatGuidelines } from "@/types/workshop-constructor";

interface TextFormatGuidelinesProps {
  guidelines: TextFormatGuidelines;
  className?: string;
  compact?: boolean;
}

export function TextFormatGuidelinesComponent({
  guidelines,
  className = "",
  compact = false,
}: TextFormatGuidelinesProps) {
  const { tone, style, bestPractices, examples } = guidelines;

  if (compact) {
    return (
      <Alert className={className}>
        <Lightbulb className="h-4 w-4" />
        <AlertTitle>Writing Tips</AlertTitle>
        <AlertDescription>
          <div className="space-y-2 mt-2">
            {tone && (
              <div className="text-sm">
                <span className="font-medium">Tone:</span>{" "}
                <Badge variant="secondary" className="ml-1">
                  {tone}
                </Badge>
              </div>
            )}
            {style && (
              <div className="text-sm">
                <span className="font-medium">Style:</span>{" "}
                <Badge variant="secondary" className="ml-1">
                  {style}
                </Badge>
              </div>
            )}
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Info className="h-5 w-5" />
          Writing Guidelines
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tone and Style */}
        {(tone || style) && (
          <div className="flex gap-4 flex-wrap">
            {tone && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Tone:
                </span>{" "}
                <Badge variant="secondary" className="ml-1">
                  {tone}
                </Badge>
              </div>
            )}
            {style && (
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Style:
                </span>{" "}
                <Badge variant="secondary" className="ml-1">
                  {style}
                </Badge>
              </div>
            )}
          </div>
        )}

        {/* Best Practices */}
        {bestPractices && bestPractices.length > 0 && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                Best Practices
              </h4>
              <ul className="space-y-1.5">
                {bestPractices.map((practice, index) => (
                  <li
                    key={index}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="text-yellow-500 mt-0.5">•</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}

        {/* Examples */}
        {examples && (examples.good?.length > 0 || examples.bad?.length > 0) && (
          <>
            <Separator />
            <div className="space-y-3">
              <h4 className="font-medium">Examples</h4>

              {examples.good && examples.good.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-green-600 dark:text-green-500">
                    <CheckCircle2 className="h-4 w-4" />
                    Good Examples
                  </div>
                  {examples.good.map((example, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 rounded-md bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              )}

              {examples.bad && examples.bad.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-500">
                    <XCircle className="h-4 w-4" />
                    Avoid These
                  </div>
                  {examples.bad.map((example, index) => (
                    <div
                      key={index}
                      className="text-sm p-3 rounded-md bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900"
                    >
                      {example}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
