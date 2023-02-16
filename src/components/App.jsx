import "../styles.css";
import React, { useState , useEffect} from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";

const url = "http://localhost:4000";

export default function App() {
  const [notes, setNotes] = useState([]);


  useEffect(() => {
    axios.get(url+"/getnotes")
    .then((res)=>{
      setNotes(res.data);
    })
    .catch((err)=>{
      console.error(err);
    })
  },[]);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
    axios.post(url+"/add", newNote)
      .catch((err) => console.log(err));
  }

  function deleteNote(obj) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== obj.id;
      });
    });
    axios.post(url+"/delete", {title: obj.title, content: obj.content})
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes && notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}
