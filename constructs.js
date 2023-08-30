import { Instruct} from "./svg_handler.js";

class Actor {
  constructor(bottomLeftPoint) {
    this.point = bottomLeftPoint;
    this.instructs = [];
  }
  create() {
    return this.instructs;
  }
}

class Agent extends Actor{
  constructor(bottomLeftPoint, cogniWork, agentArm) {
    super(bottomLeftPoint);
    this.instructs.push(new Instruct(this.point, this.getHead(cogniWork)));
    this.instructs.push(new Instruct(this.point, this.getBody(cogniWork)));
    this.drawAgent(cogniWork,agentArm);
  }
  getHead(cogniWork){
    return {
      'type': 'rect',
      'x': -20,
      'y': -35,
      'width': 40,
      'height': 35,
      'style': "stroke: black; stroke-width: 2px;",
      'fill': cogniWork == 'direct' ? 'blue' : cogniWork == 'indirect' ? 'lightblue' : 'none'
    }
  }
  getBody(){
    return {
      "type": "rect",
      "x": -50, 
      "y": 0,
      "width": 100,
      "height": 110,
      "style": "stroke: black; stroke-width: 2px;",
      'fill': 'none'
    }
  }
  getArm(sign, agentArm){
    const points = [];
    const p = (agentArm=='physical') ? [40,19,65,19,65,-61] : [40,6,85,49,38,60];
    let x = p[0]; let y = p[1];
    for(let i=0; i < p.length; i+=2){
      points.push(p[i]*sign - x);
      points.push(p[i+ 1] - y);
    }
    return {
      'type'  : 'polyline',
      'x'     : x,
      'y'     : y,
      'points': points,
      'style' : 'fill: none; stroke: black; stroke-width: 2px;'
      }
    }
  drawAgent(cogniWork, agentArm) {
      this.instructs.push(new Instruct(this.point,this.getHead(cogniWork)));
      this.instructs.push(new Instruct(this.point,this.getBody()));
      this.instructs.push(new Instruct(this.point,this.getArm(-1, agentArm)));
      this.instructs.push(new Instruct(this.point,this.getArm( 1, agentArm)));
  }
}

class Human extends Actor{
  constructor(bottomLeftPoint, cogniWork, engagement) {
    super(bottomLeftPoint)
    this.drawHuman(cogniWork, engagement);
  }
  drawHuman(cogniWork, engagement){
    this.instructs.push(new Instruct(this.point, this.getHead(cogniWork)));
    for(const sign of [1,-1]) {
        this.instructs.push(new Instruct(this.point, this.getNeckHalf(sign)));
        this.instructs.push(new Instruct(this.point, this.getBodyHalf(sign)));
        this.instructs.push(new Instruct(this.point, this.getArm(sign, engagement)));
    }
    this.instructs.push(new Instruct(this.point, this.getBottom()));
  }
  getHead(cogniWork) {
    const r = 21;
    return {
      'type': 'circle',
      'x': 0,
      'y': -r,
      'r' : r,
      'style': 'stroke: black; stroke-width: 2px;',
      'fill': cogniWork == 'direct' ? 'blue' : 'lightblue' 
    }
  }
  getNeckHalf(sign) {
      return {
        'type': 'path',
        'x': 8*sign, 
        'y': -1,
        'd': `c ${12*sign} 5 ${22*sign} 20 ${25*sign} 30`,
        'style': 'fill:transparent; stroke: black; stroke-width: 2px;'
      };
    }
  getBodyHalf(sign) { 
    return {'type': 'line',
            'x': 33*sign,
            'y': 29,
            'points': [0, 0, 0, 80],
            'style': "fill: none; stroke: black; stroke-width: 2px;"
    }
  }
  getArm(sign, engagement){
    const att = {'style': 'fill:transparent; stroke: black; stroke-width: 2px;'}
    if(engagement=='physical') {
      att['type'] = 'path';
      att['x'] = 18*sign ;
      att['y'] = 6 ;
      att['d'] = `c ${42*sign} -12 ${42*sign} -47 ${42*sign} -67`;
    } else if(engagement=='gesture'){
      att['type'] = 'polyline';
      att['x'] = 18*sign ;
      att['y'] =  6;
      att['points'] = [0, 0, 42*sign, 33, 72*sign, 3]
    } else {
      att['type'] = 'polyline'
      att['x'] = 18*sign ;
      att['y'] =  6;
      att['points'] = [0, 0, 52*sign, 28, 16*sign, 43];
    }
    return att
  }
  getBottom() {
    return {
          'type'  : 'polyline',
          'x': -33,
          'y': 109,
          'points': [0, 0, 66, 0],
          'style' : 'fill: none; stroke: black; stroke-width: 2px;'
      }
  }
}

