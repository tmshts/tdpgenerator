
class Construct {
  constructor(attributes){
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", attributes['type']);
      this.att = attributes;
      if('textContent' in this.att) {
        this.svg.textContent = this.att['textContent']
      }
  }
  draw() {
      for (const [key, value] of Object.entries(this.att)) {
          this.svg.setAttribute(key, value);
      }
      return this.svg;
  }
}


class Path extends Construct{
  // constructor(startPoint) {
  //   const att = {
  //       "type"  : "path",
  //       "style" : "fill:transparent; stroke: black; stroke-width: 2px;",
  //   }
  //   super(att)
  //   this.x = startPoint['x'];
  //   this.y = startPoint['y'];
  // }
  constructor(startPoint, att) {
    const basic_att = {
      "type"  : "path",
      "style" : "fill:transparent; stroke: black; stroke-width: 2px;",
    }
    att = att == null ? basic_att : att
    super({...basic_att, ...att})
    this.x =  startPoint['x']
    this.y = startPoint['y']
    this.points = []
    const coord = this.att['d']
    if(coord == null){return}
    for (let i = 2; i < coord.length; i = i + 2) {
        this.points.push({'x': coord[i] + this.x, 'y': coord[i+1] + this.y})
      }
      this.x += coord[0] 
      this.y += coord[1] 
  }
  flattenPoints () {
      const arr = []
      for (const element of this.points) {
          arr.push(element['x'])
          arr.push(element['y'])
      }
      return arr
  }
  addPath (char) {
      let c = this.flattenPoints().toString().replace(',', ' ');
      this.att['d'] = `M ${this.x} ${this.y} ${char} ` + c;
  }
}

class Actor {
  constructor(bottomLeftPoint) {
    this.x = bottomLeftPoint['x'];
    this.y = bottomLeftPoint['y'];
  }
}

class Machine extends Actor{
  constructor(bottomLeftPoint) {
    super(bottomLeftPoint)
  }
  getHead(x, y, cogniWork){
    return new Construct({
      'type': 'rect',
      'x': x - 20,
      'y': y - 35,
      'width': 40,
      'height': 35,
      'style': "stroke: black; stroke-width: 2px;",
      'fill': cogniWork == 'direct' ? 'blue' : cogniWork == 'indirect' ? 'lightblue' : 'none'
    })
  }
  getBody(x,y, cogniWork){
    let vfill;
    if(cogniWork=='direct'){
      vfill = 'blue';
    } else if(cogniWork=='indirect'){
      vfill = 'lightblue';
    } else vfill = 'none'; 

    return new Construct({
      "type": "rect",
      "x": x - 50, 
      "y": y,
      "width": 100,
      "height": 110,
      "style": "stroke: black; stroke-width: 2px;",
      'fill': vfill
    })
  }
  create(cogniWork, phyWork) {
    const x = this.x, y = this.y;
    return [
      this.getHead(x,y, cogniWork),
      this.getBody(x,y),
      new MachineArm(x,y, false, phyWork),
      new MachineArm(x,y, true, phyWork)
    ];
  }
 
}


class Human extends Actor{
  constructor(bottomLeftPoint) {
    super(bottomLeftPoint)
  }
  create(cogniWork, phyWork) {
    const x = this.x, y = this.y;
    return [
       new Head({'x': x, 'y': y - 21}, cogniWork),
       new Neck({'x': x + 8,'y': y - 1},false), 
       new Neck({'x': x - 8,'y': y - 1}, true), 
       new Body({'x': x + 33,'y': y + 29}), 
       new Body({'x': x - 33,'y': y + 29}),
       new Arm({'x': x + 18, 'y': y + 6}, false, phyWork), // TODO: distingution for left and right for gesture 
       new Arm({'x': x - 18, 'y': y + 6}, true, phyWork),
       new Construct({
          'type'  : 'polyline',
          'points': `${x - 33}, ${y + 109} ${x + 33},${y + 109}`,
          'style' : 'fill: none; stroke: black; stroke-width: 2px;'
      })
    ];
  }
}

class Neck extends Path {
  constructor(startPoint, isLeft) {
      super(startPoint);
      this.sign = isLeft ? -1 : 1;
      this.points =  [
          {'x': `${this.x+(12*this.sign)}`, 'y':`${this.y+(5)}`},
          {'x': `${this.x+(22*this.sign)}`, 'y':`${this.y+(20)}`},
          {'x': `${this.x+(25*this.sign)}`, 'y':`${this.y+(30)}`}
      ]
      this.addPath('C')
  }
}



