import { useState } from "react";
import InputPassword from "../Components/InputPassword";
import InputText from "../Components/InputText";

function LoginFormComp() {
  const [userInfo, setUserInfo] = useState({
    email: null,
    pass: null,
  });

  const [errors, setErrors] = useState({
    errEmail: null,
    errPass: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateTextValue = (name, value, errName, err) => {
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
    setErrors({
      ...errors,
      [errName]: err,
    });
  };

  const updatePassValues = (
    name,
    passValue,
    errName,
    err,
    confpass,
    confPassValue,
    errConfPassName,
    errConfPass
  ) => {
    setUserInfo({
      ...userInfo,
      [name]: passValue,
      [confpass]: confPassValue,
    });
    setErrors({
      ...errors,
      [errName]: err,
      [errConfPassName]: errConfPass,
    });
  };

  return (
    <div className="container mt-5 card p-3 shadow-lg">
      <form>
        <div className="mb-3">
          <InputText
            Name="Email"
            checkReg={/^[^\s@]+@[^\s@]+\.com$/}
            errMsg="Enter a valid email"
            cbName="email"
            cbErrName="errEmail"
            CallbackOnChange={updateTextValue}
          ></InputText>
        </div>

        <InputPassword
          Name="Password"
          value={userInfo.pass}
          err={errors.errTestPass}
          CallbackOnChange={updatePassValues}
          cbName="pass"
          cbErrName="errPass"
          cbConfName="confPass"
          cbErrConfName="errConfPass"
          confirmation={false}
          checkReg={/^.{8,}$/}
          errMsg="Password length Must be not less than 8 characters"
        ></InputPassword>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
          disabled={
            errors.errEmail == null ||
            errors.errPass == null ||
            errors.errEmail ||
            errors.errPass
          }
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginFormComp;
