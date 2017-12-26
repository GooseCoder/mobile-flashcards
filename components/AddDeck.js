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
import {saveDeck} from '../utils/asyncStorageHandler'
import {white, gray, black} from '../utils/colors'
import {addDeck} from "../actions"

class AddDeck extends Component {
    state = {deckInput: ''}

    createDeck = () => {
        const {navigate} = this.props.navigation
        const {addDeck} = this.props
        const deckTitle = this.state.deckInput

        if (!deckTitle) {
            ToastAndroid.showWithGravityAndOffset('Deck title can\'t be empty\n Please try again!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50)
            return
        }

        saveDeck(deckTitle).then(() => {
            addDeck(deckTitle)
            navigate('Deck', {title: deckTitle})
            this.setState({deckInput: ''})
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset('Error during saving: Deck is not saved!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50)
            console.error(err)
        })
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <Text style={styles.titleText}>What is the title of your new deck?</Text>
                <TextInput style={styles.textInput}
                           value={this.state.deckInput}
                           onChangeText={deckInput => this.setState({deckInput})}
                           autogrow={true}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.createDeck()}>
                    <Text style={styles.buttonText}>Add Deck</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        flex: 1,
        alignItems: 'stretch'
    },
    buttonText: {
        fontSize: 25,
        color: white,
        textAlign: 'center'
    },
    button: {
        paddingHorizontal: 60,
        paddingVertical: 20,
        alignSelf: 'center',
        backgroundColor: black,
        borderRadius: 5,
        marginVertical: 10
    },
    textInput: {
        fontSize: 20,
        padding: 10,
        marginVertical: 20,
        marginHorizontal: 20,
        borderWidth: 1,
        borderRadius: 10
    },
    titleText: {
        color: gray,
        fontSize: 35,
        marginTop: 10,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center'
    }
})

export default connect(null, {addDeck})(AddDeck)