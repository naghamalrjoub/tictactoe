const grid = document.getElementById("squares");
let win = 0, draw = 0, FirstScoreCounter = 0, SecondScoreCounter = 0;
const squares = new Map();
let FirstScore = document.getElementById("FirstPlayerScore");
let SecondScore = document.getElementById("SecondPlayerScore");
let nameFirst = document.getElementById("FirstPlayer"), nameSecond = document.getElementById("SecondPlayer");
let FirstNameForModal = document.getElementById("FirstPlayerForModal");
const NameModal = document.getElementById("NameInput");
const StartButton = document.getElementById("SubmitButton");
const XButton = document.getElementById("RoleX");
const OButton = document.getElementById("RoleO"); 
const RolesModal = document.getElementById("roles");

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
let role1 = "X", role2 = "O", name1 = "player1", name2 = "player2";

//at the beginning of the game, set each player's name and role;
RestartNames(); 

// whoever chooses X starts the game
let CurrentPlayer = (role1 === "X" ? new player(name1, role1) : new player(name2, role2));

function clear()
{
    for (let i = 0; i < 9; i++)
        squares.get(i).textContent = "";
    win = 0, draw = 0;
    (role1 === "X" ? CurrentPlayer.set(name1, role1) : CurrentPlayer.set(name2, role2));
}

function setPlayers() {
        player1.set(name1, role1);
        player2.set(name2, role2);
        (role1 === "X" ? CurrentPlayer.set(name1, role1) : CurrentPlayer.set(name2, role2));
}

// prompts for entering the player's names;
function RestartNames()
{
    NameModal.showModal();
    StartButton.onclick = () => {
        name1 = document.getElementById("Player1NameInput").value.trim(); //make sure input is valid (not whitespace/empty)
        name2 = document.getElementById("Player2NameInput").value.trim();

        if (!name1 || !name2)
            alert("Enter valid names (not empty)");

        else {    
            // nameFirst/nameSecond are the display names for each player
            nameFirst.textContent = name1;
            nameSecond.textContent = name2;
            FirstNameForModal.textContent = name1;
            NameModal.close();

            // since we only reset roles after we reset names, we'll call resetRoles here
            RestartRoles();
        }
    }
}

//prompts for entering player's roles;
function RestartRoles()
{
    RolesModal.showModal();    
    XButton.onclick = () => {
        role1 = "X", role2 = "O";
        setPlayers();
        RolesModal.close();
    }

    OButton.onclick = () => {
        role1 = "O", role2 = "X";
        setPlayers();
        RolesModal.close();   
    }
}


// a function to restart the game;
function RestartScore()
{
    FirstScoreCounter = 0, SecondScoreCounter = 0;
    FirstScore.textContent = "0";
    SecondScore.textContent = "0";

}

// a function to restart the board and the roles;
function RestartGame()
{
    clear();
    win = 0, draw = 0;
    RestartNames();
    RestartScore();    
}

function switchPlayer(event)
{
    const square = event.target;
    const idx = Number(square.dataset.index);
    console.log(idx);
    if (square.textContent === "")
    {
        square.textContent = CurrentPlayer.role;
        console.log(squares.get(idx).textContent);
        win = checkWin(idx), draw = checkDraw();
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
        
        else if (draw) {
            setTimeout(() => {
                alert("its a draw");
                clear();
            }, 0);
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
    let i = idx;
    if (idx >= 6) i = 6; 
    else if (idx >= 3) i = 3;
    else if (idx >= 0) i = 0;

    
    if (squares.get(i).textContent === squares.get(i + 1).textContent && squares.get(i).textContent === squares.get(i + 2).textContent)
        return 1;
    
    i = idx % 3;
    if (squares.get(i).textContent === squares.get(i + 3).textContent && squares.get(i).textContent === squares.get(i + 6).textContent)
        return 1;

    if (idx === 0 || idx === 4 || idx === 8)
        if (squares.get(0).textContent === squares.get(4).textContent && squares.get(4).textContent === squares.get(8).textContent)
            return 1;
    if (idx === 2 || idx === 4 || idx === 6)
        if (squares.get(2).textContent === squares.get(4).textContent && squares.get(4).textContent === squares.get(6).textContent)
            return 1;
}

function checkDraw()
{
    for (let i = 0; i < 9; i++)
    {
        if (squares.get(i).textContent == "")
            return 0;
    }
    return 1;
}


// initialize board
for (let i = 0; i < 9; i++)
{
    const square = document.createElement("div");
    square.classList.add("square");
    square.addEventListener("click", switchPlayer);
    grid.appendChild(square);
    square.dataset.index = i;
    squares.set(i, square);
}

