document.addEventListener('DOMContentLoaded', function() {
    const brandListElement = document.getElementById('brandList');

    // Dummy data (replace with actual data or fetch from a server)
    const sponsoredBrandsData = [
        'Brand A',
        'Brand B',
        'Brand C',
        'Brand D',
        'Brand E',
        // Add more brands as needed
    ];

    // Display the list of sponsored brands
    sponsoredBrandsData.forEach(brandName => {
        const brandCard = document.createElement('div');
        brandCard.classList.add('brandCard');
        brandCard.textContent = brandName;
        brandListElement.appendChild(brandCard);
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const insurancePlansElement = document.getElementById('insurancePlans');

    // Dummy data (replace with actual data or fetch from a server)
    const insurancePlansData = [
        { name: 'Plan A', coverage: 'Comprehensive coverage', cost: '$100/month' },
        { name: 'Plan B', coverage: 'Basic coverage', cost: '$75/month' },
        { name: 'Plan C', coverage: 'Specialized coverage', cost: '$120/month' },
        // Add more plans as needed
    ];

    // Display the list of insurance plans
    insurancePlansData.forEach(plan => {
        const insuranceCard = document.createElement('div');
        insuranceCard.classList.add('insuranceCard');
        insuranceCard.innerHTML = `<h3>${plan.name}</h3>
                                   <p><strong>Coverage:</strong> ${plan.coverage}</p>
                                   <p><strong>Cost:</strong> ${plan.cost}</p>`;
        insurancePlansElement.appendChild(insuranceCard);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const reviewsListElement = document.getElementById('reviewsList');
    const reviewInput = document.getElementById('reviewInput');

    function addReview() {
        const reviewText = reviewInput.value;
        if (reviewText.trim() !== '') {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('reviewCard');
            reviewCard.textContent = reviewText;
            reviewsListElement.appendChild(reviewCard);
            reviewInput.value = '';
        }
    }

    // You can add default reviews or fetch reviews from a server here.

    window.addReview = addReview;
});

start_game();

const gameHangman = (arrClue) => {
        if (arrClue == undefined) {
            throw new Error(`
            Parametro de 
            [{ type: string, answer: string, value: string }]
            es requerido para el juego.
        `);
        };

        const alphabet = [
            ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", ],
            ["A", "S", "D", "F", "G", "H", "J", "K", "L", ],
            ["Z", "X", "C", "V", "B", "N", "M", ],
        ];
        let level = 0;
        let totalLevel = arrClue.length;
        let lifes = 3 // default;
        let attemptsDefault = 3 // attempts by clue, if lose all attempts lose once live;
        let attempts = attemptsDefault // attempts by clue, if lose all attempts lose once live;
        let answerLength = 0;
        let currentAnswers = [];
        let corretAnswers = 0; // sirve para validad answerLength en la función fn_pressKey
        let globalScore;
        let globalTime = 120;
        let timeInterval

        // Elements
        let clueNewAudio = document.createElement('audio');
        clueNewAudio.setAttribute('controls', 'true');
        let clueNewImage = document.createElement('img');
        let clueNewText = document.createElement('div');
        let mesagge = document.createElement('div');

        let timeGameElm = document.querySelector('.c-game_time')
        let lifesGameElm = document.querySelector('.c-game_lifes')
        let alertGameElm = document.querySelector('.c-game_alert')
        let finishGameElm = document.querySelector('.c-game_finish')

        let attemptsElem = document.querySelector('.game-hangman_attempts');
        let clueElem = document.querySelector('.game-hangman_clue');
        let answerWaitedElm = document.querySelector('.game-hangman_answerWaited')
        let keyBoardElem = document.querySelector('.game-hangman_keyboard')

        let setGlobalTime = (duration, display, callback) => {
            let timer = duration,
                minutes, seconds;
            let fnCallBack = callback ? callback.bind(callback) : null;
            timeInterval = setInterval(function() {
                minutes = parseInt(timer / 60, 10)
                seconds = parseInt(timer % 60, 10);

                minutes = minutes < 10 ? "0" + minutes : minutes;
                seconds = seconds < 10 ? "0" + seconds : seconds;
                // Elemento que recibe la información del tiempo transcurrido
                display.textContent = minutes + ":" + seconds;

                if (--timer < 0) {
                    timer = duration;
                    clearInterval(timeInterval);
                    callback ? fnCallBack(callback) : null;
                }
            }, 1000);
        };
        let set_keyboard = (alphabet) => {
            if (!keyBoardElem.hasChildNodes()) {
                alphabet.map(
                    row => {
                        let newRow = document.createElement('div');
                        newRow.classList.add('game-hangman_keyboard-row');
                        row.map(
                            letter => {
                                let key = document.createElement('input');
                                key.classList.add('game-hangman_keyboard-key');
                                key.setAttribute('type', 'button');
                                key.setAttribute('value', letter);
                                key.addEventListener('click', function() {
                                    fn_pressKey(key);
                                })
                                newRow.appendChild(key)
                            }
                        )
                        keyBoardElem.appendChild(newRow);
                    }
                );
            };
        };
        let clean_keyboard = () => {
            [].slice.call(keyBoardElem.children).map(
                row => {
                    [].slice.call(row.children).map(
                        key => {
                            key.classList.remove('is-good', 'is-wrong')
                        }
                    );
                }
            )
        };
        let set_answerWaited = (answer) => {
            answerWaitedElm.innerHTML = '';
            let countLetterAnswers = answer.length;
            for (let i = 0; i < answer.length; i++) {
                let letter = document.createElement('input');
                let className = ['game-hangman_answerWaited-letter', 'game-hangman_answerWaited-space'];
                letter.setAttribute('type', 'button');
                letter.setAttribute('letter', answer[i]);

                if (answer[i] == ' ') {
                    letter.classList.add(className[1]);
                    --countLetterAnswers
                } else {
                    letter.classList.add(className[0]);
                    currentAnswers.push(answer[i].toLowerCase());
                };
                answerWaitedElm.appendChild(letter);
            };
            answerLength = countLetterAnswers;
        };
        let set_scene = (currentLevel) => {
            if (level >= totalLevel) {
                clearInterval(timeInterval);
                console.log('you win');
                return
            }

            // Set info attempts
            attempts = attemptsDefault;
            attemptsElem.setAttribute('attempts', attempts);

            // Set clue and answer and include into scene
            const { type, answer, clue } = arrClue[currentLevel];
            let typeClue;
            switch (type) { // string: img || audio || text.
                case 'img':
                    typeClue = clueNewImage;
                    typeClue.setAttribute('src', clue);
                    break
                case 'audio':
                    typeClue = clueNewAudio;
                    typeClue.setAttribute('src', clue);
                    break
                default:
                    typeClue = clueNewText;
                    typeClue.textContent = clue;
                    break
            };
            clueElem.innerHTML = '';
            clueElem.appendChild(typeClue);
            set_answerWaited(answer);
            // set globalScore and include into scene
        };
        let nextLevel = () => {
            level++;
            corretAnswers = 0;
            currentAnswers = [];
            fn_cleanScene();
            set_scene(level);
        };
        let fn_pressKey = (key) => {
            [].slice.call(answerWaitedElm.children).forEach(
                child => {
                    let letter = child.getAttribute('letter').toLowerCase()
                    if (key.value.toLowerCase() === letter) {
                        child.setAttribute('value', key.value)
                            ++corretAnswers;
                    }
                }
            );
            if (currentAnswers.includes(key.value.toLowerCase())) {
                key.classList.add('is-good');
            } else {
                key.classList.add('is-wrong');
                attempts--;
                attemptsElem.setAttribute('attempts', attempts);
                if (attempts == 0) {
                    setTimeout(
                        () => {
                            lifeLose();
                        }, 2000
                    )
                }
            }
            if (lifes == 0) youLose();
            if (answerLength == corretAnswers) {
                console.log('Supper, next.');
                attemptsElem.setAttribute('attempts', 4);
                setTimeout(
                    () => {
                        nextLevel();
                    }, 2000
                )
            }
        };
        let fn_cleanScene = () => {
            clean_keyboard();
        };
        let fn_resetKeys = () => {
            answerWaitedElm.innerHTML = ''
        };
        let fn_resetGame = () => {
            level = 0;
            lifes = 3;
            attempts = attemptsDefault;
            attemptsElem.setAttribute('attempts', attempts);
            answerLength = 0;
            currentAnswers = [];
            corretAnswers = 0;
            globalTime = 60;
            fn_resetKeys();
            fn_cleanScene();
            clearInterval(timeInterval);
            fn_init(level);
        };
        let lifeLose = () => {
            --lifes;
            lifesGameElm.textContent = lifes;
            attempts = attemptsDefault;
            attemptsElem.setAttribute('attempts', attempts);
        }
        let youWin = () => {};
        let youLose = () => {
            mesagge.textContent = 'Perdiste'
            alertGameElm.style.display = 'block';
            finishGameElm.style.display = 'block';
            finishGameElm.appendChild(mesagge)

            setTimeout(
                () => {
                    alertGameElm.style.display = 'none';
                    finishGameElm.style.display = 'none';
                    mesagge.textContent = 'none'
                        // fn_resetGame();
                }, 2000
            )
        };
        let fn_init = (currentLevel) => {
            set_scene(currentLevel);
            set_keyboard(alphabet);
            setGlobalTime(globalTime, timeGameElm, youLose);
            lifesGameElm.textContent = lifes
        };

        fn_init(level);
    }
    // https://html5tutorial.info/media/vincent.mp3
let hangmanOptions = [{
        type: 'text',
        clue: 'El segundo en derrotar a freezer',
        answer: 'Trunks',
    },
    {
        type: 'text',
        clue: 'Sayayin entrenado por Pikoro',
        answer: 'Gohan',
    },
    {
        type: 'text',
        clue: 'Sayayin entrenado por Gohan',
        answer: 'Kakaroto',
    },
    {
        type: 'text',
        clue: 'Nombre del maestro de Roshi o Tsuru',
        answer: 'Mutaito',
    },
    {
        type: 'text',
        clue: '¿Dónde vive el Maestro Roshi?',
        answer: 'Kame House',
    },
]
gameHangman(hangmanOptions)