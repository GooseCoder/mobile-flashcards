import {NEXT_CARD} from "./actionTypes"

export default updateQuizScore = (cardIdx, isCorrect) => {
    return {
        type: NEXT_CARD,
        cardIdx,
        isCorrect
    }
}
