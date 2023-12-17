import { Button, Checkbox, FormControlLabel, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "./TextField";
import Select from "react-select";

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
    const { name, price, quantity, discount, desc, isHide } = data;
    const isGrams = data.unit.value === "grams";
    console.log({ name, price, quantity, discount, desc, isHide, isGrams });
    addProduct({ name, price, quantity, discount, desc, isHide, isGrams });
  };

  const {
    register,
    handleSubmit,
    trigger,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues: {
      isHide: false,
      unit: { value: "grams", label: "גרמים" },
    },
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

      <Controller
        name="unit"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            options={[
              { value: "grams", label: "גרמים" },
              { value: "descrete", label: "יחידים" },
            ]}
          />
        )}
      />

      <Controller
        name="isHide"
        control={control}
        render={({ field }) => {
          return (
            <FormControlLabel
              label="הסתר"
              control={<Checkbox {...field} checked={field.value} />}
            ></FormControlLabel>
          );
        }}
      />

      <Button
        disabled={disabled}
        variant="contained"
        type="submit"
        className="flex-1 h-9"
        style={{
          backgroundColor: "#3a6c87",
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
