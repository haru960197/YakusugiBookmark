import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default function DeleteDialogButton({ onDelete }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    onDelete();
    setOpen(false);
  };

  return (
    <React.Fragment>
      <DeleteOutlineOutlinedIcon onClick={handleClickOpen}/>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"本当に削除しますか？"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`削除したアイテムを復元するには、再び情報を入力して登録する必要があります。`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} autoFocus>キャンセル</Button>
          <Button onClick={handleAgree} color='error'>
            削除
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}