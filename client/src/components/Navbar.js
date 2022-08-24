import React, { useRef, useState, useContext }  from 'react';
import { Toolbar } from 'primereact/toolbar';
import { Button } from 'primereact/button';
import { SplitButton } from 'primereact/splitbutton';
import { Toast } from 'primereact/toast';
import { InputText } from 'primereact/inputtext';
import { Sidebar } from 'primereact/sidebar';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { types } from '../helpers/Types';
import { getCars, setNewCar, getCarsBy } from '../services/CarService';
import { CarContext } from '../context/CarProvider';

const Navbar = () => {

    const toast = useRef(null);
    const [createVisible, setCreateVisible] = useState(false); 
    const [createConfirm, setCreateConfirm] = useState(false); 
    const [filter, setFilter] = useState('Placa')
    const [selection, setSelection] = useState('Vehiculos')
    const [findtext, setFindtext] = useState('')
    const [currentPlaca, setCurrentPlaca] = useState(''); 
    const [currentMarca, setCurrentMarca] = useState(''); 
    const [currentModelo, setCurrentModelo] = useState(''); 
    const [currentSerie, setCurrentSerie] = useState(''); 
    const [currentColor, setCurrentColor] = useState(''); 
    
    const [car, dispatch] = useContext(CarContext)
    const { cars } = car

    const handleRead = () => {
        getCars().then(resp => {
            if (resp !== null){
                dispatch({ type: types.setCar, newCars: resp.data.cars })
                toast.current.show({severity:'success', summary: 'Success Message', detail:'Se han obtenido los vehiculos', life: 3000});
            }else{
                toast.current.show({severity:'error', summary: 'Error Message', detail:'No se han obtenido los vehiculos', life: 3000});
            }
        })
    }

    const refreshCars = () => {
        getCars().then(resp => {
            if (resp !== null){
                dispatch({ type: types.setCar, newCars: resp.data.cars })
            }
        })
    }

    const selectItems = [
        {
            label: 'Vehiculos',
            icon: 'pi pi-car',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Vehiculos seleccionados', life: 3000});
                setSelection('Vehiculos')
                dispatch({ type: types.setContent, setContent: 'vehiculos' })
            }
        },
        {
            label: 'Pilotos',
            icon: 'pi pi-user',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Pilotos seleccionados', life: 3000});
                setSelection('Pilotos')
                dispatch({ type: types.setContent, setContent: 'pilotos' })
            }
        }
    ]

    const items = [
        {
            label: 'Placa',
            icon: 'pi pi-id-card',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Se ha seleccionado el filtro de Placa', life: 3000});
                setFilter('Placa')
            }
        },
        {
            label: 'Marca',
            icon: 'pi pi-tag',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Se ha seleccionado el filtro de Marca', life: 3000});
                setFilter('Marca')
            }
        },
        {
            label: 'Modelo',
            icon: 'pi pi-car',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Se ha seleccionado el filtro de Modelo', life: 3000});
                setFilter('Modelo')
            }
        },
        {
            label: 'Serie',
            icon: 'pi pi-briefcase',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Se ha seleccionado el filtro de Serie', life: 3000});
                setFilter('Serie')
            }
        },
        {
            label: 'Color',
            icon: 'pi pi-palette',
            command: (e) => {
                toast.current.show({severity:'info', summary: 'Info Message', detail:'Se ha seleccionado el filtro de Color', life: 3000});
                setFilter('Color')
            }
        }
    ]

    const createCar = () => {
        if(currentPlaca !== '' && currentMarca !== '' && currentModelo !== '' && currentSerie !== '' && currentColor !== ''){
            const newVehicle = {
                placa: currentPlaca,
                marca: currentMarca,
                modelo: currentModelo,
                serie: currentSerie,
                color: currentColor
            } 
            setNewCar(newVehicle).then(resp => {
                if (resp !== null){
                    refreshCars()
                    toast.current.show({severity:'success', summary: 'Success Message', detail:'Se ha creado el vehiculo: '+currentPlaca, life: 3000});
                }else{
                    toast.current.show({severity:'error', summary: 'Error Message', detail:'Error al crear el vehiculo', life: 3000});
                }
            })
        }else{
            toast.current.show({severity:'error', summary: 'Error Message', detail:'No pueden haber campos vacios', life: 3000});
        }
        setCreateConfirm(false)
        setCurrentPlaca('')
        setCurrentMarca('')
        setCurrentModelo('')
        setCurrentSerie('')
        setCurrentColor('')
    }

    const filterCars = () =>{
        getCarsBy(filter.toLocaleLowerCase(), findtext).then(resp => {
            if (resp !== null){
                dispatch({ type: types.setCar, newCars: resp.data.cars })
                toast.current.show({severity:'success', summary: 'Success Message', detail:'Se ha filtrado por '+filter, life: 3000});
            }else{
                toast.current.show({severity:'error', summary: 'Error Message', detail:'No se han obtenido los vehiculos', life: 3000});
            }
        })
    }

    const leftContents = (
        <React.Fragment>
            <div className='ml-3 mr-8'>
                <h2>Transportes</h2>
            </div>
            <SplitButton label={selection} icon="pi pi-filter" model={selectItems} className="p-button-primary mr-2"></SplitButton>
            <Button label="Create" icon="pi pi-plus" className="p-button-info mr-2" onClick={() => { setCreateVisible(true); }}/>
            <Button label="Read" icon="pi pi-book" className="p-button-success" onClick={() => { handleRead() }} />
        </React.Fragment>
    );

    const rightContents = (
        <React.Fragment>
            <Button icon="pi pi-search" className="mr-2" onClick={() => { filterCars() }}/>
            <InputText id="in" value={findtext} onChange={(e) => setFindtext(e.target.value)} className="mr-2" />
            <SplitButton label={filter} icon="pi pi-filter" model={items} className="p-button-warning"></SplitButton>
        </React.Fragment>
    );

    return (
        <div>
            <Toast ref={toast} position="bottom-right"/>
            <Toolbar left={leftContents} right={rightContents} />
            <Sidebar visible={createVisible} position="left" className="p-sidebar-sm" onHide={() => { setCreateVisible(false); setCurrentPlaca('');}}>
                <h1>Creating Car</h1>
                <div className="flex flex-column card-container mx-8 my-4">
                    <div className="my-2 flex align-items-center justify-content-center">
                        <InputText placeholder='Placa' value={currentPlaca} onChange={(e) => setCurrentPlaca(e.target.value)} />
                    </div>
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
                        <Button label='Create' icon="pi pi-plus" className="mr-2" onClick={() => { setCreateConfirm(true) }} />
                    </div>
                </div>
            </Sidebar>
            <ConfirmDialog visible={createConfirm} onHide={() => setCreateConfirm(false)} message="Are you sure you want to create?"
                header="Confirmation" icon="pi pi-exclamation-triangle" accept={() => { createCar() }} reject={() => { setCreateConfirm(false) }} />
        </div>
    )

}
export default Navbar