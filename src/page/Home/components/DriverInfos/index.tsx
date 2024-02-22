import { Grid } from "@mui/material";
import { api } from "../../../../services";
import { useEffect, useState } from "react";
import { IDriver, IVehicle } from "../../../../common/types";

interface IDriverInfos {
    reload: boolean
}

export function DriverInfos({reload}: IDriverInfos){
    const [driver, setDriver] = useState<IDriver>({id: '', name: '', document: '', vehicle_id: ''});
    const [vehicle, setVehicle] = useState<IVehicle>({id: '', brand: '', licensePlate: ''});

    useEffect(()=>{
        async function getInfos(){
            const info = localStorage.getItem('driverSelected')
            if(info){
                const driverInfos = JSON.parse(info)
                setDriver(driverInfos)
                if(driverInfos.vehicle_id){
                    const { data } = await api.get(`vehicle/${driverInfos.vehicle_id}`);
                    setVehicle(data)
                }else{
                    setVehicle({id: '', brand: '', licensePlate: ''})
                }
            }
        }
        getInfos();
    },[reload])

    return (
            <Grid sx={{display: 'flex', justifyContent: 'end', flexDirection: 'column', width: '10rem'}}>
            <p>Selecionado:</p>
            <p><b>Motorista:{driver.name}</b> </p>
            <p><b>Veículo:{vehicle.brand} - {vehicle.licensePlate}</b> </p>
        </Grid>

    )
}