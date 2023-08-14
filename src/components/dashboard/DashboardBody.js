import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";
import { UserContext } from "../../context/userContext";

const DashboardBody = () => {
  const { user, setUser } = useContext(UserContext);
  const [editing, setEditing] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [error, setError] = useState("");
  const [profilePicture, setProfilePicture] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [initialValues, setInitialValues] = useState({});

  const fileInputRef = useRef(null);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post(
        "http://localhost:3001/api/v1/auth/uploadImage", // Replace with your API endpoint for uploading the profile picture
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        axios.put(
          "http://localhost:3001/api/v1/auth/profile/update",
          {
            image: response.data.data,
          },

          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log("Profile picture uploaded successfully");
        // Fetch the updated user data after uploading the new photo
        const updatedUserResponse = await axios.get(
          "http://localhost:3001/api/v1/auth/info/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        const updatedUserData = updatedUserResponse.data;
        console.log(updatedUserData.data[0].image);
        // setUsername(updatedUserData.username);
        // setEmail(updatedUserData.email);
        setProfilePicture(updatedUserData.data[0].image);

        // setPictureSuccessMessage("Profile picture uploaded successfully!");
        // setTimeout(() => {
        //   setPictureSuccessMessage("");
        // }, 5000); // Remove the success message after 5 seconds
      } else {
        console.log("Failed to upload profile picture");
        // setPictureErrorMessage("Failed to upload profile picture");
        // setTimeout(() => {
        //   setPictureErrorMessage("");
        // }, 5000); // Remove the error message after 5 seconds
      }
    } catch (error) {
      console.log("Failed to upload profile picture", error);
      // setPictureErrorMessage("Failed to upload profile picture");
      // setTimeout(() => {
      //   setPictureErrorMessage("");
      // }, 5000); // Remove the error message after 5 seconds
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const updatedProfile = {
        fname: fname,
        lname: lname,
        username: username,
        email: email,
      };

      const response = await axios.put(
        "http://localhost:3001/api/v1/auth/profile/update",
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const updatedUser = response.data;
      setUser(updatedUser);
    } catch (error) {
      setError(error.response.data.error);
    }

    if (!profilePicture) {
      return;
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFname(initialValues.fname);
    setLname(initialValues.lname);
    setUsername(initialValues.username);
    setEmail(initialValues.email);
    setPassword(initialValues.password);
    setError("");
  };

  useEffect(() => {
    if (user) {
      const User = user.data[0];
      setFname(User.fname);
      setLname(User.lname);
      setUsername(User.username);
      setEmail(User.email);
      setPassword(User.password);
      setProfilePicture(User.image);
      setInitialValues({
        fname: User.fname,
        lname: User.lname,
        username: User.username,
        email: User.email,
        password: User.password,
      });
    }
  }, [user]);

  const handleProfilePictureChange = (e) => {
    setProfilePicture(e.target.files[0]);
    setError(null); // Reset the error message when selecting a new profile picture
  };

  const openFileInput = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };
console.log(profilePicture)
  return (
    <div className="bg-gray-700 rounded-lg p-8">
      <div className="relative mt-5 mb-16 flex flex-col h-[100vh] gap-8 lg:top-[77px]">
        <form className="px-2">
          <div className="relative flex flex-row justify-between items-center text-center gap-4 xl:w-[100%] md-2:items-stretch md-2:text-start">
            <img
              src={
                profilePicture
                  ? `http://localhost:3001/uploads/${profilePicture}`
                  : "https://st3.depositphotos.com/9998432/13335/v/600/depositphotos_133352156-stock-illustration-default-placeholder-profile-icon.jpg"
              }
              alt=""
              className="w-[100px] h-[100px] rounded-full object-fill ml-2"
            />
            <button
              className="absolute bottom-0 left-20 bg-red-400 flex items-center justify-center rounded-full w-8 h-8 hover:bg-red-500 transition-colors"
              onClick={openFileInput}
            >
              <BiUpload className="inline-block w-5 h-5" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageChange}

              // onChange={(e) => {
              //   // handle file selection logic here
              // }}
            />

            <input
              className="inline-block text-[18px] font-[500] bg-slate-300 text-white leading-[11px] mt-[30px] box-border h-[40px] px-[10px] py-[16px] border-none rounded-[8px] outline-none text-center cursor-pointer ml-[10px] mr-[10px] mb-[10px] hover:bg-slate-400 transition-colors"
              type="submit"
              value="rest"
              alt="rest"
              onClick={handleReset}
            />

            <input
              className="inline-block text-[18px] font-[500] bg-slate-300 text-white leading-[11px] mt-[30px] box-border h-[40px] px-[10px] py-[16px] border-none rounded-[8px] outline-none text-center cursor-pointer ml-[10px] mr-[10px] mb-[10px] hover:bg-slate-400 transition-colors"
              type="submit"
              value="delete"
              alt="delete"
            />
          </div>
        </form>

        <form
          onSubmit={handleProfileUpdate}
          className="flex flex-col gap-3 px-8"
        >
          {error && (
            <div className="text-pale-red md:col-span-2 md-2:col-span-1 lg:col-span-2">
              {error}
            </div>
          )}
          <div className="w-full flex flex-col gap-3 md:flex-row">
            <div className="relative md:w-1/2">
              <fieldset className="flex flex-col">
                <label className="text-[18px] font-[500px] text-white mb-3">
                  First Name
                </label>
                <input
                  className="rounded-lg py-2"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  data-testid="fname"
                />
              </fieldset>
            </div>
            <div className="relative md:w-1/2">
              <fieldset className="flex flex-col">
                <label className="text-[18px] font-[500px] text-white mb-3">
                  Last Name
                </label>
                <input
                  className="rounded-lg py-2"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                />
              </fieldset>
            </div>
          </div>
          <div className="relative">
            <fieldset className="flex flex-col">
              <label className="text-[18px] font-[500px] text-white mb-3">
                User name
              </label>
              <input
                className="rounded-lg py-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="relative">
            <fieldset className="flex flex-col">
              <label className="text-[18px] font-[500px] text-white mb-3">
                Email
              </label>
              <input
                className="rounded-lg py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>
          </div>
          {/* <div className="relative">
            <fieldset className="flex flex-col">
              <label className="text-[18px] font-[500px] text-white mb-3">
                Password
              </label>
              <input className="rounded-lg py-2" type="password"  />
            </fieldset>
          </div> */}
          <input
            className="bg-red-600 mt-5 py-2 rounded-lg w-full hover:bg-red-700 transition-colors"
            type="submit"
            value="Update"
          />
        </form>
      </div>
    </div>
  );
};

export default DashboardBody;
