import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Cpu, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Engineering Concept Visualizer
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Transform complex engineering concepts into clear, visual diagrams with our text-to-diagram generator.
                Perfect for students, educators, and professionals.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="#generator">
                <Button className="gap-1">
                  Try It Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#features">
                <Button variant="outline">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-white p-4 shadow-xl dark:bg-gray-800">
              <div className="absolute inset-0 bg-grid-gray-400/20 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
              <div className="relative flex h-full flex-col items-center justify-center gap-6 p-4 text-center">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Code className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Zap className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                    <Cpu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">Text to Diagram</h2>
                  <p className="text-gray-500 dark:text-gray-400">
                    Describe your engineering concept in plain text, and we'll generate a clear, professional diagram.
                  </p>
                </div>
                <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900">
                  <code className="text-sm text-gray-800 dark:text-gray-200">circuit: battery → resistor → LED</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
