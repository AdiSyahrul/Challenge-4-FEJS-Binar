import './Home.css';
import TodoList from './TodoList';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
// import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Routes, Route, Link} from 'react-router-dom';
import { Box, Checkbox, FormControlLabel } from '@mui/material';



function Home() {
  const [data, setData] = useState([]);
  const [refetchData, setRefetchData] = useState(true);
  const [id, setId] = useState('');
  const [complete, setComplete]= useState(false);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [checked, setChecked]=useState(false);
  const [search, setSearch] = useState('');
  console.log('checked',checked);
  console.log(search);
  const handleChange = (event)=>{
    setChecked({...checked, [event.target.name]: event.target.checked});
  }

  const fetchData = async () => {
    setLoading(true);
    axios({
      method: 'GET',
      url: 'https://6327cdcc9a053ff9aaaa7e3c.mockapi.io/data/',
    })
      .then((res) => {
        setData(res?.data);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
        setRefetchData(false);
      });
    };
  useEffect(() => {
    if (refetchData) {
        fetchData();
      }
  }, [refetchData]);
  const handleDelete = async (id) => {
    try {
      await axios({
        method: 'DELETE',
        url: `https://6327cdcc9a053ff9aaaa7e3c.mockapi.io/data/${id}`,
      });
      setRefetchData(true);
    } catch (error) {
      console.log(error);
    }
  };
  const toggleComplete = (item) => {
		axios
			.put(`https://6327cdcc9a053ff9aaaa7e3c.mockapi.io/data/${item.id}`, {
				...item,
				complete: !item.complete,
			})
			.then((resp) => {
				const newData = data.map((el) => {
					if (el.id !== item.id) {
						return el;
					} else {
						return resp.data;
					}
				});
				setData(newData);
			});
	};

  return (
    <div className="Home">
      <h2>TodoSearch</h2>
      <div>
      <form>
          <input type="text" placeholder='Search todo' onChange={(e)=>setSearch(e.target.value)} />
      </form>
        <Stack spacing ={5} direction ='row'  justifyContent='center' marginTop={2}>
          <Button variant="contained" onClick ={()=>{}}><Link to="/input">Add New task</Link></Button>
          <Button variant="contained" onClick={()=>setRefetchData(true)}>Refresh</Button>
        </Stack>
      </div>
      <div>
        <h4>TodoList</h4>
          <Stack spacing ={5} direction ='row'  justifyContent='center'>
            <Button variant="contained" onClick ={()=>setRefetchData(true)}>All</Button>
            <Button variant="contained" onClick={()=>setComplete(complete)}>Done</Button>
            <Button variant="contained">To do</Button>
          </Stack>
      </div>
      {loading ? (
          <p>Loading...</p>
          ) : (
            data
            .sort ((a,b)=>b.id > a.id ? 1 : -1)
            .filter((item)=>{
              return search === '' 
              ? item : item.task.includes(search);
            })
            ?.map((item) => (
              <>
              <div key={item.id} className="flex flex-row my-2 ppl-3">
                {item.complete === true ? (
                
                <>
                  <p className="line-through">{item.task}</p>
                  <input type="checkbox" checked={item.complete}
                  className="checkbox checkbox-accent mt-1 absolute ml-[66rem]"/>
                </>
                ):(
                  <>
                    <p>{item.task}</p>
                    <input type="checkbox" className="checkbox checkbox-accent mt-1 absolute ml-[66rem]"
                    onClick ={()=>toggleComplete(item)}/>
                  </>
                )}
                {/* BUTTON EDIT */}
                <button style={{
                  marginLeft:'5px',
                }}
                onClick={()=>{
                  setId(item.id);
                  setTask(item.task);
                }}><Link to="/input">Edit</Link></button>
                {/* BUTTON DELETE */}
                <button style={{
                  marginLeft: '10px',
                }}
                onClick={() => handleDelete (item.id)}>Delete</button>  
              </div>
            </>
        ))
      )}
    <TodoList/>
    </div>
  );
}

export default Home;
