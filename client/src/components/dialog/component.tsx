import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {
  Typography,
  createStyles,
  Theme,
  MenuItem,
  Fab
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { makeStyles, withStyles } from '@material-ui/styles';
import { Tags } from '../tags';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap'
    },
    textField: {
      marginRight: theme.spacing(1),
      width: 200
    },
    dense: {
      marginTop: 19
    },
    menu: {
      width: 200
    },
    form: {
      backgroundColor: '#6F7688'
    },
    cancel: {
      backgroundColor: '#FF5E63',
      color: 'white'
    },
    submit: {
      backgroundColor: 'blue'
    },
    fabButton: {
      position: 'absolute',
      zIndex: 1,
      top: -30,
      left: 0,
      right: 0,
      margin: '0 auto'
    }
  })
);

const resources = [
  {
    value: 'G',
    label: 'GitHub'
  },
  {
    value: 'V',
    label: 'GDC Vault'
  },
  {
    value: 'Y',
    label: 'Youtube'
  }
];

export enum Shape {
  Circle = 0,
  Square = 1
}

interface PublicProps {
  shape: Shape;
}

interface State {
  resource: string;
  open: boolean;
}

export const RegularButton = withStyles({
  root: {
    textTransform: 'none'
  }
})(Button);

type Props = PublicProps;

export const FormDialog: React.FunctionComponent<Props> = (props: Props) => {
  const [values, setValues] = React.useState<State>({
    resource: 'G',
    open: false
  });

  const handleClickOpen = () => {
    setValues({ open: true, resource: values.resource });
  };

  const handleClose = () => {
    setValues({ open: false, resource: values.resource });
  };

  const classes = useStyles();

  const handleChange = (name: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const { shape } = props;

  let ButtonShape = null;
  if (shape === Shape.Square) {
    ButtonShape = () => (
      <RegularButton
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        <Typography variant="h6">Contribute</Typography>
      </RegularButton>
    );
  } else {
    ButtonShape = () => (
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fabButton}
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
    );
  }
  return (
    <div>
      {ButtonShape()}
      <Dialog
        open={values.open}
        onClose={handleClose}
        PaperProps={{
          classes: {
            root: classes.form
          }
        }}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Contribute to Spukz</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Spukz is a mass growing service that helps gameplay programming
            students find internships in the game field. Please contribute your
            resource to help others find their dream job!
          </DialogContentText>
          <TextField
            id="standard-select-currency"
            select
            required
            label="Select"
            className={classes.textField}
            value={values.resource}
            onChange={handleChange('resource')}
            SelectProps={{
              MenuProps: {
                className: classes.menu
              }
            }}
            helperText="Resource Type"
            margin="normal"
          >
            {resources.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <br />
          <TextField
            required
            id="link"
            label="Link"
            placeholder="github.com/"
            helperText="Enter Resource Link"
            type="search"
            fullWidth
          />
          <br />
          <TextField
            id="description"
            label="Description"
            type="search"
            fullWidth
            multiline
            helperText="Useful Information"
          />
          <br />
          <br />
          <br />
          <DialogContentText>
            Select the appropriate tags by which to find your resource:
          </DialogContentText>
          <Tags tight />
          <br />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            className={classes.cancel}
          >
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
