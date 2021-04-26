import React, { Fragment, useState } from 'react';
import './css/App.css'

type FormElement = React.FormEvent<HTMLFormElement>;

interface ITodo {
  text: string;
  complete: boolean;
}

//JSX.Element: TS custom definition
function App(): JSX.Element {
  const [value, setValue] = useState<string>('');
  const [todos, setTodos] = useState<ITodo[]>([]);
  // debugger;

  const handleSubmit = (e: FormElement): void => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };
  console.log(todos);

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    // switch complete state
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };

  const deleteTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos.splice(index, 1);
    // newTodos = todos.filter((todo: ITodo) => todo !== newTodos[index]); This also work but must `let newTodos`
    setTodos(newTodos);
  };

  return (
    <Fragment>
      <div className='container'>
        <h1>To-do List</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            className='add-todo-input'
            type='text'
            value={value}
            placeholder='Add a task...'
            onChange={e => setValue(e.target.value)}
            required
          />
          <button className='btn' type='submit'>Add to-do</button>
        </form>
        <section>
          {todos.map((todo: ITodo, index: number) => {
            return (
              <Fragment key={index}>
                <div className='todo-container'>
                  <div className='todo-check'>
                    <input type='checkbox'
                        value=''
                        checked={todo.complete} 
                        onClick={(): void => completeTodo(index)
                        }
                        id={'todo'+index} 
                    />
                    <label htmlFor={'todo'+index} style={{ textDecoration: todo.complete ? 'line-through' : '' }}>
                      {todo.text}
                    </label>
                  </div>
                  <div className='todo-btn'>
                    <h3 onClick={(): void => deleteTodo(index)}>&times;</h3>
                  </div>
                </div>
              </Fragment>
            );
          })}
        </section>
      </div>
    </Fragment>
  );
}
export default App;
