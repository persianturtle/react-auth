import styled from "styled-components";

const Form = styled.form`
  width: 90.625vw;
  max-width: 800px;
  margin: 30px auto 100px;
  padding: 15px 15px 60px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.1);
  border: solid 1px rgba(0, 0, 0, 0.15);
  background-color: #fff;
  box-sizing: border-box;

  label {
    display: block;
    position: relative;
    font-size: 16px;
    line-height: 16px;
    width: 100%;
    cursor: pointer;
    margin-bottom: 22px;

    &.checkbox {
      margin-top: 3px;
      display: inline-block;
      width: auto;

      span {
        font-size: 18px;
        line-height: 18px;
        padding-left: 17px;
        user-select: none;
      }
    }

    input[type="email"] {
      font-style: oblique;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      font-size: 18px;
      line-height: 54px;
      display: block;
      width: 100%;
      height: 54px;
      margin-top: 8px;
      padding: 0 18px;
      border-radius: 2px;
      border: solid 1px rgba(0, 0, 0, 0.3);
      box-sizing: border-box;

      ${(props) => props.error && "border-color: #e04436;"}
    }

    input[type="checkbox"] {
      transform: scale(2) translateX(12.5%);
    }

    button {
      font-size: 18px;
      font-weight: 700;
      line-height: 18px;
      position: absolute;
      top: 39px;
      right: 10px;
      padding: 5px;
      background: 0 0;
      border: 0;
      cursor: pointer;
    }
  }

  [type="submit"] {
    font-size: 18px;
    line-height: 50px;
    background-color: #00ba69;
    margin: 11px 0;
    width: 100%;
    color: #fff;
    cursor: pointer;
  }

  hr {
    background-color: rgba(0, 0, 0, 0.15);
    margin: 19px 0 15px;
    width: 100%;
    height: 1px;
    border: 0;
  }

  div {
    text-align: center;

    a {
      font-size: 18px;
      line-height: 18px;
      padding: 10px;
    }
  }
`;

export default Form;
