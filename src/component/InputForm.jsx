import React, { useContext, useEffect, useRef, useState } from "react";
import { ContextData } from "../store/Context";
import { v4 } from 'uuid';

const InputForm = ({fetchTask, isLoading, setIsLoading}) => {
  const today = new Date();
  const currentTime = `${today.getHours()}:${today.getMinutes()}`;

  const {blogs, addTask} = useContext(ContextData);

  const taskRef = useRef();

  // const submitNewTask = (e) => {
  //   e.preventDefault();
  //   let newTask = taskRef.current.value;
  //   const newId = blogs.length + 1;
  //   addTask({
  //       id: newId,
  //       task: newTask,
  //       done: false
  //   })
  //   console.log(blogs);
  //   taskRef.current.value = "";
  // }

  const [note, setNote] = useState("");

  const uuid = v4;

  const inputTask = {
    id: uuid(),
    task: note,
    done: false
  }

  const submitNewTask = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      await fetch("https://firenote-42965-default-rtdb.firebaseio.com/notes.json",{
      method: "POST",
      body: JSON.stringify(inputTask),
      headers: {
        "Content-Type": "application/json" 
      } 
    })
    setNote("")
    setIsLoading(false);
    fetchTask();
    } catch (error) {
      alert("Something went wrong.")
    }    
  }

  return (
        <div className="flex justify-center py-5 mb-[15px]">
      <form onSubmit={submitNewTask}>
          <input
            type="text"
            placeholder="Type your next task here..."
            className="rounded-tl-md rounded-bl-md p-2 w-[250px] sm:w-[400px] lg:w-[540px]"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            required
          />
          <button className=" bg-slate-600 p-2 text-white rounded-tr-md rounded-br-md ">
            ADD
          </button>
      </form>
    </div>
  );
};

export default InputForm;
