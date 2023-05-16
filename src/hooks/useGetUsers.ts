import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "https://api.github.com";

interface UserItem {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
}

interface ResponseType {
  total_count: number;
  incomplete_results: boolean;
  data: any;
}

export function useGetUsers(keyword: string, page: number) {
  const [users, setUsers] = useState<Array<UserItem>>([]);
  const [loading, setLoading] = useState(false);

  const getUsers = useCallback(async () => {
    const url = `${BASE_URL}/search/users?page=${page.toString()}&per_page=20&q=${keyword}`;
    console.log(url);
    setLoading(true);
    const response: ResponseType = await axios.get(url);
    console.log(response);
    if (response.data.items) {
      setUsers(response.data.items);
    } else {
      setUsers([]);
    }
    setLoading(false);
  }, [keyword]);

  useEffect(() => {
    if (!keyword) return;

    getUsers();
  }, [page, keyword]);

  return { users, loading };
}
