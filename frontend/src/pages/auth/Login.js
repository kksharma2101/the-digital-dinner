import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import "./authStyle.css";
import { useAuth } from "../../context/Auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  //   create handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {
        email,
        password,
      });
      // console.log(res.data.user.name);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        toast.success(res.data && res.data.message);
      } else {
        toast.error("something is wrong");
      }
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="flex justify-center items-center flex-col mt-10">
        <form
          onSubmit={handleSubmit}
          className="border p-5 rounded-md flex justify-center items-center flex-col gap-8"
        >
          <h1 className="font-bold text-lg">Login Page</h1>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded-md w-72"
            placeholder="Email"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded-md w-72"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            className="bg-blue-500 py-2 w-full rounded-md font-bold"
          >
            Submit
          </button>

          <p className="text-center text-gray-500 text-xs">
            Don't have an account?
            <NavLink to="/register" className="text-blue-500">
              Register
            </NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
