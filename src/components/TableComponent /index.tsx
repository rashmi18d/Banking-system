import React, { useState, useMemo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import CheckboxComponent from "../CheckboxComponent";
import styles from "./simpletable.module.scss";

interface SimpleTableProps {
  customerDetails: any;
  selectAll: boolean;
  customerName: string;
  handleIntermediateChange: (checked: boolean | "intermediate") => void;
}

const SimpleTable: React.FC<SimpleTableProps> = ({
  customerDetails,
  selectAll,
  customerName,
  handleIntermediateChange,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const data = customerDetails?.invoices?.data?.invoices || [];

  const handleCheckboxChange = (id: string) => {
    console.log(id, "id");
    const rowsSelected = selectedRows.includes(id)
      ? selectedRows.filter((rowId) => rowId !== id)
      : [...selectedRows, id];

    setSelectedRows(rowsSelected);
    invoiceCheckboxMethod(rowsSelected.length);
  };

  useEffect(() => {
    if (selectAll) {
      const allInvoiceIds = data
        .filter((row: any) => row.customerName === customerName)
        .map((row: any) => row.invoiceId);
      setSelectedRows(allInvoiceIds);
    } else {
      setSelectedRows([]);
    }
  }, [selectAll]);

  const invoiceCheckboxMethod = (selectedCount: any) => {
    const totalInvoices = data.length;
    // const selectedCount = selectedRows.length;

    if (selectedCount > 0 && selectedCount < totalInvoices) {
      handleIntermediateChange("intermediate");
    } else if (selectedCount === totalInvoices) {
      handleIntermediateChange(true);
    } else {
      handleIntermediateChange(false);
    }
  };

  // useEffect(() => {
  //   invoiceCheckboxMethod();
  // }, [selectedRows]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const renderSortIcon = (key: string) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "ascending" ? (
        <FontAwesomeIcon icon={faSortUp} />
      ) : (
        <FontAwesomeIcon icon={faSortDown} />
      );
    }
    return <FontAwesomeIcon icon={faSort} />;
  };

  return (
    <div className={styles.tableContainer}>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Invoice#</th>
            <th>Document Details</th>
            <th>Invoice Date</th>
            <th
              onClick={() => requestSort("outstandingAmount")}
              style={{ cursor: "pointer" }}
              className={styles.sortableHeader}
            >
              Outstanding Amount
              <span className={styles.sortIcons}>
                {renderSortIcon("outstandingAmount")}
              </span>
            </th>
            <th
              onClick={() => requestSort("dueDate")}
              style={{ cursor: "pointer" }}
              className={styles.sortableHeader}
            >
              Due Date
              <span className={styles.sortIcons}>
                {renderSortIcon("dueDate")}
              </span>
            </th>
            <th>Status</th>
            <th>Last Reminder</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.invoiceId}>
              <td>
                <CheckboxComponent
                  checked={selectedRows.includes(row.invoiceId)}
                  onChange={() => handleCheckboxChange(row.invoiceId)}
                />
              </td>
              <td>{row?.invoiceId || "N/A"}</td>
              <td>{row?.documentType || "N/A"}</td>
              <td>{row?.invoiceDate || "N/A"}</td>
              <td>{row?.outstandingAmount || "N/A"}</td>
              <td>{row?.dueDate || "N/A"}</td>
              <td>{row?.status || "Pending"}</td>
              <td>{row?.lastReminder || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
