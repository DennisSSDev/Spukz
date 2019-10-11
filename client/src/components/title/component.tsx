import React from 'react';
import {
  Typography,
  Box,
  createStyles,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

export interface PublicProps {
  title: string;
  description: string;
}

type Props = PublicProps;

export const WhiteText = withStyles({
  root: {
    color: 'white'
  }
})(Typography);

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      display: 'block',
      marginTop: 1,
      marginBottom: 28,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderStyle: 'solid',
      color: '#20599B',
      width: 350,
      borderWidth: 3,
      borderRadius: 30
    },
    form: {
      backgroundColor: '#6F7688'
    }
  })
);

const VisualComponent: React.FunctionComponent<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { title, description } = props;
  const classes = useStyles();
  return (
    <Box
      marginTop={15}
      mx="auto"
      fontWeight="fontWeightBold"
      textAlign="center"
    >
      <hr className={classes.divider} />
      <WhiteText variant="h4">{title}</WhiteText>
      <div>
        <Box marginTop={1}>
          <IconButton onClick={handleClickOpen} size="small" color="secondary">
            <HelpOutlineIcon color="secondary" />
          </IconButton>
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            classes: {
              root: classes.form
            }
          }}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            {`What is ${title}?`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>{description}</DialogContentText>
            <br />
          </DialogContent>
        </Dialog>
      </div>
    </Box>
  );
};

export const Title = VisualComponent;
