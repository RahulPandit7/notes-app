import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import FormField from "./FormField";
import {
    useLoginMutation,
    useRegisterMutation,
} from "@/store/api/authApi";
import { setCredentials } from "@/store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/validators/authSchema";
import toast from "react-hot-toast";

type AuthMode = "login" | "signup";

interface AuthFormValues {
    name?: string;
    email: string;
    password: string;
}

export const AuthForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [authMode, setAuthMode] = useState<AuthMode>("login");
    const [serverError, setServerError] = useState("");

    const [login] = useLoginMutation();
    const [register] = useRegisterMutation();

    const methods = useForm<AuthFormValues>({
        resolver: zodResolver(
            authMode === "login" ? loginSchema : registerSchema
        ),
        defaultValues: { name: "", email: "", password: "" },
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = methods;

    const onSubmit = async (data: AuthFormValues) => {
        try {
            setServerError("");

            const authPromise =
                authMode === "login"
                    ? login({ email: data.email, password: data.password }).unwrap()
                    : register({
                        name: data.name || "",
                        email: data.email,
                        password: data.password,
                    }).unwrap();

            const response = await toast.promise(authPromise, {
                loading: authMode === "login" ? "Logging in…" : "Creating account…",
                success: authMode === "login" ? "Login successfully!" : "Register successfully!",
                error: (err) => err?.data?.message || "Something went wrong",
            });

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
            setServerError(error?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="w-full">
            {/* ── Mode toggle ── */}
            <div className="flex mb-6 rounded-xl bg-[#0D0F14] border border-white/5 p-1 gap-1">
                {(["login", "signup"] as AuthMode[]).map((mode) => (
                    <button
                        key={mode}
                        type="button"
                        onClick={() => {
                            setAuthMode(mode);
                            setServerError("");
                            reset();
                        }}
                        className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${authMode === mode
                            ? "bg-[#E8A838] text-[#0D0F14] shadow-sm"
                            : "text-[#6B7280] hover:text-[#F2F0EB]"
                            }`}
                    >
                        {mode === "login" ? "Log in" : "Sign up"}
                    </button>
                ))}
            </div>

            {/* ── Form ── */}
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
                        placeholder="you@example.com"
                    />

                    <FormField
                        name="password"
                        label="Password"
                        password
                        placeholder="Enter your password"
                    />

                    {/* Server error */}
                    {serverError && (
                        <div className="flex items-start gap-2 px-3 py-2.5 rounded-lg bg-red-500/8 border border-red-500/15">
                            <span className="text-red-400 text-xs mt-0.5">⚠</span>
                            <p className="text-xs text-red-400">{serverError}</p>
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full mt-2 py-2.5 rounded-xl bg-[#E8A838] text-[#0D0F14] text-sm font-semibold hover:bg-[#F0B845] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting
                            ? "Please wait…"
                            : authMode === "login"
                                ? "Log in"
                                : "Create account"}
                    </button>
                </form>
            </FormProvider>
        </div>
    );
};