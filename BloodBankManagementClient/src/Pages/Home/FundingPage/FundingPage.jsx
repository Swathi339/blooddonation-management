import React, { useState } from "react";

const FundingPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails({ ...paymentDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment Details:", paymentDetails);
    alert("Payment successful!");
  };

  return (
    <div className="max-w-[1320px] mx-auto mt-16 px-6 md:px-0">
      <h1 className="text-3xl text-red-600 font-bold text-center mb-4">
        Support With Card Payment
      </h1>
      <p className="text-center text-gray-600 mb-6">
        Your contribution can make a real difference. Please enter your payment
        details below.
      </p>

      <form
        className="bg-white shadow-md rounded-lg p-8 border border-gray-200"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="cardNumber"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Card Number
          </label>
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={paymentDetails.cardNumber}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-400 rounded-lg shadow-sm p-3 
             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label
              htmlFor="expiryDate"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Expiry Date
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentDetails.expiryDate}
              onChange={handleInputChange}
              required
               className="w-full border border-gray-400 rounded-lg shadow-sm p-3 
             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="w-1/2">
            <label
              htmlFor="cvv"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              CVV
            </label>
            <input
              type="password"
              id="cvv"
              name="cvv"
              placeholder="123"
              value={paymentDetails.cvv}
              onChange={handleInputChange}
              required
               className="w-full border border-gray-400 rounded-lg shadow-sm p-3 
             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter amount"
            value={paymentDetails.amount}
            onChange={handleInputChange}
            required
             className="w-full border border-gray-400 rounded-lg shadow-sm p-3 
             focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-red-600 text-white font-bold py-3 px-12 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Donate
          </button>
        </div>
      </form>
    </div>
  );
};

export default FundingPage;
