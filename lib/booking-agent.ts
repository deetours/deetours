export interface AgentStep {
    id: string;
    agentMessage: string;
    type: "choices" | "input" | "multi-input";
    choices?: { label: string; value: string; emoji?: string }[];
    inputFields?: { key: string; label: string; placeholder: string; type?: string; required?: boolean }[];
    // The key to store the selected value under in the session data
    dataKey?: string;
}

export const AGENT_STEPS: AgentStep[] = [
    {
        id: "intent",
        agentMessage:
            "Hello, I'm Dee — your personal travel concierge at DeeTours. Every great journey begins with a single question. What brings you here today?",
        type: "choices",
        dataKey: "intent",
        choices: [
            { label: "Plan a new journey", value: "plan", emoji: "✦" },
            { label: "Ask about an existing booking", value: "existing", emoji: "◈" },
            { label: "Just exploring for now", value: "exploring", emoji: "◎" },
        ],
    },
    {
        id: "experience",
        agentMessage:
            "Wonderful. Everyone has a different relationship with travel. What kind of experience speaks to your soul?",
        type: "choices",
        dataKey: "experience",
        choices: [
            { label: "Adventure & Wilderness", value: "adventure", emoji: "⬡" },
            { label: "Luxury & Slow Travel", value: "luxury", emoji: "◈" },
            { label: "Spiritual & Retreat", value: "spiritual", emoji: "✦" },
            { label: "Cultural Immersion", value: "cultural", emoji: "◎" },
            { label: "Surprise me", value: "surprise", emoji: "◇" },
        ],
    },
    {
        id: "group",
        agentMessage:
            "Beautiful choice. Now tell me — who is joining you on this journey?",
        type: "choices",
        dataKey: "group",
        choices: [
            { label: "Solo (just me)", value: "solo", emoji: "◎" },
            { label: "Couple", value: "couple", emoji: "◈" },
            { label: "Small Group (3–6)", value: "small_group", emoji: "⬡" },
            { label: "Private Group (7+)", value: "large_group", emoji: "✦" },
        ],
    },
    {
        id: "timeline",
        agentMessage:
            "And when are you thinking of embarking? Having a timeline helps me curate the perfect window.",
        type: "choices",
        dataKey: "timeline",
        choices: [
            { label: "Within 3 months", value: "3_months", emoji: "◎" },
            { label: "3 – 6 months away", value: "6_months", emoji: "◈" },
            { label: "6 – 12 months away", value: "12_months", emoji: "⬡" },
            { label: "Just exploring timelines", value: "open", emoji: "◇" },
        ],
    },
    {
        id: "budget",
        agentMessage:
            "To ensure I design something that feels absolutely right for you — what investment range are you comfortable with per person?",
        type: "choices",
        dataKey: "budget",
        choices: [
            { label: "Under ₹1 Lakh", value: "under_1l", emoji: "◎" },
            { label: "₹1L – ₹3L", value: "1l_3l", emoji: "◈" },
            { label: "₹3L – ₹7L", value: "3l_7l", emoji: "⬡" },
            { label: "₹7L and above", value: "7l_plus", emoji: "✦" },
            { label: "I'd prefer to discuss", value: "discuss", emoji: "◇" },
        ],
    },
    {
        id: "contact",
        agentMessage:
            "Perfect. Deepa will personally review your preferences and reach out within 24 hours. Where can she find you?",
        type: "multi-input",
        inputFields: [
            { key: "name", label: "Your Name", placeholder: "e.g. Priya Nair", required: true },
            { key: "phone", label: "WhatsApp Number", placeholder: "+91 98765 43210", type: "tel", required: true },
            { key: "email", label: "Email (optional)", placeholder: "your@email.com", type: "email" },
        ],
    },
];
