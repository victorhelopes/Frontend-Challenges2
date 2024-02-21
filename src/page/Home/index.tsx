import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { ModalAddVehicle } from "./components/ModalAddVehicle";
import { Container, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { api } from "../../services";

export function Home(){
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data, setData] = useState([]);

    useEffect(()=>{
        async function getgVehicles(){
            try {
                const { data } = await api.get('vehicle');
                setData(data)
            } catch (error) {
                console.log(error);
            }
        }

        getgVehicles();
    },[])

    return(
        <Container sx={{paddingX: {md:10, sm:2}}}>
            <Header setModalIsOpen={()=>{setModalIsOpen(true)}}/>

            <Table sx={{marginTop: 5}}>
                <TableHead>
                    <TableCell>Id</TableCell>
                    <TableCell>Marca</TableCell>
                    <TableCell>Placa</TableCell>
                </TableHead>
                <TableBody>
                    {data.length !== 0 ? 
                        <TableRow>
                            <TableCell colSpan={3} sx={{textAlign: 'center'}}>
                                Não há cadastro de carros no momento 
                            </TableCell>
                        </TableRow>
                    : 
                        data.map((infomartion: any)=>{
                            return(
                                    <TableRow>
                                        <TableCell>
                                        {infomartion.id}
                                        </TableCell>
                                        <TableCell>
                                        {infomartion.brand}
                                        </TableCell>
                                        <TableCell>
                                        {infomartion.licensePlate}
                                        </TableCell>
                                    </TableRow>
                            )
                        })
                    }
                    </TableBody>
            </Table>
            <ModalAddVehicle isModalOpen={modalIsOpen} closeModal={()=>{setModalIsOpen(false)}}/>
        </Container>
    )
}