import { Response, Request } from 'express';
import handleAccept from '../misc/helper';
import { Type } from '../global/dataTypes';
import { QueryIcon } from '../global/dataStore';

/**
 * Retrieve the base64 icon based on the specified icon type
 */
const GetIcon = (req: Request, res: Response) => {
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  const { query } = req;
  const { type } = query;
  if (!type) {
    res.status(400).json({
      id: 'ErrorBadIconRequest',
      message: 'You must specify the type of icon you require'
    });
    return;
  }

  if (!Object.keys(Type).includes(type)) {
    res.status(400).json({
      id: 'ErrorBadIconRequest',
      message: 'The Icon type you specified does not exist'
    });
    return;
  }
  res.json(QueryIcon(type));
};

export default GetIcon;
