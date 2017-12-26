import React, {Component} from 'react'
import {connect} from "react-redux"
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    ToastAndroid
} from 'react-native'
import {addCardToDeck} from '../utils/asyncStorageHandler'
import {black, white} from '../utils/colors'
import {addCard} from "../actions"

class AddCard extends Component {
    state = {question: '', answer: ''}

    createCard = (deck) => {
        const {question, answer} = this.state
        const {addCard} = this.props

        if (!question || !answer) {
            ToastAndroid.showWithGravityAndOffset('All fields required, ' +
                'can\'t be empty\n Please try again!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50)
            return
        }

        addCardToDeck(deck.title, {question, answer})
            .then(() => {
                addCard(deck.title, {question, answer})
                ToastAndroid.showWithGravityAndOffset(
                    `Card '${[question]}' has been added to '${deck.title}' deck!`,
                    ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50)
                this.setState({question: '', answer: ''})
            })
            .catch(err => {
                ToastAndroid.showWithGravityAndOffset('Error during saving: Card is not saved!',
                    ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50)
                console.error(err)
            })
    }

    render() {
        const {deck} = this.props.navigation.state.params
        const {goBack} = this.props.navigation

        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TextInput value={this.state.question} style={styles.textInput}
                           placeholder='Enter Question'
                           onChangeText={question => this.setState({question})}
                           autogrow={true}
                           numberOfLines={2}
                           multiline={true}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />

                <TextInput style={styles.textInput}
                           value={this.state.answer}
                           placeholder='Enter Answer'
                           onChangeText={answer => this.setState({answer})}
                           autogrow={true}
                           numberOfLines={2}
                           multiline={true}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />

                <TouchableOpacity style={styles.button} onPress={() => this.createCard(deck, goBack)}>
                    <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    buttonText: {
        color: white,
        fontSize: 25,
        textAlign: 'center'
    },
    button: {
        backgroundColor: black,
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 10
    },
    textInput: {
        borderColor: '#000000',
        borderWidth: 2,
        borderRadius: 10,
        fontSize: 20,
        marginVertical: 20,
        marginHorizontal: 20,
        padding: 20
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default connect(null, {addCard})(AddCard)