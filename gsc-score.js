var yellow = [[false, false, false, true],[false,false,true,false],[false,true,false,false], [true,false,false,false]];
var blue=[[false, false, false,false], [false, false, false,false], [false, false, false,false], [false, false, false,false]];
var green = [false,false,false,false,false,false,false,false,false,false,false];
var orange = [0,0,0,0,0,0,0,0,0,0,0];
var purple = [0,0,0,0,0,0,0,0,0,0,0];

function selectYellow(x,y, tx, ty, bx, by) {
    if (!yellow[x][y]) {
        yellow[x][y] = true;
        yellowScore = scoreYellow(yellow);
        addX(tx,ty);
        console.log('Yellow Score: ', yellowScore);
    }
}


function scoreYellow(selections) {
    function columnFull(i) {
        return selections.map(a => a[i]).filter(v => v).length === 4 ? 1 : 0;
    }
    return columnFull(0) * 10 +
           columnFull(1) * 14 +
           columnFull(2) * 16 +
           columnFull(3) * 20;
}

function scoreBlue(selections) {
    var scores = [0,1,2,4,7,11,16,22,29,37,46,56];
    return scores[selections.reduce((a,v) => a.concat(v),[]).filter(v => v).length];
}

function selectBlue(x, y, tx, ty) {
    if (!blue[x][y]) {
        blue[x][y] = true;
        addX(tx,ty);
        console.log('Blue Score', scoreBlue(blue));
    }
}

function selectGreen(i, tx, ty) {
    // TODO: maybe enforce left to right
    if (!green[i]) {
        green[i] = true;
        addX(tx,ty);
        console.log('Green Score: ', scoreGreen(green));
    }

}

function scoreGreen(selections) {
    var scores = [0,1,3,6,10,5,21,8,36,45,55,66];
    return scores[selections.reduce((a,v) => a.concat(v),[]).filter(v => v).length];
}

function selectOrange(i, tx, ty) {
    if (orange[i] === 0) {
        n = window.prompt('Value?');
        orange[i] = new Number(n);
        addNumber(n, tx,ty);
        console.log('Orange Score: ', scoreOrange(orange));
    }
}

function scoreOrange(values) {
    return values.reduce((a,v) => a+v, 0);
}

function selectPurple(i, tx, ty) {
    if (purple[i] === 0) {
        n = window.prompt('Value?');
        purple[i] = new Number(n);
        addNumber(n, tx,ty);
        console.log('Purple Score: ', scorePurple(purple));
    }

}

function scorePurple(values) {
    return values.reduce((a,v) => a+v, 0);
}

function displayCurrentScore() {
    alert("Total: " + currentScore());
}

function currentScore() {
    var y = scoreYellow(yellow),
        b = scoreBlue(blue),
        o = scoreOrange(orange),
        p = scorePurple(purple),
        g = scoreGreen(green),
        min = Math.min(y,b,o,p,g),
        foxes = hasYelloFox(yellow) + hasBlueFox(blue) + hasGreenFox(green) + hasOrangeFox(orange) + hasPurpleFox(purple);

        return y + b + o + p + g + (min*foxes);    
}

function hasYelloFox(selections) {
    return selections[3].filter(v => v).length === 4 ? 1 : 0;
}

function hasBlueFox(selections) {
    return selections[2].filter(v => v).length === 4 ? 1 : 0;
}

function hasGreenFox(selections) {
    return selections[6] ? 1 : 0;
}

function hasOrangeFox(selections) {
    return selections[7] > 0 ? 1 : 0;
}

function hasPurpleFox(selections) {
    return selections[6] > 0 ? 1 : 0;
}


function addNumber(n, tx, ty) {
    var img = document.createElement('h1');
    img.innerText = n;
    img.src = 'X.png';
    img.style = 'position:absolute; top: ' + (ty-15) + '; left: ' + (tx+15) + ';';
    document.querySelector('body').appendChild(img);

}

function addX(tx, ty) {
    var img = document.createElement('img');
    img.src = 'X.png';
    img.style = 'position:absolute; top: ' + (ty+10) + '; left: ' + (tx+8) + ';';
    document.querySelector('body').appendChild(img);
}
