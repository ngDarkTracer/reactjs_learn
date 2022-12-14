import {Button} from "primereact/button";
import {useContext, useState} from "react";
import {TasksContext} from "../services/tasks-context";
import Todo from "../Todo";
import {Dialog} from "primereact/dialog";
import {InputTextarea} from "primereact/inputtextarea";

function Done() {

    const [value, setValue] = useState('');
    const [valueToModify, setValueToModify] = useState('');
    const [id, setId] = useState(0);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayModifyOverlay, setDisplayModifyOverlay] = useState(false);

    const [todoList, setTodoTask] = useContext(TasksContext)

    const dialogFuncMap = {
        'displayResponsive': setDisplayResponsive,
        'displayModifyOverlay': setDisplayModifyOverlay
    }

    const onClick = (name) => {
        dialogFuncMap[`${name}`](true);
    }

    const onHide = (name) => {
        dialogFuncMap[`${name}`](false);
    }

    const updateTask = (name) => {
        if(valueToModify) {
            const tab = todoList.map(otherTask => {
                if (otherTask.id === id) {
                    otherTask.title = valueToModify
                }
                return otherTask;
            })
            dialogFuncMap[`${name}`](false);
            setValueToModify('')
        }
    }

    const onDeleteElement = (data) => {
        const tasks = todoList.filter(task => task.id !== data.id)
        tasks.forEach((task, index) => {
            task.id = index
        })
        setTodoTask(tasks)
    }

    const onChecked = (id) => {
        const tab = todoList.map(otherTask => {
            if (otherTask.id === id) {
                otherTask.status = !otherTask.status
            }
            return otherTask;
        })
        setTodoTask(tab)
    }

    const onUpdateElement = (data) => {
        setValueToModify(data.title);
        setId(data.id)
        onClick('displayModifyOverlay')
    }

    const footerUpdate = <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide('displayModifyOverlay')} className="p-button-text" />
        <Button label="Update" icon="pi pi-sync" onClick={() => updateTask('displayModifyOverlay')} autoFocus />
    </div>

    return (
        <>
            <Dialog header="Update task" visible={displayModifyOverlay} onHide={() => onHide('displayModifyOverlay')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={footerUpdate}>
                <InputTextarea style={{width: '100%'}} value={valueToModify} onChange={(event) => setValueToModify(event.target.value)} autoResize />
            </Dialog>
            <div className='container'>
                {todoList.map(elt => (
                    elt.status ? <Todo onDeleteElement={onDeleteElement} onUpdateElement={onUpdateElement}
                                        onChecked={onChecked}
                                        key={elt.id} id={elt.id} title={elt.title} status={elt.status}/> : null
                ))}
            </div>
        </>
    )
}

export default Done