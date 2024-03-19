import "react-multi-date-picker/styles/layouts/mobile.css";
import { Controller, useFormContext } from "react-hook-form";
import ReactDatePicker from "react-multi-date-picker";
import { DateInput } from "./inputs";
import { isValid } from "date-fns";

export function DatePicker({ name = "", ...props }) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      {...props}
      render={({
        field: { onChange, name, value },
        fieldState: { invalid, isDirty },
        formState: { errors },
      }) => (
        <>
          <ReactDatePicker
            className=""
            containerStyle={{ width: "100%" }}
            value={value as string}
            onChange={(date) => {
              onChange(isValid(date) ? date : "");
            }}
            render={<DateInput />}
            format={"DD MMM YYYY"}
          />
          {errors && errors[name] && errors[name]?.type === "required" && (
            //if you want to show an error message
            <span>your error message !</span>
          )}
        </>
      )}
    />
  );
}
