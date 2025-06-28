"use client"
import "./page.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faUndo } from "@fortawesome/free-solid-svg-icons";
import React, { useRef, useState } from "react";

interface TodoItem {
    id: number;
    text: string;
    isDone: boolean;
}

function App() {
    const [todoList, setTodoList] = useState<TodoItem[]>([
        { id: 1, text: "Example task", isDone: false },
    ]);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const addTodo = () => {
        if (inputValue.trim()) {
            setTodoList((prev) => [
                ...prev,
                { id: Date.now(), text: inputValue, isDone: false },
            ]);
            setInputValue("");
            inputRef.current?.focus();
        }
    };

    const removeTodo = (id: number) => {
        setTodoList((prev) => prev.filter((todo) => todo.id !== id));
    };

    const toggleTodo = (id: number) => {
        setTodoList((prev) =>
            prev.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            )
        );
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            addTodo();
        }
    };

    return (
        <div className="app-container">
            <h1>Todo App</h1>
            <div className="todo-container">
                {todoList.map((todo) => (
                    <div
                        key={todo.id}
                        className={`todo-item ${todo.isDone ? "done" : ""}`}
                    >
                        <p>{todo.text}</p>
                        <div className="actions">
                            <FontAwesomeIcon
                                icon={todo.isDone ? faUndo : faCheck}
                                onClick={() => toggleTodo(todo.id)}
                                className={`action-icon ${
                                    todo.isDone ? "undo" : "complete"
                                }`}
                            />
                            <FontAwesomeIcon
                                icon={faTrash}
                                onClick={() => removeTodo(todo.id)}
                                className="action-icon delete"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="input-container">
                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    type="text"
                    placeholder="Enter a new task..."
                />
                <button onClick={addTodo} disabled={!inputValue.trim()}>
                    Add Task
                </button>
            </div>
        </div>
    );
}

export default App;
