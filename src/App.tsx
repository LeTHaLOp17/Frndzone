import {Routes, Route} from 'react-router-dom';
import './globals.css';
import SigninForm from './_auth/forms/SigninForm';
//baat mai page1, page wagera dd kar sakte hai bina ki dikkat ke
import { Home } from './_root/pages';
import SignupForm from './_auth/forms/SignupForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Toaster } from "@/components/ui/toaster";

const App = () => {
  return (
    <main className='flex h-screen'>
        <Routes>
            {/* public routes means everybuddy will able to see */}
            <Route element = {<AuthLayout />}>
              <Route path='/sign-in' element = {<SigninForm />} />
              <Route path='/sign-up' element = {<SignupForm />} />
            </Route>
  

            {/* private routes means you will able to see jab tum login karoge */}
            <Route element = {<RootLayout />}>
              <Route index element = {<Home />}/>
            </Route>
            
        </Routes>

        
        <Toaster/>
    </main>
  )
}

export default App
