import { Box, Heading, Text, VStack, SimpleGrid } from "@chakra-ui/react";
import React, { Fragment, useMemo } from "react";
import { useTable, useFilters } from "react-table";

export const ProgressTable = ({ tableData }) => {
  const data = React.useMemo(() => tableData, [tableData]);

  // const columns = React.useMemo(
  //   () => [
  //     {
  //       Header: "Brand",
  //       accessor: "col1", // accessor is the "key" in the data
  //       Filter: SelectColumnFilter,
  //       filter: MultipleFilter,
  //     },
  //     {
  //       Header: "Type",
  //       accessor: "col2",
  //       Filter: "",
  //       filter: "",
  //     },
  //   ],
  //   []
  // );

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        Cell: ({ cell: { value } }: any) => <Text size='sm'>{value}</Text>,
      },
      // {
      //   Header: "Region",
      //   accessor: "region",
      //   Filter: SelectColumnFilter,
      //   filter: "includes",
      //   defaultCanFilter: true,
      //   // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      // },
      // {
      //   Header: "Status",
      //   accessor: "projectStatus",
      //   Filter: SelectColumnFilter,
      //   filter: "includes",
      //   defaultCanFilter: true,
      //   // Cell: ({ cell: { value } }: any) => <StatusTag>{value}</StatusTag>,
      // },
      // {
      //   Header: "Type",
      //   accessor: "buildType",
      //   Filter: SelectColumnFilter,
      //   filter: "includes",
      //   defaultCanFilter: true,
      //   // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      // },
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
            <tr key={headerGroup.key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th key={column.key} {...column.getHeaderProps()}>
                  {/* <div>{column.canFilter ? column.render("Filter") : null}</div> */}
                </th>
              ))}
            </tr>
          ))}
        </thead>
      </table>
      <Box
        width='full'
        {...getTableProps()}
        style={{ border: "solid 1px blue" }}
      >
        {/* <thead>
          {headerGroups.map((headerGroup) => (
            <tr key={headerGroup.key} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  key={column.key}
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
        </thead> */}
        <SimpleGrid minChildWidth={300} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            console.log("👾 ~ {rows.map ~ row", row);
            return (
              <VStack key={row.key} {...row.getRowProps()}>
                <Text>{row.original.title}</Text>
                {/* {row.cells.map((cell) => {
                  return (
                    <Box {...cell.getCellProps()}>{cell.render("Cell")}</Box>
                    // <td
                    //   key={cell.key}

                    //   style={{
                    //     padding: "10px",
                    //     border: "solid 1px gray",
                    //     background: "papayawhip",
                    //   }}
                    // >
                    //   {cell.render("Cell")}
                    // </td>
                  );
                })} */}
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
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
