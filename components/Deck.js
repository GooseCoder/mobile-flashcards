import React, {Component} from 'react'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {connect} from "react-redux"
import {resetQuiz} from "../actions/index"
import {white, black} from '../utils/colors'
import {
    setLocalNotification,
    clearLocalNotification
} from '../utils/notifications'

resetNotification = () => {
    clearLocalNotification()
        .then(setLocalNotification)
}

class Deck extends Component {
    static navigationOptions = ({navigation}) => {
        const {title} = navigation.state.params
        return {
            title
        }
    }

    render() {
        const {deck, resetQuiz} = this.props
        const {navigate} = this.props.navigation

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.largeText}>{deck.title}</Text>
                    <Text style={styles.smallText}>{deck.questions ? deck.questions.length : ''} cards</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.outlineButton} onPress={() => navigate('AddCard', {deck})}>
                        <Text style={styles.outlineButtonText}>Add Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => {
                        resetQuiz()
                        resetNotification()
                        navigate('Quiz', {deck})
                    }}>
                        <Text style={styles.buttonText}>Start Quiz</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    outlineButtonText: {
        color: black,
        fontSize: 22,
        textAlign: 'center'
    },
    outlineButton: {
        paddingVertical: 20,
        paddingHorizontal: 60,
        backgroundColor: white,
        alignSelf: 'center',
        borderRadius: 5,
        borderWidth: 1,
        marginVertical: 10
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    button: {
        paddingVertical: 20,
        paddingHorizontal: 60,
        backgroundColor: black,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10
    },
    largeText: {
        fontSize: 30,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center'
    }
})

const mapStateToProps = ({decks}, ownProps) => {
    const {title} = ownProps.navigation.state.params
    return {
        deck: decks ? decks[title] : {}
    }
}

export default connect(mapStateToProps, {resetQuiz})(Deck)