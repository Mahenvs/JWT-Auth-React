import { useState } from "react";
import "./App.css";
import { formProps, loginApi } from "./loginAPI";

function App() {
  const [togglePswd, setTogglePswd] = useState<boolean>(false);
  const [form, setForm] = useState<formProps>({
    username: "",
    pswd: "",
  });
  const handler = (value: string, flag: "user" | "pswd") => {
    if (flag == "pswd") {
      setForm((prev) => ({ ...prev, pswd: value }));
    } else {
      setForm((prev) => ({ ...prev, username: value }));
    }
  };

  const loginHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Make an API Request
    loginApi(form);
  };
  return (
    <>
      <form action="" onSubmit={loginHandler} className="form">
        <h2>Login Form Using JWT</h2>
        <div className="inputBox">
          <label htmlFor="username">UserName</label>
          <input
            type="text"
            id="username"
            value={form.username}
            onChange={(e) => handler(e.target.value, "user")}
          />
        </div>
        <div className="inputBox ">
          <label htmlFor="pswd">Password</label>
          <div className="pswd">
            {!togglePswd ? (
              <input
                type="password"
                id="pswd"
                value={form.pswd}
                onChange={(e) => handler(e.target.value, "pswd")}
              />
            ) : (
              <input
                type="text"
                id="pswdview"
                value={form.pswd}
                onChange={(e) => handler(e.target.value, "pswd")}
              />
            )}
            <button
              type="button"
              className={`${togglePswd ? "strike" : ""}`}
              onClick={() => setTogglePswd(!togglePswd)}
            >
              👁️
            </button>
          </div>
        </div>
        <div className="loginBtn">
          <button>Login</button>
        </div>
      </form>
    </>
  );
}

export default App;
