import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./TextField";

export default function NewProductBannerV2({ addProduct, disabled }) {
  const schema = yup.object().shape({
    name: yup.string().required("שדה חובה"),
    price: yup
      .number("אינו מספר")
      .required("שדה חובה")
      .typeError("אינו מספר")
      .positive("אינו חיובי"),
    quantity: yup
      .number("אינו מספר")
      .required("שדה חובה")
      .typeError("אינו מספר")
      .positive("אינו חיובי"),
    discount: yup
      .number("אינו מספר")
      .required("שדה חובה")
      .typeError("אינו מספר")
      .min(0, "אינו חיובי")
      .max(100, "גדול מ-100"),

    desc: yup.string(),
  });

  const onSubmit = (data) => {
    reset();
    addProduct(data);
  };

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center flex-row gap-4 p-8 w-[1300px] border-2 border-gray-300 shadow-sm bg-white h-18 py-7"
    >
      <TextField
        disabled={disabled}
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
        label="* שם מוצר"
        className="flex-1 h-9"
        autoComplete="off"
        size="small"
        onBlur={() => trigger("name")}
        {...register("name")}
      />
      <TextField
        disabled={disabled}
        error={Boolean(errors.price)}
        helperText={errors.price?.message}
        type="number"
        label="* מחיר"
        size="small"
        autoComplete="off"
        className="flex-1 h-9"
        onBlur={() => trigger("price")}
        {...register("price")}
      />
      <TextField
        disabled={disabled}
        error={Boolean(errors.quantity)}
        helperText={errors.quantity?.message}
        type="number"
        label="* כמות"
        size="small"
        autoComplete="off"
        className="flex-1 h-9"
        onBlur={() => trigger("quantity")}
        {...register("quantity")}
      />
      <TextField
        disabled={disabled}
        error={Boolean(errors.discount)}
        helperText={errors.discount?.message}
        type="number"
        label="* הנחה"
        size="small"
        autoComplete="off"
        onBlur={() => trigger("discount")}
        className="flex-1 h-9"
        {...register("discount")}
      />
      <TextField
        disabled={disabled}
        error={Boolean(errors.desc)}
        helperText={errors.desc?.message}
        label="תיאור קצר"
        size="small"
        autoComplete="off"
        className="flex-2 h-9"
        onBlur={() => trigger("desc")}
        {...register("desc")}
      />

      <Select
        disabled={disabled}
        size="small"
        {...register("isGrams")}
        defaultValue={false}
      >
        <MenuItem value={false}>יחידים</MenuItem>
        <MenuItem value={true}>גרמים</MenuItem>
      </Select>

      <FormControlLabel
        control={<Checkbox {...register("isHide")} disabled={disabled} />}
        label="הסתר"
        className="flex-1 h-9"
      />

      <Button
        disabled={disabled}
        variant="contained"
        type="submit"
        className="flex-1 h-9"
        style={{
          backgroundColor: "rgb(87, 121, 91, 0.959)",
          color: "white",
          ...(disabled && {
            opacity: 0.6,
          }),
        }}
      >
        הוספת מוצר
      </Button>
    </form>
  );
}
