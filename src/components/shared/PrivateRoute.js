'use client'

import Loading from "@/app/loading";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const accessToken = useSelector((state) => state.accesstoken.token)
  const pathname = usePathname()
  const allowedRoles = ["admin", "seller"]
  const onlyAdminallowed = ["admin"]

  useEffect(() => {
    if (!accessToken) {
      router.push("/auth/signin");
    } else {
      if (!Object.keys(user).length) {
        return;
      }
      if (!onlyAdminallowed.includes(user.role) && (pathname === "/dashboard/add-user" || pathname === "/dashboard/list-users")) {
        router.push("/unauthorized");
      } else if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
      } else {
        setLoading(false);
      }
    }
  }, [router, accessToken, pathname, user]);



  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
