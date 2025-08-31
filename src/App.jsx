// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);
  const [build, setBuild] = useState({
    head: null,
    armor: null,
    legs: null,
    weapon: null,
    shield: null,
    amulet: null,
    ring: null,
    boots: null,
    backpack: null,
  });

  useEffect(() => {
    axios.get("https://SEU-BACKEND.onrender.com/items")
      .then(res => setItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const equipItem = (slot, item) => {
    setBuild({ ...build, [slot]: item });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Tibia Build Creator</h1>

      {/* Slots de equipamentos */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Object.keys(build).map(slot => (
          <div key={slot} className="p-4 border rounded-lg text-center">
            <h2 className="font-semibold capitalize">{slot}</h2>
            {build[slot] ? (
              <p>{build[slot].name}</p>
            ) : (
              <p className="text-gray-400">Vazio</p>
            )}
          </div>
        ))}
      </div>

      {/* Lista de itens */}
      <h2 className="text-2xl font-semibold mb-4">Itens</h2>
      <div className="grid grid-cols-4 gap-4">
        {items.map(item => (
          <div
            key={item.id}
            onClick={() => equipItem(item.slot, item)}
            className="p-3 border rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">{item.slot}</p>
          </div>
        ))}
      </div>

      {/* Resumo */}
      <div className="mt-8 p-4 border rounded-lg">
        <h2 className="text-xl font-bold">Resumo da Build</h2>
        <p>Total Defense: {Object.values(build).reduce((acc, item) => acc + (item?.defense || 0), 0)}</p>
        <p>Total Attack: {Object.values(build).reduce((acc, item) => acc + (item?.attack || 0), 0)}</p>
      </div>
    </div>
  );
}

export default App;
