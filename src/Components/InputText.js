import { useState } from "react";

function InputText(props) {
  const [textInfo, setTextInfo] = useState({
    text: null,
  });

  const [errors, setErrors] = useState({
    errText: null,
  });

  const handleChange = (e) => {
    let errMsg = errors.errText;
    if (e.target.name == props.Name) {
      setTextInfo({
        ...textInfo,
        text: e.target.value,
      });
      if (!props.checkReg) {
        setErrors({
          ...errors,
          errText: "",
        });
        errMsg = "";
      } else {
        if (props.checkReg.test(e.target.value)) {
          setErrors({
            ...errors,
            errText: "",
          });
          errMsg = "";
        } else {
          setErrors({
            ...errors,
            errText: `${props.errMsg}`,
          });
          errMsg = `${props.errMsg}`;
        }
      }
    }

    props.CallbackOnChange(
      props.cbName,
      e.target.value,
      props.cbErrName,
      errMsg
    );
  };

  return (
    <>
      <label htmlFor={props.Name} className="form-label">
        {props.Name}
      </label>

      <input
        type="text"
        name={props.Name}
        id={props.Name}
        className={`form-control ${
          errors.errText == null
            ? "form-control"
            : errors.errText
            ? "is-invalid"
            : "is-valid"
        }`}
        value={props.value}
        onChange={(e) => handleChange(e)}
        placeholder={`Enter your ${props.Name}`}
      />

      <p className="text-danger"> {errors.errText} </p>
    </>
  );
}

export default InputText;
