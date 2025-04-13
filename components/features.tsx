import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CircuitBoard, Download, FileCode, Share2, Sparkles, Workflow } from "lucide-react"

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Visualize Engineering Concepts</h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Our platform helps engineering students and professionals transform text descriptions into clear, visual
              diagrams.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <CircuitBoard className="h-5 w-5" />
              <CardTitle className="text-lg">Electrical Circuits</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Generate circuit diagrams from simple text descriptions. Visualize components, connections, and power
                flow.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Workflow className="h-5 w-5" />
              <CardTitle className="text-lg">Process Flows</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Create flowcharts and process diagrams to illustrate engineering workflows, algorithms, and systems.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <FileCode className="h-5 w-5" />
              <CardTitle className="text-lg">Multiple Formats</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Support for various diagram types including circuits, flowcharts, UML, and mechanical systems.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Sparkles className="h-5 w-5" />
              <CardTitle className="text-lg">AI-Powered</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Our intelligent system understands engineering terminology and converts it into accurate visual
                representations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Download className="h-5 w-5" />
              <CardTitle className="text-lg">Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Download your diagrams in multiple formats including PNG, SVG, and PDF for use in reports and
                presentations.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-2 pb-2">
              <Share2 className="h-5 w-5" />
              <CardTitle className="text-lg">Easy Sharing</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Share your diagrams with classmates or colleagues via link or direct download for collaborative
                projects.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
