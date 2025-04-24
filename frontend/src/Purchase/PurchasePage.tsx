

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PurchaseForm from "../Purchase/purchase";
import { buyBook } from "../Purchase/PurchaseService"; 
import { useLocation } from "react-router-dom";
import { user } from "../types";

const PurchasePage: React.FC = () => {
  const location = useLocation()
  const { bookId } = location.state as {bookId: number};
  const [book, setBook] = useState<any>(null);
  const navigate = useNavigate();
console.log('0987654567890987654',bookId);
console.log("edrftgyhu");

  useEffect(() => {
    const fetchBook = async () => {
      try {
        console.log('book', bookId)
        const res = await axios.get(`http://localhost:5000/books/${bookId}`);
        setBook(res.data);
        console.log(res.data, "order book")
      } catch (error) {
        console.error("Failed to fetch book", error);
        toast.error("Failed to load book details.");
      }
    };

    fetchBook();
  }, []);

  const handlePurchase = async ({
        quantity,
        address,
      }: {
        quantity: number;
        address: string;
      }) => {
        try {
          // const token = localStorage.getItem("token");
          const userString: any = localStorage.getItem("user");
          const user = JSON.parse(userString);
           console.log("@@@@@@@@@@@@@@@$$$$$$",user)
           if ( !user ) {
            toast.error("You must be logged in to make a purchase.");
            return;
          }
          // console.log("Token:", token);
          console.log("User:", user.user.userName);
          console.log("BookID",book.id)
          console.log("quantity",quantity)
          console.log("address",address)
          console.log("priceAtPurchase",book.price)
          
        const res =  await axios.post(
            "http://localhost:5000/buy/purchase",
            {
              userName: user.user.userName,
              bookId: book.id,
              quantity,
              address,
              priceAtPurchase: book.price,
            },
            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //     "Content-Type": "application/json",
            //   },
            // }
          );
          console.log("tfjgvkjh@@@@@@@@@@@@@@@####$%b",res)
    
          toast.success("Purchase successful!");
          navigate("/"); 
        } catch (error) {
          console.error("Purchase failed", error);
          toast.error("Something went wrong!");
        }
      };
    

  return (
    <div>
      {book ? (
        <PurchaseForm
          bookId={book.id}
          title={book.title}
          image={book.image_url}
          price={book.price}
          onPurchaseSuccess={handlePurchase}
        />
      ) : (
        <p>Loading book details...</p>
      )}
    </div>
  );
};

export default PurchasePage;