export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  sections: { heading: string; body: string }[];
};

// Fictional editorial samples for layout and navigation demonstrations.
export const blogPosts: BlogPost[] = [
  {
    slug: "understanding-medical-yoga",
    title: "Understanding your medical yoga options",
    category: "Medical yoga",
    excerpt:
      "A few practical questions to help you understand a guided therapeutic yoga program.",
    readMinutes: 3,
    sections: [
      {
        heading: "Ask about the approach",
        body: "A course or program description should explain its purpose, intended audience, and format. Ask how the instructor learns about participants and how questions are handled during sessions.",
      },
      {
        heading: "Understand the guidance available",
        body: "Find out whether sessions are individual or in a group, who leads them, and what qualifications the educator holds. Ask how the program works alongside any existing advice you have received.",
      },
      {
        heading: "Clarify your next step",
        body: "Before booking, confirm the session location or joining details, fees, and what information to bring. A consultation is an opportunity to discuss suitability and ask for clarification.",
      },
    ],
  },
  {
    slug: "questions-for-spine-joint-consultation",
    title: "Preparing for a spine or joint care conversation",
    category: "Spine & joint care",
    excerpt:
      "Organize your questions and existing guidance before speaking with a movement educator.",
    readMinutes: 3,
    sections: [
      {
        heading: "Describe what matters to you",
        body: "Consider the daily activities you want to discuss and what you hope to understand. You can write a short list to bring to your appointment.",
      },
      {
        heading: "Bring your existing guidance",
        body: "If a healthcare professional has given you advice about movement or activity, ask what information the institute needs to understand that guidance. Use an appropriate private channel for personal records.",
      },
      {
        heading: "Ask clear questions",
        body: "Ask who will guide your sessions, what the format involves, and how the team discusses adaptations. Confirm what follow-up is available and how to contact the team with questions.",
      },
    ],
  },
  {
    slug: "planning-a-guided-return-to-movement",
    title: "Planning a guided return to movement",
    category: "Rehabilitation",
    excerpt:
      "Keep your care context, practical needs, and personal goals part of the conversation.",
    readMinutes: 3,
    sections: [
      {
        heading: "Start with a conversation",
        body: "Explain your goals and ask what the program can provide. Ask how the team understands existing clinical guidance and when they would refer a question back to your healthcare professional.",
      },
      {
        heading: "Discuss practical access",
        body: "Confirm whether online or in-person sessions are available, how long they last, and what equipment or space the format requires. Ask about any access needs before attending.",
      },
      {
        heading: "Keep track of your questions",
        body: "A simple note of topics discussed and questions for next time can help you follow the learning process. Your individual healthcare advice should guide decisions about activity after an injury or illness.",
      },
    ],
  },
  {
    slug: "make-space-for-a-mindful-routine",
    title: "Make space for a mindful routine",
    category: "Everyday practice",
    excerpt:
      "A quiet corner, a realistic intention, and a little room in your calendar can help you begin.",
    readMinutes: 3,
    sections: [
      {
        heading: "Start with your everyday life",
        body: "A routine can begin with a simple question: when do I have a little unhurried time? Choose a moment that fits your day rather than designing an ideal schedule that is difficult to maintain. Your first intention might simply be to pause and notice how you feel.",
      },
      {
        heading: "Prepare a welcoming space",
        body: "Choose a comfortable spot with enough room around you. Keep the things you need nearby and remove distractions where practical. The space does not need to look like a studio; it only needs to feel usable and familiar.",
      },
      {
        heading: "Leave room to adapt",
        body: "Some days will be busy. Treat your plan as an invitation you can adjust. A short reflection in a notebook can help you notice what made the routine easy to return to and what you would like to change.",
      },
    ],
  },
  {
    slug: "prepare-for-your-first-online-class",
    title: "Preparing for your first online class",
    category: "Learning",
    excerpt:
      "Take care of the practical details so you can arrive with questions and a clear understanding of the class.",
    readMinutes: 4,
    sections: [
      {
        heading: "Read the class description",
        body: "Check the intended audience, prerequisites, duration, and equipment list. If anything is unclear, ask the instructor before booking. A class title alone cannot tell you whether the format will suit your circumstances.",
      },
      {
        heading: "Check your setup",
        body: "Test your internet connection, audio, and screen position before the session. For a live class, ask how questions will be handled and whether a camera is expected. Keep the joining details somewhere easy to find.",
      },
      {
        heading: "Share questions in advance",
        body: "Write down what you hope to learn. If you need individual guidance because of an injury or health condition, discuss this with an appropriately qualified professional before participating. A general online class cannot provide an individual clinical assessment.",
      },
    ],
  },
  {
    slug: "keep-a-learning-journal",
    title: "A simple journal for your learning journey",
    category: "Reflection",
    excerpt:
      "Capture questions, ideas, and small observations without turning reflection into another task.",
    readMinutes: 3,
    sections: [
      {
        heading: "Record one useful idea",
        body: "After a lesson, write one idea in your own words. You do not need to produce a complete summary. Choosing a single point can make your notes easier to revisit before the next session.",
      },
      {
        heading: "Keep questions visible",
        body: "Create a small space for things you want to ask. Separate what the instructor actually said from your own interpretation. This gives you a useful starting point for a conversation rather than leaving uncertain details to memory.",
      },
      {
        heading: "Review without scoring yourself",
        body: "Look back occasionally for themes in your notes. Which explanations were clear? What would you like to explore again? A learning journal is a place for curiosity, not a medical record or a measure of performance.",
      },
    ],
  },
  {
    slug: "choose-a-course-with-confidence",
    title: "Questions to ask before choosing a course",
    category: "Learning",
    excerpt:
      "Look beyond the title and understand the curriculum, teaching format, and support available.",
    readMinutes: 4,
    sections: [
      {
        heading: "Understand the learning goals",
        body: "Look for a clear description of what the course covers and who it is intended for. Compare those goals with your interests and available time. Ask for clarification when a description makes broad promises without explaining the actual lessons.",
      },
      {
        heading: "Know what access includes",
        body: "Check whether lessons are live or recorded, how long access lasts, and which resources are included. Find out how questions are answered and whether there are any additional costs. Read the cancellation and refund terms before paying.",
      },
      {
        heading: "Check the source",
        body: "Review the educator’s verified qualifications and the scope of the program. Educational courses should describe their limits clearly. If you are seeking advice about a health condition, consult a qualified healthcare professional about your individual needs.",
      },
    ],
  },
];
