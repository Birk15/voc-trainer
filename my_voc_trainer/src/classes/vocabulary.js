import { makeAutoObservable } from "mobx";

export default class Vocabulary {
    constructor() {
        const storedTypes = JSON.parse(localStorage.getItem('vocabularyTypes'));
        
        this._types = storedTypes || [];
        makeAutoObservable(this);
    }

    get type() {
        return this._types;
    }

    setTypes(types) {
        if (!Array.isArray(this._types)) {
            this._types = [];
        }
        this._types.push(types);
        this.saveToLocalStorage();
    }
    
    updateType = (index, updatedData) => {
        if (this.type[index]) {
            this.type[index] = updatedData;
            this.saveToLocalStorage(); // Falls du die Daten lokal speichern möchtest
        } else {
            console.warn('Kein gültiges Element zum Aktualisieren gefunden.');
        }
    }

    deleteType(id) {
        this._types = this._types.filter(type => type.id !== id);
        this.saveToLocalStorage();
    }

    saveToLocalStorage() {
        localStorage.setItem('vocabularyTypes', JSON.stringify(this._types));
    }
}
