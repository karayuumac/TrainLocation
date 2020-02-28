import moment = require("moment");
import {Moment} from "moment";
import * as holiday_jp from '@holiday-jp/holiday_jp';

const train_line_with = 1300;
const station_name_width = 100;

/**
 * 起動時にページをセットアップする関数
 */
$(async function () {
  setUpStations();
  setInterval(showNowDate, 1000);
  /*calcDiffX();*/

  await registerTrains();

  setTrains();

  setInterval(updateTrainPos, 1000);
  /*
  const readJson = JSON.parse(fs.readFileSync('./train_data/_joban.json'));
  for (let i in readJson) {
    console.info(i)
  }*/
});

function convertDistanceIntoX(distance: number) {
  return distance / Stations._length * train_line_with
}

function createStationObject(name: string, x: number, distance: number) {
  return '<div class="station" style="left: ' + x + 'px"></div>'
    + '<div class="station_name" style="left: ' + (x - station_name_width / 2) + 'px">' + distance + '<br/>' + name + '</div>'
}

function setUpStations() {
  Stations.station_data.forEach(value =>
    $('#train_line_outbound')
      .append(createStationObject(
        value.name,
        convertDistanceIntoX(value.distanceFromBeginning),
        value.distanceFromBeginning)
      )
  );
}

/**
 * 年・日・時刻・日付更新関数
 */
function showNowDate() {
  moment.locale("ja");
  let date = moment();
  $('#time').text(date.format('YYYY年MM月DD日(ddd) HH:mm:ss'));
  if (date.day() == 6 || date.day() == 0) {
    $('#dia_type').text('休日');
  } else {
    $('#dia_type').text('平日');
  }
}

class Station {
  constructor(public name: string, public distanceFromBeginning: number) {
  }
}

class Stations {
  private constructor() {
  }

  public static Shinagawa = new Station('品川', 0);
  public static Shimbashi = new Station('新橋', 4.9);
  public static Tokyo = new Station('東京', 6.8);
  public static Ueno = new Station('上野', 10.4);
  public static Nippori = new Station('日暮里', 12.6);
  public static Mikawashima = new Station('三河島', 13.8);
  public static MinamiSenju = new Station('南千住', 16);
  public static KitaSenju = new Station('北千住', 17.8);
  public static Matsudo = new Station('松戸', 28.3);
  public static Kashiwa = new Station('柏', 39.5);
  public static Abiko = new Station('我孫子', 43.9);
  public static Tennodai = new Station('天王台', 46.6);
  public static Toride = new Station('取手', 50);

  public static station_data = [
    Stations.Shinagawa, Stations.Shimbashi, Stations.Tokyo, Stations.Ueno, Stations.Nippori, Stations.Mikawashima,
    Stations.MinamiSenju, Stations.KitaSenju, Stations.Matsudo, Stations.Kashiwa, Stations.Abiko,
    Stations.Tennodai, Stations.Toride
  ];

  public static _length = Stations.station_data[Stations.station_data.length - 1].distanceFromBeginning
}

namespace Stations {
  export function fromString(string: string): Station | null {
    switch (string) {
      case 'Shinagawa':
        return Stations.Shinagawa;
      case 'Shimbashi':
        return Stations.Shimbashi;
      case 'Tokyo':
        return Stations.Tokyo;
      case 'Ueno':
        return Stations.Ueno;
      case 'Nippori':
        return Stations.Nippori;
      case 'Mikawashima':
        return Stations.Mikawashima;
      case 'MinamiSenju':
        return Stations.MinamiSenju;
      case 'KitaSenju':
        return Stations.KitaSenju;
      case 'Matsudo':
        return Stations.Matsudo;
      case 'Kashiwa':
        return Stations.Kashiwa;
      case 'Abiko':
        return Stations.Abiko;
      case 'Tennodai':
        return Stations.Tennodai;
      case 'Toride':
        return Stations.Toride;
      default:
        console.warn('Stations#fromStringで例外処理(' + string + ')');
        return null;
    }
  }
}

