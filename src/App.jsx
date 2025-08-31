import { useState, useEffect } from "react";
import API from "./api";

function App() {
  const [items, setItems] = useState([]);
  const [monsters, setMonsters] = useState([]);

  useEffect(() => {
    API.get("/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));

    API.get("/monsters")
      .then((res) => setMonsters(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tibia Builder Frontend</h1>

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
