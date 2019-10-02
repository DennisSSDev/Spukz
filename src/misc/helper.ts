import { Response } from 'express';

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

export default handleAccept;
