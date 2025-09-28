import { Button } from "../components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-36 bg-gradient-to-br from-gray-50 to-white">
      {/* Background decorative shapes */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-primary/10 rounded-full filter blur-3xl animate-blob" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-primary/5 rounded-full filter blur-3xl animate-blob animation-delay-2000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 animate-fadeIn">
            <Sparkles className="w-4 h-4" />
            Built for AI Professionals
          </div>

          {/* Main heading */}
          <h1 className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-gray-900 animate-fadeIn delay-200">
            World&apos;s Most Powerful AIs.
            <br />
            <span className="text-primary">One</span> Platform.
            <br />
            <span className="text-primary">One</span> Subscription.
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeIn delay-400">
            Stop juggling tabs and subscriptions. Compare responses from
            ChatGPT, Claude, Gemini, and more side-by-side for just{" "}
            <span className="text-primary font-semibold">$5</span>. That&apos;s
            90% less than individual subscriptions.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-12 animate-fadeIn delay-600">
            <Button
              size="lg"
              className="text-lg px-10 py-5 shadow-lg hover:shadow-xl transition-all bg-primary text-white"
              asChild
            >
              <Link
                href={`${process.env.NEXT_PUBLIC_CHATVERSE_APP_URL}/signup`}
                className="flex items-center gap-2"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-10 py-5 border-gray-300 hover:bg-gray-100 transition-colors"
              asChild
            >
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>

          {/* Social proof */}
          <p className="text-gray-500 text-sm animate-fadeIn delay-800">
            Trusted by 10,000+ AI professionals and researchers
          </p>
        </div>
      </div>
    </section>
  );
}
