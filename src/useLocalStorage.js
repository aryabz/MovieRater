import { useState, useEffect } from "react";

export function useLocalStorage(ini, key) {
    const [saveData, setSaveData] = useState(function () {
        const Data = localStorage.getItem(key)
        return Data ? JSON.parse(Data) : ini
    });


    useEffect(function () {
        localStorage.setItem(key, JSON.stringify(saveData))
    }, [saveData])


    return ({ saveData, setSaveData })
}