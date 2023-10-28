import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import ListIcon from '@mui/icons-material/List';
import { TransitionProps } from '@mui/material/transitions';
import { TitleList } from '../TitleList';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const mainColor = '#bcb3e1';

interface props {
  postContent: string;
}

export default function FullScreenDialog(props: props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='title-button'>
      <Button
        variant='outlined'
        onClick={handleClickOpen}
        sx={{
          color: 'black', // Replace with the color you want for text and icon
          borderColor: 'transparent', // Replace with the border color you want
          '&:hover': {
            borderColor: 'desiredHoverBorderColor', // Replace with the border color on hover
            backgroundColor: 'desiredHoverBackgroundColor', // Optional: Replace with the background color on hover
          },
          '& .MuiSvgIcon-root': {
            // Targeting the icon specifically
            color: 'black', // Replace with the color you want for the icon
          },
        }}
      >
        <ListIcon fontSize='large' />
      </Button>
      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar sx={{ backgroundColor: mainColor, position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
              Titles
            </Typography>
            <IconButton edge='start' color='inherit' onClick={handleClose} aria-label='close'>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <List>
          <TitleList handleClose={() => setOpen(false)} content={props.postContent} />
        </List>
      </Dialog>
    </div>
  );
}
