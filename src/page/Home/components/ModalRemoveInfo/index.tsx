import { Box, Button, Grid, Modal } from "@mui/material";
import { api } from "../../../../services";

interface IModalRemoveInfo{
    isModalOpen: boolean;
    closeModal: ()=>void;
    id: string;
    tableName:string;
}

export function ModalRemoveInfo({isModalOpen, closeModal, id, tableName}: IModalRemoveInfo){
 
    async function removeInfo(){
        if(tableName ==='vehicle'){
            try{
                await api.delete(`vehicle/${id}`);
            }catch(e){

            }
        }
        if(tableName ==='driver'){
            try{
                await api.delete(`driver/${id}`);
            }catch(e){

            }
        }
        closeModal();
    }
    return(
        <Modal open={isModalOpen} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Box sx={{background: 'white', width: '100%',maxWidth: '30rem', margin: 'auto', padding: '1rem'}}>
            <h2>Tem certeza que deseja remover essa informação?</h2>
            <Grid display={'flex'} justifyContent={'center'} gap={2}>
                <Button variant="contained" color="error" onClick={closeModal}>Cancelar</Button>
                <Button variant="contained" color="success" onClick={removeInfo}>Confirmar</Button>
            </Grid>  
            </Box>
        </Modal>
    )
}