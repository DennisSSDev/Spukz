import React from 'react';
import { NavBar } from '../components/navbar';
import { Title } from '../components/title';
import { Tags } from '../components/tags';
import { Footer } from '../components/footer';
import { FeedEntry } from '../components/feedEntry';

const Home: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <Title title="Feed" />
      <Tags />
      <FeedEntry title="Resource" />
      <FeedEntry />
      <FeedEntry />
      <Footer />
    </React.Fragment>
  );
};

export default Home;
