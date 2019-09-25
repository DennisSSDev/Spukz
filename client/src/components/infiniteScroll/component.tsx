import React from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { FeedEntry } from '../feedEntry';

interface Resource {
  type: string;
  link: string;
  title: string;
  icon?: string;
  description: string;
}

export interface State {
  start: number;
  end: number;
  hasMore: boolean;
  resources: Resource[];
  count: number;
  tags: Record<string, boolean>;
}

export interface PublicProps {
  tags: Record<string, boolean>;
}

type Props = PublicProps;

const typeMap: Record<string, string> = {
  GitHub: 'Repository',
  YouTube: 'YouTube Video',
  GDCVault: 'GDC Vault Video'
};

class VisualComponent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      start: 0,
      end: 0,
      resources: [],
      hasMore: true,
      count: 0,
      tags: {
        GitHub: false,
        'C++': false,
        Vault: false,
        Unreal: false,
        Unity: false
      }
    };
  }

  static async getDerivedStateFromProps(props: Props, state: State) {
    const newState = state;
    // const arr = Object.values(props.tags);
    // const tags = Object.values(newState.tags);
    if (props.tags.Changed === true) {
      newState.resources = [];
      newState.start = 0;
      newState.end = 0;
      newState.hasMore = true;
      newState.tags = props.tags;
    }
    return newState;
  }

  placeholder = () => {
    const { count } = this.state;
    return (
      <React.Fragment key={`${count}PL`}>
        <FeedEntry />
        <FeedEntry />
        <FeedEntry />
      </React.Fragment>
    );
  };

  loadMore = async () => {
    let { start, end, hasMore, count } = this.state;
    const { tags } = this.props;
    start = end;
    end += 3;
    const result = await fetch(
      `/getFeed?start=${start}&end=${end}&vault=${tags.Vault}&github=${tags.GitHub}&cpp=${tags['C++']}&unity=${tags.Unity}&unreal=${tags.Unreal}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    );
    tags.Changed = false;
    const data = await result.json();
    hasMore = !data.done;
    const { resources } = this.state;
    data.resources.forEach((item: any) => {
      resources.push(item);
    });
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
              subtitle={value.title}
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
