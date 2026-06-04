import { useMemo, useState } from "react";
import axios from 'axios'

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Signup() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    const nextErrors = {};

    if (!values.name.trim()) {
      nextErrors.name = "Enter your name.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!emailPattern.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!values.password) {
      nextErrors.password = "Create a password.";
    } else if (values.password.length < 8) {
      nextErrors.password = "Use at least 8 characters.";
    }

    return nextErrors;
  }, [values]);

  const shouldShowError = (field) => (touched[field] || submitted) && errors[field];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const handleBlur = (event) => {
    setTouched((currentTouched) => ({
      ...currentTouched,
      [event.target.name]: true,
    }));
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    setSubmitted(true);

    const res =await axios.post("http://localhost:8080/api/auth/register",values)
    console.log(res);

    if (Object.keys(errors).length === 0) {
      setValues(initialValues);
      setTouched({});
      setSubmitted(false);
    }
  };

  return (
    <section className="relative isolate flex min-h-[calc(100vh-1rem)] items-center justify-center overflow-hidden rounded-3xl bg-[#FBFCFE] px-3 py-4 sm:px-5 sm:py-6">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,95,165,0.11)_0%,rgba(255,255,255,0)_42%),linear-gradient(315deg,rgba(55,138,221,0.12)_0%,rgba(255,255,255,0)_36%)]" />

      <div className="w-full max-w-md">
        <div className="rounded-3xl bg-white px-5 py-5 shadow-lg shadow-primary-nav/10 sm:px-6 sm:py-6">
          <div className="mb-5 text-center">
            <a href="/" className="mb-4 inline-block font-serif text-2xl font-bold tracking-tight text-primary-nav">
              Vogue<span className="font-normal italic text-accent">Gen</span>
            </a>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Create Account
            </p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-text-main sm:text-4xl">
              Sign up
            </h2>
            <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-text-muted sm:text-sm">
              Join VogueGen and start saving your AI-powered fashion ideas in one place.
            </p>
          </div>

          <form className="space-y-3.5" noValidate onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="text-sm font-semibold text-text-main">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={values.name}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(shouldShowError("name"))}
                aria-describedby={shouldShowError("name") ? "name-error" : undefined}
                className="mt-1.5 w-full rounded-2xl border border-transparent bg-[#F4F7FB] px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20"
                placeholder="Enter your name"
              />
              {shouldShowError("name") && (
                <p id="name-error" className="mt-2 text-sm font-medium text-red-600">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="text-sm font-semibold text-text-main">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(shouldShowError("email"))}
                aria-describedby={shouldShowError("email") ? "email-error" : undefined}
                className="mt-1.5 w-full rounded-2xl border border-transparent bg-[#F4F7FB] px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20"
                placeholder="Enter your email"
              />
              {shouldShowError("email") && (
                <p id="email-error" className="mt-2 text-sm font-medium text-red-600">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-semibold text-text-main">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                aria-invalid={Boolean(shouldShowError("password"))}
                aria-describedby={shouldShowError("password") ? "password-error" : "password-help"}
                className="mt-1.5 w-full rounded-2xl border border-transparent bg-[#F4F7FB] px-4 py-2.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:bg-white focus:bg-white focus:ring-2 focus:ring-accent/20"
                placeholder="Enter a strong password"
              />
              {shouldShowError("password") ? (
                <p id="password-error" className="mt-2 text-sm font-medium text-red-600">
                  {errors.password}
                </p>
              ) : (
                <p id="password-help" className="mt-2 text-xs text-text-muted">
                  Use at least 8 characters for better account security.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-primary-nav px-6 py-3 text-sm font-semibold tracking-wider text-white shadow-md shadow-primary-nav/15 transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-lg hover:shadow-accent/20 focus:outline-none focus:ring-2 focus:ring-accent/25"
            >
              <span>Sign Up</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </form>

          <p className="mt-5 text-center text-sm text-text-muted">
            Already have an account?{" "}
            <a href="/login" className="font-semibold text-primary-nav hover:text-accent">
              Log in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
