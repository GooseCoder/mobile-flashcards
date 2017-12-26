import { getAllDecks } from "../utils/asyncStorageHandler"
import initDecks from "./initDecks"

export default retrieveDecks = () => (dispatch) => (
    getAllDecks()
        .then(decks => dispatch(initDecks(decks)))
        .catch(error => console.error({error}))
)
