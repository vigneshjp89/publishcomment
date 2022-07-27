import React,{Component, useState, useEffect, useCallback} from 'react';
import DateTimePicker from 'react-datetime-picker';
import Table from './Table';
import ReactDOM from 'react-dom/client';
import {copyJSONObject} from './jshelper';
import {Button} from '@cred/neopop-web/lib/components';
import '../index.css';
import Dropdown from '../dropdown/Dropdown';
import {  Checkbox } from '@cred/neopop-web/lib/components';
import { colorGuide, colorPalette, FontVariant } from '@cred/neopop-web/lib/primitives';
import '../App.css';

function NewRowForm({root,data,setData,showCompleted,putPublishData,setShowCompleted,setValue,setLabel,label,value,options,visibility,changeVisibility}){
    const [islz,setIslz]=useState(false);
    // const [options,setOptions]=useState([]);
    const [zfa,setZfa]=useState();
    const [publishedOn,setPublishedOn]=useState(new Date());
    
    // useEffect(()=>{
    //     fetch('/api/publisher').then(res=>res.json()).then(resp=>{
    //         console.log("in newform useEff:"+resp);
    //         setOptions(resp);
    //     }).catch(err=>{console.log(err)})
    // },[]);
    function addRow(val){
        try{
        setData([...data,val]);
        return true;
        }
        catch(e){
            console.log("error"+e);
            return false;
        }
    }
    
    useEffect(()=>{
        if(zfa!==undefined&&zfa!==null){
        setZfa(reconstructZFA({islz}));
        }
    },[islz]);
    function handleCancel(){
        root.render(<Table root={root} data={data} setData={setData} showCompleted={showCompleted} putPublishData={putPublishData} setShowCompleted={setShowCompleted}/>);
    }
    function handleSubmit(){
        //let vendor=document.getElementById('vendor')
        
        //let publisher=(vendor.value)?(vendor.list.options.namedItem(vendor.value).getAttribute('data-value')):null;
        let comment=document.getElementById('comment').value;
        let constructData={app_name:zfa.zfa.service.displayName,app_link:zfa.zfa.service.linkName,comment:comment,publisher:label,publisherId:value,incom:false,inother:false,enabled:true};
        let temp=copyJSONObject(data);
        fetch('/api/zfa',{method:'POST',headers:{"content-type":"application/json"},body:JSON.stringify({app_link:zfa.zfa.service.linkName,zfaFile:zfa.zfa})}).then(res=>res.json()).then(zfares=>{
            console.log(zfares);
            fetch(`/api/app?app_link=${encodeURI(constructData.app_link)}`).then(res=>res.json()).then(res=>{
                console.log("applink resp"+res);
                if((res.length<=0||res[0]==undefined)){
                    fetch('/api/app',{method:'POST',body:JSON.stringify({app_link:constructData.app_link,app_name:zfa.zfa.service.displayName,zhash:zfares.zhash}),headers:{'Content-Type':'application/json'}});
                }else{
                    fetch('/api/app',{method:'PUT',body:JSON.stringify({app_link:constructData.app_link,zhash:zfares.zhash}),headers:{'Content-Type':'application/json'}});
                }
                fetch('/api/publish/nextId').then(res=>res.json()).then(res=>{
                    
                    constructData["id"]=res.nextId;
                    constructData['publishedBy']=label;
                    
                    console.log("nextId"+res);
                    //temp.push(constructData);
                    console.log("temp at add row: "+temp);
                    constructData["zfa"]=zfares.zhash;
                    
                    fetch('/api/publish',{method:'POST',body:JSON.stringify(constructData),headers:{'Content-Type':'application/json'}}).then(res=>res.json()).then(res=>{
                        console.log(data);
                        constructData["publishedOn"]=res.data.publishedOn;
                        data[constructData.id]=copyJSONObject(constructData);
                        setData(data);
                        root.render(
                            <Table root={root} data={data} setData={setData} showCompleted={showCompleted} putPublishData={putPublishData} setShowCompleted={setShowCompleted}/>
                        )
                    })
                });
            })
        });
        
    }
    function reconstructZFA({islz}){
        let temp=zfa;
        temp.islz=islz;
        return temp;
    }
    function setFile(e){
        let FileList=e.target.files;
        let file=FileList[0];
        
        let read = new FileReader();
        read.readAsText(file,'UTF-8');
        read.onloadend = function(){
            //let islz=document.getElementById("islz").checked;
            if(islz){
                setZfa({filename:file.name,islz:true,zfa:JSON.parse(read.result)});
            }else{
                setZfa({filename:file.name,islz:false,zfa:JSON.parse(read.result)});
            }
        }
    }

    return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <label>ZFA: </label>
                            </td>
                            <td>
                                <input type="file" className="custom-file-input" name="docx" onChange={setFile} required/>
                            </td>
                        </tr>
                        {/* <tr>
                            <td>
                                <label>Is LocalZoho</label>
                                <Checkbox
                                    id="islz"
                                    value={islz}
                                    isChecked={islz}
                                    colorConfig={colorGuide.lightComponents.checkbox}
                                    handleChange={(val)=>(setIslz(val.target.checked))}
                                ></Checkbox>
                                {/* <input type="checkbox" id="islz" value={islz} onChange={(val)=>(setIslz(val.target.checked))}></input> */}
                                
                            {/*</td>
                        </tr> */}
                        <tr>
                            <td colSpan={2}>
                                <label>Comment:</label>
                            </td>
                        </tr>
                        <tr  rowSpan={2}>
                            <td  colSpan={2}>
                                <textarea id="comment"></textarea>
                            </td>
                        </tr>
                        <tr rowSpan={3}>
                            <td>
                                <label>Published By:</label>
                            </td>
                            <td>
                            <Dropdown id="userDrop" class="reactDropdown" visibility={visibility} changeVisibility={changeVisibility} options={options} value={value} label={label} setLabel={setLabel} setValue={setValue}/>
                            {/* <input list="vendors" id="vendor" name="vendorList" />
                            <datalist id="vendors">
                                {
                                    options.map(item=>(
                                        <option name={item.name} data-value={item.id} value={item.name}></option>
                                    ))
                                }
                            </datalist> */}
                            </td>
                        </tr>
                        {/* <tr>
                            <td><label>Published On:</label></td><td><DateTimePicker onChange={setPublishedOn} value={publishedOn} /></td>
                        </tr> */}
                        <tr>
                            <td>
                                <Button variant="primary"
                                    kind="elevated"
                                    size="big"
                                    colorMode="dark" onClick={handleSubmit} value="submit">Submit</Button>
                            </td>
                            <td>
                                <Button variant="primary"
                                        kind="elevated"
                                        size="big"
                                        colorMode="dark" onClick={handleCancel} value="cancel">Cancel</Button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
}
export default NewRowForm;