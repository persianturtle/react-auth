import React, { useState, useEffect, useRef } from "react";
import Form from "./form";
import Error from "./error";

const Login = () => {
  const emailRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const email = window.location.search.split("email=")[1];
    if (email) {
      emailRef.current.value = email;
      history.replaceState({}, "", "/login");
    }
  }, []);

  const toggleShowPassword = () => {
    setShowPassword((showPassword) => !showPassword);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: event.target.elements.email.value,
        password: event.target.elements.password.value,
        stayLoggedIn: event.target.elements.stayLoggedIn.checked,
      }),
    })
      .then((response) => response.json())
      .then((isAuthenticated) => {
        if (isAuthenticated) {
          window.location.reload();
        } else {
          setHasError(true);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      {hasError && (
        <Error>
          Incorrect username/password combination. Is Caps Lock turned on?
        </Error>
      )}
      <Form error={hasError} onSubmit={onSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            ref={emailRef}
            autoComplete="new-password"
            placeholder="name@email.com"
            required
          />
        </label>
        <label>
          Password
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            autoComplete="new-password"
            required
          />
          <button type="button" onClick={toggleShowPassword}>
            {showPassword ? "Hide" : "Show"}
          </button>
        </label>
        <label className="checkbox">
          <input type="checkbox" name="stayLoggedIn" />
          <span>Stay logged in</span>
        </label>
        <input type="submit" value="Sign In" />
        <hr />
        <div>
          <a href="#">Forgot your password?</a>
        </div>
      </Form>
    </>
  );
};

export default Login;
