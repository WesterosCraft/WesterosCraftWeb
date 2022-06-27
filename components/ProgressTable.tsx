import React, { Fragment, useMemo } from "react";
import { useTable, useFilters } from "react-table";

export const ProgressTable = () => {
  const data = React.useMemo(
    () => [
      {
        col1: "Hollister",
        col2: "Shirt",
      },
      {
        col1: "Abercrombie",
        col2: "Shorts",
      },
      {
        col1: "Whatever",
        col2: "T-Shirt",
      },
      {
        col1: "Hollister",
        col2: "Shorts",
      },
      {
        col1: "Abercrombie",
        col2: "Jacket",
      },
      {
        col1: "Whatever",
        col2: "Hoodie",
      },
      {
        col1: "Hollister",
        col2: "T-Shirt",
      },
      {
        col1: "Abercrombie",
        col2: "Shorts",
      },
      {
        col1: "Whatever",
        col2: "Tank Top",
      },
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: "Brand",
        accessor: "col1", // accessor is the "key" in the data
        Filter: SelectColumnFilter,
        filter: MultipleFilter,
      },
      {
        Header: "Type",
        accessor: "col2",
        Filter: "",
        filter: "",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useFilters);
  return (
    <>
      <table {...getTableProps()} className='text-sm'>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <table {...getTableProps()} style={{ border: "solid 1px blue" }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  style={{
                    borderBottom: "solid 3px red",
                    background: "aliceblue",
                    color: "black",
                    fontWeight: "bold",
                  }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      style={{
                        padding: "10px",
                        border: "solid 1px gray",
                        background: "papayawhip",
                      }}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export const MultipleFilter = (rows, filler, filterValue) => {
  const arr = [];
  rows.forEach((val) => {
    // console.log(val);
    if (filterValue.includes(val.original.col1)) arr.push(val);
    console.log(filterValue);
    console.log(val.original.col1);
  });
  console.log(arr);
  return arr;
};

function setFilteredParams(filterArr, val) {
  console.log(filterArr);
  console.log(val);
  // if (val === undefined) return undefined;
  if (filterArr.includes(val)) {
    filterArr = filterArr.filter((n) => {
      return n !== val;
    });
  } else filterArr.push(val);

  if (filterArr.length === 0) filterArr = undefined;
  return filterArr;
}

function SelectColumnFilter({
  column: { filterValue = [], setFilter, preFilteredRows, id },
}) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <Fragment>
      <div className='block'>
        <span className='block capitalize mb-4'>{id}</span>
        {options.map((option: string, i) => {
          return (
            <Fragment key={i}>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  className='focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded'
                  id={option}
                  name={option}
                  value={option}
                  onChange={(e) => {
                    setFilter(setFilteredParams(filterValue, e.target.value));
                  }}
                ></input>
                <label
                  htmlFor={option}
                  className='ml-1.5 font-medium text-gray-700'
                >
                  {option}
                </label>
              </div>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
