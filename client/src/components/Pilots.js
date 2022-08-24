import React, { useRef, useState, useContext } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { types } from '../helpers/Types';
import { CarContext } from '../context/CarProvider';
import { getCars, delCar, upCar } from '../services/CarService';

const Pilots = () => {

    const toast = useRef(null);
    const [delVisible, setDelVisible] = useState(false);
    const [upVisible, setUpVisible] = useState(false);
    const [upConfirm, setUpConfirm] = useState(false);
    const [currentId, setCurrentId] = useState(''); 
    const [currentPlaca, setCurrentPlaca] = useState(''); 
    const [currentMarca, setCurrentMarca] = useState(''); 
    const [currentModelo, setCurrentModelo] = useState(''); 
    const [currentSerie, setCurrentSerie] = useState(''); 
    const [currentColor, setCurrentColor] = useState(''); 
    const [selectedCar, setSelectedCar] = useState(null);

    const [car, dispatch] = useContext(CarContext)
    const { cars } = car

    const actionBodyDelete = (car) => {
        return <Button label='Delete' icon="pi pi-trash" className="mr-2" onClick={() => { 
            setCurrentPlaca(car.placa); 
            setCurrentId(car.id); 
            setDelVisible(true); 
        }} />
    }

    const actionBodyUpdate = (car) => {
        return <Button label='Update' icon="pi pi-pencil" className="mr-2" onClick={() => { 
            setCurrentId(car.id); 
            setCurrentPlaca(car.placa);
            setCurrentMarca(car.marca);
            setCurrentModelo(car.modelo);
            setCurrentSerie(car.serie);
            setCurrentColor(car.color);
            setUpVisible(true); 
        }} />
    }

    const refreshCars = () => {
        getCars().then(resp => {
            if (resp !== null){
                dispatch({ type: types.setCar, newCars: resp.data.cars })
            }
        })
    }

    const deleteCar = () => {
        delCar(currentId).then(resp => {
            if (resp !== null){
                refreshCars()
                toast.current.show({severity:'warn', summary: 'Warn Message', detail:'Se ha eliminado el vehiculo: '+currentPlaca, life: 3000});
            }else{
                toast.current.show({severity:'error', summary: 'Error Message', detail:'No se han podido eliminar el vehiculo', life: 3000});
            }
        })

        setDelVisible(false)
        setCurrentId('')
        setCurrentPlaca('')
    }

    const updateCar = () => {
        if(currentPlaca !== '' && currentMarca !== '' && currentModelo !== '' && currentSerie !== '' && currentColor !== ''){
            const newVehicle = {
                id: currentId,
                placa: currentPlaca,
                marca: currentMarca,
                modelo: currentModelo,
                serie: currentSerie,
                color: currentColor
            } 
            upCar(newVehicle).then(resp => {
                if (resp !== null){
                    refreshCars()
                    toast.current.show({severity:'success', summary: 'Success Message', detail:'Se ha actualizado el vehiculo: '+currentPlaca, life: 3000});
                }else{
                    toast.current.show({severity:'error', summary: 'Error Message', detail:'No se han podido editar el vehiculo', life: 3000});
                }
            })
        }else{
            toast.current.show({severity:'error', summary: 'Error Message', detail:'No pueden haber campos vacios', life: 3000});
        }
        setUpVisible(false)
        setCurrentId('')
        setCurrentPlaca('')
        setCurrentMarca('')
        setCurrentModelo('')
        setCurrentSerie('')
        setCurrentColor('')
    }

    const renderHeader = () => {
        return (
            <div className="flex justify-content-center align-items-center">
                <h1 className="m-0">Pilotos</h1>
            </div>
        )
    }

    const header = renderHeader();

    return (
        <div>
            <Toast ref={toast} position="bottom-right"/>
            <DataTable value={cars} paginator header={header} rows={5}
            rowHover selection={selectedCar} onSelectionChange={e => setSelectedCar(e.value)}
            filterDisplay="menu" responsiveLayout="scroll"
            globalFilterFields={['placa', 'marca', 'modelo', 'serie', 'color']} emptyMessage="No cars found."
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                <Column field="placa" header="Placa" sortable filter filterPlaceholder="Search by placa"></Column>
                <Column field="marca" header="Marca" sortable filter filterPlaceholder="Search by Marca"></Column>
                <Column field="modelo" header="Modelo" sortable filter filterPlaceholder="Search by Modelo"></Column>
                <Column field="serie" header="Serie" sortable filter filterPlaceholder="Search by Serie"></Column>
                <Column field="color" header="Color" sortable filter filterPlaceholder="Search by Color"></Column>
                <Column body={actionBodyDelete}></Column>
                <Column body={actionBodyUpdate}></Column>
            </DataTable>
            <Sidebar visible={upVisible} position="left" className="p-sidebar-sm" onHide={() => { setUpVisible(false); setCurrentPlaca('');}}>
                <h1>Updating: {currentPlaca}</h1>
                <div className="flex flex-column card-container mx-8 my-4">
                    <div className="my-2 flex align-items-center justify-content-center">
                        <InputText placeholder='Marca' value={currentMarca} onChange={(e) => setCurrentMarca(e.target.value)} />
                    </div>
                    <div className="my-2 flex align-items-center justify-content-center">
                        <InputText placeholder='Modelo' value={currentModelo} onChange={(e) => setCurrentModelo(e.target.value)} />
                    </div>
                    <div className="my-2 flex align-items-center justify-content-center">
                        <InputText placeholder='Serie' value={currentSerie} onChange={(e) => setCurrentSerie(e.target.value)} />
                    </div>
                    <div className="my-2 flex align-items-center justify-content-center">
                        <InputText placeholder='Color' value={currentColor} onChange={(e) => setCurrentColor(e.target.value)} />
                    </div>
                    <div className="my-3 flex align-items-center justify-content-center">
                        <Button className="mr-2" label='Update' icon="pi pi-pencil" onClick={() => { setUpConfirm(true) }} />
                    </div>
                </div>
            </Sidebar>
            <ConfirmDialog visible={delVisible} onHide={() => setDelVisible(false)} message="Are you sure you want to delete?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => { deleteCar() }} reject={() => { setDelVisible(false); setCurrentPlaca('') }} />
            <ConfirmDialog visible={upConfirm} onHide={() => setUpConfirm(false)} message="Are you sure you want to upload?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => { updateCar() }} reject={() => { setUpConfirm(false) }} />
        </div>
    )
}

export default Pilots

