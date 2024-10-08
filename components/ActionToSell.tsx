import React from "react";
import { Button } from "./ui/button";
import { Video } from "./video";

const ActionToSell = () => {
  return (
    <div className="flex-col justify-between md:flex-row flex gap-4 items-stretch">
      <div className="py-12 px-4 gap-4 lg:px-8 flex flex-col bg-gradient-to-b from-indigo-400 to-violet-600 rounded-lg basis-full">
        <h2 className="font-semibold text-gray-50 text-3xl">
          Start Earning with Creative Market
        </h2>
        <p className="text-gray-50 text-sm py-4 max-w-md font-semibold">
          Sell your designs and reach millions of buyers or promote other
          artists on Creative Market to earn cash!
        </p>
        <div className="gap-2 flex flex-col lg:flex-row rounded-lg">
          <Button variant="default" className="bg-slate-700 text-slate-50">
            Sell your designs
          </Button>
          <Button variant="outline">Become an affiliate</Button>
        </div>
      </div>
      <Video
        className="rounded-lg aspect-w-7 h-4 overflow-hidden"
        src="https://www.youtube.com/watch?v=3uA1yMnaS2I"
      />
    </div>
  );
};

export default ActionToSell;
