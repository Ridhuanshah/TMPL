import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DownloadIcon,
  ShareIcon,
  PrinterIcon,
  MailIcon,
  MessageSquareIcon,
  CopyIcon,
  QrCodeIcon,
} from "lucide-react";
import { Booking } from "@/polymet/data/booking-data";
import { getEnhancedPaymentData } from "@/polymet/data/enhanced-payment-data";

interface PaymentInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  booking: Booking | null;
  onInvoiceShared?: (booking: Booking, method: string) => void;
}

export function PaymentInvoiceDialog({
  open,
  onOpenChange,
  booking,
  onInvoiceShared,
}: PaymentInvoiceDialogProps) {
  if (!booking) return null;

  const enhancedData = getEnhancedPaymentData(booking.id);
  const outstandingAmount = booking.totalAmount - booking.paidAmount;
  const currentDate = new Date().toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formatCurrency = (amount: number) => {
    return `RM ${amount.toLocaleString("en-MY", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Calculate SST (6% for services)
  const sstRate = 0.06;
  const subtotalAmount = booking.totalAmount / (1 + sstRate);
  const sstAmount = booking.totalAmount - subtotalAmount;
  const paidSubtotal = booking.paidAmount / (1 + sstRate);
  const paidSST = booking.paidAmount - paidSubtotal;
  const outstandingSubtotal = subtotalAmount - paidSubtotal;
  const outstandingSST = sstAmount - paidSST;

  // Generate invoice number with proper format
  const invoiceNumber = `INV-${new Date().getFullYear()}-${booking.bookingNumber.replace("TMPL-", "")}`;

  // Generate QR Code data for LHDN compliance
  const qrCodeData = {
    invoiceNumber,
    supplierTIN: "C12345678901",
    buyerTIN: "N/A", // Individual customer
    totalAmount: booking.totalAmount.toFixed(2),
    sstAmount: sstAmount.toFixed(2),
    invoiceDate: new Date().toISOString().split("T")[0],
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-MY", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = (method: string) => {
    if (onInvoiceShared) {
      onInvoiceShared(booking, method);
    }

    // Simulate sharing actions
    switch (method) {
      case "email":
        console.log(`Sending invoice via email to ${booking.customer.email}`);
        break;
      case "whatsapp":
        console.log(
          `Sharing invoice via WhatsApp to ${booking.customer.phone}`
        );
        break;
      case "download":
        console.log("Downloading invoice as PDF");
        break;
      case "print":
        window.print();
        break;
      case "copy":
        navigator.clipboard.writeText(`Invoice for ${booking.bookingNumber}`);
        break;
    }
  };

  const getPaymentStatusBadge = () => {
    if (booking.paymentStatus === "paid") {
      return (
        <Badge className="bg-green-100 text-green-800">PAID IN FULL</Badge>
      );
    } else if (booking.paymentStatus === "partial") {
      return (
        <Badge className="bg-orange-100 text-orange-800">PARTIAL PAYMENT</Badge>
      );
    } else {
      return <Badge className="bg-red-100 text-red-800">PAYMENT PENDING</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">
            Payment Invoice
          </DialogTitle>
          <DialogDescription>
            Professional invoice for payment collection -{" "}
            {booking.bookingNumber}
          </DialogDescription>
        </DialogHeader>

        {/* Invoice Content */}
        <div className="p-6 bg-white text-black print:p-0" id="invoice-content">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-blue-600 mb-2">
                TMPL ESCAPADE SDN BHD
              </h1>
              <p className="text-gray-600 font-medium">Travel & Tour Agency</p>
              <div className="text-sm text-gray-600 space-y-1">
                <p>
                  No. 123, Jalan Bukit Bintang, 55100 Kuala Lumpur, Malaysia
                </p>
                <p>Tel: +60 3-2148 8888 | Fax: +60 3-2148 8889</p>
                <p>
                  Email: finance@tmplescapade.com | Web: www.tmplescapade.com
                </p>
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p>
                    <span className="font-medium">
                      Company Registration No:
                    </span>{" "}
                    202301234567 (1234567-A)
                  </p>
                  <p>
                    <span className="font-medium">SST Registration No:</span>{" "}
                    C12345678901
                  </p>
                  <p>
                    <span className="font-medium">Tourism License No:</span>{" "}
                    KPL/LN/1234
                  </p>
                  <p>
                    <span className="font-medium">MATTA Membership No:</span>{" "}
                    MA1234
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h2 className="text-2xl font-bold mb-3 text-blue-700">
                  TAX INVOICE
                </h2>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Invoice No:</span>{" "}
                    {invoiceNumber}
                  </p>
                  <p>
                    <span className="font-medium">Invoice Date:</span>{" "}
                    {currentDate}
                  </p>
                  <p>
                    <span className="font-medium">Due Date:</span>{" "}
                    {enhancedData?.nextPaymentDue
                      ? formatDate(enhancedData.nextPaymentDue.dueDate)
                      : "Upon Receipt"}
                  </p>
                  <p>
                    <span className="font-medium">Currency:</span> MYR
                  </p>
                  <p>
                    <span className="font-medium">Exchange Rate:</span> 1.0000
                  </p>
                </div>
                <div className="mt-3">{getPaymentStatusBadge()}</div>
              </div>

              {/* QR Code for LHDN e-Invoice */}
              <div className="mt-4 flex justify-end">
                <div className="bg-white p-3 border rounded-lg text-center">
                  <QrCodeIcon className="h-16 w-16 mx-auto text-gray-400 mb-2" />

                  <p className="text-xs text-gray-500">LHDN e-Invoice QR</p>
                  <p className="text-xs font-mono">{invoiceNumber}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Bill To & Trip Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b border-blue-200 pb-1">
                BUYER INFORMATION:
              </h3>
              <div className="space-y-1">
                <p className="font-medium text-lg">{booking.customer.name}</p>
                <p className="text-gray-600">Email: {booking.customer.email}</p>
                <p className="text-gray-600">Phone: {booking.customer.phone}</p>

                {/* Corporate Details */}
                {booking.id === "book_corp_001" ? (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Customer Type:</span>{" "}
                      Corporate
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Company Registration:</span>{" "}
                      202001234567 (1234567-K)
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">SST Registration:</span>{" "}
                      B12345678901
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Contact Person:</span> Sarah
                      Lim (Finance Manager)
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Purchase Order:</span>{" "}
                      PO-2024-0156
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Credit Terms:</span> 30 days
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Address:</span> Level 15,
                      Menara Tech,
                      <br />
                      Jalan Ampang, 50450 Kuala Lumpur
                    </p>
                  </div>
                ) : (
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Customer Type:</span>{" "}
                      Individual
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">TIN:</span> N/A (Individual
                      Customer)
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Address:</span> As per
                      booking record
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-600 border-b border-blue-200 pb-1">
                SERVICE DETAILS:
              </h3>
              <div className="space-y-1">
                <p>
                  <span className="font-medium">Service:</span> Travel Package -{" "}
                  {booking.package.name}
                </p>
                <p>
                  <span className="font-medium">Duration:</span>{" "}
                  {booking.package.duration} days
                </p>
                <p>
                  <span className="font-medium">Service Date:</span>{" "}
                  {formatDate(booking.travelDates.startDate)}
                </p>
                <p>
                  <span className="font-medium">End Date:</span>{" "}
                  {formatDate(booking.travelDates.endDate)}
                </p>
                <div className="mt-3 pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Booking Ref:</span>{" "}
                    {booking.bookingNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Classification:</span>{" "}
                    Standard Rated (6%)
                  </p>
                  {booking.id === "book_corp_001" && (
                    <>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Service Category:</span>{" "}
                        Corporate Travel Services
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Group Size:</span>{" "}
                        {booking.participants} participants
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Event Type:</span> Team
                        Building Retreat
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* LHDN Compliant Tax Invoice Table */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b border-blue-200 pb-1">
              TAX INVOICE DETAILS
            </h3>
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-left p-4 font-medium">Description</th>
                    <th className="text-center p-4 font-medium">Qty</th>
                    <th className="text-right p-4 font-medium">
                      Unit Price (RM)
                    </th>
                    <th className="text-right p-4 font-medium">Amount (RM)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="p-4">
                      <div>
                        <p className="font-medium">
                          Travel Package: {booking.package.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {booking.package.duration} days comprehensive travel
                          service
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          Service Period:{" "}
                          {formatDate(booking.travelDates.startDate)} to{" "}
                          {formatDate(booking.travelDates.endDate)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-center">1</td>
                    <td className="p-4 text-right font-medium">
                      {formatCurrency(subtotalAmount)}
                    </td>
                    <td className="p-4 text-right font-medium">
                      {formatCurrency(subtotalAmount)}
                    </td>
                  </tr>

                  {/* Subtotal */}
                  <tr className="border-t bg-gray-50">
                    <td colSpan={3} className="p-4 text-right font-medium">
                      Subtotal (Excluding SST):
                    </td>
                    <td className="p-4 text-right font-medium">
                      {formatCurrency(subtotalAmount)}
                    </td>
                  </tr>

                  {/* SST */}
                  <tr className="border-t">
                    <td colSpan={3} className="p-4 text-right">
                      <div>
                        <p className="font-medium">Service Tax (SST) @ 6%:</p>
                        <p className="text-xs text-gray-500">
                          SST Registration No: C12345678901
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-right font-medium">
                      {formatCurrency(sstAmount)}
                    </td>
                  </tr>

                  {/* Total */}
                  <tr className="border-t bg-blue-50">
                    <td
                      colSpan={3}
                      className="p-4 text-right font-bold text-lg"
                    >
                      TOTAL AMOUNT (Including SST):
                    </td>
                    <td className="p-4 text-right font-bold text-lg">
                      {formatCurrency(booking.totalAmount)}
                    </td>
                  </tr>

                  {/* Payment Summary */}
                  {booking.paidAmount > 0 && (
                    <>
                      <tr className="border-t bg-green-50">
                        <td colSpan={3} className="p-4 text-right">
                          <div>
                            <p className="font-medium text-green-700">
                              Less: Amount Paid
                            </p>
                            <p className="text-sm text-green-600">
                              Previous payments received
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-right font-medium text-green-700">
                          -{formatCurrency(booking.paidAmount)}
                        </td>
                      </tr>

                      <tr className="border-t">
                        <td
                          colSpan={3}
                          className="p-4 text-right text-sm text-gray-600"
                        >
                          Paid Subtotal: -{formatCurrency(paidSubtotal)}
                          <br />
                          Paid SST: -{formatCurrency(paidSST)}
                        </td>
                        <td></td>
                      </tr>
                    </>
                  )}

                  <tr className="border-t bg-red-50">
                    <td colSpan={3} className="p-4 text-right">
                      <div>
                        <p className="font-bold text-red-700 text-lg">
                          OUTSTANDING BALANCE
                        </p>
                        <p className="text-sm text-red-600">
                          Amount due for payment
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Outstanding Subtotal:{" "}
                          {formatCurrency(outstandingSubtotal)}
                          <br />
                          Outstanding SST: {formatCurrency(outstandingSST)}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 text-right font-bold text-red-700 text-xl">
                      {formatCurrency(outstandingAmount)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment Schedule (if applicable) */}
          {enhancedData?.installments &&
            enhancedData.installments.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-blue-600">
                  PAYMENT SCHEDULE
                </h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-3 font-medium">
                          Installment
                        </th>
                        <th className="text-left p-3 font-medium">Due Date</th>
                        <th className="text-right p-3 font-medium">Amount</th>
                        <th className="text-center p-3 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enhancedData.installments.map((installment, index) => (
                        <tr key={installment.id} className="border-t">
                          <td className="p-3">
                            Payment {installment.installmentNumber}
                          </td>
                          <td className="p-3">
                            {formatDate(installment.dueDate)}
                          </td>
                          <td className="p-3 text-right font-medium">
                            {formatCurrency(installment.amount)}
                          </td>
                          <td className="p-3 text-center">
                            <Badge
                              className={
                                installment.status === "paid"
                                  ? "bg-green-100 text-green-800"
                                  : installment.status === "overdue"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {installment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          {/* Payment Instructions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b border-blue-200 pb-1">
              PAYMENT INSTRUCTIONS
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Bank Transfer */}
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="font-medium text-blue-700 mb-3">
                  🏦 Bank Transfer (Recommended)
                </p>
                <div className="space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Bank:</span>
                    <span>Malayan Banking Berhad (Maybank)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Account Name:</span>
                    <span>TMPL Escapade Sdn Bhd</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Account No:</span>
                    <span className="font-mono">5142 8888 1234</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Swift Code:</span>
                    <span className="font-mono">MBBEMYKL</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="font-medium">Reference:</span>
                    <span className="font-mono">{booking.bookingNumber}</span>
                  </div>
                </div>
              </div>

              {/* Alternative Payment Methods */}
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="font-medium text-green-700 mb-3">
                  💳 Alternative Payment Methods
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Credit/Debit Card:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>FPX Online Banking:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>PayPal:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>GrabPay/Touch 'n Go:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                  <div className="mt-3 p-2 bg-white rounded border">
                    <p className="text-xs text-gray-600">
                      💡 <strong>Note:</strong> For online payments, visit our
                      payment portal at
                      <br />
                      <span className="font-mono text-blue-600">
                        pay.tmplescapade.com/{booking.bookingNumber}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4 text-blue-600 border-b border-blue-200 pb-1">
              TERMS & CONDITIONS
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Payment Terms */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">
                  Payment Terms
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    • Payment is due within 7 days of invoice date unless
                    otherwise specified.
                  </p>
                  <p>
                    • Full payment must be received 30 days before travel date.
                  </p>
                  <p>
                    • Late payment may result in booking cancellation and
                    forfeiture of deposits.
                  </p>
                  <p>
                    • Please include booking reference number in all payment
                    communications.
                  </p>
                </div>
              </div>

              {/* Tax & Legal */}
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-2">
                  Tax & Legal Information
                </h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    • This is a tax invoice issued in accordance with the Goods
                    and Services Tax Act 2014.
                  </p>
                  <p>
                    • SST (6%) is included in the total amount as per Malaysian
                    tax regulations.
                  </p>
                  <p>• This invoice is valid for tax deduction purposes.</p>
                  <p>• Original invoice must be retained for audit purposes.</p>
                  <p>
                    • For tax or payment queries:{" "}
                    <strong>finance@tmplescapade.com</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* Important Notice */}
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">
                <strong>⚠️ Important Notice:</strong> This invoice is generated
                electronically and complies with LHDN e-Invoice requirements. No
                signature is required for electronic invoices. For verification,
                please scan the QR code above.
              </p>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Footer */}
          <div className="border-t border-gray-200 pt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
              {/* Company Info */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Company Information
                </h4>
                <p>TMPL Escapade Sdn Bhd</p>
                <p>Est. 2020 | Licensed Travel Agency</p>
                <p>MATTA Member | KPL Licensed</p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Contact Information
                </h4>
                <p>📞 +60 3-2148 8888</p>
                <p>📧 finance@tmplescapade.com</p>
                <p>🌐 www.tmplescapade.com</p>
              </div>

              {/* Invoice Info */}
              <div>
                <h4 className="font-medium text-gray-700 mb-2">
                  Invoice Information
                </h4>
                <p>Generated: {new Date().toLocaleString("en-MY")}</p>
                <p>System: TMPL e-Invoice v2.0</p>
                <p>LHDN Compliant ✓</p>
              </div>
            </div>

            <div className="text-center mt-6 pt-4 border-t border-gray-200">
              <p className="font-medium text-blue-600">
                Thank you for choosing TMPL Escapade!
              </p>
              <p className="text-gray-500">
                We look forward to providing you with an unforgettable travel
                experience.
              </p>
              <p className="text-xs text-gray-400 mt-2">
                This is a computer-generated invoice. No signature is required.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="p-6 border-t bg-gray-50 print:hidden">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button
              onClick={() => handleShare("email")}
              className="flex items-center space-x-2"
            >
              <MailIcon className="h-4 w-4" />

              <span>Email Invoice</span>
            </Button>

            <Button
              onClick={() => handleShare("whatsapp")}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <MessageSquareIcon className="h-4 w-4" />

              <span>WhatsApp</span>
            </Button>

            <Button
              onClick={() => handleShare("download")}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <DownloadIcon className="h-4 w-4" />

              <span>Download PDF</span>
            </Button>

            <Button
              onClick={() => handleShare("print")}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <PrinterIcon className="h-4 w-4" />

              <span>Print</span>
            </Button>

            <Button
              onClick={() => handleShare("copy")}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <CopyIcon className="h-4 w-4" />

              <span>Copy Link</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PaymentInvoiceDialog;
