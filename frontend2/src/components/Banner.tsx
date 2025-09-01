import React from "react";

export const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="w-full flex gap-2 mb-8">
        {/* Carousel Banner */}
        <div className="w-10/12">
          <div className="h-[400px] bg-blue-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-semibold text-blue-800">
              Carousel Banner
            </span>
          </div>
        </div>

        {/* Static Banners */}
        <div className="w-2/12 flex flex-col gap-4">
          <div className="h-[192px] bg-green-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-semibold text-green-800">
              Static Banner 1
            </span>
          </div>
          <div className="h-[192px] bg-purple-200 rounded-lg flex items-center justify-center">
            <span className="text-2xl font-semibold text-purple-800">
              Static Banner 2
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
