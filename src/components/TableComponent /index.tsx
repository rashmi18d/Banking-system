import React, { useState, useEffect } from "react";
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
}

const SimpleTable: React.FC<SimpleTableProps> = ({
  customerDetails,
  selectAll,
  customerName,
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  const data = customerDetails?.invoices?.data?.invoices || [];

  const handleCheckboxChange = (id: string) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  useEffect(() => {
    if (selectAll) {
      const allInvoiceIds = data
        .filter((row: any) => row.customerName === customerName)
        .map((row: any) => row.invoiceId);
      setSelectedRows(allInvoiceIds);
    } else {
      setSelectedRows((prevSelected) =>
        prevSelected.filter(
          (rowId) =>
            !data.some(
              (row: any) =>
                row.invoiceId === rowId && row.customerName === customerName
            )
        )
      );
    }
  }, [selectAll, customerName, data]);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = React.useMemo(() => {
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
    <div className="table-container">
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
