"use client";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLoginMutation } from "./_generated/loginMutation.generated";
import { toast } from "sonner";

export function LoginForm() {
  const [login, { loading }] = useLoginMutation({
    onCompleted(data) {
      const { accessToken } = data.login;
      localStorage.setItem("accessToken", accessToken);
      toast.success("Login successful");
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get('email') as string || "";
    const password = formData.get('password') as string || "";
    await login({ variables: { loginInput: { email, password } } });

  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Enter your email below to login to your account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="text" name="email" placeholder="example@gmail.com" />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input placeholder="********" id="password" type="password" name="password" />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          Login
        </Button>
      </div>
    </form>
  )
}
