"use client";

import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usePersistLoginQuery } from "@/services/auth/authApi";
import { addUser } from "@/features/auth/authSlice";
import Link from "next/link";
import Whatsapp from "@/components/icons/Whatsapp";

const AppWrapper = ({ children }) => {

  const accessToken = useSelector((state) => state.accesstoken.token)
  const dispatch = useDispatch();
  const { data: userData, isError: userError } = usePersistLoginQuery(accessToken);
  const user = useMemo(() => userData?.data || {}, [userData]);

  useEffect(() => {
    if (!userError) {
      dispatch(addUser(user));
    }
  }, [userData, accessToken, userError, dispatch, user]);


  return <>
    {children}
    <div className="fixed bottom-0 right-0">
      <button >
        <Link href={`https://wa.me/9429877966`} >
          <Whatsapp />
          {/* <Image src={chaticon} width={190} height={50} alt="chat-icon" /> */}
        </Link>
      </button>
    </div>
  </>;
};

export default AppWrapper;
