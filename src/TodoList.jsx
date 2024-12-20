import React, { useEffect, useRef } from 'react'
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import axios from 'axios';
import Todo from './Todo';

function TodoList() {
    //tanstack query에 접근
    const queryClient = useQueryClient();
    const jcTxt = useRef(null);

    const getTodos = async() =>{
        //axios로 get이 와야됨
        const response = await axios.get("http://localhost:8080/todos");
        return response.data;
    }
  
    // Queries
    const {data} = useQuery({ 
        queryKey: ['todos'], 
        queryFn: getTodos 
    })

    console.log("꼭 체킁", data);

  
    const postTodo= async(todo)=>{
        //axios로 post가 와야됨
        const response = await axios.post("http://localhost:8080/todos",todo);
        return response.data;
    }


    //추가 버튼 눌렀을때
    const handleAdd = ()=>{
        inmute.mutate({
            todoId: data.length+1,
            todoTitle: jcTxt.current.value
          })
          jcTxt.current.value="";
          jcTxt.current.focus();
    }

    const inmute = useMutation({
      mutationFn: postTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] })
      },
    })
  
    useEffect(()=>{
        jcTxt.current.focus();
        
    }, [])

    return (
      <div>
        <ul>{data?.map((todo) => <Todo key={todo.todoId} todo={todo}/>)}</ul>
        <input type="text" ref={jcTxt} style={{border:"1px solid black"}} defaultValue={"수민 할일 많음"}/>
  
        <button onClick={handleAdd}>
          Add Todo
        </button>
        
      </div>
    )
  }

export default TodoList