import { useState } from "react";

function LoginForm() {
  const [userInfo, setUserInfo] = useState({
    email: null,
    pass: null,
  });

  const [errors, setErrors] = useState({
    errEmail: null,
    errPass: null,
  });

  const [PassControle, setPassControle] = useState({
    showPass: false,
  });

  const EmailReg = /^[^\s@]+@[^\s@]+\.com$/;

  const handleChange = (e) => {
    console.log(e.target.value);
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

  return (
    <div className="container mt-5 card p-3 shadow-lg">
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your Email Address"
            className={`form-control ${
              errors.errEmail == null
                ? "form-control"
                : errors.errEmail
                ? "is-invalid"
                : "is-valid"
            }`}
            value={userInfo.email}
            onChange={(e) => handleChange(e)}
          />
          <p className="text-danger"> {errors.errEmail} </p>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>

          <span className="input-group">
            <input
              type={PassControle.showPass ? "text" : "password"}
              name="password"
              className={`form-control ${
                errors.errPass == null
                  ? "form-control"
                  : errors.errPass
                  ? "is-invalid"
                  : "is-valid"
              }`}
              value={userInfo.pass}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password"
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={(e) => togglePassControl()}
            >
              <i
                className={
                  PassControle.showPass ? "bi bi-eye-slash" : "bi bi-eye"
                }
              ></i>
            </button>
          </span>

          <p className="text-danger"> {errors.errPass} </p>
        </div>
        <p className="text-danger"> </p>
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

export default LoginForm;
