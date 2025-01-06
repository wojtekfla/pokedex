import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const USERS_URL = "http://localhost:3000/users";

export function LoginForm() {
  const [usersData, setUsersData] = useState(null);
  const [password, setPasword] = useState(null);

  const loginSchema = z.object({
    userName: z.string().min(1, { message: "User name is required!" }),
    password: z.string().min(1, { message: "Password is required!" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    fetch(`${USERS_URL}`)
      .then((response) => response.json())
      .then((data) => setUsersData(data))
      .then(() => console.log("efekt", usersData));
  }, []);


  const checkUserStatus = (data) => {
    const usersJson = getUsersData();
    if (usersJson) {
      setUsersFromJson(usersJson);
      console.log(usersFromJson);
    }
  };

  //   const newData = pokemonsData.map((item) => {
  //     const element = data.find((itemFromJson) => itemFromJson.id === item.id)
  //     if (element) {
  //       return {...item, ...element}
  //     } else {
  //       return {...item}
  //     }
  //   })
  //   setPokemonsData(newData)
  // }

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

  const onSubmit = (data) => {
    console.log("submited data", data);
    const nameToCheck = data.userName
    console.log('name => ', nameToCheck)
    console.log('users data', usersData)
    const userLog = usersData.find((user) => {
    return user.userName === nameToCheck}).userName
    const logged = userLog? true : false
    console.log(logged)
  };

  const onSubmit2 = (data) => {
    console.log("submited data", data);
    const nameToCheck = data.userName
    console.log('name => ', nameToCheck)
    console.log('users data', usersData)
    const isUser = usersData.find((user) => {
      return user.userName === nameToCheck}).userName
    console.log(isUser)
  };

  // const jsonData = getUsersData();
  // setUsersData(jsonData);
  // console.log(usersData)
  // const nameToCheck = data.userName
  // console.log('user name', nameToCheck)
  // const isUser = usersData.find((item) => item.userName === nameToCheck);
  // console.log("isUser", isUser);
  // if (isUser) {
  //   alert (`W bazie dnych jest juz uzytkownik o imieniu ${data.userName}`)
  // }
  // console.log("usersData", usersData);

  return (
    <>
      <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div>
              <label htmlFor="userName">Name </label>
            </div>
            <input
              {...register("userName")}
              id="userName"
              type="text"
              className="border-2 border-l-neutral-300"
            />
            {errors.userName && (
              <p className="text-red-500">{errors.userName.message}</p>
            )}
          </div>
          <div>
            <div>
              <label htmlFor="password">password </label>
            </div>
            <input
              {...register("password")}
              id="password"
              type="password"
              className="border-2 border-l-neutral-300"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <button className="mt-2 rounded bg-sky-500 px-3 py-1 text-white">
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}


