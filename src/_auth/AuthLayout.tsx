import { Outlet, Navigate } from 'react-router-dom'

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10 "   >
            <Outlet />
          </section>

          <video 
            src="./assets/videos/sideVideo.mp4" 
            autoPlay 
            loop 
            muted 
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-cover"
          />
        </>

      )}

    </>
  )
}

export default AuthLayout
