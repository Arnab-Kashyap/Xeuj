import { SignIn } from "@clerk/clerk-react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-6">
          Citizen Login
        </h1>

        <SignIn
          routing="path"
          path="/login"
          signUpUrl="/register"
        />
      </div>
    </div>
  );
}

export default Login;