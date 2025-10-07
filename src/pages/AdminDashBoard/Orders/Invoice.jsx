import React from "react";

const Invoice = ({ order, selectedOrderId }) => {
  if (!order) return <p>No order found!</p>;

  const printedItem = order.find((item) => item._id === selectedOrderId);

  return (
    <div className="hidden print:block relative">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-xl p-6 border border-gray-200 relative overflow-hidden">
        {/* Paid Stamp */}
        
        {printedItem?.paymentStatus === "Paid" && (
          <div
            className="absolute bottom-6 right-6 transform -rotate-12 border-4 border-green-600 text-green-600 px-6 py-3 font-extrabold text-3xl tracking-widest opacity-90 text-center shadow-lg"
            style={{
              textShadow:
                "2px 2px 0 #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
              letterSpacing: "0.15em",
            }}
          >
            PAID
          </div>
        )}

        {/* Header */}
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-wide">
            Invoice
          </h2>
          <p className="text-gray-600 text-sm">
            Invoice ID: {printedItem?._id}
          </p>
        </div>

        {/* Customer & Order Info */}
        <div className="grid grid-cols-2 gap-6 text-sm text-gray-700 mb-6">
          <div className="space-y-1">
            <p>
              <strong>Email:</strong> {printedItem?.email}
            </p>
            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(printedItem?.orderDate).toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-1">
            <p>
              <strong>Payment Status:</strong>{" "}
              <span
                className={`font-semibold ${
                  printedItem?.paymentStatus === "Paid"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {printedItem?.paymentStatus}
              </span>
            </p>
            <p>
              <strong>Order Status:</strong> {printedItem?.orderStatus}
            </p>
          </div>
        </div>

        {/* Items Table */}
        <div>
          <h3 className="text-lg font-semibold border-b pb-2 mb-2 text-gray-800">
            Ordered Pets
          </h3>
          <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Pet</th>
                <th className="border p-3 text-center">Category</th>
                <th className="border p-3 text-center">Breed</th>
                <th className="border p-3 text-center">Size</th>
                <th className="border p-3 text-center">Price</th>
              </tr>
            </thead>
            <tbody>
              {printedItem?.paymentItem?.map((item, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="border p-3 flex items-center gap-3">
                    <img
                      src={item.petPic}
                      alt={item.petName}
                      className="w-12 h-12 rounded object-cover border"
                    />
                    <span className="font-medium">{item.petName}</span>
                  </td>
                  <td className="border p-3 text-center">{item.petCategory}</td>
                  <td className="border p-3 text-center">{item.breed}</td>
                  <td className="border p-3 text-center">{item.size}</td>
                  <td className="border p-3 text-center font-semibold text-gray-800">
                    ${item.price}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total Amount */}
        <div className="flex justify-end mt-6">
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-800">
              Total Amount:{" "}
              <span className="text-green-600">${printedItem?.amount}</span>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Thank you for your purchase!</p>
          <p>Pet Shop Inc.</p>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
