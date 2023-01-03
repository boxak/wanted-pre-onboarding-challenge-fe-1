
import React, { useEffect, useRef, useState } from 'react';
import NullChecker from '../util/NullChecker';

const TodoDetail = props => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const todo = props.todo;

    useEffect(() => {
        setTitle(todo.title);
        setContent(todo.content);
    }, [todo]);

    const titleRef = useRef('');
    const contentRef = useRef('');
    const [isUpdateMode, setUpdateMode] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let copy = todo;

        if (name === "title") {
            setTitle(value);
            copy.title = value;
        } else {
            setContent(value);
            copy.content = value;
        }

        props.setTodo(copy);

        let copyArray = props.todos.map((item) => 
            item.id === copy.id ? {...item, ...copy} : item,
        );
        

        props.setTodos(copyArray);
    }

    const updateTodo = async() => {
        const id = todo.id;
        closeTodoDetail();
        await props.updateTodo(id, title, content);
    }

    const closeTodoDetail = () => {
        setTitle('');
        setContent('');
        setUpdateMode(false);
        props.setTodo(undefined);
    }

    return (
        todo !== undefined && Object.keys(todo).length > 0 ? 
        <div className="todo-detail-div">
            <div className='todo-detail-input-div'>
            <input ref={titleRef} type="text" disabled={!isUpdateMode}
                value={NullChecker.fixNullString(title)}
                onChange={handleChange}
                name="title" 
                id="todo-detail-title-input"/>
            </div>
            <div className='todo-detail-input-div'>
            <textarea ref={contentRef} type disabled={!isUpdateMode}
                value={NullChecker.fixNullString(content)}
                onChange={handleChange}
                name="content" 
                id="todo-detail-content-input"/>
            </div>
            <button onClick={()=>{setUpdateMode(true);}}>수정하기</button>
            {   isUpdateMode ? 
                <button onClick={updateTodo}>제출하기</button> : null
            }
            <button onClick={closeTodoDetail}>닫기</button>
        </div> : null
    );

}

export default TodoDetail;