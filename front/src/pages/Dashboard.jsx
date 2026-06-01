import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export default function Dashboard() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("access");

    getProfile(token)
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Olá, {username}</h2>
    </div>
  );
}