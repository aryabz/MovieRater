import { useState } from "react";



export default function App() {
  const [dataTodos, setDataTodos] = useState([]);
  const [dataTodo, setdataTodo] = useState("");
  const [flagTodo, setflagTodo] = useState(false);

  function addDataTodo(e) {
    e.preventDefault()
    flagTodo ? edit()
      : setDataTodos(Data => [...Data, { name: dataTodo, id: 1 + Math.floor(Math.random() * 99) }])
  }
  function edit() {
    setDataTodos(DataTodos => DataTodos.map(Data => Data.id === flagTodo ? { name: dataTodo, id: Data.id } : Data))
    setflagTodo(false)
  }
  function handlEdite(data) {
    setflagTodo(data.id)
    setdataTodo(data.name)
  }

  function handlDelete(id) {
    setDataTodos(DataTodos => DataTodos.filter(Data => Data.id === id ? "" : Data))
  }

  return (
    <div>
      <SendInput dataTodo={dataTodo} setdataTodo={setdataTodo} addDataTodo={addDataTodo} />
      <ShowResult>
        {dataTodos.map(data => <ListTodo data={data} key={data.id} handlDelete={handlDelete} handlEdite={handlEdite} />)}
      </ShowResult>
    </div>
  );
}


function SendInput({ dataTodo, setdataTodo, addDataTodo }) {
  return (
    <form onSubmit={e => addDataTodo(e)}>
      <input type="text" placeholder="type here..." value={dataTodo} onChange={e => setdataTodo(e.target.value)} />
      <button >Add</button>
    </form>
  )
}

function ShowResult({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function ListTodo({ data, handlDelete, handlEdite }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <button onClick={e => handlEdite(data)}>edite</button>
      <button onClick={e => handlDelete(data.id)}>delete</button>
    </div>
  )
}