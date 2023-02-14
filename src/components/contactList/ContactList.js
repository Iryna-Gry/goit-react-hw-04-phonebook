import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contactData, deleteContact }) => {
  return (
    <ul className={css.Contact__list}>
      {contactData.map(({ name, number, id }) => {
        return (
          <li
            key={id}
            name={name}
            number={number}
            className={css.Contact__item}
          >
            <p>{name}</p>
            <p>{number}</p>
            <button
              type="button"
              className={css.Btn}
              onClick={() => deleteContact(id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};
ContactList.propTypes = {
  contactData: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  deleteContact: PropTypes.func.isRequired,
};
