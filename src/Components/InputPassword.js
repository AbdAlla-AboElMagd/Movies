import { useState } from "react";

function InputPassword(props) {
  const [passInfo, setPassInfo] = useState({
    pass: null,
    confirm: null,
  });

  const [errors, setErrors] = useState({
    errPass: null,
    errConfirm: null,
  });

  const [PassControle, setPassControle] = useState({
    showPass: false,
    showConfirm: false,
  });

  const handleChange = (e) => {
    let errpassValue = "";
    let errconfpassValue = "";
    if (e.target.name == props.Name) {
      setPassInfo({
        ...passInfo,
        pass: e.target.value,
      });
      // console.log(e.target.value.length);
      if (props.checkReg.test(e.target.value)) {
        if (passInfo.confirm == null || !props.confirmation) {
          setErrors({
            ...errors,
            errPass: "",
          });
          errpassValue = "";
          errconfpassValue = errors.errConfirm;
        } else {
          if (e.target.value == passInfo.confirm) {
            setErrors({
              errPass: "",
              errConfirm: "",
            });
            errpassValue = "";
            errconfpassValue = "";
          } else {
            setErrors({
              errPass: "",
              errConfirm: `${props.Name} and its Confirmation do not match`,
            });
            errpassValue = "";
            errconfpassValue = `${props.Name} and its Confirmation do not match`;
          }
        }
      } else {
        if (passInfo.confirm == null || !props.confirmation) {
          setErrors({
            ...errors,
            errPass: `${props.errMsg}`,
          });
          errpassValue = `${props.errMsg}`;
          errconfpassValue = errors.errConfirm;
        } else {
          if (e.target.value == passInfo.confirm) {
            setErrors({
              errPass: `${props.errMsg}`,
              errConfirm: `Matched but ${props.errMsg}`,
            });
            errpassValue = `${props.errMsg}`;
            errconfpassValue = `Matched but ${props.errMsg}`;
          } else {
            setErrors({
              errPass: `${props.errMsg}`,
              errConfirm: `${props.Name} and its Confirmation do not match`,
            });
            errpassValue = `${props.errMsg}`;
            errconfpassValue = `${props.Name} and its Confirmation do not match`;
          }
        }
      }
    }
    if (e.target.name == "conf") {
      setPassInfo({
        ...passInfo,
        confirm: e.target.value,
      });

      if (e.target.value == passInfo.pass) {
        if (e.target.value.length >= 8) {
          setErrors({
            ...errors,
            errConfirm: "",
          });
          errpassValue = errors.errPass;
          errconfpassValue = "";
        } else {
          setErrors({
            ...errors,
            errConfirm: `Matched but ${props.errMsg}`,
          });
          errpassValue = errors.errPass;
          errconfpassValue = `Matched but ${props.errMsg}`;
        }
      } else {
        setErrors({
          ...errors,
          errConfirm: `${props.Name} and its Confirmation do not match`,
        });
        errpassValue = errors.errPass;
        errconfpassValue = `${props.Name} and its Confirmation do not match`;
      }
    }
    let passValue = "";
    let confpassValue = "";
    if (e.target.name == props.Name) {
      passValue = e.target.value;
      confpassValue = passInfo.confirm;
    } else if (e.target.name == "conf") {
      passValue = passInfo.pass;
      confpassValue = e.target.value;
    } else {
      passValue = passInfo.pass;
      confpassValue = passInfo.confirm;
    }
    props.CallbackOnChange(
      props.cbName,
      passValue,
      props.cbErrName,
      errpassValue,
      props.cbErrConfName,
      confpassValue,
      props.cbErrConfName,
      errconfpassValue
    );
  };

  const togglePassControl = (control) => {
    // console.log(control);
    if (control == "p") {
      if (PassControle.showPass) {
        setPassControle({
          ...PassControle,
          showPass: false,
        });
      } else {
        setPassControle({
          ...PassControle,
          showPass: true,
        });
      }
    }
    if (control == "c") {
      if (PassControle.showConfirm) {
        setPassControle({
          ...PassControle,
          showConfirm: false,
        });
      } else {
        setPassControle({
          ...PassControle,
          showConfirm: true,
        });
      }
    }
  };

  return (
    <>
      <label htmlFor={props.Name} className="form-label">
        {props.Name}
      </label>

      <span className="input-group">
        <input
          type={PassControle.showPass ? "text" : "password"}
          name={props.Name}
          className={`form-control ${
            errors.errPass == null
              ? "form-control"
              : errors.errPass
              ? "is-invalid"
              : "is-valid"
          }`}
          value={props.value}
          errors={props.err}
          onChange={(e) => handleChange(e)}
          placeholder={`Enter your ${props.Name}`}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={(e) => togglePassControl("p")}
        >
          <i
            className={PassControle.showPass ? "bi bi-eye-slash" : "bi bi-eye"}
          ></i>
        </button>
      </span>

      <p className="text-danger"> {errors.errPass} </p>

      {props.confirmation && (
        <>
          <label htmlFor="conf" className="form-label">
            {`Confirmation ${props.Name}`}
          </label>

          <span className="input-group">
            <input
              type={PassControle.showConfirm ? "text" : "password"}
              name="conf"
              className={`form-control ${
                errors.errConfirm == null
                  ? "form-control"
                  : errors.errConfirm
                  ? "is-invalid"
                  : "is-valid"
              }`}
              value={passInfo.confirm}
              errors={errors.errConfirm}
              onChange={(e) => handleChange(e)}
              placeholder={`Confirm your ${props.Name}`}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={(e) => togglePassControl("c")}
            >
              <i
                className={
                  PassControle.showConfirm ? "bi bi-eye-slash" : "bi bi-eye"
                }
              ></i>
            </button>
          </span>

          <p className="text-danger"> {errors.errConfirm} </p>
        </>
      )}
    </>
  );
}

export default InputPassword;
