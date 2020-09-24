/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import { useContext } from "react";
import { FormContext } from "./FormContext/FormContext";

const FormOutput = () => {
  const { dbContacts, handleDeleteContact } = useContext(FormContext);
  return (
    <div css={styles} className="formOutput">
      <div className="formHeadings">
        <h3>Full Name:</h3>
        <h3>Email:</h3>
        <h3>Address:</h3>
        <h3>Actions</h3>
      </div>
      <div className="formData">
        {Object.keys(dbContacts).map((item) => {
          return (
            <div key={dbContacts[item].id}>
              <span>{dbContacts[item].fullName}</span>
              <span>{dbContacts[item].email}</span>
              <span>{dbContacts[item].address}</span>
              <div className="editOrDelete">
                <span>E</span>
                <span onClick={() => handleDeleteContact(item)}>
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
      span {
        width: 100%;
        text-align: left;
        display: block;
      }
      .editOrDelete {
        span {
          padding: 0 10px;
          cursor: pointer;
        }
      }
    }
  }
`;

export default FormOutput;
