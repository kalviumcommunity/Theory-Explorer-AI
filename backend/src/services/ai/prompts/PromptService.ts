import { PromptTemplates } from "./templates.js";

export class PromptService {
  
  static getExplanationPrompt(concept: string, difficulty: "beginner" | "intermediate" | "advanced", context: string = ""): string {
    let template = PromptTemplates.explain[difficulty];
    return template.replace(/{{concept}}/g, concept).replace(/{{context}}/g, context);
  }

  static getComparePrompt(conceptA: string, conceptB: string, context: string = ""): string {
    return PromptTemplates.compare
      .replace(/{{conceptA}}/g, conceptA)
      .replace(/{{conceptB}}/g, conceptB)
      .replace(/{{context}}/g, context);
  }

  static getCodeExplanationPrompt(concept: string, code: string, context: string = ""): string {
    return PromptTemplates.code
      .replace(/{{concept}}/g, concept)
      .replace(/{{code}}/g, code)
      .replace(/{{context}}/g, context);
  }

  static getQuizPrompt(concept: string, context: string = ""): string {
    return PromptTemplates.quiz.replace(/{{concept}}/g, concept).replace(/{{context}}/g, context);
  }

  static getFlashcardPrompt(concept: string, context: string = ""): string {
    return PromptTemplates.flashcards.replace(/{{concept}}/g, concept).replace(/{{context}}/g, context);
  }

  static getLearningPathPrompt(concept: string, context: string = ""): string {
    return PromptTemplates.learningPath.replace(/{{concept}}/g, concept).replace(/{{context}}/g, context);
  }

  static getSummaryPrompt(concept: string, context: string = ""): string {
    return PromptTemplates.summary.replace(/{{concept}}/g, concept).replace(/{{context}}/g, context);
  }
}
