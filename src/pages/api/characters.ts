import { NextApiRequest, NextApiResponse } from "next";
import { fetchCharacters } from "../../lib/swapi";
import { IPeopleResponse } from "../../types";

export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const after = req.query?.after as string | undefined;
  const files = await fetchCharacters<IPeopleResponse>(after);

  if (files) {
    res.json(files);
  } else {
    res.status(200).json(null);
  }

  res.status(200).json(null);
};
