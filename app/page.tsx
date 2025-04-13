import { CircuitGenerator } from "@/components/circuit-generator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold">Engineering Circuit Visualizer</h1>
        <CircuitGenerator />
      </div>
    </main>
  )
}
