import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ModalAddVehicle } from "./components/ModalAddVehicle";
import { Container, IconButton, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { api } from "../../services";
import { ModalAddDriver } from "./components/ModalAddDriver";
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalRemoveInfo } from "./components/ModalRemoveInfo";

interface ITable{
    header: string;
    field: string;
}

const driverTableHeader:ITable[] = [
    {header:'Id', field: 'id'},
    {header: 'Nome', field: 'name'}, 
    {header:'Documento', field:'document'}, 
    {header:'Vínculo', field:'vehicle_id'}, 
    {header: '', field:'action'}
]
const vehicleTableHeader: ITable[] = [
    {header:'Id', field: 'id'},
    {header: 'Marca', field: 'brand'}, 
    {header:'Placa', field:'licensePlate'},
    {header: '', field:'action'}
]

export function Home(){
    const [modalVehicleIsOpen, setModalVehicleIsOpen] = useState<boolean>(false);
    const [modalDriverIsOpen, setModalDriverIsOpen] = useState<boolean>(false);
    const [modaRemoveInfoIsOpen, setModalRemoveInfoIsOpen] = useState<boolean>(false);
    const [idInfoRemoving, setIdInfoRemoving] = useState<string>('');

    const [listItems, setListItems] = useState<string>('driver');
    const [tableHeaderAndFields, setTableHeaderAndFields] = useState<ITable[]>(driverTableHeader)
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getVehicles(){
            try {
                const { data } = await api.get('vehicle');
                setData(data)
            } catch (error) {
                console.log(error);
            }
        }
       
        async function getDrivers(){
            try {
                const { data } = await api.get('driver');
                setData(data)
            } catch (error) {
                console.log(error);
            }
        }
        
        if(listItems ==='vehicle' && !modalVehicleIsOpen){
            setTableHeaderAndFields(vehicleTableHeader)
            getVehicles();
        }
        if(listItems ==='driver' && !modalDriverIsOpen){
            setTableHeaderAndFields(driverTableHeader)
            getDrivers();
        }
    },[listItems, modalVehicleIsOpen, modalDriverIsOpen, modaRemoveInfoIsOpen])

    return(
        <Container sx={{paddingX: {md:10, sm:2}}}>
            <Header setModalIsOpen={(value: string)=>{
                if(value === 'driver')
                setModalDriverIsOpen(true);
                if(value === 'vehicle')
                    setModalVehicleIsOpen(true)
                }}
                setListItems={(value: string)=>{ setListItems(value)}}
            />

            <Table sx={{marginTop: 5}}>
                <TableHead>
                    {tableHeaderAndFields.map((item)=>{
                        return <TableCell>{item.header}</TableCell>
                    })
                    }
                </TableHead>
                <TableBody>
                    {data.length === 0 ? 
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
                                        if(tableHeaderAndField.field === 'action'){
                                            return (
                                            <TableCell>
                                                <IconButton 
                                                    onClick={()=>{
                                                        setModalRemoveInfoIsOpen(true)
                                                        setIdInfoRemoving(infomartion.id)
                                                    }}><DeleteIcon/></IconButton>
                                            </TableCell>)
                                        }
                                        if(tableHeaderAndField.field === 'vehicle_id'){
                                        return <TableCell>
                                            {infomartion[tableHeaderAndField.field].length? 'Sim': 'Não'}
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

            <ModalAddVehicle isModalOpen={modalVehicleIsOpen} closeModal={()=>{setModalVehicleIsOpen(false)}}/>
            <ModalAddDriver isModalOpen={modalDriverIsOpen} closeModal={()=>{setModalDriverIsOpen(false)}}/>
            <ModalRemoveInfo isModalOpen={modaRemoveInfoIsOpen} closeModal={()=>{setModalRemoveInfoIsOpen(false)}} tableName={listItems} id={idInfoRemoving}/>
        </Container>
    )
}