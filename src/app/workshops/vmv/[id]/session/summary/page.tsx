"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import {
  Heart,
  Target,
  Eye,
  CheckCircle2,
  Download,
  Share2,
  Calendar,
  Mail,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Award,
  Shield,
  FileText,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface Value {
  name: string;
  icon: string;
  definition: string;
}

export default function WorkshopSummaryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [isExporting, setIsExporting] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);

  // Mock data - would come from workshop state/database
  const workshopData = {
    completedAt: new Date().toISOString(),
    duration: "2 hours 15 minutes",
    participantCount: 12,
    values: [
      {
        name: "Integrity & Honesty",
        icon: "🤝",
        definition: "We act with honesty and maintain strong moral principles in all our business and family dealings, even when it's difficult."
      },
      {
        name: "Family Unity",
        icon: "👨‍👩‍👧‍👦",
        definition: "We prioritize staying connected across generations, supporting each other through challenges, and making decisions collaboratively."
      },
      {
        name: "Innovation",
        icon: "💡",
        definition: "We embrace new ideas, encourage calculated risk-taking, and continuously seek ways to improve our businesses and family practices."
      },
      {
        name: "Education",
        icon: "🎓",
        definition: "We commit to lifelong learning, invest in the development of all family members, and share knowledge generously."
      },
      {
        name: "Service to Society",
        icon: "🌍",
        definition: "We contribute to the greater good through philanthropy, ethical business practices, and active engagement in our communities."
      }
    ],
    mission: {
      full: "We exist to create long-term prosperity and unity across generations for members of our family, our employees, and the communities we serve, through strategic leadership, collaborative governance, and responsible stewardship, guided by our values of integrity, family unity, innovation, and education.",
      short: "Creating generational prosperity through integrity, unity, and service."
    },
    vision: {
      family: {
        goal: "A united family where every generation feels connected, valued, and prepared to contribute to our shared legacy while maintaining individual autonomy.",
        milestone: "Establish quarterly family councils with 80%+ attendance and launch mentorship program."
      },
      business: {
        goal: "A diversified portfolio of sustainable businesses generating consistent returns while providing meaningful opportunities.",
        milestone: "Complete strategic review of all business units and identify 2-3 new growth opportunities."
      },
      capital: {
        goal: "Sustainable wealth preservation and growth through diversified investments, providing financial security for future generations.",
        milestone: "Establish family investment committee and complete comprehensive portfolio review."
      },
      social: {
        goal: "Recognized leaders in education and community development, making measurable impact through strategic philanthropy.",
        milestone: "Select 2-3 focus areas and establish family foundation with clear mission."
      },
      reputation: {
        goal: "Known as a family of integrity, innovation, and positive impact - trusted by stakeholders.",
        milestone: "Develop family communications guidelines and appoint reputation committee."
      },
      risk: {
        goal: "Comprehensive risk management framework protecting assets, relationships, and legacy.",
        milestone: "Complete family risk assessment and establish risk committee with quarterly reviews."
      }
    }
  };

  const visionDimensions = [
    { key: "family", label: "Family", icon: Users, color: "text-orange-600" },
    { key: "business", label: "Business", icon: TrendingUp, color: "text-blue-600" },
    { key: "capital", label: "Capital", icon: DollarSign, color: "text-green-600" },
    { key: "social", label: "Social Impact", icon: Globe, color: "text-purple-600" },
    { key: "reputation", label: "Reputation", icon: Award, color: "text-yellow-600" },
    { key: "risk", label: "Risk Management", icon: Shield, color: "text-red-600" }
  ];

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      // TODO: Implement PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("PDF exported successfully!");
    } catch (error) {
      toast.error("Failed to export PDF");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareWithFamily = () => {
    // TODO: Implement sharing functionality
    toast.success("Workshop results shared with all participants!");
    setShareDialogOpen(false);
  };

  const handleScheduleReview = () => {
    // TODO: Navigate to scheduling or create calendar event
    toast.success("Review meeting scheduled!");
  };

  const handleBackToDashboard = () => {
    router.push("/workshops/vmv");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-semibold text-lg">Workshop Completed!</h1>
              <p className="text-sm text-muted-foreground">Values, Mission & Vision</p>
            </div>
          </div>
          <Badge variant="default" className="bg-green-600">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            All Stages Complete
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Celebration Message */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-4">
              <CheckCircle2 className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold">Congratulations!</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              You've successfully completed the Values, Mission & Vision Workshop.
              Your family has created a powerful foundation for making aligned decisions and building a lasting legacy.
            </p>
          </div>

          {/* Workshop Stats */}
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold">{workshopData.participantCount}</div>
                  <div className="text-sm text-muted-foreground">Participants</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mb-3">
                    <Calendar className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="text-3xl font-bold">{workshopData.duration}</div>
                  <div className="text-sm text-muted-foreground">Duration</div>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mb-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-3xl font-bold">5/5</div>
                  <div className="text-sm text-muted-foreground">Stages Completed</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Core Values */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-primary" />
                Your Core Values
              </CardTitle>
              <CardDescription>
                The 5 values that will guide your family's decisions and behaviors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workshopData.values.map((value, index) => (
                  <div key={index}>
                    <div className="flex items-start gap-4 p-4 rounded-lg bg-gradient-to-r from-orange-50 to-transparent">
                      <span className="text-3xl">{value.icon}</span>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{value.name}</h3>
                        <p className="text-sm text-muted-foreground">{value.definition}</p>
                      </div>
                    </div>
                    {index < workshopData.values.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mission Statement */}
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-orange-50 to-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-6 w-6 text-primary" />
                Your Mission Statement
              </CardTitle>
              <CardDescription>
                Why your family exists and what you aim to achieve
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-lg bg-white border-2 border-primary/20">
                <p className="text-xl leading-relaxed text-center font-medium mb-6">
                  "{workshopData.mission.full}"
                </p>
                <Separator className="my-6" />
                <div>
                  <p className="text-sm text-muted-foreground mb-2 text-center">Short Version</p>
                  <p className="text-lg text-center text-primary font-semibold">
                    "{workshopData.mission.short}"
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vision Canvas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Your 20-Year Vision
              </CardTitle>
              <CardDescription>
                Aspirational goals and first milestones across 6 key dimensions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-6">
                  {visionDimensions.map((dimension, index) => {
                    const Icon = dimension.icon;
                    const data = workshopData.vision[dimension.key as keyof typeof workshopData.vision];
                    return (
                      <div key={dimension.key}>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-5 w-5 ${dimension.color}`} />
                            <h3 className="font-semibold text-lg">{dimension.label}</h3>
                          </div>
                          <div className="pl-7 space-y-2">
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">Long-term Goal:</p>
                              <p className="text-sm">{data.goal}</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium text-muted-foreground mb-1">First Milestone:</p>
                              <p className="text-sm italic text-primary">{data.milestone}</p>
                            </div>
                          </div>
                        </div>
                        {index < visionDimensions.length - 1 && <Separator className="mt-6" />}
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="border-2 border-blue-200 bg-blue-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowRight className="h-6 w-6 text-blue-600" />
                Recommended Next Steps
              </CardTitle>
              <CardDescription>
                Actions to bring your values, mission, and vision to life
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium">Share with all family members</p>
                    <p className="text-sm text-muted-foreground">Ensure everyone has access to the final document and understands the values, mission, and vision.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium">Create an implementation plan</p>
                    <p className="text-sm text-muted-foreground">Develop specific action plans for each first milestone with owners and timelines.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium">Integrate into decision-making</p>
                    <p className="text-sm text-muted-foreground">Use values and mission as criteria for all major family and business decisions.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    4
                  </div>
                  <div>
                    <p className="font-medium">Schedule annual review</p>
                    <p className="text-sm text-muted-foreground">Review progress toward vision and update milestones annually with all stakeholders.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 font-bold text-sm">
                    5
                  </div>
                  <div>
                    <p className="font-medium">Create educational materials</p>
                    <p className="text-sm text-muted-foreground">Develop materials to onboard new family members and reinforce values with next generation.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={handleExportPDF}
              disabled={isExporting}
              size="lg"
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
            >
              <Download className="h-6 w-6" />
              <span className="font-semibold">Export to PDF</span>
              <span className="text-xs text-muted-foreground">
                {isExporting ? "Generating..." : "Download full report"}
              </span>
            </Button>

            <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-auto py-4 flex flex-col items-center gap-2"
                >
                  <Share2 className="h-6 w-6" />
                  <span className="font-semibold">Share Results</span>
                  <span className="text-xs text-muted-foreground">Email to participants</span>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share Workshop Results</DialogTitle>
                  <DialogDescription>
                    Send the complete VMV workshop results to all participants via email
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Alert>
                    <Mail className="h-4 w-4" />
                    <AlertDescription>
                      All {workshopData.participantCount} participants will receive:
                      <ul className="list-disc list-inside mt-2 space-y-1 text-sm">
                        <li>Complete values definitions</li>
                        <li>Final mission statement</li>
                        <li>Vision canvas with milestones</li>
                        <li>Recommended next steps</li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                  <div className="flex gap-2">
                    <Button onClick={handleShareWithFamily} className="flex-1">
                      Send to All Participants
                    </Button>
                    <Button variant="outline" onClick={() => setShareDialogOpen(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              onClick={handleScheduleReview}
              size="lg"
              variant="outline"
              className="h-auto py-4 flex flex-col items-center gap-2"
            >
              <Calendar className="h-6 w-6" />
              <span className="font-semibold">Schedule Review</span>
              <span className="text-xs text-muted-foreground">Plan next meeting</span>
            </Button>
          </div>

          {/* Footer Actions */}
          <div className="flex justify-center pt-6">
            <Button
              onClick={handleBackToDashboard}
              size="lg"
              className="px-12"
            >
              <FileText className="h-5 w-5 mr-2" />
              Back to Workshop Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
