import React from 'react';
import { Box } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/styles';
import { NavBar } from '../../components/navbar';
import { Title, WhiteText } from '../../components/title';
import { Tags } from '../../components/tags';
import { Footer } from '../../components/footer';
import { InfScroll } from '../../components/infiniteScroll';
import { ScrollTop } from '../../components/scrollTop';

export interface State {
  tags: Record<string, boolean>;
}

const description =
  "Here you can look through the latest resource contributions by the community members. And if you're looking for something more specific you can use the tags to filter added resources!";

const useStyles = makeStyles(() =>
  createStyles({
    divider: {
      marginTop: 1,
      marginBottom: 10,
      marginLeft: 'auto',
      marginRight: 'auto',
      borderStyle: 'solid',
      color: '#252525',
      width: 600,
      borderWidth: 2,
      borderRadius: 30
    }
  })
);

const VisualComponent: React.FunctionComponent = () => {
  const [values, setValues] = React.useState<State>({
    tags: {
      GitHub: false,
      'C++': false,
      GDCVault: false,
      Unreal: false,
      Unity: false,
      Changed: true
    }
  });

  const classes = useStyles();

  const storeChip = (resource: string, type: string) => {
    const { tags } = values;
    if (type === 'outlined') {
      tags[resource] = false;
    } else {
      tags[resource] = true;
    }
    tags.Changed = true;
    setValues({ tags });
  };

  return (
    <React.Fragment>
      <NavBar />
      <ScrollTop />
      <div className="content">
        <div id="top-anchor">
          <Title title="Feed" description={description} />
        </div>
        <Tags onChipSelect={storeChip} />
        <InfScroll tags={values.tags} />
      </div>
      <Box
        marginTop={4}
        marginBottom={15}
        mx="auto"
        fontWeight="fontWeightBold"
        textAlign="center"
      >
        <hr className={classes.divider} />
        <WhiteText>
          It appears you have reached the end... Or have you?
        </WhiteText>
      </Box>
      <Footer />
    </React.Fragment>
  );
};

export const Home = VisualComponent;
