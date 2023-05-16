import { useCallback, useEffect, useState } from "react";
import { BASE_URL, NOT_FOUND_TEXT } from "../constants";
import axios from "axios";

export function useGetUser(username: string | undefined) {
  const [user, setUser] = useState({});

  const getUser = useCallback(async () => {
    const url = `${BASE_URL}/users/${username}`;
    const response: any = await axios.get(url);
    if (response.data.login) {
      setUser(response);
    } else {
      setUser({ login: NOT_FOUND_TEXT });
    }
  }, [username]);

  useEffect(() => {
    getUser();
  }, [username]);

  return {
    userInfo: user,
  };
}
