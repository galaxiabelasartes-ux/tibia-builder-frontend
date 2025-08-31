import { useState, useEffect } from "react";
import API from "./api";
import Login from "./Login";
import Register from "./Register";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [items, setItems] = useState([]);
  const [monsters, setMonsters] = useState([]);

  const fetchUser = async () => {
    try {
      const res = await API.get("/users/me");
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div>
        {showRegister ? (
          <Register onRegister={() => setShowRegister(false)} />
        ) : (
          <Login onLogin={fetchUser} />
        )}

        <div className="text-center mt-4">
          {showRegister ? (
            <button
              onClick={() => setShowRegister(false)}
              className="text-blue-600 underline"
            >
              Já tem conta? Faça login
            </button>
          ) : (
            <button
              onClick={() => setShowRegister(true)}
              className="text-blue-600 underline"
            >
              Não tem conta? Cadastre-se
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        Tibia Builder Frontend — Bem-vindo, {user.username}!
      </h1>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          setUser(null);
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

export default App;
