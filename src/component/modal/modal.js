import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TextFieldInput from "../TextFieldInput/TextFieldInput";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import {
  addEmployee,
  getEmployees,
  updateEmployee,
} from "../../features/employee/employee";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const BasicModal = ({ open, setOpen, data, setData, inputData }) => {
  const id = data.id;
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setData({});
  };
  const { handleSubmit, reset, control } = useForm();
  const onSubmit = (data) => {
    (id
      ? dispatch(updateEmployee({ data, id }))
      : dispatch(addEmployee(data))
    ).then(() => {
      dispatch(getEmployees());
    });
    setData({});
    reset();
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            noValidate
            autoComplete="off"
          >
            {inputData.map((value, index) => {
              return (
                <TextFieldInput
                  key={index}
                  control={control}
                  name={value}
                  defaultValue={data[value] || ""}
                />
              );
            })}
            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
