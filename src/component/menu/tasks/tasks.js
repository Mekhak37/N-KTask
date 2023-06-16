import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scss from "./task.module.scss";
import PaginatedItems from "../../pagination/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicModal from "../../modal/modal";
import EditIcon from "@mui/icons-material/Edit";
import { getTasks, deleteTask } from "../../../features/task/task";


const Tasks = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedPage, setElectedPage] = useState(1);
  const [data, setData] = useState({
    id: null,
    name: "",
    surname: "",
    position: "",
    email: "",
  });
  const taskData = ["name_like", "description_like","startDate", "endDate" ]
  const task = useSelector((state) => state.task.task);
  useEffect(() => {
    dispatch(getTasks(selectedPage));
  }, [selectedPage,dispatch ]);

  return (
    <div>
      <BasicModal open={open} setOpen={setOpen} data={data} setData={setData}  inputData={taskData}/>
      <AddBoxIcon onClick={() => setOpen(true)} />
      {task.data?.map(
        ({ id, name, discription, startDate, endtDate, employeeId }) => {
          return (
            <div key={id} className={scss.box}>
              <span className={scss.text}> {name}</span>
              <span className={scss.text}>{discription}</span>
              <span className={scss.text}>{startDate}</span>
              <span className={scss.text}>{endtDate}</span>
              <span className={scss.text}>{employeeId}</span>
              <span
                className={scss.icon}
                onClick={() => {
                  setOpen(true);
                  setData({
                    id,
                    name,
                    discription,
                    startDate,
                    endtDate,
                    employeeId,
                  });
                }}
              >
                <EditIcon />
              </span>
              <span
                className={scss.icon}
                onClick={() => {
                  dispatch(deleteTask(id)).then(() => {
                    dispatch(getTasks());
                  });
                }}
              >
                <DeleteIcon />
              </span>
            </div>
          );
        }
      )}
      <div className={scss.pagination}>
        {!!task.length && (
          <PaginatedItems
            itemsPerPage={10}
            totalCount={task["headers"]["x-total-count"]}
            setElectedPage={setElectedPage}
          />
        )}
      </div>
    </div>
  );
};
export default Tasks;
