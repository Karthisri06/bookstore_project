
import React, { useState } from "react";

type Props = {
  bookId: number;
  title: string;
  image: string;
  price: number;
  onPurchaseSuccess: (purchaseData: { quantity: number; address: string }) => void;
};

const PurchaseForm: React.FC<Props> = ({
  title,
  image,
  price,
  onPurchaseSuccess,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPurchaseSuccess({ quantity, address });
  };

  return (
    <div className="container mt-5">
      <div className="card p-4 shadow">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={image}
              alt={title}
              className="img-fluid rounded"
              style={{ maxHeight: "250px" }}
            />
            <h5 className="mt-3">{title}</h5>
            <p className="text-success fw-bold">₹{price}</p>
          </div>
          <div className="col-md-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  min={1}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Shipping Address</label>
                <textarea
                  className="form-control"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">
                Buy Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseForm;