
import { useState } from 'react'
import './App.css';

interface todo
{
  id:number;
  Name:string;
}
function App() {
   const [todos,settodos]=useState<todo[]>([]);
   const [text,settext]=useState<string>('');
   const [Selected, setSelected] = useState<number[]>([]);
   const Addtotodo=()=>
    {
      if(text.trim() !== '')
        {
          settodos([...todos , {Name:text,id:Math.random()}]);
          settext('');
        }
     console.log(todos); 
      }
       const removeOne=(id:number)=>
      {
        const filtered= todos.filter((item)=> item.id!==id );
        settodos(filtered);  
    }
  return (
    <div className='all'>
    <div className='my'>My misson List</div>
    <div className='inandbtn'>
    <input value={text} onChange={(e)=>settext(e.target.value)} className='in' placeholder='add your mission here'/>
    <button onClick={()=>Addtotodo()} className='btn'>Add</button> 
    </div>
    {todos.map((too:todo)=>
      {
        return(
       <div key={too.id} className='todos'>  
         <div onClick={() => {
  setSelected((prev) =>
    prev.includes(too.id)
      ? prev.filter((id) => id !== too.id) 
      : [...prev, too.id] 
  );
}}
 style={{color : Selected.includes(too.id) ? "green" : "black"}}  className='mission'> 
        {too.Name}
         </div>
         <div onClick={()=>removeOne(too.id)} className='x'>
          x
         </div>
       </div>
        )
      })}
     
    </div>
  )
}

export default App
