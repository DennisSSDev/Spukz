import { Dictionary, Request } from 'express-serve-static-core';
import { Response } from 'express';
import { GetResources } from '../global/dataStore';
import { Tag } from '../global/dataTypes';

const GetFeed = (req: Request<Dictionary<string>>, res: Response) => {
  const { query } = req;

  const { accept } = req.headers;
  if (!accept) {
    res.status(400).json({
      id: 'NoAcceptHeader',
      message: 'The accept header was not provided'
    });
  }
  if (accept !== 'application/json') {
    res.status(400).json({
      id: 'NotSupportedAccept',
      message: 'The specified accept header is not supported'
    });
  }
  const start = query.start as number;
  const end = query.end as number;
  const tagsArr: Tag[] = [];
  // deal with tags. There is no future plan to add more tags so this is fine
  if (query.github && query.github === 'true') tagsArr.push(Tag.GitHub);
  if (query.cpp && query.cpp === 'true') tagsArr.push(Tag['C++']);
  if (query.vault && query.vault === 'true') tagsArr.push(Tag.Vault);
  if (query.unreal && query.unreal === 'true') tagsArr.push(Tag.Unreal);
  if (query.unity && query.unity === 'true') tagsArr.push(Tag.Unity);
  try {
    res.json(GetResources(start, end, tagsArr));
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
