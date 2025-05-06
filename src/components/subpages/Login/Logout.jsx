import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";

export function Logout() {
  const { setIsLoggedIn, setLoggedUser } = useContext(LoginContext);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setLoggedUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");
    enqueueSnackbar("Logged out successfuly", { variant: "info" });
    navigate("/");
  };

  return (
    <div className="flex">
      <button
        onClick={handleLogout}
        className="p-2 text-red-500 transition-colors hover:text-red-700 dark:text-red-400 dark:hover:text-red-200"
        title="Logout"
      >
        <BiLogOutCircle size={24} color="black" />
      </button>
    </div>
  );
}
