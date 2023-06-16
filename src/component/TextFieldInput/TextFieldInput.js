import React from "react";
import { TextField } from "@mui/material";
import { Controller } from "react-hook-form";

const TextFieldInput = ({ name, defaultValue = "", control }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextField
          onChange={onChange}
          value={value}
          label={name}
          defaultValue={defaultValue}
        />
      )}
    />
  );
};
export default TextFieldInput;
