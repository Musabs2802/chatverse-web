import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  LayoutGrid,
  Zap,
  ImageIcon,
  Settings,
  Clock,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Compare All Premium AIs at Once",
    description:
      "Get responses from ChatGPT, Claude, Gemini, Perplexity, and more in one view. Compare their answers side-by-side to find the most accurate solution.",
    benefits: [
      "Save hours of manual comparison",
      "Customize your AI team instantly",
      "Never miss the most accurate answer again",
    ],
  },
  {
    icon: Zap,
    title: "Instant Prompt Enhancement",
    description:
      "No need to craft the perfect question. Just write what you want, hit Enhance Prompt, and watch every AI respond with smarter, richer answers.",
    benefits: [
      "Turn rough ideas into perfect prompts",
      "Get 10x better responses instantly",
      "No prompt engineering skills needed",
    ],
  },
  {
    icon: ImageIcon,
    title: "Image Generation & Audio Transcription",
    description:
      "Bring your creative ideas to life with AI-powered image generation and get fast, accurate audio transcription — no extra tools needed.",
    benefits: [
      "Generate high-quality images for any purpose",
      "Get instant, clear transcripts from audio",
      "Effortlessly edit outputs for your needs",
    ],
  },
  {
    icon: Settings,
    title: "Custom Projects with System Instructions",
    description:
      'Create unique projects with tailored guidelines. Set "Marketing Mode" or "Code Review Mode" once, ensuring every AI follows your project\'s direction.',
    benefits: [
      "One-time setup keeps all AI replies on-brand",
      "Instantly switch modes across chats",
      "Maintain consistent tone without repetition",
    ],
  },
  {
    icon: Clock,
    title: "400,000 Tokens/Month",
    description:
      "Generous token allowance that covers most professional use cases. Each token is approximately ¾ of a word.",
    benefits: [
      "More than enough for daily use",
      "Track usage in real-time",
      "No surprise overages",
    ],
  },
  {
    icon: Shield,
    title: "Enterprise-Grade Security",
    description:
      "Your conversations and data are protected with industry-standard encryption and privacy controls.",
    benefits: [
      "End-to-end encryption",
      "No data training on your inputs",
      "GDPR compliant",
    ],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            One Platform. Six Perspectives.
            <span className="text-primary"> Optimal Efficiency.</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Every feature is designed to amplify your AI-powered productivity.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border border-gray-200 hover:shadow-lg transition-shadow duration-300"
            >
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-serif text-xl text-gray-900">
                  {feature.title}
                </CardTitle>
                <CardDescription className="text-gray-600 text-sm mt-1">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mt-2">
                  {feature.benefits.map((benefit, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-600 text-sm"
                    >
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
