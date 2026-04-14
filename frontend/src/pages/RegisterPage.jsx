import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const initialValues = {
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  password: "",
};

export default function RegisterPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await register(values);
      await login({ username: values.username, password: values.password });
      navigate("/dashboard", { replace: true });
    } catch (error) {
      const payload = error.response?.data || {};
      setErrors({
        username: payload.username?.[0],
        email: payload.email?.[0],
        password: payload.password?.[0],
        non_field_errors: payload.detail || payload.non_field_errors?.[0],
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <AuthForm
        title="Create an account"
        subtitle="Register a secure user profile with Django's built-in password validation and JWT login."
        submitLabel="Register"
        fields={[
          { name: "username", label: "Username", type: "text", required: true, placeholder: "goldadmin" },
          { name: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
          { name: "first_name", label: "First name", type: "text", required: false, placeholder: "Ada" },
          { name: "last_name", label: "Last name", type: "text", required: false, placeholder: "Lovelace" },
          { name: "password", label: "Password", type: "password", required: true, placeholder: "At least 8 characters" },
        ]}
        values={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <p className="text-center text-sm text-white/55">
        Already registered?{" "}
        <Link to="/login" className="text-gold transition hover:text-white">
          Sign in
        </Link>
        .
      </p>
    </div>
  );
}
