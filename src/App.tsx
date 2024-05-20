import { Routes, Route } from 'react-router-dom'
import './globals.css'
import Home from './_root/pages/Home'
import SigninForm from './_auth/forms/SigninForm'
import SignupForm from './_auth/forms/SignupForm'
import AuthLayout from './_auth/AuthLayout'
import RootLayout from './_root/RootLayout'
import { Toaster } from '@/components/ui/toaster'
import { AllUsers, CreatePost, Explore, LikedPost, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages'
import EditPost from './_root/pages/EditPost'

const App = () => {
     return (
          <main className="flex h-screen ">
               <Routes>
                    {/* public routes */}
                    <Route element={<AuthLayout />}>
                         <Route path="/sign-in" element={<SigninForm />} />
                         <Route path="/sign-up" element={<SignupForm />} />
                    </Route>



                    {/* private routes */}
                    <Route element={<RootLayout />}>
                         <Route index  element={<Home />} />
                         <Route path="/explore" element={<Explore />} />
                         <Route path="/saved" element={<Saved />} />
                         <Route path="/all-users" element={<AllUsers />} />
                         <Route path="/create-post" element={<CreatePost />} />
                         <Route path="/update-post/:id" element={<EditPost />} />
                         <Route path="/posts/:id" element={<PostDetails />} />
                         <Route path="/profile/:id/*" element={<Profile />} />
                         <Route path="/update-profile/:id" element={<UpdateProfile />} />
                         <Route path="/liked-post/:id" element={<LikedPost />} />
                    </Route>
               </Routes>
               <Toaster />
          </main>
     )
}

export default App
