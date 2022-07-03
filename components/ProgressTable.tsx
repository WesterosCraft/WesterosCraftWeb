import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  CheckboxGroup,
  Checkbox,
  Grid,
} from '@chakra-ui/react';
import React, { Fragment, useMemo } from 'react';
import { useTable, useFilters } from 'react-table';

//github.com/TanStack/table/discussions/2350

export const ProgressTable = ({ tableData }) => {
  const data = React.useMemo(() => tableData, [tableData]);

  const columns = useMemo(
    () => [
      {
        // Header: 'Title',
        accessor: 'title',
        disableFilters: true,
        // Filter: SelectColumnFilter,
        // defaultCanFilter: false,
        Cell: ({ cell: { value } }: any) => <Text size="sm">{value}</Text>,
      },
      {
        Header: 'Region',
        accessor: 'region.name',
        Filter: SelectColumnFilter,
        filter: 'includesSome',
        defaultCanFilter: true,
        // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      },
      {
        Header: 'Status',
        accessor: 'projectStatus',
        Filter: SelectColumnFilter,
        filter: 'includesSome',

        defaultCanFilter: true,
        Cell: ({ cell: { value } }: any) => <Text>{value}</Text>,
      },
      {
        Header: 'Type',
        accessor: 'buildType.title',
        Filter: SelectColumnFilter,
        filter: 'includesSome',

        defaultCanFilter: true,
        // Cell: ({ cell: { value } }: any) => <>{nameFormatter(value)}</>,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useFilters
  );

  return (
    <>
      <VStack
        align="flex-start"
        spacing={3}
        width={280}
        px={6}
        py={8}
        {...getTableProps()}
        className="text-sm"
      >
        {headerGroups.map((headerGroup) => (
          <CheckboxGroup size="sm" key={headerGroup.key} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(
              (column) =>
                column.Header && (
                  <>
                    <Text>{column?.Header}</Text>
                    <VStack key={column.key} align="flex-start" {...column.getHeaderProps()}>
                      {column?.canFilter ? column.render('Filter') : null}
                    </VStack>
                  </>
                )
            )}
          </CheckboxGroup>
        ))}
      </VStack>
      <Box width="full" {...getTableProps()} style={{ border: 'solid 1px blue' }}>
        <SimpleGrid minChildWidth={300} {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <VStack key={row.key} {...row.getRowProps()}>
                <Text>{row.original.title}</Text>
              </VStack>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
};

function setFilteredParams(filterArr, val) {
  // if (val === undefined) return undefined;
  if (filterArr.includes(val)) {
    filterArr = filterArr.filter((n) => {
      return n !== val;
    });
  } else filterArr.push(val);

  if (filterArr.length === 0) filterArr = undefined;
  return filterArr;
}

function SelectColumnFilter({ column: { filterValue = [], setFilter, preFilteredRows, id } }) {
  const options = useMemo(() => {
    const options = new Set();
    preFilteredRows.forEach((row) => {
      options.add(row.values[id]);
    });
    return [...options.values()];
  }, [id, preFilteredRows]);

  return (
    <>
      {options.map((option: string, i) => {
        return (
          <Checkbox
            key={i}
            value={option}
            onChange={(e) => {
              setFilter(setFilteredParams(filterValue, e.target.value));
            }}
          >
            {option}
          </Checkbox>
        );
      })}
    </>
  );
}
