var id = 1
function inc() {
	return id++
}

function heuristic(start, end, h) {
	if (h == 1) {
		var tiles_out = 0
		for (var i = 0; i < start.length; i++) {
			if (start[i] != end[i] && start[i] !== '0') tiles_out++
		}
		return tiles_out
	} else if (h == 2) {
		var manhattan = 0
		for (var i = 0; i < start.length; i++) {
			if (start.substring(i, i + 1) !== '0')
			manhattan += Math.abs(i - end.indexOf(start.substring(i, i + 1)))
		}
		return manhattan
	}
}


function move(text, position, dir) {
	switch (dir) {
        case 'u':
			return text.substring(0, position - 3) + '0' + text.substring(position - 2, position) + text.substring(position - 3, position - 2) + text.substring(position + 1);
        case 'd':
			return text.substring(0, position) + text.substring(position + 3, position + 4) + text.substring(position + 1, position + 3) + '0' + text.substring(position + 4);
		case 'l':
			return text.substring(0, position - 1) + '0' + text.substring(position - 1, position) + text.substring(position + 1);
        case 'r':
			return text.substring(0, position) + text.substring(position + 1, position + 2) + '0' + text.substring(position + 2);
	}
	return text;
}

function succesors(n, e, h) {
	var suc = [];

	let text = n[0];
	let result = '';
	let blankSpace = text.indexOf('0');

	switch (blankSpace) {
		case 0:
			//moving down
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 1:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving down 
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 2:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving down
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 3:
			//moving down
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);

			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);

			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 4:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving down
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 5:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving right
			result = move(text, blankSpace, 'd')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 6:
			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);
			break;
		case 7:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving right
			result = move(text, blankSpace, 'r')
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
		case 8:
			//moving left
			result = move(text, blankSpace, 'l');
			suc.push([result, heuristic(result, e, h), inc()]);
			//moving up
			result = move(text, blankSpace, 'u')
			suc.push([result, heuristic(result, e, h), inc()]);

			break;
	}

	suc = suc.sort((a, b) => a[1] - b[1])
	return [suc[0], suc[1]]
}

function beam2(start, h) {
    final = '123456780'

	let stringDot = '{'

	let list = [[start, heuristic(start, final, h), inc()]];
	stringDot += list[0][2] + ' [label="' + list[0][0] + '"];'

    let nodeNumber = 0;
    let cycled = false;
	while (list.length > 0) {
		var current = list.shift();
		if (current[0] == final) {
			stringDot += '}'
			return stringDot
		}
		var temp = succesors(current, final, h);
		temp.forEach(val => stringDot += val[2] + ' [label="' + val[0] + '"];' + current[2] + '--' + val[2] + ' [label="' + val[1] + '"] ;')
		list = list.concat(temp);
		list = list.sort(function (a, b) { return a[1] - b[1] });
		nodeNumber++
		if (nodeNumber > 200) {
			cycled = true; 
            break;
		}
	}
    if(cycled){
        alert("The algorithm got into an infinite loop.");
    }
	stringDot += '}'
	return stringDot
}



function analyze(input, heuristic) {
    console.log(input)
    console.log(heuristic)
	return beam2(input, parseInt(heuristic))
}