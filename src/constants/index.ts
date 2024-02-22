import { ITable } from "../common/types"

export const FIVE_SECONDS = 5000

export const driverTableHeader:ITable[] = [
    {header:'', field: 'select'},
    {header:'Id', field: 'id'},
    {header: 'Nome', field: 'name'}, 
    {header:'Documento', field:'document'}, 
    {header:'Vínculo', field:'vehicle_id'}, 
    {header: '', field:'action'}
]

export const vehicleTableHeader: ITable[] = [
    {header:'Id', field: 'id'},
    {header: 'Marca', field: 'brand'}, 
    {header:'Placa', field:'licensePlate'},
    {header: '', field:'action'}
]