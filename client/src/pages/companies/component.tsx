import React from 'react';
import { Title } from '../../components/title';
import { Footer } from '../../components/footer';
import { ScrollTop } from '../../components/scrollTop';
import { NavBar } from '../../components/navbar';
import { CompanyList } from '../../components/companyList';

const description =
  'Here you can find all the high profile game companies that offer well compensating and competetive internship positions. The companies are also community rated, meaning that if you had a previous positive or negative experience interning there, it would great to drop your rating for others to see!';

const VisualComponent: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ScrollTop />
      <div className="content">
        <div id="top-anchor">
          <Title title="Companies" description={description} />
        </div>
        <CompanyList />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export const Companies = VisualComponent;
