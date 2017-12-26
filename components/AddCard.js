import React, { Component } from 'react'
import {connect} from "react-redux";
import {
    StyleSheet, Text, TouchableOpacity, TextInput,
    KeyboardAvoidingView, ToastAndroid
} from 'react-native';
import { black, white } from '../utils/colors'
import { addCardToDeck } from '../utils/storage';
import {addCard} from "../actions";

class AddCard extends Component {
    state = {question: '', answer: ''};

    createCard = (deck) => {
        const { question, answer } = this.state;
        const { addCard } = this.props;

        if(!question || !answer){
            ToastAndroid.showWithGravityAndOffset('All fields are required ' +
                'and can\'t be empty\nTry again!',
                ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
            return;
        }

        addCardToDeck(deck.title, {question, answer})
            .then(() => {
                addCard(deck.title, {question, answer});
                ToastAndroid.showWithGravityAndOffset(
                    `Card '${[question]}' is added to '${deck.title}' deck!`,
                    ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
                //goBack();
                this.setState({question: '', answer: ''});
            })
            .catch(err => {
                ToastAndroid.showWithGravityAndOffset('Error during saving: Card is NOT saved!',
                    ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
                console.error(err);
            });
    };

    render() {
        const { deck } = this.props.navigation.state.params;
        const { goBack } = this.props.navigation;

        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <TextInput value={this.state.question} style={styles.textInput}
                           autogrow={true}
                           onChangeText={question => this.setState({question})}
                           placeholder = 'Enter Question'
                           multiline={true}
                           numberOfLines = {2}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />

                <TextInput value={this.state.answer} style={styles.textInput}
                           autogrow={true}
                           onChangeText={answer => this.setState({answer})}
                           placeholder = 'Enter Answer'
                           multiline={true}
                           numberOfLines = {2}
                           underlineColorAndroid='transparent'
                           autoCorrect={false}
                />
                
                <TouchableOpacity style={styles.button} onPress={() => this.createCard(deck, goBack)}>
                    <Text style={styles.buttonText}>
                        Submit
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
        paddingHorizontal: 40,
        paddingVertical: 15,
        backgroundColor: black,
        alignSelf: 'center',
        borderRadius: 5,
        marginVertical: 10,
    },
    titleText: {
        fontSize: 20,
        textAlign: 'center',
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center',
    },
    textInput:{
        borderWidth: 2,
        borderColor: '#000000',
        borderRadius: 10 ,
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 20,
        padding: 20
    }

});

export default connect(null, {addCard})(AddCard);