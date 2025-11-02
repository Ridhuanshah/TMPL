import { Globe, Package, Calendar, ClipboardList, CreditCard, Check, ChevronDown } from "lucide-react";
import { useState } from "react";

export function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      number: 1,
      icon: Globe,
      title: "Browse Destinations",
      description: "Explore our curated collection of travel packages organized by continent. Browse through stunning destinations from South America to Scandinavia, each with detailed itineraries and pricing.",
      features: [
        "Filter packages by continent or region",
        "View package pricing and duration",
        "Explore destination highlights",
        "Read customer reviews"
      ],
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
    },
    {
      number: 2,
      icon: Package,
      title: "Select Your Package",
      description: "Click on any destination card to view complete package details. Review the day-by-day itinerary, included activities, accommodation details, and total budget breakdown.",
      features: [
        "Detailed daily itinerary",
        "Duration and cities covered",
        "Activity icons and tags",
        "Transparent pricing with no hidden fees"
      ],
      image: "https://images.unsplash.com/photo-1488085061387-422e29b40080?w=800&q=80"
    },
    {
      number: 3,
      icon: Calendar,
      title: "Choose Departure Date",
      description: "Select your preferred departure date from our available options. Click the 'Select Date' button to view all upcoming departures with their respective pricing and availability.",
      features: [
        "Multiple departure dates available",
        "Real-time availability updates",
        "Fixed pricing per departure",
        "Easy date comparison"
      ],
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&q=80"
    },
    {
      number: 4,
      icon: ClipboardList,
      title: "Fill Booking Details",
      description: "Complete the booking form with participant information. You can add multiple travelers in a single booking. All fields are clearly labeled for your convenience.",
      features: [
        "Add multiple participants",
        "Personal details (Name, IC, Passport)",
        "Emergency contact information",
        "Nationality and date of birth"
      ],
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80"
    },
    {
      number: 5,
      icon: CreditCard,
      title: "Payment & Confirmation",
      description: "Choose your preferred payment method - either full settlement or deposit with installments. Upon successful payment, receive instant confirmation and downloadable booking receipt.",
      features: [
        "Flexible payment options",
        "Deposit: RM 1,000 + installments",
        "Full settlement option available",
        "Instant booking confirmation & receipt"
      ],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80"
    }
  ];

  const faqs = [
    {
      question: "How do I make a booking?",
      answer: "Simply browse our destinations, select your preferred package, choose a departure date, fill in your details, and proceed with payment. You'll receive instant confirmation via email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and bank transfers. You can choose to pay full settlement or make a deposit with installment payments."
    },
    {
      question: "Can I add multiple travelers in one booking?",
      answer: "Yes! During the checkout process, you can add as many participants as needed. Each traveler will need to provide their personal details including passport information and emergency contact."
    },
    {
      question: "What happens after I complete my booking?",
      answer: "You'll receive an instant booking confirmation email with a downloadable receipt. Our team will also send you detailed travel information and pre-departure instructions closer to your departure date."
    },
    {
      question: "Can I cancel or modify my booking?",
      answer: "Yes, you can cancel or modify your booking subject to our terms and conditions. Please refer to our refund policy or contact our support team for assistance."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-32 md:py-40">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&q=80"
            alt="How It Works Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-teal-700/85 via-teal-600/85 to-teal-800/85" />
        </div>

        <div className="container mx-auto px-6 text-center text-white relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">How It Works</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Your journey from browsing to booking in 5 simple steps
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-32 last:mb-0 ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              {/* Content */}
              <div className={index % 2 === 1 ? "lg:col-start-2" : ""}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-teal-600 text-white flex items-center justify-center text-2xl font-bold">
                    {step.number}
                  </div>
                  <step.icon className="w-12 h-12 text-teal-600" />
                </div>

                <h2 className="text-4xl font-bold mb-4">{step.title}</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {step.description}
                </p>

                <div className="space-y-3">
                  {step.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image */}
              <div className={index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""}>
                <div className="relative h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src={step.image}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about our booking process
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-teal-600 flex-shrink-0 transition-transform ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-5 text-muted-foreground">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support CTA Section */}
      <section className="py-20 relative text-white">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
            alt="Support Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-teal-700/90 via-teal-600/90 to-teal-700/90" />
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Need Help?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our support team is ready to assist you with your booking
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hi@tmplescapade.my"
              className="bg-white text-teal-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Email Us
            </a>
            <a
              href="tel:0196616388"
              className="bg-yellow-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-yellow-600 transition-colors"
            >
              Call: 019-661 6388
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
