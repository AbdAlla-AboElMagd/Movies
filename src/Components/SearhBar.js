import InputText from "./InputText";
import { useState } from "react";

function SearchBar(props) {
  const [itemInfo, setItemInfo] = useState({
    item: null,
  });

  const [errors, setErrors] = useState({
    errItem: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    props.callback(itemInfo.item);
  };

  const updateTextValue = (name, value, errName, err) => {
    setItemInfo({
      ...itemInfo,
      [name]: value,
    });
    setErrors({
      ...errors,
      [errName]: err,
    });
  };

  return (
    <div className="container mt-5 card p-3 shadow-lg">
      <form>
        <div className="mb-3">
          <InputText
            Name="Search"
            checkReg={/^[^\s]+.*$/}
            errMsg="Enter a valid Search name"
            cbName="item"
            cbErrName="errItem"
            CallbackOnChange={updateTextValue}
          ></InputText>
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => handleSubmit(e)}
          disabled={errors.errItem == null || errors.errItem}
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
