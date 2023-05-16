import { Link } from "react-router-dom";
import { NOT_FOUND_TEXT } from "../constants";

export default function NoPage() {
  return (
    <div className="no-page">
      <h2>{NOT_FOUND_TEXT}</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
