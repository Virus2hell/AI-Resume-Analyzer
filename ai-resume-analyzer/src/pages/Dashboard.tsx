// src/pages/Dashboard.tsx
import { useUser, SignOutButton } from "@clerk/clerk-react";

const Dashboard = () => {
  const { user } = useUser();

  const fullName = user?.fullName ?? "";
  const email = user?.primaryEmailAddress?.emailAddress ?? "";
  const phone = user?.primaryPhoneNumber?.phoneNumber ?? "";

  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-xl card-base space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">Name:</span>{" "}
            {fullName}
          </p>
          <p>
            <span className="font-semibold text-foreground">Email:</span>{" "}
            {email}
          </p>
          <p>
            <span className="font-semibold text-foreground">Phone:</span>{" "}
            {phone || "Not set"}
          </p>
        </div>
        <SignOutButton>
          <button className="btn-secondary w-full mt-4">Log out</button>
        </SignOutButton>
      </div>
    </div>
  );
};

export default Dashboard;
