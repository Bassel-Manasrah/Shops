import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useUserAuth } from "../../context/UserAuthContext";
import { Button } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

const ForggotP = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { ForggotPass } = useUserAuth();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await ForggotPass(email);
      toast.success(<span>המייל נשלח בהצלחה &#128516;</span>);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      setTimeout(() => {
        navigate("/login");
      }, 2000); // Delay navigation for 2 seconds
    } catch (error) {
      setMessage("!נא לבדוק שהמייל תקין");
    }
  };

  return (
    <div className="p-4 box forgetP">
      <h2 className="mb-3">שחזור סיסמה</h2>

      {message && <div className="text-red-500 mb-4">{message}</div>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="מייל"
            required
          />
        </Form.Group>

        <Button variant="primary" className="button" type="Submit">
          אישור
        </Button>

        <div className="flex gap-2">
          <span>נזכרת ?</span>
          <Link
            to="/login"
            className="link-text rounded-sm group hover:text-black hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-500"
          >
            <div className="text-red-500">כניסה למערכת</div>
          </Link>
        </div>
      </Form>
      <ToastContainer
        position="top-right"
        autoClose={3500}
        closeButton={false}
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
    </div>
  );
};

export default ForggotP;
