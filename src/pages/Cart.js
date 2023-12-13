import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartCover } from "../assets/assetsindex";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import CartItem from "../components/CartItem";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { setLogin, setOrderId } from "../redux/bazarSlice";
import { collection, query, where, getDocs } from "firebase/firestore";
import { database } from "../firebase";

const Cart = () => {
  const productData = useSelector((state) => state.bazar.productData);
  const [totalAmt, setTotalAmt] = useState(0);
  const [isMember, setIsMember] = useState(false);
  const isCartEmpty = productData.length === 0;
  const [userName, setUserName] = useState("");
  const [Phone, setPhone] = useState("");
  const userEmail = useSelector((state) => state.bazar.email);
  let login = useSelector((state) => state.bazar.isLogin);
  let member = useSelector((state) => state.bazar.isMember);
  const isLogin = useSelector((state) => state.bazar.isLogin); // Access isLogin from the bazar slice
  const [orderId,setOrderId1] = useState("");


  const dispatch = useDispatch();

  const ordersCollectionRef = collection(database, "orders");

   //get the data from the firestore
  useEffect(() => {

    const generateUniqueString = async () => {
      const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const length = 10;
      let uniqueString = '';
    
      while (uniqueString === '') { 
        uniqueString = '';
    
        for (let i = 0; i < length; i++) {
          const randomIndex = Math.floor(Math.random() * characters.length);
          uniqueString += characters.charAt(randomIndex);
        }
      }

      const isRepeated = await isStringRepeated(uniqueString);
      if (isRepeated) {
        generateUniqueString();
      } else {
        dispatch(setOrderId(uniqueString));
        setOrderId1(uniqueString);
      }
    }

    const isStringRepeated = async (str) => {
      try {

        const orders = await getDocs(ordersCollectionRef);
        const filterStores = orders.docs.map((doc) => {
            return doc.id ;
          })

        return filterStores.includes(str)


      } catch (error) {
        console.error('Error checking string uniqueness:', error);
        return false;
      }
    }

    generateUniqueString();
    
  }, []);
  
  useEffect(() => {
    setLogin(login);
    //console.log(login);

    if (login && userEmail) {
      const fetchUserName = async () => {
        const usersCollectionRef = collection(database, "users");
        const q = query(usersCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          //console.log(userData.name)
          setUserName(userData.firstname);
        }
      };

      fetchUserName();
    }
  }, [login, userEmail]);

  useEffect(() => {
    setLogin(login);
    //console.log(login);

    if (login && userEmail) {
      const fetchUserName = async () => {
        const usersCollectionRef = collection(database, "users");
        const q = query(usersCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          //console.log(userData.name)
          setPhone(userData.phone);
        }
      };

      fetchUserName();
    }
  }, [login, userEmail]);

  useEffect(() => {
    let totalPrice = 0;
  
    productData.forEach((item) => {
      const discountedPrice = isMember
        ? item.PriceProduct * item.QuantityOfProduct * (1 - item.discount / 100)
        : item.PriceProduct * item.QuantityOfProduct;
  
      totalPrice += Number((discountedPrice / 100).toFixed(2)); // Keep only two decimal places
    });
  
    setTotalAmt(totalPrice);
  }, [productData, isMember]);
  
  

  useEffect(() => {
    setIsMember(member);
  }, [member]);


  
  // console.log(userName)
  // console.log({userName})
  function pay(a) {
    const finalTotalAmt = isMember ? totalAmt - totalAmt * 0.3 : totalAmt;
    const url = "https://app.sumit.co.il/billing/payments/beginredirect/";
    const body = {
      Customer: {
        ExternalIdentifier: null,
        NoVAT: null,
        SearchMode: 0,
        Name: userName,
        Phone: Phone,
        EmailAddress: userEmail,
        City: null,
        Address: null,
        ZipCode: null,
        CompanyNumber: null,
        ID: null,
        Folder: null,
      },
      Items: [
        {
          Item: {
            ID: null,
            Name: ("מספר הזמנה: "+orderId),
            Description: null,
            Price: null,
            Currency: null,
            Cost: null,
            ExternalIdentifier: null,
            SKU: null,
            SearchMode: null,
          },
          Quantity: 1,
          UnitPrice: finalTotalAmt,
          Total: null,
          Currency: null,
          Description: null,
        },
      ],
      VATIncluded: true,
      DocumentType: null,
      RedirectURL: "http://localhost:3000/complete",
      CancelRedirectURL: null,
      ExternalIdentifier: null,
      MaximumPayments: null,
      SendUpdateByEmailAddress: null,
      ExpirationHours: null,
      Theme: null,
      Language: null,
      Header: null,
      UpdateOrganizationOnSuccess: null,
      UpdateOrganizationOnFailure: null,
      UpdateCustomerOnSuccess: null,
      DocumentDescription: null,
      DraftDocument: null,
      AutomaticallyRedirectToProviderPaymentPage: null,
      IPNURL: null,
      Credentials: {
        CompanyID: 171163302,
        APIKey: "m7hsVevsojtv4iyxpFiiJsOkSuiXikW7nEKS8WYJmJ16CETYmK",
      },
      ResponseLanguage: null,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        const redirectUrl = data.Data.RedirectURL;
        //console.log(redirectUrl);
        window.open(redirectUrl);
        // dispatch(resetCart()); // Dispatch resetCart action
        window.close(); // Close the current tab
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <>
      <Header />
      {isLogin ? (
        <div>
          <img
            className="w-screen h-cartPage object-cover"
            src={cartCover}
            alt="cartCover"
          />
          <div className="max-w-screen-xl mx-auto py-10 flex">
            {!isCartEmpty ? (
              <>
                <CartItem />
                <div className="w-1/3 bg-[#fafafa] py-6 px-4">
                  <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
                    <h2 className="text-2xl font-medium">סכום העגלה</h2>
                    <p className="flex items-center gap-4 text-base font-bold">
                      סכום{" "}
                      <span className="font-titleFont font-bold text-lg">
                        {totalAmt.toFixed(2)} ₪
                      </span>
                    </p>
                  </div>
                  <p className="font-titleFont font-semibold flex justify-between mt-6">
                    {/* {isMember && (
                      <span className="text-lg">הנחת חבר מועדון 30%</span>
                    )} */}
                  </p>
                  <p className="font-titleFont font-semibold flex justify-between mt-6">
                    הסכום הסופי{" "}
                    <span className="text-xl font-bold">
                      {totalAmt.toFixed(2)}{" "}
                      ₪
                    </span>
                  </p>
                  <p className="font-titleFont font-semibold flex justify-between mt-6 text-red-500">
                    הערה: בלחיצה על עבור לתשלום , אתם מועברים לאתר חיצוני
                    שהתשלום באחריותם.
                  </p>
                  <button
                    onClick={() => pay(totalAmt)}
                    className="text-base bg-red-500 text-white w-full py-3 mt-6 hover:bg-green-500 duration-300"
                  >
                    עבור לתשלום
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center mx-auto h-auto">
                  <div className="w-full text-center">
                    <p className="text-3xl mt-4 font-medium text-white">
                      העגלה שלך ריקה!!
                    </p>
                    <p
                      className="text-3xl mt-4 font-medium text-white"
                      style={{ padding: "15px" }}
                    >
                      ניתן להוסיף מוצרים מהחנות לעגלה ולהמשיך לתהליך הרכישה.
                    </p>
                  </div>
                  <div>
                    <Link to="/stores">
                      <button className="mt-8 ml-7 flex items-center gap-1 text-black hover:bg-red-500 duration-300 text-2xl">
                        <span>
                          <HiOutlineArrowRight />
                        </span>
                        חזרה לחנות
                      </button>
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center mx-auto"
          style={{
            border: "none",
            outline: "none",
            width: "100%",
            minHeight: "200px",
            marginBottom: "235px",
          }}
        >
          <p className="text-3xl mt-4 font-medium text-red-500">
            אתה צריך להיכנס לחשבונך כדי לעבור לסל הקניות
          </p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
