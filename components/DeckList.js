import React, {Component} from 'react'
import {StyleSheet, Text, View, FlatList} from 'react-native'
import {white, gray} from '../utils/colors'
import {connect} from "react-redux"
import {initDecks} from "../actions"
import DeckItem from './DeckItem'

class DeckList extends Component {
    render() {
        const {navigate} = this.props.navigation
        const {decks} = this.props

        if (decks && decks.length === 0) {
            return (
                <View style={styles.container}>
                    <Text style={styles.smallText}>{'No decks stored \n Click the new deck tab to create one'}</Text>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                {decks &&
                <FlatList
                    data={decks}
                    renderItem={({item}) => <DeckItem navigate={navigate} deck={item}/>}
                    keyExtractor={item => item.title}
                    style={{flex: 1}}
                />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: white
    },
    buttonSmallText: {
        fontSize: 20,
        color: white,
        textAlign: 'center'
    },
    buttonLargeText: {
        color: white,
        fontSize: 25,
        textAlign: 'center'
    },
    card: {
        flex: 1,
        backgroundColor: gray,
        paddingVertical: 20,
        borderWidth: 1,
        marginBottom: 5
    },
    smallText: {
        fontSize: 20,
        color: gray,
        textAlign: 'center'
    },
})

const mapStateToProps = ({decks}) => {
    if (!Object.keys(decks)) return {decks: []}

    const deckArray = Object.keys(decks).reduce((deckArray, deckKey) => {
        if (!deckArray) deckArray = []
        deckArray.push(decks[deckKey])
        return deckArray
    }, [])

    return {
        decks: deckArray
    }
}

export default connect(mapStateToProps, {initDecks})(DeckList)