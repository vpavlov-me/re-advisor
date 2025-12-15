/**
 * Pre-defined family values for VMV Workshop
 */

export interface Value {
  name: string;
  icon: string;
  description: string;
  category: 'core' | 'business' | 'social' | 'personal';
}

export const FAMILY_VALUES: Value[] = [
  // Core Family Values
  {
    name: "Integrity & Honesty",
    icon: "🤝",
    description: "Honesty and strong moral principles in all actions",
    category: "core"
  },
  {
    name: "Family Unity",
    icon: "👨‍👩‍👧‍👦",
    description: "Staying connected and supporting each other",
    category: "core"
  },
  {
    name: "Respect",
    icon: "🙏",
    description: "Treating everyone with dignity and consideration",
    category: "core"
  },
  {
    name: "Trust",
    icon: "🔒",
    description: "Building and maintaining confidence in each other",
    category: "core"
  },
  {
    name: "Communication",
    icon: "💬",
    description: "Open, honest, and respectful dialogue",
    category: "core"
  },

  // Innovation & Growth
  {
    name: "Innovation",
    icon: "💡",
    description: "Embracing new ideas and continuous improvement",
    category: "business"
  },
  {
    name: "Excellence",
    icon: "⭐",
    description: "Striving for the highest quality in everything we do",
    category: "business"
  },
  {
    name: "Entrepreneurship",
    icon: "🚀",
    description: "Taking initiative and calculated risks",
    category: "business"
  },
  {
    name: "Stewardship",
    icon: "🌱",
    description: "Responsible management of resources for future generations",
    category: "business"
  },
  {
    name: "Accountability",
    icon: "✓",
    description: "Taking responsibility for our actions and commitments",
    category: "business"
  },

  // Personal Development
  {
    name: "Education",
    icon: "🎓",
    description: "Lifelong learning and personal development",
    category: "personal"
  },
  {
    name: "Independence",
    icon: "🦅",
    description: "Self-reliance and personal autonomy",
    category: "personal"
  },
  {
    name: "Resilience",
    icon: "💪",
    description: "Bouncing back from challenges stronger",
    category: "personal"
  },
  {
    name: "Humility",
    icon: "🙇",
    description: "Staying grounded despite success",
    category: "personal"
  },
  {
    name: "Courage",
    icon: "🦁",
    description: "Facing challenges with bravery and conviction",
    category: "personal"
  },

  // Social Responsibility
  {
    name: "Service to Society",
    icon: "🌍",
    description: "Contributing to the greater good",
    category: "social"
  },
  {
    name: "Philanthropy",
    icon: "❤️",
    description: "Giving back to communities in need",
    category: "social"
  },
  {
    name: "Sustainability",
    icon: "♻️",
    description: "Environmental and social responsibility",
    category: "social"
  },
  {
    name: "Diversity & Inclusion",
    icon: "🌈",
    description: "Embracing and celebrating differences",
    category: "social"
  },
  {
    name: "Compassion",
    icon: "🤲",
    description: "Showing empathy and care for others",
    category: "social"
  },

  // Additional Values
  {
    name: "Loyalty",
    icon: "🛡️",
    description: "Steadfast support and faithfulness",
    category: "core"
  },
  {
    name: "Tradition",
    icon: "📜",
    description: "Honoring heritage and family legacy",
    category: "core"
  },
  {
    name: "Adaptability",
    icon: "🔄",
    description: "Flexibility in changing circumstances",
    category: "business"
  },
  {
    name: "Transparency",
    icon: "🔍",
    description: "Openness in communication and decision-making",
    category: "business"
  },
  {
    name: "Wisdom",
    icon: "🦉",
    description: "Sound judgment based on experience",
    category: "personal"
  }
];

export const VALUE_CATEGORIES = {
  core: { label: "Core Family", color: "bg-orange-100 text-orange-600 border-orange-200" },
  business: { label: "Business", color: "bg-blue-100 text-blue-600 border-blue-200" },
  personal: { label: "Personal", color: "bg-purple-100 text-purple-600 border-purple-200" },
  social: { label: "Social", color: "bg-green-100 text-green-600 border-green-200" }
} as const;
