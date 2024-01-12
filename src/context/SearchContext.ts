import React from "react"

type SearchContextType = {
    search: string
    setSearch: (value: string) => void
}

export const SearchContext = React.createContext<SearchContextType>({
    search: '',
    setSearch: () => {},
})