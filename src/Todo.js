import {useState} from "react";

import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import {MultiStateCheckbox} from 'primereact/multistatecheckbox';

function Todo(props) {

    const [value, setValue] = useState(null);
    const options = [
        { value: 'Done', icon: 'pi pi-check' },
        { value: 'Not done', icon: 'pi pi-ellipsis-h' }
    ];

    const footer = <span>
        <Button label="Delete" className="p-button-raised p-button-rounded p-button-danger" onClick={() => props.onDeleteElement(props)} style={{marginRight: '15px'}} />
        <Button label="Update" className="p-button-raised p-button-rounded p-button-primary" onClick={() => props.onUpdateElement(props)} />
    </span>

    const header = <span>

    </span>

    return (
        <div style={{margin: '15px', width: '35%'}}>
            <Card title={props.title} footer={footer}>
                <div>
                    <span>
                        <MultiStateCheckbox value={value} options={options} onChange={(e) => setValue(e.value)} optionValue="value" />
                    </span>
                    <span style={{marginLeft: '5px'}}>{value}</span>
                </div>
            </Card>
        </div>
    )
}

export default Todo;