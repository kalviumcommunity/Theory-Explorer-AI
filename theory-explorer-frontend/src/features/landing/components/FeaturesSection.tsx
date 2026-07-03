import { motion } from "framer-motion"
import {
  Lightbulb,
  Share2,
  Eye,
  Brain,
  Bookmark,
  TrendingUp,
} from "lucide-react"
import { Card } from "@/components/ui/Card"
import { features } from "@/data/mock"

const iconMap: Record<string, React.ReactNode> = {
  Lightbulb: <Lightbulb className="h-5 w-5" />,
  Share2: <Share2 className="h-5 w-5" />,
  Eye: <Eye className="h-5 w-5" />,
  Brain: <Brain className="h-5 w-5" />,
  Bookmark: <Bookmark className="h-5 w-5" />,
  TrendingUp: <TrendingUp className="h-5 w-5" />,
}

export function FeaturesSection() {
  return (
    <section id="features" className="border-b border-gray-100 bg-gray-50/50">
      <div className="container-app py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary-600"
          >
            Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Everything you need to learn deeply
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500"
          >
            From first principles to expert knowledge — Concept Atlas guides you
            through every step of your learning journey.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="group h-full transition-shadow duration-200 hover:shadow-md">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-100">
                  {iconMap[feature.icon]}
                </div>
                <Card.Title>{feature.title}</Card.Title>
                <Card.Description>{feature.description}</Card.Description>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
