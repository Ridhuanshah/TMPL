import { FileText, AlertCircle, CreditCard, XCircle, Shield, Scale, Users, Globe } from 'lucide-react';

export function TermsOfServicePage() {
  const sections = [
    {
      id: 'acceptance',
      title: '1. Acceptance of Terms',
      icon: FileText,
      content: [
        {
          subtitle: '',
          text: 'By accessing and using the TMPL Escapade website and services, you accept and agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use our services. These terms apply to all visitors, users, and customers of our travel services.',
        },
      ],
    },
    {
      id: 'services',
      title: '2. Services Provided',
      icon: Globe,
      content: [
        {
          subtitle: '2.1 Travel Packages',
          text: 'TMPL Escapade offers curated travel packages, tour arrangements, accommodation bookings, transportation services, and related travel services. All package details, including itineraries, pricing, and inclusions, are subject to availability and may change without prior notice.',
        },
        {
          subtitle: '2.2 Service Accuracy',
          text: 'While we strive to provide accurate and up-to-date information, we do not guarantee the accuracy, completeness, or reliability of any content on our website. Travel arrangements are subject to the terms and conditions of third-party service providers.',
        },
      ],
    },
    {
      id: 'booking',
      title: '3. Booking and Reservations',
      icon: FileText,
      content: [
        {
          subtitle: '3.1 Booking Process',
          text: 'All bookings must be made through our website, authorized agents, or directly with our customer service team. A booking is confirmed only upon receipt of full payment or the required deposit and issuance of a booking confirmation.',
        },
        {
          subtitle: '3.2 Booking Confirmation',
          text: 'Upon successful booking, you will receive a confirmation email containing your booking reference number, package details, payment information, and important travel information. Please review this information carefully and contact us immediately if any details are incorrect.',
        },
        {
          subtitle: '3.3 Passenger Information',
          text: 'You are responsible for providing accurate personal information, including passport details, dietary requirements, medical conditions, and emergency contact information. Incorrect information may result in additional charges or booking cancellation.',
        },
      ],
    },
    {
      id: 'payment',
      title: '4. Payment Terms',
      icon: CreditCard,
      content: [
        {
          subtitle: '4.1 Payment Methods',
          text: 'We accept payments via credit/debit cards (Visa, Mastercard), online banking (FPX), and authorized payment gateways. All payments are processed securely through our payment partners.',
        },
        {
          subtitle: '4.2 Pricing',
          text: 'All prices are displayed in Malaysian Ringgit (MYR) unless otherwise stated. Prices include applicable taxes and service charges unless explicitly mentioned. We reserve the right to modify prices at any time, but confirmed bookings will honor the original price.',
        },
        {
          subtitle: '4.3 Deposit and Full Payment',
          text: 'A deposit of 30% is required to confirm most bookings, with the balance due at least 45 days before departure. Full payment is required immediately for bookings made within 45 days of departure. Failure to make timely payments may result in booking cancellation.',
        },
        {
          subtitle: '4.4 Additional Charges',
          text: 'Additional charges may apply for optional activities, travel insurance, visa fees, airport transfers, single room supplements, and other extras not included in the package price. These will be clearly communicated before confirmation.',
        },
      ],
    },
    {
      id: 'cancellation',
      title: '5. Cancellation and Refund Policy',
      icon: XCircle,
      content: [
        {
          subtitle: '5.1 Cancellation by Customer',
          text: 'Cancellations must be made in writing via email to info@tmplescapade.my. Cancellation charges apply as follows: More than 60 days before departure - 10% of total cost; 45-60 days - 30%; 30-44 days - 50%; 15-29 days - 75%; Less than 15 days or no-show - 100% of total cost.',
        },
        {
          subtitle: '5.2 Cancellation by TMPL Escapade',
          text: 'We reserve the right to cancel any booking due to insufficient numbers, force majeure events, safety concerns, or other circumstances beyond our control. In such cases, we will offer alternative arrangements or a full refund. We are not liable for any consequential losses.',
        },
        {
          subtitle: '5.3 Refund Processing',
          text: 'Approved refunds will be processed within 14-21 working days to the original payment method. Bank processing times may vary. Refunds are subject to cancellation charges and non-refundable deposits paid to third-party suppliers.',
        },
        {
          subtitle: '5.4 Changes to Bookings',
          text: 'Changes to confirmed bookings are subject to availability and may incur amendment fees. Changes requested within 30 days of departure may not be possible. All change requests must be made in writing.',
        },
      ],
    },
    {
      id: 'responsibilities',
      title: '6. Customer Responsibilities',
      icon: Users,
      content: [
        {
          subtitle: '6.1 Travel Documents',
          text: 'You are responsible for obtaining and carrying valid passports, visas, travel permits, vaccination certificates, and any other required documentation. TMPL Escapade is not liable for any consequences arising from incomplete or invalid documentation.',
        },
        {
          subtitle: '6.2 Health and Fitness',
          text: 'You must ensure you are medically and physically fit to undertake the travel activities included in your package. Please inform us of any medical conditions, dietary restrictions, or special requirements at the time of booking.',
        },
        {
          subtitle: '6.3 Travel Insurance',
          text: 'We strongly recommend purchasing comprehensive travel insurance covering trip cancellation, medical expenses, evacuation, baggage loss, and personal liability. TMPL Escapade is not responsible for costs arising from uninsured events.',
        },
        {
          subtitle: '6.4 Conduct',
          text: 'You agree to behave respectfully toward other travelers, guides, local communities, and service providers. We reserve the right to remove any customer from a tour for disruptive behavior, with no refund provided.',
        },
      ],
    },
    {
      id: 'liability',
      title: '7. Limitation of Liability',
      icon: Shield,
      content: [
        {
          subtitle: '7.1 Third-Party Services',
          text: 'TMPL Escapade acts as an intermediary for transportation, accommodation, and activity providers. We are not responsible for acts, omissions, or defaults of third-party service providers, including airlines, hotels, and tour operators.',
        },
        {
          subtitle: '7.2 Force Majeure',
          text: 'We are not liable for failure to perform our obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, pandemics, government actions, strikes, or technical failures.',
        },
        {
          subtitle: '7.3 Maximum Liability',
          text: 'Our maximum liability for any claim arising from our services shall not exceed the total amount paid by you for the specific booking in question. We are not liable for indirect, consequential, or punitive damages.',
        },
        {
          subtitle: '7.4 Personal Belongings',
          text: 'You are responsible for the security of your personal belongings throughout your trip. TMPL Escapade is not liable for loss, theft, or damage to personal property.',
        },
      ],
    },
    {
      id: 'intellectual-property',
      title: '8. Intellectual Property',
      icon: Shield,
      content: [
        {
          subtitle: '8.1 Website Content',
          text: 'All content on the TMPL Escapade website, including text, graphics, logos, images, videos, and software, is the property of TMPL Escapade or its licensors and is protected by intellectual property laws.',
        },
        {
          subtitle: '8.2 Usage Restrictions',
          text: 'You may not reproduce, distribute, modify, or create derivative works from any content on our website without our express written permission. Commercial use of any content is strictly prohibited.',
        },
      ],
    },
    {
      id: 'privacy',
      title: '9. Privacy and Data Protection',
      icon: AlertCircle,
      content: [
        {
          subtitle: '',
          text: 'Your use of our services is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information. By using our services, you consent to our data practices as described in the Privacy Policy.',
        },
      ],
    },
    {
      id: 'disputes',
      title: '10. Governing Law and Dispute Resolution',
      icon: Scale,
      content: [
        {
          subtitle: '10.1 Governing Law',
          text: 'These Terms of Service are governed by and construed in accordance with the laws of Malaysia. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the Malaysian courts.',
        },
        {
          subtitle: '10.2 Dispute Resolution',
          text: 'We encourage customers to contact us directly to resolve any disputes or complaints. If a resolution cannot be reached through direct communication, disputes may be submitted to mediation or arbitration before pursuing legal action.',
        },
      ],
    },
    {
      id: 'general',
      title: '11. General Provisions',
      icon: FileText,
      content: [
        {
          subtitle: '11.1 Amendments',
          text: 'We reserve the right to modify these Terms of Service at any time. Updated terms will be posted on our website with a revised "Last Updated" date. Continued use of our services after changes constitutes acceptance of the modified terms.',
        },
        {
          subtitle: '11.2 Severability',
          text: 'If any provision of these terms is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.',
        },
        {
          subtitle: '11.3 Entire Agreement',
          text: 'These Terms of Service, together with our Privacy Policy and any booking confirmations, constitute the entire agreement between you and TMPL Escapade regarding the use of our services.',
        },
      ],
    },
    {
      id: 'contact',
      title: '12. Contact Information',
      icon: Users,
      content: [
        {
          subtitle: '',
          text: 'For questions about these Terms of Service or any aspect of our services, please contact us:',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Terms of Service</h1>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Last Updated:</strong> November 3, 2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            Welcome to TMPL Escapade. These Terms of Service ("Terms") govern your use of our website and travel services. 
            Please read these terms carefully before making any bookings or using our services.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">Important Notice</h3>
              <p className="text-yellow-800 text-sm leading-relaxed">
                By making a booking with TMPL Escapade, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
                Please ensure you are familiar with our cancellation policies and payment terms before confirming your booking.
              </p>
            </div>
          </div>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Table of Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div key={section.id} id={section.id} className="bg-white rounded-lg shadow-sm p-8 scroll-mt-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-yellow-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mt-2">{section.title}</h2>
                </div>
                <div className="space-y-4 ml-16">
                  {section.content.map((item, index) => (
                    <div key={index}>
                      {item.subtitle && (
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">{item.subtitle}</h3>
                      )}
                      <p className="text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-6">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Contact Information</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>TMPL Escapade Sdn Bhd</strong></p>
            <p>Company Registration No: 202401234567 (1234567-X)</p>
            <p>Tourism License No: KPL/LN 1234</p>
            <p className="mt-3">123 Travel Street, Kuala Lumpur, Malaysia</p>
            <p>Email: <a href="mailto:info@tmplescapade.my" className="text-yellow-600 hover:text-yellow-700 underline">info@tmplescapade.my</a></p>
            <p>Phone: <a href="tel:+60312345678" className="text-yellow-600 hover:text-yellow-700 underline">+60 3-1234 5678</a></p>
            <p>Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)</p>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Information</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="/privacy"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-settings"
              className="inline-flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Cookie Settings
            </a>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 mt-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            By clicking "I Agree" or proceeding with a booking, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. 
            If you do not agree with any part of these terms, please do not use our services or make any bookings.
          </p>
        </div>
      </div>
    </div>
  );
}
