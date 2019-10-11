import React from 'react';
import { Title } from '../../components/title';
import { Footer } from '../../components/footer';
import { ScrollTop } from '../../components/scrollTop';
import { NavBar } from '../../components/navbar';

const description = `Here you can view curated resources from YouTube and GDC Vault that relate to the process of finding software engineering jobs in the games industry. There are also suggested videos for improving one's coding standards and practices!`;

const VisualComponent: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ScrollTop />
      <div className="content">
        <div id="top-anchor">
          <Title title="Resources" description={description} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const Resources = VisualComponent;
