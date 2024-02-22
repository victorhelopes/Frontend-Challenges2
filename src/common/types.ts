export interface IAlertMessage{
    message: string;
    close: ()=> void;
}

export interface IHeader{
    setModalIsOpen: (value: string)=>void;
    setListItems: (value: string)=> void;
}

export interface ITable{
    header: string;
    field: string;
}

export interface IModal{
    id?: string;
    isModalOpen: boolean
    closeModal: ()=> void;
}

export interface IModalRemoveInfo extends IModal {
    tableName:string;
}

export interface IDriver {
    id: string;
    name: string;
    document: string;
    vehicle_id: string;
}

export interface IVehicle {
    brand: string;
    licensePlate: string;
    id: string;
}