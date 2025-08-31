// App.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  ITEM: "item",
};

// Componente do Item no inventário
function ItemCard({ item }) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.ITEM,
    item,
  }));

  return (
    <div
      ref={drag}
      className="p-3 border rounded-lg bg-white shadow cursor-move hover:bg-gray-100"
    >
      <p className="font-medium">{item.name}</p>
      <p className="text-sm text-gray-500">{item.slot}</p>
    </div>
  );
}

// Slot de equipamento
function Slot({ slot, equipped, onEquip }) {
  const [, drop] = useDrop(() => ({
    accept: ItemTypes.ITEM,
    drop: (item) => {
      if (item.slot === slot) {
        onEquip(slot, item);
      }
    },
  }));

  return (
    <div
      ref={drop}
      className="p-4 border-2 border-dashed rounded-lg text-center min-h-[80px] flex flex-col items-center justify-center bg-gray-50"
    >
      <h2 className="font-semibold capitalize">{slot}</h2>
      {equipped ? (
        <p className="text-green-700 font-medium">{equipped.name}</p>
      ) : (
        <p className="text-gray-400">Arraste aqui</p>
      )}
    </div>
  );
}

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
    axios
      .get("https://SEU-BACKEND.onrender.com/items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error(err));
  }, []);

  const equipItem = (slot, item) => {
    setBuild({ ...build, [slot]: item });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Tibia Build Creator</h1>

        {/* Slots de equipamentos */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {Object.keys(build).map((slot) => (
            <Slot
              key={slot}
              slot={slot}
              equipped={build[slot]}
              onEquip={equipItem}
            />
          ))}
        </div>

        {/* Lista de itens */}
        <h2 className="text-2xl font-semibold mb-4">Inventário</h2>
        <div className="grid grid-cols-4 gap-4">
          {items.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Resumo */}
        <div className="mt-8 p-4 border rounded-lg">
          <h2 className="text-xl font-bold">Resumo da Build</h2>
          <p>
            Total Defense:{" "}
            {Object.values(build).reduce(
              (acc, item) => acc + (item?.defense || 0),
              0
            )}
          </p>
          <p>
            Total Attack:{" "}
            {Object.values(build).reduce(
              (acc, item) => acc + (item?.attack || 0),
              0
            )}
          </p>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
