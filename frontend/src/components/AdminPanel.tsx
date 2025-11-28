import  { useState } from "react";
import api, { setAuthToken } from "../api";

export default function AdminPanel(){
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [token, setToken] = useState("");
  const [state, setState] = useState("");
  const [message, setMessage] = useState("");

  const login = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { username: user, password: pass });
      const t = res.data.access;
      setAuthToken(t);
      setToken(t);
      alert("Logged in");
    } catch (err) {
      alert("Login failed");
    }
  };

  const sendAlert = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const res = await api.post("/send-alert", { state, message });
      alert("Alert processed. Check console or results.");
    } catch (err) {
      alert("Failed to send alert");
    }
  };

  return (
    <div>
      <h3>Admin</h3>
      {!token ? (
        <form onSubmit={login} style={{display:"flex",flexDirection:"column",gap:8}}>
          <input placeholder="username" value={user} onChange={e=>setUser(e.target.value)} />
          <input placeholder="password" type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={sendAlert} style={{display:"flex",flexDirection:"column",gap:8}}>
          <input placeholder="State to alert" value={state} onChange={e=>setState(e.target.value)} />
          <input placeholder="Message (optional)" value={message} onChange={e=>setMessage(e.target.value)} />
          <button type="submit">Send Alert</button>
        </form>
      )}
    </div>
  );
}
