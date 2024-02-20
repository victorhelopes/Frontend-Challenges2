import { Button, Grid, Menu, MenuItem } from '@mui/material'
import gobraxLogo from '../../assets/gobraxLogo.png'
import { useState } from 'react'

interface IHeader{
    setModalIsOpen: ()=>void;
}

export function Header({setModalIsOpen}: IHeader){
    const [menuIsOpen, setMenuIsOpen] = useState(false)
    return(
        <Grid display="flex" justifyContent="space-between" alignItems="center" paddingX={{sm: 1 ,md: 11}} paddingTop={2.5}>
            <div>
                <Button onClick={()=>{setMenuIsOpen(!menuIsOpen)}}>Veículos</Button>
                <Menu open={menuIsOpen}>
                    <MenuItem 
                        onClick={()=>{
                            setModalIsOpen();
                            setMenuIsOpen(!menuIsOpen)
                        }}
                    >Cadastrar veículo</MenuItem>
                </Menu>
            </div>
            <img src={gobraxLogo} alt='gobraxLogo'/>
            <Button href='https://www.linkedin.com/in/victor-hugo-eust%C3%A1quio-lopes-432a88a7/' variant="contained" color='primary'>LinkedIn</Button>
        </Grid>
    )
}