import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export function ContactList({ contacts, isDelete }) {

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => {
        return (
          <li key={id} className={css.item}>
            <span>
              {name} : {number}
            </span>
            <button type="button" className={css.btn} onClick={() => {isDelete(id)}}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
}
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  isDelete: PropTypes.func.isRequired,
};
