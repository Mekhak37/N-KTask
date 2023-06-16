import { Routes, Route } from "react-router-dom";
import { menuState } from "../state/state";

const Section = () => {
  return (
    <Routes>
      {menuState.map(({ id, element, path }) => {
        return <Route key={id} path={path} element={element} />;
      })}
    </Routes>
  );
};
export default Section;
