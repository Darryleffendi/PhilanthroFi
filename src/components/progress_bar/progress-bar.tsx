import React from "react";

interface ProgressBarProps {
    progress: number;
    className? : string;
}

const ProgressBar : React.FC<ProgressBarProps> = ({progress, className="bg-blue-600"}) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4">
      <div
        className={`${className} h-1.5 rounded-full`}
        style={{ width: `${(progress > 100) ? '100' : progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
