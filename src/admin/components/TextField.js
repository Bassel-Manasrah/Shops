import { TextField as TextFieldBasis } from "@mui/material";
import { styled } from "styled-components";

export default styled(TextFieldBasis)({
  "& label": {
    transformOrigin: "right !important",
    left: "inherit !important",
    right: "1.75rem !important",
    fontSize: "medium",
    color: "#807D7B",
    fontWeight: 400,
    overflow: "unset",
  },
  "& legend": { textAlign: "right" },
  "& .MuiFormHelperText-root": { textAlign: "right" },
});
