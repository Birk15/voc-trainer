import React, { useState, useEffect, useRef, createRef, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { Context } from '../index';

const Start = () => {
    const { voc } = useContext(Context);
    const [localStorageData, setLocalStorageData] = useState([]);
    const [Password, setPassword] = useState(false);
    const arrayInputRef = useRef([]);
    const inputValue = createRef();

    useEffect(() => {
        const data = [];
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = JSON.parse(localStorage.getItem(key)); // Parsing JSON strings into objects
            data.push(value);
        }
        setLocalStorageData(data);
    }, []);

    // Überwache `localStorageData` Updates
    useEffect(() => {
        console.log('localStorageData updated:', localStorageData);
    }, [localStorageData]);

    const handleInputChange = (index, innerIndex, field, value) => {
        const newData = [...localStorageData];
        newData[index][innerIndex][field] = value;
        setLocalStorageData(newData);
    };

    const saveToLocalStorage = () => {
        console.log(localStorageData);
        localStorageData.forEach((item, index) => {
            const key = localStorage.key(index);
            localStorage.setItem(key, JSON.stringify(item));
        });
    };

    const password = 'birk2009';

    const handlePassword = () => {
        if (password === inputValue.current.value) {
            setPassword(true);
        }
    };

    const deleteElement = (id) => {
        console.log('Delete button clicked with id:', id);

        // Filter the `localStorageData` to remove the item with the given id
        const updatedData = localStorageData.map(subArray =>
            Array.isArray(subArray) ? subArray.filter(item => item.id !== id) : subArray
        );
        
        console.log('Updated Data:', updatedData);

        voc.deleteType(id);
        setLocalStorageData(updatedData);
    };

    return (
        <div style={{overflow: 'auto'}}>
            {!Password && (
                <div style={{display: 'flex', justifyContent: 'center', marginTop: 100}}>
                    <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={(e) => {e.preventDefault(); handlePassword();}}>
                        <h1 id='h1'>Das ist nur für den Organisator</h1>
                        <p style={{marginTop: 40}}>Password:</p>
                        <input style={{width: 300, height: 40}} ref={inputValue}/>
                        <Button style={{width: 200, marginTop: 30}} variant='success' type='submit'>Bestätigen</Button>
                    </form>
                </div>
            )}
            {Password && localStorageData.map((item, index) => (
                Array.isArray(item) ? (
                    <div key={index}>
                        {item.map((innerItem) => (
                            <div key={innerItem.id}>
                                <input
                                    style={{color: 'blue', width: 800}}
                                    ref={el => arrayInputRef.current[innerItem.id] = el}
                                    className='arrayinput'
                                    name={`name`}
                                    defaultValue={innerItem.name}
                                    onChange={(e) => handleInputChange(index, item.indexOf(innerItem), 'name', e.target.value)}
                                />
                                <Button onClick={() => deleteElement(innerItem.id)}>Löschen</Button>
                                <input
                                    className='arrayinput'
                                    name={`germanWords`}
                                    defaultValue={innerItem.germanWords.join(', ')}
                                    onChange={(e) => handleInputChange(index, item.indexOf(innerItem), 'germanWords', e.target.value.split(', '))}
                                />
                                <input
                                    className='arrayinput'
                                    name={`englishWords`}
                                    defaultValue={innerItem.englishWords.join(', ')}
                                    onChange={(e) => handleInputChange(index, item.indexOf(innerItem), 'englishWords', e.target.value.split(', '))}
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    null
                )
            ))}
            {Password && <button onClick={saveToLocalStorage}>Speichern</button>}
        </div>
    );
};

export default Start;