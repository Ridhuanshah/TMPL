import {
  EnhancedPaymentData,
  PaymentInstallment,
} from "@/polymet/components/enhanced-payment-details";

// Extended interface for corporate bookings
export interface CorporatePaymentData extends EnhancedPaymentData {
  corporateDetails?: {
    companyName: string;
    companyRegistration: string;
    sstRegistration: string;
    businessType: string;
    creditTerms: string;
    contactPerson: string;
    purchaseOrderNo: string;
  };
}

// Enhanced payment data for existing bookings with installment plans
export const enhancedPaymentData: Record<string, EnhancedPaymentData> = {
  // Michael Wong - African Safari Adventure (Partial Payment with Installments)
  book_002: {
    bookingId: "book_002",
    totalAmount: 24800,
    paidAmount: 12400,
    paymentType: "installment",
    installments: [
      {
        id: "inst_002_001",
        installmentNumber: 1,
        amount: 8266.67,
        dueDate: "2024-02-15",
        status: "paid",
        paidDate: "2024-02-14",
        paymentMethod: "Credit Card",
      },
      {
        id: "inst_002_002",
        installmentNumber: 2,
        amount: 4133.33,
        dueDate: "2024-03-15",
        status: "paid",
        paidDate: "2024-03-12",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "inst_002_003",
        installmentNumber: 3,
        amount: 12400,
        dueDate: "2024-05-10",
        status: "pending",
      },
    ],

    nextPaymentDue: {
      amount: 12400,
      dueDate: "2024-05-10",
      installmentNumber: 3,
    },
    remainingPayments: 1,
    paymentSchedule: {
      frequency: "monthly",
      startDate: "2024-02-15",
      endDate: "2024-05-10",
    },
  },

  // Ahmad Rahman - Antarctic Expedition Cruise (Full Payment Pending)
  book_003: {
    bookingId: "book_003",
    totalAmount: 15000,
    paidAmount: 0,
    paymentType: "full",
    nextPaymentDue: {
      amount: 15000,
      dueDate: "2024-02-25",
      installmentNumber: 1,
    },
    remainingPayments: 1,
  },

  // Robert Johnson - Himalayan Base Camp Trek (Deposit + Balance)
  book_007: {
    bookingId: "book_007",
    totalAmount: 4500,
    paidAmount: 1350,
    paymentType: "deposit",
    installments: [
      {
        id: "inst_007_001",
        installmentNumber: 1,
        amount: 1350,
        dueDate: "2024-02-12",
        status: "paid",
        paidDate: "2024-02-12",
        paymentMethod: "Credit Card",
      },
      {
        id: "inst_007_002",
        installmentNumber: 2,
        amount: 3150,
        dueDate: "2024-03-02",
        status: "pending",
      },
    ],

    nextPaymentDue: {
      amount: 3150,
      dueDate: "2024-03-02",
      installmentNumber: 2,
    },
    remainingPayments: 1,
    paymentSchedule: {
      frequency: "custom",
      startDate: "2024-02-12",
      endDate: "2024-03-02",
    },
  },

  // Maria Santos - African Safari Adventure (Group Booking - Installments)
  book_008: {
    bookingId: "book_008",
    totalAmount: 37200,
    paidAmount: 0,
    paymentType: "installment",
    installments: [
      {
        id: "inst_008_001",
        installmentNumber: 1,
        amount: 11160,
        dueDate: "2024-03-01",
        status: "pending",
      },
      {
        id: "inst_008_002",
        installmentNumber: 2,
        amount: 13020,
        dueDate: "2024-05-01",
        status: "upcoming",
      },
      {
        id: "inst_008_003",
        installmentNumber: 3,
        amount: 13020,
        dueDate: "2024-07-12",
        status: "upcoming",
      },
    ],

    nextPaymentDue: {
      amount: 11160,
      dueDate: "2024-03-01",
      installmentNumber: 1,
    },
    remainingPayments: 3,
    paymentSchedule: {
      frequency: "bi-weekly",
      startDate: "2024-03-01",
      endDate: "2024-07-12",
    },
  },

  // Emma Thompson - Bali Cultural Discovery (Partial Payment)
  book_009: {
    bookingId: "book_009",
    totalAmount: 3200,
    paidAmount: 1600,
    paymentType: "deposit",
    installments: [
      {
        id: "inst_009_001",
        installmentNumber: 1,
        amount: 1600,
        dueDate: "2025-08-15",
        status: "paid",
        paidDate: "2025-08-15",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "inst_009_002",
        installmentNumber: 2,
        amount: 1600,
        dueDate: "2025-08-25",
        status: "overdue",
      },
    ],

    nextPaymentDue: {
      amount: 1600,
      dueDate: "2025-08-25",
      installmentNumber: 2,
    },
    remainingPayments: 1,
    paymentSchedule: {
      frequency: "custom",
      startDate: "2025-08-15",
      endDate: "2025-08-25",
    },
  },

  // Sophie Martinez - Swiss Alps Adventure (Inquiry - Payment Plan Proposed)
  book_011: {
    bookingId: "book_011",
    totalAmount: 16800,
    paidAmount: 0,
    paymentType: "installment",
    installments: [
      {
        id: "inst_011_001",
        installmentNumber: 1,
        amount: 5600,
        dueDate: "2025-09-15",
        status: "pending",
      },
      {
        id: "inst_011_002",
        installmentNumber: 2,
        amount: 5600,
        dueDate: "2025-10-15",
        status: "upcoming",
      },
      {
        id: "inst_011_003",
        installmentNumber: 3,
        amount: 5600,
        dueDate: "2025-11-15",
        status: "upcoming",
      },
    ],

    nextPaymentDue: {
      amount: 5600,
      dueDate: "2025-09-15",
      installmentNumber: 1,
    },
    remainingPayments: 3,
    paymentSchedule: {
      frequency: "monthly",
      startDate: "2025-09-15",
      endDate: "2025-11-15",
    },
  },

  // Daniel Park - New Zealand Adventure (Inquiry - Full Payment)
  book_016: {
    bookingId: "book_016",
    totalAmount: 18200,
    paidAmount: 0,
    paymentType: "full",
    nextPaymentDue: {
      amount: 18200,
      dueDate: "2025-09-20",
      installmentNumber: 1,
    },
    remainingPayments: 1,
  },

  // Corporate Client - LHDN Compliant Invoice Mockup
  book_corp_001: {
    bookingId: "book_corp_001",
    totalAmount: 45300, // Including 6% SST
    paidAmount: 15100, // First installment paid
    paymentType: "installment",
    installments: [
      {
        id: "inst_corp_001_001",
        installmentNumber: 1,
        amount: 15100,
        dueDate: "2024-01-15",
        status: "paid",
        paidDate: "2024-01-14",
        paymentMethod: "Bank Transfer",
      },
      {
        id: "inst_corp_001_002",
        installmentNumber: 2,
        amount: 15100,
        dueDate: "2024-02-15",
        status: "overdue",
      },
      {
        id: "inst_corp_001_003",
        installmentNumber: 3,
        amount: 15100,
        dueDate: "2024-03-15",
        status: "upcoming",
      },
    ],

    nextPaymentDue: {
      amount: 15100,
      dueDate: "2024-02-15",
      installmentNumber: 2,
    },
    remainingPayments: 2,
    paymentSchedule: {
      frequency: "monthly",
      startDate: "2024-01-15",
      endDate: "2024-03-15",
    },
    // Additional corporate client details
    corporateDetails: {
      companyName: "Tech Solutions Sdn Bhd",
      companyRegistration: "202001234567 (1234567-K)",
      sstRegistration: "B12345678901",
      businessType: "Corporate Travel",
      creditTerms: "30 days",
      contactPerson: "Sarah Lim (Finance Manager)",
      purchaseOrderNo: "PO-2024-0156",
    },
  },

  // Olivia Johnson - Vietnam Culinary Journey (Partial Payment)
  book_017: {
    bookingId: "book_017",
    totalAmount: 7200,
    paidAmount: 2160,
    paymentType: "installment",
    installments: [
      {
        id: "inst_017_001",
        installmentNumber: 1,
        amount: 2160,
        dueDate: "2025-08-25",
        status: "paid",
        paidDate: "2025-08-25",
        paymentMethod: "Credit Card",
      },
      {
        id: "inst_017_002",
        installmentNumber: 2,
        amount: 2520,
        dueDate: "2025-09-15",
        status: "pending",
      },
      {
        id: "inst_017_003",
        installmentNumber: 3,
        amount: 2520,
        dueDate: "2025-09-25",
        status: "upcoming",
      },
    ],

    nextPaymentDue: {
      amount: 2520,
      dueDate: "2025-09-15",
      installmentNumber: 2,
    },
    remainingPayments: 2,
    paymentSchedule: {
      frequency: "monthly",
      startDate: "2025-08-25",
      endDate: "2025-09-25",
    },
  },
};

