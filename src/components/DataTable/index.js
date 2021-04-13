import React, { useEffect, useState } from "react";
// import PropTypes from 'prop-types';
import { Button, ButtonGroup, Col, Row, Table } from "reactstrap";
import config from "./config";
import CustomPagination from "./pagination";

// ? Table data structure
// ? columns: [] : this will be the table headers
// ? inside column { label, field, width, sort, emptyFormat }
// ? rows: [] : this will be the table datas

const CustomDataTable = ({ tableData, sortable }) => {
  const [tableRows, setTableRows] = useState([]);
  const [pageSize, setPageSize] = useState(config.pageSizeOptions[0]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);

  useEffect(() => {
    const processRows = () => {
      const { rows } = tableData;
      let processedRows = [];
      if (rows.length > 0) {
        rows.forEach((row) => {
          let newRow = null;
          tableData.columns.forEach((col) => {
            newRow = { ...newRow, [col.field]: row[col.field] };
          });
          processedRows = [...processedRows, newRow];
        });
      }
      setTableRows(processedRows);
    };
    processRows();
  }, [tableData]);

  const sortData = (field) => {};

  return (
    <div>
      <Table bordered responsive>
        <thead>
          <tr>
            {tableData.columns.map((col) => {
              const { field, label, width } = col;
              return (
                <th
                  onClick={() => this.sortData(field)}
                  style={{
                    width: typeof width !== "undefined" ? `${width}%` : "auto"
                  }}
                  key={field}
                >
                  {label}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, idx) => {
            if (idx >= startIndex && idx <= endIndex) {
              return (
                <tr key={row.id}>
                  {tableData.columns.map((col) => {
                    return (
                      <td key={col.field} className="py-2">
                        {row[col.field]}
                      </td>
                    );
                  })}
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </Table>
      <Row className="align-items-center mt-2">
        <Col>
          <span className="mr-2">Rows per page</span>
          <ButtonGroup size="sm">
            {config.pageSizeOptions.map((rows) => (
              <Button
                color={rows === pageSize ? "primary" : "outline-secondary"}
                key={rows}
                onClick={() => setPageSize(rows)}
              >
                {rows}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
        <Col>
          <CustomPagination
            totalItems={tableRows.length}
            pageSize={pageSize}
            maxPages={5}
            onChangePage={(startIdx, endIdx) => {
              setStartIndex(startIdx);
              setEndIndex(endIdx);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

CustomDataTable.propTypes = {};

export default CustomDataTable;
