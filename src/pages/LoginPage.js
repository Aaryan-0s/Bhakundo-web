import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/bhakundo.png";
import Bg from "../assets/images/field.png";
import PasswordField from "../components/Login-Signup/PasswordField";
import Input from "../components/common/Input";
import Button from "../components/common/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSignin = (e) => {
    e.preventDefault();

    // Perform form validation
    if (username.trim() === "") {
      setError("Username is required");
      return;
    }

    if (password.trim() === "") {
      setError("Password is required");
      return;
    }

    axios
      .post("http://localhost:3001/api/v1/auth/login", { username, password })
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        // Assuming the user data is returned in the response
        const user = response.data.user;

        setMessage(response.data.message);
        // setUser(user);
        window.location.href = "/";
      })
      .catch((err) => {
        setError(err.response.data.message);
        
      });
  };

  return (
    <section className="min-h-screen flex flex-col md:flex-row  bg-[#001219]">
      <div
        className="bg-[#001219] w-full md:w-1/2 px-6 lg:px-16 xl:px-12
          my-4"
      >
        <div>
          <div className="flex justify-center">
            <img src={Logo} alt="filmcrate logo" className="relative " />
          </div>
          <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight mt-10 mb-2">
            LOGIN
          </h1>
          <h2 className="text-white text-2xl md:text-3xl font-medium leading-tight">
            WELCOME TO bhakundo
          </h2>

          <form className="mt-6" action="#" method="POST">
            {error && (
              <div className="text-red-600 text-xl font-semibold mb-2">
                {error}
              </div>
            )}
            {message && (
              <div className="text-green-600 text-xl font-semibold mb-2">
                {message}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <label className="block text-[#305973]  text-xl font-semibold">
                Username
              </label>
              <Input
                type="username"
                placeholder="Enter your username"
                autoFocus
                required
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div className="mt-5 flex flex-col gap-1">
              <label className="block text-[#305973] text-xl font-semibold">
                Password
              </label>
              <PasswordField
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            
            
            <Button text="LOGIN" onClick={handleSignin} />
          </form>

          <hr className="my-6 border-[#305973]  w-full"></hr>

          <p className="text-white mt-8 text-base flex items-center gap-2 md:text-lg">
            Need an account?{" "}
            <Link
              to="/signup"
              className="text-[#305973] text-lg md:text-xl font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>

      <div className="h-screen bg-[#001219] hidden md:block md:fixed md:right-0 w-1/2">
        <img
          src={Bg}
          alt="background"
          className="w-full h-full object-fill"
        ></img>
      </div>
    </section>
  );
}
