import { Link, useParams } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { NOT_FOUND_TEXT } from "../constants";

import styles from "../styles/User.module.css";

function User() {
  const { user } = useParams();
  const { userInfo }: any = useGetUser(user);

  if (!userInfo.data) return <h2>{NOT_FOUND_TEXT}</h2>;

  return (
    <div className={styles.userContainer}>
      <div className={styles.imageContainer}>
        <img src={userInfo.data.avatar_url} />
      </div>
      <div className={styles.userRight}>
        <h1>{userInfo.data.login}</h1>
        <Link
          to={userInfo.data.html_url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {`Visit ${userInfo.data.login}'s Github page`}
        </Link>
      </div>
    </div>
  );
}

export default User;
