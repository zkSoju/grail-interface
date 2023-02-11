import { NextApiRequest, NextApiResponse } from "next";
import * as z from "zod";
// import { db } from "@/lib/db";
import { promises as fs } from "fs";
import path from "path";

const tokenSchema = z.object({
  tokenId: z.string(),
  bitcoinAddress: z.string(),
});

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const body = req.query;

      const payload = tokenSchema.parse(body);

      console.log(payload);

      const filePath = path.join(process.cwd(), "json");
      const jsonData = await fs.readFile(
        filePath + "/punk-inscriptions.json",
        "utf-8"
      );
      const objectData = JSON.parse(jsonData);

      const inscriptionId =
        "96dd786aba618a138ae679e09f3db02366a917f69c617cdac8e8b77a2b8d7c0ai0";

      const ordinalData = await fetch(
        `https://ordapi.xyz/inscription/${inscriptionId}`
      );

      const ordinal = await ordinalData.json();

      return res.status(201).json(ordinal.address);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).json(error);
    }
  }
}

export default handler;
