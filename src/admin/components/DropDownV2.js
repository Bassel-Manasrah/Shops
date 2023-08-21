import React from "react";
import Select from "react-select";

export default function DropDownV2({ ...props }) {
  return <Select {...props} styles={customStyles} />;
}

const customStyles = {
  control: (provided) => ({
    ...provided,
    width: 150,
  }),
  menu: (provided) => ({
    ...provided,
    width: 150,
  }),
};
