import React, {useEffect} from 'react'
import TodoList from './Todo/Todolist'
import Context from './context'
import AddTodo from './Todo/AddTodo' 
import Loader from './Loader'


function App() {
  const [todos,setTodos] = React.useState([])
  const [loading, setoading] = React.useState(true)
   

useEffect(() => {
  fetch('https://jsonplaceholder.typicode.com/todos/?_limit=5 ')
  .then(response => response.json())
  .then(todos =>{
    setTodos(todos)
  })
},[])

function toggleTodo(id) {
setTodos(
 todos.map(todo =>
   {if (todo.id === id){ 
     todo.completed = !todo.completed
    }
return todo 
})
)
}

function removeTodo(id){
  setTodos(todos.filter(todo => todo.id !== id))
}


function addTodo (title){
  setTodos(
    todos.concat([
      {title,
    id:Date.now(),
    completed:false
  }
])
  )
}


  return (
    <Context.Provider value={{removeTodo}}>
   <div className="Wrapper">
<h1>Проект на Реакте</h1>
<React.Suspense fallback={<p>Загрузка...</p>}>
  <AddTodo onCreate={addTodo}/> 
  {loading && <Loader />}
</React.Suspense>

{todos.length ?<TodoList todos={todos} onToggle={toggleTodo}/>:<p>Нет задач</p>}
<TodoList todos={todos} onToggle={toggleTodo}/>
   </div>
   </Context.Provider>
  )
}

export default App;
