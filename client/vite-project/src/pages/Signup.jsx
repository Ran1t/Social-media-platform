import {React,useState} from 'react'
import { Link } from 'react-router-dom'
import { axiosInstance } from '../axiosCalls/axios'

function Signup() {

    const [form,setForm]=useState({name:"",username:"",email:"",password:""})

    const [loader,setLoader] =useState(false)

    const handleChange=(e)=>{
        setForm((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
          await axiosInstance.post("/users/register",form)
            // Add all the validation errors
           // Add a Loader



          console.log("User Registered")
        }
        catch(error){
          console.log(error)
        }
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden">
      {/* Background Glow Deco */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 bg-slate-900/80 backdrop-blur-xl p-8 rounded-2xl border border-slate-800 shadow-2xl relative z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-tr from-indigo-500 to-violet-500 shadow-lg shadow-indigo-500/30 mb-2">
            <span className="text-xl font-black text-white tracking-wider">SST</span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Join SST Social
          </h2>
          <p className="text-sm text-slate-400">
            Connect without limits. Share your world, seamlessly.
          </p>
        </div>

        {/* Form */}
        <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Alex Morgan"
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-slate-100 placeholder-slate-600 text-sm"
            />
          </div>

          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Username
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-500 text-sm">@</span>
              <input
                id="username"
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="alexmorgan"
                className="w-full pl-8 pr-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-slate-100 placeholder-slate-600 text-sm"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Email
            </label>
            <input
              id="email"
              name="email"
              onChange={handleChange}
              type="email"
              placeholder="alex@example.com"
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-slate-100 placeholder-slate-600 text-sm"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              id="password"
              name="password"
              onChange={handleChange}
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-2.5 bg-slate-950/60 border border-slate-800 rounded-xl focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition text-slate-100 placeholder-slate-600 text-sm"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full py-3 px-4 rounded-xl text-sm font-semibold text-white bg-linear-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 active:scale-[0.99] shadow-lg shadow-indigo-500/25 transition duration-150 ease-in-out cursor-pointer"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Catchphrase & Footer */}
        <div className="pt-2 border-t border-slate-800/60 text-center space-y-3">
          <p className="text-xs italic text-slate-500">
            "Your story starts here."
          </p>
          <p className="text-xs text-slate-400">
            Already a member?{' '}
            <Link 
              to="/login" 
              className="font-medium text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition"
            >
              Log in
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup