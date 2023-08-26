import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser } from '@lib/types';

type ErrorResponse = {
  error: {
    code: string;
    message: string;
  };
};

export default function chainhooks(
  req: NextApiRequest,
  res: NextApiResponse<ConfUser | ErrorResponse>
) {
  if (req.method !== 'POST') {
    return res.status(501).json({
      error: {
        code: 'method_unknown',
        message: 'This endpoint only responds to POST'
      }
    });
  }

  try {
    req.body.apply.forEach((a: any) => {
      a.transactions.forEach((tx: any) => {
        const payload = {
          ...tx.metadata.kind.data,
          sender: tx.metadata.sender,
          success: tx.metadata.success,
        }
        console.log(payload)
      })
    })
  } catch (error: any) {
    console.error(error.message)
  }

  return res.status(200).json({});
}
