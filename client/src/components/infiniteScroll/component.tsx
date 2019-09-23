import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FeedEntry } from '../feedEntry';

interface Resource {
  type: string;
  link: string;
  icon?: string;
  description: string;
}

export interface State {
  start: number;
  end: number;
  hasMore: boolean;
  resources: Resource[];
  count: number;
}

const typeMap: Record<string, string> = {
  GitHub: 'Repository',
  YouTube: 'YouTube Video',
  GDCVault: 'GDC Vault Video'
};

class VisualComponent extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = { start: 0, end: 0, resources: [], hasMore: true, count: 0 };
  }

  placeholder = () => {
    const { count } = this.state;
    return (
      <React.Fragment key={`${count}PL`}>
        <FeedEntry />
      </React.Fragment>
    );
  };

  loadMore = async () => {
    let { start, end, hasMore, count } = this.state;
    start = end;
    end += 3;
    const result = await fetch(
      `/getFeed?start=${start}&end=${end}&vault=false&github=false&cpp=false&unity=false&unreal=false`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    const data = await result.json();
    hasMore = !data.done;
    const { resources } = this.state;
    data.resources.forEach((item: any) => {
      resources.push(item);
    });
    console.log(resources);
    count++;
    this.setState({ resources, hasMore, count, start, end });
  };

  showEntries = () => {
    const { resources, count } = this.state;
    return (
      <React.Fragment key={`${count}EN`}>
        {resources.map(value => (
          <React.Fragment key={value.link}>
            <FeedEntry
              title={typeMap[value.type]}
              subtitle="THE ACTUAL TITLE"
              text={value.description}
              image={value.icon || ''}
              link={value.link}
              imageType={value.type === 'GitHub' ? 'svg+xml' : ''}
            />
          </React.Fragment>
        ))}
      </React.Fragment>
    );
  };

  render() {
    const { hasMore } = this.state;
    return (
      <React.Fragment>
        <InfiniteScroll
          loadMore={this.loadMore}
          hasMore={hasMore}
          loader={this.placeholder()}
        >
          {this.showEntries()}
        </InfiniteScroll>
      </React.Fragment>
    );
  }
}

export const InfScroll = VisualComponent;
