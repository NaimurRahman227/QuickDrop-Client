import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import axios from "axios";


const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users/login",
        data
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;

      if (user.role === "rider") {
        navigate("/dashboard/rider");
      }
      else if (user.role === "admin") {
        navigate("/dashboard/admin");
      }
      else {
        navigate("/");
      }

    } catch (error) {
      alert(error.response?.data?.message || "Login Failed!");
    }
  };



  //  GOOGLE HANDLER
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithGoogle();
      const googleUser = result.user;

      const response = await axios.post(
        "http://localhost:3000/api/users/google-login",
        {
          name: googleUser.displayName,
          email: googleUser.email,
        }
      );

      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      const user = response.data.user;

      if (user.role === "rider") {
        navigate("/dashboard/rider");
      }
      else if (user.role === "admin") {
        navigate("/dashboard/admin");
      }
      else {
        navigate("/dashboard/user");
      }

    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="w-full max-w-md mx-auto lg:ml-20">

        {/* TOP TEXT */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Login now!</h1>
          <p className="py-3 text-gray-500">
            Welcome back! Enter your credentials to continue.
          </p>
        </div>

        {/* FORM CARD */}
        <div className="card bg-base-100 shadow-2xl">
          <div className="card-body">

            <form onSubmit={handleSubmit(onSubmit)}>
              <fieldset className="space-y-3">

                {/* EMAIL */}
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full focus:outline-none focus:ring-0"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}

                {/* PASSWORD */}
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full focus:outline-none focus:ring-0"
                  {...register("password", {
                    required: "Password required",
                    minLength: 6,
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">
                    Password must be at least 6 characters
                  </p>
                )}

                <div className="text-right">
                  <a className="link link-hover text-sm">
                    Forgot password?
                  </a>
                </div>

                {/* LOGIN BUTTON */}
                <button
                  type="submit"
                  className="btn btn-primary w-full mt-3"
                >
                  Login
                </button>

                {/* REGISTER LINK */}
                <p className="text-center text-sm mt-2">
                  Don’t have an account?{" "}
                  <Link to='/Register' className="text-primary font-medium hover:underline cursor-pointer">
                    Register
                  </Link>
                </p>

                {/* DIVIDER */}
                <div className="divider my-2">OR</div>

                {/* GOOGLE BUTTON */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn bg-white text-black border-[#e5e5e5] hover:bg-base-300 w-full gap-2"
                >
                  <svg width="18" height="18" viewBox="0 0 512 512">
                    <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341" />
                    <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57" />
                    <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73" />
                    <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55" />
                  </svg>
                  Login with Google
                </button>

              </fieldset>
            </form>

          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
