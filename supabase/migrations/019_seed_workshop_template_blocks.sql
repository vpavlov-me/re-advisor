-- Seed Workshop Template Blocks Library
-- Pre-built modules that advisers can use in their workshops

-- Kickoff & Introduction Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('kickoff-welcome', 'Welcome & Kickoff', 'Standard workshop welcome and introduction', 'kickoff', 'text', 'introduction', '{
  "title": "Welcome to the Workshop",
  "content": "Thank you for participating in today''s workshop. We''ll be working together to...",
  "objectives": ["Objective 1", "Objective 2", "Objective 3"],
  "agenda": ["Introduction (10 min)", "Main Activity (60 min)", "Wrap-up (20 min)"]
}'::jsonb, 10, ARRAY['introduction', 'welcome']),

('ground-rules', 'Ground Rules', 'Establish workshop ground rules and expectations', 'kickoff', 'text', 'rules', '{
  "title": "Ground Rules",
  "rules": [
    "Respect all perspectives and opinions",
    "One person speaks at a time",
    "Be present and engaged",
    "Confidentiality - what''s said here stays here",
    "Focus on solutions, not blame",
    "Take breaks as needed"
  ],
  "customizable": true
}'::jsonb, 5, ARRAY['rules', 'guidelines']),

('objectives-setting', 'Workshop Objectives', 'Define and communicate workshop goals', 'kickoff', 'text', 'objectives', '{
  "title": "Workshop Objectives",
  "description": "By the end of this workshop, participants will:",
  "objectives": [],
  "successCriteria": []
}'::jsonb, 10, ARRAY['objectives', 'goals']);

-- Assessment & Evaluation Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('thomas-kilmann-conflict', 'Thomas-Kilmann Conflict Styles', 'Assess conflict handling styles', 'assessment', 'assessment', 'questionnaire', '{
  "title": "Conflict Handling Styles Assessment",
  "description": "Answer these questions to identify your preferred conflict resolution style",
  "questions": [
    {"id": "q1", "text": "When facing a conflict, I typically:", "type": "scale", "min": 1, "max": 5, "labels": ["Avoid it", "Confront it directly"]},
    {"id": "q2", "text": "I prefer to:", "type": "scale", "min": 1, "max": 5, "labels": ["Compromise", "Win the argument"]},
    {"id": "q3", "text": "In group disagreements, I:", "type": "scale", "min": 1, "max": 5, "labels": ["Stay silent", "Speak up"]}
  ],
  "scoring": {
    "competing": ["q2_high", "q3_high"],
    "collaborating": ["q1_high", "q3_high"],
    "compromising": ["q2_mid"],
    "avoiding": ["q1_low", "q3_low"],
    "accommodating": ["q2_low", "q1_mid"]
  }
}'::jsonb, 15, ARRAY['assessment', 'conflict', 'personality']),

('360-assessment', '360-Degree Assessment', 'Comprehensive stakeholder evaluation', 'assessment', 'assessment', '360-review', '{
  "title": "360-Degree Assessment",
  "description": "Evaluate from multiple perspectives",
  "categories": [
    {"name": "Leadership", "questions": ["Demonstrates vision", "Inspires others", "Makes tough decisions"]},
    {"name": "Communication", "questions": ["Listens actively", "Articulates clearly", "Provides feedback"]},
    {"name": "Collaboration", "questions": ["Works well with others", "Builds consensus", "Resolves conflicts"]}
  ],
  "scale": {"min": 1, "max": 5, "labels": ["Never", "Rarely", "Sometimes", "Often", "Always"]},
  "allowAnonymous": true
}'::jsonb, 30, ARRAY['assessment', '360', 'evaluation']),

('values-assessment', 'Values Assessment', 'Identify personal and family values', 'assessment', 'exercise', 'values-selection', '{
  "title": "Values Assessment",
  "description": "Select your top 5 values from the list below",
  "valuesList": [
    {"name": "Integrity", "description": "Honesty and strong moral principles", "category": "core"},
    {"name": "Innovation", "description": "Creativity and forward thinking", "category": "business"},
    {"name": "Family Unity", "description": "Togetherness and support", "category": "family"},
    {"name": "Excellence", "description": "Pursuit of the highest standards", "category": "business"}
  ],
  "minSelection": 3,
  "maxSelection": 5,
  "allowCustom": true
}'::jsonb, 20, ARRAY['values', 'assessment', 'discovery']);

