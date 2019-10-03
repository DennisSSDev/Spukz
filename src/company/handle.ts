import { Response, Request } from 'express';
import GLOBAL, { QueryCompanies } from '../global/dataStore';
import handleAccept from '../misc/helper';
import { Company } from '../global/dataTypes';

const GetCompanies = (req: Request, res: Response) => {
  const { accept } = req.headers;

  if (handleAccept(accept, res)) {
    return;
  }

  // per page requests
  const { query } = req;
  if (!query.page || (query.page as number) <= 0) {
    // give the first page only
    res.json(QueryCompanies(0));
    return;
  }

  // give the specified page if it's still in range
  res.json(QueryCompanies(query.page as number));
};

/**
 * func for handling user liking and disliking a company
 */
export const PostCompanyRating = (req: Request, res: Response) => {
  const { body, sessionID } = req;
  const { companyName, rating } = body;
  // check if data is valid
  if (!companyName || rating === undefined) {
    return res.status(400).json({
      id: 'MissingData',
      message: 'Company Name and rating are missing'
    });
  }
  const { userDB } = GLOBAL;
  if (!sessionID || !userDB[sessionID]) {
    return res.status(400).json({
      id: 'InvalidSession',
      message: 'You are not a valid user'
    });
  }

  const actions = userDB[sessionID as string];
  const { companies } = GLOBAL.store;

  let i = -1;
  const company = companies.find((value, index) => {
    if (value.name === companyName) {
      i = index;
      return true;
    }
    return false;
  });
  if (!company) {
    return res.status(400).json({
      id: 'InvalidCompany',
      message: 'Provided Company does not exist'
    });
  }

  if (actions.votes[companyName as string] !== undefined) {
    // has already voted, update the company's data based on the new vote if any
    const vote = actions.votes[companyName as string];
    if (vote === rating) {
      return res.status(200).json({ id: 'OK', message: 'same vote' });
    }
    if (rating === false) {
      company.meta.ratio.like--;
      company.meta.ratio.dislike++;
    } else {
      company.meta.ratio.like++;
      company.meta.ratio.dislike--;
    }
    actions.votes[companyName as string] = rating;
    companies[i] = company;
  } else {
    // new vote
    actions.votes[companyName as string] = rating as boolean;
    if (rating as boolean) {
      (company as Company).meta.ratio.like++;
    } else {
      (company as Company).meta.ratio.dislike++;
    }
    companies[i] = company as Company;
  }

  return res
    .status(200)
    .json({ id: 'OK', message: 'successfully added rating' });
};

export default GetCompanies;
