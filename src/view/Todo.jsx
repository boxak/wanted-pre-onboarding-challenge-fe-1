import React, { useEffect, useState } from 'react';
import ServerRemote from '../server/ServerRemote';
import CreateTodoModal from './CreateTodoModal';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';

const Todo = () => {

    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState({});
    const [openModal, setOpenModal] = useState(false);
    

    useEffect(() => {
        refresh();
    }, [selectedTodo]);

    const getTodos = async() => {

        const token = localStorage.getItem('token');

        let result = await ServerRemote.get("/todos", {}, token);
        let list = result.data;

        return list;
    }

    const refresh = async() => {
        const list = await getTodos();
        setTodos(list);
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

    const deleteTodo = async(id) => {

        const token = localStorage.getItem('token');
        const result = await ServerRemote.delete('/todos/' + id, token);

        refresh();
    }

    const updateTodo = async(id, title, content) => {
        const token = localStorage.getItem('token');

        const params = {
            title : title,
            content : content
        };

        const result = await ServerRemote.put('/todos/' + id, params, token);

        console.log("update result : " + JSON.stringify(result));
        setSelectedTodo(undefined);
        refresh();
    }

    return (
        <div id="todo-div">
            <TodoList todos={todos} 
                setSelectedTodo={setSelectedTodo} 
                deleteTodo={deleteTodo} />
            <div id="todo-btn">
                <button onClick={() => {setOpenModal(true);}}>
                    To-do 추가하기
                </button>
            </div>
            {   selectedTodo !== undefined && selectedTodo !== null ?
                <TodoDetail todo={selectedTodo} 
                    updateTodo={updateTodo} 
                    setTodo={setSelectedTodo} 
                    setTodos={setTodos} 
                    todos={todos} /> : null
            }
            {
                openModal && <CreateTodoModal 
                                setOpenModal={setOpenModal}
                                createTodo={createTodo} />
            }
        </div>
    );
};

export default Todo;