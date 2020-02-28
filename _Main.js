"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var moment = require("moment");
var holiday_jp = require("@holiday-jp/holiday_jp");
var train_line_with = 1300;
var station_name_width = 100;
/**
 * 起動時にページをセットアップする関数
 */
$(function () {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setUpStations();
                    setInterval(showNowDate, 1000);
                    /*calcDiffX();*/
                    return [4 /*yield*/, registerTrains()];
                case 1:
                    /*calcDiffX();*/
                    _a.sent();
                    setTrains();
                    setInterval(updateTrainPos, 1000);
                    return [2 /*return*/];
            }
        });
    });
});
function convertDistanceIntoX(distance) {
    return distance / Stations._length * train_line_with;
}
function createStationObject(name, x, distance) {
    return '<div class="station" style="left: ' + x + 'px"></div>'
        + '<div class="station_name" style="left: ' + (x - station_name_width / 2) + 'px">' + distance + '<br/>' + name + '</div>';
}
function setUpStations() {
    Stations.station_data.forEach(function (value) {
        return $('#train_line_outbound')
            .append(createStationObject(value.name, convertDistanceIntoX(value.distanceFromBeginning), value.distanceFromBeginning));
    });
}
/**
 * 年・日・時刻・日付更新関数
 */
function showNowDate() {
    moment.locale("ja");
    var date = moment();
    $('#time').text(date.format('YYYY年MM月DD日(ddd) HH:mm:ss'));
    if (date.day() == 6 || date.day() == 0) {
        $('#dia_type').text('休日');
    }
    else {
        $('#dia_type').text('平日');
    }
}
var Station = /** @class */ (function () {
    function Station(name, distanceFromBeginning) {
        this.name = name;
        this.distanceFromBeginning = distanceFromBeginning;
    }
    return Station;
}());
var Stations = /** @class */ (function () {
    function Stations() {
    }
    Stations.Shinagawa = new Station('品川', 0);
    Stations.Shimbashi = new Station('新橋', 4.9);
    Stations.Tokyo = new Station('東京', 6.8);
    Stations.Ueno = new Station('上野', 10.4);
    Stations.Nippori = new Station('日暮里', 12.6);
    Stations.Mikawashima = new Station('三河島', 13.8);
    Stations.MinamiSenju = new Station('南千住', 16);
    Stations.KitaSenju = new Station('北千住', 17.8);
    Stations.Matsudo = new Station('松戸', 28.3);
    Stations.Kashiwa = new Station('柏', 39.5);
    Stations.Abiko = new Station('我孫子', 43.9);
    Stations.Tennodai = new Station('天王台', 46.6);
    Stations.Toride = new Station('取手', 50);
    Stations.station_data = [
        Stations.Shinagawa, Stations.Shimbashi, Stations.Tokyo, Stations.Ueno, Stations.Nippori, Stations.Mikawashima,
        Stations.MinamiSenju, Stations.KitaSenju, Stations.Matsudo, Stations.Kashiwa, Stations.Abiko,
        Stations.Tennodai, Stations.Toride
    ];
    Stations._length = Stations.station_data[Stations.station_data.length - 1].distanceFromBeginning;
    return Stations;
}());
(function (Stations) {
    function fromString(string) {
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
    Stations.fromString = fromString;
})(Stations || (Stations = {}));
var Path = /** @class */ (function () {
    function Path(from_time, to_time, from_station, to_station) {
        this.from_time = from_time;
        this.to_time = to_time;
        this.from_station = from_station;
        this.to_station = to_station;
    }
    Path.prototype.x_pos = function (moment, direction) {
        var now = Time.from(moment);
        var x_pos;
        var elapsedSecond = now.minus(this.from_time);
        if (direction === Direction.Outbound) {
            x_pos = convertDistanceIntoX(this.from_station.distanceFromBeginning)
                + convertDistanceIntoX(this.to_station.distanceFromBeginning - this.from_station.distanceFromBeginning)
                    / (this.to_time.minus(this.from_time)) * elapsedSecond;
        }
        else {
            x_pos = convertDistanceIntoX(this.from_station.distanceFromBeginning)
                - convertDistanceIntoX(this.from_station.distanceFromBeginning - this.to_station.distanceFromBeginning)
                    / (this.to_time.minus(this.from_time)) * elapsedSecond;
        }
        return x_pos;
    };
    return Path;
}());
var Time = /** @class */ (function () {
    function Time(timer) {
        this.timer = timer;
        var doc = timer.split(':');
        this.hour = Number(doc[0]);
        this.minute = Number(doc[1]);
        this.second = Number(doc[2]);
    }
    Time.isEarly = function (t1, t2) {
        return t1.toSecond() >= t2.toSecond();
    };
    Time.prototype.toSecond = function () {
        return this.hour * 3600 + this.minute * 60 + this.second;
    };
    Time.prototype.minus = function (t1) {
        return this.toSecond() - t1.toSecond();
    };
    Time.of = function (hour, minute, second) {
        return new Time(hour + ':' + minute + ':' + second);
    };
    Time.prototype.thisWithIn = function (t1, t2) {
        return t1.toSecond() <= this.toSecond() && this.toSecond() <= t2.toSecond();
    };
    Time.from = function (moment) {
        return Time.of(moment.hour(), moment.minute(), moment.second());
    };
    return Time;
}());
var Running_Day = /** @class */ (function () {
    function Running_Day() {
    }
    Running_Day.Everyday = function (moment) { return true; };
    Running_Day.Weekend = function (moment) { return moment.day() == 6 || moment.day() == 0; };
    Running_Day.Weekday = function (moment) { return !(Running_Day.Weekend(moment)); };
    Running_Day.Holiday = function (moment) { return holiday_jp.isHoliday(moment.toDate()); };
    Running_Day.SaturdayHoliday = function (moment) { return Running_Day.Weekend(moment) || Running_Day.Holiday(moment); };
    return Running_Day;
}());
(function (Running_Day) {
    function fromString(string) {
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
    Running_Day.fromString = fromString;
})(Running_Day || (Running_Day = {}));
var Train = /** @class */ (function () {
    function Train(identifier, type, attributions) {
        this.identifier = identifier;
        this.type = type;
        this.attributions = attributions;
    }
    Train.prototype.classes = function (attribution) {
        var train_class = 'train_' + this.type + '_' + attribution.direction;
        var identifier_class = 'train_identifier_' + attribution.direction;
        return { train_class: train_class, identifier_class: identifier_class };
    };
    Train.prototype.setTrainObj = function (moment) {
        var info = this.getInfo(moment);
        if (info == null) {
            return;
        }
        var attribution = info.attribution;
        var classes = this.classes(attribution);
        var x_pos;
        if (info.path != null) {
            x_pos = info.path.x_pos(moment, attribution.direction);
        }
        if (x_pos != null) {
            var obj = '<div class="' + classes.train_class + '" id="' + this.identifier + '" style="left: ' + x_pos + 'px">' + '</div>';
            obj += '<div class="' + classes.identifier_class + '" id="' + this.identifier + '_id' + '" style="left: ' + (x_pos - 25) + 'px">'
                + attribution.train_number + '</div>';
            $('#trains').append(obj);
        }
    };
    Train.prototype.updateObj = function (moment) {
        var info = this.getInfo(moment);
        if (info == null) {
            return;
        }
        var attribution = info.attribution;
        var classes = this.classes(attribution);
        var x_pos;
        if (info.path != null) {
            x_pos = info.path.x_pos(moment, attribution.direction);
        }
        if (x_pos != null) {
            $('#' + this.identifier)
                .css({ left: x_pos })
                .removeClass()
                .addClass(classes.train_class);
            $('#' + this.identifier + '_id')
                .css({ left: (x_pos - 25) })
                .text(attribution.train_number)
                .removeClass()
                .addClass(classes.identifier_class);
        }
    };
    Train.prototype.getInfo = function (now) {
        var filtered = this.attributions.filter(function (attr) {
            return attr.running_day(now);
        });
        if (filtered == null) {
            return null;
        }
        var _attribution = filtered.find(function (attr) {
            return attr.paths.some(function (path) {
                return Time.from(now).thisWithIn(path.from_time, path.to_time);
            });
        });
        if (_attribution == null) {
            return null;
        }
        var path = _attribution.paths.find(function (path) {
            return Time.from(now).thisWithIn(path.from_time, path.to_time);
        });
        return { attribution: _attribution, path: path };
    };
    return Train;
}());
function setTrains() {
    var now = moment();
    $.each(Trains.trains, function () {
        this.setTrainObj(now);
    });
}
function updateTrainPos() {
    var now = moment();
    $.each(Trains.trains, function () {
        this.updateObj(now);
    });
}
function registerTrains() {
    return new Promise(function (resolve) {
        var req = new XMLHttpRequest();
        req.onreadystatechange = function () {
            if (req.readyState == 4 && req.status == 200) {
                var json_1 = JSON.parse(req.responseText);
                Object.keys(json_1).forEach(function (key) {
                    var type;
                    if (key.slice(-1) == 'M') {
                        type = Types.Local;
                    }
                    else {
                        type = Types.Rapid;
                    }
                    var attributions = [];
                    Object.keys(json_1[key]).forEach(function (_key) {
                        var attr = json_1[key][_key];
                        var _paths = [];
                        $.each(attr['paths'], function () {
                            _paths.push(new Path(new Time(this['from_time']), new Time((this['to_time'])), Stations.fromString(this['from_station']), Stations.fromString(this['to_station'])));
                        });
                        var _attr = {
                            train_number: attr['train_number'],
                            direction: Direction.fromString(attr['direction']),
                            running_day: Running_Day.fromString(attr['running_day']),
                            paths: _paths
                        };
                        attributions.push(_attr);
                    });
                    var train = new Train(key, type, attributions);
                    Trains.trains.push(train);
                });
            }
        };
        req.open("GET", "http://localhost:63342/TrainLocation/train_data/_joban.json", false); // HTTPメソッドとアクセスするサーバーの　URL　を指定
        req.send(null);
        return resolve();
    });
}
var Direction;
(function (Direction) {
    Direction["Inbound"] = "inbound";
    Direction["Outbound"] = "outbound";
})(Direction || (Direction = {}));
(function (Direction) {
    function fromString(string) {
        switch (string.toLowerCase()) {
            case 'inbound':
                return Direction.Inbound;
            case 'outbound':
                return Direction.Outbound;
            default:
                console.warn('Direction#fromStringで例外処理');
                return null;
        }
    }
    Direction.fromString = fromString;
})(Direction || (Direction = {}));
var Types;
(function (Types) {
    Types["Rapid"] = "rapid";
    Types["Local"] = "local";
})(Types || (Types = {}));
(function (Types) {
    function fromString(string) {
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
    Types.fromString = fromString;
})(Types || (Types = {}));
var Trains = /** @class */ (function () {
    function Trains() {
    }
    Trains.trains = [];
    return Trains;
}());
