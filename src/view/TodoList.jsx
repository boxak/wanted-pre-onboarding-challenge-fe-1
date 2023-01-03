import React from 'react';

const TodoList = props => {

    const todos= props.todos;

    return (
        <div id="todo-list-div">
            {   todos !== undefined && todos.length > 0 ?
                todos.map((todo, key) => (
                    <div className="todo-div" key={key}>
                        <div onClick={() => {props.setSelectedTodo(todo);}}
                            className="todo-title">
                            {todo.title}
                        </div>
                        <div onClick={() => {props.setSelectedTodo(todo);}} 
                            className='todo-content'>
                            {todo.content}
                        </div>
                        <button onClick={() => {props.deleteTodo(todo.id)}}
                            className="todo-delete-btn">삭제하기</button>
                    </div> 
                 )) : null
            }
        </div>
    )
}

export default TodoList;

