"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { useTokens } from "@reservoir0x/reservoir-kit-ui";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState(null);
  const { data: tokens } = useTokens({
    tokens: "0x82c7a8f707110f5fbb16184a5933e9f78a34c6ab:40266239799564391",
    limit: 40,
  });

  useEffect(() => {
    if (!tokens) return;

    console.log(tokens);

    tokens.forEach(async (token) => {
      const tokenData = token?.token;

      const data = await fetch(
        "/api/verify?" +
          new URLSearchParams({
            tokenId: tokenData?.tokenId ?? "",
            bitcoinAddress: "ok",
          })
      );

      const json = await data.json();
      setData(json);
    });
  }, [tokens]);

  return (
    <div>
      <div className="relative z-10 flex min-h-screen w-full items-start justify-center pt-28">
        <div className="flex flex-col items-start p-4">
          <div className="grid grid-cols-6 gap-16">
            {tokens?.map((token) => (
              <div
                key={token?.token?.tokenId}
                className="flex flex-col items-start space-y-8"
              >
                <div className="relative aspect-square h-full w-full">
                  <Image src={token?.token?.image ?? ""} fill alt="" />
                </div>
                <p className="text-white">Bitcoin Address: {data}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
