// pages/MyPurchases.tsx
import React, { useEffect, useState } from "react";
import { getMyPurchases, deletePurchase } from "../Purchase/PurchaseService";

const MyPurchases = () => {
  const [purchases, setPurchases] = useState<any[]>([]);

  const fetchPurchases = async () => {
    const res = await getMyPurchases();
    setPurchases(res.data);
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  const handleDelete = async (purchaseId: number) => {
    await deletePurchase(purchaseId);
    fetchPurchases();
  };

  return (
    <div className="container mt-4">
      <h2>My Purchases</h2>
      {purchases.map((p) => (
        <div key={p.id} className="card mb-2 p-3">
          <h5>{p.book.title}</h5>
          <p>Quantity: {p.quantity}</p>
          <p>Address: {p.address}</p>
          <p>Price Paid: ₹{p.priceAtPurchase}</p>
          <p>Purchased At: {new Date(p.purchasedAt).toLocaleString()}</p>
          <button className="btn btn-danger" onClick={() => handleDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default MyPurchases;
