import React, { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "./authStyle.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [auth, setAuth] = useState();

  //   create handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          name,
          email,
          password,
          phone,
          role,
        }
      );
      // console.log(res);
      if (res && res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.token,
        });
        // console.log(auth);
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.message);
    }
  };

  return (
    <Layout title={"Register - Ecommerce app"}>
      <div className="flex justify-center items-center flex-col my-10">
        <form
          onSubmit={handleSubmit}
          className="border p-5 rounded-md flex justify-center items-center flex-col gap-8"
        >
          <h1 className="font-bold text-lg">Register Page</h1>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded-md w-72"
            placeholder="Name - atleast 8 character"
            required
            maxLength={8}
          />

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

          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 rounded-md w-72"
            placeholder="Phone Number"
            required
          />

          <input
            type="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border p-2 rounded-md w-72"
            placeholder="User Role"
          />

          <button
            type="submit"
            className="bg-blue-500 py-2 w-full rounded-md font-bold"
          >
            Submit
          </button>
          <p className="text-center text-gray-500 text-xs">
            Already have an account?
            <NavLink to="/login" className="text-blue-500">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
