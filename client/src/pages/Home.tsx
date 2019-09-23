import React from 'react';
import { NavBar } from '../components/navbar';
import { Title } from '../components/title';
import { Tags } from '../components/tags';
import { Footer } from '../components/footer';
import { InfScroll } from '../components/infiniteScroll';

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Title title="Feed" />
      <Tags />
      <InfScroll />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
