import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../store/Context";
import { AiFillDelete } from "react-icons/ai"

const Card = ({ task, fetchTask,setIsLoading }) => {
  const [checked, setChecked] = useState(false);

  const {key, done} = task;

  const deleteTaskHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`https://firenote-42965-default-rtdb.firebaseio.com/notes/${key}.json`, {
        method: "DELETE"
      });      
      if(!response.ok) {
        throw new Error("Failed to connect with firebase.")
      }
      fetchTask();
    } catch (error) {
      alert(error.message);
    }
  }

  const toggleDone = async () => {
  const updatedTask = {...task, done: !done};
  try {
    await fetch(`https://firenote-42965-default-rtdb.firebaseio.com/notes/${key}.json`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(updatedTask)
    })
    fetchTask()
  } catch (error) {
    
  }
  }

  return (
    <div className="w-[100%] sm:w-[80%] lg:w-[62%] mx-auto p-3 py-5 mb-[30px] rounded-md bg-pink-100">
      <div className="flex justify-between">
        {task.done ? (
          <del>
            <h3>{task.task}</h3>
          </del>
        ) : (
        <h1>{task.task}</h1>)}
        <div className="flex items-start"> 
        {task.done ? (
          <input
            type="checkbox"
            className="w-4 cursor-pointer mt-1"
            checked
            onClick={toggleDone}
            value={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
        ) : (
          <input
            type="checkbox"
            className="w-4 cursor-pointer mt-1"
            value={checked}
            onClick={toggleDone}
            onChange={(e) => setChecked(e.target.checked)}
          />
        )}
        <AiFillDelete className="ml-3 text-red-700 text-xl cursor-pointer" title="Remove" onClick={deleteTaskHandler} />
        </div>
      </div>
    </div>
  );
};

export default Card;
