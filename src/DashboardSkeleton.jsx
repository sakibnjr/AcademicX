import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div>
      <div className="mx-auto my-4 grid w-4/5 grid-cols-1 gap-4 md:grid-cols-6">
        {/* Skeleton for Profile Section */}
        <div className="grid grid-cols-1 content-center gap-4 rounded-md p-4 shadow-md md:col-span-2">
          <div className="flex justify-center">
            <Skeleton circle={true} height={100} width={100} />
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <Skeleton width={300} height={40} />
            <Skeleton width={150} height={20} />
            <Skeleton width={180} height={20} />
          </div>
        </div>

        {/* Skeleton for Academic Summary */}
        <div className="grid grid-cols-1 gap-4 md:col-span-1">
          <div className="flex flex-col items-center justify-center gap-2 p-2 shadow-md">
            <Skeleton width={60} height={20} />
            <Skeleton circle={true} width={70} height={70} />
          </div>
          <div className="p-2 text-center shadow-md">
            <div className="stat-title">
              <Skeleton width={120} height={20} />
            </div>
            <div className="stat-value">
              <Skeleton width={80} height={20} />
            </div>
          </div>
          <div className="p-2 text-center shadow-md">
            <div className="stat-title">
              <Skeleton width={120} height={20} />
            </div>
            <div className="stat-value">
              <Skeleton width={80} height={20} />
            </div>
          </div>
        </div>

        {/* Skeleton for CGPA Chart */}
        <div className="p-2 shadow-md md:col-span-3">
          <Skeleton height={300} />
        </div>
      </div>
      {/* Skeleton for Semester Slider */}
      <div className="mx-auto w-4/5 text-center">
        <div className="flex justify-center gap-4">
          <Skeleton width={100} height={25} />
          <Skeleton width={100} height={25} />
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
