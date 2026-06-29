import Input from "../components/Input";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <form className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
          />

          <Input
            type="password"
            placeholder="Password"
          />

          <button className="w-full bg-green-700 text-white py-3 rounded-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;