// Helper function to get enhanced payment data for a booking
export const getEnhancedPaymentData = (
  bookingId: string
): EnhancedPaymentData | null => {
  return enhancedPaymentData[bookingId] || null;
};

// Helper function to get all bookings with installment plans
export const getBookingsWithInstallments = (): string[] => {
  return Object.keys(enhancedPaymentData).filter(
    (bookingId) => enhancedPaymentData[bookingId].paymentType === "installment"
  );
};

// Helper function to get overdue installments across all bookings
export const getOverdueInstallments = (): Array<{
  bookingId: string;
  installment: PaymentInstallment;
  paymentData: EnhancedPaymentData;
}> => {
  const overdue: Array<{
    bookingId: string;
    installment: PaymentInstallment;
    paymentData: EnhancedPaymentData;
  }> = [];

  Object.entries(enhancedPaymentData).forEach(([bookingId, paymentData]) => {
    if (paymentData.installments) {
      paymentData.installments.forEach((installment) => {
        const today = new Date();
        const dueDate = new Date(installment.dueDate);
        if (
          dueDate < today &&
          installment.status !== "paid" &&
          installment.status !== "overdue"
        ) {
          overdue.push({
            bookingId,
            installment: { ...installment, status: "overdue" },
            paymentData,
          });
        }
      });
    }
  });

  return overdue;
};

