import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';


const signInSchema = z.object({
  userName: z
    .string().min(3, {message: "Name must be 3 or more characters long"}),
  email: z
    .string()
    .min(3, { message: "email is required" })
    .includes("@", { message: "invalid email address" }),
  password: z
    .string()
    .regex(/^([A-Z0-9_+-]+\.?)*[A-Z0-9_+-]@([A-Z0-9][A-Z0-9-]*\.)+[A-Z]{2,}$/i, 
      {message: "please use: 1 capital letter, 1 number, 1 special character, min. 8 characters"}
    ),
  password2: z.string()
})

function RegistrationForm() {
  const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		control,
		setValue,
	} = useForm({
		resolver: zodResolver(signInSchema),
	});

  const onSubmit = (data) => {
    console.log(data);
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
              <label htmlFor="userName">User Name </label>
            </div>
            <input
              {...register("userName")}
              id="userName"
              name="userName"
              type="text"
              className="border-2 border-l-neutral-300"
            />
            {errors.userName && <p className="text-red-500">{errors.userName.message}</p>}
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
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
            {errors.password && <p className="text-red-500 leading-3 pt-1">{errors.password.message}</p>}
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
          </div>
          <div className="flex justify-center">
            <button
              className="mt-2 rounded bg-sky-500 px-3 py-1 text-white"
              disabled={false}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}



export default RegistrationForm;
