import { createActions, createReducer } from "reduxsauce";
import Immutable from "seamless-immutable";

/**
 * Action types & creators
 */
export const { Types, Creators } = createActions({    
    getSelectedNumbers: [],
    toggleNumber: ["number"],
    clearSelectedNumbers: [],
    setLoading: ["loading"],
    setPaying: ["message"]
});

const generateNumbers = (size) => {
    return [...Array(size).keys()].map(item => ({id: item+1, selected: false}))
}

const INITIAL_STATE = Immutable({
    loading: false,
    payingMessage: "",
    boardNumbers: generateNumbers(60),
})


const getSelectedNumbers = (state = INITIAL_STATE, action)  => {
    return state.boardNumbers.filter(number => number.selected)
}

const toggleNumber = (state = INITIAL_STATE, action)  => {

    const numbersSelected = getSelectedNumbers(state, action);
    if ((numbersSelected.length === 15) && (!action.number.selected)) {
        return state
    }

    let newState = state.boardNumbers.map(
        item => {
            if (item.id !== action.number.id) return {...item}

            return { ...item, selected: !item.selected }    
        }   
    )

    return {...state, boardNumbers: newState}
}

const clearSelectedNumbers = (state = INITIAL_STATE, action)  => 
    Immutable({...state, boardNumbers: generateNumbers(60)})    

const setLoading = (state = INITIAL_STATE, action)  => 
    state.merge({...state, loading: action.loading})

const setPaying = (state = INITIAL_STATE, action)  => {

    return {...state, payingMessage: action.message}
}
    

export const LotteryTypes = Types;

export default createReducer(INITIAL_STATE, {
    [Types.GET_SELECTED_NUMBERS]: getSelectedNumbers,
    [Types.TOGGLE_NUMBER]: toggleNumber,
    [Types.CLEAR_SELECTED_NUMBERS]: clearSelectedNumbers,
    [Types.SET_LOADING]: setLoading,
    [Types.SET_PAYING]: setPaying
});