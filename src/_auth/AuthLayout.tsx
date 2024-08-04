import { Outlet, Navigate } from "react-router-dom";


const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated ? (
        <Navigate to = "/" />
        //agar user authenticated hoga to home page jayega
      ) : (
        <>
        <section className="flex flex-1 justify-center items-center flex-col py-10">
          <Outlet />
        </section>

        <img
        src="/assets/images/Loginimg.jpg"
        alt = "logo"
        className="hiidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        />
        </>
        //nhi to Outlet signin ya signup mai jayega
      )}
    </>
  )
}

export default AuthLayout
