// src/pages/SignUpPage.tsx
import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <div className="section-container py-12 flex justify-center">
    <SignUp routing="path" path="/sign-up" />
  </div>
);

export default SignUpPage;
