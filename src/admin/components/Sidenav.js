import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import { navData } from "../data/navData";
import "./Sidenav.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Sidenav() {
  const [selectedItem, setSelectedItem] = useState("Events");
  const navigate = useNavigate();

  return (
    <div className="sidenav">
      {navData.map((item) => (
        <div
          onClick={() => {
            setSelectedItem(item.text);
            navigate(`/admin/qowiuepr%&$qwej82309148zcmxv-nczxvnjkla&d%&$as&djkd-naosd879-23nmNFJ-AKSDL-FNFND-JASLFN%&$ALNF-U983$24732-47%&$67NKA-NSM%&$$ASFD-ASDFAD%&$$F883-283877KK$KLMV%&$NDG$HYKE9/${item.value.toLowerCase()}`);
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
    </div>
  );
}

export default Sidenav;