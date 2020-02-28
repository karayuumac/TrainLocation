setUpWhenPageLoaded();

const train_line_with = 1300;
const station_name_width = 100;

/**
 * 起動時にページをセットアップする関数
 */
function setUpWhenPageLoaded() {
  $(document).ready(function () {
    setUpStations();
    /*calcDiffX();*/
    setInterval('showNowDate()', 1000);
  });

  /*$(window).load(function () {
    setTrain();
  })*/
}

function convertDistanceIntoX(distance) {
  return distance / station_data[station_data.length - 1].distanceFromBeginning * train_line_with
}

function calcDiffX() {
  var prev = null;
  $.each(station_data, function () {
    if (prev == null) {
      prev = this
    } else {
      diff_x.push((this.distanceFromBeginning - prev.distanceFromBeginning) /
        station_data[station_data.length - 1].distanceFromBeginning * train_line_with);
      prev = this
    }
  });
}

function createStationObject(name, x, distance) {
  return '<div class="station" style="left: ' + x + 'px"></div>'
    + '<div class="station_name" style="left: ' + (x - station_name_width / 2) + 'px">' + distance + '<br/>' + name + '</div>'
}

function setUpStations() {
  station_data.forEach(value =>
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
  $('#time').text(date.format('YYYY年MM月DD日(ddd) HH:mm:ss'))
}


class StationData {
  constructor(name, distanceFromBeginning) {
    this.name = name;
    this.distanceFromBeginning = distanceFromBeginning;
  }
}

let station_data = [
  new StationData('品川', 0), // 0
  new StationData('新橋', 4.9), // 1
  new StationData('東京', 6.8), // 2
  new StationData('上野', 10.4),  // 3
  new StationData('日暮里', 12.6), // 4
  new StationData('三河島', 13.8), // 5
  new StationData('南千住', 16), // 6
  new StationData('北千住', 17.8), // 7
  new StationData('松戸', 28.3), // 8
  new StationData('柏', 39.5), // 9
  new StationData('我孫子', 43.9), // 10
  new StationData('天王台', 46.6), // 11
  new StationData('取手', 50) // 12
];

const diff_x = [
  127.4, 49.3, 93.6, 57.1, 31.2, 57.1, 46.8, 273, 291.2, 114.3, 70.2, 88.3
];

class Path {
  constructor(from_date, to_date, from_station, to_station) {
    this.from_date = from_date;
    this.to_date = to_date;
    this.from_station = from_station;
    this.to_station = to_station;
  }
}

class Time {
  constructor(timer) {
    let doc = timer.split(':');

    this.hour = doc[0];
    this.minute = doc[1];
  }

  isEarly(t1, t2) {
    let s1 = t1.hour * 24 + t1.minute;
    let s2 = t2.hour * 24 + t2.minute;
    return s1 >= s2;
  }

  of(hour, minute) {
    return new Time(hour + ':' + minute);
  }
}

const trains = {
  1 : {
    number: '1360H(test)',
    loc: [
      new Path(new Time('19:50'), new Time('19:55'), 0, 1)
    ]
  }
};

function setTrain() {
  let moment = moment();
  let now = new Time().of(moment.hour, moment.minute);
  console.info(now);
  $.each(trains, function () {
    $.each(this.loc, function () {

    })
  })
}

function updateTrainPos() {
  $.each(trains, function () {
    let train = this

  })
}
