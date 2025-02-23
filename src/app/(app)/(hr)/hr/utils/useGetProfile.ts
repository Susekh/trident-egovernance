import { useState, useEffect } from 'react';
import axios from 'axios';

const fetchProfile = async (username: string, token: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BACKEND}/staff/profile/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to fetch profile: ${error.response?.status} - ${error.message}`,
    );
  }
};

export const useGetProfile = (username: string, token: string) => {
  const [profile, setProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const profileData = await fetchProfile(username, token);
        console.log('Profile Data ::', profileData);
        setProfile(profileData);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [username, token]);

  return { profile, isLoading, error };
};
