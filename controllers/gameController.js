const rollDice = (req, res) => {
    let angleArray = [
        [0, 0, 0],
        [-310, -362, -38],
        [-400, -320, -2],
        [135, -217, -88],
        [-224, -317, 5],
        [-47, -219, -81],
        [-133, -360, -53]
    ];

    const randomAngle = Math.floor(Math.random() * 6) + 1;
    let number = '';

    if (randomAngle === 1) {
        number = "\u2680";
    }

    if (randomAngle === 2) {
        number = "\u2681";
    }

    if (randomAngle === 3) {
        number = "\u2682";
    }

    if (randomAngle === 4) {
        number = "\u2683";
    }

    if (randomAngle === 5) {
        number = "\u2684";
    }

    if (randomAngle === 6) {
        number = "\u2685";
    }

    let x = angleArray[randomAngle][0];
    let y = angleArray[randomAngle][1];
    let z = angleArray[randomAngle][2];

    return { x, y, z, number };
};

const initGame = (num) => {
    let cards = {
        drugs: 19,
        alcohol: 19,
        prostitute: 19,
        weapon: 19,
        slaves: 19,
        police: 14,
        roadBuilding: 2,
        monopoly: 2,
        resources: 2,
        victory: 5
    };

    // let settlments = [
    //     [
    //         //0
    //         {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "0": [0, 5],
    //             "3": [1]
    //         }, distance: {
    //             "0": [2, 4],
    //             "3": [0]
    //         }, res: [0, 3]},
    //         {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
    //             "0": [0, 1]
    //         }, distance: {
    //             "0": [3, 5]
    //         }, res: [0]},
    //         {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
    //             "0": [1, 2]
    //         }, distance: {
    //             "0": [0, 4]
    //         }, res: [0]},
    //         {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
    //             "0": [2, 3],
    //             "1": [0]
    //         }, distance: {
    //             "0": [2],
    //             "1": [0]
    //         }, res: [0, 1]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "0": [3, 4],
    //             "1": [4]
    //         }, distance: {
    //             "0": [3],
    //             "1": [3],
    //         }, res: [0, 1, 4]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "0": [4, 5],
    //             "3": [2]
    //         }, distance: {
    //             "0": [0, 4],
    //             "3": [2]
    //         }, res: [0, 3, 4]}
    //     ],
    //     [
    //         //1
    //         {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
    //             "1": [0, 1]
    //         }, distance: {
    //             "0": [3],
    //             "1": [1]
    //         }, res: [1]},
    //         {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
    //             "1": [1, 2],
    //             "2": [0]
    //         }, distance: {
    //             "1": [0, 2],
    //             "2": [0]
    //         }, res: [1, 2]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "1": [2, 3],
    //             "2": [4]
    //         }, distance: {
    //             "1": [1, 3],
    //             "2": [3]
    //         }, res: [1, 2, 5]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "1": [3, 4],
    //             "4": [0]
    //         }, distance: {
    //             "0": [4],
    //             "1": [2]
    //         }, res: [1, 4, 5]}
    //     ],
    //     [
    //         //2
    //         {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
    //             "2": [0, 1]
    //         }, distance: {
    //             "1": [1],
    //             "2": [1]
    //         }, res: [2]},
    //         {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
    //             "2": [1, 2]
    //         }, distance: {
    //             "1": [0, 2]
    //         }, res: [2]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "2": [2, 3],
    //             "6": [0]
    //         }, distance: {
    //             "2": [1, 3],
    //             "6": [0]
    //         }, res: [2, 6]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "2": [3, 4],
    //             "5": [0]
    //         }, distance: {
    //             "1": [2],
    //             "2": [2],
    //             "5": [0]
    //         }, res: [2, 5, 6]}
    //     ],
    //     [
    //         //3
    //         {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "3": [0, 4],
    //             "7": [1]
    //         }, distance: {
    //             "3": [1, 3],
    //             "7": [1]
    //         }, res: [3, 7]},
    //         {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
    //             "3": [0, 1]
    //         }, distance: {
    //             "0": [0],
    //             "3": [0]
    //         }, res: [3]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "3": [2, 3],
    //             "4": [2]
    //         }, distance: {
    //             "0": [5],
    //             "3": [3],
    //             "4": [1]
    //         }, res: [3, 4, 8]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "3": [3, 4],
    //             "7": [2]
    //         }, distance: {
    //             "3": [0, 2]
    //         }, res: [3, 7, 8]}
    //     ],
    //     [
    //         //4
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "4": [0, 1],
    //             "5": [2]
    //         }, distance: {
    //             "1": [3],
    //             "4": [1],
    //             "5": [1]
    //         }, res: [4, 5, 9]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "4": [1, 2],
    //             "8": [0]
    //         }, distance: {
    //             "3": [2],
    //             "4": [0],
    //             "8": [0]
    //         }, res: [4, 8, 9]}
    //     ],
    //     [
    //         //5
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "5": [0, 1],
    //             "6": [3]
    //         }, distance: {
    //             "2": [3],
    //             "5": [1],
    //             "6": [2]
    //         }, res: [5, 6, 10]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "5": [1, 2],
    //             "9": [0]
    //         }, distance: {
    //             "4": [0],
    //             "5": [0],
    //             "9": [0]
    //         }, res: [5, 9, 10]}
    //     ],
    //     [
    //         //6
    //         {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
    //             "6": [0, 1]
    //         }, distance: {
    //             "2": [2],
    //             "6": [1]
    //         }, res: [6]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "6": [1, 2],
    //             "11": [0]
    //         }, distance: {
    //             "6": [0, 3]
    //         }, res: [6, 11]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "6": [2, 3],
    //             "10": [0]
    //         }, distance: {
    //             "5": [0],
    //             "6": [1],
    //             "10": [0]
    //         }, res: [6, 10, 11]}
    //     ],
    //     [
    //         //7
    //         {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "7": [0, 5]
    //         }, distance: {
    //             "7": [1, 3]
    //         }, res: [7]},
    //         {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
    //             "7": [0, 1]
    //         }, distance: {
    //             "3": [0],
    //             "7": [0]
    //         }, res: [7]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "7": [2, 3],
    //             "8": [2]
    //         }, distance: {
    //             "3": [3],
    //             "7": [3],
    //             "8": [1]
    //         }, res: [7, 8, 12]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "7": [3, 4],
    //             "12": [0]
    //         }, distance: {
    //             "7": [0, 2],
    //             "12": [0]
    //         }, res: [7, 12]}
    //     ],
    //     [
    //         //8
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "8": [0, 1],
    //             "9": [2]
    //         }, distance: {
    //             "4": [1],
    //             "8": [1],
    //             "9": [1]
    //         }, res: [8, 9, 13]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "8": [1, 2],
    //             "12": [0]
    //         }, distance: {
    //             "7": [2],
    //             "8": [0],
    //             "12": [1]
    //         }, res: [8, 12, 13]}
    //     ],
    //     [
    //         //9
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "9": [0, 1],
    //             "10": [2]
    //         }, distance: {
    //             "5": [1],
    //             "9": [1],
    //             "10": [1]
    //         }, res: [9, 10, 14]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "9": [1, 2],
    //             "13": [0]
    //         }, distance: {
    //             "8": [0],
    //             "9": [0],
    //             "13": [0]
    //         }, res: [9, 13, 14]}
    //     ],
    //     [
    //         //10
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "10": [0, 1],
    //             "11": [2]
    //         }, distance: {
    //             "6": [2],
    //             "10": [1],
    //             "11": [2]
    //         }, res: [10, 11, 15]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "10": [1, 2],
    //             "14": [0]
    //         }, distance: {
    //             "9": [0],
    //             "10": [0],
    //             "14": [0]
    //         }, res: [10, 14, 15]}
    //     ],
    //     [
    //         //11
    //         {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
    //             "11": [0, 1]
    //         }, distance: {
    //             "6": [1],
    //             "11": [1]
    //         }, res: [11]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "11": [1, 2]
    //         }, distance: {
    //             "11": [0, 2]
    //         }, res: [11]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "11": [2, 3],
    //             "15": [0]
    //         }, distance: {
    //             "10": [0],
    //             "11": [1],
    //             "15": [0]
    //         }, res: [11, 15]}
    //     ],
    //     [
    //         //12
    //         {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "12": [0, 3]
    //         }, distance: {
    //             "7": [3],
    //             "12": [2]
    //         }, res: [12]},
    //         {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "12": [1, 2],
    //             "13": [2]
    //         }, distance: {
    //             "8": [1],
    //             "12": [2],
    //             "13": [1]
    //         }, res: [12, 13, 16]},
    //         {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "12": [2, 3],
    //             "16": [0]
    //         }, distance: {
    //             "12": [0, 1],
    //             "16": [0]
    //         }, res: [12, 16]}
    //     ],
    //     [
    //         //13
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "13": [0, 1],
    //             "14": [2]
    //         }, distance: {
    //             "9": [1],
    //             "13": [1],
    //             "14": [1]
    //         }, res: [13, 14, 17]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "13": [1, 2],
    //             "16": [1]
    //         }, distance: {
    //             "12": [1],
    //             "13": [0],
    //             "16": [1]
    //         }, res: [13, 16, 17]}
    //     ],
    //     [
    //         //14
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "14": [0, 1],
    //             "15": [2]
    //         }, distance: {
    //             "10": [1],
    //             "14": [1],
    //             "15": [1]
    //         }, res: [14, 15, 18]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "14": [1, 2],
    //             "17": [0]
    //         }, distance: {
    //             "13": [0],
    //             "14": [0],
    //             "17": [0]
    //         }, res: [14, 17, 18]}
    //     ],
    //     [
    //         //15
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "15": [0, 1]
    //         }, distance: {
    //             "11": [2],
    //             "15": [1]
    //         }, res: [15]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "15": [1, 2],
    //             "18": [0]
    //         }, distance: {
    //             "14": [0],
    //             "15": [0],
    //             "18": [0]
    //         }, res: [15, 18]}
    //     ],
    //     [
    //         //16
    //         { x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "16": [0, 3]
    //         }, distance: {
    //             "12": [2],
    //             "16": [2]
    //         }, res: [16]},
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "16": [1, 2],
    //             "17": [2]
    //         }, distance: {
    //             "13": [1],
    //             "16": [2],
    //             "17": [1]
    //         }, res: [16, 17]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "16": [2, 3]
    //         }, distance: {
    //             "16": [0, 1]
    //         }, res: [16]}
    //     ],
    //     [
    //         //17
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "17": [0, 1],
    //             "18": [2]
    //         }, distance: {
    //             "14": [1],
    //             "17": [1],
    //             "18": [1]
    //         }, res: [17, 18]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "17": [1, 2]
    //         }, distance: {
    //             "16": [1],
    //             "17": [0]
    //         }, res: [17]}
    //     ],
    //     [
    //         //18
    //         { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
    //             "18": [0, 1]
    //         }, distance: {
    //             "15": [1],
    //             "18": [1]
    //         }, res: [18]},
    //         { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
    //             "18": [1, 2]
    //         }, distance: {
    //             "17": [0],
    //             "18": [0]
    //         }, res: [18]}
    //     ]
    // ];

    let settlments = [
        [
            //0
            {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
                "0": [0, 5],
                "3": [1]
            }, distance: {
                "0": [1, 5],
                "3": [1]
            }, res: [0, 3]},
            {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
                "0": [0, 1]
            }, distance: {
                "0": [0, 2]
            }, res: [0]},
            {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
                "0": [1, 2]
            }, distance: {
                "0": [1, 3]
            }, res: [0]},
            {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
                "0": [2, 3],
                "1": [0]
            }, distance: {
                "0": [2, 4],
                "1": [0]
            }, res: [0, 1]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "0": [3, 4],
                "1": [4]
            }, distance: {
                "0": [3, 5],
                "1": [3],
            }, res: [0, 1, 4]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "0": [4, 5],
                "3": [2]
            }, distance: {
                "0": [0, 4],
                "3": [2]
            }, res: [0, 3, 4]}
        ],
        [
            //1
            {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
                "1": [0, 1]
            }, distance: {
                "0": [3],
                "1": [1]
            }, res: [1]},
            {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
                "1": [1, 2],
                "2": [0]
            }, distance: {
                "1": [0, 2],
                "2": [0]
            }, res: [1, 2]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "1": [2, 3],
                "2": [4]
            }, distance: {
                "1": [1, 3],
                "2": [3]
            }, res: [1, 2, 5]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "1": [3, 4],
                "4": [0]
            }, distance: {
                "0": [4],
                "1": [2],
                "4": [0]
            }, res: [1, 4, 5]}
        ],
        [
            //2
            {x: 45, y: -20, active: false, upgrade: false, color: null, collisions: {
                "2": [0, 1]
            }, distance: {
                "1": [1],
                "2": [1]
            }, res: [2]},
            {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
                "2": [1, 2]
            }, distance: {
                "1": [0, 2]
            }, res: [2]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "2": [2, 3],
                "6": [0]
            }, distance: {
                "2": [1, 3],
                "6": [0]
            }, res: [2, 6]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "2": [3, 4],
                "5": [0]
            }, distance: {
                "1": [2],
                "2": [2],
                "5": [0]
            }, res: [2, 5, 6]}
        ],
        [
            //3
            {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
                "3": [0, 4],
                "7": [1]
            }, distance: {
                "3": [1, 3],
                "7": [1]
            }, res: [3, 7]},
            {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
                "3": [0, 1]
            }, distance: {
                "0": [0],
                "3": [0]
            }, res: [3]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "3": [2, 3],
                "4": [2]
            }, distance: {
                "0": [5],
                "3": [3],
                "4": [1]
            }, res: [3, 4, 8]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "3": [3, 4],
                "7": [2]
            }, distance: {
                "3": [0, 2],
                "7": [2]
            }, res: [3, 7, 8]}
        ],
        [
            //4
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "4": [0, 1],
                "5": [2]
            }, distance: {
                "1": [3],
                "4": [1],
                "5": [1]
            }, res: [4, 5, 9]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "4": [1, 2],
                "8": [0]
            }, distance: {
                "3": [2],
                "4": [0],
                "8": [0]
            }, res: [4, 8, 9]}
        ],
        [
            //5
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "5": [0, 1],
                "6": [3]
            }, distance: {
                "2": [3],
                "5": [1],
                "6": [2]
            }, res: [5, 6, 10]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "5": [1, 2],
                "9": [0]
            }, distance: {
                "4": [0],
                "5": [0],
                "9": [0]
            }, res: [5, 9, 10]}
        ],
        [
            //6
            {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
                "6": [0, 1]
            }, distance: {
                "2": [2],
                "6": [1]
            }, res: [6]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "6": [1, 2],
                "11": [0]
            }, distance: {
                "6": [0, 2],
                "11": [0]
            }, res: [6, 11]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "6": [2, 3],
                "10": [0]
            }, distance: {
                "5": [0],
                "6": [1],
                "10": [0]
            }, res: [6, 10, 11]}
        ],
        [
            //7
            {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
                "7": [0, 5]
            }, distance: {
                "7": [1, 3]
            }, res: [7]},
            {x: -15, y: 15, active: false, upgrade: false, color: null, collisions: {
                "7": [0, 1]
            }, distance: {
                "3": [0],
                "7": [0]
            }, res: [7]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "7": [2, 3],
                "8": [2]
            }, distance: {
                "3": [3],
                "7": [3],
                "8": [1]
            }, res: [7, 8, 12]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "7": [3, 4],
                "12": [0]
            }, distance: {
                "7": [0, 2],
                "12": [0]
            }, res: [7, 12]}
        ],
        [
            //8
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "8": [0, 1],
                "9": [2]
            }, distance: {
                "4": [1],
                "8": [1],
                "9": [1]
            }, res: [8, 9, 13]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "8": [1, 2],
                "12": [0]
            }, distance: {
                "7": [2],
                "8": [0],
                "12": [1]
            }, res: [8, 12, 13]}
        ],
        [
            //9
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "9": [0, 1],
                "10": [2]
            }, distance: {
                "5": [1],
                "9": [1],
                "10": [1]
            }, res: [9, 10, 14]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "9": [1, 2],
                "13": [0]
            }, distance: {
                "8": [0],
                "9": [0],
                "13": [0]
            }, res: [9, 13, 14]}
        ],
        [
            //10
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "10": [0, 1],
                "11": [2]
            }, distance: {
                "6": [2],
                "10": [1],
                "11": [2]
            }, res: [10, 11, 15]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "10": [1, 2],
                "14": [0]
            }, distance: {
                "9": [0],
                "10": [0],
                "14": [0]
            }, res: [10, 14, 15]}
        ],
        [
            //11
            {x: 105, y: 12, active: false, upgrade: false, color: null, collisions: {
                "11": [0, 1]
            }, distance: {
                "6": [1],
                "11": [1]
            }, res: [11]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "11": [1, 2]
            }, distance: {
                "11": [0, 2]
            }, res: [11]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "11": [2, 3],
                "15": [0]
            }, distance: {
                "10": [0],
                "11": [1],
                "15": [0]
            }, res: [11, 15]}
        ],
        [
            //12
            {x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
                "12": [0, 3]
            }, distance: {
                "7": [3],
                "12": [2]
            }, res: [12]},
            {x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "12": [1, 2],
                "13": [2]
            }, distance: {
                "8": [1],
                "12": [2],
                "13": [1]
            }, res: [12, 13, 16]},
            {x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "12": [2, 3],
                "16": [0]
            }, distance: {
                "12": [0, 1],
                "16": [0]
            }, res: [12, 16]}
        ],
        [
            //13
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "13": [0, 1],
                "14": [2]
            }, distance: {
                "9": [1],
                "13": [1],
                "14": [1]
            }, res: [13, 14, 17]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "13": [1, 2],
                "16": [1]
            }, distance: {
                "12": [1],
                "13": [0],
                "16": [1]
            }, res: [13, 16, 17]}
        ],
        [
            //14
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "14": [0, 1],
                "15": [2]
            }, distance: {
                "10": [1],
                "14": [1],
                "15": [1]
            }, res: [14, 15, 18]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "14": [1, 2],
                "17": [0]
            }, distance: {
                "13": [0],
                "14": [0],
                "17": [0]
            }, res: [14, 17, 18]}
        ],
        [
            //15
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "15": [0, 1]
            }, distance: {
                "11": [2],
                "15": [1]
            }, res: [15]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "15": [1, 2],
                "18": [0]
            }, distance: {
                "14": [0],
                "15": [0],
                "18": [0]
            }, res: [15, 18]}
        ],
        [
            //16
            { x: -15, y: 80, active: false, upgrade: false, color: null, collisions: {
                "16": [0, 3]
            }, distance: {
                "12": [2],
                "16": [2]
            }, res: [16]},
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "16": [1, 2],
                "17": [2]
            }, distance: {
                "13": [1],
                "16": [2],
                "17": [1]
            }, res: [16, 17]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "16": [2, 3]
            }, distance: {
                "16": [0, 1]
            }, res: [16]}
        ],
        [
            //17
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "17": [0, 1],
                "18": [2]
            }, distance: {
                "14": [1],
                "17": [1],
                "18": [1]
            }, res: [17, 18]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "17": [1, 2]
            }, distance: {
                "16": [1],
                "17": [0]
            }, res: [17]}
        ],
        [
            //18
            { x: 105, y: 80, active: false, upgrade: false, color: null, collisions: {
                "18": [0, 1]
            }, distance: {
                "15": [1],
                "18": [1]
            }, res: [18]},
            { x: 45, y: 110, active: false, upgrade: false, color: null, collisions: {
                "18": [1, 2]
            }, distance: {
                "17": [0],
                "18": [0]
            }, res: [18]}
        ]
    ];

    let roads = [
        [
          //0
          {x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
            "0": [1, 5],
            "3": [1]
          }},
          {x: 0, y: 9, deg: -27.5, active: false, color: null, collisions: {
            "0": [0, 2]
          }},
          {x: 59, y: 9, deg: 27.5, active: false, color: null, collisions: {
            "0": [1, 3],
            "1": [0]
          }},
          {x: 89, y: 58, deg: 90, active: false, color: null, collisions: {
            "0": [2, 4],
            "1": [0, 4]
          }},
          {x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
            "0": [3, 5],
            "1": [4],
            "3": [2]
          }},
          {x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
            "0": [0, 4],
            "3": [1, 2]
          }}
        ],
        [
          //1
          {x: 0, y: 9, deg: -27.5, active: false, color: null, collisions: {
            "0": [2, 3],
            "1": [1]
          }},
          {x: 59, y: 9, deg: 27.5, active: false, color: null, collisions: {
            "1": [0, 2],
            "2": [0]
          }},
          {x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
            "1": [1, 3],
            "2": [0, 4]
          }},
          {x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
            "1": [2, 4],
            "2": [4],
            "4": [0]
          }},
          {x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
            "0": [3, 4],
            "1": [3],
            "4": [0]
          }}
        ],
        [
          //2
          {x: 0, y: 9, deg: -27.5, active: false, color: null, collisions: {
            "1": [1, 2],
            "2": [1]
          }},
          {x: 59, y: 9, deg: 27.5, active: false, color: null, collisions: {
            "2": [0, 2]
          }},
          {x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
            "2": [1, 3],
            "6": [0]
          }},
          {x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
            "2": [2, 4],
            "5": [0],
            "6": [0]
          }},
          {x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
            "1": [2, 3],
            "2": [3],
            "5": [0]
          }}
        ],
        [
          //3
          {x: -31, y: 58, deg: 90, active: false, color: null, collisions: {
            "3": [1],
            "7": [1]
          }},
          {x: 0, y: 9, deg: -27.5, active: false, color: null, collisions: {
            "0": [0, 5],
            "3": [0]
          }},
          {x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
            "0": [4, 5],
            "3": [3],
            "4": [2]
          }},
          {x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
            "3": [2, 4],
            "4": [2],
            "7": [2]
          }},
          {x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
            "3": [0, 3],
            "7": [1]
          }}
        ],
        [
          //4
          {x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
            "1": [3, 4],
            "4": [1],
            "5": [2]
          }},
          {x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
            "4": [0, 2],
            "5": [2],
            "8": [0]
          }},
          {x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
            "3": [2, 3],
            "4": [1],
            "8": [0]
          }}
        ],
        [
            //5
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "2": [3, 4],
                "5": [1],
                "6": [3]
            } },
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "5": [0, 2],
                "6": [3],
                "9": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "4": [0, 1],
                "5": [1],
                "9": [0]
            }}
        ],
        [
            //6
            { x: 59, y: 9, deg: 27.5, active: false, color: null, collisions: {
                "2": [2, 3],
                "6": [1]
            }},
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "6": [0, 2],
                "11": [0]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "6": [1, 3],
                "10": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "5": [0, 1],
                "6": [2],
                "10": [0]
            }}
        ],
        [
            //7
            { x: -31, y: 58, deg: 90, active: false, color: null, collisions: {
                "7": [1, 4]
            }},
            { x: 0, y: 9, deg: -27.5, active: false, color: null, collisions: {
                "3": [0, 4],
                "7": [0]
            }},
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "3": [3, 4],
                "7": [3],
                "8": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "7": [2, 4],
                "8": [2],
                "12": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "7": [0, 3],
                "12": [0]
            }}
        ],
        [
            //8
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "4": [1, 2],
                "8": [1],
                "9": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "8": [0, 2],
                "9": [2],
                "12": [1]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "7": [2, 3],
                "8": [1],
                "12": [1]
            }}
        ],
        [
            //9
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "5": [1, 2],
                "9": [1],
                "10": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "9": [0, 2],
                "10": [2],
                "13": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "8": [0, 1],
                "9": [1],
                "13": [0]
            }}
        ],
        [
            //10
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "6": [2, 3],
                "10": [1],
                "11": [3]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "10": [0, 2],
                "11": [3],
                "14": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "9": [0, 1],
                "10": [1],
                "14": [0]
            }}
        ],
        [
            //11
            { x: 59, y: 9, deg: 27.5, active: false, color: null, collisions: {
                "6": [1, 2],
                "11": [1]
            }},
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "11": [0, 2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "11": [1, 3],
                "15": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "10": [0, 1],
                "11": [2],
                "15": [0]
            }}
        ],
        [
            //12
            { x: -31, y: 58, deg: 90, active: false, color: null, collisions: {
                "7": [3, 4],
                "12": [3]
            }},
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "8": [1, 2],
                "12": [2],
                "13": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "12": [1, 3],
                "13": [2],
                "16": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "12": [2],
                "16": [0]
            }}
        ],
        [
            //13
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "9": [1, 2],
                "13": [1],
                "14": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "13": [0, 2],
                "14": [2],
                "16": [1]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "12": [1, 2],
                "13": [1],
                "16": [1]
            }}
        ],
        [
            //14
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "10": [1, 2],
                "14": [1],
                "15": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "14": [0, 2],
                "15": [2],
                "17": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "13": [0, 1],
                "14": [1],
                "17": [0]
            }}
        ],
        [
            //15
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "11": [2, 3],
                "15": [1]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "15": [0, 2],
                "18": [0]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "14": [0, 1],
                "15": [1],
                "18": [0]
            }}
        ],
        [
            //16
            { x: -31, y: 58, deg: 90, active: false, color: null, collisions: {
                "12": [2, 3],
                "16": [3]
            }},
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "13": [1, 2],
                "16": [2],
                "17": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "16": [1, 3],
                "17": [2]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "16": [0, 2]
            }}
        ],
        [
            //17
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "14": [1, 2],
                "17": [1],
                "18": [2]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "17": [0, 2],
                "18": [2]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "16": [1, 2],
                "17": [1]
            }}
        ],
        [
            //18
            { x: 90, y: 58, deg: 90, active: false, color: null, collisions: {
                "15": [1, 2],
                "18": [1]
            }},
            { x: 59, y: 108, deg: -27.5, active: false, color: null, collisions: {
                "18": [0, 2]
            }},
            { x: 0, y: 108, deg: 27.5, active: false, color: null, collisions: {
                "17": [0, 1],
                "18": [1]
            }}
        ]
    ];
    
    let players = num;
    let preData = [];
    let stepY = 0;
    let stepX = 0;
    let startX = 180;
    let slotsCount = 19;
    let numbers = [];
    let sStepIndex = 0;
    let dStepIndex = 0;
    let randomizer = [];
    let devCards = [];
    let devCardsCount = 25;

    if (parseInt(players) === 5 || parseInt(players) === 6) {
        slotsCount = 30;
        devCardsCount = 31;
        let shufflerDevAr = ['resources', 'resources', 'resources', 'monopoly', 'monopoly', 'monopoly', 'roadBuilding', 'roadBuilding', 'roadBuilding', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'victory', 'victory', 'victory', 'victory', 'victory'];
        let shuffleAr = ['prostitute', 'prostitute', 'prostitute', 'prostitute', 'prostitute', 'alcohol', 'alcohol', 'alcohol', 'alcohol', 'alcohol', 'drugs', 'drugs', 'drugs', 'drugs', 'drugs', 'drugs', 'weapon', 'weapon', 'weapon', 'weapon' , 'weapon', 'weapon', 'slaves', 'slaves', 'slaves', 'slaves', 'slaves', 'slaves', 'police', 'police'];
        let shuffleNumAr = ['2', '2', '12', '12', '3', '3', '3', '4', '4', '4', '5', '5', '5', '6', '6', '6', '8', '8', '8', '9', '9', '9', '10', '10', '10', '11', '11', '11', '7', '7'];
        let sIndex = slotsCount;
        let dIndex = devCardsCount;

        cards.drugs = 25;
        cards.alcohol = 25;
        cards.prostitute = 25;
        cards.weapon = 25;
        cards.slaves = 25;
        cards.resources = 3;
        cards.monopoly = 3;
        cards.roadBuilding = 3;
        cards.police = 20;

        settlments = [
            [
                //0
                {x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "0": [0, 5],
                    "3": [1]
                }, distance: {
                    "0": [1, 5],
                    "3": [1]
                }},
                {x: -15, y: 15, active: false, upgrade: false, collisions: {
                    "0": [0, 1]
                }, distance: {
                    "0": [0, 2]
                }},
                {x: 45, y: -20, active: false, upgrade: false, collisions: {
                    "0": [1, 2]
                }, distance: {
                    "0": [1, 3]
                }},
                {x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "0": [2, 3],
                    "1": [0]
                }, distance: {
                    "0": [2],
                    "1": [0]
                }},
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "0": [3, 4],
                    "1": [4]
                }, distance: {
                    "0": [3],
                    "1": [3],
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "0": [4, 5],
                    "3": [2]
                }, distance: {
                    "0": [0, 4],
                    "3": [2]
                }}
            ],
            [
                //1
                {x: 45, y: -20, active: false, upgrade: false, collisions: {
                    "1": [0, 1]
                }, distance: {
                    "0": [3],
                    "1": [1]
                }},
                {x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "1": [1, 2],
                    "2": [0]
                }, distance: {
                    "1": [0, 2],
                    "2": [0]
                }},
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "1": [2, 3],
                    "2": [4]
                }, distance: {
                    "1": [1, 3],
                    "2": [3]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "1": [3, 4],
                    "4": [0]
                }, distance: {
                    "0": [4],
                    "1": [2]
                }}
            ],
            [
                //2
                {x: 45, y: -20, active: false, upgrade: false, collisions: {
                    "2": [0, 1]
                }, distance: {
                    "1": [1],
                    "2": [1]
                }},
                {x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "2": [1, 2]
                }, distance: {
                    "1": [0, 2]
                }},
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "2": [2, 3],
                    "6": [0]
                }, distance: {
                    "2": [1, 3],
                    "6": [0]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "2": [3, 4],
                    "5": [0]
                }, distance: {
                    "1": [2],
                    "2": [2],
                    "5": [0]
                }}
            ],
            [
                //3
                {x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "3": [0, 4],
                    "7": [1]
                }, distance: {
                    "3": [1, 3],
                    "7": [1]
                }},
                {x: -15, y: 15, active: false, upgrade: false, collisions: {
                    "3": [0, 1]
                }, distance: {
                    "0": [0],
                    "3": [0]
                }},
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "3": [2, 3],
                    "4": [2]
                }, distance: {
                    "0": [5],
                    "3": [3],
                    "4": [1]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "3": [3, 4],
                    "7": [2]
                }, distance: {
                    "3": [0, 2]
                }}
            ],
            [
                //4
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "4": [0, 1],
                    "5": [2]
                }, distance: {
                    "1": [3],
                    "4": [1],
                    "5": [1]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "4": [1, 2],
                    "8": [0]
                }, distance: {
                    "3": [2],
                    "4": [0]
                }}
            ],
            [
                //5
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "5": [0, 1],
                    "6": [3]
                }, distance: {
                    "2": [3],
                    "5": [1],
                    "6": [2]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "5": [1, 2],
                    "9": [0]
                }, distance: {
                    "4": [0],
                    "5": [0],
                    "9": [0]
                }}
            ],
            [
                //6
                {x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "6": [0, 1]
                }, distance: {
                    "2": [2],
                    "6": [1]
                }},
                {x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "6": [1, 2],
                    "11": [0]
                }, distance: {
                    "6": [0, 3]
                }},
                {x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "6": [2, 3],
                    "10": [0]
                }, distance: {
                    "5": [0],
                    "6": [1],
                    "10": [0]
                }}
            ],
            [
                //7
                { x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "7": [0, 4],
                    "12": [1]
                }, distance: {
                    "7": [1, 3],
                    "12": [1]
                }},
                { x: -15, y: 15, active: false, upgrade: false, collisions: {
                    "7": [0, 1]
                }, distance: {
                    "3": [0],
                    "7": [0]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "7": [2, 3],
                    "8": [2]
                }, distance: {
                    "3": [3],
                    "7": [3],
                    "8": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "7": [3, 4],
                    "12": [2]
                }, distance: {
                    "7": [0, 2],
                    "12": [2]
                }}
            ],
            [
                //8
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "8": [0, 1],
                    "9": [2]
                }, distance: {
                    "4": [1],
                    "8": [1],
                    "9": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "8": [1, 2],
                    "13": [0]
                }, distance: {
                    "7": [2],
                    "8": [0],
                    "13": [0]
                }}
            ],
            [
                //9
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "9": [0, 1],
                    "10": [1]
                }, distance: {
                    "5": [1],
                    "9": [1],
                    "10": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "9": [1, 2],
                    "14": [0]
                }, distance: {
                    "8": [0],
                    "9": [0],
                    "14": [0]
                }}
            ],
            [
                //10
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "10": [0, 1],
                    "11": [3]
                }, distance: {
                    "6": [2],
                    "10": [1],
                    "11": [2]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "10": [1, 2],
                    "15": [0]
                }, distance: {
                    "9": [0],
                    "10": [0],
                    "15": [0]
                }}
            ],
            [
                //11
                { x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "11": [0, 1]
                }, distance: {
                    "6": [1],
                    "11": [1]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "11": [1, 2],
                    "17": [0]
                }, distance: {
                    "11": [0, 2],
                    "17": [0]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "11": [2, 3],
                    "16": [0]
                }, distance: {
                    "10": [0],
                    "11": [1],
                    "16": [0]
                }}
            ],
            [
                //12
                { x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "12": [0, 4]
                }, distance: {
                    "12": [1, 3]
                }},
                { x: -15, y: 15, active: false, upgrade: false, collisions: {
                    "12": [0, 1]
                }, distance: {
                    "7": [0],
                    "12": [0]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "12": [2, 3],
                    "13": [2]
                }, distance: {
                    "7": [3],
                    "12": [3],
                    "13": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "12": [3, 4],
                    "18": [0]
                }, distance: {
                    "12": [0, 2],
                    "18": [0]
                }}
            ],
            [
                //13
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "13": [0, 1],
                    "14": [2]
                }, distance: {
                    "8": [1],
                    "13": [1],
                    "14": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "13": [1, 2],
                    "18": [1]
                }, distance: {
                    "12": [2],
                    "13": [0],
                    "18": [1]
                }}
            ],
            [
                //14
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "14": [0, 1],
                    "15": [2]
                }, distance: {
                    "9": [1],
                    "14": [1],
                    "15": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "14": [1, 2],
                    "19": [0]
                }, distance: {
                    "13": [0],
                    "14": [1],
                    "19": [0]
                }}
            ],
            [
                //15
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "15": [0, 1],
                    "16": [2]
                }, distance: {
                    "10": [1],
                    "15": [1],
                    "16": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "15": [1, 2],
                    "20": [0]
                }, distance: {
                    "14": [0],
                    "15": [0],
                    "20": [0]
                }}
            ],
            [
                //16
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "16": [0, 1],
                    "17": [3]
                }, distance: {
                    "11": [2],
                    "16": [1],
                    "17": [2]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "16": [1, 2],
                    "21": [0]
                }, distance: {
                    "15": [0],
                    "16": [0],
                    "21": [0]
                }}
            ],
            [
                //17
                { x: 105, y: 12, active: false, upgrade: false, collisions: {
                    "17": [0, 1]
                }, distance: {
                    "11": [1],
                    "17": [1]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "17": [1, 2]
                }, distance: {
                    "17": [0, 2]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "17": [2, 3],
                    "22": [0]
                }, distance: {
                    "16": [0],
                    "17": [1],
                    "22": [0]
                }}
            ],
            [
                //18
                { x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "18": [0, 3]
                }, distance: {
                    "12": [3],
                    "18": [2]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "18": [1, 2],
                    "19": [2]
                }, distance: {
                    "13": [1],
                    "18": [2],
                    "19": [1],
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "18": [2, 3],
                    "23": [0]
                }, distance: {
                    "18": [0, 1],
                    "23": [0]
                }}
            ],
            [
                //19
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "19": [0, 1],
                    "20": [2]
                }, distance: {
                    "14": [1],
                    "19": [1],
                    "20": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "19": [1, 2],
                    "23": [1]
                }, distance: {
                    "18": [1],
                    "19": [0],
                    "23": [1]
                }}
            ],
            [
                //20
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "20": [0, 1],
                    "21": [2]
                }, distance: {
                    "15": [1],
                    "20": [1],
                    "21": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "20": [1, 2],
                    "24": [0]
                }, distance: {
                    "19": [0],
                    "20": [1],
                    "24": [0]
                }}
            ],
            [
                //21
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "21": [0, 1],
                    "22": [2]
                }, distance: {
                    "16": [1],
                    "21": [1],
                    "22": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "21": [1, 2],
                    "25": [0]
                }, distance: {
                    "20": [0],
                    "21": [1],
                    "25": [0]
                }}
            ],
            [
                //22
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "22": [0, 1]
                }, distance: {
                    "17": [2],
                    "22": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "22": [1, 2],
                    "26": [0]
                }, distance: {
                    "21": [0],
                    "22": [0],
                    "26": [0]
                }}
            ],
            [
                //23
                { x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "23": [0, 3]
                }, distance: {
                    "18": [2],
                    "23": [2]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "23": [1, 2],
                    "24": [2]
                }, distance: {
                    "19": [1],
                    "23": [2],
                    "24": [1],
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "23": [2, 3],
                    "27": [0]
                }, distance: {
                    "23": [0, 1],
                    "27": [0]
                }}
            ],
            [
                //24
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "24": [0, 1],
                    "25": [2]
                }, distance: {
                    "20": [1],
                    "24": [1],
                    "25": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "24": [1, 2],
                    "27": [1]
                }, distance: {
                    "23": [1],
                    "24": [0],
                    "27": [1]
                }}
            ],
            [
                //25
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "25": [0, 1],
                    "26": [2]
                }, distance: {
                    "21": [1],
                    "25": [1],
                    "26": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "25": [1, 2],
                    "28": [0]
                }, distance: {
                    "24": [0],
                    "25": [0],
                    "28": [0]
                }}
            ],
            [
                //26
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "26": [0, 1]
                }, distance: {
                    "22": [1],
                    "26": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "26": [1, 2],
                    "29": [0]
                }, distance: {
                    "25": [0],
                    "26": [0],
                    "29": [0]
                }}
            ],
            [
                //27
                { x: -15, y: 80, active: false, upgrade: false, collisions: {
                    "27": [0, 3]
                }, distance: {
                    "23": [2],
                    "27": [2]
                }},
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "27": [1, 2],
                    "28": [2]
                }, distance: {
                    "24": [1],
                    "27": [2],
                    "28": [1],
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "27": [2, 3]
                }, distance: {
                    "27": [0, 1]
                }}
            ],
            [
                //28
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "28": [0, 1]
                }, distance: {
                    "25": [1],
                    "28": [1],
                    "29": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "28": [1, 2]
                }, distance: {
                    "27": [1],
                    "28": [0]
                }}
            ],
            [
                //29
                { x: 105, y: 80, active: false, upgrade: false, collisions: {
                    "29": [0, 1]
                }, distance: {
                    "26": [1],
                    "29": [1]
                }},
                { x: 45, y: 110, active: false, upgrade: false, collisions: {
                    "29": [1, 2]
                }, distance: {
                    "28": [0],
                    "29": [0]
                }}
            ],
        ];

        roads = [
            [
                //0
                {x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
                  "3": [1]
                }},
                {x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {}},
                {x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {
                  "1": [0]
                }},
                {x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                  "1": [0, 4]
                }},
                {x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                  "1": [4],
                  "3": [2]
                }},
                {x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                  "3": [1, 2]
                }}
            ],
            [
                //1
                {x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {
                  "0": [2, 3]
                }},
                {x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {
                  "2": [0]
                }},
                {x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                  "2": [0, 4]
                }},
                {x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                  "2": [4],
                  "4": [0]
                }},
                {x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                  "0": [3, 4],
                  "4": [0]
                }}
            ],
            [
                //2
                {x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {
                    "1": [1, 2]
                }},
                {x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {}},
                {x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "6": [0]
                }},
                {x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "5": [0],
                    "6": [0]
                }},
                {x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "1": [2, 3],
                    "5": [0]
                }}
            ],
            [
                //3
                {x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
                    "7": [1]
                }},
                {x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {
                    "0": [0, 5]
                }},
                {x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "0": [4, 5],
                    "4": [2]
                }},
                {x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "4": [2],
                    "7": [2]
                }},
                {x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "7": [1]
                }}
            ],
            [
                //4
                {x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "1": [3, 4],
                    "5": [2]
                }},
                {x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "5": [2],
                    "8": [0]
                }},
                {x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "3": [2, 3],
                    "8": [0]
                }}
            ],
            [
                //5
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "2": [3, 4],
                    "6": [3]
                } },
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "6": [3],
                    "9": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "4": [0, 1],
                    "9": [0]
                }}
            ],
            [
                //6
                { x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {
                    "2": [2, 3]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "11": [0]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "10": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "5": [0, 1],
                    "10": [0]
                }}
            ],
            [
                //7
                { x: -30, y: 58, deg: 90, active: false, color: null, collisions: {}},
                { x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {
                    "3": [0, 4]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "3": [3, 4],
                    "8": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "8": [2],
                    "12": [2]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "12": [1, 2]
                }}
            ],
            [
                //8
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "4": [1, 2],
                    "9": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "9": [2],
                    "13": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "13": [0],
                    "7": [2, 3],
                }}
            ],
            [
                //9
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "5": [1, 2],
                    "10": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "10": [2],
                    "14": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "14": [0],
                    "8": [0, 1]
                }}
            ],
            [
                //10
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "6": [2, 3],
                    "11": [3]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "11": [3],
                    "15": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "15": [0],
                    "9": [0, 1]
                }}
            ],
            [
                //11
                { x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {
                    "6": [1, 2]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "17": [0]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "17": [0],
                    "16": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "16": [0],
                    "10": [0, 1]
                }}
            ],
            [
                //12
                { x: -30, y: 58, deg: 90, active: false, color: null, collisions: {}},
                { x: 1, y: 9, deg: -27.5, active: false, color: null, collisions: {
                    "7": [0, 4]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "7": [3, 4],
                    "13": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "13": [2],
                    "18": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "18": [0]
                }}
            ],
            [
                //13
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "8": [1, 2],
                    "14": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "14": [2],
                    "18": [1]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "18": [1],
                    "12": [2, 3]
                }}
            ],
            [
                //14
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "9": [1, 2],
                    "15": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "15": [2],
                    "19": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "19": [0],
                    "13": [0, 1]
                }}
            ],
            [
                //15
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "10": [1, 2],
                    "16": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "16": [2],
                    "20": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "20": [0],
                    "14": [0, 1]
                }}
            ],
            [
                //16
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "11": [2, 3],
                    "17": [3]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "17": [3],
                    "21": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "21": [0],
                    "15": [0, 1]
                }}
            ],
            [
                //17
                { x: 60, y: 9, deg: 27.5, active: false, color: null, collisions: {
                    "11": [1, 2]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {}},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "22": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "22": [0],
                    "16": [0, 1]
                }}
            ],
            [
                //18
                { x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
                    "12": [3, 4]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "13": [1, 2],
                    "19": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "19": [2],
                    "23": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "23": [0]
                }}
            ],
            [
                //19
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "14": [1, 2],
                    "20": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "20": [2],
                    "23": [1]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "23": [1],
                    "18": [1, 2]
                }}
            ],
            [
                //20
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "15": [1, 2],
                    "21": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "21": [2],
                    "24": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "24": [0],
                    "19": [0, 1]
                }}
            ],
            [
                //21
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "16": [1, 2],
                    "22": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "22": [2],
                    "25": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "25": [0],
                    "20": [0, 1]
                }}
            ],
            [
                //22
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "17": [2, 3]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "26": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "26": [0],
                    "21": [0, 1]
                }}
            ],
            [
                //23
                { x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
                    "18": [2, 3]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "13": [1, 2],
                    "24": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "24": [2],
                    "27": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "27": [0]
                }}
            ],
            [
                //24
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "20": [1, 2],
                    "25": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "25": [2],
                    "27": [1]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "27": [1],
                    "23": [1, 2]
                }}
            ],
            [
                //25
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "21": [1, 2],
                    "26": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "26": [2],
                    "28": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "28": [0],
                    "24": [0, 1]
                }}
            ],
            [
                //26
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "22": [1, 2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "29": [0]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "29": [0],
                    "25": [0, 1]
                }}
            ],
            [
                //27
                { x: -30, y: 58, deg: 90, active: false, color: null, collisions: {
                    "23": [2, 3]
                }},
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "24": [1, 2],
                    "28": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {
                    "28": [2]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {}}
            ],
            [
                //28
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "25": [1, 2],
                    "29": [2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, collisions: {
                    "29": [2]
                }},
                { x: 1, y: 108, deg: 27.5, active: false, collisions: {
                    "27": [1, 2]
                }}
            ],
            [
                //29
                { x: 91, y: 58, deg: 90, active: false, color: null, collisions: {
                    "26": [1, 2]
                }},
                { x: 60, y: 108, deg: -27.5, active: false, color: null, collisions: {}},
                { x: 1, y: 108, deg: 27.5, active: false, color: null, collisions: {
                    "28": [0, 1]
                }}
            ],
        ];

        while (sIndex--) {
            sStepIndex = Math.floor(Math.random() * (sIndex + 1));
            randomizer.push(shuffleAr[sStepIndex]);
            numbers.push(shuffleNumAr[sStepIndex]);
            shuffleAr.splice(sStepIndex, 1);
            shuffleNumAr.splice(sStepIndex, 1);
        }

        while (dIndex--) {
            dStepIndex = Math.floor(Math.random() * (dIndex + 1));
            devCards.push(shufflerDevAr[dStepIndex]);
            shufflerDevAr.splice(dStepIndex, 1);
        }
    } else {
        let shufflerDevAr = ['resources', 'resources', 'monopoly', 'monopoly', 'roadBuilding', 'roadBuilding', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'police', 'victory', 'victory', 'victory', 'victory', 'victory'];
        let shuffleAr = ['prostitute', 'prostitute', 'prostitute', 'alcohol', 'alcohol', 'alcohol', 'drugs', 'drugs', 'drugs', 'drugs', 'weapon', 'weapon', 'weapon', 'weapon', 'slaves', 'slaves', 'slaves', 'slaves', 'police'];
        let shuffleNumAr = ['2', '12', '3', '3', '4', '4', '5', '5', '6', '6', '8', '8', '9', '9', '10', '10', '11', '11', '7'];
        let sIndex = slotsCount;
        let dIndex = devCardsCount;

        while (sIndex--) {
            sStepIndex = Math.floor(Math.random() * (sIndex + 1));
            randomizer.push(shuffleAr[sStepIndex]);
            numbers.push(shuffleNumAr[sStepIndex]);
            shuffleAr.splice(sStepIndex, 1);
            shuffleNumAr.splice(sStepIndex, 1);
        }

        while (dIndex--) {
            dStepIndex = Math.floor(Math.random() * (dIndex + 1));
            devCards.push(shufflerDevAr[dStepIndex]);
            shufflerDevAr.splice(dStepIndex, 1);
        }
    }
    
    for (let i = 0; i < slotsCount; i++) {
        if (i === 3) {
            startX = 240;
            stepX = 0;
            stepY = 100;
        }

        if (i === 7) {
            startX = 300;
            stepX = 0;
            stepY = 200;
        }

        if (i === 12 && slotsCount === 19) {
            startX = 240;
            stepX = 0;
            stepY = 300;
        }

        if (i === 16 && slotsCount === 19) {
            startX = 180;
            stepX = 0;
            stepY = 400;
        }

        if (i === 12 && slotsCount === 30) {
            startX = 360;
            stepX = 0;
            stepY = 300;
        }

        if (i === 18 && slotsCount === 30) {
            startX = 300;
            stepX = 0;
            stepY = 400;
        }

        if (i === 23 && slotsCount === 30) {
            startX = 240;
            stepX = 0;
            stepY = 500;
        }

        if (i === 27 && slotsCount === 30) {
            startX = 180;
            stepX = 0;
            stepY = 600;
        }
        
        preData.push({
            type: randomizer[i],
            x: startX + stepX,
            y: stepY,
            number: numbers[i]
        });

        stepX -= 120;
    }

    return {
        slots: preData,
        settlments,
        roads,
        cards,
        devCards,
        dice: 'static',
        diceNumber1: null,
        diceNumber2: null,
        brothelAdmin: '',
        initTimer: true
    };
};

const getGameStatistics = async (req, res) => {
    console.log("fgg");
};

module.exports = {
    initGame,
    rollDice,
    getGameStatistics
};