import React, { Component, createRef } from 'react';
import { Button } from 'react-bootstrap';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

class LearnVoc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: '',
            vocQuery: false,
            germanWord: '',
            englishWord: '',
            incorrectWord: false,
            afterStart: false,
        };
        this.answerInputRef = createRef();
        this.changeBtnRef = createRef();
    }

    changeQuery = (value) => {
        this.setState({ vocQuery: value });
    }

    changePage = (newPage) => {
        console.log(newPage);
        this.setState({ page: newPage, vocQuery: true, germanWord: '', englishWord: '', afterStart: false }, () => {
            console.log(this.state.page);
        });
    };

    getRandomWord = (german, english) => {
        console.log(german);
        console.log(english);
        
        if (german.length === 0) return '';
        const randomIndex = Math.floor(Math.random() * german.length);
        return {
            germanWord: german[randomIndex],
            englishWord: english[randomIndex]
        };
    };

    btnSave = (englishWord) => {
        const userAnswer = this.answerInputRef.current ? this.answerInputRef.current.value : '';
        if (userAnswer === englishWord) {
            if (this.answerInputRef.current) {
                this.answerInputRef.current.style.backgroundColor = 'lightgreen';
            }
        } else {
            if (this.answerInputRef.current) {
                this.answerInputRef.current.style.backgroundColor = 'lightcoral';
                this.setState({ incorrectWord: true });
            }
        }
    }

    btnWeiter = (currentVoc) => {
        const { germanWords, englishWords } = currentVoc;

        const { germanWord, englishWord } = this.getRandomWord(germanWords, englishWords);
        console.log(germanWord);
        this.setState({ germanWord, englishWord }); // Update the state with the new random word
    
        if (this.changeBtnRef.current.innerText !== 'Weiter') {
            this.changeBtnRef.current.innerText = 'Weiter';
        }
    
        if (this.answerInputRef.current) {
            this.answerInputRef.current.style.backgroundColor = 'white';
        }
    
        if (this.answerInputRef.current) {
            this.answerInputRef.current.value = '';
        }
        this.setState({ incorrectWord: false, afterStart: true });
    }

    render() {
        const { page, vocQuery, germanWord, englishWord, incorrectWord, afterStart } = this.state;
        const { voc } = this.props;

        // Überprüfe, ob voc.type ein Array ist, bevor Methoden darauf aufgerufen werden
        const currentVoc = Array.isArray(voc.type) ? voc.type.find(item => item.name === page) : null;

        let nameList = [];
        if (Array.isArray(voc.type)) {
            nameList = voc.type.map((item) => item.name);
        } else {
            console.error('voc.type is not an array');
        }

        console.log(nameList);
        console.log(voc.type ? voc.type.length : 0);

        let btnList = [];
        
        for (let i = 0; i < nameList.length; i++) {
            btnList.push(
                <Button
                    variant='primary'
                    style={{width: 300, height: 60}}
                    onClick={() => this.changePage(nameList[i])} 
                    type="button"
                    key={i}
                >
                    {nameList[i]}
                </Button>
            );
        }

        return (
            <div className='lernVoc'>
                <div style={{overflowY: 'auto', overflowX: 'hidden', height: 600, marginTop: 40}}>
                    <ButtonGroup vertical>{btnList}</ButtonGroup>
                </div>

                {vocQuery && currentVoc &&(
                    <div id='vocQuery'>
                        <div id='vocQuery-content' ref={this.changeBgRef}>
                            <span className="close" onClick={() => this.changeQuery(false)}>&times;</span>
                            <div>
                                <div className='Query'>
                                    <p>{germanWord}</p>
                                </div>
                                <div>
                                    <input disabled={!afterStart} autoComplete="off" type="text" id="answer" name="answer" ref={this.answerInputRef} required />
                                    {incorrectWord && <p style={{color: 'green'}}>{englishWord}</p>}
                                </div>
                                <div style={{ marginTop: '30px'}}>
                                    <Button disabled={!afterStart} onClick={() => this.btnSave(englishWord)} type="button" variant="success">
                                        Bestätigen
                                    </Button>
                                    <Button ref={this.changeBtnRef} onClick={() => this.btnWeiter(currentVoc)} type="button" variant="success" style={{ marginLeft: '20px'}}>
                                        Start
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default LearnVoc;