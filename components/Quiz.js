import React, {Component} from 'react'
import {connect} from 'react-redux'
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import {white, gray, black, green, red} from '../utils/colors'
import {updateQuizScore, resetQuiz} from '../actions/index'

class Quiz extends Component {
    state = {showAnswer: false}

    loadNextCard = (isCorrect) => {
        const {updateQuizScore, cardIdx} = this.props
        const {deck} = this.props.navigation.state.params

        if (cardIdx < deck.questions.length) {
            // reset state back to question
            this.setState({showAnswer: false})
            updateQuizScore(cardIdx + 1, isCorrect)
        }
    }

    render() {
        const {deck} = this.props.navigation.state.params
        const {goBack} = this.props.navigation
        const {cardIdx, correctCount, resetQuiz} = this.props
        const {showAnswer} = this.state

        // if no cards added yet
        if (!deck.questions || deck.questions.length === 0)
            return (
                <View style={styles.container}>
                    <Text style={styles.largeText}>
                        {'There are no cards in the deck\n please add some.'}
                    </Text>
                </View>
            )

        // If the quiz has started or is in progress
        if (deck.questions[cardIdx]) {
            return (
                <View style={styles.container}>
                    <Text style={styles.remainCount}>{`${cardIdx + 1} / ${deck.questions.length}`}</Text>
                    <View>
                        <Text style={styles.largeText}>
                            {showAnswer ? deck.questions[cardIdx].answer : deck.questions[cardIdx].question}
                        </Text>
                        <TouchableOpacity style={[styles.button, {backgroundColor: 'transparent'}]}
                                          onPress={() => this.setState({showAnswer: !showAnswer})}>
                            <Text style={[
                                styles.buttonText,
                                {color: red}
                            ]}>{showAnswer ? 'Back to Question' : 'Answer'}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginBottom: 50}}>
                        <TouchableOpacity style={[styles.button, {backgroundColor: green}]}
                                          onPress={() => this.loadNextCard(true)}>
                            <Text style={styles.buttonText}>{deck.questions[cardIdx] ? 'Correct' : ''}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, {backgroundColor: red}]}
                                          onPress={() => this.loadNextCard(false)}>
                            <Text style={styles.buttonText}>Incorrect</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
        // Else if the quiz finished
        else {
            return (
                <View style={[styles.container, {justifyContent: 'space-around'}]}>
                    <View>
                        <Text style={[styles.largeText, {alignSelf: 'flex-start'}]}>
                            {`Results:\n You have ${correctCount} right answers \n out of ${cardIdx}`}
                        </Text>
                    </View>
                    <View>
                        <TouchableOpacity style={styles.outlineButton} onPress={() => resetQuiz()}>
                            <Text style={styles.outlineButtonText}>Retake Quiz</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => goBack()}>
                            <Text style={styles.buttonText}>Back to Deck</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    buttonText: {
        color: white,
        fontSize: 22,
        textAlign: 'center'
    },
    button: {
        backgroundColor: black,
        width: 200,
        alignSelf: 'center',
        paddingVertical: 20,
        borderRadius: 5,
        marginVertical: 10
    },
    outlineButtonText: {
        color: black,
        fontSize: 22,
        textAlign: 'center'
    },
    outlineButton: {
        backgroundColor: white,
        width: 200,
        paddingVertical: 20,
        alignSelf: 'center',
        marginVertical: 10,
        borderRadius: 5,
        borderWidth: 1
    },
    largeText: {
        fontSize: 25,
        marginHorizontal: 10,
        textAlign: 'center'
    },
    smallText: {
        fontSize: 20,
        textAlign: 'center'
    },
    remainCount: {
        fontSize: 20,
        marginTop: 10,
        marginLeft: 10,
        color: gray,
        fontWeight: 'bold',
        alignSelf: 'flex-start'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        updateQuizScore: (cardIdx, isCorrect) => dispatch(updateQuizScore(cardIdx, isCorrect)),
        resetQuiz: () => dispatch(resetQuiz())
    }
}

const mapStateToProps = ({quiz}) => {
    return {
        ...quiz
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)