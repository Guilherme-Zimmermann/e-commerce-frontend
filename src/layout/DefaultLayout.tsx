import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useState } from "react";
import { SearchContext } from "../context/SearchContext";

export function DefaultLayout() {
    const [ search, setSearch ] = useState('')

    return (
        <div>
            <SearchContext.Provider value={{ search, setSearch }}>
                <Header />
                <Outlet />
            </SearchContext.Provider>
        </div>
    )
}