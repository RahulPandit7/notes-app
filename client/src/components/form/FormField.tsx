import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

interface FormFieldProps
    extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
    name: string;
    label?: string;
    textarea?: boolean;
    password?: boolean;
    rows?: number;
}

function FormField({
    name,
    label,
    textarea = false,
    password = false,
    rows = 4,
    className,
    ...props
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        formState: { errors },
    } = useFormContext();

    const error = errors[name]?.message as string;

    return (
        <div className="space-y-2">
            {label && (
                <Label htmlFor={name}>
                    {label}
                </Label>
            )}

            {/* TEXTAREA */}
            {textarea ? (
                <Textarea
                    id={name}
                    rows={rows}
                    className={cn(error && "border-red-500", className)}
                    {...register(name)}
                    {...(props as any)}
                />
            ) : (
                <div className="relative">
                    <Input
                        id={name}
                        type={
                            password
                                ? showPassword
                                    ? "text"
                                    : "password"
                                : props.type
                        }
                        className={cn(
                            error && "border-red-500",
                            className
                        )}
                        {...register(name)}
                        {...(props as any)}
                    />

                    {/* PASSWORD TOGGLE */}
                    {password && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute top-1/2 right-2 -translate-y-1/2 h-8 w-8"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <Eye className="h-4 w-4" />
                            ) : (
                                <EyeOff className="h-4 w-4" />
                            )}
                        </Button>
                    )}
                </div>
            )}

            {/* ERROR */}
            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}

export default FormField;
