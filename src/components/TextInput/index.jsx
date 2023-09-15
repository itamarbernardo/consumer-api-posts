import './styles.css';

import P from 'prop-types';

export const TextInput = ({ handleChange, searchValue }) => {
  return (
    <input
      className="text-input"
      onChange={handleChange}
      value={searchValue}
      type="search"
      placeholder="Digite sua busca..."
    />
  );
};

TextInput.propTypes = {
  handleChange: P.func.isRequired,
  searchValue: P.string.isRequired,
};
