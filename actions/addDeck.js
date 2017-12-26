import {ADD_DECK} from "./actionTypes"

export default addDeck = (title) => {
    return {
        type: ADD_DECK,
        deck: {
            [title]: {
                title,
                questions: []
            }
        }
    }
}