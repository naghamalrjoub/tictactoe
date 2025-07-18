const grid = document.getElementById("squares");
let CurrentPlayer = "X";
let win = 0, draw = 0, xScore = 0, oScore = 0;
let squares = Array.from(grid.children);
let Xscore = document.getElementById("Xscore");
let Oscore = document.getElementById("Oscore");


function RestartGame()
{
    for (let i = 0; i < 9; i++)
        squares[i].textContent = "";
    win = 0, draw = 0;
    CurrentPlayer = "X";
}

function RestartScore()
{
    xScore = 0, oScore = 0;
    Xscore.textContent = "0";
    Oscore.textContent = "0";
}

function switchPlayer(event)
{
    if (win || draw)
    {
        for (let i = 0; i < 9; i++)
        {
            squares[i].removeEventListener("click")
        }
        RestartGame();
    }
    squares = Array.from(grid.children);
    const square = event.target;
    const idx = squares.indexOf(square);
    console.log(idx);
    if (square.textContent === "")
    {
        square.textContent = CurrentPlayer;
        console.log(squares[idx].textContent);
        win = checkWin(idx);
        if (win) {
            setTimeout(() => {
                CurrentPlayer = CurrentPlayer == "X" ? "O" : "X";
                alert(CurrentPlayer + " has won!");
                if (CurrentPlayer === "X")
                {
                    xScore++;
                    Xscore.textContent = xScore.toString();
                }
                else
                {
                    oScore++;
                    Oscore.textContent = oScore.toString();
                }
            }, 0);
        }
        draw = checkDraw();
        if (draw && !win) {
            setTimeout(() => {
                alert("its a draw");
            }, 0);
        }
        else
            CurrentPlayer = CurrentPlayer == "X" ? "O" : "X";
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
