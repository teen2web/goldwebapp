import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const initialValues = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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
      await login(values);
      const target = location.state?.from?.pathname || "/dashboard";
      navigate(target, { replace: true });
    } catch (error) {
      setErrors({
        non_field_errors: error.response?.data?.detail || "Unable to sign in with those credentials.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <AuthForm
        title="Welcome back"
        subtitle="Use your account credentials to access the protected dashboard and manage posts."
        submitLabel="Login"
        fields={[
          { name: "username", label: "Username", type: "text", required: true, placeholder: "goldadmin" },
          { name: "password", label: "Password", type: "password", required: true, placeholder: "••••••••" },
        ]}
        values={values}
        errors={errors}
        loading={loading}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <p className="text-center text-sm text-white/55">
        Need an account?{" "}
        <Link to="/register" className="text-gold transition hover:text-white">
          Register here
        </Link>
        .
      </p>
    </div>
  );
}
