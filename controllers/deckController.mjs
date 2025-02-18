
import HTTP_CODES from "../utils/httpCodes.mjs";

const decks = [];

function createDeck() {
    const suits = [
        {name: "hearts", symbol: "♥"}, 
        {name: "diamonds", symbol: "♦"}, 
        {name: "clubs", symbol: "♣"}, 
        {name: "spades", symbol: "♠"}
    ];

    const values = [
        {value: "1", name: "Ace"}, 
        {value: "2", name: "two"}, 
        {value: "3", name: "three"}, 
        {value: "4", name: "four"}, 
        {value: "5", name: "five"}, 
        {value: "6", name: "six"}, 
        {value: "7", name: "seven"}, 
        {value: "8", name: "eight"}, 
        {value: "9", name: "nine"}, 
        {value: "10", name: "ten"}, 
        {value: "11", name: "Jack"}, 
        {value: "12", name: "Queen"}, 
        {value: "13", name: "King"}
    ];

    let deck_id = 1;
    deck_id = decks.length + 1;

    const cards = [];

    for(const suit of suits){
        for(const value of values){
          if(value.value === "1" || value.value === "11" || value.value === "12" || value.value === "13") {
            cards.push({suit: suit.symbol, value: value.name.charAt(0)});
          }else{
            cards.push({suit: suit.symbol, value: value.value});
          }
        }
    }
    return {deck_id, cards, remaining: cards.length};
};

export function createDeckHandler(req, res, next) {
    const newDeck = createDeck();
    decks.push(newDeck);
  return res.status(HTTP_CODES.SUCCESS.OK).send({deck_id: newDeck.deck_id}).end();
};

export function getCardHandler(req, res, next) {
    const deck_id = parseInt(req.params.deck_id);
    const deck = decks.find(d => d.deck_id === deck_id);


    if(deck === undefined) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.").end();
    }

    if(deck.remaining === 0) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards remaining.").end();
    }

    const randomCardIndex = Math.floor(Math.random() * deck.cards.length);

    const card = deck.cards.splice(randomCardIndex, 1);
    const drawnCard = card[0];
    deck.remaining = deck.cards.length;

    return res.status(HTTP_CODES.SUCCESS.OK).json({drawnCard, remaining: deck.remaining}).end();
};

export function shuffleDeckHandler(req, res, next) {
    const deck_id = parseInt(req.params.deck_id);
    const deck = decks.find(d => d.deck_id === deck_id);


    if(deck === undefined) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.").end();
    }

    deck.cards.sort(() => Math.random() - 0.5);

    return res.status(HTTP_CODES.SUCCESS.OK).json({shuffled: "true"}).end();
};

export function showDeckHandler(req, res, next) {
    const deck_id = parseInt(req.params.deck_id);
    const deck = decks.find(d => d.deck_id === deck_id);

    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.").end();
    }

    if (!Array.isArray(deck.cards)) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Deck.cards is not valid.");
    }

    let deckString = [];
    for (const card of deck.cards) {
        deckString.push(`value: ${card.value}, suit: ${card.suit}`);
    }

    res.status(HTTP_CODES.SUCCESS.OK).json(deckString);
};