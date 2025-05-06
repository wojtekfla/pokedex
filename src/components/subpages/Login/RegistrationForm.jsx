import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { ThemeContext } from "../../../context/ThemeContext";
import { LoginContext } from "../../../context/LoginContext";

import { USERS_URL } from "../../../utils/constants";

const signInSchema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" }),
    email: z
      .string()
      .min(3, { message: "Email is required" })
      .includes("@", { message: "Invalid email address" }),
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
        message:
          "please use: 1 capital letter, 1 number, 1 special character, min. 8 characters",
      }),
    password2: z.string().min(1, { message: "Please confirm password" }),
  })
  .refine(
    (data) => {
      return data.password === data.password2;
    },
    { message: "Passwords do not match", path: ["password2"] },
  );

export function RegistrationForm() {
  const { darkMode } = useContext(ThemeContext);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const checkUser = async () => {
    const res = await fetch(USERS_URL);
    const dataJson = await res.json();
    console.log("dataJson", dataJson);
  };

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); // Konwertuj hasło na bajty
    const hashBuffer = await crypto.subtle.digest("SHA-256", data); // Oblicz hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Konwertuj wynik na tablicę bajtów
    const hashHex = hashArray
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join(""); // Na format hex
    return hashHex;
  }

  async function addUser(userData) {
    try {
      setLoading(true);
      const res = await fetch(USERS_URL);
      const users = await res.json();

      const userExist = users.some((u) => u.email === userData.email);
      if (userExist) {
        enqueueSnackbar("User with this email already exist", {
          variant: "error",
        });
        return;
      }

      const response = await fetch(USERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("HTTP response failed");
      }

      enqueueSnackbar("New User successfully added", { variant: "success" });
      setIsLoggedIn(true);
      setLoggedUser(userData);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("loggedUser", JSON.stringify(userData));

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      enqueueSnackbar("Something went wrong, try again", { variant: "error" });
      console.error("Error in registration form", error);
    }
  }

  const onSubmit = async (data) => {
    // const hashedPassword = await hashPassword(data.password)
    // wyłączam hashowanie dla czytelności json/users

    const newUser = {
      userName: data.userName,
      email: data.email,
      password: data.password,
    };

    addUser(newUser);
  }

  return (
    <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center dark:bg-gray-800 dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full items-center">
        <div className="w-3/4 flex flex-col text-left">
          <label htmlFor="userName" className="mb-1 font-medium">Username</label>
          <input
            {...register("userName")}
            id="userName"
            type="text"
            className="w-full border-2 border-gray-300 rounded px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.userName && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.userName.message}</p>}
        </div>

        <div className="w-3/4 flex flex-col text-left">
          <label htmlFor="email" className="mb-1 font-medium">Email</label>
          <input
            {...register("email")}
            id="email"
            type="text"
            className="w-full border-2 border-gray-300 rounded px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.email && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div className="w-3/4 flex flex-col text-left">
          <label htmlFor="password" className="mb-1 font-medium">Password</label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-full border-2 border-gray-300 rounded px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.password && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <div className="w-3/4 flex flex-col text-left">
          <label htmlFor="password2" className="mb-1 font-medium">Confirm Password</label>
          <input
            {...register("password2")}
            id="password2"
            type="password"
            className="w-full border-2 border-gray-300 rounded px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.password2 && <p className="text-red-500 dark:text-red-400 text-sm mt-1">{errors.password2.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="w-3/4 mt-2 rounded bg-sky-500 px-3 py-2 text-white hover:bg-sky-400 disabled:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600"
        >
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
    </div>
  );
}





