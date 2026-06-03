import { useMemo, useState } from "react";

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

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (Object.keys(errors).length === 0) {
      setValues(initialValues);
      setTouched({});
      setSubmitted(false);
    }
  };

  return (
    <section className="relative isolate flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden rounded-md border border-border-color bg-[#FBFCFE] px-5 py-10 shadow-sm sm:px-8">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(135deg,rgba(24,95,165,0.11)_0%,rgba(255,255,255,0)_42%),linear-gradient(315deg,rgba(55,138,221,0.12)_0%,rgba(255,255,255,0)_36%)]" />

      <div className="w-full max-w-124">
        <div className="rounded-md border border-border-color bg-white px-5 py-8 shadow-xl shadow-primary-nav/10 sm:px-8 sm:py-10">
          <div className="mb-8 text-center">
            <a href="/" className="mb-7 inline-block font-serif text-3xl font-bold tracking-tight text-primary-nav">
              Vogue<span className="font-normal italic text-accent">Gen</span>
            </a>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
              Create Account
            </p>
            <h2 className="mt-3 font-serif text-4xl font-bold text-text-main sm:text-5xl">
              Sign up
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-text-muted">
              Join VogueGen and start saving your AI-powered fashion ideas in one place.
            </p>
          </div>

          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
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
                className="mt-2 w-full rounded-md border border-border-color bg-[#FBFCFE] px-4 py-3.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:border-accent/60 focus:border-accent focus:bg-white focus:ring-3 focus:ring-accent/15"
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
                className="mt-2 w-full rounded-md border border-border-color bg-[#FBFCFE] px-4 py-3.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:border-accent/60 focus:border-accent focus:bg-white focus:ring-3 focus:ring-accent/15"
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
                className="mt-2 w-full rounded-md border border-border-color bg-[#FBFCFE] px-4 py-3.5 text-sm text-text-main outline-none transition placeholder:text-text-muted/60 hover:border-accent/60 focus:border-accent focus:bg-white focus:ring-3 focus:ring-accent/15"
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
              className="flex w-full items-center justify-center gap-3 rounded-md bg-primary-nav px-6 py-4 text-sm font-semibold tracking-wider text-white shadow-lg shadow-primary-nav/20 transition hover:-translate-y-0.5 hover:bg-accent hover:shadow-xl hover:shadow-accent/25 focus:outline-none focus:ring-3 focus:ring-accent/25"
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

          <p className="mt-6 text-center text-sm text-text-muted">
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
