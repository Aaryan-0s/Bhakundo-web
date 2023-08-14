import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/bhakundo.png";
import Bg from "../assets/images/field.png";
import PasswordField from "../components/Login-Signup/PasswordField";
import Input from "../components/common/Input";
import Button from "../components/common/button";

export default function RegisterPage() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/api/v1/auth/signup", {
        fname,
        lname,
        username,
        email,
        password,
      })
      .then((response) => {
        setFname("");
        setUsername("");
        setEmail("");
        setPassword("");
        setMessage(response.data.message);
        setShowMessage(true); // Show the message
        window.location.href = "/signin";
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setError(error.response.data.error);
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  useEffect(() => {
    // Use useEffect to reset the message after 3 seconds
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showMessage]);

  return (
    <section className="min-h-screen flex flex-col md:flex-row bg-[#001219]">
      <div
        className="bg-[#001219] w-full md:w-1/2 px-6 lg:px-16 xl:px-12
          my-4"
      >
        <div className="w-full h-fit">
          <div className="flex justify-center">
            <img src={Logo} alt="bhakundo logo" className="relative -left-4" />
          </div>
          <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight mt-10 mb-2">
            Signup
          </h1>
          <h2 className="text-white text-2xl md:text-3xl font-medium leading-tight">
            WELCOME TO bhakundo
          </h2>

          <form className="mt-6 flex flex-col gap-4" action="#" method="POST">
            <div className="flex flex-col gap-1">
              <label className="block text-[#305973]  text-xl font-semibold">
                Email
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                autoFocus
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mt-5flex flex-col gap-1">
              <label className="block text-[#305973] text-xl font-semibold">
                First Name
              </label>
              <Input
                type="text"
                placeholder="Enter your first name"
                required
                value={fname}
                onChange={(e) => setFname(e.target.value)}
              />
            </div>
            <div className="mt-5flex flex-col gap-1">
              <label className="block text-[#305973] text-xl font-semibold">
                Last Name
              </label>
              <Input
                type="text"
                placeholder="Enter your last name"
                required
                value={lname}
                onChange={(e) => setLname(e.target.value)}
              />
            </div>
            <div className="mt-5flex flex-col gap-1">
              <label className="block text-[#305973] text-xl font-semibold">
                Username
              </label>
              <Input
                type="text"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="block text-[#305973] text-xl font-semibold">
                Password
              </label>
              <PasswordField
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <div className="mt-5">
              <label className="block text-[#305973] text-xl font-semibold">
                Confirm Password
              </label>
              <PasswordField placeholder="Confirm your password" />
            </div> */}

            <Button text="SIGNUP" onClick={handleSignup} />
          </form>

          <hr className="my-6 border-[#305973] w-full"></hr>

          <p className="text-white mt-8 text-base flex items-center gap-2 md:text-lg">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="text-[#305973] text-lg md:text-xl font-semibold"
            >
              Log in
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

      {showMessage && (
        <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-2">
          {message}
        </div>
      )}
    </section>
  );
}
