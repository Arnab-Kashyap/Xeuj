import { SignUp } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const clerkAppearance = {
  variables: {
    colorPrimary: "#31583B",
    colorBackground: "#FAF9F4",
    colorText: "#31583B",
    borderRadius: "0.75rem",
  },
};

function Register() {
  return (
    <div className="min-h-screen bg-[#F5F3EC] flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md">
        <Link
          to="/access"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] hover:text-[#202923] transition mb-10"
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <div className="bg-[#FAF9F4] border border-[#E8EBDF] rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-serif font-light text-[#31583B] text-center mb-2">
            Citizen Registration
          </h1>
          <p className="text-center text-[#31583B]/70 mb-8">
            Create an account to start reporting issues in your area.
          </p>

          <SignUp
            routing="path"
            path="/register"
            signInUrl="/login"
            appearance={clerkAppearance}
          />
        </div>
      </div>
    </div>
  );
}

export default Register;