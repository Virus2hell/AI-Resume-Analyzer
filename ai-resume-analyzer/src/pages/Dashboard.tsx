import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-xl card-base space-y-4">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>

        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            <span className="font-semibold text-foreground">User ID:</span>{" "}
            {user?.id}
          </p>
          <p>
            <span className="font-semibold text-foreground">Email:</span>{" "}
            {user?.email}
          </p>
        </div>

        <button
          onClick={signOut}
          className="btn-secondary w-full mt-4"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
