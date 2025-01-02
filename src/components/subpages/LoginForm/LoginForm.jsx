import { Button } from "../../shared/Button";

export function LoginForm() {
  return(
    <>
    <div>
      <label htmlFor="name">Name </label>
      <input id="name" type="text" className="border-2 border-l-neutral-300"></input>
    </div>
    <div>
      <label htmlFor="name">email </label>
      <input id="email" type="email" className="border-2 border-l-neutral-300"></input>
    </div>
    </>
  ) 
}
