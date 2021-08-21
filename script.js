/****************************************************************
Описание
	Вам дается квадратная сетка с обычными `.` и заблокированными `X` ячейками. 
  Ваша игровая фигура может перемещаться по любой строке или столбцу или диагонали, пока не достигнет края сетки или заблокированной ячейки. 
  Учитывая сетку, начальную и конечную позиции, постройте кратчайший путь, чтобы добраться до конечной позиции.

Например
	Дана сетка:
  .X.
  .X.
  ...

  Система координаты для данной сетки:
  0.0 0.1 0.2
  1.0 1.1 1.2
  2.0 2.1 2.2

  Начальна позиция 2.1 (отсчет идет с верхнего левого края сетки 0.0)
  Конечная позиция 0.2

  Путь движения между начальной и конечной точкой: (2.1) -> (1.2) -> (0.2)
  Ответ: [{x:2, y:1}, {x:1, y:2}, {x:0, y:2}]

	Задача
  	Функция должена вывести массив объектов координат которые обеспечивают минимальное количество шагов
    для перехода от начальной позиции к конечной и порядок массива соответвует движения по координатам.
  	
****************************************************************/
function runner(gridList, startX, startY, endX, endY) {
    // TODO

    let start = `${startX}.${startY}`;
    let end = `${endX}.${endY}`;

    let coords = {};

    for (let x = 0; x < gridList.length; x++) {
        for (let y = 0; y < gridList[x].length; y++){
            if (gridList[x][y] === '.') {
                coords[`${x}.${y}`] = {'x': x, 'y': y};
            }
        }
    }

    if (!coords[start] || !coords[end]) {
        return false;
    }

    let keys = [];

    for (let key in coords) {
        keys.push(key);
    }

    let graph = {};

    for (let i = 0; i < keys.length; i++) {
        graph[keys[i]] = [];
        for (let j = 0; j < keys.length; j++) {
            let comparsionX = coords[keys[i]].x - coords[keys[j]].x <= 1 && coords[keys[i]].x - coords[keys[j]].x >= -1;
            let comparsionY = coords[keys[i]].y - coords[keys[j]].y <= 1 && coords[keys[i]].y - coords[keys[j]].y >= -1;
            if (comparsionX && comparsionY && keys[i] !== keys[j]) {
                graph[keys[i]].push(keys[j]);
            }
        }
    }

    let distances = {};

    distances[start] = 0;

    let queue = [];

    queue.push(start);

    let parents = {}; 

    while (queue.length > 0) {
        const current = queue.shift();

        for (let neighbors of graph[current]) {
            if (!distances[neighbors]) {
                if (distances[neighbors] === distances[start]) {
                    continue;
                }
                distances[neighbors] = distances[current] + 1;
                parents[neighbors] = current;
                queue.push(neighbors);
            }
        }
    }

    let path = [end];

    let parent = parents[end];

    while (parent) {
        path.push(parent);
        if (parent == start) break;
        parent = parents[parent];
    }
    for (let i = 0; i < path.length; i++) {
        let tmp = path.shift();
        path.push(`{x:${coords[tmp].x}, y: ${coords[tmp].y}}`);
    }
    path.reverse();
    return path;
}

const result = runner(
    [
        '.X.',
        '.X.',
        '...',
    ],
    1, 2,
    0, 0
);

resultCoords.textContent = result;
