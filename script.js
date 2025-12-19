// DEBUGGING STUFF
let skip = "<button type='button' onclick='Next()'>Skip</button>";
let debug = 0;

// ======================================== POZIOMY ==============================================
let level = 0; // level number
// odpowiedzi do poziomów---------------------------------------------------------
let passcodes = [
    'prezent',
    'trudnehaslo',
    'zegar',
    'uek',
    '20.10.1955',
    '', // kółko i krzyżyk
    'bielsko-biała',
    'pi',
    'smok',
    '912837546',
    'edynburg',
    '17 kwietnia',
    '', // test IQ
    'blisko',
    'i burned it',
    '963857',
    'zielony pancernik'];
let infotable = [
    "Najwyraźniej znalazłaś hasło. Teraz mogę powiedzieć co się dzieje. Pewien człowiek, którego obserwowaliśmy od pewnego czasu dziwnie znikł. Nie jesteśmy pewni dlaczego, ale zostawił za sobą zagadki. Potrzebujemy, żeby ktoś się nimi zajął i to będzie właśnie Pani. Mam tylko nadzieję, że trafił do dobrej osoby.",
    "To był tylko taki prosty test, by sprawdzić Pani umiejętności. Widać, że dobrze wybraliśmy. Następna zagadka jest już od podejrzanego. Powodzenia w misji.",
    "Ukryta wiadomość, brzmi jak coś co sam bym zrobił. A chwila, przecież tak zrobiłem. To pewnie musiała być dla Pani prościzna.",
    "Podejrzany wydaję się być kreatywniejszy, niż nam się wydawało. Ukrywać hasła w choince, kto by pomyślał.",
    "Serio? Władca Pierścieni? Słyszałem, że dobry, ale nigdy nie oglądałem. Może lubi fantasy? To kolejny krok w celu odkrycia kim jest podejrzany!",
    "Tego to w ogóle się nie spodziewałem. Żeby zagadką było kółko i krzyżyk. Podejrzany pewnie myślał, że bot jest nie do pokonania. Mądrze to Pani wymyśliła. Ciekawe co jeszcze przygotował.",
    "To miejsce... To dziwne, że ma te zdjęcia. Może je komuś ukradł? A może są z jego własnej kolekcji? Kto może być podejrzanym?",
    "Huh, niezły z niego matematyk. Liczmy tylko, że to koniec matmy. Niecierpiałem jej w liceum.",
    "Ładny rysuneczek, sam bym nie umiał lepiej. Teraz sobie przypomniałem, że nic nie powiedziałem o naszej organizacji. Jest to \"Organizacja Rządowa, Której Nazwy Nie Wolno Wypowiadać\", w skrócie ORKNNWW, albo jak ja ją lubię nazywać \"Orka Na Wodzie\". Zajmujemy się kontrolą podejrzanych ludzi. Obserwujemy, sprawdzamy, przeszukujemy. Wyobraź sobie FBI, ale w Polsce. Oczywiście robimy to wszystko w granicach moralności. Nie obserwujemy ludzi w łazienkach, nie pobieramy danych bankowych, itd. (no chyba, że to potrzebne). Całkiem spoko, co nie?",
    "WoW, chyba staje się coraz leniwszy.",
    "Edynburg, ciekawe miejsce. Może to plan jego ucieczki? Sam muszę kiedyś tam pojechać. Podobno jest tam klimat jak z Harrego Pottera. Nie jestem jakimś wielkim fanem, ale filmy były ładne.",
    "To miejsce? 17 kwietnia? Nie wiem skąd Pani wiedziała, ale podziwiam.",
    "Test IQ",
    "Wie, że go śledzimy. Specjalnie dał nam te wszystkie zagadki. Czemu to robi? Przecież to nie ma sensu.",
    "Ten film, co on spalił. Skoro spowodowało to pożar, to znaczy że musiało być o tym głośno. Idę to zgłosić organizacji.",
    "Udało się znaleźć lokalizację pożaru. Na miejscu znaleźliśmy strzępki papieru. Już Ci wysyłamy. Może Tobie się uda coś z tego zrobić."
];
// ukradł coś bardzo cennego, pani serce 😘
let input = "<input type='text' id='text'/>";
let check = "<button type='button' onclick='Check()'>OK</button>"; 
let next = "<button type='button' onclick='Next()'>Dalej</button>";
let main = document.querySelector('main');
let bad = document.createElement('p');
bad.id = 'bad';
bad.innerHTML = "Złe hasło";
let value ="";
let body = document.querySelector("body");
let info = document.querySelector("aside#info");
info.innerHTML = "";
info.style.display = "none";


