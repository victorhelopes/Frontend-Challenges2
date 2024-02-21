import { Button, Grid, Menu, MenuItem } from '@mui/material'
import gobraxLogo from '../../assets/gobraxLogo.png'
import { useState } from 'react';

interface IHeader{
    setModalIsOpen: (value: string)=>void;
    setListItems: (value: string)=> void;
}

export function Header({setModalIsOpen, setListItems}: IHeader){
    const [anchorElDriver, setAnchorElDriver] = useState(null);
    const [anchorElVehicle, setAnchorElVehicle] = useState(null);
    const openDriver = Boolean(anchorElDriver);
    const openVehicle = Boolean(anchorElVehicle);

    const handleOpenDriver = (event: any) => {
        setAnchorElDriver(event.currentTarget);
    };
    const handleOpenVehicles = (event: any) => {
        setAnchorElVehicle(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorElDriver(null);
        setAnchorElVehicle(null);
    };

    return(
        <Grid display="flex" justifyContent="space-between" alignItems="center" paddingTop={2.5}>
            <div>
                <Button onClick={handleOpenDriver}>Motorista</Button>
                <Menu onClose={handleClose} open={openDriver} anchorEl={anchorElDriver}>
                    <MenuItem 
                        onClick={()=>{
                            setModalIsOpen('driver');
                            handleClose()
                        }}
                    >
                        Cadastrar motorista
                    </MenuItem>
                    <MenuItem 
                        onClick={()=>{
                            setListItems('driver');
                            handleClose()
                        }}
                    >
                        Listar motoristas
                    </MenuItem>
                </Menu>
                <Button onClick={handleOpenVehicles}>Veículos</Button>
                <Menu onClose={handleClose} open={openVehicle} anchorEl={anchorElVehicle}>
                    <MenuItem 
                        onClick={()=>{
                            setModalIsOpen('vehicle');
                            handleClose()
                        }}
                    >
                        Cadastrar veículo
                    </MenuItem>
                    <MenuItem 
                        onClick={()=>{
                            setListItems('vehicle');
                            handleClose()
                        }}
                    >
                        Listar veículos
                    </MenuItem>
                </Menu>
            </div>
            <img src={gobraxLogo} alt='gobraxLogo'/>
            <Button href='https://www.linkedin.com/in/victor-hugo-eust%C3%A1quio-lopes-432a88a7/' variant="contained" color='primary'>LinkedIn</Button>
        </Grid>
    )
}