class Body extends Construct{
  constructor(startPoint) {
      const x = startPoint['x'];
      const y = startPoint['y'];
      const att = {
          "type": "line",
          "x1": x,
          "y1": y,
          "x2": x,
          "y2": y + 80,
          "style": "fill: none; stroke: black; stroke-width: 2px;"
      }
      super(att)
  }
}

class Head extends Construct{
  constructor (centralPoint, cogniWork) {
    const x = centralPoint['x'];
    const y = centralPoint['y'];
    const att = {
      'type': 'circle',
      'cx': x,
      'cy': y,
      'r' : 21,
      'style': 'stroke: black; stroke-width: 2px;',
      'fill': cogniWork == 'direct' ? 'blue' : 'lightblue' 
    }
    super(att)
  }
}
//     agent_hand_right.setAttribute("points", "395,160 370,160 370,80");
            //     agent_hand_left.setAttribute("points", "465,160 490,160 490,80");
class MachineArm extends Construct{
  constructor(x, y, isLeft, engagement) {
    const att = {
      'type'  : 'polyline',
      'style' : 'fill: none; stroke: black; stroke-width: 2px;'
    }
    super(att);
    this.sign = isLeft ? -1 : 1;
    if(engagement=='physical') {
      this.att['points'] = [
        x+(40*this.sign),y+19, 
        x+(65*this.sign), y+19, 
        x+(65*this.sign), y-61
      ].toString()
    } else {
      this.att['points'] = [
        x+(40*this.sign),y+6, 
        x+(85*this.sign), y+40, 
        x+(38*this.sign), y+60
      ].toString()
    }
  }
}

class Arm extends Path{
  constructor(startPoint, isLeft, engagement) {
    super(startPoint);
    this.sign = isLeft ? -1 : 1;
    if(engagement=='physical') {
        this.points =  [
          {'x': `${this.x+(42*this.sign)}`, 'y':`${this.y-12}`},
          {'x': `${this.x+(42*this.sign)}`, 'y':`${this.y-47}`},
          {'x': `${this.x+(42*this.sign)}`, 'y':`${this.y-67}`}
        ]
    } else if(engagement=='gesture'){
        this.points =  [
          {'x': `${this.x+(18*this.sign)}`, 'y':`${this.y + 6}`},
          {'x': `${this.x+(42*this.sign)}`, 'y':`${this.y + 33}`},
          {'x': `${this.x+(72*this.sign)}`, 'y':`${this.y + 9}`},
        ]
    } else {
        this.points =  [
          {'x': `${this.x+(18*this.sign)}`, 'y':`${this.y + 6}`},
          {'x': `${this.x+(75*this.sign)}`, 'y':`${this.y + 28}`},
          {'x': `${this.x+(16*this.sign)}`, 'y':`${this.y + 43}`},
        ]
    }
    this.addPath('C');
  }
}

class PhysicalWork extends Construct{
  constructor(bottomLeftPoint, width, height, type){
    const att = {
      'type'  : 'rect', 
      'x'     : bottomLeftPoint['x'], 
      'y'     : bottomLeftPoint['y'], 
      'width' : width, // 140
      'height': height, // 40
      'style' : 'stroke: black; stroke-width: 2px;',
      'fill'  : type =='direct' ? 'blue' : 'lightblue'
    }
    super(att)
  }
}

class Location extends Construct{
  constructor(bottomLeftPoint, width, height){
    const att = {
      'type'  : 'rect', 
      'x'     : bottomLeftPoint['x'], 
      'y'     : bottomLeftPoint['y'], 
      'width' : width, // 400
      'height': height, // 10
      'style' : 'stroke: black; stroke-width: 2px;',
      'fill'  : 'grey'
    }
    super(att)
  }
}

