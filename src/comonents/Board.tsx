import {useEffect, useState} from "react";

const boardInitialState: Array<Array<null| string>> = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];

const Board = () => {
    const [board, setBoard] = useState(boardInitialState);
    const [player, setPlayer] = useState('X');

    useEffect(() => {
        const winner = calculateWinner();

        // to let the user see the last move before the alert
        setTimeout(() => {
            if (winner) {
                alert(`Player ${winner} wins!`);
                setBoard(boardInitialState);
                return;
            }
            if (checkDraw()) {
                alert('Draw!');
                setBoard(boardInitialState);
            }
        }, 100);

    }, [board]);

    const calculateWinner = () => {
        return checkVertical() || checkHorizontal() || checkDiagonal();
    }

    const checkHorizontal = () => {
        let winner = null;
        board.forEach(row => {
            if (row[0] === row[1] && row[1] === row[2]) {
                if(row[0] !== null) winner = row[0];
            }
        });

        return winner;
    }

    const checkVertical = () => {
        let winner = null;
        board.forEach((_row, rowIndex) => {
            if (board[0][rowIndex] === board[1][rowIndex] && board[1][rowIndex] === board[2][rowIndex]) {
                if(board[0][rowIndex] !== null) winner = board[0][rowIndex];
            }
        });

        return winner;
    }

    const checkDiagonal = () => {
        let winner = null;
        if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
            winner = board[0][0];
        }else if(board[2][2] === board[1][1] && board[1][1] === board[0][0]){
            winner = board[2][2];
        }

        return winner;
    }

    const checkDraw = () => {
        return board.every(row => row.every(cell => cell !== null));
    }


    const handleClick = (row: number, cell: number) => {
        // if cell is not empty, return
        if (board[row][cell] !== null) {
            return;
        }

        const newBoard = board.map((rowArray, rowIndex) => {
            if (rowIndex !== row) {
                return rowArray;
            }

            return rowArray.map((cellValue, cellIndex) => {
                if (cellIndex !== cell) {
                    return cellValue;
                }

                return player;
            });
        });

        setPlayer(player === 'X' ? 'O' : 'X');
        setBoard(newBoard);
    }

    return (
        <div className="board">
            {board.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                        <div key={cellIndex} className="cell" onClick={() => handleClick(rowIndex, cellIndex)}>{cell}</div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Board;