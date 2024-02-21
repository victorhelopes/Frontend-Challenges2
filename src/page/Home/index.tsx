import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ModalAddVehicle } from "./components/ModalAddVehicle";
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { api } from "../../services";
import { ModalAddDriver } from "./components/ModalAddDriver";

interface ITable{
    header: string;
    field: string;
}

const driverTableHeader:ITable[] = [{header:'Id', field: 'id'},{header: 'Nome', field: 'name'}, {header:'Documento', field:'document'}, {header:'Vínculo', field:'vehicle_id'}]
const vehicleTableHeader: ITable[] = [{header:'Id', field: 'id'},{header: 'Marca', field: 'brand'}, {header:'Placa', field:'licensePlate'}]

export function Home(){
    const [modalVehicleIsOpen, setModalVehicleIsOpen] = useState<boolean>(false);
    const [modalDriverIsOpen, setModalDriverIsOpen] = useState<boolean>(false);
    const [listItems, setListItems] = useState<string>('');
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
    },[listItems, modalVehicleIsOpen, modalDriverIsOpen])

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
        </Container>
    )
}