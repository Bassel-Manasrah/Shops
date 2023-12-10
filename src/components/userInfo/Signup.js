import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { database } from "../../firebase";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import "../../loginAboutUs.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const { signUp } = useUserAuth();
  let navigate = useNavigate();

  const validateFields = () => {
    const nameRegex = /^[a-zA-Zא-ת\s]*$/;
    if (!nameRegex.test(firstname)) {
      setError("שם משתמש שגוי");
      return false;
    }
    if (!nameRegex.test(lastname)) {
      setError("שם משפחה שגוי");
      return false;
    }
    return true;
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^05\d{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setError("מספר הטלפון שגוי !");
      return false;
    }
    return true;
  };

  const validateIdNumber = () => {
    const idRegex = /^\d{9}$/;
    if (!idRegex.test(idNumber)) {
      setError("מספר תעודת הזהות חייב להכיל 9 ספרות בדיוק בלי אותיות.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateFields() || !validatePhoneNumber() || (idNumber && !validateIdNumber())) {
      return;
    }
    if (password.length < 10) {
      setError("הסיסמה חייבת להיות לפחות 10 תווים.");
      return;
    }
    try {
      await signUp(email, password);

      const user = {
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phoneNumber,
        address: address,
        idNumber: idNumber,
        isMember: false,
        isAdmin: false,
      };
      await addDoc(collection(database, "users"), user);
      toast.success(<span>ההרשמה בוצעה בהצלחה &#128521;</span>);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      setError("המייל כבר בשימוש במערכת !");
      return;
    }
  };

  return (
    <>
      <div className="p-4 box">
        <h2 className="mb-2.5">הרשמה</h2>
        <div className={error ? "error-message" : "normal-message"}>{error}</div>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2.5">
            <Form.Control
              type="text"
              required
              placeholder="שם משתמש"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5" controlId="formBasicPassword">
            <Form.Control
              type="text"
              required
              placeholder="שם משפחה"
              onChange={(e) => setLastName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5" controlId="formBasicPassword">
            <Form.Control
              type="password"
              required
              placeholder="סיסמה"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5">
            <Form.Control
              type="tel"
              required
              placeholder="מס טלפון"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5">
            <Form.Control
              type="text"
              required
              placeholder="כתובת"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5">
            <Form.Control
              type="text"
              placeholder="תעודת זהות (אופציונלי)"
              onChange={(e) => setIdNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2.5" controlId="formBasicEmail">
            <Form.Control
              type="Email"
              required
              placeholder="מייל"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <div className="d-grid gap-2">
            <Button variant="primary" className="button" type="Submit">
              אישור
            </Button>
          </div>
        </Form>
        <br />
        <div className="flex gap-2">
          יש לך כבר חשבון ?
          <Link
            to="/login"
            className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500"
          >
            <div className="text-red-600">כניסה למערכת</div>
            <br></br>
            <br></br>
          </Link>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3500}
      closeButton={false}
      toastClassName="custom-toast"
      bodyClassName="custom-toast-body" />
    </>
  );
};

export default Signup;
