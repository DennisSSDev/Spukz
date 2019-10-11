import { Response, Request } from 'express';
import { QueryGitHubRepos } from '../global/dataStore';
import handleAccept from '../misc/helper';

const GetGitHubRepos = (req: Request, res: Response) => {
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  res.json(QueryGitHubRepos());
};

export default GetGitHubRepos;
