import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import TaskList from "./components/TaskList";
import { useDispatch, useSelector } from 'react-redux';
import { Task } from "./models/task.interface";
import { clearAll } from "./redux/actions/userActions";

function App() {
  const { app: { filter, tasks } } = useSelector((state: any) => state);
  const [records, setRecords] = useState<Task[]>([]);
  const dispatch = useDispatch();


  useEffect(() => {
    if (filter === 'all'){
      setRecords(tasks)
    }
    if (filter === 'complete'){
      const data = tasks?.filter((task: Task) => task.status)
      setRecords(data)
    }

    if (filter === 'incomplete'){
      const data = tasks?.filter((task: Task) => !task.status)
      setRecords(data)
    }
  }, [filter, tasks])

  return (
    <div className={"hero bg-gray-100 h-screen md:min-h-[700px] w-full m-auto flex flex-col items-center mt-14 transition-all duration-500"}>
      <div className={"flex flex-col space-y-6 md:w-[700px] w-[100%] z-10 p-4 text-black"}>
        <div className=" w-full flex items-center justify-between">
          <h1 className="uppercase text-4xl font-bold text-white tracking-widest mb-4 md:text-3xl">
            Task Management App
          </h1>
        </div>
        <div className="shadow-md">
          <Filter />
        </div>
        <div key={JSON.stringify(records)} className={"scroll bg-white w-full h-[400px] md:h-[500px] px-2 overflow-y-scroll rounded-md shadow-lg relative transition-all duration-500"}>
          <div className={"w-full overflow-hidden mb- sticky top-0 bg-white flex items-center justify-between text-gray-500"}>
            <p className=" text-gray-500 px-2 py-3">
              {records.length} tasks
            </p>
          </div>

          {records.length ? (
            <TaskList tasks={records} />
          ) : (
            <div className="w-full h-[80%] flex items-center justify-center overflow-hidden">
              <p className="text-gray-500 text-center z-10">Empty task</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App;
