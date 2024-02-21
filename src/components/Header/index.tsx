import * as React from 'react';
import { Button, Grid, Menu, MenuItem } from '@mui/material'
import gobraxLogo from '../../assets/gobraxLogo.png'

interface IHeader{
    setModalIsOpen: ()=>void;
}

export function Header({setModalIsOpen}: IHeader){
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return(
        <Grid display="flex" justifyContent="space-between" alignItems="center" paddingTop={2.5}>
            <Button onClick={handleClick}>Veículos</Button>
                <Menu onClose={handleClose} open={open} anchorEl={anchorEl}>
                    <MenuItem 
                        onClick={()=>{
                            setModalIsOpen();
                            handleClose()
                        }}
                    >Cadastrar veículo</MenuItem>
                </Menu>
            <img src={gobraxLogo} alt='gobraxLogo'/>
            <Button href='https://www.linkedin.com/in/victor-hugo-eust%C3%A1quio-lopes-432a88a7/' variant="contained" color='primary'>LinkedIn</Button>
        </Grid>
    )
}