import React, { useContext, useEffect, useState } from "react";
import { ContextData } from "../store/Context";
import { AiFillDelete } from "react-icons/ai"

const Card = ({ task }) => {
  const [checked, setChecked] = useState(false);

  const {toggleDone, deleteTask} = useContext(ContextData);

  return (
    <div className="w-[100%] sm:w-[80%] lg:w-[62%] mx-auto p-3 py-5 mb-[30px] rounded-md bg-pink-100">
      <div className="flex justify-between">
        {/* {blog.done ? (
          <del>
            <h3>{blog.task}</h3>
          </del>
        ) : ( */}
        <h1>{task.task}</h1>
          <h3>{task.done}</h3>
        <div className="flex items-start"> 
        <AiFillDelete className="ml-3 text-red-700 text-xl cursor-pointer" title="Remove" onClick={() => deleteTask(task.id)} />
        </div>
      </div>
    </div>
  );
};

export default Card;
