import { AsyncStorage } from 'react-native'

const APP_STORAGE_KEY = 'UDACI_CARDS';

/**
 * Return all of the decks with their titles, questions, and answers included.
 */
const getAllDecks = async () => {
    try{
        const decks = await AsyncStorage.getItem(APP_STORAGE_KEY);
        return JSON.parse(decks);
    }
    catch(err){
        return err;
    }

};

/**
 * Take in a single title argument and add it to the decks.
 * @param title
 */
const saveDeck = (title) => {
    return AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
        [title]: {
            title,
            questions: []
        }
    })).catch(err => Promise.reject(err));
};

/**
 *  This function will add the card parameter to the list of
 *  questions for the deck with the associated title.
 * @param title{string}
 * @param card{object}
 */
const addCardToDeck = async(title, card) => {
    try{
        const decks = JSON.parse(await AsyncStorage.getItem(APP_STORAGE_KEY));
        const questions = decks[title]['questions'];
        questions.push(card);

        return await AsyncStorage.mergeItem(APP_STORAGE_KEY, JSON.stringify({
            [title]: {
                title,
                questions
            }
        }));
    }
    catch (err){
        return Promise.reject(err);
    }

};

export {getAllDecks, saveDeck, addCardToDeck}

