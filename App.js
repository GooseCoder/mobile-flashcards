import React, {Component} from 'react'
import {StyleSheet, View} from 'react-native'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import {retrieveDecks} from "./actions"
import {setLocalNotification} from './utils/notifications'
import {AppNavigator} from "./components/AppNavigator"

export default class App extends Component {
    componentDidMount() {
        setLocalNotification()
    }

    render() {
        const initState = {
            quiz: {
                cardIdx: 0,
                isLast: false,
                correctCount: 0,
                incorrectCount: 0
            }
        }
        const store = createStore(reducer, initState, applyMiddleware(thunk))

        // initialize decks from AsyncStorage
        store.dispatch(retrieveDecks())

        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <AppNavigator/>
                </View>
            </Provider>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 22,
        flex: 1
    }
})
