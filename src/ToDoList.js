import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export function ToDoList() {
  const originalList = [
    { name: "Create theme", active: false },
    { name: "Work on wordpress", active: false },
    { name: "Organize office main department", active: false },
    { name: "Error solve in HTML template", active: false },
  ];

  const getAll = () => {
    updateList(defaultList);
    console.log(defaultList);
  };

  const getActive = () => {
    const filtered = defaultList.filter((todo) => !todo.active);
    console.log("filtered", filtered);
    updateList(defaultList.filter((todo) => !todo.active));
  };

  const getCompleted = () => {
    const filtered = defaultList.filter((todo) => todo.active);
    console.log("completed", filtered);
    updateList(defaultList.filter((todo) => todo.active));
  };
  const [defaultList, setDefaultList] = useState(originalList);
  const [list, updateList] = useState(originalList);
  const [task, setTask] = useState("");

  const toggleTask = (e, index) => {
    const newTasks = [...list];
    newTasks[index].active = e.target.checked === true ? true : false;
    setDefaultList(newTasks);
    updateList(newTasks);
  };

  const handleRemoveItem = (index) => updateList(list.filter((task)=>task.index!==index));


  return (
    <div className="task-list">
      <Card>
        <CardContent>
          <TextField
            label="New Task..."
            style={{
              width: "90%",
              height: "10%",
              margin: "0px 8px",
              paddingLeft: "5px",
            }}
            value={task}
            className="text"
            onChange={(event) => setTask(event.target.value)}
          />
          <Button
            className="btn"
            onClick={() => {
              const newTask = { name: task, active: false };
              console.log(newTask);
              updateList([...list, newTask]);
            }}
          >
            Add Task
          </Button>
          <CardActions>
            <Button size="small" onClick={getAll}>
              All
            </Button>
            <Button size="small" onClick={getActive}>
              Active
            </Button>
            <Button size="small" onClick={getCompleted}>
              Completed
            </Button>
          </CardActions>
          {list.map((item, index) => {
            return (
              <div className="todo-item">
                <input
                  type="checkbox"
                  className="check"
                  checked={item.active}
                  onChange={(event) => toggleTask(event, index)}
                />
                <label className="strikethrough">{item.name}</label>

                <Button
                  name={item.name}
                  onClick={() => handleRemoveItem(index)}
                >
                  ❌
                </Button>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
