// Phase 2 Questions - 3 open-ended questions for each section
// These questions help build detailed governance frameworks

const PHASE2_QUESTIONS = {
    1: [ // Communication Patterns
        {
            id: 'comm-1',
            text: "Describe your ideal family meeting structure. How often should meetings occur? Who leads? What topics should be discussed?"
        },
        {
            id: 'comm-2',
            text: "What communication rules would help your family? (e.g., response times, channels for different types of topics)"
        },
        {
            id: 'comm-3',
            text: "How should important announcements be shared with the family? What process ensures everyone is informed?"
        }
    ],
    2: [ // Decision-Making Process
        {
            id: 'decision-1',
            text: "What decisions should require unanimous agreement vs majority vote? Give specific examples for each threshold."
        },
        {
            id: 'decision-2',
            text: "Describe the ideal process for making a major investment decision in your family. What steps should be followed?"
        },
        {
            id: 'decision-3',
            text: "Who should have voting rights in family decisions? Should votes be weighted differently or should everyone have equal say?"
        }
    ],
    3: [ // Conflict Resolution
        {
            id: 'conflict-1',
            text: "Describe a 3-step process for resolving family conflicts. What happens at each step? When does it escalate?"
        },
        {
            id: 'conflict-2',
            text: "When should external mediators be involved in family conflicts? What qualifications or experience should they have?"
        },
        {
            id: 'conflict-3',
            text: "How can your family create a 'safe space' for difficult conversations? What ground rules would help?"
        }
    ],
    4: [ // Financial Transparency
        {
            id: 'finance-1',
            text: "What financial information should be shared with all family members? What, if anything, should remain private?"
        },
        {
            id: 'finance-2',
            text: "How often should financial updates be provided to the family? What format works best (reports, meetings, dashboards)?"
        },
        {
            id: 'finance-3',
            text: "Describe your ideal process for major financial decisions like selling assets or making large investments."
        }
    ],
    5: [ // Roles & Responsibilities
        {
            id: 'roles-1',
            text: "What governance roles should exist in your family? (e.g., chair, treasurer, secretary) What are their responsibilities?"
        },
        {
            id: 'roles-2',
            text: "How should leadership roles be assigned? Through elections, appointments, rotation, or another method?"
        },
        {
            id: 'roles-3',
            text: "What are the key responsibilities that every family member should fulfill in family governance?"
        }
    ],
    6: [ // Trust & Accountability
        {
            id: 'trust-1',
            text: "What accountability mechanisms would strengthen trust in your family? How should commitments be tracked?"
        },
        {
            id: 'trust-2',
            text: "How should the family handle breaches of trust or broken commitments? What are appropriate consequences?"
        },
        {
            id: 'trust-3',
            text: "What transparency practices would build confidence among family members? What should be visible to everyone?"
        }
    ],
    7: [ // Succession Readiness
        {
            id: 'succession-1',
            text: "Describe your ideal timeline for leadership transition. What are the key milestones from now until succession is complete?"
        },
        {
            id: 'succession-2',
            text: "What training and development should the next generation receive? At what age should this begin?"
        },
        {
            id: 'succession-3',
            text: "How will you ensure smooth knowledge transfer from current to next generation? What systems or processes are needed?"
        }
    ],
    8: [ // Business Involvement
        {
            id: 'business-1',
            text: "What qualifications should family members meet before joining the family business? Education, experience, other?"
        },
        {
            id: 'business-2',
            text: "How should family matters and business matters be kept separate? What boundaries are important?"
        },
        {
            id: 'business-3',
            text: "Describe the ideal governance structure for family business oversight. What roles and reporting are needed?"
        }
    ],
    9: [ // Education & Development
        {
            id: 'education-1',
            text: "What educational programs should your family provide to members? (financial literacy, leadership, entrepreneurship, etc.)"
        },
        {
            id: 'education-2',
            text: "How much should the family invest annually in member development? How should this budget be allocated?"
        },
        {
            id: 'education-3',
            text: "What mentorship programs would benefit younger family members? How should mentors and mentees be paired?"
        }
    ],
    10: [ // Philanthropy Alignment
        {
            id: 'philanthropy-1',
            text: "What percentage of family wealth should be committed to philanthropy annually? Why this amount?"
        },
        {
            id: 'philanthropy-2',
            text: "How should philanthropic priorities be decided? Who has input in selecting causes and organizations?"
        },
        {
            id: 'philanthropy-3',
            text: "Describe your vision for the family's philanthropic legacy. What impact do you want to make over generations?"
        }
    ],
    11: [ // Wealth Philosophy
        {
            id: 'wealth-1',
            text: "What are your family's core beliefs about wealth creation, preservation, and distribution across generations?"
        },
        {
            id: 'wealth-2',
            text: "How should wealth be balanced between current generation needs and future generation preservation?"
        },
        {
            id: 'wealth-3',
            text: "What values and principles should guide all financial decisions in your family?"
        }
    ],
    12: [ // Family Unity & Values
        {
            id: 'values-1',
            text: "What are the 5 most important values your family should live by? Why are these values essential?"
        },
        {
            id: 'values-2',
            text: "How can the family strengthen bonds and unity while respecting individual autonomy and life choices?"
        },
        {
            id: 'values-3',
            text: "Describe your vision for family gatherings, traditions, and rituals. What brings your family together?"
        }
    ]
};
