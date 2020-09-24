/** @jsx jsx */
import { css, jsx } from "@emotion/core";
import Form from "./Form";
import FormOutput from "./FormOutput";

const FormWrapper = () => {
  return (
    <div css={styles}>
      <Form />
      <FormOutput />
    </div>
  );
};

const styles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default FormWrapper;
