import { NEXT_CARD, RESET_QUIZ } from '../actions/actionTypes'

export default function quizReducer (state = {}, action) {
    const {type, cardIdx, isCorrect} = action
    switch (type) {
        case NEXT_CARD:
            const increment = isCorrect ? 1 : 0
            return {
                ...state,
                cardIdx,
                correctCount: state.correctCount + increment
            }

        case RESET_QUIZ:
            return {
                cardIdx: 0,
                correctCount: 0
            }

        default :
            return state
    }
}