import type { User } from '@/context/AuthContext';
import { v4 as uuidv4 } from 'uuid';

export interface PaymentDetails {
  amount: number;
  sellerId: string;
  buyerId: string;
  commissionRate: number;
  description?: string;
}

export interface PaymentTransaction {
  id: string;
  amount: number;
  sellerId: string;
  sellerName: string;
  buyerId: string;
  buyerName: string;
  commissionRate: number;
  commissionAmount: number;
  sellerAmount: number;
  status: 'completed' | 'pending' | 'failed';
  timestamp: Date;
  description?: string;
}

export const validatePayment = (paymentDetails: PaymentDetails, currentUser: User): { 
  isValid: boolean; 
  message: string;
} => {
  // If commission rate is 0, only allow direct payments to the seller
  if (paymentDetails.commissionRate === 0) {
    if (paymentDetails.sellerId !== currentUser.id) {
      return {
        isValid: false,
        message: 'With zero commission rate, you can only make payments to your own account.'
      };
    }
  }

  // Additional validation rules can be added here
  if (paymentDetails.amount <= 0) {
    return {
      isValid: false,
      message: 'Payment amount must be greater than zero.'
    };
  }

  return {
    isValid: true,
    message: 'Payment is valid.'
  };
};

export const calculatePaymentAmount = (baseAmount: number, commissionRate: number): {
  totalAmount: number;
  commissionAmount: number;
  sellerAmount: number;
} => {
  const commissionAmount = (baseAmount * commissionRate) / 100;
  const sellerAmount = baseAmount - commissionAmount;
  const totalAmount = baseAmount;

  return {
    totalAmount,
    commissionAmount,
    sellerAmount
  };
};

export const createPaymentTransaction = (
  paymentDetails: PaymentDetails,
  buyer: User,
  seller: User
): PaymentTransaction => {
  const { amount, commissionRate } = paymentDetails;
  const { commissionAmount, sellerAmount } = calculatePaymentAmount(amount, commissionRate);

  return {
    id: uuidv4(),
    amount,
    sellerId: seller.id,
    sellerName: seller.name,
    buyerId: buyer.id,
    buyerName: buyer.name,
    commissionRate,
    commissionAmount,
    sellerAmount,
    status: 'pending',
    timestamp: new Date(),
    description: paymentDetails.description
  };
};

export const updateTransactionStatus = (
  transaction: PaymentTransaction,
  status: 'completed' | 'failed'
): PaymentTransaction => {
  return {
    ...transaction,
    status,
    timestamp: new Date() // Update timestamp when status changes
  };
}; 
