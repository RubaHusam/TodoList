import React, { useState } from "react";
import "./App.css";
import { InputFeild } from "./components/InputFeild";
import Todo from "./model";
import { TodoList } from "./components/TodoList";
import { DragDropContext, DropResult } from "react-beautiful-dnd"

function App() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos,setCompletedTodos]=useState<Todo[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  const onDragEnd=(result:DropResult)=>{
    const {source , destination} = result;
      if (!destination) return;
      if (destination.droppableId === source.droppableId && destination.index === source.index)
      return;

      let add,
      active = todos,
      complete =completedTodos;

      if(source.droppableId === 'TodosList2') {
        add = active [ source.index];
        active.splice(source.index,1); //remove
      }
      else{
        add = complete [ source.index];
        complete.splice(source.index,1); //remove
        
      }

      if(destination.droppableId === 'TodosList2') {
          active.splice(destination.index,0,add);
      }
      else{
        complete.splice(destination.index,0,add);
      }

      setCompletedTodos(complete);
      setTodos(active);

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <div className="heading">
        <span>Taskify</span>
      </div>

      <InputFeild todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} 
      completedTodos ={completedTodos}
      setCompletedTodos={setCompletedTodos}
      />
     
    </div>
    </DragDropContext>
  );
}

export default App;
