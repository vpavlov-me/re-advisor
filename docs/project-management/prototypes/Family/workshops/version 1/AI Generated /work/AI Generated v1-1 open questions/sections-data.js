// 12 Sections with 5 questions each (60 total questions)

const SECTIONS = [
    {
        id: 1,
        title: "Communication Patterns",
        icon: "💬",
        description: "How your family talks, listens, and shares information",
        questions: [
            { id: 1, text: "How often does your family communicate about important decisions?", type: "scale", options: ["Rarely", "Occasionally", "Monthly", "Weekly", "Daily"] },
            { id: 2, text: "Do you have regular family meetings or calls?", type: "yesno", options: ["Yes", "No", "Not Sure"] },
            { id: 3, text: "How comfortable are family members sharing concerns openly?", type: "scale", options: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"] },
            { id: 4, text: "What communication channels does your family primarily use?", type: "choice", options: ["In-person meetings only", "Phone/video calls", "Messaging apps", "Multiple channels"] },
            { id: 5, text: "How well do family members listen to each other?", type: "scale", options: ["Poorly", "Fair", "Good", "Very Good", "Excellent"] }
        ]
    },
    {
        id: 2,
        title: "Decision-Making Process",
        icon: "🎯",
        description: "How your family makes choices together",
        questions: [
            { id: 6, text: "Do you have formal rules for making family decisions?", type: "yesno", options: ["Yes", "No", "Not Sure"] },
            { id: 7, text: "Who typically makes major family decisions?", type: "choice", options: ["One senior member", "Parents/founders", "Family council", "Everyone equally"] },
            { id: 8, text: "How transparent is the decision-making process?", type: "scale", options: ["Not transparent", "Slightly transparent", "Moderately transparent", "Very transparent", "Completely transparent"] },
            { id: 9, text: "Are younger family members involved in important decisions?", type: "yesno", options: ["Yes", "No", "Sometimes"] },
            { id: 10, text: "How satisfied are you with the current decision-making process?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
        ]
    },
    {
        id: 3,
        title: "Conflict Resolution",
        icon: "🤝",
        description: "How your family handles disagreements and finds solutions",
        questions: [
            { id: 11, text: "Do you have a formal process for resolving family conflicts?", type: "yesno", options: ["Yes", "No", "Not Sure"] },
            { id: 12, text: "How does your family typically handle disagreements?", type: "choice", options: ["Open discussion", "Mediation by senior member", "Avoidance / time healing", "No formal process"] },
            { id: 13, text: "How comfortable are you addressing conflicts directly?", type: "scale", options: ["Very Uncomfortable", "Uncomfortable", "Neutral", "Comfortable", "Very Comfortable"] },
            { id: 14, text: "Have you ever used external mediators or advisors?", type: "yesno", options: ["Yes", "No", "Considering it"] },
            { id: 15, text: "How effectively does your family resolve conflicts?", type: "scale", options: ["Poorly", "Fair", "Good", "Very Good", "Excellent"] }
        ]
    },
    {
        id: 4,
        title: "Financial Transparency",
        icon: "💰",
        description: "How openly your family discusses money and wealth",
        questions: [
            { id: 16, text: "Do family members have access to financial information?", type: "yesno", options: ["Yes", "No", "Partial access"] },
            { id: 17, text: "How often is financial information shared with the family?", type: "choice", options: ["Never", "Rarely", "Annually", "Quarterly", "Monthly"] },
            { id: 18, text: "How transparent is your family about wealth and assets?", type: "scale", options: ["Not transparent", "Slightly transparent", "Moderately transparent", "Very transparent", "Completely transparent"] },
            { id: 19, text: "Are investment decisions discussed openly with the family?", type: "yesno", options: ["Yes", "No", "Sometimes"] },
            { id: 20, text: "How satisfied are you with the level of financial transparency?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
        ]
    },
    {
        id: 5,
        title: "Roles & Responsibilities",
        icon: "👥",
        description: "Who does what in your family",
        questions: [
            { id: 21, text: "Are family roles and responsibilities clearly defined?", type: "yesno", options: ["Yes", "No", "Partially"] },
            { id: 22, text: "Who manages the family's business and investments?", type: "choice", options: ["One senior member", "Professional advisors", "Family committee", "Shared responsibility"] },
            { id: 23, text: "How clear are expectations for each family member?", type: "scale", options: ["Very Unclear", "Unclear", "Somewhat Clear", "Clear", "Very Clear"] },
            { id: 24, text: "Do you have a family council or governance board?", type: "yesno", options: ["Yes", "No", "Planning to create"] },
            { id: 25, text: "How satisfied are you with role clarity in your family?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
        ]
    },
    {
        id: 6,
        title: "Trust & Accountability",
        icon: "🔒",
        description: "Building confidence and responsibility within the family",
        questions: [
            { id: 26, text: "How much do you trust other family members with financial decisions?", type: "scale", options: ["No Trust", "Little Trust", "Moderate Trust", "High Trust", "Complete Trust"] },
            { id: 27, text: "Are family members held accountable for their commitments?", type: "yesno", options: ["Yes", "No", "Sometimes"] },
            { id: 28, text: "Do you have mechanisms to verify financial transactions?", type: "choice", options: ["No mechanisms", "Informal checks", "Annual audits", "Regular professional audits"] },
            { id: 29, text: "How transparent are family members about their actions?", type: "scale", options: ["Not transparent", "Slightly transparent", "Moderately transparent", "Very transparent", "Completely transparent"] },
            { id: 30, text: "Overall, how strong is trust within your family?", type: "scale", options: ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"] }
        ]
    },
    {
        id: 7,
        title: "Succession Readiness",
        icon: "🔄",
        description: "Preparing the next generation for leadership",
        questions: [
            { id: 31, text: "Do you have a formal succession plan?", type: "yesno", options: ["Yes", "No", "In development"] },
            { id: 32, text: "How prepared is the next generation to take on leadership?", type: "scale", options: ["Not Prepared", "Somewhat Prepared", "Moderately Prepared", "Well Prepared", "Fully Prepared"] },
            { id: 33, text: "Are younger family members receiving training and mentorship?", type: "yesno", options: ["Yes", "No", "Starting soon"] },
            { id: 34, text: "How clear is the timeline for leadership transition?", type: "choice", options: ["No timeline", "Vague timeline", "Rough timeline", "Clear timeline"] },
            { id: 35, text: "How confident are you in the succession plan?", type: "scale", options: ["Not Confident", "Slightly Confident", "Moderately Confident", "Confident", "Very Confident"] }
        ]
    },
    {
        id: 8,
        title: "Business Involvement",
        icon: "💼",
        description: "The relationship between family and business",
        questions: [
            { id: 36, text: "How involved is the family in business operations?", type: "choice", options: ["Not involved", "Oversight only", "Active management", "Full operational control"] },
            { id: 37, text: "Are there clear rules about family employment in the business?", type: "yesno", options: ["Yes", "No", "Informal guidelines"] },
            { id: 38, text: "How do family members gain business roles?", type: "choice", options: ["By birth right", "Based on qualifications", "Combination of both", "No clear process"] },
            { id: 39, text: "How satisfied are you with business-family boundaries?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] },
            { id: 40, text: "Do you separate family and business decision-making?", type: "yesno", options: ["Yes", "No", "Partially"] }
        ]
    },
    {
        id: 9,
        title: "Education & Development",
        icon: "📚",
        description: "Learning and growing as a family",
        questions: [
            { id: 41, text: "Does your family invest in financial education for members?", type: "yesno", options: ["Yes", "No", "Planning to"] },
            { id: 42, text: "What type of development programs does your family provide?", type: "choice", options: ["None", "Informal mentoring", "Formal training programs", "Comprehensive development plans"] },
            { id: 43, text: "How important is continuous learning in your family?", type: "scale", options: ["Not Important", "Slightly Important", "Moderately Important", "Important", "Very Important"] },
            { id: 44, text: "Do younger members have access to educational resources?", type: "yesno", options: ["Yes", "No", "Limited access"] },
            { id: 45, text: "How satisfied are you with family education initiatives?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
        ]
    },
    {
        id: 10,
        title: "Philanthropy Alignment",
        icon: "❤️",
        description: "Giving back and making an impact together",
        questions: [
            { id: 46, text: "Does your family engage in philanthropic activities?", type: "yesno", options: ["Yes", "No", "Considering it"] },
            { id: 47, text: "How aligned are family members on philanthropic priorities?", type: "scale", options: ["Not Aligned", "Slightly Aligned", "Moderately Aligned", "Well Aligned", "Completely Aligned"] },
            { id: 48, text: "What percentage of wealth does your family commit to charity?", type: "choice", options: ["None", "Less than 1%", "1-5%", "More than 5%"] },
            { id: 49, text: "Do you have a formal philanthropy strategy?", type: "yesno", options: ["Yes", "No", "In development"] },
            { id: 50, text: "How important is philanthropy to your family's identity?", type: "scale", options: ["Not Important", "Slightly Important", "Moderately Important", "Important", "Very Important"] }
        ]
    },
    {
        id: 11,
        title: "Wealth Philosophy",
        icon: "🌟",
        description: "Your family's beliefs and values about wealth",
        questions: [
            { id: 51, text: "Does your family have a clear wealth philosophy?", type: "yesno", options: ["Yes", "No", "Developing one"] },
            { id: 52, text: "What is your family's primary approach to wealth?", type: "choice", options: ["Preservation", "Growth", "Balanced approach", "No clear approach"] },
            { id: 53, text: "How aligned are family members on wealth values?", type: "scale", options: ["Not Aligned", "Slightly Aligned", "Moderately Aligned", "Well Aligned", "Completely Aligned"] },
            { id: 54, text: "Do you discuss wealth philosophy openly as a family?", type: "yesno", options: ["Yes", "No", "Rarely"] },
            { id: 55, text: "How important is wealth stewardship to future generations?", type: "scale", options: ["Not Important", "Slightly Important", "Moderately Important", "Important", "Very Important"] }
        ]
    },
    {
        id: 12,
        title: "Family Unity & Values",
        icon: "🏠",
        description: "The bonds that hold your family together",
        questions: [
            { id: 56, text: "How strong is the sense of unity in your family?", type: "scale", options: ["Very Weak", "Weak", "Moderate", "Strong", "Very Strong"] },
            { id: 57, text: "Have you defined core family values together?", type: "yesno", options: ["Yes", "No", "In progress"] },
            { id: 58, text: "How often does your family gather for non-business purposes?", type: "choice", options: ["Rarely", "Annually", "Quarterly", "Monthly"] },
            { id: 59, text: "How well do family members understand shared values?", type: "scale", options: ["Poorly", "Fair", "Good", "Very Good", "Excellent"] },
            { id: 60, text: "Overall, how satisfied are you with family unity?", type: "scale", options: ["Very Dissatisfied", "Dissatisfied", "Neutral", "Satisfied", "Very Satisfied"] }
        ]
    }
];
