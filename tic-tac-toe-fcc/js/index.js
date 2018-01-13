var huPlayer; var aiPlayer; var origBoard; var round = 0;
function reset() {
  
  for (var x=0;x<9;x++) {
    document.getElementById(x).innerHTML = '';
  }
  origBoard = [0,1,2,3,4,5,6,7,8];
  round = 0;
  $('#TTT').hide('slow');
  $('#q').show('slow');
}
function boardSpots() {
  return origBoard.filter(c => c !== 'X' && c !== 'O');
}
function win(board, player) {
  var winArr = [[0,3,6],[0,4,8],[0,1,2],[1,4,7],[2,5,8],[2,4,6],[3,4,5],[6,7,8]];
  for (var i in winArr) {
	  if (board[winArr[i][0]] === player && board[winArr[i][1]] === player && board[winArr[i][2]] === player) {
		  return true;
	   } 
   }
  return false;
}
function minimax(newboard, player) {
  let availableMoves = boardSpots(newboard);
  if(win(newboard, huPlayer)) {
    return {score: -10};
  } else if(win(newboard, aiPlayer)) {
    return {score: 10};
  } else if (availableMoves.length === 0) {
    return {score: 0};
  }
  
  var moves = [];
  for (var i = 0; i < availableMoves.length; i++) {
    var move = {};
    move.index = newboard[availableMoves[i]];
    newboard[availableMoves[i]] = player;

    if (player == aiPlayer) {
      var m = minimax(newboard, huPlayer);
      move.score = m.score;
    } else {
      var m = minimax(newboard, aiPlayer);
      move.score = m.score;
    }
    newboard[availableMoves[i]] = move.index;
    moves.push(move);
  }

  var bestMove;
  if (player === aiPlayer) {
    var bestScore = -10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  } else {
    var bestScore = 10000;
    for (var i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score;
        bestMove = i;
      }
    }
  }
  return moves[bestMove];
}
function start(aiPlay, huPlay) {
  origBoard = Array.from(Array(9).keys());
  aiPlayer = aiPlay; huPlayer = huPlay;
}
function bestSpot() {
  var bestChoice = minimax(origBoard, aiPlayer);
  return bestChoice.index;
}
function aiTurn() {
  var spot = bestSpot();
  var $ai = document.getElementById(spot);
   if ($ai.innerHTML === '') {
      if (origBoard[spot] !== huPlayer && origBoard[spot] !== aiPlayer) {
          $ai.innerHTML = aiPlayer;
          origBoard[spot] = aiPlayer;
          round++;
       }
   }
  if (win(origBoard, huPlayer)) { 
    alert("You Win!") 
    reset();
  } else if (win(origBoard, aiPlayer)) {
    alert("You lose!");
    reset();
  } else if (round > 8) {
    alert("Tie!");
    reset();
  }
}
function huTurn(element) {
  var $hu = document.getElementById(element.id);
  if ($hu.innerHTML === '') {
    if (origBoard[element.id] !== 'X' && origBoard[element.id] !== 'O') {
      $hu.innerHTML = huPlayer;
      origBoard[element.id] = huPlayer;
      round++;
    }
  }
  if (win(origBoard, huPlayer)) { 
    alert("You Win!") 
    reset();
  } else if (win(origBoard, aiPlayer)) {
    alert("You lose!");
    reset();
  } else if (round > 8) {
    alert("Tie!");
    reset();
  }
}


$(document).ready(function() {
 $('#TTT').hide();
 $('#x').click(function() {
    $('#TTT').show('slow');
    $('#q').hide();
    start('O','X');
  });
 $('#o').click(function() {
    $('#TTT').show('slow');
    $('#q').hide();
    start('X','O');
  });
 $('.box').click(function() {
    huTurn(this);
    aiTurn();
  });
});