const grid = document.getElementById("squares");
let win = 0, draw = 0, FirstScoreCounter = 0, SecondScoreCounter = 0;
let squares = Array.from(grid.children);
let FirstScore = document.getElementById("FirstPlayerScore");
let SecondScore = document.getElementById("SecondPlayerScore");
let nameFirst = document.getElementById("FirstPlayer"), nameSecond = document.getElementById("SecondPlayer");

class player {
    constructor(name, role) {
        this.name = name, this.role = role;
    }
    set(name, role) 
    {
        this.name = name;
        this.role = role;
    }
    setName(name)
    {
        this.name = name;
    }
    score = 0;
}

let player1 = new player("player1", "X");
let player2 = new player("player2", "O");
let role1, role2, name1, name2;

function clear()
{
    for (let i = 0; i < 9; i++)
        squares[i].textContent = "";
    win = 0, draw = 0;
        (role1 === "X" ? CurrentPlayer.set(name1, role1) : CurrentPlayer.set(name2, role2));
}

//prompts for entering player's roles;
function RestartRoles()
{
    while(true) 
    {
        role1 = prompt("Enter first player's role:")
        if (role1.toLowerCase() == "x") 
        {
            role1 = "X", role2 = "O";
            break;
        }

        else if (role1.toLowerCase() == "o")
        {
            role2 = "X", role1 = "O";
            break;
        }

        else
        {
            alert("invalid choice, please enter either \"X\" or \"O\".")
        }
    }

}

// prompts for entering the player's names;
function RestartNames()
{
    name1 = prompt("Enter first player's name:");
    name2 = prompt("Enter second player's name:");

    // nameFirst/nameSecond are the display names for each player
    nameFirst.textContent = name1;
    nameSecond.textContent = name2;
}

//at the beginning of the game, set each player's name and role;
RestartNames(); 
RestartRoles();
player1.set(name1, role1);
player2.set(name2, role2);

// whoever chooses X starts the game
let CurrentPlayer = (role1 === "X" ? new player(name1, role1) : new player(name2, role2));

// a function to restart the board and the roles;
function RestartGame()
{
    for (let i = 0; i < 9; i++)
        squares[i].textContent = "";
    win = 0, draw = 0;
    RestartNames();
    RestartRoles();
    RestartScore();
    player1.set(name1, role1);
    player2.set(name2, role2);
    (role1 === "X" ? CurrentPlayer.set(name1, role1) : CurrentPlayer.set(name2, role2));
    
}

// a function to restart the game;
function RestartScore()
{
    FirstScoreCounter = 0, SecondScoreCounter = 0;
    FirstScore.textContent = "0";
    SecondScore.textContent = "0";

}

function switchPlayer(event)
{

    squares = Array.from(grid.children);
    const square = event.target;
    const idx = squares.indexOf(square);
    console.log(idx);
    if (square.textContent === "")
    {
        square.textContent = CurrentPlayer.role;
        console.log(squares[idx].textContent);
        win = checkWin(idx);
        if (win) {
            setTimeout(() => {

                alert(CurrentPlayer.name + " has won!");
                if (CurrentPlayer.role === player1.role)
                {
                    FirstScoreCounter++;
                    FirstScore.textContent = FirstScoreCounter.toString();
                }
                else
                {
                    SecondScoreCounter++;
                    SecondScore.textContent = SecondScoreCounter.toString();
                }

                clear();
            }, 0);
        }
        draw = checkDraw();
        if (draw && !win) {
            setTimeout(() => {
                alert("its a draw");
                clear();
            }, 0);
        }    
        if (win || draw)
        {
            // for (let i = 0; i < 9; i++)
            // {
            //     squares[i].removeEventListener("click")
            // }
            
        }
        else 
        {
            if (CurrentPlayer.role === player1.role)
                CurrentPlayer.set(player2.name, player2.role);

            else
                CurrentPlayer.set(player1.name, player1.role);
        }
                
    } 
    
}

function checkWin(idx)
{
    squares = Array.from(grid.children);
    let i = idx;
    if (idx >= 6) i = 6; 
    else if (idx >= 3) i = 3;
    else if (idx >= 0) i = 0;

    
    if (squares[i].textContent === squares[i + 1].textContent && squares[i].textContent === squares[i + 2].textContent)
        return 1;
    
    i = idx % 3;
    if (squares[i].textContent === squares[i + 3].textContent && squares[i].textContent === squares[i + 6].textContent)
        return 1;

    if (idx === 0 || idx === 4 || idx === 8)
        if (squares[0].textContent === squares[4].textContent && squares[4].textContent === squares[8].textContent)
            return 1;
    if (idx === 2 || idx === 4 || idx === 6)
        if (squares[2].textContent === squares[4].textContent && squares[4].textContent === squares[6].textContent)
            return 1;
}

function checkDraw()
{
    squares = Array.from(grid.children);
    for (let i = 0; i < 9; i++)
    {
        if (squares[i].textContent == "")
            return 0;
    }
    return 1;
}

for (let i = 0; i < 9; i++)
{
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", switchPlayer);
    grid.appendChild(square);
}
