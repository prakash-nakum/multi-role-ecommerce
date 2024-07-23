"use client";

import UserUpdate from "@/components/dashboard/UserUpdate";
import PrivateRoute from "@/components/shared/PrivateRoute";
import Dashboard from "@/components/shared/layouts/Dashboard";
import DashboardLading from "@/components/shared/skeletonLoading/DashboardLading";
import { useGetUsersQuery } from "@/services/user/userApi";
import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";

const AddUsers = () => {

  const accessToken = useSelector((state) => state.accesstoken.token)
  const { data: usersData, error: usersError, isLoading } = useGetUsersQuery(accessToken);
  const users = usersData?.data || [];


  // useEffect(() => {
  //   if (usersError) {
  //     alert(usersError?.data?.description);
  //   }
  // }, [usersError]);

  return (
    <Dashboard>
      <PrivateRoute >
        {/* {!accessToken ? ( */}
        {isLoading || users?.length === 0 ? (
          <DashboardLading />
        ) : (
          <div className="w-full h-full">
            <div className="overflow-x-auto h-full w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-100">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Avatar
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Cart
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Role
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-bold text-gray-500 uppercase whitespace-nowrap"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user?._id}
                      className="odd:bg-white even:bg-gray-100 hover:odd:bg-gray-100"
                    >
                      <td className="px-6 py-4 text-gray-800">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_NODE_URL}/${user?.avatar?.url}`}
                          // src={user?.avatar?.url}
                          alt={user?.avatar?.public_id}
                          height={30}
                          width={30}
                          className="h-[30px] w-[30px] rounded-secondary border border-green-500/50 object-cover"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.cart?.length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-800">
                        {user?.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {user?.role === "admin" ? (
                          "N/A"
                        ) : (
                          <UserUpdate user={user} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </PrivateRoute >
    </Dashboard>
  );
};

export default AddUsers;
