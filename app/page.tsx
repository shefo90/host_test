"use client";

import axios from "axios";
import Link from "next/link";
import { useState } from "react";

export default function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handelSubmit = async () => {
    try {
      const res = await axios.post('/api/login_data', {
        username,
        password
      });

      console.log(res.data);
      alert("User sent successfully!");

    } catch (error) {
      console.log(error);
      alert("Error sending data");
    }
  };

  return (
    <>
      <h2>sigh up</h2>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />

      <a href="/comment"><button onClick={handelSubmit}>Submit</button></a>
    </>
  );
}
