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

      let vaultOwner = "";
      let inscriptionOwner;
      let tokenID;
      let punkID;
      let lowestInscriptionID;
      let lowestInscriptionHash;
      let loading = true;

      fetch(
        "https://api2.emblemvault.io/meta/" +
          payload.tokenId +
          "?experimental=true",
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          const btcCoin = res.addresses.find(
            (coin: any) => coin.coin === "BTC"
          );
          console.log("Emblem vault owner = ", btcCoin.address);
          vaultOwner = btcCoin.address;

          let punkID = res.name.match(/#\d+/);
          punkID = punkID[0].replace("#", "");
          punkID = punkID;
          console.log("Punk ID = ", punkID);

          fetch("https://api.bitcoinpunks.com/punk-inscriptions.json", {
            method: "GET",
          })
            .then((res) => res.json())
            .then((res) => {
              //const btcCoin = res.addresses.find((coin) => coin.coin === "BTC");
              console.log("Lowest inscription ID = ", res[punkID].lowest);
              console.log(
                "Lowest inscription TX = ",
                res[punkID].hashes[res[punkID].lowest]
              );
              lowestInscriptionID = res[punkID].lowest;
              lowestInscriptionHash = res[punkID].hashes[res[punkID].lowest];

              fetch(
                "https://ordinals.com/inscription/" +
                  res[punkID].hashes[res[punkID].lowest],
                {
                  method: "GET",
                }
              )
                .then((res) => res.text())
                .then((data) => {
                  //console.log(data);

                  const address = data.match(
                    /<dt>address<\/dt>\s*<dd class=monospace>(.*?)<\/dd>/
                  )?.[1];
                  console.log("Inscription owner = ", address);
                  inscriptionOwner = address;
                  loading = false;

                  if (inscriptionOwner == vaultOwner) {
                    console.log("LEGIT! *****");
                  } else {
                    console.log("FAKE! ******");
                  }
                })
                .catch((error) => {
                  console.error(error);
                });
            });
        });

      return res.status(201).json("OK");
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(422).json(error.issues);
      }

      return res.status(422).json(error);
    }
  }
}

export default handler;
