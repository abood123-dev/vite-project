import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './store';
import { addTodo, removeTodo } from './todoSlice';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [selected, setSelected] = useState<number[]>([]);

  const todos = useSelector((state: RootState) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAdd = () => {
    if (text.trim() !== '') {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const handleRemove = (id: number) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className='all'>
      <div className='my'>My Mission List</div>
      <div className='inandbtn'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          className='in'
          placeholder='Add your mission here'
        />
        <button onClick={handleAdd} className='btn'>Add</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className='todos'>
          <div
            onClick={() =>
              setSelected((prev) =>
                prev.includes(todo.id)
                  ? prev.filter((id) => id !== todo.id)
                  : [...prev, todo.id]
              )
            }
            style={{ color: selected.includes(todo.id) ? 'green' : 'black' }}
            className='mission'
          >
            {todo.Name}
          </div>
          <div onClick={() => handleRemove(todo.id)} className='x'>x</div>
        </div>
      ))}
    </div>
  );
}

export default App;
