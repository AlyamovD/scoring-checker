import Icon from "icon";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "store/hooks";
import styles from "./styles.module.scss";

const Home = () => {
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.forms);
  const navigate = useNavigate();

  const handleAddNewForm = async () => {
    let form = await dispatch.forms.FETCH_CREATE_FORM();
    navigate(`/form/${form.id}/constructor`);
  };

  const handleDeleteForm = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    dispatch.forms.FETCH_DELETE_FORM(id);
  };

  return (
    <div className={styles.home}>
      <div className={styles.container}>
        {forms.map((form) => (
          <Link to={`/form/${form.id}/constructor`} className={styles.card} key={form.id}>
            <button className={styles.card__deleteButton} onClick={(e) => handleDeleteForm(e, form.id)}>
              <Icon name="delete" size={20} />
            </button>
            {form.title}
          </Link>
        ))}
        <button className={styles.card} onClick={handleAddNewForm}>
          <Icon name="add" size={40} />
        </button>
      </div>
    </div>
  );
};

export default Home;
