import { Flashcard } from "../../models/Flashcard.js";
import { QuizResult } from "../../models/QuizResult.js";
import { ai } from "../ai/AIOrchestrator.js";
import { Concept } from "../../models/Concept.js";
import mongoose from "mongoose";

export class PracticeService {
  /**
   * Spaced Repetition logic (SuperMemo-2 simplified)
   */
  private static calculateNextReview(easeFactor: number, interval: number, quality: number) {
    let nextInterval;
    if (quality < 3) {
      nextInterval = 1;
    } else {
      if (interval === 0) nextInterval = 1;
      else if (interval === 1) nextInterval = 6;
      else nextInterval = Math.round(interval * easeFactor);
    }
    
    let nextEaseFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
    if (nextEaseFactor < 1.3) nextEaseFactor = 1.3;

    return { nextInterval, nextEaseFactor };
  }

  static async getFlashcards(userId: string, conceptId: string) {
    // If not generated yet, try generating via AI
    const count = await Flashcard.countDocuments({ concept: conceptId, user: userId });
    
    if (count === 0) {
      const concept = await Concept.findById(conceptId);
      if (!concept) throw new Error("Concept not found");
      
      const generatedCards = await ai.generateFlashcards(concept.title, concept.content);
      // Ensure generatedCards is array
      if (Array.isArray(generatedCards)) {
         const toInsert = generatedCards.map((card: any) => ({
           concept: conceptId,
           user: userId,
           front: card.front || card.question,
           back: card.back || card.answer,
         }));
         await Flashcard.insertMany(toInsert);
      }
    }
    
    return Flashcard.find({ concept: conceptId, user: userId, nextReviewDate: { $lte: new Date() } });
  }

  static async reviewFlashcard(cardId: string, quality: number) {
    const card = await Flashcard.findById(cardId);
    if (!card) throw new Error("Flashcard not found");
    
    const { nextInterval, nextEaseFactor } = this.calculateNextReview(card.easeFactor, card.interval, quality);
    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + nextInterval);
    
    card.interval = nextInterval;
    card.easeFactor = nextEaseFactor;
    card.nextReviewDate = nextDate;
    await card.save();
    return card;
  }

  static async submitQuizResult(userId: string, conceptId: string, score: number, totalQuestions: number, difficulty: any) {
    const passed = (score / totalQuestions) >= 0.7;
    const result = new QuizResult({
      user: userId,
      concept: conceptId,
      score,
      totalQuestions,
      difficulty,
      passed
    });
    return await result.save();
  }
}
