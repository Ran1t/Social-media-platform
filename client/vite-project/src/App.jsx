import {BrowserRouter,Routes,Route} from "react-router-dom"
import Landing from "./pages/Landing"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from "./pages/Profile"
import { AuthProvider } from "./context/AuthContext"
import PublicRoute from "./components/PublicRoute"
import ProtectedRoutes from "./components/ProtectedRoutes"

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>

        <Routes>
          <Route path="/" element={<PublicRoute><Landing/></PublicRoute>}/>
          <Route path="/home" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
          <Route path="/signup" element={<PublicRoute><Signup/></PublicRoute>}/>

          <Route path="/profile" element={<ProtectedRoutes><Profile/></ProtectedRoutes>}/>
        </Routes>

      </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
