import { motion } from "framer-motion"
import { howItWorks } from "@/data/mock"

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="border-b border-gray-100">
      <div className="container-app py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary-600"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Three steps to mastery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-gray-500"
          >
            A simple workflow that turns curious beginners into confident experts.
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {howItWorks.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <span className="text-5xl font-bold tracking-tighter text-primary-100">
                  {step.step}
                </span>
                <h3 className="mt-4 text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-500 max-w-xs">
                  {step.description}
                </p>
              </div>

              {/* Connector line */}
              {index < howItWorks.length - 1 && (
                <div className="hidden md:block absolute right-0 top-12 h-px w-8 bg-gray-200 -translate-y-1/2 translate-x-[calc(100%-2rem)]" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
