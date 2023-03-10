import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const CreateTodoModal = props => {

    const [domReady, setDomReady] = useState(false);

    const titleRef = useRef("");
    const contentRef = useRef("");

    useEffect(() => {
        setDomReady(true);
    });

    const createTodo = async() => {
        const title = titleRef.current.value;
        const content = contentRef.current.value;

        await props.createTodo(title, content);

        props.setOpenModal(false);
    }

    return domReady ? createPortal(
        <div id="create-todo-div">
            <div id="todo-input-div">
                제목 <input type="text" name="title" ref={titleRef} id="todo-title-input"/>
                내용 <textarea type="text" name="content" ref={contentRef} id="todo-content-input"/>
                <div id="todo-btn-div">
                <button onClick={createTodo}>To do 등록</button>
                <button onClick={() => {props.setOpenModal(false);}}>
                    취소하기
                </button>
            </div>
            </div>
        </div>, document.getElementById('todo-div')
    ) : null;
};

export default CreateTodoModal;