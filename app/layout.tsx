"use client";
/* eslint-disable @next/next/no-head-element */

import "../styles/globals.css";
import "../styles/tailwind.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from "wagmi";
import Navbar from "./Navbar";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ReservoirKitProvider, darkTheme } from "@reservoir0x/reservoir-kit-ui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { chains, provider } = configureChains([mainnet], [publicProvider()]);

  const { connectors } = getDefaultWallets({
    appName: "My RainbowKit App",
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  return (
    <html>
      <head></head>
      <body>
        <ReservoirKitProvider
          options={{
            apiBase: "https://api.reservoir.tools",
            apiKey: "YOUR-KEY",
          }}
        >
          <WagmiConfig client={wagmiClient}>
            <RainbowKitProvider chains={chains}>
              <div className="mx-auto">
                <Navbar />
                {children}
              </div>
            </RainbowKitProvider>
          </WagmiConfig>
        </ReservoirKitProvider>
      </body>
    </html>
  );
}
