import {useState, useEffect} from "react";

import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import {ToggleButton} from 'primereact/togglebutton';

function Todo(props) {

    const [status, setStatus] = useState(props.status);
    const [time, setTime] = useState(0);
    const [clicked, setClicked] = useState(false);

    let i = 0;

    useEffect(() => {
        let interval = null;
        if (clicked) {
            interval = setInterval(() => {
                i++
                if (i === 10) {
                    props.onChecked(props.id)
                    clearInterval(interval);
                }
            }, 1000);
        } else {
            i = 0
            clearInterval(interval);
        }
        return () => {
            i = 0;
            clearInterval(interval);
        };
    });

    const options = [
        { value: 'Done', icon: 'pi pi-check' },
        { value: 'Not done', icon: 'pi pi-ellipsis-h' }
    ];

    const footer = <span>
        <Button label="Delete" className="p-button-raised p-button-rounded p-button-danger" onClick={() => props.onDeleteElement(props)} style={{marginRight: '15px'}} />
        <Button label="Update" className="p-button-raised p-button-rounded p-button-primary" onClick={() => props.onUpdateElement(props)} />
    </span>

    const updateStatus = () => {
        setClicked(!clicked)
        setStatus(!status);
    }

    return (
        <div style={{margin: '15px', width: '35%'}}>
            <Card title={props.title} footer={footer}>
                <div>
                    <span>
                        <ToggleButton className="p-button-warning" onLabel="Done" offLabel="Not done" onIcon="pi pi-check" offIcon="pi pi-times" checked={status} onChange={() => updateStatus()}/>
                    </span>
                </div>
            </Card>
        </div>
    )
}

export default Todo;