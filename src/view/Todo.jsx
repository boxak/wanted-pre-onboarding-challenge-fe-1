import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ServerRemote from '../server/ServerRemote';
import CreateTodoModal from './CreateTodoModal';

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        refresh();
    }, []);

    const getTodos = async() => {

        const token = localStorage.getItem('token');

        let result = await ServerRemote.get("/todos", {}, token);
        let list = result.data;

        //console.log("getTodo result : " + JSON.stringify(result));
        console.log("list : " + JSON.stringify(list));
        return list;
    }

    const refresh = async() => {
        // setTodos(getTodos());
        const list = await getTodos();
        setTodos(list);
        console.log("todos : " + JSON.stringify(todos));
        
    }

    const createTodo = async(title, content) => {

        const params = {
            title : title,
            content : content
        };

        const token = localStorage.getItem('token');

        const result = await ServerRemote.post('/todos', params, token);

        refresh();
    }


    return (
        <div id="todo-div">
            <div id="todo-list-div">
                {   todos !== undefined && todos.length > 0 ?
                    todos.map((todo, key) => (
                        <div className="todo-div" key={key}>
                            <span>
                                {todo.title}
                            </span>
                        </div>
                    )) : null
                }
                <div id="todo-btn">
                    <button onClick={() => {setOpenModal(true);}}>
                        To-do 추가하기
                    </button>
                </div>
            </div>
            {
                openModal && <CreateTodoModal 
                                setOpenModal={setOpenModal}
                                createTodo={createTodo} />
            }
        </div>
    );
};

export default Todo;