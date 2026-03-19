import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-slate/5 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-hero text-primary-dark mb-2">
            Join DeeTours
          </h1>
          <p className="text-slate text-sm">
            Create your account to explore amazing journeys
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <SignUp
            appearance={{
              elements: {
                rootBox: "w-full",
                card: "shadow-none",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                socialButtonsBlockButton: "w-full py-3 border-2 border-slate/20 hover:border-accent-luxury hover:text-accent-luxury transition-all duration-300",
                formButtonPrimary: "w-full bg-accent-luxury hover:bg-opacity-90 py-3 text-white font-medium rounded-lg transition-all duration-300",
                formFieldInput: "w-full px-4 py-3 border-2 border-slate/20 rounded-lg focus:border-accent-luxury focus:outline-none transition-all duration-300",
              },
              variables: {
                colorPrimary: "#c4a66d",
                colorBackground: "#ffffff",
              }
            }}
          />
        </div>

        <p className="text-center text-slate text-sm mt-8">
          Already have an account?{" "}
          <a href="/sign-in" className="text-accent-luxury hover:underline font-medium">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
