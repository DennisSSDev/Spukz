import React from 'react';
import { Box, createStyles, Grid, Chip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    },
    chip: {
      fontSize: 15,
      borderWidth: 2,
      width: 90
    }
  })
);

export interface PublicProps {
  canRequest?: boolean;
  tight?: boolean;
  onChipSelect?: (resource: string, type: string) => void;
}

export interface State {
  chipMap: Record<string, 'default' | 'outlined' | undefined>;
}

type Props = PublicProps;

const VisualComponent: React.FunctionComponent<Props> = (props: Props) => {
  const classes = useStyles();
  const { tight, onChipSelect } = props;
  const [values, setValues] = React.useState<State>({
    chipMap: {
      GitHub: 'outlined',
      'C++': 'outlined',
      GDCVault: 'outlined',
      Unreal: 'outlined',
      Unity: 'outlined'
    }
  });

  const gridSpacing = tight ? 1 : 4;
  const selectChipSetup = (val: string) => {
    return () => {
      const { chipMap } = values;
      if (chipMap[val] === 'outlined') {
        chipMap[val] = 'default';
        setValues({ chipMap });
      } else {
        chipMap[val] = 'outlined';
        setValues({ chipMap });
      }
      if (onChipSelect) onChipSelect(val, chipMap[val] as string);
    };
  };
  return (
    <Box
      marginTop={3}
      mx="auto"
      fontWeight="fontWeightBold"
      textAlign="center"
      className={classes.root}
    >
      <Grid container justify="center" alignItems="center" direction="row">
        <Grid item xs={12}>
          <Grid container justify="center" spacing={gridSpacing}>
            {['GitHub', 'C++', 'GDCVault', 'Unreal', 'Unity'].map(value => (
              <Grid key={value} item>
                <Chip
                  variant={values.chipMap[value]}
                  color="secondary"
                  clickable
                  label={value}
                  className={classes.chip}
                  onClick={selectChipSetup(value)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export const Tags = VisualComponent;
