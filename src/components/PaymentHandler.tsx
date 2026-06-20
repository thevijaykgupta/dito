import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { 
  validatePayment, 
  calculatePaymentAmount, 
  PaymentDetails,
  createPaymentTransaction,
  updateTransactionStatus,
  PaymentTransaction
} from '@/utils/payment';
import ErrorMessage from './ErrorMessage';
import PaymentHistory from './PaymentHistory';

interface PaymentHandlerProps {
  sellerId: string;
  sellerName: string;
  amount: number;
  commissionRate: number;
  onPaymentComplete: () => void;
}

const PaymentHandler: React.FC<PaymentHandlerProps> = ({
  sellerId,
  sellerName,
  amount,
  commissionRate,
  onPaymentComplete
}) => {
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([]);

  const handlePayment = async () => {
    if (!user) {
      setError('Please sign in to make a payment');
      return;
    }

    const paymentDetails: PaymentDetails = {
      amount,
      sellerId,
      buyerId: user.id,
      commissionRate,
      description: `Payment for ${sellerName}`
    };

    const validation = validatePayment(paymentDetails, user);
    if (!validation.isValid) {
      setError(validation.message);
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);

      // Create transaction record
      const transaction = createPaymentTransaction(
        paymentDetails,
        user,
        { id: sellerId, name: sellerName } as any
      );

      // Here you would typically make an API call to your payment processor
      // For now, we'll simulate a successful payment
      console.log('Processing payment:', transaction);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update transaction status to completed
      const completedTransaction = updateTransactionStatus(transaction, 'completed');
      
      // Add to transactions history
      setTransactions(prev => [completedTransaction, ...prev]);

      onPaymentComplete();
    } catch (err) {
      setError('Payment failed. Please try again.');
      // If there was a transaction, mark it as failed
      if (transactions.length > 0) {
        const failedTransaction = updateTransactionStatus(transactions[0], 'failed');
        setTransactions(prev => [failedTransaction, ...prev.slice(1)]);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Payment Details</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₹{amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Commission Rate:</span>
            <span className="font-medium">{commissionRate}%</span>
          </div>
          {commissionRate > 0 && (
            <>
              <div className="flex justify-between">
                <span className="text-gray-600">Commission Amount:</span>
                <span className="font-medium">₹{(amount * commissionRate) / 100}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seller Receives:</span>
                <span className="font-medium">₹{amount - (amount * commissionRate) / 100}</span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
            ${isProcessing 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500'
            }`}
        >
          {isProcessing ? 'Processing...' : 'Make Payment'}
        </button>

        {commissionRate === 0 && (
          <p className="mt-2 text-sm text-gray-500">
            Note: With zero commission rate, you can only make payments to your own account.
          </p>
        )}
      </div>

      {error && <ErrorMessage message={error} />}

      {/* Payment History */}
      <PaymentHistory 
        transactions={transactions} 
        userRole="buyer"
      />
    </div>
  );
};

export default PaymentHandler; 
