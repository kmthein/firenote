import React, { useContext } from "react";
import InputForm from "../component/InputForm";
import Card from "../component/Card";
import { ContextData } from "../store/Context";
import ClipLoader from "react-spinners/ClipLoader";

const Main = ({ tasks, fetchTask, isLoading, setIsLoading }) => {
  const { blogs } = useContext(ContextData);

  let content = (
    <div className=" flex justify-center items-center h-[50vh]">
          <h1 className="text-2xl text-black/50">No Task Added Yet.</h1>
    </div>
  )

  if(tasks != []) {
    content = tasks.map((task) => <Card task={task} key={task.id} />)
  }

  if(isLoading) {
    content = (
        <div className="flex mt-[15%] justify-center">
            <ClipLoader color="#db2777" />
        </div>
    )
  }

  return (
    <div className=" w-[80%] md:w-[70%] mx-auto py-2">
      <h1 className="text-center text-[40px] text-pink-600 font-bold my-2">
        My Notes
      </h1>
      <InputForm fetchTask={fetchTask} tasks={tasks} isLoading={isLoading} setIsLoading={setIsLoading}/>
      {content}
    </div>
  );
};

export default Main;
