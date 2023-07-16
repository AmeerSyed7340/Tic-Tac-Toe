//module pattern for gameBoard
const gameBoard = (function () {
    //array of objects with properties: choice("X" or "O"), chosen(boolean to not let players repopulate the same elements more than once)
    const arr = [
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },
        {
            choice: "",
            chosen: false
        },

    ];

    // player choice goes into array using this function
    const populateArray = (index, player) => {
        //console.log({ index, player });
        arr[index].choice = player.returnChoice();
        arr[index].chosen = true;
    }

    //return statements, functions for public access
    return {
        populateArray,
        array: arr
    };
})(); //end of gameboard

//module pattern for displayController
const displayController = (function () {

    const displayArray = (e, index) => {
        //display choice on div
        e.target.textContent = gameBoard.array[index].choice;
    }

    const consoleLogArray = () => {
        for (i = 0; i < gameBoard.array.length; i++) {
            console.log(gameBoard.array[i]);
        }
    }
    //returns for public access
    return {
        displayArray,
        consoleLogArray
    };
})(); // end of displayController

//module pattern for glame flow (Game)
const Game = (function () {
    let isPlayer_1_turn; //flag to track player turn
    let winner; //persistent variable to track winner
    let index; //track index of clicked div
    const cells = document.querySelectorAll(".cells"); //get the DOM link to all cells

    //players choose using this function
    const Player_Choose = (index, player) => {
        gameBoard.populateArray(index, player);
    }

    //main function that control the flow
    //isWon(), isTie()
    const isTie = () => {
        for (i = 0; i < gameBoard.array.length; i++) {
            if (gameBoard.array[i].choice == '') {
                return false;
            }
        }
        return true;
    }

    //isWon() - Winning condition checks for row, column and diagonal unless it falls in non-diagonal cells
    const isWon = (player) => {
        // if (index == 8) {
        //     return true;
        // }
        // return false;
        const diagonal_one = [0, 4, 8];
        const diagonal_two = [2, 4, 6];

        if (diagonal_one.includes(index) || diagonal_two.includes(index)) {
            if (checkDiagonal(player, diagonal_one, diagonal_two) || checkColumn(player) || checkRow(player)) {
                return true;
            }
            // checkRow();
            // checkColumn();

        }
        else {
            if (checkDiagonal(player, diagonal_one, diagonal_two) || checkRow(player) || checkColumn(player)) {
                return true;
            }
            // checkColumn();
            console.log("Not in diagonal");
        }
        return false;
    } // isWon()

    const checkRow = (player) => {
        let num_row = 3;
        let multipler = Math.floor(index / num_row);

        let row_cell1 = multipler * num_row;
        let row_cell2 = row_cell1 + 1;
        let row_cell3 = row_cell2 + 1;

        if (gameBoard.array[row_cell1].choice == player.returnChoice() && gameBoard.array[row_cell2].choice == player.returnChoice() && gameBoard.array[row_cell3].choice == player.returnChoice()) {
            return true;
        }
    }//checkRow

    const checkColumn = (player) => {
        let num_row = 3;

        let col_num1 = index % num_row;
        let col_num2 = col_num1 + 3;
        let col_num3 = col_num2 + 3;

        if (gameBoard.array[col_num1].choice == player.returnChoice() && gameBoard.array[col_num2].choice == player.returnChoice() && gameBoard.array[col_num3].choice == player.returnChoice()) {
            return true;
        }
    }//checkColumn

    const checkDiagonal = (player, array1, array2) => {
        if (array1.includes(index)) {
            if (gameBoard.array[0].choice == player.returnChoice() && gameBoard.array[4].choice == player.returnChoice() && gameBoard.array[8].choice == player.returnChoice()) {
                return true;
            }
        }
        else if (array2.includes(index)) {
            if (gameBoard.array[2].choice == player.returnChoice() && gameBoard.array[4].choice == player.returnChoice() && gameBoard.array[6].choice == player.returnChoice()) {
                return true;
            }
        }
    }//checkDiagonal

    //start function to initiate flag, winner and call flow
    //(MUST NOT ADD ANYTHING ELSE)
    const start = () => {
        isPlayer_1_turn = true;
        winner = '';

        //Select from the DOM by mouse cLick
        //whatever is clicked gets passed as an index to player_choose
        //This is a callback function
        function handleClick(e) {
            index = parseInt(e.target.id);
            if (winner == '') {

                //conditional to make sure the same div is not being modified more than once
                if (gameBoard.array[index].chosen == false) {
                    if (isPlayer_1_turn == true) {
                        Player_Choose(index, player1);

                        //display choice on div
                        displayController.displayArray(e, index);

                        if (isWon(player1)) {
                            winner = `Winner: ${player1.returnName()}`;

                            //end the game the moment player wins but needs to be put in timeout to show the last display
                            setTimeout(() => {
                                alert(`${winner}`);
                                endGame();
                            }, 0);
                        }
                    } // playerturn condition
                    else {
                        Player_Choose(index, player2);

                        //display choice on div
                        displayController.displayArray(e, index);

                        if (isWon(player2)) {
                            winner = `Winner: ${player2.returnName()}`;

                            //end the game the moment player wins
                            setTimeout(() => {
                                alert(`${winner}`);
                                endGame();
                            }, 0);
                        }
                    } // playerturn condition
                } //conditional to control div display
            }
            isPlayer_1_turn = !isPlayer_1_turn;
        }
        cells.forEach(cell => {
            cell.addEventListener('click', handleClick);
        })
        const endGame = () => {
            cells.forEach(cell => {
                cell.removeEventListener('click', handleClick);
            })
        }
    }//start



    //returns for public access
    return {
        start
    }
})();


//factory functions for the players
function players(name, choice) {
    const returnName = () => name;
    const returnChoice = () => choice;

    //returns player name and player choice for public access
    return {
        returnName,
        returnChoice
    }
}


const player1 = players('Ameer', 'X');
const player2 = players('Hamza', 'O');

Game.start();

