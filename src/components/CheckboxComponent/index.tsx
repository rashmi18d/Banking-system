import React from "react";
import styles from "./checkbox.module.scss";

interface CheckBoxInterface {
  checked: boolean;
  onChange: () => void; // Pass the onChange handler from the parent
}

const CheckboxComponent: React.FC<CheckBoxInterface> = ({
  checked,
  onChange,
}) => {
  return (
    <div>
      <label>
        <input
          className={styles.checkboxInputContainer}
          type="checkbox"
          checked={checked} // Use the passed checked prop
          onChange={onChange} // Use the passed onChange handler
        />
      </label>
    </div>
  );
};

export default CheckboxComponent;
