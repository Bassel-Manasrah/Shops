import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { cartCover } from "../assets/assetsindex";
import Header from "../components/homePage/Header";
import Footer from "../components/homePage/Footer";
import CartItem from "../components/CartItem";
import { HiOutlineArrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { resetCart, setLogin } from "../redux/bazarSlice";
import { auth, database } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import domain from "../constants/domain";

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
  const dispatch = useDispatch();

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
      totalPrice += (item.PriceProduct * item.QuantityOfProduct) / 100;
    });
    setTotalAmt(totalPrice);
  }, [productData]);

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
            Name: null,
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
        CompanyID: 61294932,
        APIKey: "Gy2gopJM25FoBIRImOQCyUgJO5gp6ONTNwskd4TynjKPjKkTTb",
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
                    <p className="flex items-center gap-4 text-base">
                      סכום{" "}
                      <span className="font-titleFont font-bold text-lg">
                        {totalAmt} ₪
                      </span>
                    </p>
                  </div>
                  <p className="font-titleFont font-semibold flex justify-between mt-6">
                    {isMember && (
                      <span className="text-lg">הנחת חבר מעודון 30%</span>
                    )}
                  </p>
                  <p className="font-titleFont font-semibold flex justify-between mt-6">
                    הסכום הסופי{" "}
                    <span className="text-xl font-bold">
                      {isMember
                        ? (totalAmt - totalAmt * 0.3).toFixed(2)
                        : totalAmt.toFixed(2)}{" "}
                      ₪
                    </span>
                  </p>
                  <p className="font-titleFont font-semibold flex justify-between mt-6 text-red-500">
                    הערה: בלחיצה על עבור לתשלום , אתם מועברים לאתר חיצוני
                    שהתשלום באחריותם.
                  </p>
                  <button
                    onClick={() => pay(totalAmt)}
                    className="text-base bg-red-500 text-white w-full py-3 mt-6 hover:bg-red-800 duration-300"
                  >
                    עבור לתשלום
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center mx-auto">
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
                    <Link to="/shop">
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
            marginBottom: "145px",
          }}
        >
          <p className="text-3xl mt-4 font-medium text-red-500">
            אתה צריך להיכנס לחשבונך כדי לראות את סל הקניות
          </p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Cart;