// ========================================== Zmienne Kółko i krzyżyk ==========================================
let speed, grid, koniec, pola, loses, p, ust, noloses, n0, n1, n2, d0, d1, d2, x, turn, menu, stopTurn, isAI; 
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

// =============================================== Zmienne  Test ===============================================
let question, test, pytanie, odpowiedzi, testLoss;
let pytania = [
    "<p>1. Jak nazywa się ten kształt?</p><br><img src='img/bouba.png' alt='Bardzo wyboisty kształt'>",
    "<p>2. Które z tych zdań nie ma w sobie metonimy?</p>",
    "<p>3. Jakie zwierzęcie jest trzymane przez kobietę na obrazie?</p><br><img src='img/kobieta.png' alt='Dama z podłużnym zwierzęciem w rękach'>",
    "<p><a onclick='" + 'CheckAnswer("4")' + "'>4</a>. Ile to 2 + 2?</p>",
    "<p>5. W parcie 1 serii “JoJo's Bizzare Adventure”, który z bohaterów powiedział słowa: “Hey Baby” w oryginalnym (japońskim) dubbingu:</p>",
    "<p>6. Czy dalej mnie szukacie.</p>"
];
let answers = [
    ['Kiki', 'Bouba'],
    ['Aktualnie czytam Tuwima','Cała sala biła brawo','Janek wypił całą wodę z butelki','Piłka, tym żyje ulica'],
    ['Łasiczka','Kuna','Fretka','Gronostaj'],
    ['0','2','5','8'],
    ['Jonathan Joestar','Robert E.O. Speedwagon','Will Anthonio Zeppeli','Dio Brando'],
    ['Tak', 'Nie'], 
];
let correctAnswers = [
    'Bouba',
    'Janek wypił całą wodę z butelki',
    'Gronostaj',
    '4',
    'Will Anthonio Zeppeli',
    'Tak'
]

function CL(s){
    console.log(s);
}

