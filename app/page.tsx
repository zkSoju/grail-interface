"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { useTokens } from "@reservoir0x/reservoir-kit-ui";
import { useEffect, useState } from "react";
import { usePunkTokens } from "@/hooks/usePunkTokens";

export default function Home() {
  const [data, setData] = useState(null);

  const tokens = usePunkTokens();

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
      <div className="relative z-10 flex min-h-screen w-full items-start justify-center">
        <div className="flex flex-col items-start p-4">
          <div className="grid grid-cols-6 gap-16">
            {tokens?.map((token, id) => (
              <div
                key={token?.token?.tokenId}
                className="flex flex-col items-start space-y-8"
              >
                <div className="relative aspect-square h-full w-full">
                  <Image
                    src={token?.token?.image ?? ""}
                    style={{ transform: "translate3d(0, 0, 0)" }}
                    loading={id < 10 ? "eager" : "lazy"}
                    // placeholder="blur"
                    // blurDataURL={token?.token?.image ?? ""}
                    fill
                    alt=""
                  />
                  <img
                    src="./verified.svg"
                    className="absolute -top-4 -right-4 h-8 w-8"
                  />
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
