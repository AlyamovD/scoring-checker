import { Link, NavLink, Outlet } from "react-router-dom";
import classNames from "classnames";

import Icon from "icon";
import styles from "./styles.module.scss";

const FormLayout = () => {
  return (
    <div className={styles.layout}>
      <Link to="/" className={styles.backButton}>
        <Icon name="arrowBack" />
      </Link>
      <div id="container" className={styles.container}>
        <div className={styles.navigation}>
          <NavLink
            to={`/form/constructor`}
            className={({ isActive }) =>
              classNames(styles.navigation__link, isActive && styles.active)
            }
          >
            Конструктор
          </NavLink>
          <NavLink
            to={`/form/preview`}
            className={({ isActive }) =>
              classNames(styles.navigation__link, isActive && styles.active)
            }
          >
            Preview
          </NavLink>
          <NavLink
            to={`/form/json`}
            className={({ isActive }) =>
              classNames(styles.navigation__link, isActive && styles.active)
            }
          >
            JSON
          </NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default FormLayout;
