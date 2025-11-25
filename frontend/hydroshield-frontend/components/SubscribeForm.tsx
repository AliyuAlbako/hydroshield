import React, { useState } from "react";
import api from "../src/api";

export default function SubscribeForm(){
  const [phone,setPhone] = useState("");
  const [state,setState] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/subscribe", { phone, state });
      setMsg("Subscribed! You will receive alerts.");
      setPhone(""); setState("");
    } catch (err) {
      setMsg("Failed to subscribe.");
    }
  };

  return (
    <div>
      <h3>Subscribe for SMS alerts</h3>
      <form onSubmit={submit} style={{display:"flex",flexDirection:"column",gap:8}}>
        <input placeholder="Phone (+234...)" value={phone} onChange={e=>setPhone(e.target.value)} />
        <input placeholder="State (e.g. Lagos)" value={state} onChange={e=>setState(e.target.value)} />
        <button type="submit">Subscribe</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
}
