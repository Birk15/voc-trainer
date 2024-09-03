import React, { Component, createRef } from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class WriteVoc extends Component {
    constructor(props){
        super(props);
        this.state = {
            newQuery: false,
            voc_length: this.props.voc.type.length,
            writeVoc: false,
            notFinishedStart: true,
            currentElement: -1,
        }
        this.nameInputRef = createRef();
        this.erstellerInputRef = createRef();
        this.englishInputRef =  createRef();
        this.germanInputRef =  createRef();
    }

    changeNewQuery = (new_query, write_voc) => {
        this.setState({ newQuery: new_query, writeVoc: write_voc, notFinishedStart: true })
    }

    btnStart = (voc, name, ersteller) => {
        if (this.nameInputRef.current.value && this.erstellerInputRef.current.value) {
            const uniqueId = Date.now(); // Eine einfache Möglichkeit, eine eindeutige ID zu erstellen
            voc.setTypes({id: uniqueId, name: name + ' von ' + ersteller, germanWords: [], englishWords: []});
            this.setState({ notFinishedStart: false });
            this.btnVocClicked(voc.type[this.state.voc_length].id, this.props.voc)
        }
    }

    btnVocClicked = (id, voc) => {
        console.log('Button clicked with id:', id);
        const currentElement = voc.type.findIndex(item => item.id === id);
        if (currentElement !== -1) {
            this.setState({ currentElement });
            this.changeNewQuery(false, true);
        } else {
            console.warn('Kein Element mit der angegebenen ID gefunden.');
        }
    }

    btnSaveVoc = (voc) => {
        if (this.englishInputRef.current && this.germanInputRef.current) {
            const newGermanWord = this.germanInputRef.current.value;
            const newEnglishWord = this.englishInputRef.current.value;
    
            // Sicherstellen, dass `currentElement` gültig ist und `voc.type[currentElement]` existiert
            const currentData = voc.type[this.state.currentElement];
            
            if (currentData) {
                const updatedData = {
                    ...currentData,
                    germanWords: [...currentData.germanWords, newGermanWord], // Fügen Sie das neue Wort hinzu
                    englishWords: [...currentData.englishWords, newEnglishWord] // Optional: auch für englische Wörter
                };
    
                voc.updateType(this.state.currentElement, updatedData);
    
                this.englishInputRef.current.value = '';
                this.germanInputRef.current.value = '';
    
                console.log(updatedData);
            } else {
                console.warn('Kein gültiges Element gefunden zum Speichern.');
            }
        } else {
            console.warn('Bitte geben Sie ein Wort ein.');
        }
    }
    render() {
        console.log(this.props.voc.type)
        const {voc} = this.props;
        const {newQuery, writeVoc, notFinishedStart, currentElement} = this.state;

        let nameList = [];

        if (voc && Array.isArray(voc.type)) {
            voc.type.forEach((item) => {
                nameList.push(item.name);
            });
        }

        let btnList = [];
        for (let i = 0; i < nameList.length; i++) {
            btnList.push(
                <Button onClick={() => this.btnVocClicked(voc.type[i].id, voc)} key={voc.type[i].id} type="button" variant="primary" style={{ height: 60, width: 300 }}>
                    {voc.type[i].name}
                </Button>
            );
        }

        return (
            <div style={{ display: 'flex', justifyContent: 'center'}}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                        <Button onClick={() => this.changeNewQuery(true, false)} type="button" variant="secondary" style={{ marginTop: '30px'}}>neue Abfrage</Button>
                    </div>
                    <div style={{overflowY: 'auto', overflowX: 'hidden', height: 500, marginTop: 40}}>
                        <ButtonGroup vertical>{btnList}</ButtonGroup>
                    </div>
                </div>
                {newQuery && (
                    <div id='vocQuery'>
                        <div id='vocQuery-content'>
                            <span className="close" onClick={() => this.changeNewQuery(false, false)}>&times;</span>
                            {notFinishedStart && (
                                <>
                                    <div>
                                        <p>Name der Abfrage:</p>
                                        <input ref={this.nameInputRef}/>
                                    </div>
                                    <div style={{marginTop: 40}}>
                                        <p>Ersteller:</p>
                                        <input ref={this.erstellerInputRef}/>
                                    </div>
                                    <div>
                                        <Button onClick={() => this.btnStart(voc, this.nameInputRef.current.value, this.erstellerInputRef.current.value)} type="button" variant="secondary" style={{ marginTop: '30px' }}>Start</Button>
                                    </div>
                                </>
                            )}
                            {!notFinishedStart && (
                                <div>
                                    <div>
                                        <p>{voc.type[currentElement].name}</p>
                                    </div>
                                    <div>
                                        <input ref={this.germanInputRef} placeholder='deutsch...' required />
                                        <input ref={this.englishInputRef} placeholder='englisch...' required />
                                    </div>
                                    <div>
                                        <Button onClick={() => this.btnSaveVoc(voc)} type="button" variant="secondary" style={{ marginTop: '30px' }}>Save</Button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {writeVoc && (
                    <div id='vocQuery'>
                        <div id='vocQuery-content'>
                            <span className="close" onClick={() => this.changeNewQuery(false, false)}>&times;</span>
                            <div>
                                <p>{voc.type[currentElement].name}</p>
                            </div>
                            <div>
                                <input ref={this.germanInputRef} placeholder='deutsch...' required />
                                <input ref={this.englishInputRef} placeholder='englisch...' required />
                            </div>
                            <div>
                                <Button onClick={() => this.btnSaveVoc(voc)} type="button" variant="secondary" style={{ marginTop: '30px' }}>Save</Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default WriteVoc;