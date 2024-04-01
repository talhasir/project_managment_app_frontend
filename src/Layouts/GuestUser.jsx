import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import Context from "../ContextProvider";
export default function GuestUser() {
  const { userToken } = useContext(Context);
  console.log(userToken);
  return (
    <>
      {userToken ? (
        <Navigate to={"/"} />
      ) : (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <Outlet />
        </div>
      )}
    </>
  );
}