// #region Działanie strony
// ========================================== DZIAŁANIE STRONY ========================================== 
// ------------------------------- Setup refresh ------------------------------- 
Refresh();
// ------------------------------ Następny poziom ------------------------------ 
function Next(){
    level++;
    info.innerHTML = "";
    info.style.display = "none";
    Refresh();
}
// ------------------------ Odświeżanie (budowa strony) ------------------------
function Refresh(){
    console.log(level);
    // poziomy
    main.innerHTML = "";
    // case dla kazdego poziomu
    switch (level){
        case 0: // pierwsza strona 
        case 1: // cezar
        case 2: // tekst
        case 3: // kropki
        case 4: // cytat 
        case 6: // zdjecia
        case 7: // wiersz pi
        case 8: // gwiazdozbiór
        case 9: // sudoku
        case 10: // mapa
        case 11: // koordynaty
        case 13: // ave maria
        case 14: // youtube
        case 15: // matematyka
        case 16: // puzzle
            main.innerHTML = "<fieldset>" + input + check + "</fieldset>";
            break;
        case 5: // kółko i krzyżyk
            let  kik = document.createElement('div');
            kik.id = 'kik'; 
            main.appendChild(kik);
            let xo = document.createElement('div');
            xo.id = 'XO'; 
            kik.appendChild(xo);
            // 
            for(let i = 0; i < 9; i++){
                let ttt = `<button id='x${i}' class='ttt' onclick='SetPole(${i})'></button>`;
                xo.innerHTML += ttt;
            };  
            // ustawianie zmiennych
            turn = 0;
            speed = 800; // sec * 1000
            grid = ".........";
            pola = document.querySelectorAll(".ttt");
            koniec = false;
            p = document.createElement('p');
            ust = "<button id='ust' onclick='Menu()'><img src='img/XOs/ust.png' alt='⚙'></button>";
            stopTurn = false;
            isAI = false;
            // ustawienia przegranych
            loses = 0;
            noloses = document.createElement('h2');
            noloses.id = 'noloses';
            break;
        case 12: // test
            question = 0;

            
            test = document.createElement('div');
            test.id = 'test';
            
            
            pytanie = document.createElement('div');
            pytanie.id = 'pytanie';
            test.appendChild(pytanie);



            odpowiedzi = document.createElement('div');
            odpowiedzi.id = 'odpowiedzi';
            test.appendChild(odpowiedzi);

            testLoss = document.createElement('div');
            testLoss.id = 'testLoss';
            testLoss.innerHTML = "<button onclick='RetryTest()'>Spróbuj ponownie</button>";
            testLoss.style.display = 'none';
            
            main.appendChild(test);
            main.appendChild(testLoss);

            Test();
            break;
        case 17:
            // GUZIK KOŃCOWY - wysyła do youtube, dokładny adres
        default: 
            console.log('ajaj');
    }
    if(debug){
        body.innerHTML += skip;
    }
}
// -------------------------- Sprawdzanie  odpowiedzi -------------------------- 
function Check(){
    value = "";
    if(document.getElementById('text') != null){
        value = document.getElementById('text').value.trim().toLowerCase();
    }

    if (value == passcodes[16]){
        Ending();
        return;
    }

    if (value != passcodes[level]) {
        if(document.querySelector("#bad") == null){
            main.innerHTML += "<br>";
            main.appendChild(bad);
        }
    } else {
        if (document.querySelector("main #bad") != null) {
            main.removeChild(bad);
        }
        info.innerHTML = infotable[level] + next;
        body.appendChild(info);
        info.style.display = "block";
    }
}
// =======================================================================================================================
// #endregion

