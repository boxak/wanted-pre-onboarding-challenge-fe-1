import React from 'react';

const TodoList = props => {

    const todos= props.todos;

    return (
        <div id="todo-list-div">
            {   todos !== undefined && todos.length > 0 ?
                todos.map((todo, key) => (
                    <div className="todo-div" key={key}>
                        <span onClick={() => {props.setSelectedTodo(todo);}}>
                            {todo.title}
                        </span>
                        -
                        <span>
                            {todo.content}
                        </span>
                        <button onClick={() => {props.deleteTodo(todo.id)}}>삭제하기</button>
                    </div> 
                 )) : null
            }
        </div>
    )
}

export default TodoList;

