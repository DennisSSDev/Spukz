import { Response, Request } from 'express';
import { QueryCompanies } from '../global/dataStore';
import handleAccept from '../misc/helper';

const GetCompanies = (req: Request, res: Response) => {
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  // per page requests
  const { query } = req;
  if (!query.page || (query.page as number) < 0) {
    // give the first page only
    res.json(QueryCompanies(0));
  }

  // give the specified page if it's still in range
  res.json(QueryCompanies(query.page as number));
};

/**
 * func for handling user liking and disliking a company
 */
export const PostCompanyRating = (req: Request, res: Response) => {
  // const { body } = req; // todo add session
  // const { companyName, rating, uuid } = body;
  // check if data is valid
  // check if the user already rated this company (uuid)
  // update the company's rating if the user hasn't rated or the rating is different

  res.status(400).json({ id: 'OK', message: 'successfully added rating' });
};

export default GetCompanies;
