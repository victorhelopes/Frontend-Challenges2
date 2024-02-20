import { useState } from "react";
import { Header } from "../../components/Header";
import { ModalAddVehicle } from "./components/ModalAddVehicle";

export function Home(){
    const [modalIsOpen, setModalIsOpen] = useState(false);

    return(
        <>
            <Header setModalIsOpen={()=>{setModalIsOpen(true)}}/>
            <ModalAddVehicle isModalOpen={modalIsOpen} closeModal={()=>{setModalIsOpen(false)}}/>
        </>
    )
}