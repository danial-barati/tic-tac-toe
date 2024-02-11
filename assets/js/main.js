let human = document.getElementById("human");
let cpu = document.getElementById("cpu");
let side = document.getElementsByClassName("side")[0];
let _div = document.querySelectorAll(".bord>div");
let _winner = document.getElementsByClassName("winner")[0];
let _choose = document.querySelector(".winner>h3");
let _xo = document.getElementById("x-o");

let counter = 0;
let winner = "";
let turn = "";
let tCpu = "";

document.getElementById("x").addEventListener("click", () => {
  turn = "x";
  tCpu = "o";
  _xo.style.height = "0";
});

document.getElementById("o").addEventListener("click", () => {
  turn = "o";
  tCpu = "x";
  _xo.style.height = "0";
});

function changeturn() {
  if (turn == "x") {
    turn = "o";
  } else {
    turn = "x";
  }
}
human.addEventListener("click", () => {
  side.style.height = "0px";
  _xo.style.height = "100%";
  _div.forEach((val) => {
    val.addEventListener("click", () => {
      if (val.getAttribute("data-status") == "off") {
        if (turn == "x") {
          val.innerHTML = turn;
          val.style.color = "gray";
          changeturn();
        } else {
          val.innerHTML = turn;
          changeturn();
        }
        counter++;
        val.setAttribute("data-status", "on");
      }
      checker();
    });
  });
});

cpu.addEventListener("click", () => {
  side.style.height = "0px";
  _xo.style.height = "100%";
  _div.forEach((item, i) => {
    item.addEventListener("click", () => {
      if (item.getAttribute("data-status") == "off") {
        item.innerHTML = turn;
        item.style.color = "gray";
        item.setAttribute("data-status", "on");
        counter++;
        changeturn();
        checker();
        if (winner == "" && counter < 9) {
          while (turn == tCpu) {
            let _rand = Math.floor(Math.random() * _div.length);
            console.log(_rand);
            if (_div[_rand].getAttribute("data-status") == "off") {
              _div[_rand].innerHTML = tCpu;
              _div[_rand].setAttribute("data-status", "on");
              counter++;
              changeturn();
              checker();
            }
          }
        }
      }
    });
  });
});

// start of checker***

const db = [];
function checker() {
  _div.forEach((value, i) => {
    db[i] = value.innerHTML;
  });

  switch (true) {
    case db[0] == db[1] && db[0] == db[2] && db[0] != "":
      winner = db[0];
      break;
    case db[3] == db[4] && db[3] == db[5] && db[3] != "":
      winner = db[3];
      break;
    case db[6] == db[7] && db[6] == db[8] && db[6] != "":
      winner = db[6];
      break;
    case db[0] == db[3] && db[0] == db[6] && db[3] != "":
      winner = db[3];
      break;
    case db[1] == db[4] && db[1] == db[7] && db[1] != "":
      winner = db[4];
      break;
    case db[2] == db[5] && db[2] == db[8] && db[8] != "":
      winner = db[5];
      break;
    case db[0] == db[4] && db[0] == db[8] && db[4] != "":
      winner = db[8];
      break;
    case db[2] == db[4] && db[2] == db[6] && db[6] != "":
      winner = db[6];
      break;
  }
  if (winner != "") {
    _winner.style.height = "100%";
    _choose.innerHTML = "winner is : " + winner;
  }

  if (counter == 9 && winner == "") {
    _winner.style.height = "100%";
    _choose.innerHTML = "equal";
  }
}

// replay

document.getElementById("replay").addEventListener("click", () => {
  location.reload();
});
