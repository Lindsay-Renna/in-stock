import PropTypes from "prop-types";
import "./InputField.scss";

const InputField = ({
  className = "input-container",
  placeholder = "Search...",
  icon = null,
}) => {
  return (
    <div
      className={
        className === "input-container"
          ? className
          : className + " input-container"
      }
    >
      <input type="text" placeholder={placeholder} className="input-field" />
      {icon && <span className="input-icon">{icon}</span>}
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
};

export default InputField;
