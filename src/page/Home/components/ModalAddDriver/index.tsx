import { Box, Button, Grid, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { api } from "../../../../services";
import TextField from "@mui/material/TextField";
import { cpf } from "cpf-cnpj-validator";

interface IModalAddVehicle{
    isModalOpen: boolean
    closeModal: ()=> void;
}

interface IVehicle {
    brand: string;
    licensePlate: string;
    id: string;
}

export function ModalAddDriver({isModalOpen, closeModal}: IModalAddVehicle){
    const [name, setName] = useState('');
    const [nameError, setNameError] = useState<string | null>();
    
    const [document, setDocument] = useState('');
    const [documentError, setDocumentError] = useState<string | null>();
    
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);
    const [vehicle, setVehicle] = useState<string | null>('');

    useEffect(()=>{
        async function getgVehicles(){
            try {
                const { data } = await api.get('vehicle');
                setVehicles(data)
            } catch (error) {
                console.log(error);
            }
        }

        getgVehicles();
    },[])

    async function addVehicle(){
        if(!name.length){
            setNameError('Escreva o nome do motorista')
        }else{
            setNameError(null)
        }
        
        if(!cpf.isValid(document)){
            setDocumentError('Digite um cpf válido')
        }else{
            setDocumentError(null)
        }

        if(!name.length || !document.length){
            return;
        }

        try{
            const body = {
                name,
                document: cpf.format(document),
                vehicle_id: vehicle
            }
            await api.post('driver', body)
            close();
        }catch(e){
            console.log(e)
        }
    }

    function close(){
        setName('')
        setDocument('')
        setVehicle('')
        setNameError(null)
        setDocumentError(null)
        closeModal()
    }

    return(
        <Modal open={isModalOpen} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Box sx={{background: 'white', width: '100%',maxWidth: '30rem', margin: 'auto', padding: '1rem'}}>
                <Grid display={"flex"} flexDirection={'column'} gap={2}>
                    <h1 style={{marginTop: 0}}>Cadastro de motorista</h1>
                    <Grid display={'flex'} width={'100%'} gap={2}>
                        <TextField 
                            label='Nome'
                            placeholder="Nome"
                            value={name}
                            fullWidth
                            onChange={(e)=>{setName(e.target.value)}}
                            error={nameError !=null}
                            helperText={nameError}
                            />
                        <TextField
                            placeholder="Documento"
                            label="Documento"
                            value={document}
                            onChange={(e)=>{
                                if(e.target.value.length <= 11){
                                    const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                    setDocument(onlyNums)
                                }
                            }}
                            error={documentError !=null}
                            helperText={documentError}
                        />
                    </Grid>
                    <Grid width={'100%'}>
                        <InputLabel disableAnimation shrink={false} focused={false} id='vehicle'>
                                Veículo
                        </InputLabel>
                        <Select
                            fullWidth
                            labelId="vehicle"
                            value={vehicle}
                            disabled={!vehicles.length}
                            onChange={(e)=>{setVehicle(e.target.value)}}
                        >
                            {vehicles.map((vehicle)=>{
                                return <MenuItem value={vehicle.id}>{vehicle.brand} - {vehicle.licensePlate}</MenuItem>
                            })}
                        </Select>
                    </Grid>
                    <Grid display={'flex'} justifyContent={'center'} gap={2}>
                        <Button variant="contained" color="error" onClick={close}>Cancelar</Button>
                        <Button variant="contained" color="success" onClick={addVehicle}>Confirmar</Button>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}