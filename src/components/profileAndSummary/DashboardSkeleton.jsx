import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="w-4/5 mx-auto">
        {/* Header Section Skeleton */}
        <div className="mb-6 sm:mb-8">
          <Skeleton height={32} width={250} className="mb-2" />
          <Skeleton height={20} width={300} />
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Summary Stats Section Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div className="border rounded-xl shadow-sm p-4 sm:p-6">
              <Skeleton height={24} width={120} className="mb-2" />
              <Skeleton height={36} width={80} />
            </div>
            <div className="border rounded-xl shadow-sm p-4 sm:p-6">
              <Skeleton height={24} width={140} className="mb-2" />
              <Skeleton height={36} width={80} />
            </div>
            <div className="border rounded-xl shadow-sm p-4 sm:p-6">
              <Skeleton height={24} width={100} className="mb-2" />
              <Skeleton height={36} width={80} />
            </div>
          </div>

          {/* Profile and CGPA Chart Section Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 sm:gap-4">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
              <div className="p-6">
                <div className="flex flex-col items-center justify-center">
                  <Skeleton circle height={128} width={128} className="mb-4" />
                  <Skeleton height={28} width={200} className="mb-2" />
                  <Skeleton height={20} width={150} className="mb-4" />
                  <Skeleton height={32} width={180} />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:col-span-4">
              <Skeleton height={300} />
            </div>
          </div>

          {/* Semester Details Section Skeleton */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <Skeleton height={24} width={150} className="mb-2" />
              <Skeleton height={16} width={250} />
            </div>
            <div className="p-4">
              <div className="overflow-x-auto rounded-lg border border-gray-200">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      {["Semester", "SGPA", "Credits", "Courses"].map((header) => (
                        <th key={header} className="px-4 py-3">
                          <Skeleton height={16} width={80} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3].map((index) => (
                      <tr key={index}>
                        <td className="px-4 py-3">
                          <Skeleton height={20} width={120} />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton height={20} width={60} />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton height={20} width={40} />
                        </td>
                        <td className="px-4 py-3">
                          <Skeleton height={20} width={40} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
