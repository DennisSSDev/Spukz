import { Response, Request } from 'express';
import { QueryResources } from '../global/dataStore';
import { Tag } from '../global/dataTypes';
import handleAccept from '../misc/helper';

const ProcessTags = (query: any, tags: Tag[]) => {
  // deal with tags.
  if (query.github && query.github === 'true') tags.push(Tag.GitHub);
  if (query.cpp && query.cpp === 'true') tags.push(Tag['C++']);
  if (query.vault && query.vault === 'true') tags.push(Tag.Vault);
  if (query.unreal && query.unreal === 'true') tags.push(Tag.Unreal);
  if (query.unity && query.unity === 'true') tags.push(Tag.Unity);
};

/**
 * Retrieve the latest feed data
 */
const GetFeed = (req: Request, res: Response) => {
  const { query } = req;
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  const start = query.start as number;
  const end = query.end as number;
  const tagsArr: Tag[] = [];
  ProcessTags(query, tagsArr);
  try {
    res.json(QueryResources(start, end, tagsArr));
    return;
  } catch (err) {
    if (err.message === 'RangeOverflow') {
      res.status(400).json({
        id: 'RangeOverflow',
        message: 'The given range is not valid'
      });
      return;
    }
    res.status(500).json({
      id: 'ErrorResourceRequest',
      message: 'The server failed to return to find the requested resource'
    });
  }
};

export default GetFeed;
