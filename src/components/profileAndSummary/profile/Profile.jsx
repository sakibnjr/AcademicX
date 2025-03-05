import React from "react";

const Profile = ({ profile }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-2 shadow-md md:col-span-2">
      <div className="flex justify-center">
        <img
          src={`https://avatar.iran.liara.run/public?name=${profile.studentName}&gender=male&size=500`}
          alt="Avatar"
          className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-500"
        />
      </div>
      <div className="space-y-2 text-center text-gray-800">
        <h2 className="text-2xl font-semibold text-primaryDark">
          {profile.studentName}
        </h2>
        <p className="text-gray-600">{profile.studentId}</p>
        <p className="rounded-md bg-primaryDark text-white">
          {profile.deptShortName} <span className="mx-2 text-lg">|</span> BATCH{" "}
          {profile.batchNo}
        </p>
      </div>
    </div>
  );
};

export default Profile;
