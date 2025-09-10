// src/components/CheckoutModal.tsx

"use client";
import { useState } from 'react';
import { X, MapPin, Phone, User, Mail} from 'lucide-react';
import Swal from "sweetalert2";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  category: string;
  inStock: boolean;
  rating: number;
  reviews: number;
  discount: number;
  featured: boolean;
  tags: string[];
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  bkashNumber?: string;
  nagadNumber?: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  getProductDetails: (itemId: string) => Product | null;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  onOrderSuccess: () => void;
}

const CheckoutModal = ({
  isOpen,
  onClose,
  items,
  getProductDetails,
  subtotal,
  tax,
  shipping,
  total,
  onOrderSuccess
}: CheckoutModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState<'info' | 'payment'>('info');
  const [formData, setFormData] = useState<CheckoutFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
    bkashNumber: '',
    nagadNumber: ''
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (currentStep === 'info') {
      setCurrentStep('payment');
      return;
    }

    setIsProcessing(true);

    try {
      // Handle different payment methods
      if (formData.paymentMethod === 'bkash') {
        // Simulate bKash payment
        await Swal.fire({
          title: "bKash Payment",
          html: `
            <div class="text-center p-4">
              <div class="text-4xl mb-4">📱</div>
              <p class="mb-4">Send money to: <strong>01XXXXXXXXX</strong></p>
              <p class="mb-4">Amount: <strong>${total.toFixed(2)} Taka</strong></p>
              <p class="text-sm text-gray-600">Please complete the payment and click confirm</p>
            </div>
          `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#E2136E",
          confirmButtonText: "Payment Done",
          cancelButtonText: "Cancel"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await showSuccessMessage();
          } else {
            throw new Error("Payment cancelled");
          }
        });
      } else if (formData.paymentMethod === 'nagad') {
        // Simulate Nagad payment
        await Swal.fire({
          title: "Nagad Payment",
          html: `
            <div class="text-center p-4">
              <div class="text-4xl mb-4">💳</div>
              <p class="mb-4">Send money to: <strong>01XXXXXXXXX</strong></p>
              <p class="mb-4">Amount: <strong>${total.toFixed(2)} Taka</strong></p>
              <p class="text-sm text-gray-600">Please complete the payment and click confirm</p>
            </div>
          `,
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#F47E20",
          confirmButtonText: "Payment Done",
          cancelButtonText: "Cancel"
        }).then(async (result) => {
          if (result.isConfirmed) {
            await showSuccessMessage();
          } else {
            throw new Error("Payment cancelled");
          }
        });
      } else {
        // Cash on Delivery
        await showSuccessMessage();
      }
    } catch (error) {
      if ((error as Error).message !== "Payment cancelled") {
        Swal.fire({
          title: "Error!",
          text: "Something went wrong. Please try again.",
          icon: "error",
          confirmButtonColor: "#EF4444",
        });
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const showSuccessMessage = async () => {
    await Swal.fire({
      title: "Order Placed Successfully! 🎉",
      text: "Your order has been confirmed. We'll contact you soon!",
      icon: "success",
      confirmButtonColor: "#F59E0B",
      confirmButtonText: "Great!",
    });

    resetForm();
    onClose();
    onOrderSuccess();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      paymentMethod: 'cod',
      bkashNumber: '',
      nagadNumber: ''
    });
    setCurrentStep('info');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
      setCurrentStep('info');
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      style={{
        background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.1) 0%, rgba(245, 158, 11, 0.15) 25%, rgba(217, 119, 6, 0.1) 50%, rgba(251, 191, 36, 0.15) 75%, rgba(245, 158, 11, 0.1) 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-yellow-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center">
              🛍️
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Checkout</h2>
              <p className="text-sm text-gray-500">
                {currentStep === 'info' ? 'Step 1: Information' : 'Step 2: Payment'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              onClose();
              setCurrentStep('info');
            }}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-50 p-2 rounded-full transition-all duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-medium ${currentStep === 'info' ? 'text-yellow-600' : 'text-green-600'}`}>
                Information
              </span>
              <span className={`text-xs font-medium ${currentStep === 'payment' ? 'text-yellow-600' : 'text-gray-400'}`}>
                Payment
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === 'payment' ? 'bg-yellow-500 w-full' : 'bg-yellow-500 w-1/2'
                }`}
              />
            </div>
          </div>

          {currentStep === 'info' ? (
            <>
              {/* Order Summary */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    📋
                  </div>
                  Order Summary
                </h3>
                <div className="space-y-3 text-sm">
                  {items.map((item: CartItem) => {
                    const product = getProductDetails(item.id);
                    if (!product) return null;
                    return (
                      <div key={item.id} className="flex justify-between items-center">
                        <span className="text-gray-700">{product.name} × {item.quantity}</span>
                        <span className="font-medium text-gray-900">{(product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    );
                  })}
                  <div className="border-t border-gray-200 pt-3 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="text-gray-800">{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax (8%):</span>
                      <span className="text-gray-800">{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="text-gray-800">{shipping === 0 ? 'FREE' : shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                      <span className="text-gray-800">Total:</span>
                      <span className="text-yellow-600">{total.toFixed(2)} ৳</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Customer Information Form */}
              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <User className="w-4 h-4 inline mr-2 text-gray-400" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Mail className="w-4 h-4 inline mr-2 text-gray-400" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2 text-gray-400" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="+880 1XXX-XXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-2 text-gray-400" />
                    Delivery Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="House/Flat No, Road, Area"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    placeholder="Your city"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-bold text-lg rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  Continue to Payment
                  <div className="w-5 h-5 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    →
                  </div>
                </button>
              </form>
            </>
          ) : (
            <>
              {/* Payment Step */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                    💳
                  </div>
                  Payment Method
                </h3>

                <form onSubmit={handleFormSubmit} className="space-y-5">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    {/* Cash on Delivery */}
                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === 'cod' 
                        ? 'border-yellow-400 bg-yellow-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 w-full">
                        <div className="text-2xl">💰</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">Cash on Delivery</div>
                          <div className="text-sm text-gray-500">Pay when you receive your order</div>
                        </div>
                        {formData.paymentMethod === 'cod' && (
                          <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* bKash */}
                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === 'bkash' 
                        ? 'border-pink-400 bg-pink-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="bkash"
                        checked={formData.paymentMethod === 'bkash'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 w-full">
                        <div className="text-2xl">📱</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">bKash</div>
                          <div className="text-sm text-gray-500">Digital payment with bKash</div>
                        </div>
                        {formData.paymentMethod === 'bkash' && (
                          <div className="w-5 h-5 bg-pink-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>

                    {/* Nagad */}
                    <label className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                      formData.paymentMethod === 'nagad' 
                        ? 'border-orange-400 bg-orange-50' 
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="nagad"
                        checked={formData.paymentMethod === 'nagad'}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center gap-3 w-full">
                        <div className="text-2xl">💳</div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-800">Nagad</div>
                          <div className="text-sm text-gray-500">Digital payment with Nagad</div>
                        </div>
                        {formData.paymentMethod === 'nagad' && (
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </label>
                  </div>

                  {/* Order Total */}
                  <div className="bg-gray-50 rounded-2xl p-5">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-800">Total Amount:</span>
                      <span className="text-2xl font-bold text-yellow-600">{total.toFixed(2)} ৳</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setCurrentStep('info')}
                      className="flex-1 py-3 px-6 border-2 border-gray-200 text-gray-600 font-medium rounded-xl transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`flex-2 py-4 px-6 font-bold text-lg rounded-xl transition-all duration-300 transform flex items-center justify-center gap-2 ${
                        isProcessing
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white hover:scale-[1.02] shadow-lg hover:shadow-xl'
                      }`}
                      style={{ flexBasis: '70%' }}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          🎉 Place Order
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;