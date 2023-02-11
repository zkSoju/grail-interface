"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Navbar = () => {
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center border-b border-white/5 px-8 py-4">
        <p className="font-adhesion text-base text-white drop-shadow-2xl">
          grail<span className="text-[#f8921a]">punks</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
