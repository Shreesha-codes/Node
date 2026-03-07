import { createContext, useState, useEffect } from "react";
import { jobsData } from "../assets/assets";
import { jobAPI } from "../services/api";


const AppContext = createContext()

export { AppContext }

export const AppContextProvider = (props) => {

    const [searchFilter, setSearchfilter] = useState({
        title: "",
        location: ""
    })

    const [isSearched, setIsSearched] = useState(false)

    const [jobs, setJobs] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // Fetch jobs from backend on mount
    useEffect(() => {
        fetchJobs()
    }, [])

    // Fetch jobs when search is triggered
    useEffect(() => {
        if (isSearched) {
            fetchJobs(searchFilter)
        }
    }, [isSearched, searchFilter])

    const fetchJobs = async (filters = {}) => {
        try {
            setLoading(true)
            setError(null)
            const response = await jobAPI.getAllJobs(filters)
            if (response.success && Array.isArray(response.data)) {
                setJobs(response.data)
            } else {
                // Fallback to mock data if API fails
                console.warn('Failed to fetch jobs, using mock data')
                setJobs(Array.isArray(jobsData) ? jobsData : [])
            }
        } catch (err) {
            console.error('Error fetching jobs:', err)
            setError(err.message)
            // Fallback to mock data on error
            setJobs(Array.isArray(jobsData) ? jobsData : [])
        } finally {
            setLoading(false)
        }
    }

    const value = {
        setSearchfilter, searchFilter,
        setIsSearched, isSearched, 
        jobs, setJobs,
        loading, error,
        fetchJobs
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContext