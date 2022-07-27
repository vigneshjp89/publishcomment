import React, {Component, useCallback} from 'react';
import TableProps from './TableProps';
import { useEffect,useState } from 'react';
import NewRowForm from './NewRowForm';
import ReactDOM from 'react-dom/client';
import {copyJSONObject} from './jshelper';
import {Button} from '@cred/neopop-web/lib/components';
import Dropdown from '../dropdown/Dropdown';
import '../index.css';
import {  Checkbox } from '@cred/neopop-web/lib/components';
import { colorGuide, colorPalette, FontVariant } from '@cred/neopop-web/lib/primitives';
//http://172.24.248.69:3000/
  function Table({root,data,setData,showCompleted,putPublishData,setShowCompleted}){
      console.log("Intable: "+JSON.stringify(data));
      const [options,setOptions]=useState({});
      let defaultOption;
      const [user,setUser]=useState(null);
      const [value,setValueState]=useState(null)
      const [label, setLabelState] = useState(options[value]);
      const [visibility, setVisibility] = useState(false);
      const changeVisibility = useCallback(() => {
        setVisibility(!visibility);
        //console.log(document.getElementsByClassName("select-pop")[0].style.visibility);
      });
      const setValue = useCallback((temp) => {
        console.log(temp);
        setValueState(temp);
      });
      const setLabel = useCallback((temp) => {
        console.log(temp);
        setLabelState(temp);
      });
      useEffect(()=>{
        if(window.screen.availWidth<window.screen.availHeight){
          document.getElementById("qTable").className="queryTableLong";
        }
        fetchPublishData().then((tData)=>{
          setData(tData);
        });
        fetch('/api/publisher').then(res=>res.json()).then(resp=>{
            const op={};
            resp.map((item)=>{op[item.id]=item.name});
            
            setOptions(op);
            setValue(resp[0].id);
            setLabel(resp[0].name);
        }).catch(err=>{console.log(err)});
      },[]);
      async function fetchPublishData(){
        let temp =await fetch('/api/publish');
        let parsedData=await temp.json();
        return parsedData;
      }
      useEffect(()=>{
        console.log("data"+JSON.stringify(data))
      },[data]);
      
      //let data=props.value;
      // useEffect(()=>{
      //   window.alert(JSON.stringify(data));
      // },data,setData);
      const checkboxClick=useCallback((e)=>{
        console.log("clicked");
        if(e.target.id.indexOf("incom_")>=0){
            let index=e.target.id.substring(e.target.id.indexOf('_')+1,e.target.id.length);
            console.log(data);
            console.log(index);
            let temp=copyJSONObject(data[index]);
            temp.incom=e.target.checked;
            if((temp.inother===true||temp.inother===1)&&(temp.incom===true||temp.incom===1)){
                temp.enabled=false;
            }else{
                temp.enabled=true;
            }
            let tData=copyJSONObject(data);
            tData[index]=copyJSONObject(temp);
            setData(tData);
            putPublishData(temp);
        }
        if(e.target.id.indexOf("inother_")>=0){
            let index=e.target.id.substring(e.target.id.indexOf('_')+1,e.target.id.length);
            let temp=copyJSONObject(data[index]);
            console.log(e);
            temp.inother=e.target.checked;
            if((temp.inother===true||temp.inother===1)&&(temp.incom===true||temp.incom===1)){
                temp.enabled=false;
            }else{
                temp.enabled=true;
            }
            let tData=copyJSONObject(data);
            tData[index]=copyJSONObject(temp);
            setData(tData);
            putPublishData(temp);
            //let tData=copyJSONObject(data);
            
        }
      });
      const linkClick=useCallback((e)=>{
        fetch(e.target.getAttribute("link")).then(res=>res.json()).then(res=>{
          var link = document.createElement("a");
          // If you don't know the name or want to use
          // the webserver default set name = ''
          console.log(res);
          link.setAttribute('download', res.app_link+".zfa");
          link.href = "data:application/text;base64,"+btoa((JSON.stringify(res.zfaFile)));
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
        
      });
      
      function showCompletedAction(e){
        setShowCompleted(e.target.checked);
      }
      function MoveNewRow(){
        root.render(
            <NewRowForm root={root} data={data} setData={setData} showCompleted={showCompleted} putPublishData={putPublishData} setShowCompleted={setShowCompleted} visibility={visibility} changeVisibility={changeVisibility} options={options} value={value} label={label} setLabel={setLabel} setValue={setValue} />
        );
      }
      function setForUser(e){
        let emp_name=e.target.value;
        let vendor_id=document.getElementById('vendor').list.options.namedItem(emp_name).getAttribute('data-value');
        setUser(emp_name);
      }
      return(
        <div>
          <div className="topContent">
            <div id="qTable" className='queryTableDesk'>
              <div className='showCompleted'>
              <label for="showCompleted">Show Published Contents: </label>
              {/* <input type="checkbox" checked={showCompleted} id="showCompleted" onClick={setShowCompleted}></input> */}
              <div className='scCheckboxContainer'><Checkbox
                  ids="showCompleted"
                  isChecked={showCompleted}
                  colorConfig={colorGuide.lightComponents.checkbox}
                  handleChange={setShowCompleted}
              ></Checkbox>
              </div>
              </div>
              <div className='userContainer'>
                <label className='labeldd'>User: </label>
                <Dropdown id="userDrop" class="reactDropdown" visibility={visibility} changeVisibility={changeVisibility} options={options} value={value} label={label} setLabel={setLabel} setValue={setValue}/>
                {/* <input list="vendors" id="vendor" name="vendorList" onChange={setForUser}/>
                <datalist id="vendors">
                    {
                        options.map(item=>(
                            <option name={item.name} data-value={item.id} value={item.name}></option>
                        ))
                    }
                </datalist> */}
              </div>
            </div>
            <div className='adButtonContainer'>
          
            
            <Button variant="primary"
            kind="elevated"
            size="small"
            colorMode="light" onClick={MoveNewRow} value="submit">Add row</Button>
          
          </div>
          </div>
          <div className='tableContainer'>
            <table className="tableElement">
              <thead>
                <tr>
                    <th>Entry ID</th>
                    <th>App name</th>
                    <th>Publish comment</th>
                    <th>App ZFA</th>
                    <th>Publisher</th>
                    <th>Published On</th>
                    <th>Published in COM</th>
                    <th>Published in Other DCs</th>
                </tr>
              </thead>
              <tbody>
              {
                (data!==null||data!==undefined)?(<TableProps root={root} data={data} setData={setData} user={user} putPublishData={putPublishData} showCompleted={showCompleted} checkboxClick={checkboxClick} linkClick={linkClick}/>):(<></>)
              }
              </tbody>
            </table>
          </div>
        </div>
      );
  }
  export default Table;