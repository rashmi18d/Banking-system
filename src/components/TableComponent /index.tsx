import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import CheckboxComponent from "../CheckboxComponent";
import styles from "./SimpleTable.module.scss";

const SimpleTable = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [sortConfig, setSortConfig] = useState({
    key: "",
    direction: "ascending",
  });

  // Sample data for the table
  const data = [
    {
      id: 1,
      name: "Jon Snow",
      age: 35,
      dueDate: "2024-10-15",
      outstandingAmount: 150,
    },
    {
      id: 2,
      name: "Cersei Lannister",
      age: 42,
      dueDate: "2024-09-01",
      outstandingAmount: 200,
    },
    {
      id: 3,
      name: "Jaime Lannister",
      age: 45,
      dueDate: "2024-11-05",
      outstandingAmount: 100,
    },
    {
      id: 4,
      name: "Arya Stark",
      age: 16,
      dueDate: "2024-12-20",
      outstandingAmount: 50,
    },
    {
      id: 5,
      name: "Daenerys Targaryen",
      age: 29,
      dueDate: "2024-10-30",
      outstandingAmount: 250,
    },
  ];

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

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Invoice#</th>
            <th
              onClick={() => requestSort("dueDate")}
              style={{ cursor: "pointer" }}
              className={styles.sortableHeader}
            >
              Due Date
              <span className={styles.sortIcons}>
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "dueDate" &&
                    sortConfig.direction === "ascending"
                      ? faSortUp
                      : faSort
                  }
                />
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "dueDate" &&
                    sortConfig.direction === "descending"
                      ? faSortDown
                      : faSort
                  }
                  style={{ marginLeft: "4px" }}
                />
              </span>
            </th>
            <th
              onClick={() => requestSort("outstandingAmount")}
              style={{ cursor: "pointer" }}
              className={styles.sortableHeader}
            >
              Outstanding Amount
              <span className={styles.sortIcons}>
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "outstandingAmount" &&
                    sortConfig.direction === "ascending"
                      ? faSortUp
                      : faSort
                  }
                />
                <FontAwesomeIcon
                  icon={
                    sortConfig.key === "outstandingAmount" &&
                    sortConfig.direction === "descending"
                      ? faSortDown
                      : faSort
                  }
                  style={{ marginLeft: "4px" }}
                />
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr key={row.id}>
              <td>
                <CheckboxComponent
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleCheckboxChange(row.id)}
                />
                {row.id} {/* Changed to show Invoice# instead of name */}
              </td>
              <td>{row.dueDate}</td>
              <td>{row.outstandingAmount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimpleTable;
