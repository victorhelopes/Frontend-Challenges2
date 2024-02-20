import { Box, Button, Grid, Modal, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "../../../../services";

interface IModalAddVehicle{
    isModalOpen: boolean
    closeModal: ()=> void;
}

export function ModalAddVehicle({isModalOpen, closeModal}: IModalAddVehicle){
    const [brand, setBrand] = useState('');
    const [brandError, setBrandError] = useState<string | null>();
    const [licensePlate, setLicensePlate] = useState('');
    const [licensePlateError, setLicensePlateError] = useState<string | null>();

    async function addVehicle(){
        if(!brand.length){
            setBrandError('Escreva o nome da marca do carro')
        }else{
            setBrandError(null)
        }

        if(!licensePlate.length){
            setLicensePlateError('Escreva a placa  do carro')
        }else{
            setLicensePlateError(null)
        }

        if(!brand.length || !licensePlate.length){
            return;
        }

        try{
            await api.post('vehicle', {
                brand,
                licensePlate
            })
            close();
        }catch(e){
            console.log(e)
        }
    }

    function close(){
        setBrand('')
        setLicensePlate('')
        setBrandError(null)
        setLicensePlateError(null)
        closeModal()
    }

    return(
        <Modal open={isModalOpen} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <div>
                <Box sx={{background: 'white', width: '100%',maxWidth: '30rem', margin: 'auto', padding: '1rem'}}>
                    <Grid display={"flex"} flexDirection={'column'} gap={2}>
                    <h1 style={{marginTop: 0}}>Cadastro de veículo</h1>
                    <Grid display={'flex'} width={'100%'} gap={2}>
                        <TextField 
                            label='Marca' 
                            placeholder="Marca"
                            value={brand}
                            onChange={(e)=>{setBrand(e.target.value)}}
                            error={brandError !=null}
                            helperText={brandError}
                        />

                        <TextField 
                            label='Placa' 
                            placeholder="Placa"
                            value={licensePlate}
                            onChange={(e)=>{setLicensePlate(e.target.value)}}
                            error={licensePlateError !=null}
                            helperText={licensePlateError}
                        />
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'} gap={2}>
                        <Button variant="contained" color="error" onClick={close}>Cancelar</Button>
                        <Button variant="contained" color="success" onClick={addVehicle}>Confirmar</Button>
                    </Grid>
                    </Grid>
                </Box>
           </div>
        </Modal>
    )
}