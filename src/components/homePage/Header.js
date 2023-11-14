import React, { useEffect, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { resetCart, setLogin } from "../../redux/bazarSlice";
import { signOut } from "firebase/auth";
import { auth, database } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { cart, loginPerson, logo } from "../../assets/assetsindex";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogin, setIsLogin] = useState();
  const [userName, setUserName] = useState("");
  const login = useSelector((state) => state.bazar.isLogin);
  const productData = useSelector((state) => state.bazar.productData);
  const userEmail = useSelector((state) => state.bazar.email);

  const handleButtonClick = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(resetCart());
        dispatch(setLogin(false));
      })
      .catch((error) => {
        // Handle error
      });
  };

  useEffect(() => {
    setIsLogin(login);

    if (login && userEmail) {
      const fetchUserName = async () => {
        const usersCollectionRef = collection(database, "users");
        const q = query(usersCollectionRef, where("email", "==", userEmail));
        const querySnapshot = await getDocs(q);
        if (querySnapshot.size > 0) {
          const userDoc = querySnapshot.docs[0];
          const userData = userDoc.data();
          setUserName(userData.firstname);
        }
      };

      fetchUserName();
    }
  }, [login, userEmail]);

  return (
    <div className="navbar w-full h-28 border-b-[1px] border-b-gray-800 sticky top-0 z-50 flex items-center justify-between px-4">
      <div className="flex items-center">
        <Link to="/shops">
          <img className="logo w-48 h-40" src={logo} alt="logo" />
        </Link>

        <ul className="flex items-center gap-5">
          <Link to="/shops">
            <li className="hover:text-black hover:underline cursor-pointer duration-300 text-2xl">
              חנויות
            </li>
          </Link>
          <Link to="/about">
            <li className="hover:text-black hover:underline cursor-pointer duration-300 text-2xl">
              אודות
            </li>
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/login">
          {!login && (
            <img
              className="h-12 w-12 rounded-full hover:text-black hover:underline cursor-pointer duration-500"
              src={loginPerson}
              alt="userLogo"
            />
          )}
        </Link>
        <Link to="/cart">
          <div className="relative">
            <img
              className="h-12 w-12 rounded-full hover:text-black hover:underline cursor-pointer duration-500"
              src={cart}
              alt="cartImg"
            />
            {productData.length > 0 && (
              <span className="badge absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center rounded-full bg-red-500 text-white text-lg">
                {productData.length}
              </span>
            )}
          </div>
        </Link>

        {login && (
          <div className="flex items-center gap-2">
            <BiLogOut
              className="hover:text-black hover:underline cursor-pointer duration-500 text-lg"
              onClick={handleButtonClick}
            />
            <span className="text-lg font-light text-white">
              שלום {userName}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
