import React, { useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./accordion.module.scss";
import CheckboxComponent from "../CheckboxComponent";
import SimpleTable from "../TableComponent ";

interface AccordionProps {
  hasCheckbox: boolean;
  id: string | number;
  customerDetails: any;
  customerName: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({
  customerDetails,
  hasCheckbox,
  id,
  customerName,
  children,
}) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | number>(
    ""
  );
  const [isChecked, setIsChecked] = useState(false);
  const handleIconClick = (customerId: string | number) => {
    setExpandedAccordion(expandedAccordion === customerId ? "" : customerId);
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  return (
    <div className={styles.accordionContainer}>
      <div key={id} className={styles.subContainer}>
        {hasCheckbox && (
          <CheckboxComponent
            checked={isChecked}
            onChange={(e) => handleCheckboxChange(e.target.checked)}
          />
        )}
        {children}
        <FontAwesomeIcon
          onClick={() => handleIconClick(id)}
          icon={faAngleDown}
          className={`${styles.arrowIcon} ${
            expandedAccordion === id ? styles.rotate : ""
          }`}
        />
      </div>
      {expandedAccordion === id && (
        <div>
          <SimpleTable
            customerDetails={customerDetails}
            selectAll={isChecked}
            customerName={customerName}
          />
        </div>
      )}
    </div>
  );
};

export default Accordion;
