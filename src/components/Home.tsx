import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Spinner, IconButton } from "@chakra-ui/react";
import { Button } from "react-bootstrap";
import { useGetUsers } from "../hooks/useGetUsers";

import styles from "../styles/Home.module.css";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";

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
  const [page, setPage] = useState(1);

  const { users, loading } = useGetUsers(keyword, page);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setKeyword(input);
  }

  function nextPage() {
    setPage((page) => page + 1);
  }

  function previousPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
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
      <div className={styles.arrowContainer}>
        <IconButton
          aria-label="Search database"
          icon={<ArrowBackIcon />}
          onClick={previousPage}
        />
        <Button>{page}</Button>
        <IconButton
          aria-label="Search database"
          icon={<ArrowForwardIcon />}
          onClick={nextPage}
        />
      </div>
    </div>
  );
}