// Helper function to calculate total outstanding across all bookings
export const getTotalOutstanding = (): number => {
  return Object.values(enhancedPaymentData).reduce((total, paymentData) => {
    return total + (paymentData.totalAmount - paymentData.paidAmount);
  }, 0);
};

// Helper function to get payment statistics
export const getPaymentStatistics = () => {
  const allPayments = Object.values(enhancedPaymentData);

  const totalBookingsWithPayments = allPayments.length;
  const totalInstallmentBookings = allPayments.filter(
    (p) => p.paymentType === "installment"
  ).length;
  const totalDepositBookings = allPayments.filter(
    (p) => p.paymentType === "deposit"
  ).length;
  const totalFullPaymentBookings = allPayments.filter(
    (p) => p.paymentType === "full"
  ).length;

  const totalOutstanding = getTotalOutstanding();
  const totalPaid = allPayments.reduce((sum, p) => sum + p.paidAmount, 0);
  const totalAmount = allPayments.reduce((sum, p) => sum + p.totalAmount, 0);

  const overdueInstallments = getOverdueInstallments();
  const totalOverdueAmount = overdueInstallments.reduce(
    (sum, item) => sum + item.installment.amount,
    0
  );

  return {
    totalBookingsWithPayments,
    totalInstallmentBookings,
    totalDepositBookings,
    totalFullPaymentBookings,
    totalOutstanding,
    totalPaid,
    totalAmount,
    overdueInstallments: overdueInstallments.length,
    totalOverdueAmount,
    paymentCompletionRate: Math.round((totalPaid / totalAmount) * 100),
  };
};

export default {
  enhancedPaymentData,
  getEnhancedPaymentData,
  getBookingsWithInstallments,
  getOverdueInstallments,
  getTotalOutstanding,
  getPaymentStatistics,
};
