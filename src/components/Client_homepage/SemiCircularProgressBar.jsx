import React, { useEffect, useState } from "react";

const SemiCircularProgressBar = () => {
  const [progress, setProgress] = useState(180);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev > 0 ? prev - 1 : 0));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const radius = 40; // radius of the semi-circle
  const dashArray = Math.PI * radius; // circumference of the semi-circle
  const dashOffset = dashArray * (1 - progress / 180); // offset based on the progress

  return (
    <div className="relative flex items-center justify-center rotate-90 ">
      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 50">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0FB4C3" />
            <stop offset="100%" stopColor="#0FB4C3" />
          </linearGradient>
        </defs>
        <path
          d="M 10,50 A 40,40 0 0,1 90,50"
          fill="none"
          stroke="#e6e6e6"
          strokeWidth="10"
        />
        <path
          d="M 10,50 A 40,40 0 0,1 90,50"
          fill="none"
          stroke="url(#gradient)"
          strokeWidth="10"
          strokeDasharray={dashArray}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <div className="absolute text-2xl font-bold text-primary -rotate-90 ml-4">
        {progress}
      </div>
    </div>
  );
};

export default SemiCircularProgressBar;
