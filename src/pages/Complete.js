import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { resetCart } from "../redux/bazarSlice";
import { auth, database } from "../firebase";

export default function Complete() {
  const productData = useSelector((state) => state.bazar.productData);
  const total = useSelector((state) => state.bazar.total);
  const isMember = useSelector((state) => state.bazar.isMember);
  const userInfo = useSelector((state) => state.bazar.userInfo);
  const email = useSelector((state) => state.bazar.email);
  const orderId = useSelector((state) => state.bazar.orderId);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const OGCustomerID = searchParams.get('OG-CustomerID');
  const OGPaymentID = searchParams.get('OG-PaymentID');

  useEffect(() => {
    dispatch(resetCart()); // Dispatch resetCart action

    if (!OGCustomerID || !OGPaymentID) {
      navigate("/cart", { replace: true });

      return;
    }

    handleComplete(); // Call handleComplete within useEffect
  }, [dispatch]);

  const updateProductQuantity = async (productId, quantity, isGrams) => {
    const productDocRef = doc(collection(database, "products"), productId);
    const productDoc = await getDoc(productDocRef);

    if (productDoc.exists) {
      const currentQuantity = productDoc.data().quantity;
      const updatedQuantity = currentQuantity - quantity;

      // Update the quantity in the "products" collection
      await setDoc(productDocRef, { quantity: updatedQuantity }, { merge: true });
    } else {
      console.error(`Product with ID ${productId} not found.`);
    }
  };

  const handleComplete = async () => {
    const products = productData.map((prod) => ({
      quantity: prod.isGrams ? prod.QuantityOfProduct : prod.QuantityOfProduct / 100,
      price: prod.PriceProduct,
      name: prod.nameOfProduct,
      id: prod.idProduct, // Add product ID
      isGrams: prod.isGrams, // Add isGrams property
    }));
  
    const { firstName, lastName, phoneNumber, address } = userInfo;
    const isDone = false;

    const order = {
      products,
      payment: total.toFixed(2),
      isMember,
      email,
      orderId,
      firstName,
      lastName,
      phoneNumber,
      address,
      isDone,
    };

    // Update product quantities in the "products" collection
    await Promise.all(
      products.map(async (prod) => {
        await updateProductQuantity(prod.id, prod.quantity, prod.isGrams);
      })
    );

    await createOrder(order); // Wait for order creation to complete
  
    navigate("/", { replace: true });
  };

  const createOrder = async (newOrder) => {
    const orderCollection = collection(database, "orders");
    const docRef = doc(orderCollection, orderId);
    await setDoc(docRef, newOrder);
  };

  return null; // or render a loading/spinner component
}
