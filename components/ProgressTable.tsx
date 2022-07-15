import React from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useSortByuseFilters,
  useGlobalFilter,
  useAsyncDebounce,
} from "react-table";
import matchSorter from "match-sorter";
import { Checkbox, FormLabel, SimpleGrid, Text } from "@chakra-ui/react";

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function MultiCheckBoxColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id },
}) {
  const options = React.useMemo(() => {
    let counts = {};
    preFilteredRows.forEach((x) => {
      x = x.values[id].toString();

      counts[x] = (counts[x] || 0) + 1;
    });
    return counts;
  }, [id, preFilteredRows]);

  const [checked, setChecked] = React.useState(Object.keys(options));

  const onChange = (e) => {
    const t = e.target.name.toString();

    if (checked && checked.includes(t)) {
      setFilter(checked.filter((v) => v !== t));
      // setChecked((p) => p.filter((v) => v !== t));
      setChecked((prevChecked) => {
        if (prevChecked.length === 1) return Object.keys(options);
        return prevChecked.filter((v) => v !== t);
      });
    } else {
      setFilter([...checked, t]);
      setChecked((prevChecked) => [...prevChecked, t]);
    }
  };

  return (
    <SimpleGrid>
      <div
        style={{ cursor: "pointer" }}
        onClick={() => {
          setChecked(Object.keys(options));
          setFilter([]);
        }}
      >
        Show <span>All</span>
      </div>

      {Object.entries(options)
        .sort()
        .map(([option, count], i) => {
          return (
            <Checkbox
              key={i}
              type='checkbox'
              name={option}
              id={option}
              isChecked={checked.includes(option)}
              onChange={onChange}
            >
              {`${option} (${count})`}
            </Checkbox>
          );
        })}
    </SimpleGrid>
  );
}

function fuzzyTextFilterFn(rows, id, filterValue) {
  return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
}

// Let the table remove the filter if the string is empty
// fuzzyTextFilterFn.autoRemove = (val) => !val;

export function ProgressTable({ tableData }) {
  const data = React.useMemo(() => tableData, [tableData]);

  const columns = React.useMemo(
    () => [
      {
        // Header: 'Title',
        accessor: "title",
        // Filter: CheckBoxColumnFilter,
        defaultCanFilter: false,
        Cell: ({ cell: { value } }: any) => <Text size='sm'>{value}</Text>,
      },
      {
        Header: "Region",
        accessor: "region.name",
        Filter: MultiCheckBoxColumnFilter,
        filter: "includesSome",
        defaultCanFilter: true,
        // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      },
      {
        Header: "Status",
        accessor: "projectStatus",
        Filter: MultiCheckBoxColumnFilter,
        filter: "includesSome",

        defaultCanFilter: true,
        Cell: ({ cell: { value } }: any) => <Text>{value}</Text>,
      },
      {
        Header: "Type",
        accessor: "buildType.title",
        Filter: MultiCheckBoxColumnFilter,
        filter: "includesSome",

        defaultCanFilter: true,
        // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      },
    ],
    []
  );
  // Use the state and functions returned from useTable to build your UI

  const filterTypes = React.useMemo(
    () => ({
      multiSelect: (rows, id, filterValues) => {
        console.log("👾 ~ ProgressTable ~ filterValues", filterValues);
        if (filterValues.length === 0) return rows;
        return rows.filter((r) => filterValues.includes(r.values[id]));
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
    },
    useFilters, // useFilters!
    useGlobalFilter, // useGlobalFilter!
    useSortBy
  );

  // Render the UI for your table
  return (
    <React.Fragment>
      <hr />
      {headerGroups.map((headerGroup, i) => (
        <div key={i} {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <div key={column.render("Header")}>
              {column.canFilter ? column.render("Header") : null}
              <div>{column.canFilter ? column.render("Filter") : null}</div>
            </div>
          ))}
        </div>
      ))}

      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, x) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  key={x}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}

                  {/* Add a sort direction indicator */}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? " 🔽"
                        : " 🔼"
                      : ""}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                {row.cells.map((cell, x) => {
                  return (
                    <td key={x} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}
