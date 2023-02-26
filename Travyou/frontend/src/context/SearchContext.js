import { createContext, useReducer } from "react";

const INITIAL_STATE={
    destination:undefined,
    dates:[],
    options:{
        adult:undefined,
        children:undefined,
        room:undefined
    },
};

export const SearchContext=createContext(INITIAL_STATE);

const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEWSEARCH":
            return {
                destination:action.payload.destination,
                dates:action.payload.dates,
                options:action.payload.options
            }
        case "RESETSEARCH":
            return INITIAL_STATE
        default:
            return state;
    }

}

export const SearchContextProvider=({children})=>{
    const [state,dispatch]=useReducer(SearchReducer,INITIAL_STATE);

    // console.log(state)
    return (

        <SearchContext.Provider
        value={{
            destination:state.destination,
            dates:state.dates,
            options:state.options,
            dispatch}}
        >
            {children}
        </SearchContext.Provider>
    )
}