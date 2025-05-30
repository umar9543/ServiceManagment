import { useMemo } from 'react';
import PropTypes from 'prop-types';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import { decrypt } from 'src/api/encryption';
import { Button } from '@mui/material';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useBoolean } from 'src/hooks/use-boolean';

// ----------------------------------------------------------------------

export default function BookingTableRow({ row, selected, onEditRow, onDeleteRow }) {
  const { companyName, sizeName, industry, address, contactNumber, contactPerson, email, website, country, enrollmentDate } = row;



  const userData = useMemo(() => JSON.parse(localStorage.getItem('UserData')), []);
  const confirm = useBoolean();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <TableRow hover selected={selected}>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{companyName}</TableCell>
        <TableCell>{sizeName}</TableCell>
        <TableCell>{industry}</TableCell>
        <TableCell sx={{ whiteSpace: 'nowrap' }}>{address}</TableCell>
        <TableCell>{contactNumber}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{contactPerson}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{email}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{website}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{country}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{enrollmentDate}</TableCell>
        <TableCell align="center" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <>
            <IconButton onClick={() => onEditRow()}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
            {/* 
      <IconButton
        color="error"
        onClick={() => {
          confirm.onTrue();
        }}
      >
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton> 
      */}
          </>
        </TableCell>
      </TableRow>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDeleteRow();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

BookingTableRow.propTypes = {
  onDeleteRow: PropTypes.func,
  onEditRow: PropTypes.func,
  row: PropTypes.object,
  selected: PropTypes.bool,
};
