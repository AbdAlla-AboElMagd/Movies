import { useState } from "react";

function InputSearch(props) {
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
      <input
        type="search"
        name={props.Name}
        className="form-control me-2"
        value={props.value}
        onChange={(e) => handleChange(e)}
        placeholder={`${props.Name}`}
      />
    </>
  );
}

export default InputSearch;
