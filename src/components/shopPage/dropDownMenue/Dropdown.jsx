// Import the library
import React, { useEffect, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import "./dropDownMenue.css";

export const Dropdown = ({ stores, setSelectedOption, selectedOption }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (name, id, index) => {
    setSelectedOption({ name: name, id: id, index: index });
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <button className="dropdown-toggle" onClick={toggleDropdown}>
        <ChevronLeftIcon className="icon" /> {selectedOption["name"]}
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {stores.map((option, index) => (
            <li
              key={index}
              onClick={() =>
                handleOptionSelect(option["name"], option["id"], index)
              }
            >
              {option["name"]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};