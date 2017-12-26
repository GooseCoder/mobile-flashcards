import {ADD_CARD} from "./actionTypes"

export default addCard = (title, card) => {
    return {
        type: ADD_CARD,
        title,
        card
    }
}
