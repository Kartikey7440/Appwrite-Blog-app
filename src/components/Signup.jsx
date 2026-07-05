import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(login(userData));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full py-4">
      <div
        className="mx-auto w-full max-w-md rounded-2xl p-5 sm:p-10 border border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.6)] glow-red"
        style={{ backgroundColor: '#0e0e12' }}
      >
        <div className="mb-6 flex justify-center">
          <span className="inline-block">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-extrabold leading-tight text-white tracking-tight">
          Create an account
        </h2>
        <p className="mt-2.5 text-center text-sm text-zinc-400">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-semibold text-red-500 hover:text-red-400 transition-colors duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && (
          <div className="bg-red-950/30 border border-red-900/40 text-red-400 px-4 py-2.5 rounded-lg text-xs text-center mt-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(create)} className="mt-6">
          <div className="space-y-4">
            <Input
              label="Full Name: "
              placeholder="Enter your full name"
              {...register("fullname", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Password: "
              placeholder="Enter your password"
              type="password"
              {...register("password", {
                required: true,
              })}
            />
            <Button 
                type="submit"
                className="w-full mt-2 py-3"
            >Create Account</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
