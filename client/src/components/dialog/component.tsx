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
    value: 'GitHub',
    label: 'GitHub'
  },
  {
    value: 'GDCVault',
    label: 'GDC Vault'
  },
  {
    value: 'YouTube',
    label: 'YouTube'
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
  tags: string[];
  link: string;
  description: string;
}

export const RegularButton = withStyles({
  root: {
    textTransform: 'none'
  }
})(Button);

type Props = PublicProps;

export const FormDialog: React.FunctionComponent<Props> = (props: Props) => {
  const [values, setValues] = React.useState<State>({
    resource: 'GitHub',
    open: false,
    link: '',
    description: '',
    tags: []
  });

  const classes = useStyles();

  const handleClickOpen = () => {
    setValues({ ...values, open: true });
  };

  const sendPost = async () => {
    const data = {
      type: values.resource,
      link: values.link,
      description: values.description,
      tags: values.tags
    };
    const resp = await fetch('/newResource', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (resp.status === 204) {
      console.log('Data has been updated');
      return;
    }
    if (resp.status === 201) {
      const json = await resp.json();
      console.log(json);
    }
    if (resp.status >= 300) {
      try {
        const json = await resp.json();
        console.log(json);
      } catch (err) {
        console.log(`Error Code: ${resp.status}`);
      }
    }
  };

  const handleClose = () => {
    setValues({ ...values, open: false });
  };

  const onChipSelect = (resource: string, type: string) => {
    const { tags } = values;
    if (type === 'outlined') {
      const remIndex = tags.indexOf(resource);
      if (remIndex > -1) {
        tags.splice(remIndex, 1);
        setValues({ ...values, tags });
      }
      return;
    }
    tags.push(resource);
    setValues({ ...values, tags });
  };

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
            students to prepare for internships in the game field. Please
            contribute your resource to help others get ready for their dream
            job!
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
            onChange={handleChange('link')}
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
            onChange={handleChange('description')}
          />
          <br />
          <br />
          <br />
          <DialogContentText>
            Select the appropriate tags by which to find your resource:
          </DialogContentText>
          <Tags tight onChipSelect={onChipSelect} />
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
          <Button onClick={sendPost} variant="contained" color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
