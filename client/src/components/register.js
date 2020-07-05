import React, { useState, useRef } from "react";
import Form from "./form";
import Error from "./error";

const Register = () => {
  const [hasPasswordMismatch, setHasPasswordMismatch] = useState(false);
  const [hasExistingAccount, setHasExistingAccount] = useState(false);
  const [hasUnhandledError, setHasUnhandledError] = useState(false);
  const emailRef = useRef("");

  const onSubmit = (event) => {
    event.preventDefault();

    const { email, password, confirm } = event.target.elements;

    if (password.value !== confirm.value) {
      setHasPasswordMismatch(true);
      return;
    }

    setHasPasswordMismatch(false);

    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    })
      .then((response) => response.status)
      .then((status) => {
        if (status === 201) {
          window.location.href = `/login?email=${email.value}`;
          return;
        }

        if (status === 409) {
          emailRef.current = email.value;
          setHasExistingAccount(true);
          return;
        }

        setHasUnhandledError(true);
      })
      .catch((err) => {
        console.log(err);
        setHasUnhandledError(true);
      });
  };

  return (
    <>
      {hasPasswordMismatch && <Error>Passwords do not match.</Error>}
      {hasExistingAccount && (
        <>
          <Error>
            Email address already registered.
            <br />
            <span>
              Please <a href={`/login?email=${emailRef.current}`}>login</a>.
            </span>
          </Error>
        </>
      )}
      {hasUnhandledError && <Error>Something went wrong.</Error>}
      <Form
        error={hasPasswordMismatch || hasExistingAccount}
        onSubmit={onSubmit}
      >
        <label>
          Email
          <input
            type="email"
            name="email"
            autoComplete="new-password"
            placeholder="name@email.com"
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            name="password"
            autoComplete="new-password"
            required
          />
        </label>
        <label>
          Confirm Password
          <input
            type="password"
            name="confirm"
            autoComplete="new-password"
            required
          />
        </label>
        <input type="submit" value="Register" />
      </Form>
    </>
  );
};

export default Register;
