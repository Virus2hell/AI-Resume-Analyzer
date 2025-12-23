// src/pages/Dashboard.tsx
import { useEffect, useState, FormEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabaseClient";

type Profile = {
  first_name: string;
  last_name: string;
  phone: string;
  headline: string;
  location: string;
};

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    first_name: "",
    last_name: "",
    phone: "",
    headline: "",
    location: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      setLoading(true);

      const { data, error } = await supabase
        .from("profiles")
        .select("first_name, last_name, phone, headline, location")
        .eq("id", user.id)
        .maybeSingle();

      if (!error && data) {
        setProfile({
          first_name: data.first_name ?? "",
          last_name: data.last_name ?? "",
          phone: data.phone ?? "",
          headline: data.headline ?? "",
          location: data.location ?? "",
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, [user]);

  const handleChange = (field: keyof Profile, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setSaving(true);
    setMessage(null);

    const updates = {
      id: user.id,
      ...profile,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    setSaving(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Profile updated successfully.");
    }
  };

  if (!user) {
    return (
      <div className="section-container py-12">
        <p className="text-center text-muted-foreground">
          Please log in to view your dashboard.
        </p>
      </div>
    );
  }

  return (
    <div className="section-container py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Manage your KeyWorded profile and contact details.
            </p>
          </div>
          <button onClick={signOut} className="btn-secondary">
            Log out
          </button>
        </div>

        <div className="card-base">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Account
          </h2>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Email:</span>{" "}
              {user.email}
            </p>
            <p>
              <span className="font-semibold text-foreground">User ID:</span>{" "}
              {user.id}
            </p>
          </div>
        </div>

        <div className="card-base">
          <h2 className="text-lg font-semibold text-foreground mb-4">
            Profile details
          </h2>

          {loading ? (
            <p className="text-sm text-muted-foreground">Loading profile...</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First name
                  </label>
                  <input
                    className="input-base w-full"
                    value={profile.first_name}
                    onChange={(e) =>
                      handleChange("first_name", e.target.value)
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last name
                  </label>
                  <input
                    className="input-base w-full"
                    value={profile.last_name}
                    onChange={(e) =>
                      handleChange("last_name", e.target.value)
                    }
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone number
                  </label>
                  <input
                    className="input-base w-full"
                    value={profile.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    placeholder="+91 ..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    className="input-base w-full"
                    value={profile.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                    placeholder="City, Country"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Headline
                </label>
                <input
                  className="input-base w-full"
                  value={profile.headline}
                  onChange={(e) => handleChange("headline", e.target.value)}
                  placeholder="e.g. Full‑stack developer, React & Node.js"
                />
              </div>

              {message && (
                <p className="text-sm text-muted-foreground">{message}</p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="btn-primary mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
