# Azzanna la zucca

Simulatore grafico per il gioco da scacchiera **Azzanna la zucca** per 3 giocatori.

## Regole del gioco
*Azzanna la zucca* è un gioco asimmetrico.

I maiali vincono quando riescono a ridurre il numero delle Zucche e dei Broccoli in gioco a 2 o meno. Le Zucche e i Broccoli vincono se sopravvivono per almeno 20 turni.

Nel simulatore muovi i Maiali, con le frecce su tastiera o tramite swipe da tablet o smartphone.

Premi **r** sulla tastiera per attivare l'autoplay.

Le regole  complete del gioco sono qui:
<https://www.formikaio.it/blog/azzanna-la-zucca/>

## Demo online del simulatore per 2 giocatori
<https://www.whiletrue.it/azzanna-la-zucca/>


## Librerie utilizzate

- **Phaser**, motore grafico
- **Babel**, supporto sintassi ES2015
- **Webpack**, generatore la build e dev server

## Come si usa

- $ npm install -g webpack webpack-dev-server
- $ cd CARTELLA
- $ npm install

Poi, per visualizzare:
- $ webpack-dev-server
- puntare il browser su localhost:8080

Per compilare solamente:
- $ webpack


## TODO
- regola vittoria broccoli
- gameutils: considera anche i broccoli negli spostamenti, birthplace e looking functions


### Tutorial
- Webpack: <https://github.com/petehunt/webpack-howto>
- Moduli ES2015 e deep injection: <http://davidvujic.blogspot.it/2015/02/is-the-es6-import-feature-an-anti-pattern.html>
