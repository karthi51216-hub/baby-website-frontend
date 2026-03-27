import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import toast from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const { cart, cartTotal, user, clearCart } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1=address, 2=payment, 3=confirm
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState({
    full_name: user?.name || '',
    phone: '',
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    pincode: '',
  });
  const [payment, setPayment] = useState('cod');

  const shipping = cartTotal >= 499 ? 0 : 49;
  const tax = parseFloat((cartTotal * 0.05).toFixed(2));
  const total = cartTotal + shipping + tax;

  const handleAddress = e => setAddress({ ...address, [e.target.name]: e.target.value });
const placeOrder = async () => {
  setLoading(true);
  try {
    if (payment === 'cod') {
      // ✅ COD direct order
      const orderData = {
        items: cart.map(i => ({
          product: i.id,
          quantity: i.quantity,
          price: i.price
        })),
        shipping_address: address,
        payment_method: payment,
        subtotal: cartTotal,
        shipping_cost: shipping,
        // tax,
         // total,
         tax: parseFloat(tax.toFixed(2)),
         total: parseFloat(total.toFixed(2)),
       
      };

      await api.post('/orders/', orderData);
      clearCart();
      toast.success('Order placed!');
      navigate('/profile');

    } else {
      // ✅ Razorpay flow
      const payRes = await api.post('/orders/create-payment/', {
        amount: total
      });

      const options = {
        key: 'rzp_test_SVvmEKNtukL3e1',  // ← உன் key,
        amount: payRes.data.amount,
        currency: 'INR',
        order_id: payRes.data.id,

        handler: async function (response) {
          // ✅ VERIFY
          const verifyRes = await api.post('/orders/verify-payment/', {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyRes.data.status === 'success') {

            // 🔥 IMPORTANT → CREATE ORDER HERE
            const orderData = {
              items: cart.map(i => ({
                product: i.id,
                quantity: i.quantity,
                price: i.price
              })),
              shipping_address: address,
              payment_method: payment,
              payment_status: 'paid',
              subtotal: cartTotal,
              shipping_cost: shipping,
              tax,
              total,
            };

            await api.post('/orders/', orderData);

            clearCart();
            toast.success('Payment Success + Order Placed!');
            navigate('/profile');
          }
        },

        prefill: {
          name: address.full_name,
          contact: address.phone,
        },

        theme: { color: '#FF69B4' },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    }

  } catch (err) {
    console.error(err);
    toast.error('Something went wrong');
  } finally {
    setLoading(false);
  }
};
//  const placeOrder = async () => {
//   setLoading(true);
//   try {
//     if (payment === 'cod') {
//       // COD
//       const orderData = {
//         items: cart.map(i => ({ product: i.id, quantity: i.quantity, price: i.price })),
//         shipping_address: address,
//         payment_method: payment,
//         subtotal: cartTotal,
//         shipping_cost: shipping,
//         tax,
//         total,
//       };

//       const res = await api.post('/orders/', orderData);
//       clearCart();
//       toast.success('Order placed successfully!');
//       navigate(`/orders/${res.data.id}`);
//     } else {
//       // Razorpay
//       const payRes = await api.post('/orders/create-payment/', {
//         amount: total,
//       });

//       const options = {
//         key: 'rzp_test_YOUR_KEY_ID', // 🔥 change this
//         amount: payRes.data.amount,
//         currency: 'INR',
//         name: 'BabyBliss',
//         description: 'Order Payment',
//         order_id: payRes.data.id,

//         handler: async (response) => {
//           const verifyRes = await api.post('/orders/verify-payment/', {
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           });

//           if (verifyRes.data.status === 'success') {
//             const orderData = {
//               items: cart.map(i => ({ product: i.id, quantity: i.quantity, price: i.price })),
//               shipping_address: address,
//               payment_method: payment,
//               payment_status: 'paid',
//               subtotal: cartTotal,
//               shipping_cost: shipping,
//               tax,
//               total,
//             };

//             await api.post('/orders/', orderData);
//             clearCart();
//             toast.success('Payment successful! Order placed!');
//             navigate('/profile');
//           }
//         },

//         prefill: {
//           name: address.full_name,
//           email: user?.email || '',
//           contact: address.phone,
//         },

