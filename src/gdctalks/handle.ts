import { Response, Request } from 'express';
import handleAccept from '../misc/helper';
import { QueryGDCTalks } from '../global/dataStore';

/**
 * Retrieves GDC talk data.
 * Due to the low volume of GDC talks, it's ok to return the whole list for now
 * @todo when scale - convert into retrieving based on category and subsize
 */
const GetGDCTalks = (req: Request, res: Response) => {
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  res.json(QueryGDCTalks());
};

export default GetGDCTalks;
