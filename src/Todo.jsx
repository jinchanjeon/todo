import { Box, Button, Typography } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

function Todo({todo}) {
    const queryClient = useQueryClient();
    const handleDelete = ()=>{
        delmute.mutate({

        })
    }

    const delTodo = async ()=>{
        const response = await axios.delete(`http://localhost:8080/todos/${todo.todoId}`)
        return response.data;
    }

    const delmute = useMutation({
        mutationFn: delTodo,
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
      })


  return (
    <Box display={"flex"} sx={{"justifyContent":"space-between"}}>
        <Typography>
            {todo.todoTitle}
        </Typography>
        <Button variant='outlined' onClick={handleDelete}>삭제</Button>
    </Box>
  )
}

export default Todo