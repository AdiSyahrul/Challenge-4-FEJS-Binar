import React, { useEffect, useState} from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link} from 'react-router-dom';
import axios from 'axios' ;

function Input() {
    const [task, setTask] = useState('');
    const [complete, setComplete] = useState(false);
    const [refetchData, setRefetchData]=useState(true);

    function handlePost(e){
      e.preventDefault();
      axios.post('https://6327cdcc9a053ff9aaaa7e3c.mockapi.io/data/', {
        task,
        complete,
        })
        .then((res)=>setRefetchData(true));
    }

    return (
        <div className="Home">
        <h2>TodoInput</h2>
        <form>
          <input type="text" placeholder='Input/Edit todo' value={task} onChange={(e)=>setTask(e.target.value)}/>
        </form>
        <Stack spacing ={5} direction ='row'  justifyContent='center' marginTop={2}>
          <Button variant="contained"><Link to="/">Back</Link></Button>
          <Button variant="contained" onClick={handlePost}><Link to="/">Submit</Link></Button>
        </Stack>
        </div>
    )
}

export default Input;