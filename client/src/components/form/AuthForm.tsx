import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import FormField from "./FormField";
import { Button } from "../ui/button";

import {
    useLoginMutation,
    useRegisterMutation,
} from "@/store/api/authApi";

import { setCredentials } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/validators/authSchema";

type AuthMode = "login" | "signup";

interface AuthFormValues {
    name?: string;
    email: string;
    password: string;
}

export const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [authMode, setAuthMode] =
        useState<AuthMode>("login");

    const [serverError, setServerError] =
        useState("");

    const [login] = useLoginMutation();

    const [register] =
        useRegisterMutation();

    const methods = useForm<AuthFormValues>({
        resolver: zodResolver(
            authMode === "login"
                ? loginSchema
                : registerSchema
        ),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = methods;

    const onSubmit = async (
        data: AuthFormValues
    ) => {
        try {
            setServerError("");

            let response;

            if (authMode === "login") {
                response = await login({
                    email: data.email,
                    password: data.password,
                }).unwrap();
            } else {
                response = await register({
                    name: data.name || "",
                    email: data.email,
                    password: data.password,
                }).unwrap();
            }

            dispatch(
                setCredentials({
                    token: response.data.token,
                    user: {
                        id: response.data.id,
                        name: response.data.name,
                        email: response.data.email,
                    },
                })
            );

            reset();
            navigate("/app", { replace: true });

        } catch (error: any) {
            setServerError(
                error?.data?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div className="w-full max-w-md rounded-2xl border bg-card p-6 shadow-sm">
            <div className="space-y-2 mb-6">
                <h2 className="text-2xl font-bold">
                    {authMode === "login"
                        ? "Login"
                        : "Create Account"}
                </h2>

                <p className="text-sm text-muted-foreground">
                    {authMode === "login"
                        ? "Sign in to continue"
                        : "Create your account"}
                </p>
            </div>

            <div className="flex mb-6 rounded-lg border overflow-hidden">
                <button
                    type="button"
                    onClick={() =>
                        setAuthMode("login")
                    }
                    className={`flex-1 py-2 ${authMode === "login"
                        ? "bg-primary text-primary-foreground"
                        : ""
                        }`}
                >
                    Login
                </button>

                <button
                    type="button"
                    onClick={() =>
                        setAuthMode("signup")
                    }
                    className={`flex-1 py-2 ${authMode === "signup"
                        ? "bg-primary text-primary-foreground"
                        : ""
                        }`}
                >
                    Sign Up
                </button>
            </div>

            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    {authMode === "signup" && (
                        <FormField
                            name="name"
                            label="Name"
                            placeholder="John Doe"
                        />
                    )}

                    <FormField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="examle@gmail.com"
                    />

                    <FormField
                        name="password"
                        label="Password"
                        password
                        placeholder="Enter password"
                    />

                    {serverError && (
                        <p className="text-sm text-red-500">
                            {serverError}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={isSubmitting}
                    >
                        {isSubmitting
                            ? "Please wait..."
                            : authMode === "login"
                                ? "Login"
                                : "Create Account"}
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};