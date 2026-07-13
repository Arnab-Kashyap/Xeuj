import { SignUp } from "@clerk/react";

function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-6">
          Citizen Registration
        </h1>

        <SignUp
          routing="path"
          path="/register"
          signInUrl="/login"
        />
      </div>
    </div>
  );
}

export default Register;