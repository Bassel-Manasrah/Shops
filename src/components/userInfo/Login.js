import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../../loginAboutUs.css";
import {
  setEmailf,
  setMember,
  setLogin,
  resetCart,
  setAdmin,
} from "../../redux/bazarSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, logOut } = useUserAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const isLogin = useSelector((state) => state.bazar.isLogin);

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    dispatch(setEmailf(email));
  };

  const handleLogout = () => {
    // Reset the relevant states and log out
    dispatch(setLogin(false));
    dispatch(resetCart()); // Assuming you have a resetCart action in bazarSlice.js
    logOut();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await logIn(email, password);
      //console.log("login" + isLogin);

      const a = collection(database, "users"); // checking if input email is an Admin
      const b = query(a, where("email", "==", email));
      const c = await getDocs(b);
      if (c.size > 0) {
        const userDoc = c.docs[0];
        const userData = userDoc.data();
        dispatch(setMember(userData.isMember));
      }

      const usersCollectionRef = collection(database, "users"); // checking if input email is an Admin
      const q = query(usersCollectionRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
      if (querySnapshot.size > 0) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();
        if (userData.isAdmin) {
          dispatch(setAdmin(true));
          //console.log(email);
          navigate("/admin/");
        } else {
          dispatch(setAdmin(false));
          navigate("/");
          dispatch(setLogin(true));
          //console.log(email);
        }
      } else {
        setError("Error logging in. Please try again.");
      }
    } catch (err) {
      setError("נא לוודא שהמייל וסיסמה תקינים  !");
    }
  };

  return (
    <>
      <div className="p-4 box logIn">
        <h2 className="mb-3">כניסה למערכת</h2>
        <Form onSubmit={handleSubmit}>
          <div className={error ? "error-message" : "normal-message"}>
            {error}
          </div>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="text"
              placeholder="מייל"
              required
              value={email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="סיסמה"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" className="button" type="submit">
              כניסה למערכת
            </Button>
          </div>
        </Form>
        {isLogin && (
          <div className="mt-3">
            <Button variant="secondary" onClick={handleLogout}>
              התנתק
            </Button>
          </div>
        )}
        <hr />
        <div className="flex gap-2">
          אין לך חשבון ?
          <Link
            to="/signup"
            style={{ color: "black" }}
            className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500"
          >
            <div className="text-red-500">הרשמה</div>
          </Link>{" "}
          או{" "}
          <Link
            to="/forgotpassword"
            style={{ color: "black" }}
            className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500"
          >
            <div className="text-red-500">שכחתי סיסמה</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Login;
