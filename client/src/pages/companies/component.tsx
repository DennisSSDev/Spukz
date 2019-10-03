import React from 'react';
import { Title } from '../../components/title';
import { Footer } from '../../components/footer';
import { ScrollTop } from '../../components/scrollTop';
import { NavBar } from '../../components/navbar';
import { CompanyList } from '../../components/companyList';

const VisualComponent: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ScrollTop />
      <div className="content">
        <div id="top-anchor">
          <Title title="Companies" />
        </div>
        <CompanyList />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const Companies = VisualComponent;
