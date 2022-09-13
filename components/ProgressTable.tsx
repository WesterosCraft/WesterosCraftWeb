/* eslint-disable react/jsx-key */
import React from 'react';
import {
  Select,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Flex,
  Input,
  Button,
  Text,
  TableContainer,
} from '@chakra-ui/react';
import {
  useTable,
  usePagination,
  useSortBy,
  useFilters,
  useGroupBy,
  useExpanded,
  useRowSelect,
  useGlobalFilter,
  useAsyncDebounce,
} from 'react-table';
import 'regenerator-runtime/runtime';
import { matchSorter } from 'match-sorter';
import { nameFormatter } from '../utils';

const ProgressTable = ({ data }: any) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        disableFilters: true,
        Cell: ({ cell: { value } }: any) => <Text size="sm">{value}</Text>,
      },
      {
        Header: 'Status',
        accessor: 'projectStatus',
        Filter: SelectColumnFilter,
        filter: 'includes',
        defaultCanFilter: true,
        Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      },
      {
        Header: 'Region',
        accessor: 'region.name',
        Filter: SelectColumnFilter,
        filter: 'includes',
        defaultCanFilter: true,
        Cell: ({ cell: { value } }: any) => <>{value}</>,
      },
      {
        Header: 'Type',
        accessor: 'buildType.title',
        Filter: SelectColumnFilter,
        filter: 'includes',
        defaultCanFilter: true,
        Cell: ({ cell: { value } }: any) => <>{value}</>,
      },
    ],
    [],
  );
  const filterTypes = React.useMemo(
    () => ({
      fuzzyText: fuzzyTextFilterFn,
      text: (rows: any, id: any, filterValue: any) => {
        return rows.filter((row: any) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue).toLowerCase().startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    [],
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    nextPage,
    previousPage,
    state,
    setPageSize,
    state: { pageIndex, pageSize },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      disableMultiSort: true,
    },
    useGlobalFilter,
    useFilters,
    useGroupBy,
    useSortBy,
    useExpanded,
    usePagination,
    useRowSelect,
  );

  // Render the UI for your table
  return (
    <TableContainer>
      <Flex width="full" justifyContent="flex-end">
        <Select
          mr={4}
          width="120px"
          value={pageSize}
          borderColor="primaryDark"
          borderRadius="none"
          onChange={e => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </Select>
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={state.globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </Flex>
      <Table
        my={3}
        borderWidth="1px"
        borderColor="primaryDark"
        variant="striped"
        {...getTableProps()}
      >
        <Thead>
          {headerGroups.map((headerGroup, i) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <Th {...column.getHeaderProps()}>
                  <Box mb="2">
                    <Text fontFamily="body" {...column.getSortByToggleProps()}>
                      {column.render('Header')}
                      {/* Add a sort direction indicator */}
                      {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                    </Text>
                  </Box>
                  {/* Render the columns filter UI */}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody borderBottomWidth="1.2px" borderColor="primaryDark" {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell, i) => {
                  return (
                    <Td border={0} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      {/*
        Pagination can be built however you'd like.
        This is just a very basic UI implementation:
      */}
      <Flex direction="row" align="center" justifyContent="flex-end" className="pagination">
        <Button
          variant="outline"
          size="sm"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          Previous
        </Button>
        <Box px={4}>
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Box>
        <Button variant="outline" size="sm" onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </Button>
      </Flex>
    </TableContainer>
  );
};

// Define a default UI for filtering
// function DefaultColumnFilter({ column: { filterValue, preFilteredRows, setFilter } }: any) {
//   const count = preFilteredRows.length;

//   return (
//     <Input
//       size="xs"
//       borderRadius="none"
//       borderColor="primaryDark"
//       fontFamily="body"
//       value={filterValue || ''}
//       onChange={e => {
//         setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
//       }}
//       placeholder={`Search ${count} builds...`}
//     />
//   );
// }

function SelectColumnFilter({ column: { filterValue, setFilter, preFilteredRows, id } }: any) {
  // Calculate the options for filtering
  // using the preFilteredRows
  const options = React.useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row: any) => {
      options.add(row.values[id]);
    });
    // @ts-ignore
    return [...options.values()];
  }, [id, preFilteredRows]);

  // Render a multi-select box
  return (
    <Select
      size="xs"
      value={filterValue}
      borderRadius="none"
      borderColor="primaryDark"
      onChange={e => {
        setFilter(e.target.value || undefined);
      }}
      fontFamily="body"
    >
      <option value="">All</option>
      {options.map((option: any, i) => (
        <option key={i} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
}

function GlobalFilter({ preGlobalFilteredRows, globalFilter, setGlobalFilter }: any) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <Input
      maxW={300}
      size="md"
      borderRadius="none"
      borderColor="primaryDark"
      fontFamily="body"
      value={value || ''}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

function fuzzyTextFilterFn(rows: any, id: any, filterValue: any) {
  return matchSorter(rows, filterValue, {
    keys: [(row: any) => row.values[id]],
  });
}

// Let the table remove the filter if the string is empty
fuzzyTextFilterFn.autoRemove = (val: any) => !val;

// Define a custom filter filter function!
function filterGreaterThan(rows: any, id: any, filterValue: any) {
  return rows.filter((row: any) => {
    const rowValue = row.values[id];
    return rowValue >= filterValue;
  });
}

filterGreaterThan.autoRemove = (val: any) => typeof val !== 'number';

export default ProgressTable;
