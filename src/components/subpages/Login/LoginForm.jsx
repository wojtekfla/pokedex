import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";

import { USERS_URL } from "../../../utils/constants";
import { LoginContext } from "../../../context/LoginContext";
import { useSnackbar } from "notistack";

export function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const loginSchema = z.object({
    userName: z.string().min(1, { message: "User name is required!" }),
    password: z.string().min(1, { message: "Password is required!" }),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data) {
    console.log("submited data", data);

    try {
      setLoading(true);
      // const response = await fetch(
      //   `${USERS_URL}/?userName=${encodeURIComponent(data.userName)}&password=${encodeURIComponent(data.password)}`
      // );
      const response = await fetch(
        `${USERS_URL}/?userName=${data.userName}&password=${data.password}`,
      );
      const users = await response.json();
      console.log("users", users);

      if (users.length === 1) {
        const user = users[0];
        console.log("user in login", user);
        enqueueSnackbar("Successfuly logged in", { variant: "info" });
        setIsLoggedIn(true);
        setLoggedUser(user);
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('loggedUser', JSON.stringify(user))
        setTimeout(() => {
          navigate("/");
        }, 1500);
      } else if (users.length > 1) {
        enqueueSnackbar("System error: multiple users found.", { variant: "error" });
        console.error("Multiple users found with the same credentials:", users);
        reset(); 
      } else {
        enqueueSnackbar("Invalid username or password", { variant: "error" });
        reset();
      }
    } catch (error) {
      console.error("Login error", error);
      enqueueSnackbar("Something went wrong during login", {
        variant: "error",
      });
      reset()
    } finally {
      setLoading(false);
    }
  }

  const checkUserStatus = (data) => {
    const usersJson = getUsersData();
    if (usersJson) {
      setUsersFromJson(usersJson);
      console.log(usersFromJson);
    }
  };

  async function getUsersData() {
    const url = "http://localhost:3000/users";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log("json", json);
      return json;
    } catch (error) {
      console.error(error.message);
    }
  }

  const onSubmit2 = (data) => {
    console.log("submited data", data);
    const nameToCheck = data.userName;
    console.log("name => ", nameToCheck);
    console.log("users data", usersData);
    const isUser = usersData.find((user) => {
      return user.userName === nameToCheck;
    }).userName;
    console.log(isUser);
  };

  return (
    <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center dark:bg-gray-800 dark:text-white">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-4"
      >
        <div className="flex w-3/4 flex-col text-left">
          <label htmlFor="userName" className="mb-1 font-medium">
            Username
          </label>
          <input
            {...register("userName")}
            id="userName"
            type="text"
            className="w-full rounded border-2 border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.userName && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.userName.message}
            </p>
          )}
        </div>

        <div className="flex w-3/4 flex-col text-left">
          <label htmlFor="password" className="mb-1 font-medium">
            Password
          </label>
          <input
            {...register("password")}
            id="password"
            type="password"
            className="w-full rounded border-2 border-gray-300 px-2 py-1 dark:border-gray-600 dark:bg-gray-700"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || loading}
          className="mt-2 w-3/4 rounded bg-sky-500 px-3 py-2 text-white hover:bg-sky-400 disabled:bg-sky-300 dark:bg-sky-700 dark:hover:bg-sky-600"
        >
          {loading ? "Logging in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
}

// <>
//       <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center dark:bg-gray-800 dark:text-slate-300">
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div>
//             <label htmlFor="userName" className='flex justify-center w-4/5'>Name </label>
//             <input
//               {...register("userName")}
//               id="userName"
//               type="text"
//               className="w-3/5 border-2 border-gray-300 dark:border-gray-600 dark:bg-gray-700"
//             />
//             {errors.userName && (
//               <p className="text-red-500">{errors.userName.message}</p>
//             )}
//           </div>
//           <div>
//             <div>
//               <label htmlFor="password">password </label>
//             </div>
//             <input
//               {...register("password")}
//               id="password"
//               type="password"
//               value="Qwerty123!"
//               className="border-2 border-l-neutral-300"
//             />
//             {errors.password && (
//               <p className="text-red-500">{errors.password.message}</p>
//             )}
//           </div>
//           <button className="mt-2 rounded bg-sky-500 px-3 py-1 text-white">
//             Sign in
//           </button>
//         </form>
//       </div>
//     </>
