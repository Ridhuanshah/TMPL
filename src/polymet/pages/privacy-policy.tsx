import { Shield, Eye, Lock, Database, Mail, Calendar } from 'lucide-react';

export function PrivacyPolicyPage() {
  const sections = [
    {
      id: 'information-collection',
      title: '1. Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: '1.1 Personal Information',
          text: 'When you book a travel package or create an account with TMPL Escapade, we collect personal information including but not limited to: your name, email address, phone number, passport details, date of birth, nationality, emergency contact information, and payment details.',
        },
        {
          subtitle: '1.2 Travel Preferences',
          text: 'We collect information about your travel preferences, dietary requirements, medical conditions (if disclosed), and special requests to ensure we provide the best service possible.',
        },
        {
          subtitle: '1.3 Automatically Collected Information',
          text: 'When you visit our website, we automatically collect certain information including your IP address, browser type, device information, pages visited, time spent on pages, and referring website addresses.',
        },
      ],
    },
    {
      id: 'use-of-information',
      title: '2. How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: '2.1 Service Delivery',
          text: 'We use your personal information to process bookings, arrange travel services, communicate with you about your trip, provide customer support, and send you important travel updates and documentation.',
        },
        {
          subtitle: '2.2 Marketing Communications',
          text: 'With your consent, we may send you promotional materials, travel deals, newsletters, and special offers. You can opt-out of marketing communications at any time by clicking the unsubscribe link in our emails.',
        },
        {
          subtitle: '2.3 Service Improvement',
          text: 'We analyze usage patterns and customer feedback to improve our website, services, and customer experience. This includes conducting market research and analyzing trends.',
        },
      ],
    },
    {
      id: 'data-sharing',
      title: '3. Information Sharing and Disclosure',
      icon: Lock,
      content: [
        {
          subtitle: '3.1 Service Providers',
          text: 'We share your information with trusted third-party service providers who assist us in operating our business, including airlines, hotels, tour operators, payment processors, and IT service providers. These parties are contractually obligated to protect your information.',
        },
        {
          subtitle: '3.2 Legal Requirements',
          text: 'We may disclose your information when required by law, in response to legal proceedings, to protect our rights or property, or to ensure the safety of our customers and employees.',
        },
        {
          subtitle: '3.3 Business Transfers',
          text: 'In the event of a merger, acquisition, or sale of assets, your personal information may be transferred to the acquiring entity, subject to the same privacy protections.',
        },
      ],
    },
    {
      id: 'data-security',
      title: '4. Data Security',
      icon: Shield,
      content: [
        {
          subtitle: '4.1 Security Measures',
          text: 'We implement industry-standard security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. This includes SSL encryption for data transmission, secure servers, and access controls.',
        },
        {
          subtitle: '4.2 Data Retention',
          text: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce our agreements. Booking records are typically retained for 7 years for tax and legal purposes.',
        },
      ],
    },
    {
      id: 'your-rights',
      title: '5. Your Rights and Choices',
      icon: Calendar,
      content: [
        {
          subtitle: '5.1 Access and Correction',
          text: 'You have the right to access, update, or correct your personal information at any time by logging into your account or contacting us directly.',
        },
        {
          subtitle: '5.2 Data Portability',
          text: 'You have the right to request a copy of your personal data in a structured, commonly used, and machine-readable format.',
        },
        {
          subtitle: '5.3 Deletion',
          text: 'You may request deletion of your personal information, subject to legal retention requirements and legitimate business purposes. Some information may need to be retained for bookkeeping and legal compliance.',
        },
        {
          subtitle: '5.4 Marketing Opt-Out',
          text: 'You can opt-out of receiving marketing communications at any time by clicking the unsubscribe link in our emails or updating your communication preferences in your account settings.',
        },
      ],
    },
    {
      id: 'cookies',
      title: '6. Cookies and Tracking Technologies',
      icon: Eye,
      content: [
        {
          subtitle: '6.1 Cookie Usage',
          text: 'We use cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and personalize content. Please refer to our Cookie Settings page for detailed information about the cookies we use and how to manage them.',
        },
        {
          subtitle: '6.2 Analytics',
          text: 'We use analytics services to understand how visitors interact with our website. This helps us improve our services and user experience.',
        },
      ],
    },
    {
      id: 'international-transfers',
      title: '7. International Data Transfers',
      icon: Database,
      content: [
        {
          subtitle: '',
          text: 'As a travel agency operating internationally, your personal information may be transferred to and processed in countries outside of Malaysia. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.',
        },
      ],
    },
    {
      id: 'children',
      title: '8. Children\'s Privacy',
      icon: Shield,
      content: [
        {
          subtitle: '',
          text: 'Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately.',
        },
      ],
    },
    {
      id: 'changes',
      title: '9. Changes to This Privacy Policy',
      icon: Calendar,
      content: [
        {
          subtitle: '',
          text: 'We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last Updated" date. Your continued use of our services after changes indicates your acceptance of the updated policy.',
        },
      ],
    },
    {
      id: 'contact',
      title: '10. Contact Us',
      icon: Mail,
      content: [
        {
          subtitle: '',
          text: 'If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:',
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-8 h-8 text-yellow-500" />
            <h1 className="text-3xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Last Updated:</strong> November 3, 2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            At TMPL Escapade, we are committed to protecting your privacy and ensuring the security of your personal information. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services or visit our website.
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-blue-900 mb-3">Table of Contents</h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
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
            <p>123 Travel Street, Kuala Lumpur, Malaysia</p>
            <p>Email: <a href="mailto:privacy@tmplescapade.my" className="text-yellow-600 hover:text-yellow-700 underline">privacy@tmplescapade.my</a></p>
            <p>Phone: <a href="tel:+60312345678" className="text-yellow-600 hover:text-yellow-700 underline">+60 3-1234 5678</a></p>
            <p className="mt-4 text-sm">
              For data protection inquiries, please mark your correspondence "ATTENTION: Data Protection Officer"
            </p>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Information</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="/cookie-settings"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
            >
              Cookie Settings
            </a>
            <a
              href="/terms"
              className="inline-flex items-center px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
