import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export function ComparisonDemo() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Watch Chatverse Catch
            <span className="text-primary"> What Others Miss</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Real question. Real answers. See which AI gets it right.
          </p>
        </div>

        {/* Sample Question */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border border-primary/20 hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-center font-serif text-2xl">
                Sample Question: "What's the best way to optimize React
                performance for large datasets?"
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-500/20 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <Badge className="bg-green-100 text-green-600">
                  2 out of 6 got it right
                </Badge>
              </div>
              <CardTitle className="text-lg text-green-600">
                Accurate & Actionable
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Provided comprehensive solutions including virtualization,
                memoization, and code splitting with specific implementation
                examples.
              </p>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <Badge className="bg-yellow-100 text-yellow-600">
                  3 out of 6 were incomplete
                </Badge>
              </div>
              <CardTitle className="text-lg text-yellow-600">
                Partial Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Mentioned some optimization techniques but lacked specific
                implementation details or missed key performance strategies.
              </p>
            </CardContent>
          </Card>

          <Card className="border-red-500/20 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <XCircle className="w-5 h-5 text-red-500" />
                <Badge className="bg-red-100 text-red-600">
                  1 out of 6 was wrong
                </Badge>
              </div>
              <CardTitle className="text-lg text-red-600">
                Misleading Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-700">
                Suggested outdated practices that could harm performance or
                provided incorrect technical information.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-6">
            This is why comparing matters — get the full picture every time.
          </p>
          <Button
            size="lg"
            className="bg-primary text-white hover:bg-primary/95 transition-colors"
            asChild
          >
            <Link href="/signup">Get smarter & more accurate AI answers</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
