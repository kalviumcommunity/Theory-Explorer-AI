import { motion } from "framer-motion"
import { testimonials } from "@/data/mock"
import { Card } from "@/components/ui/Card"
import { Quote } from "lucide-react"

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="border-b border-gray-100 bg-gray-50/50">
      <div className="container-app py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-primary-600"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          >
            Loved by learners worldwide
          </motion.h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="flex h-full flex-col">
                <Quote className="mb-3 h-5 w-5 text-primary-300" />
                <Card.Description className="flex-1 text-sm leading-relaxed">
                  "{testimonial.content}"
                </Card.Description>
                <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-xs font-semibold text-primary-700">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
