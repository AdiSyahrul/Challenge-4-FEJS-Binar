import React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function TodoList()  {
    return (
    <Stack spacing ={5} direction ='row'  justifyContent='center'>
        <Button variant="contained">Delete done tasks</Button>
        <Button variant="contained">Delete all tasks</Button>
    </Stack>
    )
}
export default TodoList;