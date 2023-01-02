
import React, { useEffect, useRef, useState } from 'react';
import ServerRemote from '../server/ServerRemote';
import NullChecker from '../util/NullChecker';

const TodoDetail = props => {

    const { todo, updateTodo } = props;

    useEffect(() => {
        console.log("useEffect : " + JSON.stringify(todo));
    }, [todo]);

    const titleRef = useRef('');
    const contentRef = useRef('');
    const [isUpdateMode, setUpdateMode] = useState(false);

    const updateTodo = async() => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        const token = localStorage.getItem('token');

        const result = ServerRemote.put('')
    }

    return (
        todo !== undefined && Object.keys(todo).length > 0 ? 
        <div className="todo-detail-div">
            <input ref={titleRef} type="text" disabled={!isUpdateMode}
                value={todo !== undefined ? NullChecker.fixNullString(todo.title) : ''} />
            <input ref={contentRef} type disabled={!isUpdateMode}
                value={todo !== undefined ? NullChecker.fixNullString(todo.content) : ''} />
            <button onClick={()=>{setUpdateMode(true);}}>수정하기</button>
            {   isUpdateMode ? 
                <button onClick={updateTodo}>제출하기</button> : null
            }
        </div> : null
    );

}

export default TodoDetail;