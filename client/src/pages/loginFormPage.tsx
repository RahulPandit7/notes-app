import { AuthForm } from "@/components/form/AuthForm";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "@/store/store";

export default function LoginFormPage() {
    const token = useSelector(
        (state: RootState) => state.auth.token
    );


    if (token) {
        return <Navigate to="/app" replace />;
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col">
            {/* NAV */}
            <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border">
                <h1 className="text-xl font-bold"><a href="/" className="hover:cursor-pointer">R & R Notes</a></h1>
                <div className="flex gap-2">
                    <Button>
                        <a href="/">Back to Home</a>
                    </Button>
                </div>

            </header>

            {/* LOGIN FORM */}
            <main className="flex-1 flex items-center justify-center px-6">
                <div className="w-full max-w-md">
                    <div className="space-y-3 text-center mb-6">
                        <h1 className="text-3xl font-bold">
                            Welcome Back
                        </h1>
                        <p className="text-muted-foreground">
                            Sign in to your account to continue
                        </p>
                    </div>

                    <AuthForm />
                </div>
            </main>
        </div>
    );

}