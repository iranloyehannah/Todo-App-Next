"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { registerUser } from "../auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";

const Signup: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await registerUser(email, password);
      router.push("/");
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === "auth/email-already-in-use") {
          alert("Email already registered. Redirecting you to login...");
          router.push("/login");
        } else {
          alert(error.message);
        }
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred.");
      }
      console.error(error);
    }
  };

  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        maxWidth: "500px",
        margin: "0 auto",
        background: "white",
      }}
    >
      <h1 className="text-center font-bold text-3xl mb-4 text-gray-800">
        Sign Up
      </h1>
      <p className="w-full max-w-lg text-center text-sm text-gray-400">
        Enter your details below to create your account and get started
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 mt-4 w-full max-w-sm"
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="JohnDoe27@ymail.com"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="**********"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
        </div>

        <Button
          variant="contained"
          type="submit"
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",

            py: 1.5,
            fontSize: "14px",
            fontWeight: 600,
            "&:hover": {
              background: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white ",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Sign Up
        </Button>

        <p>Already have an Account?</p>
        <Button
          variant="contained"
          type="submit"
          onClick={() => router.push("/login")} 
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            color: "white",

            py: 1.5,
            fontSize: "14px",
            fontWeight: 600,
            "&:hover": {
              background: "bg-gradient-to-r from-blue-500 to-cyan-500 text-white",
              transform: "translateY(-1px)",
              boxShadow: "0 4px 12px rgba(33, 150, 243, 0.3)",
            },
            transition: "all 0.2s ease-in-out",
          }}
        >
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default Signup;
