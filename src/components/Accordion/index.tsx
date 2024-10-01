import React, { useState } from "react";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./accordion.module.scss";
import CheckboxComponent from "../CheckboxComponent";
import SimpleTable from "../TableComponent ";

interface AccordionProps {
  hasCheckbox: boolean;
  id: string | number;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ hasCheckbox, id, children }) => {
  const [expandedAccordion, setExpandedAccordion] = useState<string | number>(
    ""
  );

  const handleIconClick = (customerId: string | number) => {
    setExpandedAccordion(expandedAccordion === customerId ? "" : customerId);
  };

  return (
    <div className={styles.accordionContainer}>
      <div key={id} className={styles.subContainer}>
        {hasCheckbox && <CheckboxComponent />}
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
          <SimpleTable />
        </div>
      )}
    </div>
  );
};

export default Accordion;
