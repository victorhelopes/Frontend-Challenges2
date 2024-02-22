import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ModalAddVehicle } from "./components/ModalAddVehicle";
import { Checkbox, Container, Grid, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { api } from "../../services";
import { ModalAddDriver } from "./components/ModalAddDriver";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalRemoveInfo } from "./components/ModalRemoveInfo";
import { Edit } from "@mui/icons-material";
import { AlertMessage } from "../../components/AlertMessage";
import { ITable } from "../../common/types";
import { driverTableHeader, vehicleTableHeader } from "../../constants";
import { DriverInfos } from "./components/DriverInfos";

export function Home(){
    const [reload, setReload] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    
    const [modalAddVehicleIsOpen, setModalAddVehicleIsOpen] = useState<boolean>(false);
    const [modalAddDriverIsOpen, setModalAddDriverIsOpen] = useState<boolean>(false);
    const [modaRemoveInfoIsOpen, setModalRemoveInfoIsOpen] = useState<boolean>(false);
    const [idInfoRemovingOrediting, setIdInfoRemovingOrEditing] = useState<string>('');

    const [listItems, setListItems] = useState<string>('driver');
    const [tableHeaderAndFields, setTableHeaderAndFields] = useState<ITable[]>(driverTableHeader)
    const [data, setData] = useState([]);

    function getData(){
        let infos = ''
        if(listItems ==='vehicle'){   
            infos = localStorage.getItem('vehicles') || ''
        }
        
        if(listItems ==='driver'){
            infos = localStorage.getItem('drivers') || ''
        }
        infos? setData(JSON.parse(infos)): setData([])
        setReload(!reload)
    }

    useEffect(()=>{
        async function getVehicles(){
            try {
                const { data } = await api.get('vehicle');
                localStorage.setItem('vehicles', JSON.stringify(data))
                getData();
            } catch (error) {
                setMessage('Erro ao realizar busca!');
                setShowAlert(true)
                
            }
        }

        async function getDrivers(){
            try {
                const { data } = await api.get('driver');
                localStorage.setItem('drivers', JSON.stringify(data))
                getData();
            } catch (error) {
                setMessage('Erro ao realizar busca!');
                setShowAlert(true)
            }
        }        

        if(listItems ==='vehicle' && !modalAddVehicleIsOpen){
            getVehicles();
            setTableHeaderAndFields(vehicleTableHeader)   
        }
        if(listItems ==='driver' && !modalAddDriverIsOpen){
            setTableHeaderAndFields(driverTableHeader)
            getDrivers();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[listItems, modalAddVehicleIsOpen, modalAddDriverIsOpen, modaRemoveInfoIsOpen])
    
   function rowIsSelected(id: string){
    let selected = false
    const info = localStorage.getItem('driverSelected')
    if(info){
        const data = JSON.parse(info)
        if(data.id && data.id === id){
            selected=true
        }
    }
    return selected
   }

    return(
        <Container sx={{paddingX: {md:10, sm:2}}}>
            <Header setModalIsOpen={(value: string)=>{
                if(value === 'driver')
                setModalAddDriverIsOpen(true);
                if(value === 'vehicle')
                    setModalAddVehicleIsOpen(true)
                }}
                setListItems={(value: string)=>{ setListItems(value)}}
            />

            <DriverInfos reload={reload}/>
            
            <Grid overflow={{xs: 'scroll', md: 'visible'}}>
                <Table sx={{marginTop: 5}}>
                    <TableHead>
                        {tableHeaderAndFields.map((item)=>{
                            return <TableCell>{item.header}</TableCell>
                        })
                        }
                    </TableHead>
                    <TableBody>
                        {data.length === 0?
                            <TableRow>
                                <TableCell colSpan={tableHeaderAndFields.length} sx={{textAlign: 'center'}}>
                                    Não há informações para serem mostradas no momento 
                                </TableCell>
                            </TableRow>
                        :    
                            data.map((infomartion: any)=>{
                                return( 
                                    <TableRow>
                                        {tableHeaderAndFields.map((tableHeaderAndField)=>{
                                            if(tableHeaderAndField.field === 'select'){
                                                if(rowIsSelected(infomartion.id)){
                                                    localStorage.setItem('driverSelected', JSON.stringify(infomartion))
                                                }
                                                return (
                                                    <TableCell>
                                                        <Checkbox checked={rowIsSelected(infomartion.id)} onClick={()=>{
                                                            localStorage.setItem('driverSelected', JSON.stringify(infomartion))
                                                            getData();
                                                        }}/>
                                                    </TableCell>)
                                            }
                                            if(tableHeaderAndField.field === 'action'){
                                                return (
                                                <TableCell>
                                                    <IconButton 
                                                        onClick={()=>{
                                                            setIdInfoRemovingOrEditing(infomartion.id)
                                                            if(listItems ==='driver'){
                                                                setModalAddDriverIsOpen(true)
                                                            }
                                                            if(listItems ==='vehicle'){
                                                                setModalAddVehicleIsOpen(true)
                                                            }
                                                        }}>
                                                            <Edit/>
                                                        </IconButton>
                                                    <IconButton 
                                                        onClick={()=>{
                                                            setModalRemoveInfoIsOpen(true)
                                                            setIdInfoRemovingOrEditing(infomartion.id)
                                                        }}>
                                                            <DeleteIcon/>
                                                        </IconButton>
                                                </TableCell>)
                                            }
                                            if(tableHeaderAndField.field === 'vehicle_id'){
                                            return <TableCell>
                                                {infomartion[tableHeaderAndField.field]?.length? 'Sim': 'Não'}
                                            </TableCell>
                                            }
                                            return <TableCell>
                                            {infomartion[tableHeaderAndField.field]}
                                            </TableCell>
                                        })}
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </Grid>

            <ModalAddVehicle 
                id={idInfoRemovingOrediting}
                isModalOpen={modalAddVehicleIsOpen} 
                closeModal={()=>{
                    setIdInfoRemovingOrEditing('')
                    setModalAddVehicleIsOpen(false);
                }}/>
            <ModalAddDriver 
                id={idInfoRemovingOrediting}
                isModalOpen={modalAddDriverIsOpen} 
                closeModal={()=>{
                    setIdInfoRemovingOrEditing('')
                    setModalAddDriverIsOpen(false);
                }}/>
            <ModalRemoveInfo isModalOpen={modaRemoveInfoIsOpen} closeModal={()=>{setModalRemoveInfoIsOpen(false)}} tableName={listItems} id={idInfoRemovingOrediting}/>
            {showAlert && <AlertMessage message={message} close={()=>{setShowAlert(false)}}/>}
        </Container>
    )
}