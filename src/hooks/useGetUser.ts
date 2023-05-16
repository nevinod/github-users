import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://api.github.com";

export function useGetUser(username: string | undefined) {
  const [user, setUser] = useState({});

  const getUser = useCallback(async () => {
    const url = `${BASE_URL}/users/${username}`;
    const response: any = await axios.get(url);
    if (response.data.login) {
      setUser(response);
    } else {
      setUser({ login: "Not Found" });
    }
  }, [username]);

  useEffect(() => {
    getUser();
  }, [username]);

  return {
    userInfo: user,
  };
}
