export class ResponseFormatter {
  static extractJson<T>(llmResponse: string): T {
    try {
      // Find JSON block enclosed in markdown backticks
      const jsonMatch = llmResponse.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        return JSON.parse(jsonMatch[1].trim()) as T;
      }
      
      // Fallback: Try parsing the raw string if no markdown formatting
      return JSON.parse(llmResponse.trim()) as T;
    } catch (error) {
      throw new Error("Failed to parse JSON response from AI Provider. The output was not valid JSON.");
    }
  }
}
