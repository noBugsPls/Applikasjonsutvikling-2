import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public", { extensions: ["html"] }));

//==================================== Functions ====================================
function getRoot(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send("Hello World").end();
}

function getPoem(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();
}

function getQuote(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send(quotes[randomQuoteNumber]).end();
}

function getSum(req, res, next) {
  const a = parseFloat(req.params.a);
  const b = parseFloat(req.params.b);
  const sum = a + b;

  if(isNaN(a) || isNaN(b)) {
    res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Invalid input. You need to provide two numbers.").end();
  }

  res.status(HTTP_CODES.SUCCESS.OK).send(`The sum of ${a} + ${b} = ${sum}`).end();
}

function postDeck(req, res, next) {
    const newDeck = createDeck();
    decks[newDeck.deck_id] = newDeck;
  res.status(HTTP_CODES.SUCCESS.OK).send({deck_id: newDeck.deck_id}).end();
}

function createDeck() {
    const suits = [{name: "hearts", symbol: "♥"}, {name: "diamonds", symbol: "♦"}, {name: "clubs", symbol: "♣"}, {name: "spades", symbol: "♠"}];
    const values = [{value: "1", name: "ace"}, {value: "2", name: "two"}, {value: "3", name: "three"}, {value: "4", name: "four"}, {value: "5", name: "five"}, {value: "6", name: "six"}, {value: "7", name: "seven"}, {value: "8", name: "eight"}, {value: "9", name: "nine"}, {value: "10", name: "ten"}, {value: "11", name: "jack"}, {value: "12", name: "queen"}, {value: "13", name: "king"}];

    let deck_id;

    if(decks.length === 0) {
      deck_id = 1;
    }else{
      deck_id = decks.length;
    }

    const cards = [];

    for(const suit of suits){
        for(const value of values){
            cards.push({suit: suit.symbol, value: value.value});
        }
    }
    return {deck_id, cards, remaining: cards.length};
}

function getCard(req, res, next) {
    const deck_id = req.params.deck_id;
    const deck = decks[deck_id];

    if(deck === undefined) {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.").end();
    }

    if(deck.remaining === 0) {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("No cards remaining.").end();
    }

    const randomCardIndex = Math.floor(Math.random() * deck.cards.length);

    const card = deck.cards.splice(randomCardIndex, 1);
    const drawnCard = card[0];
    deck.remaining = deck.cards.length;

    res.status(HTTP_CODES.SUCCESS.OK).json({drawnCard, remaining: deck.remaining}).end();
}

function shuffleDeck(req, res, next) {
    const deck_id = req.params.deck_id;
    const deck = decks[deck_id];

    if(deck === undefined) {
        res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.").end();
    }

    deck.cards.sort(() => Math.random() - 0.5);

    res.status(HTTP_CODES.SUCCESS.OK).json({shuffled: "true"}).end();
}

function showDeck(req, res, next) {
    const deck_id = req.params.deck_id;
    const deck = decks[deck_id];

    if (!deck) {
        return res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Deck not found.");
    }

    // Sjekk om deck.cards er et array
    if (!Array.isArray(deck.cards)) {
        return res.status(HTTP_CODES.CLIENT_ERROR.BAD_REQUEST).send("Deck.cards is not valid.");
    }

    // Bygg en streng som representerer kortstokken
    let deckString = [];
    for (const card of deck.cards) {
        deckString.push(`value: ${card.value}, suit: ${card.suit}`);
    }

    // Send kortstokken som svar
    res.status(HTTP_CODES.SUCCESS.OK).json(deckString);
}

//http://localhost:8000/temp/shuffle/2
//http://localhost:8000/temp/deck

//==================================== Routes ====================================
//------------------------ GET ------------------------
server.get("/", getRoot);
server.get("/tmp/poem", getPoem);
server.get("/tmp/quote", getQuote);
server.get("/temp/deck/:deck_id/card", getCard);
server.get("/temp/deck/:deck_id", showDeck);

//------------------------ POST ------------------------
server.post("/tmp/sum/:a/:b", getSum);
server.post("/temp/deck", postDeck);

//------------------------ PATCH ------------------------
server.patch("/temp/deck/shuffle/:deck_id", shuffleDeck);

//------------------------ 404 error-code ------------------------
server.use((req, res, next) => {
    res.status(HTTP_CODES.CLIENT_ERROR.NOT_FOUND).send("Page not found.").end();
});

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

