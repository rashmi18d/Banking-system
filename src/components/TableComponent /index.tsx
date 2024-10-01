import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import CheckboxComponent from "../CheckboxComponent";
import styles from "./simpletable.module.scss";

const SimpleTable = ({ customerDetails }) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  // Sample data for the table
  const data = customerDetails.invoices;
  //   [
  //     {
  //       id: 1,
  //       name: "Jon Snow",
  //       age: 35,
  //       dueDate: "2024-10-15",
  //       outstandingAmount: 150,
  //     },
  //     {
  //       id: 2,
  //       name: "Cersei Lannister",
  //       age: 42,
  //       dueDate: "2024-09-01",
  //       outstandingAmount: 200,
  //     },
  //     {
  //       id: 3,
  //       name: "Jaime Lannister",
  //       age: 45,
  //       dueDate: "2024-11-05",
  //       outstandingAmount: 100,
  //     },
  //     {
  //       id: 4,
  //       name: "Arya Stark",
  //       age: 16,
  //       dueDate: "2024-12-20",
  //       outstandingAmount: 50,
  //     },
  //     {
  //       id: 5,
  //       name: "Daenerys Targaryen",
  //       age: 29,
  //       dueDate: "2024-10-30",
  //       outstandingAmount: 250,
  //     },
  //   ];

  // Function to handle checkbox selection
  const handleCheckboxChange = (id: number) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

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

  // Function to render sorting icon based on current sorting state
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
            <th>Invoice#</th>
            <th> Document Details </th>
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
                {row.invoiceId}
              </td>
              <td>{row.IN1718000000492024}</td>
              <td>{row.invoiceDate}</td>
              <td>{row.outstandingAmount}</td>
              <td>{row.dueDate}</td>
              <td>{row.}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
