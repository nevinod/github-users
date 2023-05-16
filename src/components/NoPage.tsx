import { Link } from "react-router-dom";

export default function NoPage() {
  return (
    <div className="no-page">
      <h2>Page not found</h2>
      <Link to="/">Return to homepage</Link>
    </div>
  );
}