//==================================== Data ====================================

const decks = [];

const poem = `<pre>
Jeg våknet en natt av en underlig drøm
det var som en stemme talte til meg
fjern som en underjordisk strøm-
og jeg reiste meg opp: Hva er det du vil meg?

– Du må ikke sove! Du må ikke sove.
Du må ikke tro at du bare har drømt
I går ble jeg dømt
I natt reiste de skafottet i gården
De henter meg klokken fem i morgen

Hele kjelleren her er full
og alle kaserner har kjeller ved kjeller
Vi ligger og venter i stenkalde celler
Vi ligger og råtner i mørke hull!

Vi vet ikke selv hva vi ligger og venter
og hvem der kan bli den neste de henter
Vi stønner vi skriker – men kan dere høre?
Kan dere absolutt ingen ting gjøre?

Ingen får se oss
Ingen får vite hva der skal skje oss
Ennu mer:
Ingen kan tro hva her daglig skjer
Du mener det kan ikke være sant
så onde kan da ikke mennesker være
Der fins da vel skikkelige folk i blant?
Bror, du har ennu meget å lære!

Man sa: Du skal gi ditt liv om det kreves
Og nu har vi gitt det – forgjeves, forgjeves
Verden har glemt oss! Vi er bedratt!
Du må ikke sove mer i natt!

Du må ikke gå til ditt kjøpmannskap
og tenke på hva der gir vinning og tap!
Du må ikke skylde på åker og fe
og at du har mer enn nok med det!
Du må ikke sitte trygt i ditt hjem
og si: Det er sørgelig, stakkars dem!
Du må ikke tåle så inderlig vel
den urett som ikke rammer deg selv!
Jeg roper med siste pust av min stemme
Du har ikke lov å gå der og glemme!

Tilgi dem ikke, de vet hva de gjør!
De puster på hatets og ondskapens glør!
De liker å drepe, de frydes ved jammer,
de ønsker å se vår verden i flammer!
De ønsker å drukne oss alle i blod!
Tror du det ikke? Du vet det jo!

Du vet jo at skolebarn er soldater
som stimer med sang over torg og gater
og oppglødd av mødrenes fromme svik
vil verge sitt land og gå i krig

Du kjenner det nedrige folkebedrag
med heltemot og med tro og ære-
du vet at en helt, det vil barnet være,
du vet han vil vifte med sabel og flagg!

Og så skal han ut i en skur av stål
og henge igjen i en piggtrådvase
og råtne for Hitlers ariske rase!
Du vet det er menneskets mening og mål!

Jeg skjønte det ikke. Nu er det for sent.
Min dom er rettferdig. Min straff er fortjent
Jeg trodde på fremgang, jeg trodde på fred
på arbeid, på samhold, på kjærlighet!
Men den som ikke vil dø i en flokk
får prøve alene, på bøddelens blokk!

Jeg roper i mørket- å, kunne du høre
Det er en eneste ting å gjøre:
Verg deg, men du har frie hender!
Frels dine barn! Europa brenner!

Jeg skaket av frost. Jeg fikk på meg klær
Ute var glitrende stjernevær
Bare en ulmende stripe i øst
varslet det samme som drømmens røst:

Dagen bakenom jordens rand
steg med et skjær av blod og brann
steg med en angst så åndeløs
at det var som om selve stjernene frøs!

Jeg tenkte: Nu er det noe som hender.-
Vår tid er forbi – Europa brenner!

"Du må ikke sove" av Arnulf Øverland.
Utgitt 1937.
    </pre>`;

const quotes = [
  `<pre>But man is not made for defeat. A man can be destroyed but not defeated.

Ernest Hemingway
    </pre>`,
  `<pre>When you reach the end of your rope, tie a knot in it and hang on.

Franklin D. Roosevelt
    </pre>`,
  `<pre>You cannot shake hands with a clenched fist.

Indira Gandhi
    </pre>`,
  `<pre>It is better to be feared than loved, if you cannot be both.

Niccolo Machiavelli
    </pre>`,
  `<pre>Learning never exhausts the mind.

    Leonardo da Vinci
    </pre>`,
  `<pre>There is no charm equal to tenderness of heart.

Jane Austen
    </pre>`,
  `<pre>No act of kindness, no matter how small, is ever wasted.

Aesop
    </pre>`,
];

const randomQuoteNumber = Math.floor(Math.random() * quotes.length);
