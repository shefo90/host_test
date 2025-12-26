"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function COmment_data() {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  // POST comment
  const handelSubmit = async () => {
    try {
      await axios.post("/api/comments", { username, text });

      // clear inputs
      setUsername("");
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

  // GET comments
  const fetchComments = async () => {
    try {
      const res = await axios.get("/api/comments");
      setComments(res.data.text); // matches your API response
    } catch (error) {
      console.log(error);
    }
  };

  // fetch on page load + poll every 5 seconds
  useEffect(() => {
    fetchComments(); // initial fetch

    const interval = setInterval(() => {
      fetchComments();
    }, 5000); // fetch every 5 seconds

    // cleanup interval on unmount
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
          <strong>username : {c.username}</strong>
          <p> comment : {c.text}</p>
          <small> Date : {new Date(c.createdAt).toLocaleString()}</small>
          <hr />
        </div>
      ))}
    </>
  );
}
