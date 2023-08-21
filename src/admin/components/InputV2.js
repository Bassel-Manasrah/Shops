import React from "react";

export default function InputV2({ value, type, update }) {
  return (
    <input value={value} type={type} onChange={(e) => update(e.target.value)} />
  );
}
