import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/users/me")
      .then((res) => setUser(res.data.user))
      .catch(() => navigate("/login"));

    API.get("/items").then((res) => setItems(res.data)).catch(() => {});
    API.get("/monsters").then((res) => setMonsters(res.data)).catch(() => {});
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Tibia Builder — Bem-vindo, {user.username}!
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/login");
        }}
        className="bg-red-600 text-white px-4 py-2 rounded"
      >
        Sair
      </button>

      <h2 className="text-xl mt-6">Items</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>{i.name} — Level {i.level_required}</li>
        ))}
      </ul>

      <h2 className="text-xl mt-6">Monsters</h2>
      <ul>
        {monsters.map((m) => (
          <li key={m.id}>{m.name} — HP {m.health}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
