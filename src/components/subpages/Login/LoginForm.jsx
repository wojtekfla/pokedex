import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from 'zod';

export function LoginForm() {
  return (
    <>
      <div className="mx-auto flex max-w-xs justify-center rounded-br-2xl rounded-tl-2xl bg-gray-300 py-4 text-center">
        <form>
          <div>
            <div>
              <label htmlFor="name">Name </label>
            </div>
            <input
              id="name"
              type="text"
              className="border-2 border-l-neutral-300"
            ></input>
          </div>
          <div>
            <div>
              <label htmlFor="name">email </label>
            </div>
            <input
              id="email"
              type="email"
              className="border-2 border-l-neutral-300"
            ></input>
          </div>
          <button
            className="mt-2 rounded bg-sky-500 px-3 py-1 text-white"
            disabled={false}
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