-- Exercise & Activity Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('raci-matrix', 'RACI Matrix', 'Define roles and responsibilities', 'exercise', 'exercise', 'raci-matrix', '{
  "title": "RACI Matrix - Decision Rights",
  "description": "Define who is Responsible, Accountable, Consulted, and Informed for key decisions",
  "decisions": [
    "Strategic direction",
    "Major investments (>$1M)",
    "Hiring senior leadership",
    "Dividend distribution",
    "Governance policies"
  ],
  "roles": [
    "Board Chair",
    "CEO",
    "Family Council",
    "Shareholders",
    "External Advisers"
  ],
  "definitions": {
    "R": "Responsible - Does the work",
    "A": "Accountable - Ultimate authority",
    "C": "Consulted - Provides input",
    "I": "Informed - Kept updated"
  }
}'::jsonb, 30, ARRAY['governance', 'raci', 'decisions']),

('three-circles', 'Three Circles Model', 'Visualize Family, Ownership, and Business overlap', 'exercise', 'visualization', 'three-circles', '{
  "title": "Three Circles Model",
  "description": "Map family members into the three overlapping circles",
  "circles": ["Family", "Ownership", "Business"],
  "instructions": "Drag and drop family members into the appropriate circle segments",
  "showIntersections": true,
  "allowMultiple": true
}'::jsonb, 20, ARRAY['model', 'visualization', 'family-business']),

('stakeholder-mapping', 'Stakeholder Map', 'Identify and analyze key stakeholders', 'exercise', 'visualization', 'stakeholder-map', '{
  "title": "Stakeholder Analysis",
  "description": "Map stakeholders by influence and interest",
  "axes": {
    "x": {"label": "Interest", "min": "Low", "max": "High"},
    "y": {"label": "Influence", "min": "Low", "max": "High"}
  },
  "quadrants": {
    "topRight": {"label": "Key Players", "strategy": "Engage closely"},
    "topLeft": {"label": "Keep Satisfied", "strategy": "High influence, low interest"},
    "bottomRight": {"label": "Keep Informed", "strategy": "High interest, low influence"},
    "bottomLeft": {"label": "Monitor", "strategy": "Minimal effort"}
  }
}'::jsonb, 25, ARRAY['stakeholders', 'mapping', 'analysis']),

('force-field-analysis', 'Force Field Analysis', 'Analyze driving and restraining forces', 'exercise', 'visualization', 'force-field', '{
  "title": "Force Field Analysis",
  "description": "Identify forces for and against the proposed change",
  "question": "What forces are driving or resisting this change?",
  "drivingForces": [],
  "restrainingForces": [],
  "instructions": "List factors that support (driving) or resist (restraining) the change",
  "scoreForces": true,
  "calculateBalance": true
}'::jsonb, 30, ARRAY['change', 'analysis', 'strategy']),

('swot-analysis', 'SWOT Analysis', 'Analyze Strengths, Weaknesses, Opportunities, Threats', 'exercise', 'exercise', 'swot', '{
  "title": "SWOT Analysis",
  "description": "Analyze internal strengths/weaknesses and external opportunities/threats",
  "context": "Family Business",
  "quadrants": {
    "strengths": {"label": "Strengths", "prompt": "What advantages do we have?"},
    "weaknesses": {"label": "Weaknesses", "prompt": "What could we improve?"},
    "opportunities": {"label": "Opportunities", "prompt": "What favorable external factors exist?"},
    "threats": {"label": "Threats", "prompt": "What external challenges do we face?"}
  },
  "collaborative": true
}'::jsonb, 30, ARRAY['swot', 'strategy', 'analysis']),

('brainstorming-board', 'Brainstorming Board', 'Collaborative idea generation', 'exercise', 'discussion', 'brainstorm', '{
  "title": "Brainstorming Session",
  "prompt": "What ideas do you have?",
  "rules": [
    "No criticism during brainstorming",
    "Quantity over quality",
    "Build on others'' ideas",
    "Wild ideas welcome"
  ],
  "format": "sticky-notes",
  "allowVoting": true,
  "allowGrouping": true,
  "categories": []
}'::jsonb, 30, ARRAY['brainstorm', 'ideation', 'creative']);

