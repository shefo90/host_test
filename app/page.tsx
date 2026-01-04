"use client";

import logo from '../public/favicon.ico'
import style from './compunts_css/singh_up.module.css'
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation"; // <-- for navigation

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter(); // Next.js router

  const handelSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // STOP default navigation

    // Check empty fields first
    if (!username.trim() || !password.trim()) {
      alert("Username and password cannot be empty!");
      return;
    }

    try {
      const res = await axios.post('/api/login_data', {
        username,
        password
      });

      console.log(res.data);

      if (res.data.massge === "user saved") {
        alert("User saved successfully!");
        localStorage.setItem("username", username); // save username

        router.push("/comment"); // Only navigate after success
      } else {
        alert(res.data.massge); // Show backend message (like user exists)
      }

    } catch (error: any) {
      console.log(error);
      alert(error?.response?.data?.massge || "Error sending data");
    }
  };

  return (
    <div className={style.container}>
      <div className={style.logo_container}>
        <h1 className={style.tittle}>FoxTalk</h1>
        <img src={logo.src} alt="Logo" className={style.logo}/>
      </div>

      <div className={style.user_data}>
        <h2 className={style.sign_up}>Sign Up</h2>

        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={style.input}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={style.input}
        />

        <br />

        <button onClick={handelSubmit} className={style.sub_button}>Submit</button>
      </div>
    </div>
  );
}
