import {StackNavigator, TabNavigator} from "react-navigation"
import {Platform} from "react-native"
import Deck from "./Deck"
import Quiz from "./Quiz"
import AddDeck from "./AddDeck"
import AddCard from "./AddCard"
import DeckList from "./DeckList"
import {black, blue, white} from "../utils/colors"

const Tabs = TabNavigator({
        Decks: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>
            },
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'New Deck',
                tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
            },
        },
    },
    {
        navigationOptions: {
            header: null
        },
        tabBarOptions: {
            activeTintColor: Platform.OS === 'ios' ? blue : white,
            labelStyle: {
                fontSize: 20
            },
            style: {
                height: 56,
                backgroundColor: Platform.OS === 'ios' ? white : black,
                shadowOffset: {
                    width: 0,
                    height: 3
                },
                shadowColor: 'rgba(0, 0, 0, 0.24)',
                shadowRadius: 6,
                shadowOpacity: 1
            }
        }
    }
)

export const AppNavigator = StackNavigator({
    Decks: {
        screen: Tabs,
        navigationOptions: {
            header: null
        },
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerStyle: {
                backgroundColor: black,
            },
            headerTintColor: white
        }
    },

    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerStyle: {
                backgroundColor: black
            },
            headerTintColor: white
        }
    },

    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerStyle: {
                backgroundColor: black,
            },
            headerTintColor: white
        }
    }
})