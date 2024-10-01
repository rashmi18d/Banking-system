import Accordion from "../../components/Accordion";
import customerDetails from "../../../data/customer.json";
import styles from "./customerDetails.module.scss";

const CustomerDetails = () => {
  return (
    <div>
      {customerDetails.data.data.map((customer) => {
        return (
          <Accordion
            hasCheckbox={true}
            id={customer.customerId}
            key={customer.customerId}
          >
            <div className={styles.customerName}>{customer.customerName}</div>
            <div className={styles.accordionContent}>
              <div className={styles.customerTable}>
                <div className={styles.customerHeader}>
                  <span>Customer ID</span>
                  <span>#Total Invoices</span>
                  <span>Outstanding Amount</span>
                  <span>#Overdue Invoices</span>
                  <span>Overdue Amount</span>
                  <span>Credit/Debit Note</span>
                </div>
                <div className={styles.customerRow}>
                  <span>{customer.customerId}</span>
                  <span>{customer.totalInvoices}</span>
                  <span>{customer.outstandingAmount}</span>
                  <span>{customer.overDueInvoices}</span>
                  <span>{customer.overDueAmount}</span>
                  <span>{customer.creditOrDebitNote}</span>
                </div>
              </div>
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

export default CustomerDetails;
