import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Todo from "../model";
import { SingleTodo } from "./SingleTodo";
import "./StyledInput.css";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodoList = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}: Props) => {

  return (
    <div className="container">
      <Droppable droppableId="TodosList2">
        {(provided, snapshot) => (
          <div className={`todos ${snapshot.isDraggingOver?'dragaction':""}`}
           ref={provided.innerRef}
           {...provided.droppableProps}>

            <span className="todos_heading">Active Tasks</span>
            {todos?.map((todo,index) => (
              <SingleTodo
              index={index}
                todo={todo}
                key={todo.id}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          {provided.placeholder}
          </div>
        )}
      </Droppable>


      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div className={`todos remove ${snapshot.isDraggingOver?'dragcomp':""}`}
           ref={provided.innerRef}
            {...provided.droppableProps}>
                
           <span className="todos_heading">Completed Tasks</span>
        {completedTodos?.map((todo,index) => (
          <SingleTodo
          index={index}
            todo={todo}
            key={todo.id}
            todos={completedTodos}
            setTodos={setCompletedTodos}
          />
        ))}
      {provided.placeholder}
            </div>

            )}
            </Droppable>
      
    </div>
  );
};