class Path {
  constructor(public from_time: Time, public to_time: Time,
              public from_station: Station, public to_station: Station) {
  }

  public x_pos(moment: Moment, direction: Direction) {
    const now = Time.from(moment);
    let x_pos;
    let elapsedSecond = now.minus(this.from_time);
    if (direction === Direction.Outbound) {
      x_pos = convertDistanceIntoX(this.from_station.distanceFromBeginning)
        + convertDistanceIntoX(this.to_station.distanceFromBeginning - this.from_station.distanceFromBeginning)
        / (this.to_time.minus(this.from_time)) * elapsedSecond;
    } else {
      x_pos = convertDistanceIntoX(this.from_station.distanceFromBeginning)
        - convertDistanceIntoX(this.from_station.distanceFromBeginning - this.to_station.distanceFromBeginning)
        / (this.to_time.minus(this.from_time)) * elapsedSecond;
    }
    return x_pos
  }
}

class Time {
  private hour: number;
  private minute: number;
  private second: number;

  constructor(public timer: string) {
    let doc = timer.split(':');

    this.hour = Number(doc[0]);
    this.minute = Number(doc[1]);
    this.second = Number(doc[2]);
  }

  public static isEarly(t1: Time, t2: Time): boolean {
    return t1.toSecond() >= t2.toSecond();
  }

  public toSecond(): number {
    return this.hour * 3600 + this.minute * 60 + this.second;
  }

  public minus(t1: Time): number {
    return this.toSecond() - t1.toSecond()
  }

  public static of(hour: number, minute: number, second: number): Time {
    return new Time(hour + ':' + minute + ':' + second);
  }

  public thisWithIn(t1: Time, t2: Time): boolean {
    return t1.toSecond() <= this.toSecond() && this.toSecond() <= t2.toSecond()
  }

  public static from(moment: Moment): Time {
    return Time.of(moment.hour(), moment.minute(), moment.second());
  }
}

interface Attribution {
  train_number: string,
  direction: Direction
  running_day: Running_day
  paths: Path[]
}

interface Info {
  attribution: Attribution,
  path: Path
}

interface Classes {
  train_class: string,
  identifier_class: string
}

type Running_day = (moment: Moment) => boolean

class Running_Day {
  public static Everyday: Running_day = moment => true;
  public static Weekend: Running_day = moment => moment.day() == 6 || moment.day() == 0;
  public static Weekday: Running_day = moment => !(Running_Day.Weekend(moment));
  public static Holiday: Running_day = moment => holiday_jp.isHoliday(moment.toDate());
  public static SaturdayHoliday: Running_day = moment => Running_Day.Weekend(moment) || Running_Day.Holiday(moment)
}

namespace Running_Day {
  export function fromString(string: string): Running_day | null {
    switch (string) {
      case 'SaturdayHoliday':
        return Running_Day.SaturdayHoliday;
      case 'Weekday':
        return Running_Day.Weekday;
      default:
        console.warn('Running_Day#fromStringで例外処理');
        return null;
    }
  }
}

class Train {
  constructor(public identifier: string, public type: Types, public attributions: Attribution[]) {
  }

  private classes(attribution: Attribution): Classes {
    const train_class = 'train_' + this.type + '_' + attribution.direction;
    const identifier_class = 'train_identifier_' + attribution.direction;
    return {train_class, identifier_class}
  }

  setTrainObj(moment: Moment): any {
    const info = this.getInfo(moment);
    if (info == null) {
      return
    }
    const attribution = info.attribution;
    const classes = this.classes(attribution);
    let x_pos;
    if (info.path != null) {
      x_pos = info.path.x_pos(moment, attribution.direction);
    }
    if (x_pos != null) {
      let obj = '<div class="' + classes.train_class + '" id="' + this.identifier + '" style="left: ' + x_pos + 'px">' + '</div>';
      obj += '<div class="' + classes.identifier_class + '" id="' + this.identifier + '_id' + '" style="left: ' + (x_pos - 25) + 'px">'
        + attribution.train_number + '</div>';
      $('#trains').append(obj);
    }
  }

