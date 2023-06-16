import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import TextFieldInput from "../TextFieldInput/TextFieldInput";
import Modal from "@mui/material/Modal";
import { useForm } from "react-hook-form";
import employee, {
  addEmployee,
  getEmployees,
  updateEmployee,
} from "../../features/employee/employee";
import TextFieldData from "../TextFieldData/TextFieldData";
import { addTask, getTasks, updateTask } from "../../features/task/task";

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

const BasicModal = ({
  open,
  setOpen,
  data,
  setData,
  inputData = [],
  type,
  startDateValue,
  setStartDateValue,
  endDateValue,
  setEndDateValue,
}) => {
  const id = data.id;
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    setData({});
  };
  const { handleSubmit, reset, control } = useForm();

  const onSubmit = (data) => {
    return type === "employee"
      ? (id
          ? dispatch(updateEmployee({ data, id }))
          : dispatch(addEmployee(data))
        ).then(() => {
          dispatch(getEmployees());
          setData({});
          reset();
          setOpen(false);
        })
      : type === "task"
      ? (id
          ? ((data.startDate = startDateValue),
            (data.endDate = endDateValue),
            dispatch(updateTask({ data, id })))
          : ((data.startDate = startDateValue),
            (data.endDate = endDateValue),
            dispatch(addTask(data)))
        ).then(() => {
          dispatch(getTasks());
          setData({});
          reset();
          setOpen(false);
        })
      : null;
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
              let newValue = value
                .replace(/_/g, " ")
                .replace(/^[a-z]/, (match) => match.toUpperCase());
              return (
                <TextFieldInput
                  key={index}
                  control={control}
                  name={value}
                  label={newValue}
                  defaultValue={data[value] || ""}
                />
              );
            })}

            {type === "task" && (
              <TextFieldData
                label={"Start Date"}
                dateValue={startDateValue}
                setDateValue={setStartDateValue}
              />
            )}
            {type === "task" && (
              <TextFieldData
                label={"End Date"}
                dateValue={endDateValue}
                setDateValue={setEndDateValue}
              />
            )}

            <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};
export default BasicModal;
