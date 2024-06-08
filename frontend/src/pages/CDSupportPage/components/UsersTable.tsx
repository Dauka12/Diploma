import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Option from '@mui/joy/Option';
import Select from '@mui/joy/Select';
import Sheet from '@mui/joy/Sheet';
import Table from '@mui/joy/Table';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import { visuallyHidden } from '@mui/utils';
import * as React from 'react';

interface Data {
  calories: number;
  carbs: number;
  fat: number;
  name: string;
  protein: number;
}

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
): Data {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}

const rows = [
  createData('1', 305, 3.7, 67, 4.3),
  createData('2', 452, 25.0, 51, 4.9),
  createData('3', 262, 16.0, 24, 6.0),
  createData('4', 159, 6.0, 24, 4.0),
  createData('5', 356, 16.0, 49, 3.9),
  createData('6', 408, 3.2, 87, 6.5),
  createData('7', 237, 9.0, 37, 4.3),
  createData('8', 375, 0.0, 94, 0.0),
  createData('9', 518, 26.0, 65, 7.0),
  createData('10', 392, 0.2, 98, 0.0),
  createData('11', 318, 0, 81, 2.0),
  createData('12', 360, 19.0, 9, 37.0),
  createData('13', 437, 18.0, 63, 4.0),
];

function labelDisplayedRows({
  from,
  to,
  count,
}: {
  from: number;
  to: number;
  count: number;
}) {
  return `${from}–${to} of ${count !== -1 ? count : `more than ${to}`}`;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'ID',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'iin',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'username',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'role',
  },
  {
    id: 'protein',
    numeric: true,
    disablePadding: false,
    label: 'phone_number',
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <thead>
      <tr>
        <th>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            slotProps={{
              input: {
                'aria-label': 'select all desserts',
              },
            }}
            sx={{ verticalAlign: 'sub' }}
          />
        </th>
        {headCells.map((headCell) => {
          const active = orderBy === headCell.id;
          return (
            <th
              key={headCell.id}
              aria-sort={
                active
                  ? ({ asc: 'ascending', desc: 'descending' } as const)[order]
                  : undefined
              }
            >
              <Link
                underline="none"
                color="neutral"
                textColor={active ? 'primary.plainColor' : undefined}
                component="button"
                onClick={createSortHandler(headCell.id)}
                fontWeight="lg"
                startDecorator={
                  headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                endDecorator={
                  !headCell.numeric ? (
                    <ArrowDownwardIcon sx={{ opacity: active ? 1 : 0 }} />
                  ) : null
                }
                sx={{
                  '& svg': {
                    transition: '0.2s',
                    transform:
                      active && order === 'desc' ? 'rotate(0deg)' : 'rotate(180deg)',
                  },
                  '&:hover': { '& svg': { opacity: 1 } },
                }}
              >
                {headCell.label}
                {active ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </Link>
            </th>
          );
        })}
      </tr>
    </thead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        py: 1,
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: 'background.level1',
        }),
        borderTopLeftRadius: 'var(--unstable_actionRadius)',
        borderTopRightRadius: 'var(--unstable_actionRadius)',
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <FormControl orientation="horizontal" sx={{ width: '100%' }}>
          <FormLabel>Filter by role:</FormLabel>
          <Select
            placeholder="Choose role"
            slotProps={{
              button: {
                'aria-label': 'Filter by role',
              },
            }}
          >
            <Option value="doctors">Doctors</Option>
            <Option value="pharmacies">Pharmacies</Option>
            <Option value="admins">Admins</Option>
            <Option value="patients">Patients</Option>
          </Select>
        </FormControl>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            size="sm"
            variant="outlined"
            color="danger"
            sx={{ ml: 2 }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton
            aria-label="filter list"
            size="sm"
            variant="outlined"
            color="primary"
            sx={{ ml: 'auto' }}
          >
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filter, setFilter] = React.useState<string | null>(null);
  const [filteredRows, setFilteredRows] = React.useState<Data[]>(rows);

  React.useEffect(() => {
    if (filter) {
      const filtered = rows.filter((row) => {
        if (filter === 'doctors') {
          return row.name.includes('D'); // Replace with actual condition
        } else if (filter === 'pharmacies') {
          return row.name.includes('P'); // Replace with actual condition
        } else if (filter === 'admins') {
          return row.name.includes('A'); // Replace with actual condition
        } else if (filter === 'patients') {
          return row.name.includes('P'); // Replace with actual condition
        }
        return true;
      });
      setFilteredRows(filtered);
    } else {
      setFilteredRows(rows);
    }
  }, [filter]);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Sheet
      variant="outlined"
      sx={{
        width: '100%',
        boxShadow: 'sm',
        borderRadius: 'sm',
      }}
    >
      <EnhancedTableToolbar numSelected={selected.length} />
      <Table
        aria-labelledby="tableTitle"
        hoverRow
        sx={{
          '--TableCell-headBackground': (theme) =>
            theme.vars.palette.background.level1,
          '--Table-headerUnderlineThickness': '1px',
          '--TableRow-hoverBackground': (theme) =>
            theme.vars.palette.background.level1,
        }}
      >
        <EnhancedTableHead
          numSelected={selected.length}
          order={order}
          orderBy={orderBy}
          onSelectAllClick={handleSelectAllClick}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <tbody>
          {stableSort(filteredRows, getComparator(order, orderBy))
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              const isItemSelected = isSelected(row.name);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <tr
                  hover
                  onClick={(event) => handleClick(event, row.name)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
                >
                  <td>
                    <Checkbox
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                      slotProps={{
                        input: { id: labelId },
                      }}
                      sx={{ verticalAlign: 'sub' }}
                    />
                  </td>
                  <td id={labelId} scope="row" padding="none">
                    {row.name}
                  </td>
                  <td>{row.calories}</td>
                  <td>{row.fat}</td>
                  <td>{row.carbs}</td>
                  <td>{row.protein}</td>
                </tr>
              );
            })}
          {emptyRows > 0 && (
            <tr
              sx={{
                height: (theme) =>
                  `calc(${theme.spacing(7)} * ${emptyRows})`,
              }}
            >
              <td colSpan={6} />
            </tr>
          )}
        </tbody>
      </Table>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 2,
          my: 2,
          px: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          fontSize="sm"
          sx={{ mr: 2 }}
          textColor="text.secondary"
        >
          {labelDisplayedRows({
            from: page * rowsPerPage + 1,
            to: (page + 1) * rowsPerPage,
            count: rows.length,
          })}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton
            size="sm"
            color="neutral"
            onClick={() => handleChangePage(null, page - 1)}
            disabled={page === 0}
            sx={{ mx: 1 }}
          >
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography fontSize="sm" textColor="text.secondary">
            {page + 1}
          </Typography>
          <IconButton
            size="sm"
            color="neutral"
            onClick={() => handleChangePage(null, page + 1)}
            disabled={page >= Math.ceil(rows.length / rowsPerPage) - 1}
            sx={{ mx: 1 }}
          >
            <KeyboardArrowRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Sheet>
  );
}
