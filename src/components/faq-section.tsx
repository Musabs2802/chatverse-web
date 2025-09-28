import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";

const faqs = [
  {
    question:
      "How is Chatverse different from subscribing to each AI separately?",
    answer:
      "AI Chatverse brings together the world&apos;s most powerful AI models — Grok 4, ChatGPT 5, Gemini 2.5 Pro, DeepSeek, Claude Sonnet 4, and Perplexity Sonar Pro — in one place. Instead of juggling multiple subscriptions and browser tabs, you get all answers side-by-side in a single interface, plus exclusive features like Prompt Enhancement and Custom Projects.",
  },
  {
    question: "Can I choose which AI models to use?",
    answer:
      "Yes! You can toggle AI models on or off at any time during your chat and turn them back on later without losing your chat history. This gives you full control over which models you want to compare for each query.",
  },
  {
    question: "Do I get unlimited messages?",
    answer:
      "You get 400,000 tokens per month with your subscription. Each token is approximately ¾ of a word. For most users, this is far more than needed — the average usage is around 200,000 tokens per month.",
  },
  {
    question: "What happens if I run out of tokens?",
    answer:
      "Once you reach your monthly limit, you can wait until your next billing cycle for tokens to refresh, or upgrade your plan when higher limits become available.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "No. All payments are non-refundable, regardless of usage. You may cancel any time to stop future billing.",
  },
  {
    question: "How can I manage or cancel my subscription?",
    answer:
      "Log in to AI Chatverse, go to Settings, and select your subscription management option. You can cancel anytime without penalty.",
  },
  {
    question: "Can I use AI Chatverse on my phone?",
    answer:
      "Yes! You can use AI Chatverse in your mobile browser or through our dedicated mobile apps for iOS and Android, giving you access to all features on the go.",
  },
  {
    question: "Will I get free upgrades when new AI versions are released?",
    answer:
      "Yes! If ChatGPT releases Model 6 or another AI provider launches a higher version, you will get access at no extra cost as part of your subscription.",
  },
];

export function FAQSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif font-extrabold text-3xl sm:text-4xl md:text-5xl mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about Chatverse at a glance.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl transition-shadow duration-300 hover:shadow-lg p-6"
              >
                <AccordionTrigger className="text-left font-serif text-lg hover:no-underline p-2">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-700 text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