class Arrow {
  constructor(arrowList) {
    this.arrows = arrowList
  }
  inverseArrows(points, min, max){
    let localMin = 1000 ;
    for (let i = 0; i < points.length; i = i + 2) {
      // only consider x values
      localMin = (points[i] < localMin) ?  points[i] : localMin;
      min = (localMin < min) ?  localMin : min;
      max = (points[i] > max) ?  points[i] : max;
    }
    const avg = Math.floor((max + min)/2);
    const shift = Math.floor(max - localMin);
    let diff = 0;
    for (let i = 0; i <  points.length; i = i + 2) {
      diff =  points[i] - avg;
      points[i] =  points[i] - (2 * diff)
    }
    return [points, shift] 
  }
  moveRect(shift) {
    for (const att of this.arrow) {
      if (att['type'] == 'rect'){
        att['x'] += shift -1
      }
    }
  }
  alignPoints (x,y, att) {
    for (const [index, value] of att['points'].entries()) {
      if(index % 2 == 0) {
        att['points'][index] += x
      } else {
        att['points'][index] += y;
      }
    }
    return att['points'];
  }
  create(startPoint, index, toLeft) {
    const x = startPoint['x'], y = startPoint['y'];
    const arr = [];
    let min = 1000, max = -1000;
    let shift = 0;
    this.arrow = this.arrows.at(index);
    for (const att of this.arrow) {
      if (att['type'] == 'rect'){
        att['x'] += x ;
        att['y'] += y ;
        min = att['x'];
        max = att['x'] + att['width'];
      } else if(att['type'] == 'polyline'){
        att['points'] = this.alignPoints(x,y, att);
        if(toLeft){
          [att['points'], shift] = this.inverseArrows(att['points'], min, max)
        }
        att['points'] = att['points'].toString()
      } else if(att['type'] == 'text') {
        att['x'] += x ;
        att['y'] += y ;
      }
      
      if(toLeft){
        this.moveRect(shift);
      }
      if(att['type'] == 'path'){
        let path = new Path(startPoint, att)
        path.addPath('l')
        min = path.x;
        arr.push(path)
      } else {
        arr.push(new Construct(att));
      }
      
    }
    return arr;
  }
}


class Supervision extends Arrow{
  constructor() {
    const levels = [
      [], // 1 not used
      [{'type': 'rect', 'x': 85, 'y': -21, 'width': 80, 'height': 3, 'fill': 'black'}, {'type': 'polyline', 'points': [165, -27, 170, -20, 165, -13], 'fill': 'black'}], // 2
      [{'type': 'polyline', 'points': [85, -27, 165, -27, 165,-34, 190,-21, 165,-8, 165,-15, 85,-15, 85,-27], 'style': 'fill: none; stroke: black; stroke-width: 2px;'}], // 3
      [{'type': 'polyline', 'points': [85, -26, 95, -19, 85, -12, 165, -12, 180, -19, 165, -26, 85, -26], 'style': 'fill: black; stroke: black; stroke-width: 2px;'}], // 4
      [{'type': 'rect', 'x': 85, 'y': -22, 'width': 80, 'height': 16, 'fill': 'black'}, {'type': 'polyline', 'points':[165,-32, 190, -14, 165, 3], 'fill': 'black'}], //5
    ]
    super(levels);
  }
}

class Transfer extends Arrow{
  // TODO add missing annotation letters
  constructor() {
    const transfers = [
      [
        //handover ,
        {'type': 'path', 'd': [80, -81, -40, -141],  'stroke-dasharray': '10,10'},
        {'type': 'polyline', 'points':  [190, -88, 198, -81, 190, -75], 'fill': 'black'}
      ],
      [
          // teach
          {'type': 'path', 'd': [85, 29, -65, -141], 'stroke-dasharray': '10,10'},
          {'type': 'polyline', 'points': [170, 24, 180 , 29, 170, 34], 'fill': 'black'},
          // hat
          {'type': 'polyline', 'points': [117, 9, 132, 4, 147, 9, 132, 14, 117, 9], 'fill': 'black'},
          {'type': 'polyline', 'points': [124, 12, 132, 15, 141, 12, 141, 20, 132, 22, 122, 20, 122, 11], 'fill': 'black'},
          {'type': 'line', 'x1': 268, 'y1': 150, 'x2': 268, 'y2': 155, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'circle', 'cx': 268, 'cy': 156, 'r': 1},
          {'type': 'polyline', 'points': [118, 14, 120, 21, 116, 21, 118, 14], 'fill': 'black'}
      ],
      [
        //question
        {'type': 'path', 'd': [85, 64, -65, -141], 'stroke-dasharray': '10,10'},
        {'type': 'polyline', 'points': [170, 59, 180, 64, 170, 69], 'fill': 'black'},
        // question mark
        {'type': 'text', 'textContent': '?', 'x': 127, 'y': 57, 'style':'stroke: black; '}
      ],
      [
        //feedback
        {'type': 'path', 'd': [85, 99, -65, -141], 'stroke-dasharray': '10,10'},
        {'type': 'polyline', 'points': [170, 94, 180, 99, 170, 104], 'fill': 'black'},
        // F char
        {'type': 'text', 'textContent': 'F', 'x': 127, 'y': 92, 'style': 'stroke: black;'}
      ]
    ]
    super(transfers);
  }

}
 



