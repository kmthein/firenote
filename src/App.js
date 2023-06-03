import { useContext, useEffect, useState } from "react";
import Main from "./layout/Main";
import { ContextData } from "./store/Context";

function App() {
  const {blogs, addTask} = useContext(ContextData);

  const [tasks, setTasks] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  
  const fetchTask = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("https://firenote-42965-default-rtdb.firebaseio.com/notes.json")
      const data = await response.json();
      const modifiedTask = [];

      for(const key in data){
        modifiedTask.push({
          id: data[key].id,
          task: data[key].task
        })
      }
      setTasks(modifiedTask);
    } catch (error) {
      
    }
    setIsLoading(false);
  }

  return (
    <div className="App bg-pink-200 min-h-[100vh] h-[100%] text-[17px]">
      <Main tasks={tasks} fetchTask={fetchTask} isLoading={isLoading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default App;
