"use client";

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { useTokens } from "@reservoir0x/reservoir-kit-ui";
import { useEffect, useState } from "react";
import { usePunkTokens } from "@/hooks/usePunkTokens";
import useSWR from "swr";

export default function Home() {
  const [data, setData] = useState<boolean[]>();
  const [called, setCalled] = useState(false);

  const tokens = usePunkTokens();

  useEffect(() => {
    if (!tokens || tokens.length === 0) return;
    if (called) return;

    console.log(tokens);

    const verified = tokens.map(async (token) => {
      const tokenData = token?.token;

      const data = await fetch(
        "/api/verify?" +
          new URLSearchParams({
            tokenId: tokenData?.tokenId ?? "",
            bitcoinAddress: "ok",
          })
      );

      const json = await data.json();

      return json.verified;
    });

    Promise.all(verified).then((data) => {
      console.log(data);
      setData(data);
    });

    setCalled(true);
  }, [tokens]);

  return (
    <div>
      <div className="relative z-10 flex min-h-screen w-full items-start justify-center">
        <div className="flex flex-col items-start p-4">
          <div className="grid grid-cols-6 gap-16">
            {tokens?.map((token, id) => (
              <div
                key={token?.token?.tokenId}
                className="flex flex-col items-start space-y-4"
              >
                <Image
                  src={token?.token?.image ?? ""}
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  loading={id < 10 ? "eager" : "lazy"}
                  // placeholder="blur"
                  // blurDataURL={token?.token?.image ?? ""}
                  width={250}
                  height={250}
                  alt=""
                />
                <div className="flex-col items-start justify-start">
                  <p className="text-white">Bitcoin Punk #2358</p>
                  <p className="text-white/50">3.7 ETH</p>
                  <p className="text-white/50">
                    {data?.[id] ? "Verified" : "Fake"}
                  </p>
                </div>
                <div className="flex w-full flex-1 items-center justify-center bg-neutral-800">
                  <div className="relative w-full before:pointer-events-none before:absolute before:-inset-1 before:rounded-[2px] before:border before:border-orange-500 before:opacity-0 before:ring-2 before:ring-orange-500/20 before:transition after:pointer-events-none after:absolute after:inset-px after:rounded-[2px] after:shadow-highlight after:shadow-white/5 after:transition">
                    <button className="relative w-full rounded-sm border border-black/5 bg-neutral-750 px-3.5 py-2 text-sm text-neutral-200 shadow-input shadow-black/10 !outline-none placeholder:text-neutral-400 ">
                      Buy Now
                    </button>
                  </div>
                </div>
                {/* <img
                  src="./verified.svg"
                  className="absolute -top-4 -right-4 h-8 w-8"
                /> */}
                {/* <p className="text-white">Bitcoin Address: {data}</p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
