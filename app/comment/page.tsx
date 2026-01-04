"use client";
import style from '../compunts_css/comments.module.css'
import { useEffect, useState } from "react";
import axios from "axios";
// Import FontAwesome React component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Import the specific icon
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
interface Comment {
  username: string;
  text: string;
  createdAt: string;
}

export default function COmment_data() {
  const [username, setUsername] = useState(""); // will be auto-filled
  const [text, setText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  // Submit comment
  const handelSubmit = async () => {
    if (!text.trim()) {
      alert("Comment cannot be empty!");
      return;
    }

    try {
      await axios.post("/api/comments", { username, text });
      setText(""); // clear only the comment input
      fetchComments();
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch all comments
  const fetchComments = async () => {
    try {
      const res = await axios.get("/api/comments");
      setComments(res.data.comments || []);
    } catch (error) {
      console.log(error);
      setComments([]);
    }
  };

  // On component mount
  useEffect(() => {
    // Retrieve username from localStorage
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }

    fetchComments();
    const interval = setInterval(fetchComments, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className={style.container}>
      <div className={style.chat_info}>
        <h2 className={style.heading}>All Comments</h2>

        {comments.length === 0 && <p>No comments yet</p>}

        {comments.map((c, i) => (
          <div key={i} className={style.comments}>
            <strong className={style.username}>username: {c.username}</strong>
            <p className={style.comment}>comment: {c.text}</p>
            <small>Date: {new Date(c.createdAt).toLocaleString()}</small>
            <hr />
          </div>
        ))}
      </div>


      {/* Show username automatically */}
      <div className={style.chat_bar}>
        <input
          type="text"
          placeholder="Comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={style.chat_input}
        />
        <button onClick={handelSubmit}><FontAwesomeIcon icon={faPaperPlane} /></button>
      </div>
    </div>

    </>
  );
}
