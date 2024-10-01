import React, { useState } from "react";
import styles from "./checkbox.module.scss";

const CheckboxComponent: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  return (
    <div>
      <label>
        <input
          className={styles.checkboxInputContainer}
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default CheckboxComponent;
