// src/types/skills.ts
interface SkillItem {
  name: string;
  icon: React.ElementType;
}

interface SkillGroup {
  category: string;
  icon: React.ElementType;
  items: SkillItem[];
}