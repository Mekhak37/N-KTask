import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scss from "./Employee.module.scss";
import PaginatedItems from "../../pagination/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicModal from "../../modal/modal";
import EditIcon from "@mui/icons-material/Edit";
import {
  deleteEmployee,
  getEmployees,
} from "../../../features/employee/employee";
import CircularIndeterminate from "../../loading/loading";

const Employee = () => {
  const dispatch = useDispatch();
  const employeeData = ["name", "surname", "position", "email"];
  const [open, setOpen] = useState(false);
  const [selectedPage, setElectedPage] = useState(1);
  const [data, setData] = useState({
    id: null,
    name: "",
    surname: "",
    position: "",
    email: "",
  });
  const { employee, loading } = useSelector((state) => state.employee);

  useEffect(() => {
    dispatch(getEmployees(selectedPage));
  }, [selectedPage, dispatch]);
  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      <BasicModal
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
        inputData={employeeData}
        type={"employee"}
      />
      <AddBoxIcon onClick={() => setOpen(true)} />
      {employee.data?.map(({ id, name, surname, email, position }) => {
        return (
          <div key={id} className={scss.box}>
            <span className={scss.text}> {name}</span>
            <span className={scss.text}>{surname}</span>
            <span className={scss.text}>{email}</span>
            <span className={scss.text}>{position}</span>
            <span
              className={scss.icon}
              onClick={() => {
                setOpen(true);
                setData({ id, name, surname, position, email });
              }}
            >
              <EditIcon />
            </span>
            <span
              className={scss.icon}
              onClick={() => {
                dispatch(deleteEmployee(id)).then(() => {
                  dispatch(getEmployees());
                });
              }}
            >
              <DeleteIcon />
            </span>
          </div>
        );
      })}
      <div className={scss.pagination}>
        {!!employee.data?.length && (
          <PaginatedItems
            itemsPerPage={10}
            totalCount={employee["headers"]["x-total-count"]}
            setElectedPage={setElectedPage}
          />
        )}
      </div>
    </div>
  );
};
export default Employee;
