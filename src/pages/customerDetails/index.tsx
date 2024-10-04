import Accordion from "../../components/Accordion";
import customerDetails from "../../../data/customer.json";
import styles from "./customerDetails.module.scss";

const CustomerDetails = () => {
  const headerKeys = [
    "customerId",
    "totalInvoices",
    "outstandingAmount",
    "overDueInvoices",
    "overDueAmount",
    "creditOrDebitNote",
  ];

  const formatHeaderKey = (key: string) => {
    return key
      .replace(/([A-Z])/g, " $1") // Add space before capital letters
      .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
  };

  return (
    <div>
      {customerDetails.data.data.map((customer) => {
        return (
          <div>
            <Accordion
              hasCheckbox={true}
              id={customer.customerId}
              key={customer.customerId}
              customerDetails={customer}
              customerName={customer.customerName}
            >
              <div className={styles.customerName}>{customer.customerName}</div>
              <div className={styles.accordionContent}>
                <div className={styles.customerTable}>
                  <div className={styles.customerHeader}>
                    {headerKeys.map((key) => (
                      <span key={key}>{formatHeaderKey(key)}</span>
                    ))}
                  </div>
                  <div className={styles.customerRow}>
                    {headerKeys.map((key) => (
                      <span key={key}>{customer[key]}</span>
                    ))}
                  </div>
                </div>
              </div>
            </Accordion>
          </div>
        );
      })}
    </div>
  );
};

export default CustomerDetails;
