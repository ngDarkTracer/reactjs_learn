import { useState } from 'react';

import './App.css';
import Todo from "./Todo";

import PrimeReact from 'primereact/api';
import { Button } from "primereact/button";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';

PrimeReact.ripple = true;
PrimeReact.cssTransition = true;

function App() {

    let visible = false;
    const [value, setValue] = useState('');
    const [valueToModify, setValueToModify] = useState('');
    const [id, setId] = useState(0);
    const [displayPosition, setDisplayPosition] = useState(false);
    const [displayResponsive, setDisplayResponsive] = useState(false);
    const [displayModifyOverlay, setDisplayModifyOverlay] = useState(false);
    const [position, setPosition] = useState('left');

    const [todoList, setTodoTask] = useState(
        [
            {
                id: 0,
                title: 'Learn react'
            },
            {
                id: 1,
                title: 'Learn again'
            }
        ]
    );

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

    const addTask = (task, name) => {
        if (task) {
            setTodoTask(otherTasks => [...otherTasks, {
                id: todoList.length,
                title: task
            }])
            dialogFuncMap[`${name}`](false);
            setValue('')
        }
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

    const onUpdateElement = (data) => {
        setValueToModify(data.title);
        setId(data.id)
        onClick('displayModifyOverlay')
    }

    const footerAdd = <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide('displayResponsive')} className="p-button-text" />
        <Button label="Add" icon="pi pi-plus" onClick={() => addTask(value, 'displayResponsive')} autoFocus />
    </div>

    const footerUpdate = <div>
        <Button label="Cancel" icon="pi pi-times" onClick={() => onHide('displayModifyOverlay')} className="p-button-text" />
        <Button label="Update" icon="pi pi-sync" onClick={() => updateTask('displayModifyOverlay')} autoFocus />
    </div>

  return (
      <div>
          <Dialog header="Add new task" visible={displayResponsive} onHide={() => onHide('displayResponsive')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={footerAdd}>
              <InputTextarea style={{width: '100%'}} value={value} onChange={(event) => setValue(event.target.value)} autoResize />
          </Dialog>
          <Dialog header="Update task" visible={displayModifyOverlay} onHide={() => onHide('displayModifyOverlay')} breakpoints={{'960px': '75vw'}} style={{width: '50vw'}} footer={footerUpdate}>
              <InputTextarea style={{width: '100%'}} value={valueToModify} onChange={(event) => setValueToModify(event.target.value)} autoResize />
          </Dialog>
          <div className='container'>
              <div style={{ margin: '10px' }}>
                  <Button label="New task" onClick={() => onClick('displayResponsive')} className="p-button-raised p-button-rounded p-button-success"/>
              </div>
              {todoList.map(elt => (
                  <Todo onDeleteElement={onDeleteElement} onUpdateElement={onUpdateElement}
                        key={elt.id} id={elt.id} title={elt.title}/>
              ))}
          </div>
      </div>
  )
}

export default App;
