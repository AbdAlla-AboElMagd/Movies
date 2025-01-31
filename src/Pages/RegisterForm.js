import { useState } from "react";
import InputPassword from "../Components/InputPassword";
import InputText from "../Components/InputText";

function RegisterForm() {
  const [userInfo, setUserInfo] = useState({
    name: null,
    email: null,
    username: null,
    pass: null,
    confPass: null,
  });

  const [errors, setErrors] = useState({
    errName: null,
    errEmail: null,
    errUsername: null,
    errPass: null,
    errConfPass: null,
  });

  const [PassControle, setPassControle] = useState({
    showPass: false,
  });

  const EmailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    if (e.target.name == "email") {
      setUserInfo({
        ...userInfo,
        email: e.target.value,
      });
      if (EmailReg.test(e.target.value)) {
        setErrors({
          ...errors,
          errEmail: "",
        });
      } else {
        setErrors({
          ...errors,
          errEmail: "Invalid email",
        });
      }
    }
    if (e.target.name == "password") {
      setUserInfo({
        ...userInfo,
        pass: e.target.value,
      });
      if (e.target.value.length >= 8) {
        setErrors({
          ...errors,
          errPass: "",
        });
      } else {
        setErrors({
          ...errors,
          errPass: "Password must be at least 8 characters",
        });
      }
    }
  };

  const togglePassControl = () => {
    if (PassControle.showPass) {
      setPassControle({
        showPass: false,
      });
    } else {
      setPassControle({
        showPass: true,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const updateTextValue = (name, value, errName, err) => {
    console.log("Update");
    console.log(name);
    console.log(value);
    console.log(errName);
    console.log(err);
    console.log(userInfo[name]);
    console.log(errors[errName]);
    console.log("End!!!!!!!!!!!!!");
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
    // console.log("Update");
    // console.log(passValue);
    // console.log(confPassValue);
    // console.log("error");
    // console.log(err);
    // console.log(errConfPass);
    // console.log("End");
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
            Name="Name"
            checkReg={/^.+$/}
            errMsg="Enter a valid Name"
            cbName="name"
            cbErrName="errName"
            CallbackOnChange={updateTextValue}
          ></InputText>
        </div>

        <div className="mb-3">
          <InputText
            Name="Email"
            checkReg={/^[^\s@]+@[^\s@]+\.[^\s@]+$/}
            errMsg="Enter a valid email"
            cbName="email"
            cbErrName="errEmail"
            CallbackOnChange={updateTextValue}
          ></InputText>
        </div>

        <div className="mb-3">
          <InputText
            Name="User Name"
            checkReg={/^\S+$/}
            errMsg="Enter a valid User Name"
            cbName="username"
            cbErrName="errUsername"
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
          confirmation={true}
          checkReg={/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/}
          errMsg="* password length not less than 8 characters ,* contains at least one lowercase , 
                    * one uppercase ,
                    * at least one digit and special character"
        ></InputPassword>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
          disabled={
            errors.errName == null ||
            errors.errEmail == null ||
            errors.errUsername == null ||
            errors.errPass == null ||
            errors.errConfPass == null ||
            errors.errName ||
            errors.errEmail ||
            errors.errUsername ||
            errors.errPass ||
            errors.errConfPass
          }
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
