/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { FormContext } from "./FormContext/FormContext";

const FormOutput = () => {
  const { formValues, handleRemoveUser, handleEditUser } = useContext(FormContext);
  return (
    <div css={styles} className="formOutput">
      <div className="formHeadings">
        <h3>Full Name:</h3>
        <h3>Email:</h3>
        <h3>Address:</h3>
        <h3>Actions</h3>
      </div>
      <div className="formData">
        {formValues.map((item) => {
          return (
            <div key={item.id}>
              <span>{item.name}</span>
              <span>{item.email}</span>
              <span>{item.address}</span>
              <div className="editOrDelete">
                <span className="edit" onClick={() => handleEditUser(item)}>E</span>
                <span className="delete" onClick={() => handleRemoveUser(item)}>
                  D
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = css`
  width: 100%;
  max-width: 800px;
  margin: 12px 0 0 0;
  .formHeadings {
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: space-between;
  }
  .formData {
    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 4px 0 0 0;
      span {
        width: 100%;
        text-align: left;
        display: block;
      }
      .editOrDelete {
        display: flex;
        align-items: center;
        .edit,
        .delete {
          padding: 4px 20px;
          color: #fff;
          border-radius: 4px;
          cursor: pointer;
        }
        .edit {
          background: green;
          margin: 0 4px 0 0;
        }
        .delete {
          background: red;
        }
      }
    }
  }
`;

export default FormOutput;
