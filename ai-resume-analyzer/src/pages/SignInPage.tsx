// src/pages/SignInPage.tsx
import { SignIn } from "@clerk/clerk-react";

const SignInPage = () => (
  <div className="section-container py-12 flex justify-center">
    <SignIn routing="path" path="/sign-in" />
  </div>
);

export default SignInPage;
