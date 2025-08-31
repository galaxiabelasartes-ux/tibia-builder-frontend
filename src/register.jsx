import { useState } from "react";
import API from "./api";

function Register({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    try {
      await API.post("/users/register", null, {
        params: { username, email, password },
      });

      setMsg("Usuário registrado com sucesso!");
      onRegister?.(); // se quiser redirecionar pro login
    } catch (err) {
      setError("Erro ao registrar usuário. Tente outro email.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Registrar
        </button>
      </form>

      {msg && <p className="text-green-600 mt-3">{msg}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}

export default Register;
