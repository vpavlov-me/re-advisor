'use client';

import { useState, useMemo } from 'react';
import { EMAIL_CATALOG, getEmailsByPortal, getEmailsByCategory, EmailTemplate, EmailPortal, EmailCategory, EmailPriority } from '@/emails/catalog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Search, Mail, Users, Bell, DollarSign, Calendar, MessageSquare, FileCheck, BookOpen, Shield, Scale, Building, Heart, Settings, Eye, Smartphone } from 'lucide-react';

export default function EmailShowcasePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EmailCategory | 'all'>('all');
  const [selectedPriority, setSelectedPriority] = useState<EmailPriority | 'all'>('all');
  const [selectedEmail, setSelectedEmail] = useState<EmailTemplate | null>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

  // Get all emails
  const allEmails = Object.values(EMAIL_CATALOG);

  // Filter emails
  const filteredEmails = useMemo(() => {
    return allEmails.filter(email => {
      const matchesSearch = searchQuery === '' || 
        email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        email.keyContent.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || email.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || email.priority === selectedPriority;

      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [searchQuery, selectedCategory, selectedPriority, allEmails]);

  // Group by category
  const emailsByCategory = useMemo(() => {
    const grouped: Record<string, EmailTemplate[]> = {};
    filteredEmails.forEach(email => {
      if (!grouped[email.category]) {
        grouped[email.category] = [];
      }
      grouped[email.category].push(email);
    });
    return grouped;
  }, [filteredEmails]);

  // Category icons
  const categoryIcons: Record<string, any> = {
    authentication: Shield,
    subscription: DollarSign,
    advisors: Users,
    meetings: Calendar,
    communication: MessageSquare,
    decisions: FileCheck,
    tasks: FileCheck,
    education: BookOpen,
    succession: Users,
    conflict: Scale,
    constitution: FileCheck,
    assets: Building,
    philanthropy: Heart,
    system: Settings,
  };

  // Priority badge classes
  const priorityClasses: Record<EmailPriority, string> = {
    critical: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
    high: 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
    normal: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
    low: 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300',
  };

  // Stats
  const stats = {
    total: allEmails.length,
    family: getEmailsByPortal('family').length,
    advisor: getEmailsByPortal('advisor').length,
    critical: allEmails.filter(e => e.priority === 'critical').length,
    high: allEmails.filter(e => e.priority === 'high').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-3 mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
            <h1 className="text-4xl font-bold">ReAdvisor Email Templates</h1>
          </div>
          <p className="text-lg text-muted-foreground">
            Advisor email notification system with {stats.total} templates
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as any)}>
              <SelectTrigger>
                <SelectValue>
                  {selectedCategory === 'all' ? 'All Categories' : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="authentication">Authentication</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
                <SelectItem value="advisors">Advisors</SelectItem>
                <SelectItem value="meetings">Meetings</SelectItem>
                <SelectItem value="communication">Communication</SelectItem>
                <SelectItem value="decisions">Decisions</SelectItem>
                <SelectItem value="tasks">Tasks</SelectItem>
              </SelectContent>
            </Select>

            {/* Priority Filter */}
            <Select value={selectedPriority} onValueChange={(value) => setSelectedPriority(value as any)}>
              <SelectTrigger>
                <SelectValue>
                  {selectedPriority === 'all' ? 'All Priorities' : selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 text-sm text-muted-foreground">
            Showing {filteredEmails.length} of {stats.total} templates
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Email List */}
          <div className="lg:col-span-1 space-y-4">
            {Object.entries(emailsByCategory).map(([category, emails]) => {
              const Icon = categoryIcons[category] || Mail;
              
              return (
                <Card key={category}>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-lg capitalize">
                        {category.replace(/-/g, ' ')}
                      </CardTitle>
                      <Badge variant="secondary" className="ml-auto">
                        {emails.length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {emails.map(email => (
                      <Button
                        key={email.id}
                        variant={selectedEmail?.id === email.id ? 'default' : 'ghost'}
                        className="w-full justify-start text-left h-auto py-3"
                        onClick={() => setSelectedEmail(email)}
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-mono text-muted-foreground">
                              {email.id}
                            </span>
                            <Badge className={priorityClasses[email.priority]} variant="secondary">
                              {email.priority}
                            </Badge>
                          </div>
                          <div className="text-sm font-medium truncate">
                            {email.subject}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Email Preview */}
          <div className="lg:col-span-2">
            {selectedEmail ? (
              <Card className="sticky top-[120px] max-h-[calc(100vh-140px)] overflow-auto">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">{selectedEmail.id}</Badge>
                        <Badge className={priorityClasses[selectedEmail.priority]}>
                          {selectedEmail.priority}
                        </Badge>
                        <Badge variant="secondary">
                          {selectedEmail.portal === 'family' ? 'Family Portal' : 'Advisor Portal'}
                        </Badge>
                        {!selectedEmail.canOptOut && (
                          <Badge variant="outline" className="bg-orange-50">Required</Badge>
                        )}
                      </div>
                      <CardTitle className="text-2xl">{selectedEmail.subject}</CardTitle>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant={viewMode === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('desktop')}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Desktop
                      </Button>
                      <Button
                        variant={viewMode === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setViewMode('mobile')}
                      >
                        <Smartphone className="h-4 w-4 mr-2" />
                        Mobile
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="preview">
                    <TabsList className="w-full">
                      <TabsTrigger value="preview" className="flex-1">Preview</TabsTrigger>
                      <TabsTrigger value="details" className="flex-1">Details</TabsTrigger>
                    </TabsList>

                    <TabsContent value="preview" className="mt-4">
                      <div className={`border rounded-lg overflow-hidden bg-gray-50 ${
                        viewMode === 'mobile' ? 'max-w-[375px] mx-auto' : ''
                      }`}>
                        <iframe
                          src={`/emails/rendered/${selectedEmail.templateFile.replace('.hbs', '.html')}`}
                          className="w-full border-0"
                          style={{ height: '600px' }}
                          title={selectedEmail.subject}
                        />
                      </div>
                    </TabsContent>

                    <TabsContent value="details" className="mt-4 space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Trigger Event</h3>
                        <p className="text-sm text-muted-foreground">{selectedEmail.trigger}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Recipient</h3>
                        <p className="text-sm text-muted-foreground">{selectedEmail.recipient}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Key Content</h3>
                        <p className="text-sm text-muted-foreground">{selectedEmail.keyContent}</p>
                      </div>

                      {selectedEmail.cta && (
                        <div>
                          <h3 className="font-semibold mb-2">Call to Action</h3>
                          <Badge>{selectedEmail.cta}</Badge>
                        </div>
                      )}

                      <div>
                        <h3 className="font-semibold mb-2">Settings</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Can opt-out:</span>
                            <Badge variant={selectedEmail.canOptOut ? 'default' : 'secondary'}>
                              {selectedEmail.canOptOut ? 'Yes' : 'No'}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Category:</span>
                            <Badge variant="outline" className="capitalize">
                              {selectedEmail.category}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Template File</h3>
                        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {selectedEmail.templateFile}
                        </code>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-[600px] flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an email template to preview</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
