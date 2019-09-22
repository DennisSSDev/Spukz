import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, createStyles, Theme, MenuItem } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { RegularButton } from '../../navbar';

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

interface State {
  resource: string;
  open: boolean;
}

export const FormSquareDialog = () => {
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

  return (
    <div>
      <RegularButton
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        <Typography variant="h6">Contribute</Typography>
      </RegularButton>

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
