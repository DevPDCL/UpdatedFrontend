import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

/**
 * Reusable search input component with consistent styling
 */
const SearchInput = forwardRef(({
  value,
  onChange,
  placeholder,
  disabled = false,
  className = "",
  ...props
}, ref) => {
  const baseClasses = "block py-2.5 px-2 w-full text-sm md:text-base rounded-lg shadow-2xl border border-gray-300 hover:border-PDCL-green/50 focus:outline-none focus:ring-0 focus:border-PDCL-green text-gray-900 bg-white placeholder-gray-900 peer transition-all duration-200";
  
  const combinedClasses = `${baseClasses} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    />
  );
});

SearchInput.displayName = 'SearchInput';

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SearchInput;