//         theme: { color: '#FF69B4' },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     }
//   } catch (err) {
//     toast.error('Payment failed. Try again.');
//   } finally {
//     setLoading(false);
//   }
// };

  if (!cart.length) { navigate('/cart'); return null; }

  return (
    <div className="checkout-page">
      <div className="container">
        <h1 className="page-title">Checkout</h1>

        {/* Steps */}
        <div className="checkout-steps">
          {['Delivery', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className={`step ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
              <div className="step-num">{step > i + 1 ? '✓' : i + 1}</div>
              <span>{s}</span>
              {i < 2 && <div className="step-line" />}
            </div>
          ))}    
        </div>

        <div className="checkout-layout">
          <div className="checkout-main">
            {/* Step 1: Address */}
            {step === 1 && (
              <div className="checkout-card">
                <h3>Delivery Address</h3>
                <div className="address-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input name="full_name" value={address.full_name} onChange={handleAddress} placeholder="Full name" />
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input name="phone" value={address.phone} onChange={handleAddress} placeholder="10-digit mobile" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Address Line 1</label>
                    <input name="address_line1" value={address.address_line1} onChange={handleAddress} placeholder="House/Flat No, Street" />
                  </div>
                  <div className="form-group">
                    <label>Address Line 2 (Optional)</label>
                    <input name="address_line2" value={address.address_line2} onChange={handleAddress} placeholder="Landmark, Area" />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City</label>
                      <input name="city" value={address.city} onChange={handleAddress} placeholder="City" />
                    </div>
                    <div className="form-group">
                      <label>State</label>
                      <input name="state" value={address.state} onChange={handleAddress} placeholder="State" />
                    </div>
                    <div className="form-group">
                      <label>Pincode</label>
                      <input name="pincode" value={address.pincode} onChange={handleAddress} placeholder="6-digit pincode" />
                    </div>
                  </div>
                </div>
                <button className="btn-primary next-btn" onClick={() => setStep(2)}>Continue to Payment</button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="checkout-card">
                <h3>Payment Method</h3>
                <div className="payment-options">
                  {[
                    { value: 'cod', label: '💵 Cash on Delivery', sub: 'Pay when you receive' },
                    { value: 'upi', label: '📱 UPI', sub: 'PhonePe, GPay, Paytm' },
                    { value: 'card', label: '💳 Credit / Debit Card', sub: 'All major cards accepted' },
                    { value: 'netbanking', label: '🏦 Net Banking', sub: 'All major banks' },
                  ].map(opt => (
                    <label key={opt.value} className={`payment-option ${payment === opt.value ? 'selected' : ''}`}>
                      <input type="radio" value={opt.value} checked={payment === opt.value} onChange={() => setPayment(opt.value)} />
                      <div>
                        <p className="pay-label">{opt.label}</p>
                        <p className="pay-sub">{opt.sub}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="checkout-nav">
                  <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
                  <button className="btn-primary next-btn" onClick={() => setStep(3)}>Review Order</button>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {step === 3 && (
              <div className="checkout-card">
                <h3>Review Your Order</h3>
                <div className="review-section">
                  <h4>Delivery To</h4>
                  <p>{address.full_name} • {address.phone}</p>
                  <p>{address.address_line1}, {address.address_line2}</p>
                  <p>{address.city}, {address.state} - {address.pincode}</p>
                </div>
                <div className="review-section">
                  <h4>Items ({cart.length})</h4>
                  {cart.map(item => (
                    <div key={item.id} className="review-item">
                      <img src={item.image || `https://via.placeholder.com/60x60/FFB6C1/5C3D2E?text=${item.name}`} alt={item.name} />
                      <div>
                        <p>{item.name}</p>
                        <p className="review-qty">Qty: {item.quantity}</p>
                      </div>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <div className="checkout-nav">
                  <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
                  <button className="btn-primary place-order-btn" onClick={placeOrder} disabled={loading}>
                    {loading ? 'Placing Order...' : `Place Order • ₹${total.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="checkout-summary">
            <h3>Price Details</h3>
            <div className="summary-row"><span>Subtotal ({cart.length} items)</span><span>₹{cartTotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span></div>
            <div className="summary-row"><span>Tax (5%)</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="summary-divider" />
            <div className="summary-total"><span>Total Amount</span><span>₹{total.toFixed(2)}</span></div>
            {shipping === 0 && <p className="savings-msg">🎉 You're saving ₹49 on shipping!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
