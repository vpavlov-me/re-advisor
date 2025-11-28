// Demo data - pre-filled responses for testing and demonstration
// Can be loaded via "Load Demo Data" button on welcome screen

const DEMO_DATA = {
    // Phase 1 responses: 12 sections × 5 questions = 60 answers
    // Values are indices (0-4) representing which option was selected
    phase1: [
        [1, 1, 2, 2, 1], // Section 1: Communication - low scores
        [0, 1, 1, 0, 2], // Section 2: Decision-Making - low scores
        [0, 2, 1, 1, 1], // Section 3: Conflict Resolution - low scores (priority area)
        [1, 1, 2, 1, 2], // Section 4: Financial Transparency - medium scores
        [2, 2, 3, 1, 3], // Section 5: Roles & Responsibilities - medium scores
        [2, 1, 2, 2, 2], // Section 6: Trust & Accountability - medium scores
        [1, 1, 1, 1, 2], // Section 7: Succession - low scores (priority area)
        [3, 2, 2, 3, 2], // Section 8: Business - medium scores
        [2, 2, 3, 2, 3], // Section 9: Education - medium scores
        [2, 3, 2, 2, 3], // Section 10: Philanthropy - medium scores
        [2, 2, 2, 1, 3], // Section 11: Wealth Philosophy - medium scores
        [3, 2, 3, 3, 3]  // Section 12: Family Unity - high scores
    ],

    // Phase 2 responses: Multiple choice selections for priority areas
    // Format: For single choice - index of selected option (0-4)
    //         For multiple choice - array of indices of selected options [0,2,4]
    phase2: {
        1: { // Communication Patterns
            'comm-1': 1,           // Monthly meetings
            'comm-2': [0, 1, 2, 4], // In-person, video, email, portal
            'comm-3': 1            // 48-72 hours for important decisions
        },

        2: { // Decision-Making Process
            'decision-1': 1,       // Supermajority (75%)
            'decision-2': [0, 1, 2, 3], // Written proposal, advisor review, meeting, review period
            'decision-3': 2        // Adults 25+ plus spouses after 5 years
        },

        3: { // Conflict Resolution
            'conflict-1': 0,       // Direct private conversation (within 7 days)
            'conflict-2': [0, 1, 2, 3], // Financial disputes, failed attempts, legal implications, emotional intensity
            'conflict-3': [0, 1, 2, 3]  // Confidentiality, no blame, equal time, cool-off period
        },

        4: { // Financial Transparency
            'finance-1': [0, 1, 2, 3], // Wealth overview, performance, major transactions, budgets
            'finance-2': 1,        // Quarterly reports
            'finance-3': 0         // Multi-week formal process
        },

        5: { // Roles & Responsibilities
            'roles-1': [0, 1, 2, 4], // Chair, Treasurer, Secretary, Next Gen Rep
            'roles-2': 0,          // Democratic elections every 2-3 years
            'roles-3': [0, 1, 2, 3] // Attend 75%, review materials, vote, participate in committee
        },

        6: { // Trust & Accountability
            'trust-1': [0, 1, 2, 4], // Audits, decision logs, progress reports, transparent access
            'trust-2': 4,          // Flexible approach depending on severity
            'trust-3': [0, 1, 2, 3] // Minutes, financials, advisor relationships, constitution
        },

        7: { // Succession Readiness
            'succession-1': 0,     // 5-7 year phased approach
            'succession-2': [0, 1, 2, 3, 4], // All development options selected
            'succession-3': [0, 1, 2, 3, 4]  // All knowledge transfer methods
        },

        8: { // Business Involvement
            'business-1': [0, 1, 2, 3, 4], // All qualifications required
            'business-2': 0,       // Separate meetings
            'business-3': 4        // Hybrid: family strategy, professionals execute
        },

        9: { // Education & Development
            'education-1': [0, 1, 2, 3, 4], // All educational programs
            'education-2': 1,      // $10K-25K per member per year
            'education-3': 0       // Formal pairing with 1-2 senior mentors
        },

        10: { // Philanthropy Alignment
            'philanthropy-1': 2,   // 3-5% significant commitment
            'philanthropy-2': 1,   // Committee recommends, family approves
            'philanthropy-3': [0, 1, 2, 3, 4] // All philanthropic approaches
        },

        11: { // Wealth Philosophy
            'wealth-1': 2,         // Balanced approach
            'wealth-2': 1,         // 50/50 between preservation and current use
            'wealth-3': [0, 1, 2, 3, 4] // All values selected
        },

        12: { // Family Unity & Values
            'values-1': [0, 1, 2, 4, 5], // Top 5 values: Integrity, Respect, Education, Generosity, Family unity
            'values-2': 1,         // Balanced - respect individual within framework
            'values-3': [0, 1, 2, 3] // Gatherings, traditions, trips, collaborative projects
        }
    }
};
