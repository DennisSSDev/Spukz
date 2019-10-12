import React from 'react';
import { Title } from '../../components/title';
import { Footer } from '../../components/footer';
import { ScrollTop } from '../../components/scrollTop';
import { NavBar } from '../../components/navbar';
import { GitHubList } from '../../components/githubList';

const description =
  'In this section you can find specific code and repository examples that relate to Unity and Unreal. There are curated code examples of student projects that landed them high profile internships as well interesting game development repositories that should give you some ideas and inspiration on what you should work on next to get your dream internship!';

const VisualComponent: React.FunctionComponent = () => {
  return (
    <React.Fragment>
      <NavBar />
      <ScrollTop />
      <div className="content">
        <div id="top-anchor">
          <Title title="Code" description={description} />
        </div>
        <GitHubList />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </React.Fragment>
  );
};

export const Code = VisualComponent;
