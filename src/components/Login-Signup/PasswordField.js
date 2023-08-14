import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Input from "../common/Input";

const PasswordField = ({ placeholder, value, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
    } else {
      setError("");
    }

    onChange(e);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        value={value}
        onChange={handlePasswordChange}
      />
      <button
        type="button"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#305973] text-xl focus:outline-none"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <AiFillEye className="text-2xl text-dark-slate text-black" />
        ) : (
          <AiFillEyeInvisible className="text-2xl text-dark-slate text-black" />
        )}
      </button>
    </div>
  );
};

export default PasswordField;
