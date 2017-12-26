import React, { Component } from 'react'
import { StyleSheet, Text, TouchableOpacity, TextInput,
         KeyboardAvoidingView, ToastAndroid } from 'react-native';
import {white, gray, black} from '../utils/colors'
import { saveDeckTitle } from '../utils/storage';
import { connect } from "react-redux";
import { addDeck } from "../actions";

class AddDeck extends Component {
    state = {deckInput: ''};

    createDeck = () => {
        const {navigate} = this.props.navigation;
        const {addDeck} = this.props;
        const deckTitle = this.state.deckInput;

        if(!deckTitle){
            ToastAndroid.showWithGravityAndOffset('Deck title can\'t be empty\nTry again!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
            return;
        }

        saveDeckTitle(deckTitle).then(() => {
            addDeck(deckTitle);
            navigate('Deck', { title: deckTitle });
            this.setState({deckInput: ''});
        }).catch(err => {
            ToastAndroid.showWithGravityAndOffset('Error during saving: Deck is NOT saved!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
            console.error(err);
        });
    };

    render() {
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleText}>What is the title of your new deck?</Text>
                <TextInput value={this.state.deckInput} style={styles.textInput}
                           autogrow={true}
                           onChangeText={deckInput => this.setState({deckInput})}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />
                <TouchableOpacity style={styles.button} onPress={() => this.createDeck()}>
                    <Text style={styles.buttonText}>
                        Add Deck
                    </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
    },
    buttonText: {
        color: white,
        fontSize: 25,
        textAlign: 'center',
    },
    button: {
        paddingHorizontal: 60,
        paddingVertical: 20,
        backgroundColor: black,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    titleText: {
        marginTop: 10,
        fontSize: 35,
        color: gray,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    textInput:{
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 10,
        borderWidth: 1,
        borderRadius: 10

    }
});

export default connect(null, {addDeck})(AddDeck);