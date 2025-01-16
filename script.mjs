import express from "express";
import HTTP_CODES from "./utils/httpCodes.mjs";

const server = express();
const port = process.env.PORT || 8000;

server.set("port", port);
server.use(express.static("public"));

function getRoot(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send("Hello World").end();
}

function getPoem(req, res, next) {
  res.status(HTTP_CODES.SUCCESS.OK).send(poem).end();
}

server.get("/", getRoot);
server.get("/tmp/poem", getPoem);

server.listen(server.get("port"), function () {
  console.log("server running", server.get("port"));
});

const poem = `
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
    `;
