import logo from '../logo.svg';
import '../App.css';
import Table from './Table';
import React, {Component, useCallback} from 'react';
import '../index.css';
import ReactDOM from 'react-dom/client';
// import {useTable} from 'react-table';
import { useEffect,useState } from 'react';





function App({root}) {
  const [data,setData]=useState({});
  const [showCompleted,changeShowCompleted]=useState();
  useEffect(()=>{
    changeShowCompleted(false);
    fetchPublishData().then((tData)=>{
      console.log("App Initial render: "+JSON.stringify(tData));
      setData(tData);
    });
  },[]);
  const setShowCompleted=useCallback(()=>{
    changeShowCompleted(!showCompleted);
  })
  const addData=useCallback((val)=>{
    console.log("Callback: "+JSON.stringify(val));
    setData(val);
  })
  function updateShowCompleted(val){
    setShowCompleted(val);
  }
  async function fetchPublishData(){
    let temp =await fetch('/api/publish');
    let parsedData=await temp.json();
    
    return parsedData;
  }
  async function putPublishData(tData){
    console.log("In put"+JSON.stringify(tData));
    let temp =await fetch('/api/publish',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(tData)});
    let parsedData=await temp.json();
    console.log("Updated:"+JSON.stringify(parsedData));
  }
  return (
    <div className="App">
      <Table root={root} data={data} showCompleted={showCompleted} setData={addData} putPublishData={putPublishData} setShowCompleted={setShowCompleted}/>
    </div>
  );
}

export default App;
