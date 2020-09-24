/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { FormContext } from "./FormContext/FormContext";

const Form = () => {
  const { formValues, updateFormValues, handleFormSubmit } = useContext(FormContext);

  return (
    <form css={styles} onSubmit={handleFormSubmit}>
      <div className="formWrapper">
        <div className="fullWidth">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full name"
            name="fullName"
            value={formValues.fullName}
            onChange={updateFormValues}
          />
        </div>
        <div className="wrapper">
          <div className="wrapperColumn">
            <label>Address</label>
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formValues.address}
              onChange={updateFormValues}
            />
          </div>
          <div className="wrapperColumn">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formValues.email}
              onChange={updateFormValues}
            />
          </div>
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

const styles = css`
  width: 100%;
  max-width: 480px;
  margin: 10px 0 0 0;
  .formWrapper {
    width: 100%;
    .fullWidth {
      width: 100%;
      display: flex;
      flex-direction: column;
    }
    .wrapper {
      display: flex;
      justify-content: space-between;
      .wrapperColumn {
        width: 49%;
        display: flex;
        flex-direction: column;
      }
    }
    input {
      height: 40px;
      padding: 0 0 0 2px;
    }
    label {
      padding: 6px 0 0 0;
    }
  }
  button {
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    margin: 12px 0 0 0;
    cursor: pointer;
  }
`;

export default Form;
