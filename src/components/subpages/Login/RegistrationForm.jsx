import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const USERS_URL = "http://localhost:3000/users";

const signInSchema = z
  .object({
    userName: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" }),
    email: z
      .string()
      .min(3, { message: "email is required" })
      .includes("@", { message: "invalid email address" }),
    password: z
      .string()
      .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/, {
        message:
          "please use: 1 capital letter, 1 number, 1 special character, min. 8 characters",
      }),
    password2: z.string().min(1, { message: "please confirm password" }),
  })
  .refine(
    (data) => {
      return data.password === data.password2;
    },
    { message: "please repeat password", path: ["password2"] },
  );

export function RegistrationForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState(null);

  const checkUser = async () => {
    const res = await fetch(USERS_URL);
    const dataJson = await res.json();
    console.log("dataJson", dataJson);
  };

  async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password); // Konwertuj hasło na bajty
    const hashBuffer = await crypto.subtle.digest('SHA-256', data); // Oblicz hash
    const hashArray = Array.from(new Uint8Array(hashBuffer)); // Konwertuj wynik na tablicę bajtów
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join(''); // Na format hex
    return hashHex;
}

  async function addUser(data) {
    try {
      const response = await fetch(USERS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("New User successfully added");
      } else {
        throw new Error("Http response failed");
      }
    } catch (error) {
      console.error("Error", error);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data) => {
    console.log("submited data", data);
    data.hash = hashPassword (data.password)
     
    addUser(data);
    // setFormData(data)
    // setIsFormSubmitted(true)
  };

  return (
    <>
      <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center"
        >
          <div>
            <div>
              <label htmlFor="userName">Username </label>
            </div>
            <input
              {...register("userName")}
              id="userName"
              name="userName"
              type="text"
              className="border-2 border-l-neutral-300"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="email">email </label>
            </div>
            <input
              {...register("email")}
              id="email"
              type="text"
              className="border-2 border-l-neutral-300"
            ></input>
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="password">password </label>
            </div>
            <input
              {...register("password")}
              id="password"
              type="text"
              className="border-2 border-l-neutral-300"
            ></input>
            {errors.password && (
              <p className="pt-1 leading-3 text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="password2">confirm password </label>
            </div>
            <input
              {...register("password2")}
              id="password2"
              type="text"
              className="border-2 border-l-neutral-300"
            ></input>
            {errors.password2 && (
              <p className="pt-1 leading-3 text-red-500">
                {errors.password2.message}
              </p>
            )}
          </div>
          <div className="flex justify-center">
            {isSubmitting ? (
              <button
                className="mt-2 rounded bg-slate-200 px-3 py-1 text-slate-400"
                disabled
              >
                Sign in
              </button>
            ) : (
              <button className="mt-2 rounded bg-sky-500 px-3 py-1 text-white hover/edit:scale-105 hover:bg-sky-400">
                Sign in
              </button>
            )}
          </div>
        </form>
      </div>
      <button onClick={checkUser} className="mt-2 rounded bg-sky-500 px-3 py-1 text-white hover/edit:scale-105 hover:bg-sky-400">
        Check user in database
      </button>
    </>
  );
}
