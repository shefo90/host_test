"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Comment {
  username: string;
  text: string;
  createdAt: string;
}

export default function COmment_data() {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  const handelSubmit = async () => {
    try {
      await axios.post("/api/comments", { username, text });
      setUsername("");
      setText("");
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get("/api/comments");
      // Ensure comments is always an array
      setComments(res.data.comments || []);
    } catch (error) {
      console.log(error);
      setComments([]); // fallback
    }
  };

  useEffect(() => {
    fetchComments();
    const interval = setInterval(fetchComments, 5000); // fetch every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <h2>Add Comment</h2>

      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="text"
        placeholder="comment"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <br />

      <button onClick={handelSubmit}>Submit</button>

      <hr />

      <h2>All Comments</h2>

      {comments.length === 0 && <p>No comments yet</p>}

      {comments.map((c, i) => (
        <div key={i}>
          <strong>username: {c.username}</strong>
          <p>comment: {c.text}</p>
          <small>Date: {new Date(c.createdAt).toLocaleString()}</small>
          <hr />
        </div>
      ))}
    </>
  );
}