// #region Kółko i krzyżyk
// =================================================== KÓŁKO I KRZYŻYK ===================================================
// --------------------------- Odblokowanie  pustych ---------------------------
function Enable(){
    stopTurn = false;
}
// -------------------------------- Blokada pól --------------------------------
function Disable(){
    stopTurn = true;
}
// ------------------------------ Ustalanie  tury ------------------------------
function TicTacToe(){
    Disable();
    TTT();
    CheckWin();
}
// ----------------------------------- Tura ------------------------------------
function SetPole(n){
    if(!koniec){
        if(!stopTurn){
            if(grid[n]=="."){
                stopTurn = true;
                grid = grid.substring(0, n) + 'o' + grid.substring(n + 1);
                TicTacToe();
                turn++;
                if(!koniec){
                    let x = AI(n); // AI wybrane pole
                    setTimeout(function(){
                        grid = grid.substring(0, x) + 'x' + grid.substring(x + 1);
                        TicTacToe();
                        stopTurn = false;
                        console.log(n + "    " + x);
                    }, speed);
                }
            }
        }
    }
}
// ------------------------------ Kolorwanie  pól ------------------------------
function TTT(){
    if(grid.indexOf(".") < 0){ // if no "."
        koniec = true;
        p.innerHTML = 'REMIS'; // KONIEC ==============================================
        Koniec();
    }
    const pole = document.querySelectorAll(".ttt");
    for(let i = 0; i < grid.length ; i++){
        switch (grid[i]){
            case ".":
                pole[i].style.background = 'white';
                break;
            case "o":
                pole[i].style.background = 'url(img/XOs/o.png),white';
                break;
            case "x":
                pole[i].style.background = 'url(img/XOs/x.png),white';
                break;       
        }
    }
}
// --------------------------- Sprawdzanie  wygranej ---------------------------
function CheckWin(){
    for (let pattern of winPatterns) {
        let pos1Val = grid[pattern[0]];
        let pos2Val = grid[pattern[1]];
        let pos3Val = grid[pattern[2]];
        if(pos1Val == pos2Val && pos2Val == pos3Val && pos1Val != '.'){
            if(pos1Val == 'x'){
                p.innerHTML = 'Przegrana';
            } else{
                p.innerHTML = 'Wygrana';
            }
            koniec = true; // KONIEC ==============================================
            Koniec();
        }
    }
}
// ------------------------------- Decyzje  bota -------------------------------
function AI(n){
    first: switch (turn){
        case 0:
            x = Math.floor(Math.random() * 9);
            d0 = x;
            break;
        case 1:
            n1 = n;
            switch (n1){
                case 1: 
                case 3:
                    x = 0;
                    break;
                case 4:
                    if(n0 == 0){
                    x = 8;
                    } else {
                    x = 0;
                    }
                    break;
                case 5:
                    x = 2;
                    break;
                case 7:
                    x = 1;
                    break;
                default:
                    x = 4;
            }
            break;
        case 2:
            n2 = n;
            switch (n1){
                case 0:
                    if (n2 == 8){
                        x = 1;
                        break first;
                    } else if(n2 == 7){
                        x = 3;
                        break first;
                    }
                    break;
                case 2:
                    if (n2 == 6){
                        x = 1;
                        break first;
                    } else if(n2 == 8){
                        x = 5;
                        break first;
                    }
                    break;
                case 6:
                    if (n2 == 2){
                        x = 1;
                        break first;
                    } else if(n2 == 5){
                        x = 7;
                        break first;
                    }
                    break;
                case 8:
                    if (n2 == 0){
                        x = 1;
                        break first;
                    } else if(n2 == 1){
                        x = 5;
                    }
                    break;
                
                case 1:
                    if(n2 == 6 || n2 == 8 || n2 == 3 || n2 == 5){
                        x = 4;
                        break first;
                    }
                    break;
                case 3:
                    if(n2 == 2 || n2 == 8 || n2 == 1 || n2 == 7){
                        x = 4;
                        break first;
                    }
                    break;
                case 5:
                    if(n2 == 6 || n2 == 0 || n2 == 1 || n2 == 7){
                        x = 4;
                        break first;
                    }
                    break;
                case 7:
                    if(n2 == 0 || n2 == 2){
                        x = 4;
                        break first;
                    } else if(n2 == 3 || n2 == 5){
                        x = 6;
                        break first;
                    } 
                    break;
            }
        case 3:
            if((n1 == 7 && n2 == 3 && n == 2) || (n1 == 7 && n2 == 5 && n == 0)){
                x = 4;
                break first;
            } 
        default:
            x = AItwo();
    }
    return x;
}
function AI1(n){
    first: switch (turn){
        case 0:
            x = Math.floor(Math.random() * 9);
            d0 = x;
            break;
        case 1:
            d1 = n;
            switch (d1){
                case 1: 
                case 3:
                    x = 0;
                    break;
                case 4:
                    if(d0 == 0){
                    x = 8;
                    } else {
                    x = 0;
                    }
                    break;
                case 5:
                    x = 2;
                    break;
                case 7:
                    x = 1;
                    break;
                default:
                    x = 4;
            }
            break;
        case 2:
            d2 = n;
            switch (d1){
                case 0:
                    if (d2 == 8){
                        x = 1;
                        break first;
                    } else if(d2 == 7){
                        x = 3;
                        break first;
                    }
                    break;
                case 2:
                    if (d2 == 6){
                        x = 1;
                        break first;
                    } else if(d2 == 8){
                        x = 5;
                        break first;
                    }
                    break;
                case 6:
                    if (d2 == 2){
                        x = 1;
                        break first;
                    } else if(d2 == 5){
                        x = 7;
                        break first;
                    }
                    break;
                case 8:
                    if (d2 == 0){
                        x = 1;
                        break first;
                    } else if(d2 == 1){
                        x = 5;
                    }
                    break;
                
                case 1:
                    if(d2 == 6 || d2 == 8 || d2 == 3 || d2 == 5){
                        x = 4;
                        break first;
                    }
                    break;
                case 3:
                    if(d2 == 2 || d2 == 8 || d2 == 1 || d2 == 7){
                        x = 4;
                        break first;
                    }
                    break;
                case 5:
                    if(d2 == 6 || d2 == 0 || d2 == 1 || d2 == 7){
                        x = 4;
                        break first;
                    }
                    break;
                case 7:
                    if(d2 == 0 || d2 == 2){
                        x = 4;
                        break first;
                    } else if(d2 == 3 || d2 == 5){
                        x = 6;
                        break first;
                    } 
                    break;
            }
        case 3:
            if((d1 == 7 && d2 == 3 && n == 2) || (d1 == 7 && d2 == 5 && n == 0)){
                x = 4;
                break first;
            } 
        default:
            x = AItwo();
    }
    return x;
}
// --------------------------- Czy 2 znaki  pod rząd ---------------------------
function AItwo(){
    for(let pattern of winPatterns){
        let pos1Val = grid[pattern[0]] == "x";
        let pos2Val = grid[pattern[1]] == "x";
        let pos3Val = grid[pattern[2]] == "x";
        if((pos1Val + pos2Val + pos3Val) == 2){
            if(grid[pattern[0]] == ".") return pattern[0];
            if(grid[pattern[1]] == ".") return pattern[1];
            if(grid[pattern[2]] == ".") return pattern[2];
        }
    }
    for(let pattern of winPatterns){
        let pos1Val = grid[pattern[0]] == "o";
        let pos2Val = grid[pattern[1]] == "o";
        let pos3Val = grid[pattern[2]] == "o";
        if((pos1Val + pos2Val + pos3Val) == 2){
            if(grid[pattern[0]] == ".") return pattern[0];
            if(grid[pattern[1]] == ".") return pattern[1];
            if(grid[pattern[2]] == ".") return pattern[2];
        }
    }
    for (let pole of grid){
        if(pole == '.') return grid.indexOf(pole);
    }
}
// -------------------------------- Koniec  gry --------------------------------
function Koniec(){
    Disable();
    if(!isAI){
        let retry = document.createElement('div');
        retry.id = 'retry';
        retry.appendChild(p);
        retry.innerHTML += `<button onclick='Retry()'>Retry</button>`;
        kik.appendChild(retry);
    }
    loses++;
    noloses.innerHTML = "Gry: " + loses; 
}
// -------------------------------- Restart gry --------------------------------
function Retry(){ 
    // ------------ ustawienia  ------------ 
    if(loses == 5){ 
        main.innerHTML += ust;
        menu = document.createElement('div');
        menu.id = 'menu';
        menu.innerHTML = 
        `<button type='button' id='exit' onclick="CloseMenu()">X</button>
            <br>
            <label for="music" id='setMusic'>Muzyka
            <input type="checkbox" name="music" id="music" onchange="PlayMusic(this.checked)">
            </label>
            <br>
            <label for="speed" id='setSpeed'>Prędkość
            <input type="range" name="speed" id="speed" min="1" max="11" step="1" value="3" onchange="ChangeSpeed(this.value)">
            </label>
            <br>
            <p>vs. AI</p>
            <br>
            <div id='setPlayer'>
                <label for="player">Player</label>
                <input type="radio" name="plyrAI" id="player" value="Player" checked onchange="ChangePlayer(this.value)">
                <label for="AI">AI</label>
                <input type="radio" name="plyrAI" id="AI" value="AI" onchange="ChangePlayer(this.value)">
            </div>`;
        main.appendChild(menu);
        menu.style.display = 'none';
        ust = document.getElementById('ust');
        // setup ustawień
    }

    if(loses == 1 ) {
        kik.appendChild(noloses);
    }


    // --------------- reset --------------- 
    grid = ".........";
    TTT();
    koniec = false;
    turn = 0;
    Enable();
    kik.removeChild(retry);
}
// ------------------------------- Okno ustawień -------------------------------
function Menu(){
    ust.style.display = 'none';
    menu.style.display = 'block';
}

