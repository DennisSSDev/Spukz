import { Response } from 'express';

/**
 * Helper func for finding out if the accepts are valid
 * true means that an issue was found
 * false means that everything is ok
 */
const handleAccept = (accept: string | undefined, res: Response) => {
  if (!accept) {
    res.status(400).json({
      id: 'NoAcceptHeader',
      message: 'The accept header was not provided'
    });
    return true;
  }
  if (accept !== 'application/json') {
    res.status(400).json({
      id: 'NotSupportedAccept',
      message: 'The specified accept header is not supported'
    });
    return true;
  }
  return false;
};

/**
 * A helper function to filter resuls from a JSON object
 * @param obj the object to filter data on
 * @param predicate the filter function. If true -> item added, otherwise ignore
 */
export const filterObject = (obj: any, predicate: (item: any) => boolean) => {
  const output: Record<number, {}> = {};
  let count = 0;
  Object.keys(obj).forEach(value => {
    if (predicate(obj[value])) {
      output[count] = obj[value];
      count++;
    }
  });
  return output;
};

export default handleAccept;
