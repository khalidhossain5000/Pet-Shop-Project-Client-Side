import React from "react";

const Invoice = ({ order }) => {
  if (!order) return <p>No order found!</p>;
console.log('this is order in invoice', order)
  const {
    _id,
    email,
    amount,
    transactionId,
    paymentMethod,
    paymentItem,
    paymentStatus,
    orderDate,
    orderStatus,
  } = order;

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 border">
      {/* Header */}
      <div className="flex justify-between items-center border-b pb-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Invoice</h2>
        <p className="text-gray-600 text-sm">Invoice ID: {_id}</p>
      </div>

      {/* Customer & Order Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 mb-6">
        <div>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Order Date:</strong> {orderDate}</p>
        </div>
        <div>
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Order Status:</strong> {orderStatus}</p>
        </div>
      </div>

      {/* Payment Info */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold border-b pb-2 mb-2">Payment Details</h3>
        <p><strong>Transaction ID:</strong> {transactionId}</p>
        <p><strong>Method:</strong> {paymentMethod && paymentMethod[0]}</p>
      </div>

      {/* Items Table */}
      <div>
        <h3 className="text-lg font-semibold border-b pb-2 mb-2">Ordered Pets</h3>
        <table className="w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2 text-left">Pet</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Breed</th>
              <th className="border p-2">Size</th>
              <th className="border p-2">Price</th>
            </tr>
          </thead>
          <tbody>
            {paymentItem?.map((item, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="border p-2 flex items-center gap-2">
                  <img src={item.petPic} alt={item.petName} className="w-10 h-10 rounded object-cover" />
                  {item.petName}
                </td>
                <td className="border p-2 text-center">{item.petCategory}</td>
                <td className="border p-2 text-center">{item.breed}</td>
                <td className="border p-2 text-center">{item.size}</td>
                <td className="border p-2 text-center">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="flex justify-end mt-6">
        <div className="text-right">
          <p className="text-lg font-bold">
            Total Amount: <span className="text-green-600">${amount}</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 text-gray-500 text-sm">
        <p>Thank you for your purchase!</p>
        <p>Pet Shop Inc.</p>
      </div>
    </div>
  );
};

export default Invoice;
