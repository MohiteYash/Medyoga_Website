import {
  Activity,
  HeartPulse,
  Move,
  PersonStanding,
  StretchHorizontal,
  Waves,
} from "lucide-react";

export const assets = {
  therapy: "/assets/images/guided-therapeutic-yoga.webp",
  studio: "/assets/images/medical-yoga-studio.webp",
  movement: "/assets/images/guided-mobility-practice.webp",
};
export const contact = {
  phone: "+91 93554 41199",
  whatsapp: "https://wa.me/919355441199",
  instagram: "https://www.instagram.com/swasthyamedicalyoga/",
  youtube: "https://www.youtube.com/@swasthyamedicalyoga",
  location: "https://maps.app.goo.gl/Lgkr8g7F7G11KYZF6",
  course: "https://alvo.chat/8djp",
};
export const programs = [
  {
    slug: "spine-back-care",
    title: "Spine & Back Care",
    icon: Activity,
    description:
      "A considered approach to posture, back awareness, and comfortable everyday movement.",
    focus: [
      "Posture and movement awareness",
      "Supported mobility practice",
      "Adapting everyday movements",
    ],
  },
  {
    slug: "neck-shoulder-care",
    title: "Neck & Shoulder Care",
    icon: StretchHorizontal,
    description:
      "Guided movement and gentle mobility for the neck, shoulders, and upper body.",
    focus: [
      "Upper-body movement awareness",
      "Gentle shoulder mobility",
      "Workday movement habits",
    ],
  },
  {
    slug: "joint-mobility",
    title: "Joint Mobility",
    icon: Move,
    description:
      "Explore comfortable ranges of movement with an individual, paced approach.",
    focus: [
      "Comfortable movement ranges",
      "Supported balance practice",
      "Building a consistent routine",
    ],
  },
  {
    slug: "therapeutic-yoga",
    title: "Therapeutic Yoga",
    icon: PersonStanding,
    description:
      "Yoga adapted to your starting point, combining movement, breath, and attention.",
    focus: [
      "Adapted yoga practice",
      "Breath and movement awareness",
      "Individual guidance",
    ],
  },
  {
    slug: "rehabilitation-recovery",
    title: "Rehabilitation & Recovery",
    icon: HeartPulse,
    description:
      "Discuss a guided return to movement alongside your existing care plan.",
    focus: [
      "Understanding your care context",
      "A gradual approach to activity",
      "Coordination with clinical advice",
    ],
  },
  {
    slug: "general-wellness",
    title: "General Wellness",
    icon: Waves,
    description:
      "Make room for mindful movement, relaxation, and a sustainable daily practice.",
    focus: [
      "Everyday movement",
      "Relaxation and reflection",
      "Developing practice habits",
    ],
  },
];
