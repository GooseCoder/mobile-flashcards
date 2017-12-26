import { INIT_DECKS, ADD_DECK, ADD_CARD } from '../actions'

export default function deckReducer (state = {}, action) {
    const {type, decks, deck, title, card} = action;
    switch (type) {
        case INIT_DECKS:
            return {
                ...decks
            };

        case ADD_DECK:
            return {
                ...state, ...deck
            };
        case ADD_CARD:
            const updatedQuestions = [...state[title].questions];
            updatedQuestions.push(card);

            return {
                ...state,
                [title]:{
                    ...state[title],
                    questions: updatedQuestions
                }
            };
        default :
            return state
    }
}