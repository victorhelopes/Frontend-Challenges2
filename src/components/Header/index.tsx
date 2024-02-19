import { Button, Grid } from '@mui/material'
import gobraxLogo from '../../assets/gobraxLogo.png'

export function Header(){
    return(
        <Grid display="flex" justifyContent="space-between" alignItems="center" paddingX={11} paddingTop={2.5}>
            <img src={gobraxLogo} alt='gobraxLogo'/>
            <Button href='https://www.linkedin.com/in/victor-hugo-eust%C3%A1quio-lopes-432a88a7/' variant="contained" color='primary'>LinkedIn</Button>
        </Grid>
    )
}