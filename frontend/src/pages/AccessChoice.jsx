import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { ArrowLeft, ChevronRight, Leaf, Lock, ShieldCheck, UserRound } from "lucide-react";

const clerkAppearance = {
  variables: {
    colorPrimary: "#31583B",
    colorBackground: "#FAF9F4",
    colorText: "#31583B",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full",
    cardBox: "!shadow-none !border-0 !bg-transparent !rounded-none w-full",
    card: "!shadow-none !border-0 !bg-transparent !p-0 w-full",
    header: "!hidden",
    footer: "!hidden",
    formButtonPrimary: "bg-[#31583B] hover:bg-[#263D30]",
    socialButtonsBlockButton: "border-[#E8EBDF] hover:border-[#31583B]",
  },
};

const accessOptions = [
  {
    key: "citizen",
    title: "Citizen",
    description: "Report issues and track complaints",
    icon: UserRound,
  },
  {
    key: "admin",
    title: "Admin",
    description: "Manage complaints and departments",
    icon: ShieldCheck,
  },
];

const authTabs = [
  { key: "signin", label: "Sign In" },
  { key: "signup", label: "Sign Up" },
];

function AccessChoice({ initialView = "choose", initialTab = "signin" }) {
  const navigate = useNavigate();
  const [view, setView] = useState(initialView);
  const [tab, setTab] = useState(initialTab);

  const isCitizen = view === "citizen";

  const handleOption = (key) => {
    if (key === "admin") {
      navigate("/admin/login");
      return;
    }
    setView("citizen");
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#F5F3EC]">
      <img
        src="/images/xeuj-hero-bg.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-bottom opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#F5F3EC] via-[#F5F3EC]/40 to-transparent" />

      <div className="relative z-10 flex flex-1 flex-col px-6 py-8 md:px-12">
        <header className="flex items-center justify-between">
          <img
            src="/images/xeuj-logo-navbar-transparent.png"
            alt="Xeuj"
            className="h-9 w-auto"
          />

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#31583B] hover:text-[#202923] transition"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </header>

        <div className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-2">
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#31583B]">
                Civic Portal
              </p>
              <span className="h-px w-16 bg-[#31583B]/40" />
            </div>

            <h1 className="text-5xl md:text-6xl font-serif font-light leading-tight text-[#31583B]">
              Together for
              <br />
              a Cleaner, Greener City
            </h1>

            <p className="mt-6 text-lg text-[#31583B]/80">
              Report issues, track progress,
              <br />
              and help build a better community.
            </p>
          </div>

          <div className="w-full max-w-md justify-self-center rounded-3xl border border-[#E8EBDF] bg-[#FAF9F4]/95 shadow-sm backdrop-blur">
            <div className="p-8 md:p-10">
              <div className="text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#E8EBDF]">
                  <Leaf size={28} className="text-[#31583B]" />
                </div>

                <h2 className="text-4xl font-serif font-light text-[#31583B]">
                  Welcome Back
                </h2>
                <p className="mt-2 text-[#31583B]/70">
                  {isCitizen
                    ? "Sign in to continue to the Civic Portal"
                    : "Choose your access type to continue"}
                </p>
              </div>

              {isCitizen ? (
                <div className="mt-8">
                  <div className="flex">
                    {authTabs.map((item) => (
                      <button
                        key={item.key}
                        onClick={() => setTab(item.key)}
                        className={`flex-1 border-b-2 pb-3 text-sm font-medium transition ${
                          tab === item.key
                            ? "border-[#31583B] text-[#31583B]"
                            : "border-[#E8EBDF] text-[#31583B]/60 hover:text-[#31583B]"
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-6">
                    {tab === "signin" ? (
                      <SignIn
                        key="signin"
                        routing="virtual"
                        appearance={clerkAppearance}
                      />
                    ) : (
                      <SignUp
                        key="signup"
                        routing="virtual"
                        appearance={clerkAppearance}
                      />
                    )}
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setView("choose")}
                      className="text-sm font-medium text-[#31583B] hover:text-[#202923] transition"
                    >
                      Back to access options
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-8 space-y-4">
                    {accessOptions.map((option) => {
                      const Icon = option.icon;

                      return (
                        <button
                          key={option.key}
                          onClick={() => handleOption(option.key)}
                          className="group flex w-full items-center gap-5 rounded-2xl border border-[#E8EBDF] bg-[#FAF9F4] p-5 text-left transition hover:border-[#31583B] hover:shadow-md"
                        >
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#E8EBDF]">
                            <Icon size={24} className="text-[#31583B]" />
                          </div>

                          <div className="flex-1">
                            <p className="text-xl font-serif font-light text-[#31583B]">
                              {option.title}
                            </p>
                            <p className="mt-1 text-sm text-[#31583B]/70">
                              {option.description}
                            </p>
                          </div>

                          <ChevronRight
                            size={20}
                            className="shrink-0 text-[#31583B] transition group-hover:translate-x-1"
                          />
                        </button>
                      );
                    })}
                  </div>

                  <div className="my-8 flex items-center gap-4">
                    <span className="h-px flex-1 bg-[#E8EBDF]" />
                    <span className="text-sm text-[#31583B]/60">or</span>
                    <span className="h-px flex-1 bg-[#E8EBDF]" />
                  </div>

                  <p className="flex items-center justify-center gap-2 text-sm text-[#31583B]/70">
                    <Lock size={14} />
                    Secure login with Clerk
                  </p>
                </>
              )}
            </div>

            {isCitizen && (
              <div className="flex items-center justify-center gap-2 border-t border-[#E8EBDF] px-8 py-4 text-xs text-[#31583B]/70">
                <Lock size={13} />
                Your data is secure with Clerk
              </div>
            )}
          </div>
        </div>

        <footer className="flex items-center gap-4 border-t border-[#E8EBDF] pt-6 text-sm text-[#31583B]/80">
          <Leaf size={16} className="text-[#31583B]" />
          <span>Civic Portal</span>
          <span className="hidden h-px flex-1 bg-[#E8EBDF] md:block" />
          <span className="hidden italic md:block">
            Together for a better community.
          </span>
        </footer>
      </div>
    </div>
  );
}

export default AccessChoice;