const Board = ({ task, index, taskList, setTaskList }) => {
    const deleteTask = () => {
        let removeIndex = taskList.indexOf(task);
        taskList.splice(removeIndex, 1);
        setTaskList((currentTasks => currentTasks.filter(todo => index === removeIndex)))
    }

    return (
        <>
            <div>
                <p>
                    {task}
                </p>
                <button onClick={deleteTask}>Delete</button>
            </div>
        </>
    )
}

export default Board;