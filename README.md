# 🌌 Theory Explorer AI

**Theory Explorer AI** is an AI-powered assistant that explains complex scientific theories like black holes, relativity, and quantum mechanics in simple, structured formats tailored to the user's level (Beginner to Expert).

## 🔧 How It Works

1. **User selects a topic and level** (e.g., "Explain Black Holes for Beginner")
2. **System builds a prompt** using both system and user instructions
3. **Relevant documents are retrieved** using RAG (e.g., NASA, Wikipedia, arXiv)
4. **LLM generates structured content** (JSON format: title, overview, examples, etc.)
5. **Functions are called**, if needed (e.g., to fetch simulations or compare theories)
6. **Frontend renders** the final interactive explanation

## ✨ Key Features

### Prompting
- Uses system + user prompts to control tone, depth, and accuracy.

### Structured Output
- JSON format enables clean rendering of multi-section explanations.

### Function Calling
- Dynamic functions like `compare_theories()` and `get_simulation_url()` enrich content.

### RAG (Retrieval-Augmented Generation)
- Real-time document retrieval ensures accuracy and up-to-date answers.

## ✅ Evaluation

- **Correctness:** RAG + structured reasoning ensures factual content.
- **Efficiency:** Caches and async APIs speed up response time.
- **Scalability:** Modular architecture supports more topics/users easily.

---

Made with ❤️ by **Kartik**
