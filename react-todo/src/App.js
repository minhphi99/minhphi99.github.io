import Input from "./components/Input.js";
import { useState } from "react";
import Board from "./components/Board.js";

function App() {
  const [taskList, setTaskList] = useState([]);

  console.log(taskList);

  return (
    <>
      <div>
        <h1>To Do</h1>
        <Input taskList={taskList} setTaskList={setTaskList} />
        <ul>
          {taskList.map((task, index) =>
            <Board
              key={index}
              index={index}
              task={task}
              taskList={taskList}
              setTaskList={setTaskList} />
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
