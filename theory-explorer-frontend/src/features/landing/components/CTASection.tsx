import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/Button"
import { ArrowRight, Bookmark } from "lucide-react"
import { stats } from "@/data/mock"

export function CTASection() {
  const statItems = [
    { value: stats.concepts, label: "Concepts Mapped" },
    { value: stats.users, label: "Active Learners" },
    { value: stats.quizzes, label: "Quizzes Generated" },
    { value: stats.collections, label: "Collections Created" },
  ]

  return (
    <section className="border-b border-gray-100">
      <div className="container-app py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3.5 py-1 text-xs font-medium text-primary-700">
              <Bookmark className="h-3.5 w-3.5" />
              Start your journey today
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
          >
            Ready to transform your learning?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500"
          >
            Join thousands of learners who use Concept Atlas to understand,
            connect, and master complex topics.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10"
          >
            <Link to="/register">
              <Button size="lg">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4"
        >
          {statItems.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="text-3xl font-bold text-gray-900 sm:text-4xl">
                {stat.value}
              </span>
              <p className="mt-1 text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
