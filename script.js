//module pattern for gameBoard
const gameBoard = (function () {
    const arr = ['-', '-', '-', '-', '-', '-', '-', '-', '-'];

    const populateArray = (index, player) => {
        arr[index] = player.returnChoice();
    }

    //return statements, functions etc
    return {
        populateArray,
        array: arr
    };
})();

//module pattern for displayController
const displayController = (function () {
    const displayArray = () => {
        for (i = 0; i < gameBoard.array.length; i++) {
            console.log(gameBoard.array[i]);
        }
    }

    return {
        displayArray
    };
})();

//moduel pattern for glame flow (Game)
const Game = (function(){
    let isPlayer_1_turn;

    //constrol the flow
    const flow = ()=>{
        if(isPlayer_1_turn === true){
            Player1_Choose();
            isPlayer_1_turn = false;
        }
        else{
            Player2_Choose();
            isPlayer_1_turn = true;
        }
    }
    const start = () =>{
        isPlayer_1_turn = false;

        flow();
    }

    //returns
    return{
        start
    }
})();


//factory functions for the players
function players(name, choice) {
    const returnName = () => name;
    const returnChoice = () => choice;
    return {
        returnName,
        returnChoice
    }
}


const player1 = players('Ameer', 'X');
const player2 = players('Hamza', 'O');


// gameBoard.populateArray(0, player1);
// gameBoard.populateArray(1, player2);
// gameBoard.populateArray(2, player1);
// gameBoard.populateArray(3, player2);
// gameBoard.populateArray(4, player1);
// gameBoard.populateArray(5, player2);
// gameBoard.populateArray(6, player1);
// gameBoard.populateArray(7, player2);
// gameBoard.populateArray(8, player1);

// displayController.displayArray();

Game.start();