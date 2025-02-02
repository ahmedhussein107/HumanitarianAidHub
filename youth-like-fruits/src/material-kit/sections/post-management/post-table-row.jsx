import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from '../../components/label';
import Iconify from '../../components/iconify';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';   
// ----------------------------------------------------------------------


export default function PostTableRow({
  selected,
  name,
  id,
  avatarUrl,
  type,
  date,
  status,
  handleClick,
  handleDelete,
  handleDonorClick,
}) {

  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleDeleteClick = () => {
    handleDelete(id);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={handleClick} />
        </TableCell>

        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={type} src={avatarUrl} />
            <Typography variant="subtitle2" noWrap color='black'>
              {type}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{date}</TableCell>

        <TableCell>
          <Label color={(status === 'Fullfilled') ? 'success' : 'error'}>{status}</Label>
        </TableCell>
        <TableCell> {name !== '' && <Button onClick={() => {handleDonorClick(name)}}>{name}</Button>} </TableCell>

        {/* <TableCell align="center">{isVerified ? 'Yes' : 'No'}</TableCell> */}

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>

        </TableCell>
      </TableRow>

      <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            <MenuItem >
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={() => {
              handleDeleteClick();
              handleCloseMenu();
            }} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
    </>
  );
}

PostTableRow.propTypes = {
  avatarUrl: PropTypes.any,
  date: PropTypes.any,
  handleClick: PropTypes.func,
  handleDelete: PropTypes.func, // New prop for delete action
  handleDonorClick: PropTypes.func,
  isVerified: PropTypes.any,
  name: PropTypes.any,
  type: PropTypes.any,
  selected: PropTypes.any,
  status: PropTypes.string,
};