class PhysicalWork {
  constructor(bottomLeftPoint, width, height, type){
    const att = {
      'type'  : 'rect', 
      'x'     : 0, 
      'y'     : 0, 
      'width' : width, // 140
      'height': height, // 40
      'style' : 'stroke: black; stroke-width: 2px;',
      'fill'  : type =='direct' ? 'blue' : 'lightblue'
    }
    this.instruct = new Instruct(bottomLeftPoint, att);
  }
  draw() {
    return this.instruct.draw()
  }
}

class Location {
  constructor(bottomLeftPoint, width, height){
    const att = {
      'type'  : 'rect', 
      'x'     : 0, 
      'y'     : 0, 
      'width' : width, // 400
      'height': height, // 10
      'style' : 'stroke: black; stroke-width: 2px;',
      'fill'  : 'grey'
    }
    this.instruct = new Instruct(bottomLeftPoint, att);
    
  }
  draw() {
    return this.instruct.draw()
  }
}

class Arrow {
  constructor(leftPoint, arrowList) {
    this.leftPoint = leftPoint;
    this.arrows = arrowList;
  }
  inverseArrowHead(points) {
    let width = -1000;
    for (let i = 0; i < points.length; i = i + 2) {
      // only consider x values
      width = (width < points[i]) ? points[i] : width;
      points[i] *= -1;
    }
    return [points, width];
  }
  moveRect(shift) {
    for (const att of this.arrow) {
      if (att['type'] == 'rect'){
        att['x'] += shift -1
      }
    }
  }
  create(index, toLeft) {
    const arr = [];
    let min = 0;
    let shift = 0;
    this.arrow = this.arrows.at(index);
    for (const att of this.arrow) {
      if (['rect', 'path'].includes(att['type'])){
        min = att['x'];
      } else if(att['type'] == 'polyline' && toLeft){
          [att['points'], shift] = this.inverseArrowHead(att['points']);
          min = (min > 0) ? min : att['x'];
          att['x'] = min + shift;
          this.moveRect(shift);
      } 
      arr.push(new Instruct(this.leftPoint, att));
    }
    return arr;
  }
}

class Supervision extends Arrow{
  constructor(leftPoint) {
    const levels = [
      [], // no arrow for level 1
      [{'type': 'rect', 'x': 80, 'y': -20, 'width': 90, 'height': 3, 'fill': 'black'}, {'type': 'polyline', 'x': 170, 'y': -27, 'points': [0, 0, 5, 7, 0, 14], 'fill': 'black'}], // 2
      [{'type': 'polyline', 'x': 80, 'y': -27, 'points': [0, 0, 80, 0, 80, -7, 105, 6, 80, 19, 80, 12, 0, 12, 0, 0], 'style': 'fill: none; stroke: black; stroke-width: 2px;'}], // 3
      [{'type': 'polyline', 'x': 80, 'y': -26, 'points': [0, 0, 10, 7, 0, 14, 80, 14, 95, 7, 80, 0, 0, 0], 'style': 'fill: black; stroke: black; stroke-width: 2px;'}], // 4
      [{'type': 'rect', 'x': 80, 'y': -22, 'width': 70, 'height': 16, 'fill': 'black'}, {'type': 'polyline', 'x': 150, 'y': -32, 'points':[0, 0, 25, 18, 0, 35], 'fill': 'black'}], //5
    ];
    super(leftPoint, levels)
  }
}

