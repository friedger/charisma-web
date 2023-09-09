import { NextApiRequest, NextApiResponse } from 'next';
import { ConfUser } from '@lib/types';
import { createQuestDraft } from '@lib/db-providers/dato';

type ErrorResponse = {
    error: {
        code: string;
        message: string;
    };
};

export default async function createQuestDraftApi(
    req: NextApiRequest,
    res: NextApiResponse<ConfUser | ErrorResponse>
) {

    let response, code = 200
    try {
        response = await createQuestDraft(req.body)
    } catch (error: any) {
        console.error(error)
        response = new Object(error)
        code = error.response.status
    }

    return res.status(code).json(response);
}
