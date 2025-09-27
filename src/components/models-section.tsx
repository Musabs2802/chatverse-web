import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";

const models = [
  {
    name: "ChatGPT 5",
    specialty: "All Rounder Explainer",
    description:
      "Great for questions, brainstorming, and clear step-by-step explanations",
    color: "bg-green-100 text-green-600",
  },
  {
    name: "Claude Sonnet 4",
    specialty: "Co-Writing Master",
    description:
      "Refines polished emails, essays, and scripts while keeping your style.",
    color: "bg-orange-100 text-orange-600",
  },
  {
    name: "Gemini 2.5 Pro",
    specialty: "Long Context Master",
    description:
      "Handles long documents and images, tracking full context and details.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    name: "Perplexity Sonar Pro",
    specialty: "Live Web Researcher",
    description:
      "Delivers fresh answers and news from credible, real-time sources.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    name: "DeepSeek",
    specialty: "Reasoning Specialist",
    description:
      "Excels at logic, math, and coding with clear, detailed solutions.",
    color: "bg-cyan-100 text-cyan-600",
  },
  {
    name: "Grok 4",
    specialty: "Creative Powerhouse",
    description:
      "Bold, unconventional ideas and punchy copy for trend-focused content.",
    color: "bg-pink-100 text-pink-600",
  },
];

export function ModelsSection() {
  return (
    <section id="models" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Pick the best characteristics
            <span className="text-primary"> of each AI model</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Each AI has unique strengths — choose the model that fits your task
            perfectly.
          </p>
        </div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
            >
              <CardHeader className="mb-2">
                <CardTitle className="font-serif text-xl">
                  {model.name}
                </CardTitle>
                <Badge
                  className={`bg-primary/10 text-primary px-2 py-1`}
                  variant="secondary"
                >
                  {model.specialty}
                </Badge>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700">
                  {model.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
