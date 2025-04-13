"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Download, RefreshCw } from "lucide-react"
import { useState } from "react"

export function DiagramGenerator() {
  const [diagramType, setDiagramType] = useState("circuit")
  const [inputText, setInputText] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDiagram, setGeneratedDiagram] = useState<string | null>(null)

  const handleGenerate = () => {
    if (!inputText.trim()) return

    setIsGenerating(true)

    // Simulate diagram generation
    setTimeout(() => {
      // In a real application, this would call an API to generate the diagram
      // For now, we'll just set a placeholder SVG based on the diagram type
      let diagram

      if (diagramType === "circuit") {
        diagram = `
          <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="50" y="100" width="80" height="40" fill="none" stroke="black" strokeWidth="2"/>
            <text x="90" y="125" textAnchor="middle">Battery</text>
            <line x1="130" y1="120" x2="200" y2="120" stroke="black" strokeWidth="2"/>
            <rect x="200" y="100" width="100" height="40" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="125" textAnchor="middle">Resistor</text>
            <line x1="300" y1="120" x2="370" y2="120" stroke="black" strokeWidth="2"/>
            <circle cx="400" cy="120" r="30" fill="none" stroke="black" strokeWidth="2"/>
            <text x="400" y="125" textAnchor="middle">LED</text>
          </svg>
        `
      } else if (diagramType === "flowchart") {
        diagram = `
          <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="200" y="20" width="100" height="50" rx="10" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="50" textAnchor="middle">Start</text>
            <line x1="250" y1="70" x2="250" y2="100" stroke="black" strokeWidth="2"/>
            <polygon points="250,100 240,90 260,90" fill="black"/>
            <rect x="150" y="100" width="200" height="60" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="135" textAnchor="middle">Process Data</text>
            <line x1="250" y1="160" x2="250" y2="190" stroke="black" strokeWidth="2"/>
            <polygon points="250,190 240,180 260,180" fill="black"/>
            <rect x="200" y="190" width="100" height="50" rx="10" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="220" textAnchor="middle">End</text>
          </svg>
        `
      } else if (diagramType === "uml") {
        diagram = `
          <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="150" y="20" width="200" height="40" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="45" textAnchor="middle">Class</text>
            <line x1="150" y1="60" x2="350" y2="60" stroke="black" strokeWidth="2"/>
            <text x="160" y="80" textAnchor="start">- attribute1: Type</text>
            <text x="160" y="100" textAnchor="start">- attribute2: Type</text>
            <line x1="150" y1="120" x2="350" y2="120" stroke="black" strokeWidth="2"/>
            <text x="160" y="140" textAnchor="start">+ method1(): ReturnType</text>
            <text x="160" y="160" textAnchor="start">+ method2(param): ReturnType</text>
          </svg>
        `
      } else {
        diagram = `
          <svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
            <rect x="100" y="100" width="300" height="100" fill="none" stroke="black" strokeWidth="2"/>
            <text x="250" y="150" textAnchor="middle">Diagram will appear here</text>
          </svg>
        `
      }

      setGeneratedDiagram(diagram)
      setIsGenerating(false)
    }, 1500)
  }

  const handleDownload = () => {
    if (!generatedDiagram) return

    // Create a blob from the SVG
    const blob = new Blob([generatedDiagram], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = `${diagramType}-diagram.svg`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <section id="generator" className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Generate Your Diagram</h2>
            <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Describe your engineering concept and we'll visualize it for you.
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 grid max-w-5xl gap-6 lg:grid-cols-2">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="diagram-type"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Diagram Type
                  </label>
                  <Select value={diagramType} onValueChange={setDiagramType}>
                    <SelectTrigger id="diagram-type">
                      <SelectValue placeholder="Select diagram type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="circuit">Electrical Circuit</SelectItem>
                      <SelectItem value="flowchart">Flowchart</SelectItem>
                      <SelectItem value="uml">UML Diagram</SelectItem>
                      <SelectItem value="mechanical">Mechanical System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="description"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Description
                  </label>
                  <Textarea
                    id="description"
                    placeholder="Describe your engineering concept here. For example: 'A simple circuit with a battery connected to a resistor and an LED in series.'"
                    className="min-h-[150px]"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                  />
                </div>
                <Button onClick={handleGenerate} disabled={isGenerating || !inputText.trim()} className="w-full">
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Diagram"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <Tabs defaultValue="preview">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="code">Code</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed p-4">
                    {generatedDiagram ? (
                      <div dangerouslySetInnerHTML={{ __html: generatedDiagram }} />
                    ) : (
                      <div className="text-center text-gray-500 dark:text-gray-400">Your diagram will appear here</div>
                    )}
                  </div>
                  {generatedDiagram && (
                    <Button variant="outline" className="mt-4 w-full" onClick={handleDownload}>
                      <Download className="mr-2 h-4 w-4" />
                      Download SVG
                    </Button>
                  )}
                </TabsContent>
                <TabsContent value="code" className="mt-4">
                  <div className="h-[300px] overflow-auto rounded-lg border bg-gray-950 p-4">
                    <pre className="text-sm text-gray-100">
                      {generatedDiagram ? generatedDiagram : "<!-- Your diagram code will appear here -->"}
                    </pre>
                  </div>
                  {generatedDiagram && (
                    <Button
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={() => {
                        navigator.clipboard.writeText(generatedDiagram)
                      }}
                    >
                      Copy SVG Code
                    </Button>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