class Modality {
  constructor(leftPoint, rightPoint) {
    this.dist = rightPoint['x'] - leftPoint['x']
    this.x = leftPoint['x']
    this.y = leftPoint['y']
    
    this.modes = {
      // q behavior
      'visual': [
          {'type': 'circle', 'cx': 130, 'cy': 174, 'r': 5},
          {'type': 'circle', 'cx': 130, 'cy': 174, 'r': 10, 'style': 'fill: none; stroke: black; stroke-width: 2px;'},
          {'type': 'path', 'd': [105, 174, -125, -161, -100, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
          {'type': 'path', 'd': [105, 174, -125, -121, -100, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'}
      ],
      'haptic': [
          {'type': 'polyline', 'points': [55, 169, 55, 187, 57, 189, 57, 202], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 60, 'y1': 179, 'x2': 60, 'y2': 169, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'd': [55, 169, -147, -148, -145, -141] , 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 60, 'y1': 179, 'x2': 60, 'y2': 164, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 65, 'y1': 179, 'x2': 65, 'y2': 164, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'd': [60, 164, -147, -148, -145, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 65, 'y1': 179, 'x2': 65, 'y2': 159, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 70, 'y1': 179, 'x2': 70, 'y2': 159, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'd': [65, -159, -147, -148, -145, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 70, 'y1': 179, 'x2': 70, 'y2': 154, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 75, 'y1': 184, 'x2': 75, 'y2': 164, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'd': [70, 164, -147, -148, -145, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x1': 75, 'y1': 184, 'x2': 78, 'y2': 174, 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'd': [78, 174, -145, -148, -146, -144], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'polyline', 'points': [82, 176, 78, 191, 70, 197, 70, 202], 'style': 'fill: none; stroke: black; stroke-width: 1px;'}
      ],
      'aural': [
            {'type': 'path', 'd': [180, 174, -140, -156, -130, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'line', 'x1': 180, 'y1': 174, 'x2': 185, 'y2': 180, 'style': 'stroke: black; stroke-width: 1px;'},
            {'type': 'polyline', 'points': [200, 174, 200, 179, 192, 184], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'd': [180, 184, -145, -126, -138, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            //{'type': 'path', 'd': [180, 174, -140, -167 -124 -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'd': [173, 174, -130, -177, -112, -141], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'polyline', 'points': [211, 174, 207, 179, 202, 184], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'd': [180, 194, -132, -131, -128, -151], 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'}
      ],
      

    }
  }
  alignPoints (x,y, att) {
    for (const [index, value] of att['points'].entries()) {
      if(index % 2 == 0) {
        att['points'][index] += x
      } else {
        att['points'][index] += y;
      }
    }
    return att['points'];
  }
  create(modes) {
      const arr = [];
  
      for(const mode of modes) {
        for(const att of this.modes[mode]) {
          if(att['type'] == 'path'){
            let path = new Path({'x': this.x, 'y': this.y}, att);
            path.addPath('q');
            arr.push(path)
          } else if (att['type'] == 'circle'){
            att['cx'] += this.x;
            att['cy'] += this.y ;
            arr.push(new Construct(att))
          } else if (att['type'] == 'line'){
            att['x1'] += this.x;
            att['x2'] += this.x;
            att['y1'] += this.y;
            att['y2'] += this.y;
            arr.push(new Construct(att))
          }
          else if (att['type'] == 'polyline'){
            att['points'] = this.alignPoints(this.x,this.y, att);
            att['points'] = att['points'].toString();
            arr.push(new Construct(att))
          }
        }
      }
      return arr
    }      
}



export {Construct, Human, Machine, PhysicalWork, Location, Supervision, Modality, Transfer};
