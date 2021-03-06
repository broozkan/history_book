import React, {useState, createContext, useEffect} from 'react'

export const SiteUserContext = createContext()

export const SiteUserContextWrapper = (props) => {


    const [state, setState] = useState({
        is_logged_in: false,
        user: ''
    })


    useEffect(()=>{
        setUserCredentials()
    },[])

    
    const setUserCredentials = () => {
        const user = JSON.parse(localStorage.getItem('site-user'))
        if (user) {
            setState({
                is_logged_in: true,
                user: user
            })
        }else{
            setState({
                is_logged_in: false
            })
        }
    }

    const updateState = (key, val, callBack) => {
        setState({
            ...state,
            [key] : val
        })

        callBack(state)
    }
    console.log(state);

    return(
        <SiteUserContext.Provider value={{state: state, updateState: updateState, setUserCredentials: setUserCredentials}}>
            {props.children}
        </SiteUserContext.Provider>
    )

}