-- Discussion & Dialogue Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('open-discussion', 'Open Discussion', 'Facilitated group discussion', 'discussion', 'discussion', 'group-discussion', '{
  "title": "Group Discussion",
  "questions": [
    "What are your thoughts on this topic?",
    "How does this affect our family?",
    "What actions should we take?"
  ],
  "format": "round-robin",
  "timePerPerson": 3,
  "allowFollowUp": true,
  "aiModeration": false
}'::jsonb, 30, ARRAY['discussion', 'dialogue', 'group']),

('ai-facilitated-discussion', 'AI-Facilitated Discussion', 'AI-guided conversation on key topics', 'discussion', 'discussion', 'ai-facilitated', '{
  "title": "AI-Facilitated Discussion",
  "topic": "Discussion topic",
  "objectives": [],
  "aiPrompt": "You are facilitating a family discussion about [topic]. Your role is to ask probing questions, ensure everyone participates, and help the group reach consensus. Be supportive and neutral.",
  "aiStyle": "supportive",
  "keyTopics": [],
  "interventionTriggers": ["silence > 60s", "one person dominating", "conflict escalating"],
  "guidingQuestions": []
}'::jsonb, 45, ARRAY['ai', 'discussion', 'facilitation']),

('conflict-protocol', 'Conflict Escalation Protocol', 'Define 4-level conflict resolution process', 'discussion', 'exercise', 'conflict-protocol', '{
  "title": "Conflict Escalation Protocol",
  "description": "Establish a clear process for resolving disagreements",
  "levels": [
    {
      "level": 1,
      "name": "Direct Conversation",
      "description": "Parties speak directly to resolve",
      "timeframe": "Within 7 days",
      "who": "Involved parties only"
    },
    {
      "level": 2,
      "name": "Mediated Discussion",
      "description": "Neutral family member facilitates",
      "timeframe": "Within 14 days",
      "who": "Parties + mediator"
    },
    {
      "level": 3,
      "name": "Family Council Review",
      "description": "Issue brought to Family Council",
      "timeframe": "Next scheduled meeting",
      "who": "Family Council"
    },
    {
      "level": 4,
      "name": "External Mediation",
      "description": "Professional mediator engaged",
      "timeframe": "Within 30 days",
      "who": "Parties + professional mediator"
    }
  ],
  "customizable": true
}'::jsonb, 25, ARRAY['conflict', 'protocol', 'governance']);

-- Governance Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('governance-bodies-setup', 'Governance Bodies Setup', 'Define family governance structure', 'governance', 'exercise', 'governance-structure', '{
  "title": "Governance Structure Design",
  "description": "Define the governance bodies for your family",
  "bodies": [
    {
      "name": "Family Council",
      "purpose": "Voice for all family members, oversees family matters",
      "composition": "All adult family members",
      "meetingFrequency": "Quarterly",
      "decisionRights": ["Family values", "Family philanthropy", "Family education"]
    },
    {
      "name": "Board of Directors",
      "purpose": "Oversees business strategy and performance",
      "composition": "Mix of family and independent directors",
      "meetingFrequency": "Monthly",
      "decisionRights": ["Business strategy", "CEO oversight", "Major investments"]
    },
    {
      "name": "Shareholders Council",
      "purpose": "Represents ownership interests",
      "composition": "All shareholders or their representatives",
      "meetingFrequency": "Annually",
      "decisionRights": ["Dividend policy", "Capital structure", "Board elections"]
    }
  ],
  "allowCustomBodies": true
}'::jsonb, 40, ARRAY['governance', 'structure', 'bodies']),

('decision-matrix', 'Decision Matrix', 'Create decision-making framework', 'governance', 'exercise', 'decision-matrix', '{
  "title": "Decision-Making Matrix",
  "description": "Define who makes which decisions and how",
  "decisionTypes": [
    "Strategic direction",
    "Financial (by amount)",
    "Operational",
    "Governance changes",
    "Family matters"
  ],
  "thresholds": [
    {"type": "Financial", "ranges": ["<$50K", "$50K-$500K", "$500K-$5M", ">$5M"]},
    {"type": "Risk", "levels": ["Low", "Medium", "High", "Critical"]}
  ],
  "decisionMakers": [],
  "approvalProcess": {
    "requiresConsensus": [],
    "requiresMajority": [],
    "requiresSupermajority": []
  }
}'::jsonb, 35, ARRAY['governance', 'decisions', 'matrix']);

