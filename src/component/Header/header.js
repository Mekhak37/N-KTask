import { menuState } from "../state/state";
import { Link } from "react-router-dom";
import scss from "./header.module.scss";
const Header = () => {
  return (
    <ul className={scss.header}>
      {menuState.map(({ id, name, path }) => {
        return (
          <li key={id}>
            <Link to={path}>{name}</Link>
          </li>
        );
      })}
    </ul>
  );
};
export default Header;
