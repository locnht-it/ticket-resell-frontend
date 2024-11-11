import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useUserApi } from "../../api/userApi";
import { toast } from "react-toastify";
import { storage } from "../../lib/firebase/Firebase";

const UserAddNew = () => {
  const [image, setImage] = useState(null);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState(null);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const { createStaffUser } = useUserApi();

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageRef = ref(storage, `images/${file.name + v4()}`);
      uploadBytes(imageRef, file)
        .then(() => getDownloadURL(imageRef))
        .then((url) => {
          setImage(url);
          setErrors((prevErrors) => {
            const newErrors = { ...prevErrors };
            delete newErrors.image;
            return newErrors;
          });
        })
        .catch((error) => console.error("Error uploading image:", error));
    }
  };

  // Validate password
  const isValidPassword = (password) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{9,}$/;
    return passwordRegex.test(password);
  };

  // Validate email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validate phone number
  const isValidPhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handleGenderChange = (e) => {
    const selectedGender = parseInt(e.target.value);
    setGender(selectedGender);

    // Xóa lỗi khi người dùng chọn giới tính
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (selectedGender !== "") {
        delete newErrors.gender;
      }
      return newErrors;
    });
  };

  // Handle input change with live validation
  const handleInputChange = (field, value) => {
    let newErrors = { ...errors };

    if (field === "fullname") {
      setFullname(value);
      if (!value.trim()) newErrors.fullname = "Full name is required.";
      else delete newErrors.fullname;
    }

    if (field === "address") {
      setAddress(value);
      if (!value.trim()) newErrors.address = "Address is required.";
      else delete newErrors.address;
    }

    if (field === "email") {
      setEmail(value);
      if (!value.trim()) newErrors.email = "Email is required.";
      else if (!isValidEmail(value)) newErrors.email = "Invalid email format.";
      else delete newErrors.email;
    }

    if (field === "phoneNumber") {
      setPhoneNumber(value);
      if (!value.trim()) newErrors.phoneNumber = "Phone number is required.";
      else if (!isValidPhoneNumber(value))
        newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
      else delete newErrors.phoneNumber;
    }

    if (field === "password") {
      setPassword(value);
      if (!value) newErrors.password = "Password is required.";
      else if (!isValidPassword(value))
        newErrors.password =
          "Password must be at least 9 characters and include 1 uppercase, 1 number, and 1 special character.";
      else delete newErrors.password;
    }

    setErrors(newErrors);
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    if (!image) newErrors.image = "Please upload an avatar.";
    if (!fullname.trim()) newErrors.fullname = "Full name is required.";
    if (!address.trim()) newErrors.address = "Address is required.";
    if (!email.trim()) newErrors.email = "Email is required.";
    if (!isValidEmail(email)) newErrors.email = "Invalid email format.";
    if (!phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required.";
    if (!isValidPhoneNumber(phoneNumber))
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    if (!gender) newErrors.gender = "Please select a gender.";
    if (!password) newErrors.password = "Password is required.";
    if (!isValidPassword(password))
      newErrors.password =
        "Password must be at least 9 characters and include 1 uppercase, 1 number, and 1 special character.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const accountData = {
      image,
      fullname,
      address,
      email,
      phoneNumber,
      password,
      gender,
    };

    createStaffUser(accountData)
      .then(() => {
        toast.success("Account has been created successfully!");
        navigate("/user");
      })
      .catch((error) => console.error("Error creating user:", error));
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">
        Create New Account
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Chọn Avatar */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {image && (
            <div className="mt-4">
              <img
                src={image}
                alt="Avatar Preview"
                className="w-32 h-32 object-cover rounded-full"
              />
            </div>
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={fullname}
            onChange={(e) => handleInputChange("fullname", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {errors.fullname && (
            <p className="text-red-500 text-sm mt-1">{errors.fullname}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Address */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Phone</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Gender</label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="">Select Gender</option>
            <option value="0">Male</option>
            <option value="1">Female</option>
            <option value="2">Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
          )}
        </div>

        <div className="flex justify-between">
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            onClick={() => navigate("/user")}
          >
            Back
          </button>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Create New Account
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAddNew;