function CloseMenu(){
    ust.style.display = 'block';
    menu.style.display = 'none';
}

let music = document.createElement('div');
music.id = 'music';
let musicsrc = 'Battle.mp3';
music.innerHTML = 
`<audio autoplay="autoplay" loop>
<source src="${musicsrc}"/>     
</audio>`;
function PlayMusic(val){
    if(val){
        main.appendChild(music);
        document.querySelector('div audio').play();
    } else{
        document.querySelector('div audio').currentTime = 0;
        main.removeChild(music);
    }

}

function ChangeSpeed(val){
    speed = (11 - val) * 100;
}

function ChangePlayer(val){
    main.removeChild(ust);
    main.removeChild(menu)
    if(document.querySelector("main #retry") != null){
        main.removeChild(document.querySelector("main #retry"));
    }
    if(document.querySelector("#kik h2") != null){
        kik.removeChild(document.querySelector("h2"));
    }
    grid = '.........';
    TicTacToe();
    loses = 0;
    speed = 2000;
    isAI = true;
    AIvsAI(1);
}

function AIvsAI(n){

    // AI 1
    turn = 0;
    n = AI1(n);
    grid = grid.substring(0, n) + 'o' + grid.substring(n + 1);
    TicTacToe();
    turn++;

    // AI 2
    AIsec(n);
}

