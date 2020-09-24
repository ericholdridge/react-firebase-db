/** @jsx jsx */
import { css, jsx } from "@emotion/core";

const Heading = () => {
  return (
    <div css={styles}>
      <h1>React Form</h1>
    </div>
  );
};

const styles = css`
  width: 100%;
  padding: 60px 0;
  background: #000;
  color: #fff;
  text-align: center;
`;

export default Heading;
