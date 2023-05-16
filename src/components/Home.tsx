import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { useGetUsers } from "../hooks/useGetUsers";

import styles from "../styles/Home.module.css";

interface UserItemProps {
  login: string;
  image: string;
  html_url: string;
}

function UserItem({ login, image }: UserItemProps) {
  return (
    <Link to={`${login}`} className={styles.userItem}>
      <div className={styles.userLeft}>
        <img className={styles.avatar} src={image} />
      </div>
      <div className={styles.userRight}>
        <h4>{login}</h4>
        <div>{`View ${login}'s profile`}</div>
      </div>
    </Link>
  );
}

export default function Home() {
  const [input, setInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const { users, loading } = useGetUsers(keyword, page);

  function handleSubmit(e: any) {
    e.preventDefault();
    setKeyword(input);
  }

  return (
    <div className={styles.home}>
      <h3>Search all Github users</h3>
      <div className={styles.inputContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            <span className={styles.label}>Username:</span>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={styles.input}
            />
          </label>
          <Button variant="primary" type="submit">
            Search
          </Button>
        </form>
        {loading && <Spinner />}
      </div>
      <div className="users">
        {users.map((user) => {
          return (
            <UserItem
              key={user.id}
              login={user.login}
              image={user.avatar_url}
              html_url={user.html_url}
            />
          );
        })}
      </div>
    </div>
  );
}