function AIfir(n){
    if(!koniec){
        n = AI1(n); 
        setTimeout(function(){
            grid = grid.substring(0, n) + 'o' + grid.substring(n + 1);
            TicTacToe();
            turn++;
            AIsec(n);
        }, speed);
    } else{
        RestartAI();
    }
}
function AIsec(n){
    if(!koniec){
        n = AI(n); 
        setTimeout(function(){
            grid = grid.substring(0, n) + 'x' + grid.substring(n + 1);
            TicTacToe();
            AIfir(n);
        }, speed);
    } else{
        RestartAI();
    }
}



function RestartAI(){
    if(loses<150){
        grid = ".........";
        if(loses>16){ speed -= 2;}
        else if(loses>8){ speed -= 30;}
        else if(loses>4){ speed -= 100;}
        else{speed -= 300}
        koniec = false;
        AIvsAI(1);
    } else {

        main.removeChild(kik);
        let nextTTT = document.createElement('div');
        nextTTT.innerHTML = "<img src='img/XOs/boom.png'>";
        nextTTT.id = 'nextTTT';
        main.appendChild(nextTTT);
        if (document.querySelector('main #music')){
            main.removeChild(music);
        }
        setTimeout(()=>{
            nextTTT.innerHTML = check;
        }, 800);
    }
}


// =======================================================================================================================
// #endregion

// #region Test
// ========================================================  TEST ========================================================
function Test(){
    test = document.querySelector("#test");
    pytanie = document.querySelector("#test #pytanie");
    pytanie.innerHTML = pytania[question];
    odpowiedzi = document.querySelector('#test #odpowiedzi');
    answers[question].forEach(element => {
        console.log(element);
        odpowiedzi.innerHTML += `<button onclick="CheckAnswer(this.innerHTML)">${element}</button>`;
    });
    console.log(pytania[question]);
    if(question == 5){
        test.style.backgroundColor = "none";
        pytanie.style.backgroundColor = "none";
        odpowiedzi.style.backgroundColor = "none";
        main.style.backgroundImage = "url('img/eye.gif')";
    }
}

function NextQuestion(){
    question++;
    odpowiedzi.innerHTML = "";
    Test();
}

function CheckAnswer(chosen){
    console.log(chosen);
    if(question == 5){
        test.style.backgroundColor = "white";
        pytanie.style.backgroundColor = "white";
        odpowiedzi.style.backgroundColor = "white";
        main.style.backgroundImage = "none";
        Results();
        return; 
    } 
    if(chosen == correctAnswers[question]){
        console.log('BRAWO');
        
        NextQuestion();
        
    } else{
        testLoss.style.display = 'block';
    }
}

function RetryTest(){
    testLoss.style.display = 'none';
    odpowiedzi.innerHTML = '';
    pytanie.innerHTML = '';
    question = 0;
    Test();
}

function Results(){
    test.style.display = 'none';
    testLoss.innerHTML = "<p>Rozumiem.</p>"
    testLoss.style.display = 'block';
    testLoss.style.background = 'black';
    testLoss.style.position = "relative";
    setTimeout(function(){
        testLoss.innerHTML = next;
    },2000);
}
// =======================================================================================================================
// #endregion

function Ending(){
    let endingButton = "<a id='ending' href='https://youtu.be/auY9LBrd6xQ' target='_blank'>Prawda</a>";
    main.innerHTML = endingButton;
}
