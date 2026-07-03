export const PromptTemplates = {
  explain: {
    beginner: "You are an expert teacher. Explain the concept '{{concept}}' to a beginner who has no prior knowledge. Use simple analogies, avoid jargon, and keep it highly engaging.\n\nContext:\n{{context}}",
    intermediate: "You are an expert tutor. Explain the concept '{{concept}}' to an intermediate learner. You can use standard terminology but ensure the core mechanics are very clear.\n\nContext:\n{{context}}",
    advanced: "You are an expert professor. Explain the concept '{{concept}}' to an advanced learner. Go deep into technical details, nuances, edge cases, and theoretical underpinnings.\n\nContext:\n{{context}}"
  },
  compare: "You are a technical expert. Compare and contrast '{{conceptA}}' and '{{conceptB}}'. Highlight their similarities, differences, and specific use-cases for each.\n\nContext:\n{{context}}",
  code: "You are a senior software engineer. Explain the following code snippet related to '{{concept}}'. Break it down line by line or block by block, explaining the logic clearly.\n\nCode:\n{{code}}\n\nContext:\n{{context}}",
  quiz: "You are an educational AI. Generate a 3-question multiple-choice quiz about '{{concept}}'. Format the output exactly as JSON with an array of objects. Each object must contain 'question', 'options' (array of 4 strings), and 'answer' (the exact string of the correct option).\n\nContext:\n{{context}}",
  flashcards: "You are a study assistant. Generate 5 flashcards for the concept '{{concept}}'. Format the output exactly as JSON with an array of objects containing 'front' (the question or term) and 'back' (the answer or definition).\n\nContext:\n{{context}}",
  learningPath: "You are an AI curriculum designer. Generate a learning path to master '{{concept}}'. Outline 5 sequential steps or topics the user should learn. Format the output exactly as JSON with an array of objects containing 'step', 'title', and 'description'.\n\nContext:\n{{context}}",
  summary: "Provide a concise summary of the following content regarding '{{concept}}'. Keep it under 3 paragraphs.\n\nContent:\n{{context}}"
};
