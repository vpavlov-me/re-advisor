// Phase 2 Questions - 3 multiple-choice questions for each section
// These questions help build detailed governance frameworks with predefined options

const PHASE2_QUESTIONS = {
    1: [ // Communication Patterns
        {
            id: 'comm-1',
            text: "How often should your family hold regular governance meetings?",
            type: "single",
            options: [
                "Weekly meetings with detailed agendas",
                "Monthly meetings (first Sunday/Saturday of each month)",
                "Quarterly meetings (4 times per year)",
                "Semi-annual meetings (twice per year)",
                "Annual meeting only"
            ]
        },
        {
            id: 'comm-2',
            text: "What communication channels should your family use for different topics?",
            type: "multiple",
            options: [
                "In-person meetings for major decisions and sensitive topics",
                "Video calls for routine updates and discussions",
                "Email for formal announcements and documentation",
                "Messaging apps (WhatsApp/Telegram) for quick coordination",
                "Family portal/platform for document sharing"
            ]
        },
        {
            id: 'comm-3',
            text: "What response time should be expected for important family communications?",
            type: "single",
            options: [
                "Immediate response within 24 hours for urgent matters",
                "48-72 hours for important decisions",
                "1 week for routine matters",
                "2 weeks for non-urgent topics",
                "Flexible - no strict deadlines"
            ]
        }
    ],
    2: [ // Decision-Making Process
        {
            id: 'decision-1',
            text: "What voting threshold should be required for major family decisions?",
            type: "single",
            options: [
                "Unanimous (100%) - everyone must agree",
                "Supermajority (75%) - three-quarters must agree",
                "Simple majority (51%) - more than half",
                "Weighted voting based on age/stake/role",
                "Consensus-based (no formal voting)"
            ]
        },
        {
            id: 'decision-2',
            text: "What process should be followed for major investment decisions? (Select all that apply)",
            type: "multiple",
            options: [
                "Written proposal with business case required",
                "Independent financial advisor review",
                "Dedicated family meeting to discuss",
                "Minimum 2-4 week review period before voting",
                "Quarterly progress reports after approval"
            ]
        },
        {
            id: 'decision-3',
            text: "Who should have voting rights in family governance decisions?",
            type: "single",
            options: [
                "All family members age 18+ (one person, one vote)",
                "All family members age 25+ (one person, one vote)",
                "Adults 25+ plus spouses after 5 years",
                "Only blood relatives (no in-laws)",
                "Weighted system (founders/elders have more votes)"
            ]
        }
    ],
    3: [ // Conflict Resolution
        {
            id: 'conflict-1',
            text: "What should be the first step when a family conflict arises?",
            type: "single",
            options: [
                "Direct private conversation between parties (within 7 days)",
                "Immediately involve a neutral family mediator",
                "Bring to next family council meeting for discussion",
                "Send written statement to family council",
                "Allow time to cool off (30 days) before addressing"
            ]
        },
        {
            id: 'conflict-2',
            text: "When should external professional mediators be involved?",
            type: "multiple",
            options: [
                "Financial disputes over $100K",
                "After 2 failed internal resolution attempts",
                "When conflict involves legal implications",
                "Emotional intensity prevents civil conversation",
                "Power imbalance makes internal mediation unfair"
            ]
        },
        {
            id: 'conflict-3',
            text: "What ground rules should apply to difficult family conversations?",
            type: "multiple",
            options: [
                "Confidentiality - what's discussed stays private",
                "No blame language - use 'I feel' statements",
                "Equal speaking time for all parties",
                "48-hour cool-off before escalating",
                "Professional facilitator present for sensitive topics"
            ]
        }
    ],
    4: [ // Financial Transparency
        {
            id: 'finance-1',
            text: "What financial information should be shared with all family members?",
            type: "multiple",
            options: [
                "Total family wealth and asset overview",
                "Investment performance and returns",
                "Major expenditures and transactions",
                "Annual budgets and financial plans",
                "Individual member distributions/allocations"
            ]
        },
        {
            id: 'finance-2',
            text: "How often should financial updates be provided to the family?",
            type: "single",
            options: [
                "Monthly financial reports and dashboards",
                "Quarterly reports with detailed breakdowns",
                "Semi-annual updates (twice per year)",
                "Annual comprehensive financial review",
                "On-demand access via family portal"
            ]
        },
        {
            id: 'finance-3',
            text: "What approval process should be used for major financial decisions?",
            type: "single",
            options: [
                "Multi-week formal process: proposal → advisor review → family discussion → vote",
                "Two-meeting rule: present in one meeting, vote in next",
                "Written circulation with 2-week comment period then vote",
                "Emergency committee can approve, report to family later",
                "Majority approval via email/digital voting"
            ]
        }
    ],
    5: [ // Roles & Responsibilities
        {
            id: 'roles-1',
            text: "What governance roles should exist in your family structure?",
            type: "multiple",
            options: [
                "Family Council Chair (leads meetings, sets agenda)",
                "Treasurer (oversees finances, reports on assets)",
                "Secretary (takes minutes, manages documentation)",
                "Conflict Resolution Coordinator",
                "Next Generation Representative"
            ]
        },
        {
            id: 'roles-2',
            text: "How should leadership roles be assigned?",
            type: "single",
            options: [
                "Democratic elections every 2-3 years",
                "Rotation system (everyone takes turns)",
                "Appointed by current family council",
                "Based on expertise and qualifications",
                "Volunteer basis with council approval"
            ]
        },
        {
            id: 'roles-3',
            text: "What are key responsibilities for all family members in governance?",
            type: "multiple",
            options: [
                "Attend at least 75% of family council meetings",
                "Review materials before meetings",
                "Vote on important decisions",
                "Participate in at least one committee",
                "Contribute to family education/development"
            ]
        }
    ],
    6: [ // Trust & Accountability
        {
            id: 'trust-1',
            text: "What accountability mechanisms should strengthen trust?",
            type: "multiple",
            options: [
                "Annual independent financial audits",
                "Documented decision logs with rationale",
                "Regular progress reports on commitments",
                "360-degree feedback for family leaders",
                "Transparent access to financial information"
            ]
        },
        {
            id: 'trust-2',
            text: "How should breaches of trust or broken commitments be handled?",
            type: "single",
            options: [
                "Private conversation with family council chair",
                "Formal review by family council with consequences",
                "Mediation process to repair relationship",
                "Temporary suspension from governance roles",
                "Flexible approach depending on severity"
            ]
        },
        {
            id: 'trust-3',
            text: "What should be visible to all family members to build confidence?",
            type: "multiple",
            options: [
                "Meeting minutes and decision records",
                "Financial statements and reports",
                "Advisor relationships and contracts",
                "Family constitution and governance policies",
                "Individual performance in family roles"
            ]
        }
    ],
    7: [ // Succession Readiness
        {
            id: 'succession-1',
            text: "What timeline should be used for leadership transition?",
            type: "single",
            options: [
                "5-7 year phased approach (assessment → development → co-leadership → transition)",
                "3-4 year accelerated program with intensive training",
                "10+ year long-term development starting early",
                "Immediate transition when current leader reaches specific age",
                "Flexible timeline based on readiness, not fixed dates"
            ]
        },
        {
            id: 'succession-2',
            text: "What development should the next generation receive? (Select all that apply)",
            type: "multiple",
            options: [
                "Financial literacy and investment education (starting age 18-25)",
                "Leadership and communication training (age 25-35)",
                "Family business/governance immersion (age 30-40)",
                "Executive coaching and mentorship programs",
                "Professional experience requirement (3-5 years outside family)"
            ]
        },
        {
            id: 'succession-3',
            text: "How should knowledge transfer from current to next generation occur?",
            type: "multiple",
            options: [
                "Digital documentation portal (policies, decisions, history)",
                "Quarterly mentorship sessions and shadowing",
                "Formal handover of advisor relationships",
                "Emergency succession protocols ('if I'm hit by a bus' plans)",
                "Annual readiness assessments and gap analysis"
            ]
        }
    ],
    8: [ // Business Involvement
        {
            id: 'business-1',
            text: "What qualifications should family members meet before joining the family business?",
            type: "multiple",
            options: [
                "Minimum education requirement (Bachelor's degree or equivalent)",
                "3-5 years professional experience outside family business",
                "Pass competency assessment for the role",
                "Approval by family council or board",
                "Complete family business orientation program"
            ]
        },
        {
            id: 'business-2',
            text: "How should family matters and business matters be separated?",
            type: "single",
            options: [
                "Separate meetings - family council vs. business board",
                "Different decision-making processes for each",
                "Professional advisors manage business, family oversees strategy",
                "Clear policies: no family disputes discussed in business context",
                "Complete separation - family doesn't interfere with business"
            ]
        },
        {
            id: 'business-3',
            text: "What governance structure should oversee the family business?",
            type: "single",
            options: [
                "Family board with all members having equal vote",
                "Professional board with some family members",
                "Independent board with family oversight/veto power",
                "Executive committee of qualified family members only",
                "Hybrid: family sets strategy, professionals execute"
            ]
        }
    ],
    9: [ // Education & Development
        {
            id: 'education-1',
            text: "What educational programs should the family provide?",
            type: "multiple",
            options: [
                "Financial literacy workshops (budgeting, investing, taxes)",
                "Leadership and communication training",
                "Entrepreneurship and business skills",
                "Family history and values education",
                "Governance and stewardship programs"
            ]
        },
        {
            id: 'education-2',
            text: "How much should the family invest annually in member development?",
            type: "single",
            options: [
                "$5K-10K per member per year",
                "$10K-25K per member per year",
                "$25K-50K per member per year",
                "$50K+ per member per year",
                "Unlimited - based on approved development plans"
            ]
        },
        {
            id: 'education-3',
            text: "What mentorship structure would benefit younger family members?",
            type: "single",
            options: [
                "Formal pairing: each junior member assigned 1-2 senior mentors",
                "Peer mentoring: cohorts support each other",
                "External professional mentors from outside family",
                "Rotating mentorship: work with different family members",
                "Informal organic relationships encouraged but not structured"
            ]
        }
    ],
    10: [ // Philanthropy Alignment
        {
            id: 'philanthropy-1',
            text: "What percentage of family wealth should be committed to philanthropy annually?",
            type: "single",
            options: [
                "Less than 1% - symbolic giving",
                "1-3% - moderate commitment",
                "3-5% - significant commitment",
                "5-10% - major philanthropic focus",
                "10%+ - philanthropy as core mission"
            ]
        },
        {
            id: 'philanthropy-2',
            text: "How should philanthropic priorities be decided?",
            type: "single",
            options: [
                "Democratic vote - all family members have equal say",
                "Committee researches and recommends, family approves",
                "Individual choice - each member directs their allocation",
                "Senior generation decides based on family values",
                "Professional advisor recommends based on impact analysis"
            ]
        },
        {
            id: 'philanthropy-3',
            text: "What should guide the family's philanthropic legacy?",
            type: "multiple",
            options: [
                "Focus on specific cause areas aligned with family values",
                "Support local community where family has roots",
                "Multi-generational impact (endowments, long-term grants)",
                "Hands-on involvement (board service, volunteering)",
                "Measurable impact and effectiveness (data-driven giving)"
            ]
        }
    ],
    11: [ // Wealth Philosophy
        {
            id: 'wealth-1',
            text: "What should be your family's primary approach to wealth?",
            type: "single",
            options: [
                "Preservation - protect principal for future generations",
                "Growth - aggressively build wealth over time",
                "Balanced - moderate growth with capital protection",
                "Distribution - share wealth with current generation generously",
                "Impact - prioritize social/environmental returns alongside financial"
            ]
        },
        {
            id: 'wealth-2',
            text: "How should wealth be balanced between generations?",
            type: "single",
            options: [
                "Future focus - 80% preserved, 20% current generation access",
                "Balanced approach - 50/50 between preservation and current use",
                "Current focus - 80% available now, 20% saved for future",
                "Performance-based - distributions tied to family wealth growth",
                "Needs-based - allocate based on individual circumstances"
            ]
        },
        {
            id: 'wealth-3',
            text: "What values should guide all financial decisions?",
            type: "multiple",
            options: [
                "Stewardship - we are caretakers for future generations",
                "Responsibility - wealth comes with obligation to society",
                "Transparency - open communication about money",
                "Education - teach financial literacy to all members",
                "Unity - wealth should bring family together, not divide"
            ]
        }
    ],
    12: [ // Family Unity & Values
        {
            id: 'values-1',
            text: "What are the most important values your family should live by? (Select top 5)",
            type: "multiple",
            options: [
                "Integrity and honesty in all dealings",
                "Respect for all family members and their choices",
                "Education and continuous learning",
                "Hard work and entrepreneurial spirit",
                "Generosity and giving back to society",
                "Family unity and loyalty",
                "Responsibility and accountability",
                "Innovation and adapting to change"
            ]
        },
        {
            id: 'values-2',
            text: "How should the family balance unity with individual autonomy?",
            type: "single",
            options: [
                "Strong unity - family decisions take priority over individual preferences",
                "Balanced - respect individual choices within family framework",
                "Individual focus - autonomy valued, family connection is secondary",
                "Flexible - depends on the situation and stakes involved",
                "Structured - clear boundaries defining when unity vs autonomy applies"
            ]
        },
        {
            id: 'values-3',
            text: "How should the family strengthen bonds and connection?",
            type: "multiple",
            options: [
                "Regular family gatherings (quarterly or annual reunions)",
                "Shared traditions and rituals (holidays, celebrations)",
                "Family trips or retreats together",
                "Collaborative projects (philanthropy, business, learning)",
                "Digital connection (family group chat, portal, newsletters)"
            ]
        }
    ]
};
