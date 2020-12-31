import React, { useState, useCallback, useEffect } from 'react'

const SearchBar = () => {
    const [searchType, setSearchType] = useState()
    const [searchText, setSearchText] = useState()
    const [timeoutHandler, setTimeoutHandler] = useState()

    const handleSearchTypeChange = useCallback((e) => {
        setSearchType(e.target.value)
    }, [searchType])

    const handleSearchTextChange = useCallback((e) => {
        setSearchText(e.target.value)
    }, [searchText])

    const searchTypes = ['', 'All', 'Brand', 'Product', 'Merchant']

    useEffect(() => {
        const searchChangeEvent = new CustomEvent('searchChangeEvent', {
            detail: {
                type: searchType,
                text: searchText,
            }
        })

        window.dispatchEvent(searchChangeEvent)
    }, [searchType])

    useEffect(() => {
        if (timeoutHandler) {
            clearInterval(timeoutHandler)
        }

        const handler = setTimeout(() => {
            const searchChangeEvent = new CustomEvent('searchChangeEvent', {
                detail: {
                    type: searchType,
                    text: searchText,
                }
            })

            window.dispatchEvent(searchChangeEvent)
        }, 500)

        setTimeoutHandler(handler)
    }, [searchText])

    return (
        <div className={"search-bar"}>
            <div className={"search-bar-container"}>
                <div>
                    <span>Search By:</span>
                    <select onChange={handleSearchTypeChange} aria-label="search-type">
                        {searchTypes.map((type, index) => (<option value={type.toUpperCase()} key={index}>{type}</option>))}
                    </select>
                </div>
                <input type="text" placeholder={"e.g Gucci"} onChange={handleSearchTextChange} aria-label="search-text" />
            </div>
        </div>
    )

}

export default SearchBar
