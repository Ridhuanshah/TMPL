import { Shield, AlertCircle, Calendar, CreditCard, FileText, Ban, CheckCircle, Clock, Phone } from "lucide-react";

export function RefundPolicyPage() {
  const sections = [
    {
      id: "overview",
      icon: Shield,
      title: "1. Refund Policy Overview",
      content: `This Refund Policy outlines the terms and conditions under which TMPL ESCAPADE & TOURS SDN. BHD. processes cancellations and refunds for travel bookings. We understand that travel plans can change, and we strive to be as fair and transparent as possible while balancing the costs we incur with our suppliers.`,
    },
    {
      id: "cancellation-by-customer",
      icon: Calendar,
      title: "2. Cancellation by Customer",
      subsections: [
        {
          subtitle: "2.1 Cancellation Timeline and Charges",
          content: `All cancellations must be submitted in writing via email to hi@tmplescapade.my. The cancellation date will be determined by the date we receive your written cancellation notice. Cancellation charges are as follows:

• More than 60 days before departure: 10% of total package cost
• 45-60 days before departure: 30% of total package cost
• 30-44 days before departure: 50% of total package cost
• 15-29 days before departure: 75% of total package cost
• Less than 15 days before departure or no-show: 100% of total package cost (no refund)`,
        },
        {
          subtitle: "2.2 Peak Season Cancellations",
          content: `For bookings during peak seasons (December-January, Chinese New Year, Hari Raya, school holidays), stricter cancellation terms may apply. Peak season cancellations may incur a minimum 50% cancellation charge regardless of timing. These terms will be clearly communicated at the time of booking.`,
        },
        {
          subtitle: "2.3 Non-Refundable Components",
          content: `Certain components of your travel package may be non-refundable once confirmed:
• Airline tickets (subject to airline policies)
• Hotel reservations with non-refundable rates
• Special event tickets (concerts, sports, cultural events)
• Visa and documentation fees
• Travel insurance premiums
• Special permits (national parks, restricted areas)
• Pre-paid activities and excursions`,
        },
      ],
    },
    {
      id: "refund-process",
      icon: CreditCard,
      title: "3. Refund Processing",
      subsections: [
        {
          subtitle: "3.1 Refund Timeline",
          content: `Approved refunds will be processed within 14-30 working days from the date of cancellation approval. The actual time for funds to appear in your account may vary depending on your bank or payment provider. Refunds will be issued to the original payment method used for booking.`,
        },
        {
          subtitle: "3.2 Refund Calculation",
          content: `Refund amounts are calculated based on:
• Applicable cancellation charges as per our policy
• Supplier cancellation penalties and non-refundable costs
• Bank or payment gateway charges (if applicable)
• Administrative processing fees

The final refund amount will be communicated to you in writing before processing.`,
        },
        {
          subtitle: "3.3 Partial Refunds",
          content: `If you cancel only part of your booking (e.g., reducing number of travelers or removing certain services), refunds will be calculated on a pro-rata basis, subject to supplier terms and minimum booking requirements. Additional fees may apply for booking modifications.`,
        },
      ],
    },
    {
      id: "cancellation-by-company",
      icon: Ban,
      title: "4. Cancellation by TMPL Escapade",
      subsections: [
        {
          subtitle: "4.1 Company-Initiated Cancellations",
          content: `We reserve the right to cancel any booking due to:
• Insufficient participant numbers to operate the tour
• Force majeure events (natural disasters, political unrest, pandemics)
• Safety and security concerns
• Circumstances beyond our reasonable control

In such cases, we will notify you as soon as possible and offer:
• Full refund of all payments made, OR
• Alternative travel dates or destinations of equal or greater value
• Credit note valid for 12 months for future bookings`,
        },
        {
          subtitle: "4.2 No Additional Compensation",
          content: `If we cancel your booking, our liability is limited to the refund of amounts paid to us. We are not responsible for any additional costs you may have incurred such as visa fees, travel insurance, connecting flights, time off work, or other consequential losses.`,
        },
      ],
    },
    {
      id: "special-circumstances",
      icon: AlertCircle,
      title: "5. Special Circumstances",
      subsections: [
        {
          subtitle: "5.1 Medical Emergencies",
          content: `If you need to cancel due to a medical emergency affecting you or an immediate family member, you must provide:
• Medical certificate from a registered medical practitioner
• Proof of the emergency (hospital admission records, death certificate, etc.)
• Written cancellation request within 48 hours of the incident

We will work with you to minimize cancellation charges where possible, but refunds are still subject to supplier terms and our policy. This is why we strongly recommend comprehensive travel insurance.`,
        },
        {
          subtitle: "5.2 Travel Insurance Claims",
          content: `We strongly recommend purchasing comprehensive travel insurance at the time of booking. Many cancellation scenarios may be covered by travel insurance policies. We can assist you with documentation needed for insurance claims, but we are not responsible for insurance claim approvals or denials.`,
        },
        {
          subtitle: "5.3 Travel Advisories and Restrictions",
          content: `If official travel advisories or government-imposed travel restrictions are issued for your destination:
• You may cancel your booking with reduced penalties
• We will work with suppliers to minimize losses
• Refund amounts will depend on supplier policies and timing
• Travel insurance may provide additional coverage

Personal concerns or changes in travel comfort levels not related to official advisories do not qualify for special consideration.`,
        },
      ],
    },
    {
      id: "modifications",
      icon: FileText,
      title: "6. Booking Modifications",
      subsections: [
        {
          subtitle: "6.1 Date Changes",
          content: `If you wish to change your travel dates rather than cancel:
• Requests must be made at least 45 days before departure
• Subject to availability and supplier approval
• Fare and rate differences may apply
• Modification fee: MYR 200 per person
• Any increase in costs must be paid before changes are confirmed`,
        },
        {
          subtitle: "6.2 Name Changes",
          content: `Name changes may be permitted subject to:
• Airline and supplier policies (many do not allow name changes)
• Submission at least 60 days before departure
• Administrative fee: MYR 300 per name change
• All applicable fare and rate differences
• Providing valid documentation for the new traveler`,
        },
        {
          subtitle: "6.3 Itinerary Changes",
          content: `Changes to your itinerary (destinations, hotels, activities) may be possible:
• Requests must be made at least 60 days before departure
• Subject to availability and feasibility
• May result in complete repricing of the package
• Changes may affect the entire group booking if applicable`,
        },
      ],
    },
    {
      id: "no-show",
      icon: Clock,
      title: "7. No-Show Policy",
      content: `If you fail to show up for your scheduled departure without prior cancellation:
• No refund will be provided for any unused services
• The entire package cost is forfeited
• You will be responsible for any additional costs incurred by the company
• Future bookings may require full payment in advance

We strongly encourage you to contact us immediately if you anticipate missing your departure.`,
    },
    {
      id: "group-bookings",
      icon: CheckCircle,
      title: "8. Group Bookings",
      subsections: [
        {
          subtitle: "8.1 Group Cancellation Terms",
          content: `For group bookings (10 or more passengers):
• Specific group terms will be outlined in your group contract
• Partial cancellations may affect group pricing for remaining passengers
• Different cancellation deadlines may apply
• Minimum group size requirements must be maintained
• Group deposits are generally non-refundable`,
        },
        {
          subtitle: "8.2 Group Coordinator Responsibilities",
          content: `The group coordinator is responsible for:
• Communicating cancellation policies to all group members
• Collecting payments and managing refunds within the group
• Notifying us of any changes to group composition
• Ensuring minimum group numbers are maintained`,
        },
      ],
    },
    {
      id: "disputes",
      icon: Phone,
      title: "9. Refund Disputes and Resolution",
      content: `If you disagree with a refund decision:

1. Contact our customer service team in writing within 7 days
2. Provide detailed explanation and supporting documentation
3. We will review your case and respond within 14 working days
4. If unresolved, you may escalate to:
   • Malaysian Association of Tour and Travel Agents (MATTA)
   • Ministry of Tourism Malaysia
   • Consumer Claims Tribunal (for claims under RM 50,000)

We are committed to fair and transparent resolution of all disputes.`,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-black" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Refund Policy</h1>
          </div>
          <p className="text-lg text-gray-700 mb-2">
            <strong>Last Updated:</strong> November 3, 2025
          </p>
          <p className="text-gray-600 leading-relaxed">
            This Refund Policy applies to all bookings made with TMPL ESCAPADE & TOURS SDN. BHD. 
            Please read this policy carefully before making a booking, as it forms part of your contract 
            with us. We recommend purchasing travel insurance to protect against unforeseen circumstances.
          </p>
        </div>

        {/* Important Notice */}
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 mb-8 rounded-r-lg">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-lg font-semibold text-yellow-900 mb-2">
                Important Notice
              </h3>
              <p className="text-yellow-800">
                All cancellations must be submitted in writing to hi@tmplescapade.my. 
                Verbal cancellations or cancellations through third parties will not be accepted. 
                We strongly recommend purchasing comprehensive travel insurance at the time of booking 
                to protect against unexpected cancellation circumstances.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section) => {
            const IconComponent = section.icon;
            return (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {section.title}
                    </h2>
                    {section.content && (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {section.content}
                      </p>
                    )}
                    {section.subsections && (
                      <div className="space-y-4 mt-4">
                        {section.subsections.map((subsection, idx) => (
                          <div key={idx} className="pl-4 border-l-2 border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                              {subsection.subtitle}
                            </h3>
                            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {subsection.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact Information */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-yellow-900 mb-3">Contact Information</h3>
          <div className="space-y-2 text-gray-800">
            <p><strong>TMPL ESCAPADE & TOURS SDN. BHD.</strong></p>
            <p>Company Registration No: 1522397X / 202301028474</p>
            <p>Tourism License No: KPL/LN 1234</p>
            <p className="mt-3">Pusat Perdagangan Hillpark, Bandar Puncak Alam, 42300, Puncak Alam, Selangor</p>
            <p>Email: <a href="mailto:hi@tmplescapade.my" className="text-yellow-600 hover:text-yellow-700 underline">hi@tmplescapade.my</a></p>
            <p>Phone: <a href="tel:+60198816388" className="text-yellow-600 hover:text-yellow-700 underline">019-8816388</a></p>
            <p>Operating Hours: Mon-Fri: 9:00 AM - 6:00 PM, Sat-Sun: 8:00 AM - 4:00 PM (GMT+8)</p>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Related Information</h3>
          <div className="flex flex-wrap gap-3">
            <a
              href="/terms"
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-medium rounded-lg transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/privacy"
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/cookie-settings"
              className="inline-flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium rounded-lg transition-colors"
            >
              Cookie Settings
            </a>
          </div>
        </div>

        <p className="text-gray-600 text-sm mt-8 text-center">
          By making a booking with TMPL Escapade, you acknowledge that you have read, understood, 
          and agree to be bound by this Refund Policy. If you have any questions, please contact 
          us before making your booking.
        </p>
      </div>
    </div>
  );
}
