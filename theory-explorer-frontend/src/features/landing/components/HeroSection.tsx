import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Sparkles, Play } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-gray-100">
      <div className="container-app py-24 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-medium text-primary-700">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Knowledge Operating System
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Understand.
            <br />
            <span className="text-primary-600">Connect.</span> Master.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-6 text-lg leading-relaxed text-gray-500 sm:text-xl max-w-2xl mx-auto"
          >
            Concept Atlas transforms how you learn. Explore complex topics through
            intelligent knowledge graphs, interactive quizzes, and personalized
            learning paths.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <Link to="/register">
              <Button size="lg">
                Start Learning Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg">
                <Play className="h-4 w-4" />
                Explore Demo
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex items-center justify-center gap-8 text-sm text-gray-400"
          >
            <span>No credit card required</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>Free forever tier</span>
            <span className="h-1 w-1 rounded-full bg-gray-300" />
            <span>Export your data</span>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  )
}
