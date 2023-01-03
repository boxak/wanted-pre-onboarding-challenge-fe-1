import React, { useEffect, useState } from 'react';
import ServerRemote from '../server/ServerRemote';
import CreateTodoModal from './CreateTodoModal';
import TodoList from './TodoList';
import TodoDetail from './TodoDetail';
import NullChecker from '../util/NullChecker';
import { useNavigate } from 'react-router-dom';

const Todo = props => {

    const [todos, setTodos] = useState([]);
    const [selectedTodo, setSelectedTodo] = useState({});
    const [openModal, setOpenModal] = useState(false);

    const navigate = useNavigate();
    
    const email = localStorage.getItem('email');

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
        refresh();
    }

    const logout = () => {
        props.logout();
        navigate("/");
    }

    return (
        <div id="outer-todo-div">
            <div id="title">
                <div id="user-email">
                    {NullChecker.fixNullString(email)}<br/>
                    <button className="todo-functional-btn"
                        onClick={logout}>로그아웃</button>
                </div>
                <div id="inner-title-div">
                    To Do List
                </div>
            </div>
            <div id="todo-div">
                <div id="todo-label-div">
                    <div id="todo-label-inner-div1">
                        제목
                    </div>
                    <div id="todo-label-inner-div2">
                        내용
                    </div>
                </div>
                <TodoList todos={todos} 
                    setSelectedTodo={setSelectedTodo} 
                    deleteTodo={deleteTodo} />
                <div id="todo-btn-div">
                    <button onClick={() => {setOpenModal(true);}}
                        className="todo-functional-btn">
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
        </div>
    );
};

export default Todo;