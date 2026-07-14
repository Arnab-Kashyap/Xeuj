import { SignIn } from "@clerk/react";

function AdminLogin() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-2">
          Admin Login
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Authorized Personnel Only
        </p>

        <SignIn
          routing="path"
          path="/admin/login"
          signUpUrl={null}
        />
      </div>
    </div>
  );
}

export default AdminLogin;