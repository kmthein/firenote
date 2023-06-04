import React, { useContext } from "react";
import InputForm from "../component/InputForm";
import Card from "../component/Card";
import { ContextData } from "../store/Context";
import ClipLoader from "react-spinners/ClipLoader";
import { GrNotes } from "react-icons/gr"

const Main = ({ tasks, fetchTask, isLoading, setIsLoading, taskCount }) => {
  const { blogs } = useContext(ContextData);

  let content;
  
  if(tasks != [] && !isLoading) {
    content = tasks.map((task) => <Card task={task} key={task.id} fetchTask={fetchTask} setIsLoading={setIsLoading}/>)
  }

  if(isLoading) {
    content = (
        <div className="flex mt-[15%] justify-center">
            <ClipLoader color="#db2777" />
        </div>
    )
  }

  if(!isLoading && tasks.length == 0) {
    content = (
        <div className=" flex justify-center items-center h-[50vh]">
              <h1 className="text-2xl text-black/50">No Task Added Yet.</h1>
        </div>
      )
  }

  return (
    <div className=" w-[80%] md:w-[70%] mx-auto py-2">
        <div className="flex mx-auto justify-between md:w-[80%] lg:w-[70%] items-center px-0 sm:px-0 lg:px-[40px]">
            <h1 className="text-center text-[40px] text-pink-600 font-bold my-2">
            My Notes
            </h1>
            <div className="flex items-center">
            <GrNotes className="text-xl" />
            <span className=" bg-pink-600 text-white w-5 text-center mt-[-20px] ml-[-2px] rounded-full text-sm">{taskCount}</span>
            </div>
        </div>
      
      <InputForm fetchTask={fetchTask} tasks={tasks} isLoading={isLoading} setIsLoading={setIsLoading}/>
      {content}
    </div>
  );
};

export default Main;
