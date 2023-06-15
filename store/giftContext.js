import { createContext, useState } from 'react';

export const GiftContext = createContext({
    path: '',
    setPath: (path) => { }
});

function GiftContextProvider({ children }) {
    const [pathSelected, setPathSelected] = useState();

    function setPath(path) {
        setPathSelected(path);
    }

    const value = {
        path: pathSelected,
        setPath: setPath
    };

    return <GiftContext.Provider value={value}>{children}</GiftContext.Provider>
}

export default GiftContextProvider;