-- Mission, Vision, Values Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('mission-crafting', 'Mission Statement Crafting', 'Collaborative mission statement development', 'strategy', 'exercise', 'mission-draft', '{
  "title": "Mission Statement Workshop",
  "description": "Craft your family mission statement together",
  "prompts": {
    "purpose": "Why does our family exist as a unit?",
    "audience": "Who do we serve? (family, community, employees, etc.)",
    "approach": "How do we operate? What makes us unique?"
  },
  "examples": [
    "To preserve our family legacy while creating opportunities for future generations",
    "To build and sustain businesses that serve our community and provide for our family"
  ],
  "aiAssist": true,
  "collaborativeEditing": true
}'::jsonb, 30, ARRAY['mission', 'strategy', 'values']),

('vision-creation', 'Long-term Vision Creation', 'Define 20-year vision across dimensions', 'strategy', 'exercise', 'vision-matrix', '{
  "title": "20-Year Vision",
  "description": "Define what success looks like 20 years from now",
  "dimensions": [
    {
      "name": "Family",
      "icon": "👨‍👩‍👧‍👦",
      "prompts": {
        "goalState": "What does family unity and harmony look like?",
        "nonGoals": "What do we want to avoid?",
        "firstMilestone": "What''s the first major milestone?",
        "keyRisk": "What could derail this vision?",
        "riskResponse": "How will we mitigate this risk?"
      }
    },
    {
      "name": "Business",
      "icon": "🏢",
      "prompts": {
        "goalState": "What does business success look like?",
        "nonGoals": "What are we not trying to achieve?",
        "firstMilestone": "What''s the first major milestone?",
        "keyRisk": "What could derail this vision?",
        "riskResponse": "How will we mitigate this risk?"
      }
    },
    {
      "name": "Wealth",
      "icon": "💰",
      "prompts": {
        "goalState": "What does financial sustainability look like?",
        "nonGoals": "What financial goals are not important?",
        "firstMilestone": "What''s the first major milestone?",
        "keyRisk": "What could derail this vision?",
        "riskResponse": "How will we mitigate this risk?"
      }
    }
  ]
}'::jsonb, 45, ARRAY['vision', 'strategy', 'long-term']),

('values-matrix-definition', 'Values Matrix Definition', 'Define values with behaviors and metrics', 'strategy', 'exercise', 'values-matrix', '{
  "title": "Values Definition Matrix",
  "description": "For each value, define: what it means, behaviors that embody it, counter-behaviors, and success metrics",
  "values": [],
  "template": {
    "definition": "What does this value mean to us?",
    "weAlways": ["List 3-5 behaviors that embody this value"],
    "weNever": ["List 3-5 behaviors that violate this value"],
    "metrics": ["How will we measure if we''re living this value?"]
  },
  "examples": {
    "Integrity": {
      "definition": "We are honest and transparent in all our dealings",
      "weAlways": ["Tell the truth even when difficult", "Honor our commitments", "Admit mistakes openly"],
      "weNever": ["Deceive stakeholders", "Hide important information", "Blame others for our failures"],
      "metrics": ["Zero ethics violations", "100% disclosure compliance", "Stakeholder trust surveys"]
    }
  }
}'::jsonb, 40, ARRAY['values', 'definition', 'behaviors']);

-- Succession Planning Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('succession-readiness', 'Succession Readiness Assessment', 'Evaluate candidates for leadership roles', 'succession', 'assessment', '9-box-matrix', '{
  "title": "Leadership Succession Assessment",
  "description": "Assess candidates on Performance and Potential",
  "axes": {
    "x": {"label": "Performance", "levels": ["Low", "Moderate", "High"]},
    "y": {"label": "Potential", "levels": ["Low", "Moderate", "High"]}
  },
  "boxes": {
    "topRight": {"label": "High Potential High Performer", "action": "Fast track"},
    "topCenter": {"label": "High Potential Moderate Performer", "action": "Develop performance"},
    "middleRight": {"label": "Moderate Potential High Performer", "action": "Retain & reward"},
    "center": {"label": "Core Contributors", "action": "Monitor & develop"}
  },
  "candidates": [],
  "criteria": {
    "performance": ["Results delivery", "Consistency", "Quality"],
    "potential": ["Learning agility", "Leadership capability", "Strategic thinking"]
  }
}'::jsonb, 30, ARRAY['succession', '9-box', 'talent']),

