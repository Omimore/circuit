"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, RefreshCw } from "lucide-react"
import { useState } from "react"

export function CircuitGenerator() {
  const [inputText, setInputText] = useState("")
  const [selectedCircuit, setSelectedCircuit] = useState("custom")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedDiagram, setGeneratedDiagram] = useState<string | null>(null)

  // Library of pre-defined circuit diagrams
  const circuitLibrary = {
    "half-wave-rectifier": getHalfWaveRectifierSVG(),
    "full-wave-rectifier": getFullWaveRectifierSVG(),
    "voltage-divider": getVoltageDividerSVG(),
    "common-emitter-amplifier": getCommonEmitterAmplifierSVG(),
    "astable-multivibrator": getAstableMultivibratorSVG(),
  }

  const handleGenerate = () => {
    if (!inputText.trim() && selectedCircuit === "custom") return

    setIsGenerating(true)

    // Simulate processing time
    setTimeout(() => {
      if (selectedCircuit !== "custom") {
        // Use pre-defined circuit from library
        setGeneratedDiagram(circuitLibrary[selectedCircuit])
      } else {
        // Try to match the input text to a known circuit
        const lowerInput = inputText.toLowerCase()

        if (lowerInput.includes("half-wave") && lowerInput.includes("rectifier")) {
          setGeneratedDiagram(circuitLibrary["half-wave-rectifier"])
        } else if (lowerInput.includes("full-wave") && lowerInput.includes("rectifier")) {
          setGeneratedDiagram(circuitLibrary["full-wave-rectifier"])
        } else if (lowerInput.includes("voltage divider")) {
          setGeneratedDiagram(circuitLibrary["voltage-divider"])
        } else if (
          (lowerInput.includes("common emitter") && lowerInput.includes("amplifier")) ||
          (lowerInput.includes("transistor") && lowerInput.includes("amplifier"))
        ) {
          setGeneratedDiagram(circuitLibrary["common-emitter-amplifier"])
        } else if (
          lowerInput.includes("astable") ||
          (lowerInput.includes("multivibrator") && !lowerInput.includes("monostable"))
        ) {
          setGeneratedDiagram(circuitLibrary["astable-multivibrator"])
        } else {
          // Default to a simple circuit if no match is found
          setGeneratedDiagram(getSimpleCircuitSVG())
        }
      }

      setIsGenerating(false)
    }, 1000)
  }

  const handleDownload = () => {
    if (!generatedDiagram) return

    // Create a blob from the SVG
    const blob = new Blob([generatedDiagram], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    // Create a temporary link and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = "circuit-diagram.svg"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="circuit-type"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select Circuit Type
              </label>
              <Select value={selectedCircuit} onValueChange={setSelectedCircuit}>
                <SelectTrigger id="circuit-type">
                  <SelectValue placeholder="Select circuit type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom (Describe below)</SelectItem>
                  <SelectItem value="half-wave-rectifier">Half-Wave Rectifier</SelectItem>
                  <SelectItem value="full-wave-rectifier">Full-Wave Rectifier</SelectItem>
                  <SelectItem value="voltage-divider">Voltage Divider</SelectItem>
                  <SelectItem value="common-emitter-amplifier">Common Emitter Amplifier</SelectItem>
                  <SelectItem value="astable-multivibrator">Astable Multivibrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedCircuit === "custom" && (
              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Describe the Circuit
                </label>
                <Textarea
                  id="description"
                  placeholder="Describe the circuit you want to generate. For example: 'make a half-wave rectifier circuit'"
                  className="min-h-[100px]"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                />
              </div>
            )}

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || (selectedCircuit === "custom" && !inputText.trim())}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Circuit Diagram"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Circuit Diagram</h3>
            <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed p-4 overflow-auto">
              {generatedDiagram ? (
                <div dangerouslySetInnerHTML={{ __html: generatedDiagram }} />
              ) : (
                <div className="text-center text-gray-500">Your circuit diagram will appear here</div>
              )}
            </div>
            {generatedDiagram && (
              <Button variant="outline" className="w-full" onClick={handleDownload}>
                <Download className="mr-2 h-4 w-4" />
                Download SVG
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Pre-defined circuit diagrams
function getHalfWaveRectifierSVG() {
  return `<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- AC Source -->
    <circle cx="100" cy="150" r="30" fill="none" stroke="black" strokeWidth="2"/>
    <text x="100" y="155" textAnchor="middle" fontFamily="Arial">AC</text>
    
    <!-- Diode -->
    <polygon points="250,130 250,170 300,150" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="150" x2="320" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="230" y1="150" x2="250" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="130" x2="300" y2="170" stroke="black" strokeWidth="2"/>
    
    <!-- Load Resistor -->
    <rect x="350" y="120" width="100" height="60" fill="none" stroke="black" strokeWidth="2"/>
    <text x="400" y="155" textAnchor="middle" fontFamily="Arial">Load</text>
    
    <!-- Wires -->
    <line x1="130" y1="150" x2="230" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="320" y1="150" x2="350" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="450" y1="150" x2="500" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="180" x2="100" y2="220" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="220" x2="500" y2="220" stroke="black" strokeWidth="2"/>
    <line x1="500" y1="150" x2="500" y2="220" stroke="black" strokeWidth="2"/>
    
    <!-- Labels -->
    <text x="275" y="130" textAnchor="middle" fontFamily="Arial">Diode</text>
    <text x="100" y="100" textAnchor="middle" fontFamily="Arial">AC Source</text>
    <text x="300" y="250" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Half-Wave Rectifier Circuit</text>
  </svg>`
}

function getFullWaveRectifierSVG() {
  return `<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
    <!-- AC Source -->
    <circle cx="100" cy="175" r="30" fill="none" stroke="black" strokeWidth="2"/>
    <text x="100" y="180" textAnchor="middle" fontFamily="Arial">AC</text>
    
    <!-- Bridge Rectifier -->
    <rect x="200" y="100" width="150" height="150" fill="none" stroke="black" strokeWidth="2"/>
    
    <!-- Diodes in Bridge -->
    <!-- Top-left to top-right -->
    <polygon points="230,130 250,110 270,130" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="230" y1="130" x2="270" y2="130" stroke="black" strokeWidth="2"/>
    <line x1="250" y1="110" x2="250" y2="130" stroke="black" strokeWidth="2"/>
    
    <!-- Top-right to bottom-right -->
    <polygon points="320,130 320,170 300,150" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="150" x2="320" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="130" x2="300" y2="170" stroke="black" strokeWidth="2"/>
    
    <!-- Bottom-right to bottom-left -->
    <polygon points="270,220 250,240 230,220" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="230" y1="220" x2="270" y2="220" stroke="black" strokeWidth="2"/>
    <line x1="250" y1="220" x2="250" y2="240" stroke="black" strokeWidth="2"/>
    
    <!-- Bottom-left to top-left -->
    <polygon points="230,170 230,130 250,150" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="230" y1="150" x2="250" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="250" y1="130" x2="250" y2="170" stroke="black" strokeWidth="2"/>
    
    <!-- Load Resistor -->
    <rect x="400" y="145" width="100" height="60" fill="none" stroke="black" strokeWidth="2"/>
    <text x="450" y="180" textAnchor="middle" fontFamily="Arial">Load</text>
    
    <!-- Wires -->
    <line x1="130" y1="175" x2="200" y2="175" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="175" x2="400" y2="175" stroke="black" strokeWidth="2"/>
    <line x1="500" y1="175" x2="550" y2="175" stroke="black" strokeWidth="2"/>
    <line x1="275" y1="100" x2="275" y2="75" stroke="black" strokeWidth="2"/>
    <line x1="275" y1="75" x2="550" y2="75" stroke="black" strokeWidth="2"/>
    <line x1="550" y1="75" x2="550" y2="175" stroke="black" strokeWidth="2"/>
    
    <!-- Labels -->
    <text x="275" y="90" textAnchor="middle" fontFamily="Arial">Bridge Rectifier</text>
    <text x="100" y="125" textAnchor="middle" fontFamily="Arial">AC Source</text>
    <text x="300" y="280" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Full-Wave Bridge Rectifier Circuit</text>
  </svg>`
}

function getVoltageDividerSVG() {
  return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- DC Source -->
    <rect x="100" y="100" width="50" height="100" fill="none" stroke="black" strokeWidth="2"/>
    <text x="125" y="155" textAnchor="middle" fontFamily="Arial">Vin</text>
    <line x1="90" y1="120" x2="110" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="110" x2="100" y2="130" stroke="black" strokeWidth="2"/>
    <line x1="90" y1="180" x2="110" y2="180" stroke="black" strokeWidth="2"/>
    
    <!-- Resistor R1 -->
    <rect x="250" y="100" width="100" height="40" fill="none" stroke="black" strokeWidth="2"/>
    <text x="300" y="125" textAnchor="middle" fontFamily="Arial">R1</text>
    
    <!-- Resistor R2 -->
    <rect x="250" y="180" width="100" height="40" fill="none" stroke="black" strokeWidth="2"/>
    <text x="300" y="205" textAnchor="middle" fontFamily="Arial">R2</text>
    
    <!-- Wires -->
    <line x1="150" y1="100" x2="200" y2="100" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="100" x2="200" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="120" x2="250" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="120" x2="400" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="120" x2="400" y2="160" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="200" x2="400" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="200" x2="400" y2="240" stroke="black" strokeWidth="2"/>
    <line x1="150" y1="200" x2="200" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="200" x2="200" y2="240" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="240" x2="400" y2="240" stroke="black" strokeWidth="2"/>
    <line x1="250" y1="200" x2="250" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="140" x2="300" y2="180" stroke="black" strokeWidth="2"/>
    
    <!-- Output Voltage -->
    <line x1="300" y1="160" x2="350" y2="160" stroke="black" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="370" y="165" textAnchor="middle" fontFamily="Arial">Vout</text>
    
    <!-- Labels -->
    <text x="300" y="70" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Voltage Divider Circuit</text>
  </svg>`
}

function getCommonEmitterAmplifierSVG() {
  return `<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
    <!-- DC Supply -->
    <rect x="100" y="50" width="50" height="80" fill="none" stroke="black" strokeWidth="2"/>
    <text x="125" y="90" textAnchor="middle" fontFamily="Arial">Vcc</text>
    <line x1="90" y1="70" x2="110" y2="70" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="60" x2="100" y2="80" stroke="black" strokeWidth="2"/>
    <line x1="90" y1="110" x2="110" y2="110" stroke="black" strokeWidth="2"/>
    
    <!-- Transistor -->
    <circle cx="300" cy="200" r="30" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="170" x2="300" y2="230" stroke="black" strokeWidth="2"/>
    <line x1="270" y1="185" x2="270" y2="215" stroke="black" strokeWidth="2"/>
    <line x1="270" y1="200" x2="290" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="230" x2="300" y2="280" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="170" x2="300" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="120" x2="350" y2="120" stroke="black" strokeWidth="2"/>
    <polygon points="290,180 310,180 300,200" fill="black" stroke="black" strokeWidth="1"/>
    
    <!-- Collector Resistor -->
    <rect x="350" y="50" width="30" height="70" fill="none" stroke="black" strokeWidth="2"/>
    <text x="365" y="90" textAnchor="middle" fontFamily="Arial">Rc</text>
    
    <!-- Emitter Resistor -->
    <rect x="285" y="280" width="30" height="50" fill="none" stroke="black" strokeWidth="2"/>
    <text x="300" y="310" textAnchor="middle" fontFamily="Arial">Re</text>
    
    <!-- Base Resistor -->
    <rect x="200" y="185" width="70" height="30" fill="none" stroke="black" strokeWidth="2"/>
    <text x="235" y="205" textAnchor="middle" fontFamily="Arial">Rb</text>
    
    <!-- Input Capacitor -->
    <line x1="150" y1="185" x2="150" y2="215" stroke="black" strokeWidth="2"/>
    <line x1="170" y1="185" x2="170" y2="215" stroke="black" strokeWidth="2"/>
    <line x1="170" y1="200" x2="200" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="120" y1="200" x2="150" y2="200" stroke="black" strokeWidth="2"/>
    <text x="160" y="175" textAnchor="middle" fontFamily="Arial">Cin</text>
    
    <!-- Output Capacitor -->
    <line x1="400" y1="120" x2="400" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="420" y1="120" x2="420" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="365" y1="120" x2="400" y2="120" stroke="black" strokeWidth="2"/>
    <line x1="420" y1="120" x2="450" y2="120" stroke="black" strokeWidth="2"/>
    <text x="410" y="100" textAnchor="middle" fontFamily="Arial">Cout</text>
    
    <!-- Wires -->
    <line x1="150" y1="50" x2="150" y2="90" stroke="black" strokeWidth="2"/>
    <line x1="150" y1="50" x2="350" y2="50" stroke="black" strokeWidth="2"/>
    <line x1="365" y1="50" x2="365" y2="50" stroke="black" strokeWidth="2"/>
    <line x1="300" y1="330" x2="300" y2="350" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="350" x2="450" y2="350" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="130" x2="100" y2="350" stroke="black" strokeWidth="2"/>
    
    <!-- Input/Output -->
    <text x="120" y="205" textAnchor="middle" fontFamily="Arial">Vin</text>
    <text x="450" y="125" textAnchor="middle" fontFamily="Arial">Vout</text>
    
    <!-- Labels -->
    <text x="300" y="20" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Common Emitter Amplifier Circuit</text>
  </svg>`
}

function getAstableMultivibratorSVG() {
  return `<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
    <!-- Power Supply -->
    <rect x="280" y="50" width="60" height="40" fill="none" stroke="black" strokeWidth="2"/>
    <text x="310" y="75" textAnchor="middle" fontFamily="Arial">Vcc</text>
    
    <!-- Transistor Q1 -->
    <circle cx="200" cy="200" r="25" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="175" x2="200" y2="225" stroke="black" strokeWidth="2"/>
    <line x1="175" y1="185" x2="175" y2="215" stroke="black" strokeWidth="2"/>
    <line x1="175" y1="200" x2="195" y2="200" stroke="black" strokeWidth="2"/>
    <polygon points="190,180 210,180 200,200" fill="black" stroke="black" strokeWidth="1"/>
    <text x="170" y="200" textAnchor="end" fontFamily="Arial">Q1</text>
    
    <!-- Transistor Q2 -->
    <circle cx="400" cy="200" r="25" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="175" x2="400" y2="225" stroke="black" strokeWidth="2"/>
    <line x1="425" y1="185" x2="425" y2="215" stroke="black" strokeWidth="2"/>
    <line x1="405" y1="200" x2="425" y2="200" stroke="black" strokeWidth="2"/>
    <polygon points="390,180 410,180 400,200" fill="black" stroke="black" strokeWidth="1"/>
    <text x="430" y="200" textAnchor="start" fontFamily="Arial">Q2</text>
    
    <!-- Resistors -->
    <rect x="180" y="100" width="40" height="20" fill="none" stroke="black" strokeWidth="2"/>
    <text x="200" y="115" textAnchor="middle" fontFamily="Arial">R1</text>
    
    <rect x="380" y="100" width="40" height="20" fill="none" stroke="black" strokeWidth="2"/>
    <text x="400" y="115" textAnchor="middle" fontFamily="Arial">R2</text>
    
    <!-- Capacitors -->
    <line x1="250" y1="170" x2="250" y2="230" stroke="black" strokeWidth="2"/>
    <line x1="270" y1="170" x2="270" y2="230" stroke="black" strokeWidth="2"/>
    <text x="260" y="155" textAnchor="middle" fontFamily="Arial">C1</text>
    
    <line x1="330" y1="170" x2="330" y2="230" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="170" x2="350" y2="230" stroke="black" strokeWidth="2"/>
    <text x="340" y="155" textAnchor="middle" fontFamily="Arial">C2</text>
    
    <!-- Wires -->
    <line x1="200" y1="120" x2="200" y2="175" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="120" x2="400" y2="175" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="225" x2="200" y2="280" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="225" x2="400" y2="280" stroke="black" strokeWidth="2"/>
    <line x1="150" y1="280" x2="450" y2="280" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="100" x2="200" y2="90" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="100" x2="400" y2="90" stroke="black" strokeWidth="2"/>
    <line x1="200" y1="90" x2="280" y2="90" stroke="black" strokeWidth="2"/>
    <line x1="340" y1="90" x2="400" y2="90" stroke="black" strokeWidth="2"/>
    <line x1="310" y1="90" x2="310" y2="50" stroke="black" strokeWidth="2"/>
    <line x1="270" y1="200" x2="330" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="250" y1="200" x2="175" y2="200" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="200" x2="375" y2="200" stroke="black" strokeWidth="2"/>
    
    <!-- Output -->
    <line x1="400" y1="150" x2="450" y2="150" stroke="black" strokeWidth="2" strokeDasharray="5,5"/>
    <text x="470" y="155" textAnchor="middle" fontFamily="Arial">Output</text>
    
    <!-- Labels -->
    <text x="300" y="30" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Astable Multivibrator Circuit</text>
  </svg>`
}

function getSimpleCircuitSVG() {
  return `<svg width="500" height="300" xmlns="http://www.w3.org/2000/svg">
    <!-- Battery -->
    <rect x="100" y="120" width="40" height="80" fill="none" stroke="black" strokeWidth="2"/>
    <line x1="90" y1="140" x2="110" y2="140" stroke="black" strokeWidth="2"/>
    <line x1="100" y1="130" x2="100" y2="150" stroke="black" strokeWidth="2"/>
    <line x1="90" y1="180" x2="110" y2="180" stroke="black" strokeWidth="2"/>
    <text x="120" y="170" textAnchor="middle" fontFamily="Arial">V</text>
    
    <!-- Resistor -->
    <rect x="250" y="120" width="100" height="40" fill="none" stroke="black" strokeWidth="2"/>
    <text x="300" y="145" textAnchor="middle" fontFamily="Arial">R</text>
    
    <!-- Wires -->
    <line x1="140" y1="140" x2="250" y2="140" stroke="black" strokeWidth="2"/>
    <line x1="350" y1="140" x2="400" y2="140" stroke="black" strokeWidth="2"/>
    <line x1="400" y1="140" x2="400" y2="180" stroke="black" strokeWidth="2"/>
    <line x1="140" y1="180" x2="400" y2="180" stroke="black" strokeWidth="2"/>
    
    <!-- Labels -->
    <text x="250" y="80" textAnchor="middle" fontFamily="Arial" fontWeight="bold">Simple Circuit</text>
  </svg>`
}
