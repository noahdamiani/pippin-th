import type { NextApiRequest, NextApiResponse } from 'next';
import { Title } from 'schema/title';
import data from 'schema/mock.json';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Title[]>
) {
  res.status(200).json(data);
}