('succession-timeline', 'Succession Timeline', 'Create phased transition plan', 'succession', 'visualization', 'timeline', '{
  "title": "Succession Transition Timeline",
  "description": "Map out the succession process over time",
  "phases": [
    {"name": "Preparation", "duration": "12 months", "milestones": ["Identify candidates", "Assessment", "Development plan"]},
    {"name": "Transition", "duration": "6 months", "milestones": ["Knowledge transfer", "Shadowing", "Gradual handoff"]},
    {"name": "Handover", "duration": "3 months", "milestones": ["Full authority transfer", "Successor takes lead", "Predecessor advisory role"]},
    {"name": "Post-transition", "duration": "12 months", "milestones": ["Monitor progress", "Provide coaching", "Evaluate success"]}
  ],
  "contingencyPlan": "What if timeline needs to accelerate?",
  "supportStructure": "What support will successor receive?"
}'::jsonb, 25, ARRAY['succession', 'timeline', 'planning']);

-- Wrap-up & Follow-up Blocks
INSERT INTO workshop_template_blocks (block_key, name, description, category, screen_type, content_type, default_content, estimated_duration, tags) VALUES
('action-plan', 'Action Plan Creation', 'Define next steps and accountability', 'wrapup', 'exercise', 'action-plan', '{
  "title": "Action Plan",
  "description": "Define concrete next steps with owners and deadlines",
  "template": {
    "action": "What needs to be done?",
    "owner": "Who is responsible?",
    "deadline": "By when?",
    "resources": "What support is needed?",
    "successCriteria": "How will we know it''s done?"
  },
  "actions": [],
  "followUpMeeting": "When will we review progress?"
}'::jsonb, 20, ARRAY['action-plan', 'next-steps', 'accountability']),

('key-takeaways', 'Key Takeaways', 'Summarize workshop insights', 'wrapup', 'text', 'summary', '{
  "title": "Key Takeaways",
  "description": "What did we learn and decide today?",
  "sections": {
    "decisions": "Key decisions made",
    "insights": "Important insights gained",
    "agreements": "Agreements reached",
    "openItems": "Items requiring further discussion"
  },
  "allowParticipantInput": true,
  "generateAISummary": true
}'::jsonb, 15, ARRAY['summary', 'takeaways', 'wrapup']),

('feedback-survey', 'Workshop Feedback', 'Collect participant feedback', 'wrapup', 'assessment', 'feedback', '{
  "title": "Workshop Feedback",
  "description": "Help us improve future workshops",
  "questions": [
    {"id": "q1", "text": "The workshop met its objectives", "type": "scale", "min": 1, "max": 5, "labels": ["Strongly Disagree", "Strongly Agree"]},
    {"id": "q2", "text": "The facilitation was effective", "type": "scale", "min": 1, "max": 5},
    {"id": "q3", "text": "I felt heard and valued", "type": "scale", "min": 1, "max": 5},
    {"id": "q4", "text": "What worked well?", "type": "open"},
    {"id": "q5", "text": "What could be improved?", "type": "open"}
  ],
  "anonymous": true
}'::jsonb, 10, ARRAY['feedback', 'evaluation', 'survey']),

('next-steps-reminder', 'Next Steps & Reminders', 'Schedule follow-up and set reminders', 'wrapup', 'text', 'next-steps', '{
  "title": "Next Steps",
  "description": "Here''s what happens next",
  "followUpActions": [],
  "nextMeeting": {
    "date": null,
    "agenda": []
  },
  "resources": [
    {"name": "Workshop Summary (PDF)", "url": null},
    {"name": "Action Items Tracker", "url": null}
  ],
  "reminders": [
    {"when": "1 week", "what": "Review action items"},
    {"when": "1 month", "what": "Progress check-in"}
  ]
}'::jsonb, 10, ARRAY['next-steps', 'follow-up', 'reminders']);

-- Update usage_count to 0 for all (will be incremented as they're used)
UPDATE workshop_template_blocks SET usage_count = 0;

-- Add some tags indices for better searchability
CREATE INDEX idx_workshop_blocks_tags ON workshop_template_blocks USING GIN(tags);
