// import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { navData } from "../data/navData";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Sidenav.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";
import { resetCart, setAdmin, setLogin } from "../../redux/bazarSlice";

function Sidenav() {
  const dispatch = useDispatch();
  // const location = useLocation();

  const [selectedItem, setSelectedItem] = useState("Events");
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        dispatch(resetCart()); // Clear the productData state
        dispatch(setLogin(false)); // Set isLogin to false
        dispatch(setAdmin(false)); // Set isLogin to false
        //console.log("logout successfully");
      })
      .catch((error) => {
        //console.log(error);
      });
  };

  return (
    <div className="sidenav">
      {navData.map((item) => (
        <div
          onClick={() => {
            setSelectedItem(item.text);
            navigate(`/admin/${item.value.toLowerCase()}`);
          }}
          className={
            item.text === selectedItem
              ? "sidenav-item selected"
              : "sidenav-item"
          }
        >
          <div>{item.icon}</div>
          <div> {item.text}</div>
        </div>
      ))}
      <div className="sidenav-item logout" onClick={handleLogout}>
        <LogoutIcon />
        <div>יציאה</div>
      </div>
    </div>
  );
}

export default Sidenav;
