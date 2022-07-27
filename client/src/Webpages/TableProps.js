import React, {Component, useCallback} from 'react';
import { useEffect,useState } from 'react';
import {copyJSONObject} from './jshelper';
import TableRow from './TableProps';
import {Button} from '@cred/neopop-web/lib/components';
import {  Checkbox } from '@cred/neopop-web/lib/components';
import '../index.css';
import { colorGuide, colorPalette, FontVariant } from '@cred/neopop-web/lib/primitives';

function TableProps({root,data,setData,user,putPublishData,showCompleted,checkboxClick,linkClick}){
    // useEffect(() => {
    //     setData();
    //   }, [data]);
    // useEffect(()=>{
    //     window.alert(JSON.stringify(data));
    //   },[data,setData]);
    //const [checked,setChecked]=useState(false);
    console.log(data);
    console.log("In TProps"+JSON.stringify(data));
    // function checkboxClick(e){
    //     console.log("clicked");
    //     if(e.target.id.indexOf("incom_")>=0){
    //         let index=e.target.id.substring(e.target.id.indexOf('_')+1,e.target.id.length);
    //         let temp=copyJSONObject(data[index]);
    //         temp.incom=e.target.checked;
    //         if((temp.inother===true||temp.inother===1)&&(temp.incom===true||temp.incom===1)){
    //             temp.enabled=false;
    //         }else{
    //             temp.enabled=true;
    //         }
    //         //let tData=copyJSONObject(data);
    //         data[index]=temp;
    //         setData(data);
    //         putPublishData(temp);
    //     }
    //     if(e.target.id.indexOf("inother_")>=0){
    //         let index=e.target.id.substring(e.target.id.indexOf('_')+1,e.target.id.length);
    //         let temp=copyJSONObject(data[index]);
    //         console.log(e);
    //         temp.inother=e.target.checked;
    //         if((temp.inother===true||temp.inother===1)&&(temp.incom===true||temp.incom===1)){
    //             temp.enabled=false;
    //         }else{
    //             temp.enabled=true;
    //         }
    //         data[index]=temp;
    //         setData(data);
    //         putPublishData(temp);
    //         //let tData=copyJSONObject(data);
            
    //     }
    //   }
    const items=Object.entries(data).map(element => (
                    
        (((!showCompleted&&(element[1].enabled===1||element[1].enabled===true))||(showCompleted))&&(user==null||user===undefined||user===element[1].publishedBy))?(
        <tr>
            <td>{element[1].id}</td>
            <td>{element[1].app_name}</td>
            <td>{element[1].comment}</td>
            <td><a id={`link_${element[1].id}`} onClick={linkClick} href="#" link={`/api/zfa?zhash=${element[1].zfa}`}>{element[1].app_link+".zfa"}</a></td>
            <td>{element[1].publishedBy}</td>
            <td>{element[1].publishedOn}</td>
            <td>
                {/* <input id={"incom_"+(element[1].id)}  type="checkbox" checked={element[1].incom} onChange={checkboxClick}></input> */}
                <Checkbox
                                    id={"incom_"+(element[1].id)}
                                    isChecked={element[1].incom}
                                    colorConfig={colorGuide.lightComponents.checkbox}
                                    handleChange={checkboxClick}
                                ></Checkbox>
            </td>
            <td>
                {/* <input id={"inother_"+(element[1].id)} type="checkbox" checked={element[1].inother} onChange={checkboxClick}></input> */}
                <Checkbox
                                    id={"inother_"+(element[1].id)}
                                    isChecked={element[1].inother}
                                    colorConfig={colorGuide.lightComponents.checkbox}
                                    handleChange={checkboxClick}
                                ></Checkbox>
            </td>
        </tr>
        ):(<></>)
        //    ( <TableRow rowData={element[1]} checkboxClick={checkboxClick}/>)
        // ):(<></>)
        )); 
        console.log(items);
            return (items);
    }
  export default TableProps;