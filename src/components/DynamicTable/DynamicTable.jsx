import React from "react";
import PropTypes from "prop-types";
import "./DynamicTable.scss";
import SortIcon from "../../assets/icons/sort-24px.svg?react";

const DynamicTable = ({ columns, records }) => {
  return (
    <div className="dynamic-table">
      <table className="dynamic-table__table">
        <thead className="dynamic-table__thead">
          <tr className="dynamic-table__tr">
            {columns.map((column) => (
              <th key={column.accessor} className="dynamic-table__th">
                <div className="dynamic-table__th__content" header-label={column.Header}>
                    {column.Header}
                    {column.Header !== "Actions" && <SortIcon className="dynamic-table__sort-icon" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="dynamic-table__tbody">
          {records.map((row, rowIndex) => (
            <tr key={rowIndex} className="dynamic-table__tr">
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="dynamic-table__td"
                  data-label={column.Header}
                >
                  {React.isValidElement(row[column.accessor]) ? (
                    row[column.accessor]
                  ) : (
                    <p>{row[column.accessor]}</p>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

DynamicTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      Header: PropTypes.string.isRequired,
      accessor: PropTypes.string.isRequired,
    })
  ).isRequired,
  records: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DynamicTable;
