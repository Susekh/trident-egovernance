"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import StaffInfoMain from "../../components/StaffInfoMain";
import { useSession } from "next-auth/react";

function Page() {
  const session = useSession();
  const token = session.data?.user?.accessToken;
  
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "default";
  
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const endpoint = `${process.env.NEXT_PUBLIC_BACKEND}/staff/get-profile/${username}`;

  useEffect(() => {
    if (!token || !username) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(endpoint, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch profile: ${response.status}`);
        }

        const profileData = await response.json();
        setProfile(profileData[0]);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [token, username, endpoint]);

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile: {error}</p>;

  return <StaffInfoMain method="PUT" endpoint={`update/${username}`} profileData={profile} />;
}

export default Page;
