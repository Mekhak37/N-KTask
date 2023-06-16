import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import scss from "./task.module.scss";
import PaginatedItems from "../../pagination/pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import dayjs from "dayjs";
import BasicModal from "../../modal/modal";
import EditIcon from "@mui/icons-material/Edit";
import { getTasks, deleteTask, serchTask } from "../../../features/task/task";
import CircularIndeterminate from "../../loading/loading";

const Tasks = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedPage, setElectedPage] = useState(1);
  const [startDateValue, setStartDateValue] = React.useState(
    dayjs("2022-04-17")
  );
  const [endDateValue, setEndDateValue] = React.useState(dayjs("2022-04-17"));
  const [data, setData] = useState({
    id: null,
    name_link: "",
    discription_like: "",
    startDate: "",
    endtDate: "",
  });
  const taskInput = ["name_like", "description_like"];
  const { task, loading } = useSelector((state) => state.task);
  useEffect(() => {
    dispatch(getTasks(selectedPage));
  }, [selectedPage, dispatch]);

  if (loading) {
    return <CircularIndeterminate />;
  }

  return (
    <div>
      <div style={{ display: "flex" }}>
        <BasicModal
          startDateValue={startDateValue}
          setStartDateValue={setStartDateValue}
          endDateValue={endDateValue}
          setEndDateValue={setEndDateValue}
          open={open}
          setOpen={setOpen}
          data={data}
          setData={setData}
          inputData={taskInput}
          type="task"
        />
        <AddBoxIcon onClick={() => setOpen(true)} />
      </div>
      {task.data?.map(
        ({
          id,
          name_like,
          description_like,
          startDate,
          endDate,
          employeeId,
        }) => {
          return (
            <div key={id} className={scss.box}>
              <span className={scss.text}> {name_like}</span>
              <span className={scss.text}>{description_like}</span>
              <span className={scss.text}>{startDate?.substring(0, 10)}</span>
              <span className={scss.text}>{endDate?.substring(0, 10)}</span>
              <span className={scss.text}>{employeeId}</span>
              <span
                className={scss.icon}
                onClick={() => {
                  setOpen(true);
                  setData({
                    id,
                    name_link: name_like,
                    description_like,
                    startDate,
                    endDate,
                    employeeId,
                  });
                  setStartDateValue(dayjs(startDate));
                  setEndDateValue(dayjs(endDate));
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
        {!!task.data?.length && (
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
