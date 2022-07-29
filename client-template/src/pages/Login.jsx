import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/DataProvider";
import { loginApi } from "../helpers/apiCalls";

export const Login = () => {
  const { setUser, errors, setErrors } = useDataContext();

  const refEmail = useRef();
  const refPassword = useRef();

  const navigate = useNavigate();

  const onLoginSubmit = async (e) => {
    e.preventDefault();
    console.log("Login at API...");

    const email = refEmail.current.value;
    const password = refPassword.current.value;

    if (!email || !password) {
      setErrors("Email and Password are wrong!");
      return;
    }
    // Login against API
    const result = await loginApi(email, password);
    console.log(result);

    if (result.error) {
      return setErrors(result.error);
    }
    setErrors("");
    setUser(result);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={onLoginSubmit}>
        <div>
          <input
            type="text"
            ref={refEmail}
            defaultValue={"elis@gmail.com"}
            placeholder="Email"
          />
        </div>
        <div>
          <input
            type="password"
            ref={refPassword}
            defaultValue="elis"
            placeholder="Password"
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <div className="errors">{errors}</div>
    </div>
  );
};