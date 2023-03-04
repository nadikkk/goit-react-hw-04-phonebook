import PropTypes from 'prop-types';
import css from './Filter.module.css';

export function Filter({isFilter }) {
  const changeInput = e => {
  	 isFilter(e.currentTarget.value)
  };
  return (
    <div className={css.filter}>
      <label htmlFor="">Find contacts by name</label>
      <input type="text" onChange={changeInput} />
    </div>
  );
}
Filter.propTypes = {
  isFilter: PropTypes.func.isRequired,
};