  updateObj(moment: Moment) {
    const info = this.getInfo(moment);
    if (info == null) {
      return
    }
    const attribution = info.attribution;
    const classes = this.classes(attribution);
    let x_pos;
    if (info.path != null) {
      x_pos = info.path.x_pos(moment, attribution.direction);
    }
    if (x_pos != null) {
      $('#' + this.identifier)
        .css({left: x_pos})
        .removeClass()
        .addClass(classes.train_class);
      $('#' + this.identifier + '_id')
        .css({left: (x_pos - 25)})
        .text(attribution.train_number)
        .removeClass()
        .addClass(classes.identifier_class);
    }
  }

  private getInfo(now: Moment): Info | null {
    const filtered = this.attributions.filter(function (attr) {
      return attr.running_day(now)
    });

    if (filtered == null) {
      return null;
    }

    const _attribution = filtered.find(function (attr) {
      return attr.paths.some(function (path) {
        return Time.from(now).thisWithIn(path.from_time, path.to_time)
      })
    });

    if (_attribution == null) {
      return null;
    }

    const path = _attribution.paths.find(function (path) {
      return Time.from(now).thisWithIn(path.from_time, path.to_time)
    });

    return { attribution: _attribution, path: path };
  }
}

function setTrains(): void {
  let now = moment();
  $.each(Trains.trains, function () {
    this.setTrainObj(now);
  });
}

function updateTrainPos(): void {
  let now = moment();
  $.each(Trains.trains, function () {
    this.updateObj(now);
  })
}

function registerTrains(): Promise<any> {
  return new Promise(resolve => {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState == 4 && req.status == 200) {
        const json = JSON.parse(req.responseText);
        Object.keys(json).forEach(function (key) {
          let type;
          if (key.slice(-1) == 'M') {
            type = Types.Local
          } else {
            type = Types.Rapid
          }
          let attributions: Attribution[] = [];
          Object.keys(json[key]).forEach(function (_key) {
            let attr = json[key][_key];
            let _paths: Path[] = [];
            $.each(attr['paths'], function () {
              _paths.push(
                new Path(new Time(this['from_time']), new Time((this['to_time'])),
                  Stations.fromString(this['from_station']), Stations.fromString(this['to_station']))
              )
            });

            let _attr: Attribution = {
              train_number: attr['train_number'],
              direction: Direction.fromString(attr['direction']),
              running_day: Running_Day.fromString(attr['running_day']),
              paths: _paths
            };
            attributions.push(_attr)
          });

          const train: Train = new Train(key, type, attributions);
          Trains.trains.push(train)
        });
      }
    };
    req.open("GET", "http://localhost:63342/TrainLocation/train_data/_joban.json", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
    req.send(null);

    return resolve();
  })
}


enum Direction {
  Inbound = 'inbound', Outbound = 'outbound'
}

namespace Direction {
  export function fromString(string: string): Direction | null {
    switch (string.toLowerCase()) {
      case 'inbound':
        return Direction.Inbound;
      case 'outbound':
        return Direction.Outbound;
      default:
        console.warn('Direction#fromStringで例外処理');
        return null
    }
  }
}

enum Types {
  Rapid = 'rapid', Local = 'local'
}

namespace Types {
  export function fromString(string: string): Types | null {
    switch (string.toLowerCase()) {
      case 'rapid':
        return Types.Rapid;
      case 'local':
        return Types.Local;
      default:
        console.warn('Types#fromStringで例外処理');
        return null;
    }
  }
}

class Trains {
  public static trains = [];
}
