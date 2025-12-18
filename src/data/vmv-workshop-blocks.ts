import type { WorkshopTemplateBlock } from "@/types/workshop-constructor";

/**
 * Values, Mission and Vision Workshop Template Blocks
 * Based on the VMV workshop prototype (version 5)
 *
 * This complete workshop template includes 15 screens organized into 5 phases:
 * Phase 1: Introduction and Rules
 * Phase 2: Values Definition (Brainstorming → Consolidation → Voting → Results)
 * Phase 3: Mission Development (Discussion → Draft → Refinement → Approval)
 * Phase 4: Vision Creation (Brainstorming → Draft → Refinement → Approval)
 * Phase 5: Results Summary and Next Steps
 */

export const VMV_WORKSHOP_BLOCKS: WorkshopTemplateBlock[] = [
  // PHASE 1: INTRODUCTION
  {
    id: "vmv-1",
    block_key: "vmv-introduction",
    name: "Workshop Introduction & Rules",
    description: "Welcome participants and explain workshop structure, objectives, and ground rules",
    category: "kickoff",
    screen_type: "text",
    content_type: "introduction",
    default_content: {
      title: "Workshop: Values, Mission and Vision",
      description: "Creating the foundation for your family's future",
      welcome: {
        title: "Welcome to the Workshop!",
        message: "Welcome! Today we will work together to define the key elements of family governance: values, mission, and vision. These elements will become the foundation of your family constitution and will guide all important decisions.",
        participantRole: "You'll share your ideas, vote on proposals, and collaborate with other family members. All responses are collected through your personal device to ensure everyone's voice is heard."
      },
      concepts: [
        {
          icon: "💎",
          title: "Values",
          subtitle: "Principles that guide your family. These are fundamental beliefs that define behavior and relationships between family members."
        },
        {
          icon: "🎯",
          title: "Mission",
          subtitle: "Your family's purpose. Why does your family exist, what role does it play in society, what unites all family members."
        },
        {
          icon: "✨",
          title: "Vision",
          subtitle: "The image of the future your family aspires to. What will your family look like in 10, 20, 50 years."
        }
      ],
      objectives: [
        "Define core family values through collaborative brainstorming",
        "Articulate the family's purpose and mission",
        "Create a shared vision for the family's future",
        "Build consensus through structured discussion and voting"
      ],
      workshopRules: {
        title: "Workshop Rules",
        metadata: {
          duration: "approximately 90-120 minutes",
          format: "interactive, with individual work and collective discussion",
          outcome: "approved family values, mission, and vision"
        },
        rules: [
          "All opinions are important and will be considered",
          "AI will analyze and synthesize your ideas",
          "Decisions are made by consensus",
          "You can go back and reconsider any stage"
        ]
      }
    },
    default_navigation: { next: "vmv-2" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["introduction", "vmv", "values", "mission", "vision", "kickoff"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // PHASE 2: VALUES DEFINITION
  {
    id: "vmv-2",
    block_key: "vmv-values-brainstorming",
    name: "Values: Individual Brainstorming",
    description: "Each participant identifies 3-5 personal values that should guide the family",
    category: "exercise",
    screen_type: "exercise",
    content_type: "values-brainstorming",
    default_content: {
      title: "Step 2.1: Individual Values Brainstorming",
      instruction: {
        message: "Let's start by defining family values. Think about what is truly important for your family. What principles and beliefs unite you?",
        bold: "Please list 3-5 key values that, in your opinion, should be the foundation of your family."
      },
      timer: {
        duration: 7 * 60, // 7 minutes in seconds
        display: true
      },
      fields: [
        {
          key: "value1",
          label: "1.",
          type: "text",
          placeholder: "For example: Honesty",
          required: true,
          maxLength: 50,
          showCharacterCount: true,
          helpText: "Keep it concise - one or two words work best",
          validationHints: ["Use clear, specific terms", "Avoid vague concepts"]
        },
        {
          key: "value2",
          label: "2.",
          type: "text",
          placeholder: "For example: Family support",
          required: true,
          maxLength: 50,
          showCharacterCount: true,
          helpText: "Keep it concise - one or two words work best"
        },
        {
          key: "value3",
          label: "3.",
          type: "text",
          placeholder: "For example: Education",
          required: true,
          maxLength: 50,
          showCharacterCount: true,
          helpText: "Keep it concise - one or two words work best"
        },
        {
          key: "value4",
          label: "4.",
          type: "text",
          placeholder: "For example: Responsibility",
          required: false,
          maxLength: 50,
          showCharacterCount: true
        },
        {
          key: "value5",
          label: "5.",
          type: "text",
          placeholder: "For example: Traditions",
          required: false,
          maxLength: 50,
          showCharacterCount: true
        }
      ],
      progressInfo: {
        show: true,
        message: "X out of 8 participants have already submitted their responses"
      },
      successMessage: {
        show: true,
        text: "Your response has been submitted",
        subtext: "Thank you! Please wait while other participants complete this step. The facilitator will move to the next step when everyone is ready."
      }
    },
    default_navigation: { previous: "vmv-1", next: "vmv-3" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["values", "brainstorming", "individual", "exercise"],
    estimated_duration: 7,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-3",
    block_key: "vmv-values-consolidation",
    name: "Values: AI Consolidation & Discussion",
    description: "AI merges similar values, removes duplicates, and creates consolidated list for discussion",
    category: "exercise",
    screen_type: "exercise",
    content_type: "values-consolidation",
    default_content: {
      title: "Step 2.2: Consolidation and Discussion of Values",
      description: "AI has analyzed all proposed values, merged similar ones, removed duplicates, and grouped them by categories",
      facilitatorNote: "Review the consolidated list. You can edit, merge, add, or remove values before proceeding to voting",
      editingEnabled: true
    },
    default_navigation: { previous: "vmv-2", next: "vmv-4" },
    default_ai_config: {
      enabled: true,
      style: "neutral",
      keyTopics: ["consolidation", "merging", "categorization"]
    },
    tags: ["values", "consolidation", "ai", "facilitation"],
    estimated_duration: 15,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-4",
    block_key: "vmv-values-voting",
    name: "Values: Voting for Top 5",
    description: "Participants vote to select the 5 most important values from consolidated list",
    category: "assessment",
    screen_type: "assessment",
    content_type: "values-voting",
    default_content: {
      title: "Step 2.3: Voting for Key Values",
      description: "Now let's select the most important values for your family. Choose the 5 most important values from the list below",
      selectionLimit: 5,
      selectionType: "checkbox",
      showLiveResults: false // Only facilitators see live results
    },
    default_navigation: { previous: "vmv-3", next: "vmv-5" },
    default_ai_config: { enabled: false },
    tags: ["values", "voting", "selection", "decision"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-5",
    block_key: "vmv-values-results",
    name: "Values: Results & Final Selection",
    description: "Display voting results and facilitator selects final 5 values for constitution",
    category: "wrapup",
    screen_type: "discussion",
    content_type: "values-results",
    default_content: {
      title: "Step 2.4: Values Results",
      description: "All participants have voted. Here are ALL values ranked by votes received",
      showAllResults: true,
      facilitatorSelection: true,
      selectionLimit: 5,
      colorCoding: {
        high: "90%+",
        medium: "60-89%",
        low: "below 60%"
      }
    },
    default_navigation: { previous: "vmv-4", next: "vmv-6" },
    default_ai_config: { enabled: true, style: "neutral" },
    tags: ["values", "results", "voting", "final-selection"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // PHASE 3: MISSION DEVELOPMENT
  {
    id: "vmv-6",
    block_key: "vmv-mission-discussion",
    name: "Mission: Individual Reflection",
    description: "Participants reflect on family purpose through guided questions",
    category: "discussion",
    screen_type: "discussion",
    content_type: "mission-discussion",
    default_content: {
      title: "Step 3.1: Discussion of Family Purpose (Mission)",
      description: "The mission answers: 'Why does our family exist? What unites us?'",
      promptQuestions: [
        "What legacy do we want to leave to future generations?",
        "What role does our family play in society?",
        "What unites all members of our family?",
        "How do our values translate into our family's purpose?"
      ],
      responseType: "long-text",
      textGuidelines: {
        minLength: 100,
        maxLength: 1000,
        showWordCount: true,
        showCharacterCount: true,
        helpText: "Aim for 100-300 words. Be specific and authentic.",
        formatGuidelines: {
          tone: "inspirational",
          style: "detailed",
          bestPractices: [
            "Focus on the 'why' rather than 'what'",
            "Be specific about your family's unique purpose",
            "Connect back to your core values",
            "Think long-term (generations, not just years)"
          ],
          examples: {
            good: [
              "Our family exists to create opportunities for each generation to thrive while giving back to society through education and mentorship.",
              "We are united by our commitment to environmental stewardship and want to leave the world better than we found it."
            ],
            bad: [
              "To be successful", // Too vague
              "Make money and be happy" // Lacks depth and connection to values
            ]
          }
        }
      }
    },
    default_navigation: { previous: "vmv-5", next: "vmv-7" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["mission", "discussion", "purpose", "reflection"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-7",
    block_key: "vmv-mission-draft",
    name: "Mission: AI-Generated Draft",
    description: "AI analyzes responses and creates mission statement draft based on themes",
    category: "discussion",
    screen_type: "text",
    content_type: "mission-draft",
    default_content: {
      title: "Step 3.2: Mission Draft",
      aiAnalysis: {
        message: "Thank you all for your thoughtful responses! I have analyzed all suggestions and identified common themes:",
        themes: [
          "Preserving and passing on family values",
          "Mutual support and development of each family member",
          "Responsible resource management",
          "Positive impact on society"
        ],
        footer: "Based on this, I have prepared a mission draft:"
      },
      draftText: "Our family exists to create an environment of mutual support and development where each generation can fulfill their potential. We strive to preserve and pass on the values of openness, education, and responsibility, manage our resources with a long-term perspective, and make a positive contribution to society through philanthropy and professionalism.",
      nextStepInfo: {
        title: "Next step",
        description: "This is a draft version of the mission, based on your ideas and approved values. In the next stage, we will refine the wording together."
      }
    },
    default_navigation: { previous: "vmv-6", next: "vmv-8" },
    default_ai_config: {
      enabled: true,
      style: "neutral",
      keyTopics: ["mission", "purpose", "synthesis"]
    },
    tags: ["mission", "draft", "ai-generation", "synthesis"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-8",
    block_key: "vmv-mission-refinement",
    name: "Mission: Collaborative Refinement",
    description: "Collaborative editing of mission statement with real-time suggestions",
    category: "discussion",
    screen_type: "discussion",
    content_type: "mission-refinement",
    default_content: {
      title: "Step 3.3: Collective Mission Refinement",
      description: "Refine the mission wording together. The text below is editable directly",
      editingMode: "collaborative",
      guidelines: [
        "The mission should be clear, inspiring, and based on your values",
        "Optimal length: 2-4 sentences",
        "Focus on purpose, not specific actions"
      ],
      editorConfig: {
        type: "rich-text",
        minLength: 100,
        maxLength: 500,
        showWordCount: true,
        showCharacterCount: true,
        autoSave: true,
        helpText: "Edit collaboratively. Changes are saved automatically.",
        formatGuidelines: {
          tone: "inspirational",
          style: "concise",
          bestPractices: [
            "Use active voice ('We create...' not 'Our family is created...')",
            "Be specific but not prescriptive",
            "Include your core values naturally",
            "Make it memorable and easy to communicate",
            "Ensure every family member can see themselves in it"
          ],
          examples: {
            good: [
              "Our family exists to nurture each generation's potential while contributing to society through education and sustainable practices.",
              "We preserve our heritage, support each member's growth, and create lasting positive impact through responsible stewardship."
            ],
            bad: [
              "Our family will do many good things for the world and ourselves.", // Too vague
              "The Johnson family corporation manages wealth across generations." // Too corporate/transactional
            ]
          }
        }
      }
    },
    default_navigation: { previous: "vmv-7", next: "vmv-9" },
    default_ai_config: {
      enabled: true,
      style: "supportive",
      keyTopics: ["editing", "refinement", "clarity"]
    },
    tags: ["mission", "collaborative-editing", "refinement"],
    estimated_duration: 15,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-9",
    block_key: "vmv-mission-approval",
    name: "Mission: Final Approval Vote",
    description: "Participants vote to approve final mission statement",
    category: "wrapup",
    screen_type: "assessment",
    content_type: "mission-approval",
    default_content: {
      title: "Step 3.4: Mission Approval",
      finalText: "Our family exists to create an environment of mutual support and development where each generation can fulfill their potential. We strive to preserve and pass on the values of openness, education, and responsibility, manage our resources with a long-term perspective, and make a positive contribution to society through philanthropy and professionalism.",
      question: {
        title: "Does everyone agree with this mission statement?",
        description: "This is an important moment - the mission will become the cornerstone of your family constitution."
      },
      votingResults: {
        label: "In favor of approving the mission:",
        count: "8 out of 8 participants"
      },
      consensusMessage: {
        title: "Consensus reached!",
        description: "The mission has been unanimously approved by all workshop participants."
      }
    },
    default_navigation: { previous: "vmv-8", next: "vmv-10" },
    default_ai_config: { enabled: false },
    tags: ["mission", "approval", "voting", "decision"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // PHASE 4: VISION CREATION
  {
    id: "vmv-10",
    block_key: "vmv-vision-brainstorming",
    name: "Vision: Future Brainstorming",
    description: "Participants describe their vision of family's future in 10, 20, 50 years",
    category: "exercise",
    screen_type: "exercise",
    content_type: "vision-brainstorming",
    default_content: {
      title: "Step 4.1: Vision Brainstorming",
      description: "Vision describes a specific desired outcome you aspire to",
      promptQuestions: [
        "What will our family look like in 10 years?",
        "What will our family look like in 20 years?",
        "What achievements do we want to see in 50 years?",
        "What traditions will be passed from generation to generation?",
        "What impact will our family have on the world?"
      ],
      responseType: "long-text",
      textGuidelines: {
        minLength: 150,
        maxLength: 1500,
        showWordCount: true,
        showCharacterCount: true,
        helpText: "Paint a vivid picture of the future. Be specific and inspiring.",
        formatGuidelines: {
          tone: "inspirational",
          style: "storytelling",
          bestPractices: [
            "Use vivid, concrete imagery",
            "Be specific about measurable outcomes",
            "Think in timeframes: 10, 20, 50 years",
            "Include both tangible and intangible aspirations",
            "Connect vision to mission and values"
          ],
          examples: {
            good: [
              "In 20 years, three generations actively participate in family governance. We've established an education fund that has supported 15 family members through university. Our annual family retreat brings together 50+ members from 4 continents.",
              "By 2045, our family foundation has invested $10M in sustainable agriculture projects. Each generation has produced at least one entrepreneur and one educator, maintaining our dual commitment to innovation and knowledge."
            ],
            bad: [
              "We will be happy and successful.", // Not specific or measurable
              "Everyone will get along well." // Lacks concrete outcomes and timeframes
            ]
          }
        }
      }
    },
    default_navigation: { previous: "vmv-9", next: "vmv-11" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["vision", "brainstorming", "future", "aspiration"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-11",
    block_key: "vmv-vision-draft",
    name: "Vision: AI Draft with Source Data",
    description: "AI creates vision statement with source data panel showing individual contributions",
    category: "discussion",
    screen_type: "text",
    content_type: "vision-draft",
    default_content: {
      title: "Step 4.2: Vision Draft",
      description: "AI has identified main themes from all responses",
      showThemes: true,
      showDraft: true,
      showSourceData: true, // Unique to vision - shows individual contributions
      sourceDataAccess: ["family-consul", "external-advisor"] // Only facilitators see source data
    },
    default_navigation: { previous: "vmv-10", next: "vmv-12" },
    default_ai_config: {
      enabled: true,
      style: "neutral",
      keyTopics: ["vision", "future", "synthesis", "themes"]
    },
    tags: ["vision", "draft", "ai-generation", "source-data"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-12",
    block_key: "vmv-vision-refinement",
    name: "Vision: Collaborative Refinement",
    description: "Collaborative editing of vision statement with quality checklist",
    category: "discussion",
    screen_type: "discussion",
    content_type: "vision-refinement",
    default_content: {
      title: "Step 4.3: Vision Refinement",
      description: "Edit the text below so that it most accurately reflects your aspirations",
      editingMode: "collaborative",
      checklist: [
        "Inspire and motivate",
        "Be specific and measurable",
        "Align with mission and values",
        "Have a long-term perspective (10-50 years)"
      ],
      editorConfig: {
        type: "rich-text",
        minLength: 200,
        maxLength: 800,
        showWordCount: true,
        showCharacterCount: true,
        autoSave: true,
        helpText: "Refine together. Aim for clarity and inspiration.",
        formatGuidelines: {
          tone: "inspirational",
          style: "storytelling",
          bestPractices: [
            "Paint a picture others can visualize",
            "Include specific, measurable milestones",
            "Use present tense as if describing the achieved future",
            "Balance ambition with realism",
            "Make it emotionally resonant and memorable",
            "Include multiple time horizons (10, 20, 50 years)"
          ],
          examples: {
            good: [
              "By 2035, our family includes 40+ active members across four generations. We gather annually at our restored ancestral home, now a center for family learning and community service. Our education fund has supported 25 family members in pursuing their passions. In 2045, we celebrate 100 years of our family foundation, which has invested $50M in environmental conservation, while every family member contributes their unique talents to our shared legacy.",
              "In 2034, three generations collaborate in family governance with equal voice. Our family businesses employ 200+ people and follow B-Corp standards. By 2050, we've created a living archive documenting five generations of family history, and established endowments ensuring each future generation can pursue education without financial barriers."
            ],
            bad: [
              "In the future, we will all be successful and happy together.", // Too vague
              "We will make lots of money and everyone will be rich." // Purely transactional, lacks values
            ]
          }
        }
      }
    },
    default_navigation: { previous: "vmv-11", next: "vmv-13" },
    default_ai_config: {
      enabled: true,
      style: "supportive",
      keyTopics: ["editing", "refinement", "inspiration"]
    },
    tags: ["vision", "collaborative-editing", "refinement"],
    estimated_duration: 15,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-13",
    block_key: "vmv-vision-approval",
    name: "Vision: Final Approval Vote",
    description: "Participants vote to approve final vision statement",
    category: "wrapup",
    screen_type: "assessment",
    content_type: "vision-approval",
    default_content: {
      title: "Step 4.4: Vision Adoption",
      description: "A good vision should inspire all family members and provide clear direction for the future",
      votingType: "yes-no-abstain",
      showResults: true,
      requireConsensus: true
    },
    default_navigation: { previous: "vmv-12", next: "vmv-14" },
    default_ai_config: { enabled: false },
    tags: ["vision", "approval", "voting", "decision"],
    estimated_duration: 5,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  // PHASE 5: RESULTS & NEXT STEPS
  {
    id: "vmv-14",
    block_key: "vmv-results-summary",
    name: "Results: Summary & Final Review",
    description: "Display all approved values, mission, and vision in organized format",
    category: "wrapup",
    screen_type: "text",
    content_type: "results-summary",
    default_content: {
      title: "Step 5.1: Final Results",
      description: "You have successfully defined your family's values, mission, and vision",
      sections: ["values", "mission", "vision"],
      showMetadata: true,
      enableFinalApproval: true
    },
    default_navigation: { previous: "vmv-13", next: "vmv-15" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["results", "summary", "completion"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

  {
    id: "vmv-15",
    block_key: "vmv-next-steps",
    name: "Next Steps & Recommendations",
    description: "Provide recommendations for implementing and maintaining VMV documents",
    category: "wrapup",
    screen_type: "text",
    content_type: "next-steps",
    default_content: {
      title: "Step 5.2: Next Steps",
      description: "Now that you have values, mission, and vision, here's what you can do next",
      recommendations: [
        "Organize workshops to develop specific rules and procedures based on values",
        "Create a decision-making system that reflects your mission",
        "Develop an action plan to achieve the vision (roadmap for 5, 10, 20 years)",
        "Conduct a workshop on distributing roles and responsibilities",
        "Schedule an annual meeting to review and update documents",
        "Create a welcome package for new family members explaining VMV"
      ],
      deliverables: [
        "PDF report with complete workshop results",
        "Constitution updated with values, mission, and vision",
        "Email notifications sent to all participants",
        "Follow-up meeting scheduled (optional)"
      ]
    },
    default_navigation: { previous: "vmv-14" },
    default_ai_config: { enabled: true, style: "supportive" },
    tags: ["next-steps", "recommendations", "follow-up", "implementation"],
    estimated_duration: 10,
    thumbnail_url: null,
    usage_count: 0,
    is_system: true,
    created_by: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
