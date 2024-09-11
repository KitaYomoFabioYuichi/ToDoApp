import React, { createContext, useContext, useState } from "react";
import Entry from "src/models/entry";

const EntryContext = createContext();

export const useEntryContext = ()=>{
    return useContext(EntryContext);
}

export const EntryProvider = ({
    children
})=>{
    const [nextId, setNextId] = useState(0);
    const [entries, setEntries] = useState([

    ]);

    const addEntry = (data)=>{
        let entry = new Entry({...data, id: nextId});
        setNextId(nid=>nid+1);
        setEntries([...entries, entry]);
    }

    const removeEntry = (id)=>{
        setEntries(entries.filter(entry=>entry.id != id));
    }

    const getEntryIndex = (id)=>{
        return entries.findIndex(entry =>entry.id == id);
    }
    
    const getEntry = (id)=>{
        let index = getEntryIndex(id);
        if(index == -1) return undefined;
        else return entries[index];
    }

    const setEntry = (id, data)=>{

        let index = getEntryIndex(id);
        if(index == -1) return;

        let newEntries = [...entries];

        let oldEntry = entries[index];
        let newEntry = {...oldEntry, ...data, id};

        newEntries[index] = newEntry;

        setEntries(newEntries);
    }

    return <EntryContext.Provider value={{
        entries,
        addEntry,
        removeEntry,
        getEntry,
        setEntry
    }}>
        {children}
    </EntryContext.Provider>
}