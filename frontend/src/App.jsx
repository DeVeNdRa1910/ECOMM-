import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signin from "./pages/Signin";
import Forgot from "./pages/Forgot";
import Landing from "./pages/Landing";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import context from "./context";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import Update from "./pages/Update";

function App() {

  const dispatch = useDispatch()

  async function fetchUserDetails() {
    try {
      const resp = await axios.get("/api/user-details", {
        withCredentials: true,
      });

      console.log("App.jsx user Data is ", resp.data);
      if(resp.data.success){
        dispatch(setUserDetails(resp.data.data))
      }
    } catch (error) {
      console.error("Failed to fetch user details:", error);
    }
  }

  useEffect(() => {
    /* user details */
    fetchUserDetails();
  }, []);

  return (
    <>
      <context.Provider value={{ fetchUserDetails }}>
        <BrowserRouter>
          <Header />
          <main className="min-h-[130vh] mt-[16vh]">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/update-profile" element={<Update />} />
              <Route path="/forgotpassword" element={<Forgot />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </context.Provider>
    </>
  );
}

export default App;
