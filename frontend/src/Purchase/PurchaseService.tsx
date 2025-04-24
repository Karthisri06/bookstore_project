import axios from "axios";

export const buyBook = (
  data: { bookId: number; quantity: number; address: string },
  config = {}
) => axios.post("http://localhost:5000/buy/purchase", data, config);

export const getMyPurchases = () => axios.get("http://localhost:5000/buy/purchases");

export const deletePurchase = (purchaseId: number) =>
  axios.delete(`http://localhost:5000/buy/purchase/${purchaseId}`);