class Transfer extends Arrow{
  // TODO add missing annotation letters
  constructor(leftPoint) {
    const transfers = [
      [
        //handover , 'd': 'l'
        {'type': 'path', 'x': 80, 'y': -81,  'd': 'l 85 0',  'stroke-dasharray': '10,10','style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
        {'type': 'polyline', 'x': 165, 'y': -88, 'points':  [0, 0, 8, 7, 0, 13], 'fill': 'black'}
      ],
      [
        // teach
        {'type': 'path', 'x': 80, 'y': 29, 'd': 'l 85 0', 'stroke-dasharray': '10,10', 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
        {'type': 'polyline', 'x': 165, 'y': 24, 'points': [0, 0, 10 , 5, 0, 10], 'fill': 'black'},
        // hat
      ],
      [
        //question
        {'type': 'path', 'x': 80, 'y': 64, 'd': 'l 85 0', 'stroke-dasharray': '10,10','style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
        {'type': 'polyline', 'x': 165, 'y': 59, 'points': [0, 0, 10, 5, 0, 10], 'fill': 'black'},
        // question mark
        {'type': 'text', 'textContent': '?', 'x': 124, 'y': 57, 'style':'stroke: black; '}
      ],
      [
        //feedback
        {'type': 'path', 'x': 80, 'y': 99, 'd': 'l 85 0', 'stroke-dasharray': '10,10', 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
        {'type': 'polyline', 'x': 165, 'y': 94, 'points': [0, 0, 10, 5, 0, 10], 'fill': 'black'},
        // F char
        {'type': 'text', 'textContent': 'F', 'x': 124, 'y': 92, 'style': 'stroke: black;'}
      ]
    ];
    super(leftPoint, transfers);
    this.hat = [ 
      {'type': 'polyline', 'x': 114, 'y': 9, 'points': [0, 0, 15, -5, 30, 0, 15, 5, 0, 0], 'fill': 'black'},
      {'type': 'polyline', 'x': 121, 'y': 12, 'points': [0, 0, 8, 3, 17, 0, 17, 8, 8, 10, -2, 8, -2, -1], 'fill': 'black'},
      {'type': 'line', 'x': 265, 'y': 150, 'points': [0, 0, 0, 5], 'style': 'stroke: black; stroke-width: 1px;'},
      {'type': 'circle', 'x': 265, 'y': 156, 'r': 1},
      {'type': 'polyline', 'x': 115, 'y': 14, 'points': [0, 0, 2, 7, -2, 7, 0, 0], 'fill': 'black'}
    ];
  }
  create(index, toLeft) {
    const arr = super.create(index, toLeft);
    if(index == 1) {
      for (const att of this.hat) {
        arr.push(new Instruct(this.leftPoint, att));
      }
    }
    return arr;
  }
}
 
class Modality {
  constructor(leftPoint, rightPoint) {
    this.dist = rightPoint['x'] - leftPoint['x'];
    this.x = leftPoint['x'];
    this.y = leftPoint['y'];
    this.leftPoint = leftPoint;
    this.modes = {
      // q behavior
      'visual': [
          {'type': 'circle', 'x': 130, 'y': 174, 'r': 5},
          {'type': 'circle', 'x': 130, 'y': 174, 'r': 10, 'style': 'fill: none; stroke: black; stroke-width: 2px;'},
          {'type': 'path', 'x': 105, 'y': 174, 'd': 'q 25 -20 50 0', 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'},
          {'type': 'path', 'x': 105, 'y': 174, 'd':  'q 25  20 50 0', 'style': 'fill:transparent; stroke: black; stroke-width: 2px;'}
      ],
      'haptic': [
          {'type': 'polyline', 'x': 55, 'y': 169, 'points': [0, 0, 0, 18, 2, 20, 2, 33], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'x': 55, 'y': 169, 'd':  'q 3 -7 5 0' , 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 60, 'y': 179, 'points': [0, 0, 0, -15], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 65, 'y': 179, 'points': [0, 0, 0, -20], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'x': 60, 'y': 164, 'd': 'q 3 -7 5 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 70, 'y': 179, 'points': [0, 0, 0, -20], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'x': 65, 'y': 159, 'd': 'q 3 -7 5 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 70, 'y': 179, 'points': [0, 0, 0, -20], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 75, 'y': 184, 'points': [0, 0, 0, -20], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'x': 70, 'y': 164,  'd': 'q 3 -7 5 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'line', 'x': 75, 'y': 184, 'points': [0, 0, 3, -10], 'style': 'stroke: black; stroke-width: 1px;'},
          {'type': 'path', 'x': 78, 'y': 174, 'd': 'q 5 -7 4 3', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
          {'type': 'polyline', 'x': 82, 'y': 176, 'points': [0, 0, -4, 15, -12, 23, -12, 26], 'style': 'fill: none; stroke: black; stroke-width: 1px;'}
      ],
      'aural': [
            {'type': 'path', 'x': 180, 'y': 174, 'd': 'q 10 -15, 20, 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'line', 'x': 180, 'y': 174, 'points': [0,0, 5, 6], 'style': 'stroke: black; stroke-width: 1px;'},
            {'type': 'polyline', 'x': 200, 'y': 174, 'points': [0, 0, 0, 5, -8, 10], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'x': 180, 'y': 184, 'd': 'q 5 15 12 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'x': 180, 'y': 174, 'd': 'q 10 -26 26 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'x': 173, 'y': 174, 'd': 'q 20 -36, 38, 0', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'},
            {'type': 'polyline', 'x': 211, 'y': 174, 'points': [0, 0, -4, 5, -9, 10], 'style': 'fill: none; stroke: black; stroke-width: 1px;'},
            {'type': 'path', 'x': 180, 'y': 194, 'd': 'q 18, 10, 22, -10', 'style': 'fill:transparent; stroke: black; stroke-width: 1px;'}
      ],
      

    }
  }
  create(modes) {
      const arr = [];
      for(const mode of modes) {
        for(const att of this.modes[mode]) {
          arr.push(new Instruct(this.leftPoint, att))
        }
      }
      return arr
    }      
}

export {Human, Agent, PhysicalWork, Location, Supervision, Modality, Transfer};
