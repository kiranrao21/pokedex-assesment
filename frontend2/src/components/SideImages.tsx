import React, { useEffect, useState } from "react";

export const SideImages = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.querySelector(".search-bar-section");
      if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        setIsFixed(rect.bottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="side-images-container relative">
      {/* Left Side Image */}
      <div
        className={`${isFixed ? "fixed" : "absolute"} left-4 xl:block hidden`}
        style={{
          top: isFixed ? "72px" : "0",
          transition: "all 0.3s ease",
        }}
      >
        <div className="h-[600px] bg-yellow-200 rounded-lg flex items-center justify-center">
          <span className="text-xl font-semibold text-yellow-800 rotate-[-90deg]">
            Static Image 1
          </span>
        </div>
      </div>

      {/* Right Side Image */}
      <div
        className={`${isFixed ? "fixed" : "absolute"} right-4 xl:block hidden`}
        style={{
          top: isFixed ? "72px" : "0",
          transition: "all 0.3s ease",
        }}
      >
        <div className="h-[600px] bg-pink-200 rounded-lg flex items-center justify-center">
          <span className="text-xl font-semibold text-pink-800 rotate-90">
            Static Image 2
          </span>
        </div>
      </div>
    </div>
  );
};
