import {INIT_DECKS} from "./actionTypes"

export default initDecks = (decks) => {
    return {
        type: INIT_DECKS,
        decks
    }
}