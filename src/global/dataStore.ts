import {
  Global,
  Resource,
  Tag,
  Company,
  GithubRepos,
  GDCTalks,
  Repo,
  Type
} from './dataTypes';

/**
 * Global Accessor to server inner data.
 * Inner items should not be accessed directly.
 * Only internal functions are allowed to edit the data directly
 * Use helper methods instead.
 */
const GLOBAL: Global = {
  store: { resources: [], companies: [] },
  iconMap: {
    GitHub: '',
    YouTube: '',
    GDCVault: ''
  },
  userDB: {},
  githubStore: { total_count: 0, items: [] },
  gdcTalkStore: {}
};

export const produceStore = (json: GithubRepos, oldestDate: Date) => {
  const repos = json.items as Repo[];
  const items = repos.filter(val => {
    const date = new Date(val.pushed_at);
    return !val.fork && date >= oldestDate && val.score > 25;
  });
  const store: GithubRepos = { total_count: json.total_count, items };
  return store;
};

export const SetGitHubStore = (store: GithubRepos, append: boolean = false) => {
  if (append) {
    GLOBAL.githubStore.items.concat(store.items);
    return;
  }
  GLOBAL.githubStore = store;
};

export const SetGDCTalkStore = (store: GDCTalks) => {
  GLOBAL.gdcTalkStore = store;
};

/**
 * Helper function responsible for adding new resources into the storage.
 * If the item is not new (determined by the url), then it will get updated
 * @param resource item that will be added to the global resource list
 * @returns number denoting the status code: 201 | 204
 */
export const AddNewResource = (resource: Resource): number => {
  let status = 201;
  let update = false;
  let i = -1;
  GLOBAL.store.resources.forEach((value, index) => {
    if (value.link === resource.link) {
      status = 204;
      update = true;
      i = index;
    }
  });
  if (!update) {
    GLOBAL.store.resources.push(resource);
  } else {
    GLOBAL.store.resources[i] = resource;
  }
  return status;
};

/**
 * Helper function to deal with resource cut outs based on start and end params
 * @param resources the list to get a cut copy from
 * @param start where the list will cut (inclusive)
 * @param end where the list will end the cut (none inclusive)
 * @returns an object storing the cut list and a bool. The bool denotes whether the sequence has reached the end of the resources list.
 */
const handleResourceSubDivision = (
  resources: Resource[],
  start: number,
  end: number
) => {
  const result: { resources: Resource[]; done: boolean } = {
    resources: [],
    done: false
  };
  const { length } = resources;

  if (length - end < 0) {
    result.resources = resources.slice(0, length - start);
    result.done = true;
    result.resources.reverse();
    return result;
  }

  // if the end overflows - range would go to the last element
  if (end > length) {
    result.resources = resources.slice(0, start);
    result.done = true;
    result.resources.reverse();
    return result;
  }

  // we want to get latest items first. Behave like a queue.
  result.resources = resources.slice(length - end, length - start);
  result.resources.reverse();
  return result;
};

/**
 * a simple way to add users to a global db.
 * Currently only based on session ids
 * @param id uuid of the user
 */
export const AddNewUser = (id: string) => {
  GLOBAL.userDB[id] = { votes: {} };
};

// both params inclusive
export const QueryResources = (
  start: number,
  end: number,
  tags: Tag[]
): { resources: Resource[]; done: boolean } => {
  const { resources } = GLOBAL.store;
  const { length } = resources;
  const result: { resources: Resource[]; done: boolean } = {
    resources: [],
    done: false
  };

  if (start > length || start < 0) {
    throw new Error('RangeOverflow');
  }

  if (end < start || end < 0) {
    throw new Error('RangeOverflow');
  }

  if (start === end) {
    result.resources.push(resources[start]);
    return result;
  }

  let filteredResources: Resource[] = [];
  // used to detect a filter. If the above array has no values, it won't mean that the filter failed. Just means that no value passed the requested filter.
  let hasFiltered = false;

  // filter by tags
  if (tags.length > 0) {
    hasFiltered = true;
    filteredResources = resources.filter(res => {
      let count = 0;
      const min = tags.length;
      tags.forEach(tag => {
        if (res.tags.includes(tag)) {
          ++count;
        }
      });
      return count === min;
    });
  }
  if (hasFiltered) {
    return handleResourceSubDivision(filteredResources, start, end);
  }
  return handleResourceSubDivision(resources, start, end);
};

/**
 * helper func to get company data from the global object
 * @param page section of the list represented in the form of pages
 * @returns a section of the list of companies
 */
export const QueryCompanies = (page: number): { companies: Company[] } => {
  // handle company request
  // always get in sizes of 10 or the end of list
  let end = page * 10 + 10;
  let start = end - 10;

  const { companies } = GLOBAL.store;
  const { length } = companies;

  if (start > length) {
    return { companies: [] };
  }

  if (start < 0) {
    start = 0;
  }

  if (end <= 0) {
    return { companies: [] };
  }

  if (end > length) {
    end = length;
  }
  return { companies: companies.slice(start, end) };
};

/**
 * @todo when scale - convert into retrieving items based on sections
 */
export const QueryGDCTalks = () => {
  return GLOBAL.gdcTalkStore;
};

/**
 * @todo when scale - convert into retrieving items based on sections
 */
export const QueryGitHubRepos = () => {
  return GLOBAL.githubStore.items.slice(0, 10);
};

/**
 * A simple query function to get the icon for the specified type
 * @param type the icon to request for
 */
export const QueryIcon = (type: Type) => {
  return { icon: GLOBAL.iconMap[type] };
};

export default GLOBAL;
