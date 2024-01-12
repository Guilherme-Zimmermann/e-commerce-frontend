import { Outlet, useLocation } from "react-router-dom";
import { Header } from "../components/header/Header";
import { useEffect, useState } from "react";
import { SearchContext } from "../context/SearchContext";

export function DefaultLayout() {
    const [ search, setSearch ] = useState('')
    const { pathname } = useLocation()

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [pathname])

    return (
        <div>
            <SearchContext.Provider value={{ search, setSearch }}>
                <Header />
                <Outlet />
            </SearchContext.Provider>
        </div>
    )
}