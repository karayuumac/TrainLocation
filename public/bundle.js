(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{"@holiday-jp/holiday_jp":2,"moment":3}],2:[function(require,module,exports){
(function() {
  var holiday_jp =
        
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/holiday_jp.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/holiday_jp.js":
/*!***************************!*\
  !*** ./lib/holiday_jp.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var package_info = __webpack_require__(/*! ./../package.json */ \"./package.json\");\nvar holidays = __webpack_require__(/*! ./holidays */ \"./lib/holidays.js\");\n\nfunction format(date) {\n  var year = date.getFullYear();\n  var month = ('0' + (date.getMonth() + 1)).slice(-2);\n  var day = ('0' + (date.getDate())).slice(-2);\n  return (year + '-' + month + '-' + day);\n}\n\nvar holiday_jp = {\n  VERSION: package_info.version,\n  between: function(start, last) {\n    var selected = [];\n    var d;\n    start = new Date(format(start));\n    last = new Date(format(last));\n    Object.keys(holidays).forEach(function (date) {\n      d = new Date(holidays[date]['date']);\n      if (start <= d && d <= last) {\n        holidays[date]['date'] = d;\n        selected.push(holidays[date]);\n      }\n    });\n    return selected;\n  },\n\n  isHoliday: function(date) {\n    if (date instanceof Date) {\n      date = format(date);\n    }\n    if (holidays[date]) {\n      return true;\n    }\n    return false;\n  }\n};\n\nmodule.exports = holiday_jp;\n\n\n//# sourceURL=webpack:///./lib/holiday_jp.js?");

/***/ }),

/***/ "./lib/holidays.js":
/*!*************************!*\
  !*** ./lib/holidays.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// Generated from holidays.yml at 2019-02-17 19:24:18;\nvar holidays = {};\nholidays['1970-01-01'] = {\n  'date': '1970-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1970-01-15'] = {\n  'date': '1970-01-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1970-02-11'] = {\n  'date': '1970-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1970-03-21'] = {\n  'date': '1970-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1970-04-29'] = {\n  'date': '1970-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1970-05-03'] = {\n  'date': '1970-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1970-05-05'] = {\n  'date': '1970-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1970-09-15'] = {\n  'date': '1970-09-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1970-09-23'] = {\n  'date': '1970-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1970-10-10'] = {\n  'date': '1970-10-10',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1970-11-03'] = {\n  'date': '1970-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1970-11-23'] = {\n  'date': '1970-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1971-01-01'] = {\n  'date': '1971-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1971-01-15'] = {\n  'date': '1971-01-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1971-02-11'] = {\n  'date': '1971-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1971-03-21'] = {\n  'date': '1971-03-21',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1971-04-29'] = {\n  'date': '1971-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1971-05-03'] = {\n  'date': '1971-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1971-05-05'] = {\n  'date': '1971-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1971-09-15'] = {\n  'date': '1971-09-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1971-09-24'] = {\n  'date': '1971-09-24',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1971-10-10'] = {\n  'date': '1971-10-10',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1971-11-03'] = {\n  'date': '1971-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1971-11-23'] = {\n  'date': '1971-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1972-01-01'] = {\n  'date': '1972-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1972-01-15'] = {\n  'date': '1972-01-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1972-02-11'] = {\n  'date': '1972-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1972-03-20'] = {\n  'date': '1972-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1972-04-29'] = {\n  'date': '1972-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1972-05-03'] = {\n  'date': '1972-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1972-05-05'] = {\n  'date': '1972-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1972-09-15'] = {\n  'date': '1972-09-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1972-09-23'] = {\n  'date': '1972-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1972-10-10'] = {\n  'date': '1972-10-10',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1972-11-03'] = {\n  'date': '1972-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1972-11-23'] = {\n  'date': '1972-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1973-01-01'] = {\n  'date': '1973-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1973-01-15'] = {\n  'date': '1973-01-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1973-02-11'] = {\n  'date': '1973-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1973-03-21'] = {\n  'date': '1973-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1973-04-29'] = {\n  'date': '1973-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1973-04-30'] = {\n  'date': '1973-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1973-05-03'] = {\n  'date': '1973-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1973-05-05'] = {\n  'date': '1973-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1973-09-15'] = {\n  'date': '1973-09-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1973-09-23'] = {\n  'date': '1973-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1973-09-24'] = {\n  'date': '1973-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1973-10-10'] = {\n  'date': '1973-10-10',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1973-11-03'] = {\n  'date': '1973-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1973-11-23'] = {\n  'date': '1973-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1974-01-01'] = {\n  'date': '1974-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1974-01-15'] = {\n  'date': '1974-01-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1974-02-11'] = {\n  'date': '1974-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1974-03-21'] = {\n  'date': '1974-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1974-04-29'] = {\n  'date': '1974-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1974-05-03'] = {\n  'date': '1974-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1974-05-05'] = {\n  'date': '1974-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1974-05-06'] = {\n  'date': '1974-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1974-09-15'] = {\n  'date': '1974-09-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1974-09-16'] = {\n  'date': '1974-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1974-09-23'] = {\n  'date': '1974-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1974-10-10'] = {\n  'date': '1974-10-10',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1974-11-03'] = {\n  'date': '1974-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1974-11-04'] = {\n  'date': '1974-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1974-11-23'] = {\n  'date': '1974-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1975-01-01'] = {\n  'date': '1975-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1975-01-15'] = {\n  'date': '1975-01-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1975-02-11'] = {\n  'date': '1975-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1975-03-21'] = {\n  'date': '1975-03-21',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1975-04-29'] = {\n  'date': '1975-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1975-05-03'] = {\n  'date': '1975-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1975-05-05'] = {\n  'date': '1975-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1975-09-15'] = {\n  'date': '1975-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1975-09-24'] = {\n  'date': '1975-09-24',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1975-10-10'] = {\n  'date': '1975-10-10',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1975-11-03'] = {\n  'date': '1975-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1975-11-23'] = {\n  'date': '1975-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1975-11-24'] = {\n  'date': '1975-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1976-01-01'] = {\n  'date': '1976-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1976-01-15'] = {\n  'date': '1976-01-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1976-02-11'] = {\n  'date': '1976-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1976-03-20'] = {\n  'date': '1976-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1976-04-29'] = {\n  'date': '1976-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1976-05-03'] = {\n  'date': '1976-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1976-05-05'] = {\n  'date': '1976-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1976-09-15'] = {\n  'date': '1976-09-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1976-09-23'] = {\n  'date': '1976-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1976-10-10'] = {\n  'date': '1976-10-10',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1976-10-11'] = {\n  'date': '1976-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1976-11-03'] = {\n  'date': '1976-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1976-11-23'] = {\n  'date': '1976-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1977-01-01'] = {\n  'date': '1977-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1977-01-15'] = {\n  'date': '1977-01-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1977-02-11'] = {\n  'date': '1977-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1977-03-21'] = {\n  'date': '1977-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1977-04-29'] = {\n  'date': '1977-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1977-05-03'] = {\n  'date': '1977-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1977-05-05'] = {\n  'date': '1977-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1977-09-15'] = {\n  'date': '1977-09-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1977-09-23'] = {\n  'date': '1977-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1977-10-10'] = {\n  'date': '1977-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1977-11-03'] = {\n  'date': '1977-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1977-11-23'] = {\n  'date': '1977-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1978-01-01'] = {\n  'date': '1978-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1978-01-02'] = {\n  'date': '1978-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1978-01-15'] = {\n  'date': '1978-01-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1978-01-16'] = {\n  'date': '1978-01-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1978-02-11'] = {\n  'date': '1978-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1978-03-21'] = {\n  'date': '1978-03-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1978-04-29'] = {\n  'date': '1978-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1978-05-03'] = {\n  'date': '1978-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1978-05-05'] = {\n  'date': '1978-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1978-09-15'] = {\n  'date': '1978-09-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1978-09-23'] = {\n  'date': '1978-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1978-10-10'] = {\n  'date': '1978-10-10',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1978-11-03'] = {\n  'date': '1978-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1978-11-23'] = {\n  'date': '1978-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1979-01-01'] = {\n  'date': '1979-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1979-01-15'] = {\n  'date': '1979-01-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1979-02-11'] = {\n  'date': '1979-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1979-02-12'] = {\n  'date': '1979-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1979-03-21'] = {\n  'date': '1979-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1979-04-29'] = {\n  'date': '1979-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1979-04-30'] = {\n  'date': '1979-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1979-05-03'] = {\n  'date': '1979-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1979-05-05'] = {\n  'date': '1979-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1979-09-15'] = {\n  'date': '1979-09-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1979-09-24'] = {\n  'date': '1979-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1979-10-10'] = {\n  'date': '1979-10-10',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1979-11-03'] = {\n  'date': '1979-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1979-11-23'] = {\n  'date': '1979-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1980-01-01'] = {\n  'date': '1980-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1980-01-15'] = {\n  'date': '1980-01-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1980-02-11'] = {\n  'date': '1980-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1980-03-20'] = {\n  'date': '1980-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1980-04-29'] = {\n  'date': '1980-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1980-05-03'] = {\n  'date': '1980-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1980-05-05'] = {\n  'date': '1980-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1980-09-15'] = {\n  'date': '1980-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1980-09-23'] = {\n  'date': '1980-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1980-10-10'] = {\n  'date': '1980-10-10',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1980-11-03'] = {\n  'date': '1980-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1980-11-23'] = {\n  'date': '1980-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1980-11-24'] = {\n  'date': '1980-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1981-01-01'] = {\n  'date': '1981-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1981-01-15'] = {\n  'date': '1981-01-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1981-02-11'] = {\n  'date': '1981-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1981-03-21'] = {\n  'date': '1981-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1981-04-29'] = {\n  'date': '1981-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1981-05-03'] = {\n  'date': '1981-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1981-05-04'] = {\n  'date': '1981-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1981-05-05'] = {\n  'date': '1981-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1981-09-15'] = {\n  'date': '1981-09-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1981-09-23'] = {\n  'date': '1981-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1981-10-10'] = {\n  'date': '1981-10-10',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1981-11-03'] = {\n  'date': '1981-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1981-11-23'] = {\n  'date': '1981-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1982-01-01'] = {\n  'date': '1982-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1982-01-15'] = {\n  'date': '1982-01-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1982-02-11'] = {\n  'date': '1982-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1982-03-21'] = {\n  'date': '1982-03-21',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1982-03-22'] = {\n  'date': '1982-03-22',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1982-04-29'] = {\n  'date': '1982-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1982-05-03'] = {\n  'date': '1982-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1982-05-05'] = {\n  'date': '1982-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1982-09-15'] = {\n  'date': '1982-09-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1982-09-23'] = {\n  'date': '1982-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1982-10-10'] = {\n  'date': '1982-10-10',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1982-10-11'] = {\n  'date': '1982-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1982-11-03'] = {\n  'date': '1982-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1982-11-23'] = {\n  'date': '1982-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1983-01-01'] = {\n  'date': '1983-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1983-01-15'] = {\n  'date': '1983-01-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1983-02-11'] = {\n  'date': '1983-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1983-03-21'] = {\n  'date': '1983-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1983-04-29'] = {\n  'date': '1983-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1983-05-03'] = {\n  'date': '1983-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1983-05-05'] = {\n  'date': '1983-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1983-09-15'] = {\n  'date': '1983-09-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1983-09-23'] = {\n  'date': '1983-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1983-10-10'] = {\n  'date': '1983-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1983-11-03'] = {\n  'date': '1983-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1983-11-23'] = {\n  'date': '1983-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1984-01-01'] = {\n  'date': '1984-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1984-01-02'] = {\n  'date': '1984-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1984-01-15'] = {\n  'date': '1984-01-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1984-01-16'] = {\n  'date': '1984-01-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1984-02-11'] = {\n  'date': '1984-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1984-03-20'] = {\n  'date': '1984-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1984-04-29'] = {\n  'date': '1984-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1984-04-30'] = {\n  'date': '1984-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1984-05-03'] = {\n  'date': '1984-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1984-05-05'] = {\n  'date': '1984-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1984-09-15'] = {\n  'date': '1984-09-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1984-09-23'] = {\n  'date': '1984-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1984-09-24'] = {\n  'date': '1984-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1984-10-10'] = {\n  'date': '1984-10-10',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1984-11-03'] = {\n  'date': '1984-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1984-11-23'] = {\n  'date': '1984-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1985-01-01'] = {\n  'date': '1985-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1985-01-15'] = {\n  'date': '1985-01-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1985-02-11'] = {\n  'date': '1985-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1985-03-21'] = {\n  'date': '1985-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1985-04-29'] = {\n  'date': '1985-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1985-05-03'] = {\n  'date': '1985-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1985-05-05'] = {\n  'date': '1985-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1985-05-06'] = {\n  'date': '1985-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1985-09-15'] = {\n  'date': '1985-09-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1985-09-16'] = {\n  'date': '1985-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1985-09-23'] = {\n  'date': '1985-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1985-10-10'] = {\n  'date': '1985-10-10',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1985-11-03'] = {\n  'date': '1985-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1985-11-04'] = {\n  'date': '1985-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1985-11-23'] = {\n  'date': '1985-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1986-01-01'] = {\n  'date': '1986-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1986-01-15'] = {\n  'date': '1986-01-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1986-02-11'] = {\n  'date': '1986-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1986-03-21'] = {\n  'date': '1986-03-21',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1986-04-29'] = {\n  'date': '1986-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1986-05-03'] = {\n  'date': '1986-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1986-05-05'] = {\n  'date': '1986-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1986-09-15'] = {\n  'date': '1986-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1986-09-23'] = {\n  'date': '1986-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1986-10-10'] = {\n  'date': '1986-10-10',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1986-11-03'] = {\n  'date': '1986-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1986-11-23'] = {\n  'date': '1986-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1986-11-24'] = {\n  'date': '1986-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1987-01-01'] = {\n  'date': '1987-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1987-01-15'] = {\n  'date': '1987-01-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1987-02-11'] = {\n  'date': '1987-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1987-03-21'] = {\n  'date': '1987-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1987-04-29'] = {\n  'date': '1987-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1987-05-03'] = {\n  'date': '1987-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1987-05-04'] = {\n  'date': '1987-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1987-05-05'] = {\n  'date': '1987-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1987-09-15'] = {\n  'date': '1987-09-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1987-09-23'] = {\n  'date': '1987-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1987-10-10'] = {\n  'date': '1987-10-10',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1987-11-03'] = {\n  'date': '1987-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1987-11-23'] = {\n  'date': '1987-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1988-01-01'] = {\n  'date': '1988-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1988-01-15'] = {\n  'date': '1988-01-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1988-02-11'] = {\n  'date': '1988-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1988-03-20'] = {\n  'date': '1988-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1988-03-21'] = {\n  'date': '1988-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1988-04-29'] = {\n  'date': '1988-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1988-05-03'] = {\n  'date': '1988-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1988-05-04'] = {\n  'date': '1988-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1988-05-05'] = {\n  'date': '1988-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1988-09-15'] = {\n  'date': '1988-09-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1988-09-23'] = {\n  'date': '1988-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1988-10-10'] = {\n  'date': '1988-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1988-11-03'] = {\n  'date': '1988-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1988-11-23'] = {\n  'date': '1988-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1989-01-01'] = {\n  'date': '1989-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1989-01-02'] = {\n  'date': '1989-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1989-01-15'] = {\n  'date': '1989-01-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1989-01-16'] = {\n  'date': '1989-01-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1989-02-11'] = {\n  'date': '1989-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1989-02-24'] = {\n  'date': '1989-02-24',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和天皇の大喪の礼',\n  'name_en': \"The Funeral Ceremony of Emperor Showa.\"\n};\nholidays['1989-03-21'] = {\n  'date': '1989-03-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1989-04-29'] = {\n  'date': '1989-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1989-05-03'] = {\n  'date': '1989-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1989-05-04'] = {\n  'date': '1989-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1989-05-05'] = {\n  'date': '1989-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1989-09-15'] = {\n  'date': '1989-09-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1989-09-23'] = {\n  'date': '1989-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1989-10-10'] = {\n  'date': '1989-10-10',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1989-11-03'] = {\n  'date': '1989-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1989-11-23'] = {\n  'date': '1989-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1989-12-23'] = {\n  'date': '1989-12-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1990-01-01'] = {\n  'date': '1990-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1990-01-15'] = {\n  'date': '1990-01-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1990-02-11'] = {\n  'date': '1990-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1990-02-12'] = {\n  'date': '1990-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1990-03-21'] = {\n  'date': '1990-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1990-04-29'] = {\n  'date': '1990-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1990-04-30'] = {\n  'date': '1990-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1990-05-03'] = {\n  'date': '1990-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1990-05-04'] = {\n  'date': '1990-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1990-05-05'] = {\n  'date': '1990-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1990-09-15'] = {\n  'date': '1990-09-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1990-09-23'] = {\n  'date': '1990-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1990-09-24'] = {\n  'date': '1990-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1990-10-10'] = {\n  'date': '1990-10-10',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1990-11-03'] = {\n  'date': '1990-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1990-11-12'] = {\n  'date': '1990-11-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '即位礼正殿の儀',\n  'name_en': \"The Ceremony of the Enthronement of His Majesty the Emperor (at the Seiden)\"\n};\nholidays['1990-11-23'] = {\n  'date': '1990-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1990-12-23'] = {\n  'date': '1990-12-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1990-12-24'] = {\n  'date': '1990-12-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1991-01-01'] = {\n  'date': '1991-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1991-01-15'] = {\n  'date': '1991-01-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1991-02-11'] = {\n  'date': '1991-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1991-03-21'] = {\n  'date': '1991-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1991-04-29'] = {\n  'date': '1991-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1991-05-03'] = {\n  'date': '1991-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1991-05-04'] = {\n  'date': '1991-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1991-05-05'] = {\n  'date': '1991-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1991-05-06'] = {\n  'date': '1991-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1991-09-15'] = {\n  'date': '1991-09-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1991-09-16'] = {\n  'date': '1991-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1991-09-23'] = {\n  'date': '1991-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1991-10-10'] = {\n  'date': '1991-10-10',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1991-11-03'] = {\n  'date': '1991-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1991-11-04'] = {\n  'date': '1991-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1991-11-23'] = {\n  'date': '1991-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1991-12-23'] = {\n  'date': '1991-12-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1992-01-01'] = {\n  'date': '1992-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1992-01-15'] = {\n  'date': '1992-01-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1992-02-11'] = {\n  'date': '1992-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1992-03-20'] = {\n  'date': '1992-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1992-04-29'] = {\n  'date': '1992-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1992-05-03'] = {\n  'date': '1992-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1992-05-04'] = {\n  'date': '1992-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1992-05-05'] = {\n  'date': '1992-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1992-09-15'] = {\n  'date': '1992-09-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1992-09-23'] = {\n  'date': '1992-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1992-10-10'] = {\n  'date': '1992-10-10',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1992-11-03'] = {\n  'date': '1992-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1992-11-23'] = {\n  'date': '1992-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1992-12-23'] = {\n  'date': '1992-12-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1993-01-01'] = {\n  'date': '1993-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1993-01-15'] = {\n  'date': '1993-01-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1993-02-11'] = {\n  'date': '1993-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1993-03-20'] = {\n  'date': '1993-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1993-04-29'] = {\n  'date': '1993-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1993-05-03'] = {\n  'date': '1993-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1993-05-04'] = {\n  'date': '1993-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1993-05-05'] = {\n  'date': '1993-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1993-06-09'] = {\n  'date': '1993-06-09',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '皇太子徳仁親王の結婚の儀',\n  'name_en': \"The Rite of Wedding of HIH Crown Prince Naruhito\"\n};\nholidays['1993-09-15'] = {\n  'date': '1993-09-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1993-09-23'] = {\n  'date': '1993-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1993-10-10'] = {\n  'date': '1993-10-10',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1993-10-11'] = {\n  'date': '1993-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1993-11-03'] = {\n  'date': '1993-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1993-11-23'] = {\n  'date': '1993-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1993-12-23'] = {\n  'date': '1993-12-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1994-01-01'] = {\n  'date': '1994-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1994-01-15'] = {\n  'date': '1994-01-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1994-02-11'] = {\n  'date': '1994-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1994-03-21'] = {\n  'date': '1994-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1994-04-29'] = {\n  'date': '1994-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1994-05-03'] = {\n  'date': '1994-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1994-05-04'] = {\n  'date': '1994-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1994-05-05'] = {\n  'date': '1994-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1994-09-15'] = {\n  'date': '1994-09-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1994-09-23'] = {\n  'date': '1994-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1994-10-10'] = {\n  'date': '1994-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1994-11-03'] = {\n  'date': '1994-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1994-11-23'] = {\n  'date': '1994-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1994-12-23'] = {\n  'date': '1994-12-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1995-01-01'] = {\n  'date': '1995-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1995-01-02'] = {\n  'date': '1995-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1995-01-15'] = {\n  'date': '1995-01-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1995-01-16'] = {\n  'date': '1995-01-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1995-02-11'] = {\n  'date': '1995-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1995-03-21'] = {\n  'date': '1995-03-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1995-04-29'] = {\n  'date': '1995-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1995-05-03'] = {\n  'date': '1995-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1995-05-04'] = {\n  'date': '1995-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1995-05-05'] = {\n  'date': '1995-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1995-09-15'] = {\n  'date': '1995-09-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1995-09-23'] = {\n  'date': '1995-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1995-10-10'] = {\n  'date': '1995-10-10',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1995-11-03'] = {\n  'date': '1995-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1995-11-23'] = {\n  'date': '1995-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1995-12-23'] = {\n  'date': '1995-12-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1996-01-01'] = {\n  'date': '1996-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1996-01-15'] = {\n  'date': '1996-01-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1996-02-11'] = {\n  'date': '1996-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1996-02-12'] = {\n  'date': '1996-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1996-03-20'] = {\n  'date': '1996-03-20',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1996-04-29'] = {\n  'date': '1996-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1996-05-03'] = {\n  'date': '1996-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1996-05-04'] = {\n  'date': '1996-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1996-05-05'] = {\n  'date': '1996-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1996-05-06'] = {\n  'date': '1996-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1996-07-20'] = {\n  'date': '1996-07-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['1996-09-15'] = {\n  'date': '1996-09-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1996-09-16'] = {\n  'date': '1996-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1996-09-23'] = {\n  'date': '1996-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1996-10-10'] = {\n  'date': '1996-10-10',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1996-11-03'] = {\n  'date': '1996-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1996-11-04'] = {\n  'date': '1996-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1996-11-23'] = {\n  'date': '1996-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1996-12-23'] = {\n  'date': '1996-12-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1997-01-01'] = {\n  'date': '1997-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1997-01-15'] = {\n  'date': '1997-01-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1997-02-11'] = {\n  'date': '1997-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1997-03-20'] = {\n  'date': '1997-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1997-04-29'] = {\n  'date': '1997-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1997-05-03'] = {\n  'date': '1997-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1997-05-05'] = {\n  'date': '1997-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1997-07-20'] = {\n  'date': '1997-07-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['1997-07-21'] = {\n  'date': '1997-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1997-09-15'] = {\n  'date': '1997-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1997-09-23'] = {\n  'date': '1997-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1997-10-10'] = {\n  'date': '1997-10-10',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1997-11-03'] = {\n  'date': '1997-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1997-11-23'] = {\n  'date': '1997-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1997-11-24'] = {\n  'date': '1997-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1997-12-23'] = {\n  'date': '1997-12-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1998-01-01'] = {\n  'date': '1998-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1998-01-15'] = {\n  'date': '1998-01-15',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1998-02-11'] = {\n  'date': '1998-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1998-03-21'] = {\n  'date': '1998-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1998-04-29'] = {\n  'date': '1998-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1998-05-03'] = {\n  'date': '1998-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1998-05-04'] = {\n  'date': '1998-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1998-05-05'] = {\n  'date': '1998-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1998-07-20'] = {\n  'date': '1998-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['1998-09-15'] = {\n  'date': '1998-09-15',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1998-09-23'] = {\n  'date': '1998-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1998-10-10'] = {\n  'date': '1998-10-10',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1998-11-03'] = {\n  'date': '1998-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1998-11-23'] = {\n  'date': '1998-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1998-12-23'] = {\n  'date': '1998-12-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['1999-01-01'] = {\n  'date': '1999-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['1999-01-15'] = {\n  'date': '1999-01-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['1999-02-11'] = {\n  'date': '1999-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['1999-03-21'] = {\n  'date': '1999-03-21',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['1999-03-22'] = {\n  'date': '1999-03-22',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1999-04-29'] = {\n  'date': '1999-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['1999-05-03'] = {\n  'date': '1999-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['1999-05-04'] = {\n  'date': '1999-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['1999-05-05'] = {\n  'date': '1999-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['1999-07-20'] = {\n  'date': '1999-07-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['1999-09-15'] = {\n  'date': '1999-09-15',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['1999-09-23'] = {\n  'date': '1999-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['1999-10-10'] = {\n  'date': '1999-10-10',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['1999-10-11'] = {\n  'date': '1999-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['1999-11-03'] = {\n  'date': '1999-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['1999-11-23'] = {\n  'date': '1999-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['1999-12-23'] = {\n  'date': '1999-12-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2000-01-01'] = {\n  'date': '2000-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2000-01-10'] = {\n  'date': '2000-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2000-02-11'] = {\n  'date': '2000-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2000-03-20'] = {\n  'date': '2000-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2000-04-29'] = {\n  'date': '2000-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2000-05-03'] = {\n  'date': '2000-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2000-05-04'] = {\n  'date': '2000-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2000-05-05'] = {\n  'date': '2000-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2000-07-20'] = {\n  'date': '2000-07-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2000-09-15'] = {\n  'date': '2000-09-15',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2000-09-23'] = {\n  'date': '2000-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2000-10-09'] = {\n  'date': '2000-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2000-11-03'] = {\n  'date': '2000-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2000-11-23'] = {\n  'date': '2000-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2000-12-23'] = {\n  'date': '2000-12-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2001-01-01'] = {\n  'date': '2001-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2001-01-08'] = {\n  'date': '2001-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2001-02-11'] = {\n  'date': '2001-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2001-02-12'] = {\n  'date': '2001-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2001-03-20'] = {\n  'date': '2001-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2001-04-29'] = {\n  'date': '2001-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2001-04-30'] = {\n  'date': '2001-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2001-05-03'] = {\n  'date': '2001-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2001-05-04'] = {\n  'date': '2001-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2001-05-05'] = {\n  'date': '2001-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2001-07-20'] = {\n  'date': '2001-07-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2001-09-15'] = {\n  'date': '2001-09-15',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2001-09-23'] = {\n  'date': '2001-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2001-09-24'] = {\n  'date': '2001-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2001-10-08'] = {\n  'date': '2001-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2001-11-03'] = {\n  'date': '2001-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2001-11-23'] = {\n  'date': '2001-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2001-12-23'] = {\n  'date': '2001-12-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2001-12-24'] = {\n  'date': '2001-12-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2002-01-01'] = {\n  'date': '2002-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2002-01-14'] = {\n  'date': '2002-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2002-02-11'] = {\n  'date': '2002-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2002-03-21'] = {\n  'date': '2002-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2002-04-29'] = {\n  'date': '2002-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2002-05-03'] = {\n  'date': '2002-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2002-05-04'] = {\n  'date': '2002-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2002-05-05'] = {\n  'date': '2002-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2002-05-06'] = {\n  'date': '2002-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2002-07-20'] = {\n  'date': '2002-07-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2002-09-15'] = {\n  'date': '2002-09-15',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2002-09-16'] = {\n  'date': '2002-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2002-09-23'] = {\n  'date': '2002-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2002-10-14'] = {\n  'date': '2002-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2002-11-03'] = {\n  'date': '2002-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2002-11-04'] = {\n  'date': '2002-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2002-11-23'] = {\n  'date': '2002-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2002-12-23'] = {\n  'date': '2002-12-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2003-01-01'] = {\n  'date': '2003-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2003-01-13'] = {\n  'date': '2003-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2003-02-11'] = {\n  'date': '2003-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2003-03-21'] = {\n  'date': '2003-03-21',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2003-04-29'] = {\n  'date': '2003-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2003-05-03'] = {\n  'date': '2003-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2003-05-05'] = {\n  'date': '2003-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2003-07-21'] = {\n  'date': '2003-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2003-09-15'] = {\n  'date': '2003-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2003-09-23'] = {\n  'date': '2003-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2003-10-13'] = {\n  'date': '2003-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2003-11-03'] = {\n  'date': '2003-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2003-11-23'] = {\n  'date': '2003-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2003-11-24'] = {\n  'date': '2003-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2003-12-23'] = {\n  'date': '2003-12-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2004-01-01'] = {\n  'date': '2004-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2004-01-12'] = {\n  'date': '2004-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2004-02-11'] = {\n  'date': '2004-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2004-03-20'] = {\n  'date': '2004-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2004-04-29'] = {\n  'date': '2004-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2004-05-03'] = {\n  'date': '2004-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2004-05-04'] = {\n  'date': '2004-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2004-05-05'] = {\n  'date': '2004-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2004-07-19'] = {\n  'date': '2004-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2004-09-20'] = {\n  'date': '2004-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2004-09-23'] = {\n  'date': '2004-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2004-10-11'] = {\n  'date': '2004-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2004-11-03'] = {\n  'date': '2004-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2004-11-23'] = {\n  'date': '2004-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2004-12-23'] = {\n  'date': '2004-12-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2005-01-01'] = {\n  'date': '2005-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2005-01-10'] = {\n  'date': '2005-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2005-02-11'] = {\n  'date': '2005-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2005-03-20'] = {\n  'date': '2005-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2005-03-21'] = {\n  'date': '2005-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2005-04-29'] = {\n  'date': '2005-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2005-05-03'] = {\n  'date': '2005-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2005-05-04'] = {\n  'date': '2005-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2005-05-05'] = {\n  'date': '2005-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2005-07-18'] = {\n  'date': '2005-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2005-09-19'] = {\n  'date': '2005-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2005-09-23'] = {\n  'date': '2005-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2005-10-10'] = {\n  'date': '2005-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2005-11-03'] = {\n  'date': '2005-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2005-11-23'] = {\n  'date': '2005-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2005-12-23'] = {\n  'date': '2005-12-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2006-01-01'] = {\n  'date': '2006-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2006-01-02'] = {\n  'date': '2006-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2006-01-09'] = {\n  'date': '2006-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2006-02-11'] = {\n  'date': '2006-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2006-03-21'] = {\n  'date': '2006-03-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2006-04-29'] = {\n  'date': '2006-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2006-05-03'] = {\n  'date': '2006-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2006-05-04'] = {\n  'date': '2006-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2006-05-05'] = {\n  'date': '2006-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2006-07-17'] = {\n  'date': '2006-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2006-09-18'] = {\n  'date': '2006-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2006-09-23'] = {\n  'date': '2006-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2006-10-09'] = {\n  'date': '2006-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2006-11-03'] = {\n  'date': '2006-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2006-11-23'] = {\n  'date': '2006-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2006-12-23'] = {\n  'date': '2006-12-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2007-01-01'] = {\n  'date': '2007-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2007-01-08'] = {\n  'date': '2007-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2007-02-11'] = {\n  'date': '2007-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2007-02-12'] = {\n  'date': '2007-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2007-03-21'] = {\n  'date': '2007-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2007-04-29'] = {\n  'date': '2007-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2007-04-30'] = {\n  'date': '2007-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2007-05-03'] = {\n  'date': '2007-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2007-05-04'] = {\n  'date': '2007-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2007-05-05'] = {\n  'date': '2007-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2007-07-16'] = {\n  'date': '2007-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2007-09-17'] = {\n  'date': '2007-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2007-09-23'] = {\n  'date': '2007-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2007-09-24'] = {\n  'date': '2007-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2007-10-08'] = {\n  'date': '2007-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2007-11-03'] = {\n  'date': '2007-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2007-11-23'] = {\n  'date': '2007-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2007-12-23'] = {\n  'date': '2007-12-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2007-12-24'] = {\n  'date': '2007-12-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2008-01-01'] = {\n  'date': '2008-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2008-01-14'] = {\n  'date': '2008-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2008-02-11'] = {\n  'date': '2008-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2008-03-20'] = {\n  'date': '2008-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2008-04-29'] = {\n  'date': '2008-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2008-05-03'] = {\n  'date': '2008-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2008-05-04'] = {\n  'date': '2008-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2008-05-05'] = {\n  'date': '2008-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2008-05-06'] = {\n  'date': '2008-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2008-07-21'] = {\n  'date': '2008-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2008-09-15'] = {\n  'date': '2008-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2008-09-23'] = {\n  'date': '2008-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2008-10-13'] = {\n  'date': '2008-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2008-11-03'] = {\n  'date': '2008-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2008-11-23'] = {\n  'date': '2008-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2008-11-24'] = {\n  'date': '2008-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2008-12-23'] = {\n  'date': '2008-12-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2009-01-01'] = {\n  'date': '2009-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2009-01-12'] = {\n  'date': '2009-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2009-02-11'] = {\n  'date': '2009-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2009-03-20'] = {\n  'date': '2009-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2009-04-29'] = {\n  'date': '2009-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2009-05-03'] = {\n  'date': '2009-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2009-05-04'] = {\n  'date': '2009-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2009-05-05'] = {\n  'date': '2009-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2009-05-06'] = {\n  'date': '2009-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2009-07-20'] = {\n  'date': '2009-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2009-09-21'] = {\n  'date': '2009-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2009-09-22'] = {\n  'date': '2009-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2009-09-23'] = {\n  'date': '2009-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2009-10-12'] = {\n  'date': '2009-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2009-11-03'] = {\n  'date': '2009-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2009-11-23'] = {\n  'date': '2009-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2009-12-23'] = {\n  'date': '2009-12-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2010-01-01'] = {\n  'date': '2010-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2010-01-11'] = {\n  'date': '2010-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2010-02-11'] = {\n  'date': '2010-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2010-03-21'] = {\n  'date': '2010-03-21',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2010-03-22'] = {\n  'date': '2010-03-22',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2010-04-29'] = {\n  'date': '2010-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2010-05-03'] = {\n  'date': '2010-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2010-05-04'] = {\n  'date': '2010-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2010-05-05'] = {\n  'date': '2010-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2010-07-19'] = {\n  'date': '2010-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2010-09-20'] = {\n  'date': '2010-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2010-09-23'] = {\n  'date': '2010-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2010-10-11'] = {\n  'date': '2010-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2010-11-03'] = {\n  'date': '2010-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2010-11-23'] = {\n  'date': '2010-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2010-12-23'] = {\n  'date': '2010-12-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2011-01-01'] = {\n  'date': '2011-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2011-01-10'] = {\n  'date': '2011-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2011-02-11'] = {\n  'date': '2011-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2011-03-21'] = {\n  'date': '2011-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2011-04-29'] = {\n  'date': '2011-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2011-05-03'] = {\n  'date': '2011-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2011-05-04'] = {\n  'date': '2011-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2011-05-05'] = {\n  'date': '2011-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2011-07-18'] = {\n  'date': '2011-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2011-09-19'] = {\n  'date': '2011-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2011-09-23'] = {\n  'date': '2011-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2011-10-10'] = {\n  'date': '2011-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2011-11-03'] = {\n  'date': '2011-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2011-11-23'] = {\n  'date': '2011-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2011-12-23'] = {\n  'date': '2011-12-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2012-01-01'] = {\n  'date': '2012-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2012-01-02'] = {\n  'date': '2012-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2012-01-09'] = {\n  'date': '2012-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2012-02-11'] = {\n  'date': '2012-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2012-03-20'] = {\n  'date': '2012-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2012-04-29'] = {\n  'date': '2012-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2012-04-30'] = {\n  'date': '2012-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2012-05-03'] = {\n  'date': '2012-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2012-05-04'] = {\n  'date': '2012-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2012-05-05'] = {\n  'date': '2012-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2012-07-16'] = {\n  'date': '2012-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2012-09-17'] = {\n  'date': '2012-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2012-09-22'] = {\n  'date': '2012-09-22',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2012-10-08'] = {\n  'date': '2012-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2012-11-03'] = {\n  'date': '2012-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2012-11-23'] = {\n  'date': '2012-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2012-12-23'] = {\n  'date': '2012-12-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2012-12-24'] = {\n  'date': '2012-12-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2013-01-01'] = {\n  'date': '2013-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2013-01-14'] = {\n  'date': '2013-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2013-02-11'] = {\n  'date': '2013-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2013-03-20'] = {\n  'date': '2013-03-20',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2013-04-29'] = {\n  'date': '2013-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2013-05-03'] = {\n  'date': '2013-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2013-05-04'] = {\n  'date': '2013-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2013-05-05'] = {\n  'date': '2013-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2013-05-06'] = {\n  'date': '2013-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2013-07-15'] = {\n  'date': '2013-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2013-09-16'] = {\n  'date': '2013-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2013-09-23'] = {\n  'date': '2013-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2013-10-14'] = {\n  'date': '2013-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2013-11-03'] = {\n  'date': '2013-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2013-11-04'] = {\n  'date': '2013-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2013-11-23'] = {\n  'date': '2013-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2013-12-23'] = {\n  'date': '2013-12-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2014-01-01'] = {\n  'date': '2014-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2014-01-13'] = {\n  'date': '2014-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2014-02-11'] = {\n  'date': '2014-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2014-03-21'] = {\n  'date': '2014-03-21',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2014-04-29'] = {\n  'date': '2014-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2014-05-03'] = {\n  'date': '2014-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2014-05-04'] = {\n  'date': '2014-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2014-05-05'] = {\n  'date': '2014-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2014-05-06'] = {\n  'date': '2014-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2014-07-21'] = {\n  'date': '2014-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2014-09-15'] = {\n  'date': '2014-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2014-09-23'] = {\n  'date': '2014-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2014-10-13'] = {\n  'date': '2014-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2014-11-03'] = {\n  'date': '2014-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2014-11-23'] = {\n  'date': '2014-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2014-11-24'] = {\n  'date': '2014-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2014-12-23'] = {\n  'date': '2014-12-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2015-01-01'] = {\n  'date': '2015-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2015-01-12'] = {\n  'date': '2015-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2015-02-11'] = {\n  'date': '2015-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2015-03-21'] = {\n  'date': '2015-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2015-04-29'] = {\n  'date': '2015-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2015-05-03'] = {\n  'date': '2015-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2015-05-04'] = {\n  'date': '2015-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2015-05-05'] = {\n  'date': '2015-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2015-05-06'] = {\n  'date': '2015-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2015-07-20'] = {\n  'date': '2015-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2015-09-21'] = {\n  'date': '2015-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2015-09-22'] = {\n  'date': '2015-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2015-09-23'] = {\n  'date': '2015-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2015-10-12'] = {\n  'date': '2015-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2015-11-03'] = {\n  'date': '2015-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2015-11-23'] = {\n  'date': '2015-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2015-12-23'] = {\n  'date': '2015-12-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2016-01-01'] = {\n  'date': '2016-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2016-01-11'] = {\n  'date': '2016-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2016-02-11'] = {\n  'date': '2016-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2016-03-20'] = {\n  'date': '2016-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2016-03-21'] = {\n  'date': '2016-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2016-04-29'] = {\n  'date': '2016-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2016-05-03'] = {\n  'date': '2016-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2016-05-04'] = {\n  'date': '2016-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2016-05-05'] = {\n  'date': '2016-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2016-07-18'] = {\n  'date': '2016-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2016-08-11'] = {\n  'date': '2016-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2016-09-19'] = {\n  'date': '2016-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2016-09-22'] = {\n  'date': '2016-09-22',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2016-10-10'] = {\n  'date': '2016-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2016-11-03'] = {\n  'date': '2016-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2016-11-23'] = {\n  'date': '2016-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2016-12-23'] = {\n  'date': '2016-12-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2017-01-01'] = {\n  'date': '2017-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2017-01-02'] = {\n  'date': '2017-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2017-01-09'] = {\n  'date': '2017-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2017-02-11'] = {\n  'date': '2017-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2017-03-20'] = {\n  'date': '2017-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2017-04-29'] = {\n  'date': '2017-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2017-05-03'] = {\n  'date': '2017-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2017-05-04'] = {\n  'date': '2017-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2017-05-05'] = {\n  'date': '2017-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2017-07-17'] = {\n  'date': '2017-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2017-08-11'] = {\n  'date': '2017-08-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2017-09-18'] = {\n  'date': '2017-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2017-09-23'] = {\n  'date': '2017-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2017-10-09'] = {\n  'date': '2017-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2017-11-03'] = {\n  'date': '2017-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2017-11-23'] = {\n  'date': '2017-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2017-12-23'] = {\n  'date': '2017-12-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2018-01-01'] = {\n  'date': '2018-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2018-01-08'] = {\n  'date': '2018-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2018-02-11'] = {\n  'date': '2018-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2018-02-12'] = {\n  'date': '2018-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2018-03-21'] = {\n  'date': '2018-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2018-04-29'] = {\n  'date': '2018-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2018-04-30'] = {\n  'date': '2018-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2018-05-03'] = {\n  'date': '2018-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2018-05-04'] = {\n  'date': '2018-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2018-05-05'] = {\n  'date': '2018-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2018-07-16'] = {\n  'date': '2018-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2018-08-11'] = {\n  'date': '2018-08-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2018-09-17'] = {\n  'date': '2018-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2018-09-23'] = {\n  'date': '2018-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2018-09-24'] = {\n  'date': '2018-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2018-10-08'] = {\n  'date': '2018-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2018-11-03'] = {\n  'date': '2018-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2018-11-23'] = {\n  'date': '2018-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2018-12-23'] = {\n  'date': '2018-12-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2018-12-24'] = {\n  'date': '2018-12-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2019-01-01'] = {\n  'date': '2019-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2019-01-14'] = {\n  'date': '2019-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2019-02-11'] = {\n  'date': '2019-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2019-03-21'] = {\n  'date': '2019-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2019-04-29'] = {\n  'date': '2019-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2019-04-30'] = {\n  'date': '2019-04-30',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '休日',\n  'name_en': \"Holiday\"\n};\nholidays['2019-05-01'] = {\n  'date': '2019-05-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '休日（祝日扱い）',\n  'name_en': \"Holiday\"\n};\nholidays['2019-05-02'] = {\n  'date': '2019-05-02',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '休日',\n  'name_en': \"Holiday\"\n};\nholidays['2019-05-03'] = {\n  'date': '2019-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2019-05-04'] = {\n  'date': '2019-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2019-05-05'] = {\n  'date': '2019-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2019-05-06'] = {\n  'date': '2019-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2019-07-15'] = {\n  'date': '2019-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2019-08-11'] = {\n  'date': '2019-08-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2019-08-12'] = {\n  'date': '2019-08-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2019-09-16'] = {\n  'date': '2019-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2019-09-23'] = {\n  'date': '2019-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2019-10-14'] = {\n  'date': '2019-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '体育の日（スポーツの日）',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2019-10-22'] = {\n  'date': '2019-10-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '休日（祝日扱い）',\n  'name_en': \"Holiday\"\n};\nholidays['2019-11-03'] = {\n  'date': '2019-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2019-11-04'] = {\n  'date': '2019-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2019-11-23'] = {\n  'date': '2019-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2020-01-01'] = {\n  'date': '2020-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2020-01-13'] = {\n  'date': '2020-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2020-02-11'] = {\n  'date': '2020-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2020-02-23'] = {\n  'date': '2020-02-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2020-02-24'] = {\n  'date': '2020-02-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2020-03-20'] = {\n  'date': '2020-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2020-04-29'] = {\n  'date': '2020-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2020-05-03'] = {\n  'date': '2020-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2020-05-04'] = {\n  'date': '2020-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2020-05-05'] = {\n  'date': '2020-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2020-05-06'] = {\n  'date': '2020-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2020-07-23'] = {\n  'date': '2020-07-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2020-07-24'] = {\n  'date': '2020-07-24',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2020-08-10'] = {\n  'date': '2020-08-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2020-09-21'] = {\n  'date': '2020-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2020-09-22'] = {\n  'date': '2020-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2020-11-03'] = {\n  'date': '2020-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2020-11-23'] = {\n  'date': '2020-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2021-01-01'] = {\n  'date': '2021-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2021-01-11'] = {\n  'date': '2021-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2021-02-11'] = {\n  'date': '2021-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2021-02-23'] = {\n  'date': '2021-02-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2021-03-20'] = {\n  'date': '2021-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2021-04-29'] = {\n  'date': '2021-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2021-05-03'] = {\n  'date': '2021-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2021-05-04'] = {\n  'date': '2021-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2021-05-05'] = {\n  'date': '2021-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2021-07-19'] = {\n  'date': '2021-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2021-08-11'] = {\n  'date': '2021-08-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2021-09-20'] = {\n  'date': '2021-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2021-09-23'] = {\n  'date': '2021-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2021-10-11'] = {\n  'date': '2021-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2021-11-03'] = {\n  'date': '2021-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2021-11-23'] = {\n  'date': '2021-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2022-01-01'] = {\n  'date': '2022-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2022-01-10'] = {\n  'date': '2022-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2022-02-11'] = {\n  'date': '2022-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2022-02-23'] = {\n  'date': '2022-02-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2022-03-21'] = {\n  'date': '2022-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2022-04-29'] = {\n  'date': '2022-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2022-05-03'] = {\n  'date': '2022-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2022-05-04'] = {\n  'date': '2022-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2022-05-05'] = {\n  'date': '2022-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2022-07-18'] = {\n  'date': '2022-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2022-08-11'] = {\n  'date': '2022-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2022-09-19'] = {\n  'date': '2022-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2022-09-23'] = {\n  'date': '2022-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2022-10-10'] = {\n  'date': '2022-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2022-11-03'] = {\n  'date': '2022-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2022-11-23'] = {\n  'date': '2022-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2023-01-01'] = {\n  'date': '2023-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2023-01-02'] = {\n  'date': '2023-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2023-01-09'] = {\n  'date': '2023-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2023-02-11'] = {\n  'date': '2023-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2023-02-23'] = {\n  'date': '2023-02-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2023-03-21'] = {\n  'date': '2023-03-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2023-04-29'] = {\n  'date': '2023-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2023-05-03'] = {\n  'date': '2023-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2023-05-04'] = {\n  'date': '2023-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2023-05-05'] = {\n  'date': '2023-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2023-07-17'] = {\n  'date': '2023-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2023-08-11'] = {\n  'date': '2023-08-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2023-09-18'] = {\n  'date': '2023-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2023-09-23'] = {\n  'date': '2023-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2023-10-09'] = {\n  'date': '2023-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2023-11-03'] = {\n  'date': '2023-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2023-11-23'] = {\n  'date': '2023-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2024-01-01'] = {\n  'date': '2024-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2024-01-08'] = {\n  'date': '2024-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2024-02-11'] = {\n  'date': '2024-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2024-02-12'] = {\n  'date': '2024-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2024-02-23'] = {\n  'date': '2024-02-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2024-03-20'] = {\n  'date': '2024-03-20',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2024-04-29'] = {\n  'date': '2024-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2024-05-03'] = {\n  'date': '2024-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2024-05-04'] = {\n  'date': '2024-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2024-05-05'] = {\n  'date': '2024-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2024-05-06'] = {\n  'date': '2024-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2024-07-15'] = {\n  'date': '2024-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2024-08-11'] = {\n  'date': '2024-08-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2024-08-12'] = {\n  'date': '2024-08-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2024-09-16'] = {\n  'date': '2024-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2024-09-22'] = {\n  'date': '2024-09-22',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2024-09-23'] = {\n  'date': '2024-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2024-10-14'] = {\n  'date': '2024-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2024-11-03'] = {\n  'date': '2024-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2024-11-04'] = {\n  'date': '2024-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2024-11-23'] = {\n  'date': '2024-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2025-01-01'] = {\n  'date': '2025-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2025-01-13'] = {\n  'date': '2025-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2025-02-11'] = {\n  'date': '2025-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2025-02-23'] = {\n  'date': '2025-02-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2025-02-24'] = {\n  'date': '2025-02-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2025-03-20'] = {\n  'date': '2025-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2025-04-29'] = {\n  'date': '2025-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2025-05-03'] = {\n  'date': '2025-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2025-05-04'] = {\n  'date': '2025-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2025-05-05'] = {\n  'date': '2025-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2025-05-06'] = {\n  'date': '2025-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2025-07-21'] = {\n  'date': '2025-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2025-08-11'] = {\n  'date': '2025-08-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2025-09-15'] = {\n  'date': '2025-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2025-09-23'] = {\n  'date': '2025-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2025-10-13'] = {\n  'date': '2025-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2025-11-03'] = {\n  'date': '2025-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2025-11-23'] = {\n  'date': '2025-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2025-11-24'] = {\n  'date': '2025-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2026-01-01'] = {\n  'date': '2026-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2026-01-12'] = {\n  'date': '2026-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2026-02-11'] = {\n  'date': '2026-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2026-02-23'] = {\n  'date': '2026-02-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2026-03-20'] = {\n  'date': '2026-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2026-04-29'] = {\n  'date': '2026-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2026-05-03'] = {\n  'date': '2026-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2026-05-04'] = {\n  'date': '2026-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2026-05-05'] = {\n  'date': '2026-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2026-05-06'] = {\n  'date': '2026-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2026-07-20'] = {\n  'date': '2026-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2026-08-11'] = {\n  'date': '2026-08-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2026-09-21'] = {\n  'date': '2026-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2026-09-22'] = {\n  'date': '2026-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2026-09-23'] = {\n  'date': '2026-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2026-10-12'] = {\n  'date': '2026-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2026-11-03'] = {\n  'date': '2026-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2026-11-23'] = {\n  'date': '2026-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2027-01-01'] = {\n  'date': '2027-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2027-01-11'] = {\n  'date': '2027-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2027-02-11'] = {\n  'date': '2027-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2027-02-23'] = {\n  'date': '2027-02-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2027-03-21'] = {\n  'date': '2027-03-21',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2027-03-22'] = {\n  'date': '2027-03-22',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2027-04-29'] = {\n  'date': '2027-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2027-05-03'] = {\n  'date': '2027-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2027-05-04'] = {\n  'date': '2027-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2027-05-05'] = {\n  'date': '2027-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2027-07-19'] = {\n  'date': '2027-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2027-08-11'] = {\n  'date': '2027-08-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2027-09-20'] = {\n  'date': '2027-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2027-09-23'] = {\n  'date': '2027-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2027-10-11'] = {\n  'date': '2027-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2027-11-03'] = {\n  'date': '2027-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2027-11-23'] = {\n  'date': '2027-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2028-01-01'] = {\n  'date': '2028-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2028-01-10'] = {\n  'date': '2028-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2028-02-11'] = {\n  'date': '2028-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2028-02-23'] = {\n  'date': '2028-02-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2028-03-20'] = {\n  'date': '2028-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2028-04-29'] = {\n  'date': '2028-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2028-05-03'] = {\n  'date': '2028-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2028-05-04'] = {\n  'date': '2028-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2028-05-05'] = {\n  'date': '2028-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2028-07-17'] = {\n  'date': '2028-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2028-08-11'] = {\n  'date': '2028-08-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2028-09-18'] = {\n  'date': '2028-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2028-09-22'] = {\n  'date': '2028-09-22',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2028-10-09'] = {\n  'date': '2028-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2028-11-03'] = {\n  'date': '2028-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2028-11-23'] = {\n  'date': '2028-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2029-01-01'] = {\n  'date': '2029-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2029-01-08'] = {\n  'date': '2029-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2029-02-11'] = {\n  'date': '2029-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2029-02-12'] = {\n  'date': '2029-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2029-02-23'] = {\n  'date': '2029-02-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2029-03-20'] = {\n  'date': '2029-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2029-04-29'] = {\n  'date': '2029-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2029-04-30'] = {\n  'date': '2029-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2029-05-03'] = {\n  'date': '2029-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2029-05-04'] = {\n  'date': '2029-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2029-05-05'] = {\n  'date': '2029-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2029-07-16'] = {\n  'date': '2029-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2029-08-11'] = {\n  'date': '2029-08-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2029-09-17'] = {\n  'date': '2029-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2029-09-23'] = {\n  'date': '2029-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2029-09-24'] = {\n  'date': '2029-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2029-10-08'] = {\n  'date': '2029-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2029-11-03'] = {\n  'date': '2029-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2029-11-23'] = {\n  'date': '2029-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2030-01-01'] = {\n  'date': '2030-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2030-01-14'] = {\n  'date': '2030-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2030-02-11'] = {\n  'date': '2030-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2030-02-23'] = {\n  'date': '2030-02-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2030-03-20'] = {\n  'date': '2030-03-20',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2030-04-29'] = {\n  'date': '2030-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2030-05-03'] = {\n  'date': '2030-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2030-05-04'] = {\n  'date': '2030-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2030-05-05'] = {\n  'date': '2030-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2030-05-06'] = {\n  'date': '2030-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2030-07-15'] = {\n  'date': '2030-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2030-08-11'] = {\n  'date': '2030-08-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2030-08-12'] = {\n  'date': '2030-08-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2030-09-16'] = {\n  'date': '2030-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2030-09-23'] = {\n  'date': '2030-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2030-10-14'] = {\n  'date': '2030-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2030-11-03'] = {\n  'date': '2030-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2030-11-04'] = {\n  'date': '2030-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2030-11-23'] = {\n  'date': '2030-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2031-01-01'] = {\n  'date': '2031-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2031-01-13'] = {\n  'date': '2031-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2031-02-11'] = {\n  'date': '2031-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2031-02-23'] = {\n  'date': '2031-02-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2031-02-24'] = {\n  'date': '2031-02-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2031-03-21'] = {\n  'date': '2031-03-21',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2031-04-29'] = {\n  'date': '2031-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2031-05-03'] = {\n  'date': '2031-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2031-05-04'] = {\n  'date': '2031-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2031-05-05'] = {\n  'date': '2031-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2031-05-06'] = {\n  'date': '2031-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2031-07-21'] = {\n  'date': '2031-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2031-08-11'] = {\n  'date': '2031-08-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2031-09-15'] = {\n  'date': '2031-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2031-09-23'] = {\n  'date': '2031-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2031-10-13'] = {\n  'date': '2031-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2031-11-03'] = {\n  'date': '2031-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2031-11-23'] = {\n  'date': '2031-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2031-11-24'] = {\n  'date': '2031-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2032-01-01'] = {\n  'date': '2032-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2032-01-12'] = {\n  'date': '2032-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2032-02-11'] = {\n  'date': '2032-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2032-02-23'] = {\n  'date': '2032-02-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2032-03-20'] = {\n  'date': '2032-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2032-04-29'] = {\n  'date': '2032-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2032-05-03'] = {\n  'date': '2032-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2032-05-04'] = {\n  'date': '2032-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2032-05-05'] = {\n  'date': '2032-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2032-07-19'] = {\n  'date': '2032-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2032-08-11'] = {\n  'date': '2032-08-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2032-09-20'] = {\n  'date': '2032-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2032-09-21'] = {\n  'date': '2032-09-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2032-09-22'] = {\n  'date': '2032-09-22',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2032-10-11'] = {\n  'date': '2032-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2032-11-03'] = {\n  'date': '2032-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2032-11-23'] = {\n  'date': '2032-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2033-01-01'] = {\n  'date': '2033-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2033-01-10'] = {\n  'date': '2033-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2033-02-11'] = {\n  'date': '2033-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2033-02-23'] = {\n  'date': '2033-02-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2033-03-20'] = {\n  'date': '2033-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2033-03-21'] = {\n  'date': '2033-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2033-04-29'] = {\n  'date': '2033-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2033-05-03'] = {\n  'date': '2033-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2033-05-04'] = {\n  'date': '2033-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2033-05-05'] = {\n  'date': '2033-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2033-07-18'] = {\n  'date': '2033-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2033-08-11'] = {\n  'date': '2033-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2033-09-19'] = {\n  'date': '2033-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2033-09-23'] = {\n  'date': '2033-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2033-10-10'] = {\n  'date': '2033-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2033-11-03'] = {\n  'date': '2033-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2033-11-23'] = {\n  'date': '2033-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2034-01-01'] = {\n  'date': '2034-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2034-01-02'] = {\n  'date': '2034-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2034-01-09'] = {\n  'date': '2034-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2034-02-11'] = {\n  'date': '2034-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2034-02-23'] = {\n  'date': '2034-02-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2034-03-20'] = {\n  'date': '2034-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2034-04-29'] = {\n  'date': '2034-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2034-05-03'] = {\n  'date': '2034-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2034-05-04'] = {\n  'date': '2034-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2034-05-05'] = {\n  'date': '2034-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2034-07-17'] = {\n  'date': '2034-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2034-08-11'] = {\n  'date': '2034-08-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2034-09-18'] = {\n  'date': '2034-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2034-09-23'] = {\n  'date': '2034-09-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2034-10-09'] = {\n  'date': '2034-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2034-11-03'] = {\n  'date': '2034-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2034-11-23'] = {\n  'date': '2034-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2035-01-01'] = {\n  'date': '2035-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2035-01-08'] = {\n  'date': '2035-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2035-02-11'] = {\n  'date': '2035-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2035-02-12'] = {\n  'date': '2035-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2035-02-23'] = {\n  'date': '2035-02-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2035-03-21'] = {\n  'date': '2035-03-21',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2035-04-29'] = {\n  'date': '2035-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2035-04-30'] = {\n  'date': '2035-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2035-05-03'] = {\n  'date': '2035-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2035-05-04'] = {\n  'date': '2035-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2035-05-05'] = {\n  'date': '2035-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2035-07-16'] = {\n  'date': '2035-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2035-08-11'] = {\n  'date': '2035-08-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2035-09-17'] = {\n  'date': '2035-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2035-09-23'] = {\n  'date': '2035-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2035-09-24'] = {\n  'date': '2035-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2035-10-08'] = {\n  'date': '2035-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2035-11-03'] = {\n  'date': '2035-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2035-11-23'] = {\n  'date': '2035-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2036-01-01'] = {\n  'date': '2036-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2036-01-14'] = {\n  'date': '2036-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2036-02-11'] = {\n  'date': '2036-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2036-02-23'] = {\n  'date': '2036-02-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2036-03-20'] = {\n  'date': '2036-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2036-04-29'] = {\n  'date': '2036-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2036-05-03'] = {\n  'date': '2036-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2036-05-04'] = {\n  'date': '2036-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2036-05-05'] = {\n  'date': '2036-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2036-05-06'] = {\n  'date': '2036-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2036-07-21'] = {\n  'date': '2036-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2036-08-11'] = {\n  'date': '2036-08-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2036-09-15'] = {\n  'date': '2036-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2036-09-22'] = {\n  'date': '2036-09-22',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2036-10-13'] = {\n  'date': '2036-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2036-11-03'] = {\n  'date': '2036-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2036-11-23'] = {\n  'date': '2036-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2036-11-24'] = {\n  'date': '2036-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2037-01-01'] = {\n  'date': '2037-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2037-01-12'] = {\n  'date': '2037-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2037-02-11'] = {\n  'date': '2037-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2037-02-23'] = {\n  'date': '2037-02-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2037-03-20'] = {\n  'date': '2037-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2037-04-29'] = {\n  'date': '2037-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2037-05-03'] = {\n  'date': '2037-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2037-05-04'] = {\n  'date': '2037-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2037-05-05'] = {\n  'date': '2037-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2037-05-06'] = {\n  'date': '2037-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2037-07-20'] = {\n  'date': '2037-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2037-08-11'] = {\n  'date': '2037-08-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2037-09-21'] = {\n  'date': '2037-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2037-09-22'] = {\n  'date': '2037-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2037-09-23'] = {\n  'date': '2037-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2037-10-12'] = {\n  'date': '2037-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2037-11-03'] = {\n  'date': '2037-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2037-11-23'] = {\n  'date': '2037-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2038-01-01'] = {\n  'date': '2038-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2038-01-11'] = {\n  'date': '2038-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2038-02-11'] = {\n  'date': '2038-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2038-02-23'] = {\n  'date': '2038-02-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2038-03-20'] = {\n  'date': '2038-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2038-04-29'] = {\n  'date': '2038-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2038-05-03'] = {\n  'date': '2038-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2038-05-04'] = {\n  'date': '2038-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2038-05-05'] = {\n  'date': '2038-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2038-07-19'] = {\n  'date': '2038-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2038-08-11'] = {\n  'date': '2038-08-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2038-09-20'] = {\n  'date': '2038-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2038-09-23'] = {\n  'date': '2038-09-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2038-10-11'] = {\n  'date': '2038-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2038-11-03'] = {\n  'date': '2038-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2038-11-23'] = {\n  'date': '2038-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2039-01-01'] = {\n  'date': '2039-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2039-01-10'] = {\n  'date': '2039-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2039-02-11'] = {\n  'date': '2039-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2039-02-23'] = {\n  'date': '2039-02-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2039-03-21'] = {\n  'date': '2039-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2039-04-29'] = {\n  'date': '2039-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2039-05-03'] = {\n  'date': '2039-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2039-05-04'] = {\n  'date': '2039-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2039-05-05'] = {\n  'date': '2039-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2039-07-18'] = {\n  'date': '2039-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2039-08-11'] = {\n  'date': '2039-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2039-09-19'] = {\n  'date': '2039-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2039-09-23'] = {\n  'date': '2039-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2039-10-10'] = {\n  'date': '2039-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2039-11-03'] = {\n  'date': '2039-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2039-11-23'] = {\n  'date': '2039-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2040-01-01'] = {\n  'date': '2040-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2040-01-02'] = {\n  'date': '2040-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2040-01-09'] = {\n  'date': '2040-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2040-02-11'] = {\n  'date': '2040-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2040-02-23'] = {\n  'date': '2040-02-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2040-03-20'] = {\n  'date': '2040-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2040-04-29'] = {\n  'date': '2040-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2040-04-30'] = {\n  'date': '2040-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2040-05-03'] = {\n  'date': '2040-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2040-05-04'] = {\n  'date': '2040-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2040-05-05'] = {\n  'date': '2040-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2040-07-16'] = {\n  'date': '2040-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2040-08-11'] = {\n  'date': '2040-08-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2040-09-17'] = {\n  'date': '2040-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2040-09-22'] = {\n  'date': '2040-09-22',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2040-10-08'] = {\n  'date': '2040-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2040-11-03'] = {\n  'date': '2040-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2040-11-23'] = {\n  'date': '2040-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2041-01-01'] = {\n  'date': '2041-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2041-01-14'] = {\n  'date': '2041-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2041-02-11'] = {\n  'date': '2041-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2041-02-23'] = {\n  'date': '2041-02-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2041-03-20'] = {\n  'date': '2041-03-20',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2041-04-29'] = {\n  'date': '2041-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2041-05-03'] = {\n  'date': '2041-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2041-05-04'] = {\n  'date': '2041-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2041-05-05'] = {\n  'date': '2041-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2041-05-06'] = {\n  'date': '2041-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2041-07-15'] = {\n  'date': '2041-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2041-08-11'] = {\n  'date': '2041-08-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2041-08-12'] = {\n  'date': '2041-08-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2041-09-16'] = {\n  'date': '2041-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2041-09-23'] = {\n  'date': '2041-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2041-10-14'] = {\n  'date': '2041-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2041-11-03'] = {\n  'date': '2041-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2041-11-04'] = {\n  'date': '2041-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2041-11-23'] = {\n  'date': '2041-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2042-01-01'] = {\n  'date': '2042-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2042-01-13'] = {\n  'date': '2042-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2042-02-11'] = {\n  'date': '2042-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2042-02-23'] = {\n  'date': '2042-02-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2042-02-24'] = {\n  'date': '2042-02-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2042-03-20'] = {\n  'date': '2042-03-20',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2042-04-29'] = {\n  'date': '2042-04-29',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2042-05-03'] = {\n  'date': '2042-05-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2042-05-04'] = {\n  'date': '2042-05-04',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2042-05-05'] = {\n  'date': '2042-05-05',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2042-05-06'] = {\n  'date': '2042-05-06',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2042-07-21'] = {\n  'date': '2042-07-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2042-08-11'] = {\n  'date': '2042-08-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2042-09-15'] = {\n  'date': '2042-09-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2042-09-23'] = {\n  'date': '2042-09-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2042-10-13'] = {\n  'date': '2042-10-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2042-11-03'] = {\n  'date': '2042-11-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2042-11-23'] = {\n  'date': '2042-11-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2042-11-24'] = {\n  'date': '2042-11-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2043-01-01'] = {\n  'date': '2043-01-01',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2043-01-12'] = {\n  'date': '2043-01-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2043-02-11'] = {\n  'date': '2043-02-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2043-02-23'] = {\n  'date': '2043-02-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2043-03-21'] = {\n  'date': '2043-03-21',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2043-04-29'] = {\n  'date': '2043-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2043-05-03'] = {\n  'date': '2043-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2043-05-04'] = {\n  'date': '2043-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2043-05-05'] = {\n  'date': '2043-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2043-05-06'] = {\n  'date': '2043-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2043-07-20'] = {\n  'date': '2043-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2043-08-11'] = {\n  'date': '2043-08-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2043-09-21'] = {\n  'date': '2043-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2043-09-22'] = {\n  'date': '2043-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2043-09-23'] = {\n  'date': '2043-09-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2043-10-12'] = {\n  'date': '2043-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2043-11-03'] = {\n  'date': '2043-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2043-11-23'] = {\n  'date': '2043-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2044-01-01'] = {\n  'date': '2044-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2044-01-11'] = {\n  'date': '2044-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2044-02-11'] = {\n  'date': '2044-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2044-02-23'] = {\n  'date': '2044-02-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2044-03-20'] = {\n  'date': '2044-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2044-03-21'] = {\n  'date': '2044-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2044-04-29'] = {\n  'date': '2044-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2044-05-03'] = {\n  'date': '2044-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2044-05-04'] = {\n  'date': '2044-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2044-05-05'] = {\n  'date': '2044-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2044-07-18'] = {\n  'date': '2044-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2044-08-11'] = {\n  'date': '2044-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2044-09-19'] = {\n  'date': '2044-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2044-09-22'] = {\n  'date': '2044-09-22',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2044-10-10'] = {\n  'date': '2044-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2044-11-03'] = {\n  'date': '2044-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2044-11-23'] = {\n  'date': '2044-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2045-01-01'] = {\n  'date': '2045-01-01',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2045-01-02'] = {\n  'date': '2045-01-02',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2045-01-09'] = {\n  'date': '2045-01-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2045-02-11'] = {\n  'date': '2045-02-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2045-02-23'] = {\n  'date': '2045-02-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2045-03-20'] = {\n  'date': '2045-03-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2045-04-29'] = {\n  'date': '2045-04-29',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2045-05-03'] = {\n  'date': '2045-05-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2045-05-04'] = {\n  'date': '2045-05-04',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2045-05-05'] = {\n  'date': '2045-05-05',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2045-07-17'] = {\n  'date': '2045-07-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2045-08-11'] = {\n  'date': '2045-08-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2045-09-18'] = {\n  'date': '2045-09-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2045-09-22'] = {\n  'date': '2045-09-22',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2045-10-09'] = {\n  'date': '2045-10-09',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2045-11-03'] = {\n  'date': '2045-11-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2045-11-23'] = {\n  'date': '2045-11-23',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2046-01-01'] = {\n  'date': '2046-01-01',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2046-01-08'] = {\n  'date': '2046-01-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2046-02-11'] = {\n  'date': '2046-02-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2046-02-12'] = {\n  'date': '2046-02-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2046-02-23'] = {\n  'date': '2046-02-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2046-03-20'] = {\n  'date': '2046-03-20',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2046-04-29'] = {\n  'date': '2046-04-29',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2046-04-30'] = {\n  'date': '2046-04-30',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2046-05-03'] = {\n  'date': '2046-05-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2046-05-04'] = {\n  'date': '2046-05-04',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2046-05-05'] = {\n  'date': '2046-05-05',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2046-07-16'] = {\n  'date': '2046-07-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2046-08-11'] = {\n  'date': '2046-08-11',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2046-09-17'] = {\n  'date': '2046-09-17',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2046-09-23'] = {\n  'date': '2046-09-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2046-09-24'] = {\n  'date': '2046-09-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2046-10-08'] = {\n  'date': '2046-10-08',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2046-11-03'] = {\n  'date': '2046-11-03',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2046-11-23'] = {\n  'date': '2046-11-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2047-01-01'] = {\n  'date': '2047-01-01',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2047-01-14'] = {\n  'date': '2047-01-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2047-02-11'] = {\n  'date': '2047-02-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2047-02-23'] = {\n  'date': '2047-02-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2047-03-21'] = {\n  'date': '2047-03-21',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2047-04-29'] = {\n  'date': '2047-04-29',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2047-05-03'] = {\n  'date': '2047-05-03',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2047-05-04'] = {\n  'date': '2047-05-04',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2047-05-05'] = {\n  'date': '2047-05-05',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2047-05-06'] = {\n  'date': '2047-05-06',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2047-07-15'] = {\n  'date': '2047-07-15',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2047-08-11'] = {\n  'date': '2047-08-11',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2047-08-12'] = {\n  'date': '2047-08-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '山の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2047-09-16'] = {\n  'date': '2047-09-16',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2047-09-23'] = {\n  'date': '2047-09-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2047-10-14'] = {\n  'date': '2047-10-14',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2047-11-03'] = {\n  'date': '2047-11-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2047-11-04'] = {\n  'date': '2047-11-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '文化の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2047-11-23'] = {\n  'date': '2047-11-23',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2048-01-01'] = {\n  'date': '2048-01-01',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2048-01-13'] = {\n  'date': '2048-01-13',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2048-02-11'] = {\n  'date': '2048-02-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2048-02-23'] = {\n  'date': '2048-02-23',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2048-02-24'] = {\n  'date': '2048-02-24',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '天皇誕生日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2048-03-20'] = {\n  'date': '2048-03-20',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2048-04-29'] = {\n  'date': '2048-04-29',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2048-05-03'] = {\n  'date': '2048-05-03',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2048-05-04'] = {\n  'date': '2048-05-04',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2048-05-05'] = {\n  'date': '2048-05-05',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2048-05-06'] = {\n  'date': '2048-05-06',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2048-07-20'] = {\n  'date': '2048-07-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2048-08-11'] = {\n  'date': '2048-08-11',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2048-09-21'] = {\n  'date': '2048-09-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2048-09-22'] = {\n  'date': '2048-09-22',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2048-10-12'] = {\n  'date': '2048-10-12',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2048-11-03'] = {\n  'date': '2048-11-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2048-11-23'] = {\n  'date': '2048-11-23',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2049-01-01'] = {\n  'date': '2049-01-01',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2049-01-11'] = {\n  'date': '2049-01-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2049-02-11'] = {\n  'date': '2049-02-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2049-02-23'] = {\n  'date': '2049-02-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2049-03-20'] = {\n  'date': '2049-03-20',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2049-04-29'] = {\n  'date': '2049-04-29',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2049-05-03'] = {\n  'date': '2049-05-03',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2049-05-04'] = {\n  'date': '2049-05-04',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2049-05-05'] = {\n  'date': '2049-05-05',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2049-07-19'] = {\n  'date': '2049-07-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2049-08-11'] = {\n  'date': '2049-08-11',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2049-09-20'] = {\n  'date': '2049-09-20',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2049-09-21'] = {\n  'date': '2049-09-21',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '国民の休日',\n  'name_en': \"Citizen's Holiday\"\n};\nholidays['2049-09-22'] = {\n  'date': '2049-09-22',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2049-10-11'] = {\n  'date': '2049-10-11',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2049-11-03'] = {\n  'date': '2049-11-03',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2049-11-23'] = {\n  'date': '2049-11-23',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nholidays['2050-01-01'] = {\n  'date': '2050-01-01',\n  'week': '土',\n  'week_en': 'Saturday',\n  'name': '元日',\n  'name_en': \"New Year's Day\"\n};\nholidays['2050-01-10'] = {\n  'date': '2050-01-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '成人の日',\n  'name_en': \"Coming of Age Day\"\n};\nholidays['2050-02-11'] = {\n  'date': '2050-02-11',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '建国記念の日',\n  'name_en': \"National Foundation Day\"\n};\nholidays['2050-02-23'] = {\n  'date': '2050-02-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '天皇誕生日',\n  'name_en': \"Emperor's Birthday\"\n};\nholidays['2050-03-20'] = {\n  'date': '2050-03-20',\n  'week': '日',\n  'week_en': 'Sunday',\n  'name': '春分の日',\n  'name_en': \"Vernal Equinox Day\"\n};\nholidays['2050-03-21'] = {\n  'date': '2050-03-21',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '春分の日 振替休日',\n  'name_en': \"Holiday in lieu\"\n};\nholidays['2050-04-29'] = {\n  'date': '2050-04-29',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '昭和の日',\n  'name_en': \"Showa Day\"\n};\nholidays['2050-05-03'] = {\n  'date': '2050-05-03',\n  'week': '火',\n  'week_en': 'Tuesday',\n  'name': '憲法記念日',\n  'name_en': \"Constitution Memorial Day\"\n};\nholidays['2050-05-04'] = {\n  'date': '2050-05-04',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': 'みどりの日',\n  'name_en': \"Greenery Day\"\n};\nholidays['2050-05-05'] = {\n  'date': '2050-05-05',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': 'こどもの日',\n  'name_en': \"Children's Day\"\n};\nholidays['2050-07-18'] = {\n  'date': '2050-07-18',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '海の日',\n  'name_en': \"Marine Day\"\n};\nholidays['2050-08-11'] = {\n  'date': '2050-08-11',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '山の日',\n  'name_en': \"Mountain Day\"\n};\nholidays['2050-09-19'] = {\n  'date': '2050-09-19',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': '敬老の日',\n  'name_en': \"Respect for the Aged Day\"\n};\nholidays['2050-09-23'] = {\n  'date': '2050-09-23',\n  'week': '金',\n  'week_en': 'Friday',\n  'name': '秋分の日',\n  'name_en': \"Autumnal Equinox Day\"\n};\nholidays['2050-10-10'] = {\n  'date': '2050-10-10',\n  'week': '月',\n  'week_en': 'Monday',\n  'name': 'スポーツの日',\n  'name_en': \"Health and Sports Day\"\n};\nholidays['2050-11-03'] = {\n  'date': '2050-11-03',\n  'week': '木',\n  'week_en': 'Thursday',\n  'name': '文化の日',\n  'name_en': \"National Culture Day\"\n};\nholidays['2050-11-23'] = {\n  'date': '2050-11-23',\n  'week': '水',\n  'week_en': 'Wednesday',\n  'name': '勤労感謝の日',\n  'name_en': \"Labor Thanksgiving Day\"\n};\nmodule.exports = holidays;\n\n//# sourceURL=webpack:///./lib/holidays.js?");

/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/*! exports provided: name, version, description, main, scripts, repository, keywords, author, license, bugs, homepage, devDependencies, default */
/***/ (function(module) {

eval("module.exports = {\"name\":\"@holiday-jp/holiday_jp\",\"version\":\"2.2.0\",\"description\":\"Japanese holidays\",\"main\":\"release/holiday_jp.js\",\"scripts\":{\"test\":\"mocha --require should test/*.js\",\"generate\":\"git submodule update; cd holiday_jp/; git fetch origin master; git reset --hard origin/master; cd ../; node scripts/generate.js\",\"build\":\"npm run generate; webpack; node scripts/build.js;rm scripts/holiday_jp_webpacked.js;cd ./release/; uglifyjs holiday_jp.js -c -m --source-map -o holiday_jp.min.js\"},\"repository\":{\"type\":\"git\",\"url\":\"https://github.com/holiday-jp/holiday_jp-js\"},\"keywords\":[\"holidays\"],\"author\":\"Ken'ichiro Oyama\",\"license\":\"MIT\",\"bugs\":{\"url\":\"https://github.com/holiday-jp/holiday_jp-js/issues\"},\"homepage\":\"https://github.com/holiday-jp/holiday_jp-js\",\"devDependencies\":{\"chai\":\"^4.2.0\",\"js-yaml\":\"^3.12.0\",\"mocha\":\"^5.2.0\",\"moment\":\"^2.23.0\",\"should\":\"~1.2.2\",\"uglify-js\":\"^3.4.9\",\"webpack\":\"^4.28.2\"}};\n\n//# sourceURL=webpack:///./package.json?");

/***/ })

/******/ });
  // AMD / RequireJS
  if (typeof define !== 'undefined' && define.amd) {
    define('holiday_jp', [], function () {
      return holiday_jp;
    });
  }
  // Node.js
  else if (typeof module !== 'undefined' && module.exports) {
    module.exports = holiday_jp;
  }
  // included directly via <script> tag
  else {
    root = Function('return this')();
    root.holiday_jp = holiday_jp;
  }
  
})();

},{}],3:[function(require,module,exports){
//! moment.js

;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, (function () { 'use strict';

    var hookCallback;

    function hooks () {
        return hookCallback.apply(null, arguments);
    }

    // This is done to register the method called with moment()
    // without creating circular dependencies.
    function setHookCallback (callback) {
        hookCallback = callback;
    }

    function isArray(input) {
        return input instanceof Array || Object.prototype.toString.call(input) === '[object Array]';
    }

    function isObject(input) {
        // IE8 will treat undefined and null as object if it wasn't for
        // input != null
        return input != null && Object.prototype.toString.call(input) === '[object Object]';
    }

    function isObjectEmpty(obj) {
        if (Object.getOwnPropertyNames) {
            return (Object.getOwnPropertyNames(obj).length === 0);
        } else {
            var k;
            for (k in obj) {
                if (obj.hasOwnProperty(k)) {
                    return false;
                }
            }
            return true;
        }
    }

    function isUndefined(input) {
        return input === void 0;
    }

    function isNumber(input) {
        return typeof input === 'number' || Object.prototype.toString.call(input) === '[object Number]';
    }

    function isDate(input) {
        return input instanceof Date || Object.prototype.toString.call(input) === '[object Date]';
    }

    function map(arr, fn) {
        var res = [], i;
        for (i = 0; i < arr.length; ++i) {
            res.push(fn(arr[i], i));
        }
        return res;
    }

    function hasOwnProp(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
    }

    function extend(a, b) {
        for (var i in b) {
            if (hasOwnProp(b, i)) {
                a[i] = b[i];
            }
        }

        if (hasOwnProp(b, 'toString')) {
            a.toString = b.toString;
        }

        if (hasOwnProp(b, 'valueOf')) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function createUTC (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, true).utc();
    }

    function defaultParsingFlags() {
        // We need to deep clone this object.
        return {
            empty           : false,
            unusedTokens    : [],
            unusedInput     : [],
            overflow        : -2,
            charsLeftOver   : 0,
            nullInput       : false,
            invalidMonth    : null,
            invalidFormat   : false,
            userInvalidated : false,
            iso             : false,
            parsedDateParts : [],
            meridiem        : null,
            rfc2822         : false,
            weekdayMismatch : false
        };
    }

    function getParsingFlags(m) {
        if (m._pf == null) {
            m._pf = defaultParsingFlags();
        }
        return m._pf;
    }

    var some;
    if (Array.prototype.some) {
        some = Array.prototype.some;
    } else {
        some = function (fun) {
            var t = Object(this);
            var len = t.length >>> 0;

            for (var i = 0; i < len; i++) {
                if (i in t && fun.call(this, t[i], i, t)) {
                    return true;
                }
            }

            return false;
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            var flags = getParsingFlags(m);
            var parsedParts = some.call(flags.parsedDateParts, function (i) {
                return i != null;
            });
            var isNowValid = !isNaN(m._d.getTime()) &&
                flags.overflow < 0 &&
                !flags.empty &&
                !flags.invalidMonth &&
                !flags.invalidWeekday &&
                !flags.weekdayMismatch &&
                !flags.nullInput &&
                !flags.invalidFormat &&
                !flags.userInvalidated &&
                (!flags.meridiem || (flags.meridiem && parsedParts));

            if (m._strict) {
                isNowValid = isNowValid &&
                    flags.charsLeftOver === 0 &&
                    flags.unusedTokens.length === 0 &&
                    flags.bigHour === undefined;
            }

            if (Object.isFrozen == null || !Object.isFrozen(m)) {
                m._isValid = isNowValid;
            }
            else {
                return isNowValid;
            }
        }
        return m._isValid;
    }

    function createInvalid (flags) {
        var m = createUTC(NaN);
        if (flags != null) {
            extend(getParsingFlags(m), flags);
        }
        else {
            getParsingFlags(m).userInvalidated = true;
        }

        return m;
    }

    // Plugins that add properties should also add the key here (null value),
    // so we can properly clone ourselves.
    var momentProperties = hooks.momentProperties = [];

    function copyConfig(to, from) {
        var i, prop, val;

        if (!isUndefined(from._isAMomentObject)) {
            to._isAMomentObject = from._isAMomentObject;
        }
        if (!isUndefined(from._i)) {
            to._i = from._i;
        }
        if (!isUndefined(from._f)) {
            to._f = from._f;
        }
        if (!isUndefined(from._l)) {
            to._l = from._l;
        }
        if (!isUndefined(from._strict)) {
            to._strict = from._strict;
        }
        if (!isUndefined(from._tzm)) {
            to._tzm = from._tzm;
        }
        if (!isUndefined(from._isUTC)) {
            to._isUTC = from._isUTC;
        }
        if (!isUndefined(from._offset)) {
            to._offset = from._offset;
        }
        if (!isUndefined(from._pf)) {
            to._pf = getParsingFlags(from);
        }
        if (!isUndefined(from._locale)) {
            to._locale = from._locale;
        }

        if (momentProperties.length > 0) {
            for (i = 0; i < momentProperties.length; i++) {
                prop = momentProperties[i];
                val = from[prop];
                if (!isUndefined(val)) {
                    to[prop] = val;
                }
            }
        }

        return to;
    }

    var updateInProgress = false;

    // Moment prototype object
    function Moment(config) {
        copyConfig(this, config);
        this._d = new Date(config._d != null ? config._d.getTime() : NaN);
        if (!this.isValid()) {
            this._d = new Date(NaN);
        }
        // Prevent infinite loop in case updateOffset creates new moment
        // objects.
        if (updateInProgress === false) {
            updateInProgress = true;
            hooks.updateOffset(this);
            updateInProgress = false;
        }
    }

    function isMoment (obj) {
        return obj instanceof Moment || (obj != null && obj._isAMomentObject != null);
    }

    function absFloor (number) {
        if (number < 0) {
            // -0 -> 0
            return Math.ceil(number) || 0;
        } else {
            return Math.floor(number);
        }
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            value = absFloor(coercedNumber);
        }

        return value;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function warn(msg) {
        if (hooks.suppressDeprecationWarnings === false &&
                (typeof console !==  'undefined') && console.warn) {
            console.warn('Deprecation warning: ' + msg);
        }
    }

    function deprecate(msg, fn) {
        var firstTime = true;

        return extend(function () {
            if (hooks.deprecationHandler != null) {
                hooks.deprecationHandler(null, msg);
            }
            if (firstTime) {
                var args = [];
                var arg;
                for (var i = 0; i < arguments.length; i++) {
                    arg = '';
                    if (typeof arguments[i] === 'object') {
                        arg += '\n[' + i + '] ';
                        for (var key in arguments[0]) {
                            arg += key + ': ' + arguments[0][key] + ', ';
                        }
                        arg = arg.slice(0, -2); // Remove trailing comma and space
                    } else {
                        arg = arguments[i];
                    }
                    args.push(arg);
                }
                warn(msg + '\nArguments: ' + Array.prototype.slice.call(args).join('') + '\n' + (new Error()).stack);
                firstTime = false;
            }
            return fn.apply(this, arguments);
        }, fn);
    }

    var deprecations = {};

    function deprecateSimple(name, msg) {
        if (hooks.deprecationHandler != null) {
            hooks.deprecationHandler(name, msg);
        }
        if (!deprecations[name]) {
            warn(msg);
            deprecations[name] = true;
        }
    }

    hooks.suppressDeprecationWarnings = false;
    hooks.deprecationHandler = null;

    function isFunction(input) {
        return input instanceof Function || Object.prototype.toString.call(input) === '[object Function]';
    }

    function set (config) {
        var prop, i;
        for (i in config) {
            prop = config[i];
            if (isFunction(prop)) {
                this[i] = prop;
            } else {
                this['_' + i] = prop;
            }
        }
        this._config = config;
        // Lenient ordinal parsing accepts just a number in addition to
        // number + (possibly) stuff coming from _dayOfMonthOrdinalParse.
        // TODO: Remove "ordinalParse" fallback in next major release.
        this._dayOfMonthOrdinalParseLenient = new RegExp(
            (this._dayOfMonthOrdinalParse.source || this._ordinalParse.source) +
                '|' + (/\d{1,2}/).source);
    }

    function mergeConfigs(parentConfig, childConfig) {
        var res = extend({}, parentConfig), prop;
        for (prop in childConfig) {
            if (hasOwnProp(childConfig, prop)) {
                if (isObject(parentConfig[prop]) && isObject(childConfig[prop])) {
                    res[prop] = {};
                    extend(res[prop], parentConfig[prop]);
                    extend(res[prop], childConfig[prop]);
                } else if (childConfig[prop] != null) {
                    res[prop] = childConfig[prop];
                } else {
                    delete res[prop];
                }
            }
        }
        for (prop in parentConfig) {
            if (hasOwnProp(parentConfig, prop) &&
                    !hasOwnProp(childConfig, prop) &&
                    isObject(parentConfig[prop])) {
                // make sure changes to properties don't modify parent config
                res[prop] = extend({}, res[prop]);
            }
        }
        return res;
    }

    function Locale(config) {
        if (config != null) {
            this.set(config);
        }
    }

    var keys;

    if (Object.keys) {
        keys = Object.keys;
    } else {
        keys = function (obj) {
            var i, res = [];
            for (i in obj) {
                if (hasOwnProp(obj, i)) {
                    res.push(i);
                }
            }
            return res;
        };
    }

    var defaultCalendar = {
        sameDay : '[Today at] LT',
        nextDay : '[Tomorrow at] LT',
        nextWeek : 'dddd [at] LT',
        lastDay : '[Yesterday at] LT',
        lastWeek : '[Last] dddd [at] LT',
        sameElse : 'L'
    };

    function calendar (key, mom, now) {
        var output = this._calendar[key] || this._calendar['sameElse'];
        return isFunction(output) ? output.call(mom, now) : output;
    }

    var defaultLongDateFormat = {
        LTS  : 'h:mm:ss A',
        LT   : 'h:mm A',
        L    : 'MM/DD/YYYY',
        LL   : 'MMMM D, YYYY',
        LLL  : 'MMMM D, YYYY h:mm A',
        LLLL : 'dddd, MMMM D, YYYY h:mm A'
    };

    function longDateFormat (key) {
        var format = this._longDateFormat[key],
            formatUpper = this._longDateFormat[key.toUpperCase()];

        if (format || !formatUpper) {
            return format;
        }

        this._longDateFormat[key] = formatUpper.replace(/MMMM|MM|DD|dddd/g, function (val) {
            return val.slice(1);
        });

        return this._longDateFormat[key];
    }

    var defaultInvalidDate = 'Invalid date';

    function invalidDate () {
        return this._invalidDate;
    }

    var defaultOrdinal = '%d';
    var defaultDayOfMonthOrdinalParse = /\d{1,2}/;

    function ordinal (number) {
        return this._ordinal.replace('%d', number);
    }

    var defaultRelativeTime = {
        future : 'in %s',
        past   : '%s ago',
        s  : 'a few seconds',
        ss : '%d seconds',
        m  : 'a minute',
        mm : '%d minutes',
        h  : 'an hour',
        hh : '%d hours',
        d  : 'a day',
        dd : '%d days',
        M  : 'a month',
        MM : '%d months',
        y  : 'a year',
        yy : '%d years'
    };

    function relativeTime (number, withoutSuffix, string, isFuture) {
        var output = this._relativeTime[string];
        return (isFunction(output)) ?
            output(number, withoutSuffix, string, isFuture) :
            output.replace(/%d/i, number);
    }

    function pastFuture (diff, output) {
        var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
        return isFunction(format) ? format(output) : format.replace(/%s/i, output);
    }

    var aliases = {};

    function addUnitAlias (unit, shorthand) {
        var lowerCase = unit.toLowerCase();
        aliases[lowerCase] = aliases[lowerCase + 's'] = aliases[shorthand] = unit;
    }

    function normalizeUnits(units) {
        return typeof units === 'string' ? aliases[units] || aliases[units.toLowerCase()] : undefined;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop;

        for (prop in inputObject) {
            if (hasOwnProp(inputObject, prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    var priorities = {};

    function addUnitPriority(unit, priority) {
        priorities[unit] = priority;
    }

    function getPrioritizedUnits(unitsObj) {
        var units = [];
        for (var u in unitsObj) {
            units.push({unit: u, priority: priorities[u]});
        }
        units.sort(function (a, b) {
            return a.priority - b.priority;
        });
        return units;
    }

    function zeroFill(number, targetLength, forceSign) {
        var absNumber = '' + Math.abs(number),
            zerosToFill = targetLength - absNumber.length,
            sign = number >= 0;
        return (sign ? (forceSign ? '+' : '') : '-') +
            Math.pow(10, Math.max(0, zerosToFill)).toString().substr(1) + absNumber;
    }

    var formattingTokens = /(\[[^\[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;

    var localFormattingTokens = /(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g;

    var formatFunctions = {};

    var formatTokenFunctions = {};

    // token:    'M'
    // padded:   ['MM', 2]
    // ordinal:  'Mo'
    // callback: function () { this.month() + 1 }
    function addFormatToken (token, padded, ordinal, callback) {
        var func = callback;
        if (typeof callback === 'string') {
            func = function () {
                return this[callback]();
            };
        }
        if (token) {
            formatTokenFunctions[token] = func;
        }
        if (padded) {
            formatTokenFunctions[padded[0]] = function () {
                return zeroFill(func.apply(this, arguments), padded[1], padded[2]);
            };
        }
        if (ordinal) {
            formatTokenFunctions[ordinal] = function () {
                return this.localeData().ordinal(func.apply(this, arguments), token);
            };
        }
    }

    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, '');
        }
        return input.replace(/\\/g, '');
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = '', i;
            for (i = 0; i < length; i++) {
                output += isFunction(array[i]) ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {
        if (!m.isValid()) {
            return m.localeData().invalidDate();
        }

        format = expandFormat(format, m.localeData());
        formatFunctions[format] = formatFunctions[format] || makeFormatFunction(format);

        return formatFunctions[format](m);
    }

    function expandFormat(format, locale) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return locale.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }

    var match1         = /\d/;            //       0 - 9
    var match2         = /\d\d/;          //      00 - 99
    var match3         = /\d{3}/;         //     000 - 999
    var match4         = /\d{4}/;         //    0000 - 9999
    var match6         = /[+-]?\d{6}/;    // -999999 - 999999
    var match1to2      = /\d\d?/;         //       0 - 99
    var match3to4      = /\d\d\d\d?/;     //     999 - 9999
    var match5to6      = /\d\d\d\d\d\d?/; //   99999 - 999999
    var match1to3      = /\d{1,3}/;       //       0 - 999
    var match1to4      = /\d{1,4}/;       //       0 - 9999
    var match1to6      = /[+-]?\d{1,6}/;  // -999999 - 999999

    var matchUnsigned  = /\d+/;           //       0 - inf
    var matchSigned    = /[+-]?\d+/;      //    -inf - inf

    var matchOffset    = /Z|[+-]\d\d:?\d\d/gi; // +00:00 -00:00 +0000 -0000 or Z
    var matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi; // +00 -00 +00:00 -00:00 +0000 -0000 or Z

    var matchTimestamp = /[+-]?\d+(\.\d{1,3})?/; // 123456789 123456789.123

    // any word (or two) characters or numbers including two/three word month in arabic.
    // includes scottish gaelic two word and hyphenated months
    var matchWord = /[0-9]{0,256}['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFF07\uFF10-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i;

    var regexes = {};

    function addRegexToken (token, regex, strictRegex) {
        regexes[token] = isFunction(regex) ? regex : function (isStrict, localeData) {
            return (isStrict && strictRegex) ? strictRegex : regex;
        };
    }

    function getParseRegexForToken (token, config) {
        if (!hasOwnProp(regexes, token)) {
            return new RegExp(unescapeFormat(token));
        }

        return regexes[token](config._strict, config._locale);
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function unescapeFormat(s) {
        return regexEscape(s.replace('\\', '').replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        }));
    }

    function regexEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    var tokens = {};

    function addParseToken (token, callback) {
        var i, func = callback;
        if (typeof token === 'string') {
            token = [token];
        }
        if (isNumber(callback)) {
            func = function (input, array) {
                array[callback] = toInt(input);
            };
        }
        for (i = 0; i < token.length; i++) {
            tokens[token[i]] = func;
        }
    }

    function addWeekParseToken (token, callback) {
        addParseToken(token, function (input, array, config, token) {
            config._w = config._w || {};
            callback(input, config._w, config, token);
        });
    }

    function addTimeToArrayFromToken(token, input, config) {
        if (input != null && hasOwnProp(tokens, token)) {
            tokens[token](input, config._a, config, token);
        }
    }

    var YEAR = 0;
    var MONTH = 1;
    var DATE = 2;
    var HOUR = 3;
    var MINUTE = 4;
    var SECOND = 5;
    var MILLISECOND = 6;
    var WEEK = 7;
    var WEEKDAY = 8;

    // FORMATTING

    addFormatToken('Y', 0, 0, function () {
        var y = this.year();
        return y <= 9999 ? '' + y : '+' + y;
    });

    addFormatToken(0, ['YY', 2], 0, function () {
        return this.year() % 100;
    });

    addFormatToken(0, ['YYYY',   4],       0, 'year');
    addFormatToken(0, ['YYYYY',  5],       0, 'year');
    addFormatToken(0, ['YYYYYY', 6, true], 0, 'year');

    // ALIASES

    addUnitAlias('year', 'y');

    // PRIORITIES

    addUnitPriority('year', 1);

    // PARSING

    addRegexToken('Y',      matchSigned);
    addRegexToken('YY',     match1to2, match2);
    addRegexToken('YYYY',   match1to4, match4);
    addRegexToken('YYYYY',  match1to6, match6);
    addRegexToken('YYYYYY', match1to6, match6);

    addParseToken(['YYYYY', 'YYYYYY'], YEAR);
    addParseToken('YYYY', function (input, array) {
        array[YEAR] = input.length === 2 ? hooks.parseTwoDigitYear(input) : toInt(input);
    });
    addParseToken('YY', function (input, array) {
        array[YEAR] = hooks.parseTwoDigitYear(input);
    });
    addParseToken('Y', function (input, array) {
        array[YEAR] = parseInt(input, 10);
    });

    // HELPERS

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // HOOKS

    hooks.parseTwoDigitYear = function (input) {
        return toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
    };

    // MOMENTS

    var getSetYear = makeGetSet('FullYear', true);

    function getIsLeapYear () {
        return isLeapYear(this.year());
    }

    function makeGetSet (unit, keepTime) {
        return function (value) {
            if (value != null) {
                set$1(this, unit, value);
                hooks.updateOffset(this, keepTime);
                return this;
            } else {
                return get(this, unit);
            }
        };
    }

    function get (mom, unit) {
        return mom.isValid() ?
            mom._d['get' + (mom._isUTC ? 'UTC' : '') + unit]() : NaN;
    }

    function set$1 (mom, unit, value) {
        if (mom.isValid() && !isNaN(value)) {
            if (unit === 'FullYear' && isLeapYear(mom.year()) && mom.month() === 1 && mom.date() === 29) {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value, mom.month(), daysInMonth(value, mom.month()));
            }
            else {
                mom._d['set' + (mom._isUTC ? 'UTC' : '') + unit](value);
            }
        }
    }

    // MOMENTS

    function stringGet (units) {
        units = normalizeUnits(units);
        if (isFunction(this[units])) {
            return this[units]();
        }
        return this;
    }


    function stringSet (units, value) {
        if (typeof units === 'object') {
            units = normalizeObjectUnits(units);
            var prioritized = getPrioritizedUnits(units);
            for (var i = 0; i < prioritized.length; i++) {
                this[prioritized[i].unit](units[prioritized[i].unit]);
            }
        } else {
            units = normalizeUnits(units);
            if (isFunction(this[units])) {
                return this[units](value);
            }
        }
        return this;
    }

    function mod(n, x) {
        return ((n % x) + x) % x;
    }

    var indexOf;

    if (Array.prototype.indexOf) {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function (o) {
            // I know
            var i;
            for (i = 0; i < this.length; ++i) {
                if (this[i] === o) {
                    return i;
                }
            }
            return -1;
        };
    }

    function daysInMonth(year, month) {
        if (isNaN(year) || isNaN(month)) {
            return NaN;
        }
        var modMonth = mod(month, 12);
        year += (month - modMonth) / 12;
        return modMonth === 1 ? (isLeapYear(year) ? 29 : 28) : (31 - modMonth % 7 % 2);
    }

    // FORMATTING

    addFormatToken('M', ['MM', 2], 'Mo', function () {
        return this.month() + 1;
    });

    addFormatToken('MMM', 0, 0, function (format) {
        return this.localeData().monthsShort(this, format);
    });

    addFormatToken('MMMM', 0, 0, function (format) {
        return this.localeData().months(this, format);
    });

    // ALIASES

    addUnitAlias('month', 'M');

    // PRIORITY

    addUnitPriority('month', 8);

    // PARSING

    addRegexToken('M',    match1to2);
    addRegexToken('MM',   match1to2, match2);
    addRegexToken('MMM',  function (isStrict, locale) {
        return locale.monthsShortRegex(isStrict);
    });
    addRegexToken('MMMM', function (isStrict, locale) {
        return locale.monthsRegex(isStrict);
    });

    addParseToken(['M', 'MM'], function (input, array) {
        array[MONTH] = toInt(input) - 1;
    });

    addParseToken(['MMM', 'MMMM'], function (input, array, config, token) {
        var month = config._locale.monthsParse(input, token, config._strict);
        // if we didn't find a month name, mark the date as invalid.
        if (month != null) {
            array[MONTH] = month;
        } else {
            getParsingFlags(config).invalidMonth = input;
        }
    });

    // LOCALES

    var MONTHS_IN_FORMAT = /D[oD]?(\[[^\[\]]*\]|\s)+MMMM?/;
    var defaultLocaleMonths = 'January_February_March_April_May_June_July_August_September_October_November_December'.split('_');
    function localeMonths (m, format) {
        if (!m) {
            return isArray(this._months) ? this._months :
                this._months['standalone'];
        }
        return isArray(this._months) ? this._months[m.month()] :
            this._months[(this._months.isFormat || MONTHS_IN_FORMAT).test(format) ? 'format' : 'standalone'][m.month()];
    }

    var defaultLocaleMonthsShort = 'Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec'.split('_');
    function localeMonthsShort (m, format) {
        if (!m) {
            return isArray(this._monthsShort) ? this._monthsShort :
                this._monthsShort['standalone'];
        }
        return isArray(this._monthsShort) ? this._monthsShort[m.month()] :
            this._monthsShort[MONTHS_IN_FORMAT.test(format) ? 'format' : 'standalone'][m.month()];
    }

    function handleStrictParse(monthName, format, strict) {
        var i, ii, mom, llc = monthName.toLocaleLowerCase();
        if (!this._monthsParse) {
            // this is not used
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
            for (i = 0; i < 12; ++i) {
                mom = createUTC([2000, i]);
                this._shortMonthsParse[i] = this.monthsShort(mom, '').toLocaleLowerCase();
                this._longMonthsParse[i] = this.months(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'MMM') {
                ii = indexOf.call(this._shortMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._longMonthsParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._longMonthsParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortMonthsParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeMonthsParse (monthName, format, strict) {
        var i, mom, regex;

        if (this._monthsParseExact) {
            return handleStrictParse.call(this, monthName, format, strict);
        }

        if (!this._monthsParse) {
            this._monthsParse = [];
            this._longMonthsParse = [];
            this._shortMonthsParse = [];
        }

        // TODO: add sorting
        // Sorting makes sure if one month (or abbr) is a prefix of another
        // see sorting in computeMonthsParse
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            if (strict && !this._longMonthsParse[i]) {
                this._longMonthsParse[i] = new RegExp('^' + this.months(mom, '').replace('.', '') + '$', 'i');
                this._shortMonthsParse[i] = new RegExp('^' + this.monthsShort(mom, '').replace('.', '') + '$', 'i');
            }
            if (!strict && !this._monthsParse[i]) {
                regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'MMMM' && this._longMonthsParse[i].test(monthName)) {
                return i;
            } else if (strict && format === 'MMM' && this._shortMonthsParse[i].test(monthName)) {
                return i;
            } else if (!strict && this._monthsParse[i].test(monthName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function setMonth (mom, value) {
        var dayOfMonth;

        if (!mom.isValid()) {
            // No op
            return mom;
        }

        if (typeof value === 'string') {
            if (/^\d+$/.test(value)) {
                value = toInt(value);
            } else {
                value = mom.localeData().monthsParse(value);
                // TODO: Another silent failure?
                if (!isNumber(value)) {
                    return mom;
                }
            }
        }

        dayOfMonth = Math.min(mom.date(), daysInMonth(mom.year(), value));
        mom._d['set' + (mom._isUTC ? 'UTC' : '') + 'Month'](value, dayOfMonth);
        return mom;
    }

    function getSetMonth (value) {
        if (value != null) {
            setMonth(this, value);
            hooks.updateOffset(this, true);
            return this;
        } else {
            return get(this, 'Month');
        }
    }

    function getDaysInMonth () {
        return daysInMonth(this.year(), this.month());
    }

    var defaultMonthsShortRegex = matchWord;
    function monthsShortRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsShortStrictRegex;
            } else {
                return this._monthsShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsShortRegex')) {
                this._monthsShortRegex = defaultMonthsShortRegex;
            }
            return this._monthsShortStrictRegex && isStrict ?
                this._monthsShortStrictRegex : this._monthsShortRegex;
        }
    }

    var defaultMonthsRegex = matchWord;
    function monthsRegex (isStrict) {
        if (this._monthsParseExact) {
            if (!hasOwnProp(this, '_monthsRegex')) {
                computeMonthsParse.call(this);
            }
            if (isStrict) {
                return this._monthsStrictRegex;
            } else {
                return this._monthsRegex;
            }
        } else {
            if (!hasOwnProp(this, '_monthsRegex')) {
                this._monthsRegex = defaultMonthsRegex;
            }
            return this._monthsStrictRegex && isStrict ?
                this._monthsStrictRegex : this._monthsRegex;
        }
    }

    function computeMonthsParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom;
        for (i = 0; i < 12; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, i]);
            shortPieces.push(this.monthsShort(mom, ''));
            longPieces.push(this.months(mom, ''));
            mixedPieces.push(this.months(mom, ''));
            mixedPieces.push(this.monthsShort(mom, ''));
        }
        // Sorting makes sure if one month (or abbr) is a prefix of another it
        // will match the longer piece.
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 12; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
        }
        for (i = 0; i < 24; i++) {
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._monthsRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._monthsShortRegex = this._monthsRegex;
        this._monthsStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._monthsShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
    }

    function createDate (y, m, d, h, M, s, ms) {
        // can't just apply() to create a date:
        // https://stackoverflow.com/q/181348
        var date;
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            date = new Date(y + 400, m, d, h, M, s, ms);
            if (isFinite(date.getFullYear())) {
                date.setFullYear(y);
            }
        } else {
            date = new Date(y, m, d, h, M, s, ms);
        }

        return date;
    }

    function createUTCDate (y) {
        var date;
        // the Date.UTC function remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            var args = Array.prototype.slice.call(arguments);
            // preserve leap years using a full 400 year cycle, then reset
            args[0] = y + 400;
            date = new Date(Date.UTC.apply(null, args));
            if (isFinite(date.getUTCFullYear())) {
                date.setUTCFullYear(y);
            }
        } else {
            date = new Date(Date.UTC.apply(null, arguments));
        }

        return date;
    }

    // start-of-first-week - start-of-year
    function firstWeekOffset(year, dow, doy) {
        var // first-week day -- which january is always in the first week (4 for iso, 1 for other)
            fwd = 7 + dow - doy,
            // first-week day local weekday -- which local weekday is fwd
            fwdlw = (7 + createUTCDate(year, 0, fwd).getUTCDay() - dow) % 7;

        return -fwdlw + fwd - 1;
    }

    // https://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, dow, doy) {
        var localWeekday = (7 + weekday - dow) % 7,
            weekOffset = firstWeekOffset(year, dow, doy),
            dayOfYear = 1 + 7 * (week - 1) + localWeekday + weekOffset,
            resYear, resDayOfYear;

        if (dayOfYear <= 0) {
            resYear = year - 1;
            resDayOfYear = daysInYear(resYear) + dayOfYear;
        } else if (dayOfYear > daysInYear(year)) {
            resYear = year + 1;
            resDayOfYear = dayOfYear - daysInYear(year);
        } else {
            resYear = year;
            resDayOfYear = dayOfYear;
        }

        return {
            year: resYear,
            dayOfYear: resDayOfYear
        };
    }

    function weekOfYear(mom, dow, doy) {
        var weekOffset = firstWeekOffset(mom.year(), dow, doy),
            week = Math.floor((mom.dayOfYear() - weekOffset - 1) / 7) + 1,
            resWeek, resYear;

        if (week < 1) {
            resYear = mom.year() - 1;
            resWeek = week + weeksInYear(resYear, dow, doy);
        } else if (week > weeksInYear(mom.year(), dow, doy)) {
            resWeek = week - weeksInYear(mom.year(), dow, doy);
            resYear = mom.year() + 1;
        } else {
            resYear = mom.year();
            resWeek = week;
        }

        return {
            week: resWeek,
            year: resYear
        };
    }

    function weeksInYear(year, dow, doy) {
        var weekOffset = firstWeekOffset(year, dow, doy),
            weekOffsetNext = firstWeekOffset(year + 1, dow, doy);
        return (daysInYear(year) - weekOffset + weekOffsetNext) / 7;
    }

    // FORMATTING

    addFormatToken('w', ['ww', 2], 'wo', 'week');
    addFormatToken('W', ['WW', 2], 'Wo', 'isoWeek');

    // ALIASES

    addUnitAlias('week', 'w');
    addUnitAlias('isoWeek', 'W');

    // PRIORITIES

    addUnitPriority('week', 5);
    addUnitPriority('isoWeek', 5);

    // PARSING

    addRegexToken('w',  match1to2);
    addRegexToken('ww', match1to2, match2);
    addRegexToken('W',  match1to2);
    addRegexToken('WW', match1to2, match2);

    addWeekParseToken(['w', 'ww', 'W', 'WW'], function (input, week, config, token) {
        week[token.substr(0, 1)] = toInt(input);
    });

    // HELPERS

    // LOCALES

    function localeWeek (mom) {
        return weekOfYear(mom, this._week.dow, this._week.doy).week;
    }

    var defaultLocaleWeek = {
        dow : 0, // Sunday is the first day of the week.
        doy : 6  // The week that contains Jan 6th is the first week of the year.
    };

    function localeFirstDayOfWeek () {
        return this._week.dow;
    }

    function localeFirstDayOfYear () {
        return this._week.doy;
    }

    // MOMENTS

    function getSetWeek (input) {
        var week = this.localeData().week(this);
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    function getSetISOWeek (input) {
        var week = weekOfYear(this, 1, 4).week;
        return input == null ? week : this.add((input - week) * 7, 'd');
    }

    // FORMATTING

    addFormatToken('d', 0, 'do', 'day');

    addFormatToken('dd', 0, 0, function (format) {
        return this.localeData().weekdaysMin(this, format);
    });

    addFormatToken('ddd', 0, 0, function (format) {
        return this.localeData().weekdaysShort(this, format);
    });

    addFormatToken('dddd', 0, 0, function (format) {
        return this.localeData().weekdays(this, format);
    });

    addFormatToken('e', 0, 0, 'weekday');
    addFormatToken('E', 0, 0, 'isoWeekday');

    // ALIASES

    addUnitAlias('day', 'd');
    addUnitAlias('weekday', 'e');
    addUnitAlias('isoWeekday', 'E');

    // PRIORITY
    addUnitPriority('day', 11);
    addUnitPriority('weekday', 11);
    addUnitPriority('isoWeekday', 11);

    // PARSING

    addRegexToken('d',    match1to2);
    addRegexToken('e',    match1to2);
    addRegexToken('E',    match1to2);
    addRegexToken('dd',   function (isStrict, locale) {
        return locale.weekdaysMinRegex(isStrict);
    });
    addRegexToken('ddd',   function (isStrict, locale) {
        return locale.weekdaysShortRegex(isStrict);
    });
    addRegexToken('dddd',   function (isStrict, locale) {
        return locale.weekdaysRegex(isStrict);
    });

    addWeekParseToken(['dd', 'ddd', 'dddd'], function (input, week, config, token) {
        var weekday = config._locale.weekdaysParse(input, token, config._strict);
        // if we didn't get a weekday name, mark the date as invalid
        if (weekday != null) {
            week.d = weekday;
        } else {
            getParsingFlags(config).invalidWeekday = input;
        }
    });

    addWeekParseToken(['d', 'e', 'E'], function (input, week, config, token) {
        week[token] = toInt(input);
    });

    // HELPERS

    function parseWeekday(input, locale) {
        if (typeof input !== 'string') {
            return input;
        }

        if (!isNaN(input)) {
            return parseInt(input, 10);
        }

        input = locale.weekdaysParse(input);
        if (typeof input === 'number') {
            return input;
        }

        return null;
    }

    function parseIsoWeekday(input, locale) {
        if (typeof input === 'string') {
            return locale.weekdaysParse(input) % 7 || 7;
        }
        return isNaN(input) ? null : input;
    }

    // LOCALES
    function shiftWeekdays (ws, n) {
        return ws.slice(n, 7).concat(ws.slice(0, n));
    }

    var defaultLocaleWeekdays = 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_');
    function localeWeekdays (m, format) {
        var weekdays = isArray(this._weekdays) ? this._weekdays :
            this._weekdays[(m && m !== true && this._weekdays.isFormat.test(format)) ? 'format' : 'standalone'];
        return (m === true) ? shiftWeekdays(weekdays, this._week.dow)
            : (m) ? weekdays[m.day()] : weekdays;
    }

    var defaultLocaleWeekdaysShort = 'Sun_Mon_Tue_Wed_Thu_Fri_Sat'.split('_');
    function localeWeekdaysShort (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysShort, this._week.dow)
            : (m) ? this._weekdaysShort[m.day()] : this._weekdaysShort;
    }

    var defaultLocaleWeekdaysMin = 'Su_Mo_Tu_We_Th_Fr_Sa'.split('_');
    function localeWeekdaysMin (m) {
        return (m === true) ? shiftWeekdays(this._weekdaysMin, this._week.dow)
            : (m) ? this._weekdaysMin[m.day()] : this._weekdaysMin;
    }

    function handleStrictParse$1(weekdayName, format, strict) {
        var i, ii, mom, llc = weekdayName.toLocaleLowerCase();
        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._minWeekdaysParse = [];

            for (i = 0; i < 7; ++i) {
                mom = createUTC([2000, 1]).day(i);
                this._minWeekdaysParse[i] = this.weekdaysMin(mom, '').toLocaleLowerCase();
                this._shortWeekdaysParse[i] = this.weekdaysShort(mom, '').toLocaleLowerCase();
                this._weekdaysParse[i] = this.weekdays(mom, '').toLocaleLowerCase();
            }
        }

        if (strict) {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        } else {
            if (format === 'dddd') {
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else if (format === 'ddd') {
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._minWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            } else {
                ii = indexOf.call(this._minWeekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._weekdaysParse, llc);
                if (ii !== -1) {
                    return ii;
                }
                ii = indexOf.call(this._shortWeekdaysParse, llc);
                return ii !== -1 ? ii : null;
            }
        }
    }

    function localeWeekdaysParse (weekdayName, format, strict) {
        var i, mom, regex;

        if (this._weekdaysParseExact) {
            return handleStrictParse$1.call(this, weekdayName, format, strict);
        }

        if (!this._weekdaysParse) {
            this._weekdaysParse = [];
            this._minWeekdaysParse = [];
            this._shortWeekdaysParse = [];
            this._fullWeekdaysParse = [];
        }

        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already

            mom = createUTC([2000, 1]).day(i);
            if (strict && !this._fullWeekdaysParse[i]) {
                this._fullWeekdaysParse[i] = new RegExp('^' + this.weekdays(mom, '').replace('.', '\\.?') + '$', 'i');
                this._shortWeekdaysParse[i] = new RegExp('^' + this.weekdaysShort(mom, '').replace('.', '\\.?') + '$', 'i');
                this._minWeekdaysParse[i] = new RegExp('^' + this.weekdaysMin(mom, '').replace('.', '\\.?') + '$', 'i');
            }
            if (!this._weekdaysParse[i]) {
                regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
            }
            // test the regex
            if (strict && format === 'dddd' && this._fullWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'ddd' && this._shortWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (strict && format === 'dd' && this._minWeekdaysParse[i].test(weekdayName)) {
                return i;
            } else if (!strict && this._weekdaysParse[i].test(weekdayName)) {
                return i;
            }
        }
    }

    // MOMENTS

    function getSetDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
        if (input != null) {
            input = parseWeekday(input, this.localeData());
            return this.add(input - day, 'd');
        } else {
            return day;
        }
    }

    function getSetLocaleDayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        var weekday = (this.day() + 7 - this.localeData()._week.dow) % 7;
        return input == null ? weekday : this.add(input - weekday, 'd');
    }

    function getSetISODayOfWeek (input) {
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }

        // behaves the same as moment#day except
        // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
        // as a setter, sunday should belong to the previous week.

        if (input != null) {
            var weekday = parseIsoWeekday(input, this.localeData());
            return this.day(this.day() % 7 ? weekday : weekday - 7);
        } else {
            return this.day() || 7;
        }
    }

    var defaultWeekdaysRegex = matchWord;
    function weekdaysRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysStrictRegex;
            } else {
                return this._weekdaysRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                this._weekdaysRegex = defaultWeekdaysRegex;
            }
            return this._weekdaysStrictRegex && isStrict ?
                this._weekdaysStrictRegex : this._weekdaysRegex;
        }
    }

    var defaultWeekdaysShortRegex = matchWord;
    function weekdaysShortRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysShortStrictRegex;
            } else {
                return this._weekdaysShortRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysShortRegex')) {
                this._weekdaysShortRegex = defaultWeekdaysShortRegex;
            }
            return this._weekdaysShortStrictRegex && isStrict ?
                this._weekdaysShortStrictRegex : this._weekdaysShortRegex;
        }
    }

    var defaultWeekdaysMinRegex = matchWord;
    function weekdaysMinRegex (isStrict) {
        if (this._weekdaysParseExact) {
            if (!hasOwnProp(this, '_weekdaysRegex')) {
                computeWeekdaysParse.call(this);
            }
            if (isStrict) {
                return this._weekdaysMinStrictRegex;
            } else {
                return this._weekdaysMinRegex;
            }
        } else {
            if (!hasOwnProp(this, '_weekdaysMinRegex')) {
                this._weekdaysMinRegex = defaultWeekdaysMinRegex;
            }
            return this._weekdaysMinStrictRegex && isStrict ?
                this._weekdaysMinStrictRegex : this._weekdaysMinRegex;
        }
    }


    function computeWeekdaysParse () {
        function cmpLenRev(a, b) {
            return b.length - a.length;
        }

        var minPieces = [], shortPieces = [], longPieces = [], mixedPieces = [],
            i, mom, minp, shortp, longp;
        for (i = 0; i < 7; i++) {
            // make the regex if we don't have it already
            mom = createUTC([2000, 1]).day(i);
            minp = this.weekdaysMin(mom, '');
            shortp = this.weekdaysShort(mom, '');
            longp = this.weekdays(mom, '');
            minPieces.push(minp);
            shortPieces.push(shortp);
            longPieces.push(longp);
            mixedPieces.push(minp);
            mixedPieces.push(shortp);
            mixedPieces.push(longp);
        }
        // Sorting makes sure if one weekday (or abbr) is a prefix of another it
        // will match the longer piece.
        minPieces.sort(cmpLenRev);
        shortPieces.sort(cmpLenRev);
        longPieces.sort(cmpLenRev);
        mixedPieces.sort(cmpLenRev);
        for (i = 0; i < 7; i++) {
            shortPieces[i] = regexEscape(shortPieces[i]);
            longPieces[i] = regexEscape(longPieces[i]);
            mixedPieces[i] = regexEscape(mixedPieces[i]);
        }

        this._weekdaysRegex = new RegExp('^(' + mixedPieces.join('|') + ')', 'i');
        this._weekdaysShortRegex = this._weekdaysRegex;
        this._weekdaysMinRegex = this._weekdaysRegex;

        this._weekdaysStrictRegex = new RegExp('^(' + longPieces.join('|') + ')', 'i');
        this._weekdaysShortStrictRegex = new RegExp('^(' + shortPieces.join('|') + ')', 'i');
        this._weekdaysMinStrictRegex = new RegExp('^(' + minPieces.join('|') + ')', 'i');
    }

    // FORMATTING

    function hFormat() {
        return this.hours() % 12 || 12;
    }

    function kFormat() {
        return this.hours() || 24;
    }

    addFormatToken('H', ['HH', 2], 0, 'hour');
    addFormatToken('h', ['hh', 2], 0, hFormat);
    addFormatToken('k', ['kk', 2], 0, kFormat);

    addFormatToken('hmm', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2);
    });

    addFormatToken('hmmss', 0, 0, function () {
        return '' + hFormat.apply(this) + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    addFormatToken('Hmm', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2);
    });

    addFormatToken('Hmmss', 0, 0, function () {
        return '' + this.hours() + zeroFill(this.minutes(), 2) +
            zeroFill(this.seconds(), 2);
    });

    function meridiem (token, lowercase) {
        addFormatToken(token, 0, 0, function () {
            return this.localeData().meridiem(this.hours(), this.minutes(), lowercase);
        });
    }

    meridiem('a', true);
    meridiem('A', false);

    // ALIASES

    addUnitAlias('hour', 'h');

    // PRIORITY
    addUnitPriority('hour', 13);

    // PARSING

    function matchMeridiem (isStrict, locale) {
        return locale._meridiemParse;
    }

    addRegexToken('a',  matchMeridiem);
    addRegexToken('A',  matchMeridiem);
    addRegexToken('H',  match1to2);
    addRegexToken('h',  match1to2);
    addRegexToken('k',  match1to2);
    addRegexToken('HH', match1to2, match2);
    addRegexToken('hh', match1to2, match2);
    addRegexToken('kk', match1to2, match2);

    addRegexToken('hmm', match3to4);
    addRegexToken('hmmss', match5to6);
    addRegexToken('Hmm', match3to4);
    addRegexToken('Hmmss', match5to6);

    addParseToken(['H', 'HH'], HOUR);
    addParseToken(['k', 'kk'], function (input, array, config) {
        var kInput = toInt(input);
        array[HOUR] = kInput === 24 ? 0 : kInput;
    });
    addParseToken(['a', 'A'], function (input, array, config) {
        config._isPm = config._locale.isPM(input);
        config._meridiem = input;
    });
    addParseToken(['h', 'hh'], function (input, array, config) {
        array[HOUR] = toInt(input);
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
        getParsingFlags(config).bigHour = true;
    });
    addParseToken('Hmm', function (input, array, config) {
        var pos = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos));
        array[MINUTE] = toInt(input.substr(pos));
    });
    addParseToken('Hmmss', function (input, array, config) {
        var pos1 = input.length - 4;
        var pos2 = input.length - 2;
        array[HOUR] = toInt(input.substr(0, pos1));
        array[MINUTE] = toInt(input.substr(pos1, 2));
        array[SECOND] = toInt(input.substr(pos2));
    });

    // LOCALES

    function localeIsPM (input) {
        // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
        // Using charAt should be more compatible.
        return ((input + '').toLowerCase().charAt(0) === 'p');
    }

    var defaultLocaleMeridiemParse = /[ap]\.?m?\.?/i;
    function localeMeridiem (hours, minutes, isLower) {
        if (hours > 11) {
            return isLower ? 'pm' : 'PM';
        } else {
            return isLower ? 'am' : 'AM';
        }
    }


    // MOMENTS

    // Setting the hour should keep the time, because the user explicitly
    // specified which hour they want. So trying to maintain the same hour (in
    // a new timezone) makes sense. Adding/subtracting hours does not follow
    // this rule.
    var getSetHour = makeGetSet('Hours', true);

    var baseConfig = {
        calendar: defaultCalendar,
        longDateFormat: defaultLongDateFormat,
        invalidDate: defaultInvalidDate,
        ordinal: defaultOrdinal,
        dayOfMonthOrdinalParse: defaultDayOfMonthOrdinalParse,
        relativeTime: defaultRelativeTime,

        months: defaultLocaleMonths,
        monthsShort: defaultLocaleMonthsShort,

        week: defaultLocaleWeek,

        weekdays: defaultLocaleWeekdays,
        weekdaysMin: defaultLocaleWeekdaysMin,
        weekdaysShort: defaultLocaleWeekdaysShort,

        meridiemParse: defaultLocaleMeridiemParse
    };

    // internal storage for locale config files
    var locales = {};
    var localeFamilies = {};
    var globalLocale;

    function normalizeLocale(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    // pick the locale from the array
    // try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
    // substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
    function chooseLocale(names) {
        var i = 0, j, next, locale, split;

        while (i < names.length) {
            split = normalizeLocale(names[i]).split('-');
            j = split.length;
            next = normalizeLocale(names[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                locale = loadLocale(split.slice(0, j).join('-'));
                if (locale) {
                    return locale;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return globalLocale;
    }

    function loadLocale(name) {
        var oldLocale = null;
        // TODO: Find a better way to register and load all the locales in Node
        if (!locales[name] && (typeof module !== 'undefined') &&
                module && module.exports) {
            try {
                oldLocale = globalLocale._abbr;
                var aliasedRequire = require;
                aliasedRequire('./locale/' + name);
                getSetGlobalLocale(oldLocale);
            } catch (e) {}
        }
        return locales[name];
    }

    // This function will load locale and then set the global locale.  If
    // no arguments are passed in, it will simply return the current global
    // locale key.
    function getSetGlobalLocale (key, values) {
        var data;
        if (key) {
            if (isUndefined(values)) {
                data = getLocale(key);
            }
            else {
                data = defineLocale(key, values);
            }

            if (data) {
                // moment.duration._locale = moment._locale = data;
                globalLocale = data;
            }
            else {
                if ((typeof console !==  'undefined') && console.warn) {
                    //warn user if arguments are passed but the locale could not be set
                    console.warn('Locale ' + key +  ' not found. Did you forget to load it?');
                }
            }
        }

        return globalLocale._abbr;
    }

    function defineLocale (name, config) {
        if (config !== null) {
            var locale, parentConfig = baseConfig;
            config.abbr = name;
            if (locales[name] != null) {
                deprecateSimple('defineLocaleOverride',
                        'use moment.updateLocale(localeName, config) to change ' +
                        'an existing locale. moment.defineLocale(localeName, ' +
                        'config) should only be used for creating a new locale ' +
                        'See http://momentjs.com/guides/#/warnings/define-locale/ for more info.');
                parentConfig = locales[name]._config;
            } else if (config.parentLocale != null) {
                if (locales[config.parentLocale] != null) {
                    parentConfig = locales[config.parentLocale]._config;
                } else {
                    locale = loadLocale(config.parentLocale);
                    if (locale != null) {
                        parentConfig = locale._config;
                    } else {
                        if (!localeFamilies[config.parentLocale]) {
                            localeFamilies[config.parentLocale] = [];
                        }
                        localeFamilies[config.parentLocale].push({
                            name: name,
                            config: config
                        });
                        return null;
                    }
                }
            }
            locales[name] = new Locale(mergeConfigs(parentConfig, config));

            if (localeFamilies[name]) {
                localeFamilies[name].forEach(function (x) {
                    defineLocale(x.name, x.config);
                });
            }

            // backwards compat for now: also set the locale
            // make sure we set the locale AFTER all child locales have been
            // created, so we won't end up with the child locale set.
            getSetGlobalLocale(name);


            return locales[name];
        } else {
            // useful for testing
            delete locales[name];
            return null;
        }
    }

    function updateLocale(name, config) {
        if (config != null) {
            var locale, tmpLocale, parentConfig = baseConfig;
            // MERGE
            tmpLocale = loadLocale(name);
            if (tmpLocale != null) {
                parentConfig = tmpLocale._config;
            }
            config = mergeConfigs(parentConfig, config);
            locale = new Locale(config);
            locale.parentLocale = locales[name];
            locales[name] = locale;

            // backwards compat for now: also set the locale
            getSetGlobalLocale(name);
        } else {
            // pass null for config to unupdate, useful for tests
            if (locales[name] != null) {
                if (locales[name].parentLocale != null) {
                    locales[name] = locales[name].parentLocale;
                } else if (locales[name] != null) {
                    delete locales[name];
                }
            }
        }
        return locales[name];
    }

    // returns locale data
    function getLocale (key) {
        var locale;

        if (key && key._locale && key._locale._abbr) {
            key = key._locale._abbr;
        }

        if (!key) {
            return globalLocale;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            locale = loadLocale(key);
            if (locale) {
                return locale;
            }
            key = [key];
        }

        return chooseLocale(key);
    }

    function listLocales() {
        return keys(locales);
    }

    function checkOverflow (m) {
        var overflow;
        var a = m._a;

        if (a && getParsingFlags(m).overflow === -2) {
            overflow =
                a[MONTH]       < 0 || a[MONTH]       > 11  ? MONTH :
                a[DATE]        < 1 || a[DATE]        > daysInMonth(a[YEAR], a[MONTH]) ? DATE :
                a[HOUR]        < 0 || a[HOUR]        > 24 || (a[HOUR] === 24 && (a[MINUTE] !== 0 || a[SECOND] !== 0 || a[MILLISECOND] !== 0)) ? HOUR :
                a[MINUTE]      < 0 || a[MINUTE]      > 59  ? MINUTE :
                a[SECOND]      < 0 || a[SECOND]      > 59  ? SECOND :
                a[MILLISECOND] < 0 || a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (getParsingFlags(m)._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }
            if (getParsingFlags(m)._overflowWeeks && overflow === -1) {
                overflow = WEEK;
            }
            if (getParsingFlags(m)._overflowWeekday && overflow === -1) {
                overflow = WEEKDAY;
            }

            getParsingFlags(m).overflow = overflow;
        }

        return m;
    }

    // Pick the first defined of two or three arguments.
    function defaults(a, b, c) {
        if (a != null) {
            return a;
        }
        if (b != null) {
            return b;
        }
        return c;
    }

    function currentDateArray(config) {
        // hooks is actually the exported moment object
        var nowValue = new Date(hooks.now());
        if (config._useUTC) {
            return [nowValue.getUTCFullYear(), nowValue.getUTCMonth(), nowValue.getUTCDate()];
        }
        return [nowValue.getFullYear(), nowValue.getMonth(), nowValue.getDate()];
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function configFromArray (config) {
        var i, date, input = [], currentDate, expectedWeekday, yearToUse;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            dayOfYearFromWeekInfo(config);
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear != null) {
            yearToUse = defaults(config._a[YEAR], currentDate[YEAR]);

            if (config._dayOfYear > daysInYear(yearToUse) || config._dayOfYear === 0) {
                getParsingFlags(config)._overflowDayOfYear = true;
            }

            date = createUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // Check for 24:00:00.000
        if (config._a[HOUR] === 24 &&
                config._a[MINUTE] === 0 &&
                config._a[SECOND] === 0 &&
                config._a[MILLISECOND] === 0) {
            config._nextDay = true;
            config._a[HOUR] = 0;
        }

        config._d = (config._useUTC ? createUTCDate : createDate).apply(null, input);
        expectedWeekday = config._useUTC ? config._d.getUTCDay() : config._d.getDay();

        // Apply timezone offset from input. The actual utcOffset can be changed
        // with parseZone.
        if (config._tzm != null) {
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);
        }

        if (config._nextDay) {
            config._a[HOUR] = 24;
        }

        // check for mismatching day of week
        if (config._w && typeof config._w.d !== 'undefined' && config._w.d !== expectedWeekday) {
            getParsingFlags(config).weekdayMismatch = true;
        }
    }

    function dayOfYearFromWeekInfo(config) {
        var w, weekYear, week, weekday, dow, doy, temp, weekdayOverflow;

        w = config._w;
        if (w.GG != null || w.W != null || w.E != null) {
            dow = 1;
            doy = 4;

            // TODO: We need to take the current isoWeekYear, but that depends on
            // how we interpret now (local, utc, fixed offset). So create
            // a now version of current config (take local/utc/offset flags, and
            // create now).
            weekYear = defaults(w.GG, config._a[YEAR], weekOfYear(createLocal(), 1, 4).year);
            week = defaults(w.W, 1);
            weekday = defaults(w.E, 1);
            if (weekday < 1 || weekday > 7) {
                weekdayOverflow = true;
            }
        } else {
            dow = config._locale._week.dow;
            doy = config._locale._week.doy;

            var curWeek = weekOfYear(createLocal(), dow, doy);

            weekYear = defaults(w.gg, config._a[YEAR], curWeek.year);

            // Default to current week.
            week = defaults(w.w, curWeek.week);

            if (w.d != null) {
                // weekday -- low day numbers are considered next week
                weekday = w.d;
                if (weekday < 0 || weekday > 6) {
                    weekdayOverflow = true;
                }
            } else if (w.e != null) {
                // local weekday -- counting starts from beginning of week
                weekday = w.e + dow;
                if (w.e < 0 || w.e > 6) {
                    weekdayOverflow = true;
                }
            } else {
                // default to beginning of week
                weekday = dow;
            }
        }
        if (week < 1 || week > weeksInYear(weekYear, dow, doy)) {
            getParsingFlags(config)._overflowWeeks = true;
        } else if (weekdayOverflow != null) {
            getParsingFlags(config)._overflowWeekday = true;
        } else {
            temp = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy);
            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }
    }

    // iso 8601 regex
    // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000 or +00)
    var extendedIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;
    var basicIsoRegex = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/;

    var tzRegex = /Z|[+-]\d\d(?::?\d\d)?/;

    var isoDates = [
        ['YYYYYY-MM-DD', /[+-]\d{6}-\d\d-\d\d/],
        ['YYYY-MM-DD', /\d{4}-\d\d-\d\d/],
        ['GGGG-[W]WW-E', /\d{4}-W\d\d-\d/],
        ['GGGG-[W]WW', /\d{4}-W\d\d/, false],
        ['YYYY-DDD', /\d{4}-\d{3}/],
        ['YYYY-MM', /\d{4}-\d\d/, false],
        ['YYYYYYMMDD', /[+-]\d{10}/],
        ['YYYYMMDD', /\d{8}/],
        // YYYYMM is NOT allowed by the standard
        ['GGGG[W]WWE', /\d{4}W\d{3}/],
        ['GGGG[W]WW', /\d{4}W\d{2}/, false],
        ['YYYYDDD', /\d{7}/]
    ];

    // iso time formats and regexes
    var isoTimes = [
        ['HH:mm:ss.SSSS', /\d\d:\d\d:\d\d\.\d+/],
        ['HH:mm:ss,SSSS', /\d\d:\d\d:\d\d,\d+/],
        ['HH:mm:ss', /\d\d:\d\d:\d\d/],
        ['HH:mm', /\d\d:\d\d/],
        ['HHmmss.SSSS', /\d\d\d\d\d\d\.\d+/],
        ['HHmmss,SSSS', /\d\d\d\d\d\d,\d+/],
        ['HHmmss', /\d\d\d\d\d\d/],
        ['HHmm', /\d\d\d\d/],
        ['HH', /\d\d/]
    ];

    var aspNetJsonRegex = /^\/?Date\((\-?\d+)/i;

    // date from iso format
    function configFromISO(config) {
        var i, l,
            string = config._i,
            match = extendedIsoRegex.exec(string) || basicIsoRegex.exec(string),
            allowTime, dateFormat, timeFormat, tzFormat;

        if (match) {
            getParsingFlags(config).iso = true;

            for (i = 0, l = isoDates.length; i < l; i++) {
                if (isoDates[i][1].exec(match[1])) {
                    dateFormat = isoDates[i][0];
                    allowTime = isoDates[i][2] !== false;
                    break;
                }
            }
            if (dateFormat == null) {
                config._isValid = false;
                return;
            }
            if (match[3]) {
                for (i = 0, l = isoTimes.length; i < l; i++) {
                    if (isoTimes[i][1].exec(match[3])) {
                        // match[2] should be 'T' or space
                        timeFormat = (match[2] || ' ') + isoTimes[i][0];
                        break;
                    }
                }
                if (timeFormat == null) {
                    config._isValid = false;
                    return;
                }
            }
            if (!allowTime && timeFormat != null) {
                config._isValid = false;
                return;
            }
            if (match[4]) {
                if (tzRegex.exec(match[4])) {
                    tzFormat = 'Z';
                } else {
                    config._isValid = false;
                    return;
                }
            }
            config._f = dateFormat + (timeFormat || '') + (tzFormat || '');
            configFromStringAndFormat(config);
        } else {
            config._isValid = false;
        }
    }

    // RFC 2822 regex: For details see https://tools.ietf.org/html/rfc2822#section-3.3
    var rfc2822 = /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),?\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|([+-]\d{4}))$/;

    function extractFromRFC2822Strings(yearStr, monthStr, dayStr, hourStr, minuteStr, secondStr) {
        var result = [
            untruncateYear(yearStr),
            defaultLocaleMonthsShort.indexOf(monthStr),
            parseInt(dayStr, 10),
            parseInt(hourStr, 10),
            parseInt(minuteStr, 10)
        ];

        if (secondStr) {
            result.push(parseInt(secondStr, 10));
        }

        return result;
    }

    function untruncateYear(yearStr) {
        var year = parseInt(yearStr, 10);
        if (year <= 49) {
            return 2000 + year;
        } else if (year <= 999) {
            return 1900 + year;
        }
        return year;
    }

    function preprocessRFC2822(s) {
        // Remove comments and folding whitespace and replace multiple-spaces with a single space
        return s.replace(/\([^)]*\)|[\n\t]/g, ' ').replace(/(\s\s+)/g, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }

    function checkWeekday(weekdayStr, parsedInput, config) {
        if (weekdayStr) {
            // TODO: Replace the vanilla JS Date object with an indepentent day-of-week check.
            var weekdayProvided = defaultLocaleWeekdaysShort.indexOf(weekdayStr),
                weekdayActual = new Date(parsedInput[0], parsedInput[1], parsedInput[2]).getDay();
            if (weekdayProvided !== weekdayActual) {
                getParsingFlags(config).weekdayMismatch = true;
                config._isValid = false;
                return false;
            }
        }
        return true;
    }

    var obsOffsets = {
        UT: 0,
        GMT: 0,
        EDT: -4 * 60,
        EST: -5 * 60,
        CDT: -5 * 60,
        CST: -6 * 60,
        MDT: -6 * 60,
        MST: -7 * 60,
        PDT: -7 * 60,
        PST: -8 * 60
    };

    function calculateOffset(obsOffset, militaryOffset, numOffset) {
        if (obsOffset) {
            return obsOffsets[obsOffset];
        } else if (militaryOffset) {
            // the only allowed military tz is Z
            return 0;
        } else {
            var hm = parseInt(numOffset, 10);
            var m = hm % 100, h = (hm - m) / 100;
            return h * 60 + m;
        }
    }

    // date and time from ref 2822 format
    function configFromRFC2822(config) {
        var match = rfc2822.exec(preprocessRFC2822(config._i));
        if (match) {
            var parsedArray = extractFromRFC2822Strings(match[4], match[3], match[2], match[5], match[6], match[7]);
            if (!checkWeekday(match[1], parsedArray, config)) {
                return;
            }

            config._a = parsedArray;
            config._tzm = calculateOffset(match[8], match[9], match[10]);

            config._d = createUTCDate.apply(null, config._a);
            config._d.setUTCMinutes(config._d.getUTCMinutes() - config._tzm);

            getParsingFlags(config).rfc2822 = true;
        } else {
            config._isValid = false;
        }
    }

    // date from iso format or fallback
    function configFromString(config) {
        var matched = aspNetJsonRegex.exec(config._i);

        if (matched !== null) {
            config._d = new Date(+matched[1]);
            return;
        }

        configFromISO(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        configFromRFC2822(config);
        if (config._isValid === false) {
            delete config._isValid;
        } else {
            return;
        }

        // Final attempt, use Input Fallback
        hooks.createFromInputFallback(config);
    }

    hooks.createFromInputFallback = deprecate(
        'value provided is not in a recognized RFC2822 or ISO format. moment construction falls back to js Date(), ' +
        'which is not reliable across all browsers and versions. Non RFC2822/ISO date formats are ' +
        'discouraged and will be removed in an upcoming major release. Please refer to ' +
        'http://momentjs.com/guides/#/warnings/js-date/ for more info.',
        function (config) {
            config._d = new Date(config._i + (config._useUTC ? ' UTC' : ''));
        }
    );

    // constant that refers to the ISO standard
    hooks.ISO_8601 = function () {};

    // constant that refers to the RFC 2822 form
    hooks.RFC_2822 = function () {};

    // date from string and format string
    function configFromStringAndFormat(config) {
        // TODO: Move this to another part of the creation flow to prevent circular deps
        if (config._f === hooks.ISO_8601) {
            configFromISO(config);
            return;
        }
        if (config._f === hooks.RFC_2822) {
            configFromRFC2822(config);
            return;
        }
        config._a = [];
        getParsingFlags(config).empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, config._locale).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (string.match(getParseRegexForToken(token, config)) || [])[0];
            // console.log('token', token, 'parsedInput', parsedInput,
            //         'regex', getParseRegexForToken(token, config));
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    getParsingFlags(config).unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    getParsingFlags(config).empty = false;
                }
                else {
                    getParsingFlags(config).unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                getParsingFlags(config).unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        getParsingFlags(config).charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            getParsingFlags(config).unusedInput.push(string);
        }

        // clear _12h flag if hour is <= 12
        if (config._a[HOUR] <= 12 &&
            getParsingFlags(config).bigHour === true &&
            config._a[HOUR] > 0) {
            getParsingFlags(config).bigHour = undefined;
        }

        getParsingFlags(config).parsedDateParts = config._a.slice(0);
        getParsingFlags(config).meridiem = config._meridiem;
        // handle meridiem
        config._a[HOUR] = meridiemFixWrap(config._locale, config._a[HOUR], config._meridiem);

        configFromArray(config);
        checkOverflow(config);
    }


    function meridiemFixWrap (locale, hour, meridiem) {
        var isPm;

        if (meridiem == null) {
            // nothing to do
            return hour;
        }
        if (locale.meridiemHour != null) {
            return locale.meridiemHour(hour, meridiem);
        } else if (locale.isPM != null) {
            // Fallback
            isPm = locale.isPM(meridiem);
            if (isPm && hour < 12) {
                hour += 12;
            }
            if (!isPm && hour === 12) {
                hour = 0;
            }
            return hour;
        } else {
            // this is not supposed to happen
            return hour;
        }
    }

    // date from string and array of format strings
    function configFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            getParsingFlags(config).invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = copyConfig({}, config);
            if (config._useUTC != null) {
                tempConfig._useUTC = config._useUTC;
            }
            tempConfig._f = config._f[i];
            configFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += getParsingFlags(tempConfig).charsLeftOver;

            //or tokens
            currentScore += getParsingFlags(tempConfig).unusedTokens.length * 10;

            getParsingFlags(tempConfig).score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    function configFromObject(config) {
        if (config._d) {
            return;
        }

        var i = normalizeObjectUnits(config._i);
        config._a = map([i.year, i.month, i.day || i.date, i.hour, i.minute, i.second, i.millisecond], function (obj) {
            return obj && parseInt(obj, 10);
        });

        configFromArray(config);
    }

    function createFromConfig (config) {
        var res = new Moment(checkOverflow(prepareConfig(config)));
        if (res._nextDay) {
            // Adding is smart enough around DST
            res.add(1, 'd');
            res._nextDay = undefined;
        }

        return res;
    }

    function prepareConfig (config) {
        var input = config._i,
            format = config._f;

        config._locale = config._locale || getLocale(config._l);

        if (input === null || (format === undefined && input === '')) {
            return createInvalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = config._locale.preparse(input);
        }

        if (isMoment(input)) {
            return new Moment(checkOverflow(input));
        } else if (isDate(input)) {
            config._d = input;
        } else if (isArray(format)) {
            configFromStringAndArray(config);
        } else if (format) {
            configFromStringAndFormat(config);
        }  else {
            configFromInput(config);
        }

        if (!isValid(config)) {
            config._d = null;
        }

        return config;
    }

    function configFromInput(config) {
        var input = config._i;
        if (isUndefined(input)) {
            config._d = new Date(hooks.now());
        } else if (isDate(input)) {
            config._d = new Date(input.valueOf());
        } else if (typeof input === 'string') {
            configFromString(config);
        } else if (isArray(input)) {
            config._a = map(input.slice(0), function (obj) {
                return parseInt(obj, 10);
            });
            configFromArray(config);
        } else if (isObject(input)) {
            configFromObject(config);
        } else if (isNumber(input)) {
            // from milliseconds
            config._d = new Date(input);
        } else {
            hooks.createFromInputFallback(config);
        }
    }

    function createLocalOrUTC (input, format, locale, strict, isUTC) {
        var c = {};

        if (locale === true || locale === false) {
            strict = locale;
            locale = undefined;
        }

        if ((isObject(input) && isObjectEmpty(input)) ||
                (isArray(input) && input.length === 0)) {
            input = undefined;
        }
        // object construction must be done this way.
        // https://github.com/moment/moment/issues/1423
        c._isAMomentObject = true;
        c._useUTC = c._isUTC = isUTC;
        c._l = locale;
        c._i = input;
        c._f = format;
        c._strict = strict;

        return createFromConfig(c);
    }

    function createLocal (input, format, locale, strict) {
        return createLocalOrUTC(input, format, locale, strict, false);
    }

    var prototypeMin = deprecate(
        'moment().min is deprecated, use moment.max instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other < this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    var prototypeMax = deprecate(
        'moment().max is deprecated, use moment.min instead. http://momentjs.com/guides/#/warnings/min-max/',
        function () {
            var other = createLocal.apply(null, arguments);
            if (this.isValid() && other.isValid()) {
                return other > this ? this : other;
            } else {
                return createInvalid();
            }
        }
    );

    // Pick a moment m from moments so that m[fn](other) is true for all
    // other. This relies on the function fn to be transitive.
    //
    // moments should either be an array of moment objects or an array, whose
    // first element is an array of moment objects.
    function pickBy(fn, moments) {
        var res, i;
        if (moments.length === 1 && isArray(moments[0])) {
            moments = moments[0];
        }
        if (!moments.length) {
            return createLocal();
        }
        res = moments[0];
        for (i = 1; i < moments.length; ++i) {
            if (!moments[i].isValid() || moments[i][fn](res)) {
                res = moments[i];
            }
        }
        return res;
    }

    // TODO: Use [].sort instead?
    function min () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isBefore', args);
    }

    function max () {
        var args = [].slice.call(arguments, 0);

        return pickBy('isAfter', args);
    }

    var now = function () {
        return Date.now ? Date.now() : +(new Date());
    };

    var ordering = ['year', 'quarter', 'month', 'week', 'day', 'hour', 'minute', 'second', 'millisecond'];

    function isDurationValid(m) {
        for (var key in m) {
            if (!(indexOf.call(ordering, key) !== -1 && (m[key] == null || !isNaN(m[key])))) {
                return false;
            }
        }

        var unitHasDecimal = false;
        for (var i = 0; i < ordering.length; ++i) {
            if (m[ordering[i]]) {
                if (unitHasDecimal) {
                    return false; // only allow non-integers for smallest unit
                }
                if (parseFloat(m[ordering[i]]) !== toInt(m[ordering[i]])) {
                    unitHasDecimal = true;
                }
            }
        }

        return true;
    }

    function isValid$1() {
        return this._isValid;
    }

    function createInvalid$1() {
        return createDuration(NaN);
    }

    function Duration (duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            quarters = normalizedInput.quarter || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || normalizedInput.isoWeek || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        this._isValid = isDurationValid(normalizedInput);

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 1000 * 60 * 60; //using 1000 * 60 * 60 instead of 36e5 to avoid floating point rounding errors https://github.com/moment/moment/issues/2978
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible to translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            quarters * 3 +
            years * 12;

        this._data = {};

        this._locale = getLocale();

        this._bubble();
    }

    function isDuration (obj) {
        return obj instanceof Duration;
    }

    function absRound (number) {
        if (number < 0) {
            return Math.round(-1 * number) * -1;
        } else {
            return Math.round(number);
        }
    }

    // FORMATTING

    function offset (token, separator) {
        addFormatToken(token, 0, 0, function () {
            var offset = this.utcOffset();
            var sign = '+';
            if (offset < 0) {
                offset = -offset;
                sign = '-';
            }
            return sign + zeroFill(~~(offset / 60), 2) + separator + zeroFill(~~(offset) % 60, 2);
        });
    }

    offset('Z', ':');
    offset('ZZ', '');

    // PARSING

    addRegexToken('Z',  matchShortOffset);
    addRegexToken('ZZ', matchShortOffset);
    addParseToken(['Z', 'ZZ'], function (input, array, config) {
        config._useUTC = true;
        config._tzm = offsetFromString(matchShortOffset, input);
    });

    // HELPERS

    // timezone chunker
    // '+10:00' > ['10',  '00']
    // '-1530'  > ['-15', '30']
    var chunkOffset = /([\+\-]|\d\d)/gi;

    function offsetFromString(matcher, string) {
        var matches = (string || '').match(matcher);

        if (matches === null) {
            return null;
        }

        var chunk   = matches[matches.length - 1] || [];
        var parts   = (chunk + '').match(chunkOffset) || ['-', 0, 0];
        var minutes = +(parts[1] * 60) + toInt(parts[2]);

        return minutes === 0 ?
          0 :
          parts[0] === '+' ? minutes : -minutes;
    }

    // Return a moment from input, that is local/utc/zone equivalent to model.
    function cloneWithOffset(input, model) {
        var res, diff;
        if (model._isUTC) {
            res = model.clone();
            diff = (isMoment(input) || isDate(input) ? input.valueOf() : createLocal(input).valueOf()) - res.valueOf();
            // Use low-level api, because this fn is low-level api.
            res._d.setTime(res._d.valueOf() + diff);
            hooks.updateOffset(res, false);
            return res;
        } else {
            return createLocal(input).local();
        }
    }

    function getDateOffset (m) {
        // On Firefox.24 Date#getTimezoneOffset returns a floating point.
        // https://github.com/moment/moment/pull/1871
        return -Math.round(m._d.getTimezoneOffset() / 15) * 15;
    }

    // HOOKS

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    hooks.updateOffset = function () {};

    // MOMENTS

    // keepLocalTime = true means only change the timezone, without
    // affecting the local hour. So 5:31:26 +0300 --[utcOffset(2, true)]-->
    // 5:31:26 +0200 It is possible that 5:31:26 doesn't exist with offset
    // +0200, so we adjust the time as needed, to be valid.
    //
    // Keeping the time actually adds/subtracts (one hour)
    // from the actual represented time. That is why we call updateOffset
    // a second time. In case it wants us to change the offset again
    // _changeInProgress == true case, then we have to adjust, because
    // there is no such time in the given timezone.
    function getSetOffset (input, keepLocalTime, keepMinutes) {
        var offset = this._offset || 0,
            localAdjust;
        if (!this.isValid()) {
            return input != null ? this : NaN;
        }
        if (input != null) {
            if (typeof input === 'string') {
                input = offsetFromString(matchShortOffset, input);
                if (input === null) {
                    return this;
                }
            } else if (Math.abs(input) < 16 && !keepMinutes) {
                input = input * 60;
            }
            if (!this._isUTC && keepLocalTime) {
                localAdjust = getDateOffset(this);
            }
            this._offset = input;
            this._isUTC = true;
            if (localAdjust != null) {
                this.add(localAdjust, 'm');
            }
            if (offset !== input) {
                if (!keepLocalTime || this._changeInProgress) {
                    addSubtract(this, createDuration(input - offset, 'm'), 1, false);
                } else if (!this._changeInProgress) {
                    this._changeInProgress = true;
                    hooks.updateOffset(this, true);
                    this._changeInProgress = null;
                }
            }
            return this;
        } else {
            return this._isUTC ? offset : getDateOffset(this);
        }
    }

    function getSetZone (input, keepLocalTime) {
        if (input != null) {
            if (typeof input !== 'string') {
                input = -input;
            }

            this.utcOffset(input, keepLocalTime);

            return this;
        } else {
            return -this.utcOffset();
        }
    }

    function setOffsetToUTC (keepLocalTime) {
        return this.utcOffset(0, keepLocalTime);
    }

    function setOffsetToLocal (keepLocalTime) {
        if (this._isUTC) {
            this.utcOffset(0, keepLocalTime);
            this._isUTC = false;

            if (keepLocalTime) {
                this.subtract(getDateOffset(this), 'm');
            }
        }
        return this;
    }

    function setOffsetToParsedOffset () {
        if (this._tzm != null) {
            this.utcOffset(this._tzm, false, true);
        } else if (typeof this._i === 'string') {
            var tZone = offsetFromString(matchOffset, this._i);
            if (tZone != null) {
                this.utcOffset(tZone);
            }
            else {
                this.utcOffset(0, true);
            }
        }
        return this;
    }

    function hasAlignedHourOffset (input) {
        if (!this.isValid()) {
            return false;
        }
        input = input ? createLocal(input).utcOffset() : 0;

        return (this.utcOffset() - input) % 60 === 0;
    }

    function isDaylightSavingTime () {
        return (
            this.utcOffset() > this.clone().month(0).utcOffset() ||
            this.utcOffset() > this.clone().month(5).utcOffset()
        );
    }

    function isDaylightSavingTimeShifted () {
        if (!isUndefined(this._isDSTShifted)) {
            return this._isDSTShifted;
        }

        var c = {};

        copyConfig(c, this);
        c = prepareConfig(c);

        if (c._a) {
            var other = c._isUTC ? createUTC(c._a) : createLocal(c._a);
            this._isDSTShifted = this.isValid() &&
                compareArrays(c._a, other.toArray()) > 0;
        } else {
            this._isDSTShifted = false;
        }

        return this._isDSTShifted;
    }

    function isLocal () {
        return this.isValid() ? !this._isUTC : false;
    }

    function isUtcOffset () {
        return this.isValid() ? this._isUTC : false;
    }

    function isUtc () {
        return this.isValid() ? this._isUTC && this._offset === 0 : false;
    }

    // ASP.NET json date format regex
    var aspNetRegex = /^(\-|\+)?(?:(\d*)[. ])?(\d+)\:(\d+)(?:\:(\d+)(\.\d*)?)?$/;

    // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
    // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
    // and further modified to allow for strings containing both week and day
    var isoRegex = /^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/;

    function createDuration (input, key) {
        var duration = input,
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            diffRes;

        if (isDuration(input)) {
            duration = {
                ms : input._milliseconds,
                d  : input._days,
                M  : input._months
            };
        } else if (isNumber(input)) {
            duration = {};
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y  : 0,
                d  : toInt(match[DATE])                         * sign,
                h  : toInt(match[HOUR])                         * sign,
                m  : toInt(match[MINUTE])                       * sign,
                s  : toInt(match[SECOND])                       * sign,
                ms : toInt(absRound(match[MILLISECOND] * 1000)) * sign // the millisecond decimal point is included in the match
            };
        } else if (!!(match = isoRegex.exec(input))) {
            sign = (match[1] === '-') ? -1 : 1;
            duration = {
                y : parseIso(match[2], sign),
                M : parseIso(match[3], sign),
                w : parseIso(match[4], sign),
                d : parseIso(match[5], sign),
                h : parseIso(match[6], sign),
                m : parseIso(match[7], sign),
                s : parseIso(match[8], sign)
            };
        } else if (duration == null) {// checks for null or undefined
            duration = {};
        } else if (typeof duration === 'object' && ('from' in duration || 'to' in duration)) {
            diffRes = momentsDifference(createLocal(duration.from), createLocal(duration.to));

            duration = {};
            duration.ms = diffRes.milliseconds;
            duration.M = diffRes.months;
        }

        ret = new Duration(duration);

        if (isDuration(input) && hasOwnProp(input, '_locale')) {
            ret._locale = input._locale;
        }

        return ret;
    }

    createDuration.fn = Duration.prototype;
    createDuration.invalid = createInvalid$1;

    function parseIso (inp, sign) {
        // We'd normally use ~~inp for this, but unfortunately it also
        // converts floats to ints.
        // inp may be undefined, so careful calling replace on it.
        var res = inp && parseFloat(inp.replace(',', '.'));
        // apply sign while we're at it
        return (isNaN(res) ? 0 : res) * sign;
    }

    function positiveMomentsDifference(base, other) {
        var res = {};

        res.months = other.month() - base.month() +
            (other.year() - base.year()) * 12;
        if (base.clone().add(res.months, 'M').isAfter(other)) {
            --res.months;
        }

        res.milliseconds = +other - +(base.clone().add(res.months, 'M'));

        return res;
    }

    function momentsDifference(base, other) {
        var res;
        if (!(base.isValid() && other.isValid())) {
            return {milliseconds: 0, months: 0};
        }

        other = cloneWithOffset(other, base);
        if (base.isBefore(other)) {
            res = positiveMomentsDifference(base, other);
        } else {
            res = positiveMomentsDifference(other, base);
            res.milliseconds = -res.milliseconds;
            res.months = -res.months;
        }

        return res;
    }

    // TODO: remove 'name' arg after deprecation is removed
    function createAdder(direction, name) {
        return function (val, period) {
            var dur, tmp;
            //invert the arguments, but complain about it
            if (period !== null && !isNaN(+period)) {
                deprecateSimple(name, 'moment().' + name  + '(period, number) is deprecated. Please use moment().' + name + '(number, period). ' +
                'See http://momentjs.com/guides/#/warnings/add-inverted-param/ for more info.');
                tmp = val; val = period; period = tmp;
            }

            val = typeof val === 'string' ? +val : val;
            dur = createDuration(val, period);
            addSubtract(this, dur, direction);
            return this;
        };
    }

    function addSubtract (mom, duration, isAdding, updateOffset) {
        var milliseconds = duration._milliseconds,
            days = absRound(duration._days),
            months = absRound(duration._months);

        if (!mom.isValid()) {
            // No op
            return;
        }

        updateOffset = updateOffset == null ? true : updateOffset;

        if (months) {
            setMonth(mom, get(mom, 'Month') + months * isAdding);
        }
        if (days) {
            set$1(mom, 'Date', get(mom, 'Date') + days * isAdding);
        }
        if (milliseconds) {
            mom._d.setTime(mom._d.valueOf() + milliseconds * isAdding);
        }
        if (updateOffset) {
            hooks.updateOffset(mom, days || months);
        }
    }

    var add      = createAdder(1, 'add');
    var subtract = createAdder(-1, 'subtract');

    function getCalendarFormat(myMoment, now) {
        var diff = myMoment.diff(now, 'days', true);
        return diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
    }

    function calendar$1 (time, formats) {
        // We want to compare the start of today, vs this.
        // Getting start-of-today depends on whether we're local/utc/offset or not.
        var now = time || createLocal(),
            sod = cloneWithOffset(now, this).startOf('day'),
            format = hooks.calendarFormat(this, sod) || 'sameElse';

        var output = formats && (isFunction(formats[format]) ? formats[format].call(this, now) : formats[format]);

        return this.format(output || this.localeData().calendar(format, this, createLocal(now)));
    }

    function clone () {
        return new Moment(this);
    }

    function isAfter (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() > localInput.valueOf();
        } else {
            return localInput.valueOf() < this.clone().startOf(units).valueOf();
        }
    }

    function isBefore (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input);
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() < localInput.valueOf();
        } else {
            return this.clone().endOf(units).valueOf() < localInput.valueOf();
        }
    }

    function isBetween (from, to, units, inclusivity) {
        var localFrom = isMoment(from) ? from : createLocal(from),
            localTo = isMoment(to) ? to : createLocal(to);
        if (!(this.isValid() && localFrom.isValid() && localTo.isValid())) {
            return false;
        }
        inclusivity = inclusivity || '()';
        return (inclusivity[0] === '(' ? this.isAfter(localFrom, units) : !this.isBefore(localFrom, units)) &&
            (inclusivity[1] === ')' ? this.isBefore(localTo, units) : !this.isAfter(localTo, units));
    }

    function isSame (input, units) {
        var localInput = isMoment(input) ? input : createLocal(input),
            inputMs;
        if (!(this.isValid() && localInput.isValid())) {
            return false;
        }
        units = normalizeUnits(units) || 'millisecond';
        if (units === 'millisecond') {
            return this.valueOf() === localInput.valueOf();
        } else {
            inputMs = localInput.valueOf();
            return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
        }
    }

    function isSameOrAfter (input, units) {
        return this.isSame(input, units) || this.isAfter(input, units);
    }

    function isSameOrBefore (input, units) {
        return this.isSame(input, units) || this.isBefore(input, units);
    }

    function diff (input, units, asFloat) {
        var that,
            zoneDelta,
            output;

        if (!this.isValid()) {
            return NaN;
        }

        that = cloneWithOffset(input, this);

        if (!that.isValid()) {
            return NaN;
        }

        zoneDelta = (that.utcOffset() - this.utcOffset()) * 6e4;

        units = normalizeUnits(units);

        switch (units) {
            case 'year': output = monthDiff(this, that) / 12; break;
            case 'month': output = monthDiff(this, that); break;
            case 'quarter': output = monthDiff(this, that) / 3; break;
            case 'second': output = (this - that) / 1e3; break; // 1000
            case 'minute': output = (this - that) / 6e4; break; // 1000 * 60
            case 'hour': output = (this - that) / 36e5; break; // 1000 * 60 * 60
            case 'day': output = (this - that - zoneDelta) / 864e5; break; // 1000 * 60 * 60 * 24, negate dst
            case 'week': output = (this - that - zoneDelta) / 6048e5; break; // 1000 * 60 * 60 * 24 * 7, negate dst
            default: output = this - that;
        }

        return asFloat ? output : absFloor(output);
    }

    function monthDiff (a, b) {
        // difference in months
        var wholeMonthDiff = ((b.year() - a.year()) * 12) + (b.month() - a.month()),
            // b is in (anchor - 1 month, anchor + 1 month)
            anchor = a.clone().add(wholeMonthDiff, 'months'),
            anchor2, adjust;

        if (b - anchor < 0) {
            anchor2 = a.clone().add(wholeMonthDiff - 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor - anchor2);
        } else {
            anchor2 = a.clone().add(wholeMonthDiff + 1, 'months');
            // linear across the month
            adjust = (b - anchor) / (anchor2 - anchor);
        }

        //check for negative zero, return zero if negative zero
        return -(wholeMonthDiff + adjust) || 0;
    }

    hooks.defaultFormat = 'YYYY-MM-DDTHH:mm:ssZ';
    hooks.defaultFormatUtc = 'YYYY-MM-DDTHH:mm:ss[Z]';

    function toString () {
        return this.clone().locale('en').format('ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
    }

    function toISOString(keepOffset) {
        if (!this.isValid()) {
            return null;
        }
        var utc = keepOffset !== true;
        var m = utc ? this.clone().utc() : this;
        if (m.year() < 0 || m.year() > 9999) {
            return formatMoment(m, utc ? 'YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYYYY-MM-DD[T]HH:mm:ss.SSSZ');
        }
        if (isFunction(Date.prototype.toISOString)) {
            // native implementation is ~50x faster, use it when we can
            if (utc) {
                return this.toDate().toISOString();
            } else {
                return new Date(this.valueOf() + this.utcOffset() * 60 * 1000).toISOString().replace('Z', formatMoment(m, 'Z'));
            }
        }
        return formatMoment(m, utc ? 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]' : 'YYYY-MM-DD[T]HH:mm:ss.SSSZ');
    }

    /**
     * Return a human readable representation of a moment that can
     * also be evaluated to get a new moment which is the same
     *
     * @link https://nodejs.org/dist/latest/docs/api/util.html#util_custom_inspect_function_on_objects
     */
    function inspect () {
        if (!this.isValid()) {
            return 'moment.invalid(/* ' + this._i + ' */)';
        }
        var func = 'moment';
        var zone = '';
        if (!this.isLocal()) {
            func = this.utcOffset() === 0 ? 'moment.utc' : 'moment.parseZone';
            zone = 'Z';
        }
        var prefix = '[' + func + '("]';
        var year = (0 <= this.year() && this.year() <= 9999) ? 'YYYY' : 'YYYYYY';
        var datetime = '-MM-DD[T]HH:mm:ss.SSS';
        var suffix = zone + '[")]';

        return this.format(prefix + year + datetime + suffix);
    }

    function format (inputString) {
        if (!inputString) {
            inputString = this.isUtc() ? hooks.defaultFormatUtc : hooks.defaultFormat;
        }
        var output = formatMoment(this, inputString);
        return this.localeData().postformat(output);
    }

    function from (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({to: this, from: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function fromNow (withoutSuffix) {
        return this.from(createLocal(), withoutSuffix);
    }

    function to (time, withoutSuffix) {
        if (this.isValid() &&
                ((isMoment(time) && time.isValid()) ||
                 createLocal(time).isValid())) {
            return createDuration({from: this, to: time}).locale(this.locale()).humanize(!withoutSuffix);
        } else {
            return this.localeData().invalidDate();
        }
    }

    function toNow (withoutSuffix) {
        return this.to(createLocal(), withoutSuffix);
    }

    // If passed a locale key, it will set the locale for this
    // instance.  Otherwise, it will return the locale configuration
    // variables for this instance.
    function locale (key) {
        var newLocaleData;

        if (key === undefined) {
            return this._locale._abbr;
        } else {
            newLocaleData = getLocale(key);
            if (newLocaleData != null) {
                this._locale = newLocaleData;
            }
            return this;
        }
    }

    var lang = deprecate(
        'moment().lang() is deprecated. Instead, use moment().localeData() to get the language configuration. Use moment().locale() to change languages.',
        function (key) {
            if (key === undefined) {
                return this.localeData();
            } else {
                return this.locale(key);
            }
        }
    );

    function localeData () {
        return this._locale;
    }

    var MS_PER_SECOND = 1000;
    var MS_PER_MINUTE = 60 * MS_PER_SECOND;
    var MS_PER_HOUR = 60 * MS_PER_MINUTE;
    var MS_PER_400_YEARS = (365 * 400 + 97) * 24 * MS_PER_HOUR;

    // actual modulo - handles negative numbers (for dates before 1970):
    function mod$1(dividend, divisor) {
        return (dividend % divisor + divisor) % divisor;
    }

    function localStartOfDate(y, m, d) {
        // the date constructor remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return new Date(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return new Date(y, m, d).valueOf();
        }
    }

    function utcStartOfDate(y, m, d) {
        // Date.UTC remaps years 0-99 to 1900-1999
        if (y < 100 && y >= 0) {
            // preserve leap years using a full 400 year cycle, then reset
            return Date.UTC(y + 400, m, d) - MS_PER_400_YEARS;
        } else {
            return Date.UTC(y, m, d);
        }
    }

    function startOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year(), 0, 1);
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3, 1);
                break;
            case 'month':
                time = startOfDate(this.year(), this.month(), 1);
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday());
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1));
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date());
                break;
            case 'hour':
                time = this._d.valueOf();
                time -= mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR);
                break;
            case 'minute':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_MINUTE);
                break;
            case 'second':
                time = this._d.valueOf();
                time -= mod$1(time, MS_PER_SECOND);
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function endOf (units) {
        var time;
        units = normalizeUnits(units);
        if (units === undefined || units === 'millisecond' || !this.isValid()) {
            return this;
        }

        var startOfDate = this._isUTC ? utcStartOfDate : localStartOfDate;

        switch (units) {
            case 'year':
                time = startOfDate(this.year() + 1, 0, 1) - 1;
                break;
            case 'quarter':
                time = startOfDate(this.year(), this.month() - this.month() % 3 + 3, 1) - 1;
                break;
            case 'month':
                time = startOfDate(this.year(), this.month() + 1, 1) - 1;
                break;
            case 'week':
                time = startOfDate(this.year(), this.month(), this.date() - this.weekday() + 7) - 1;
                break;
            case 'isoWeek':
                time = startOfDate(this.year(), this.month(), this.date() - (this.isoWeekday() - 1) + 7) - 1;
                break;
            case 'day':
            case 'date':
                time = startOfDate(this.year(), this.month(), this.date() + 1) - 1;
                break;
            case 'hour':
                time = this._d.valueOf();
                time += MS_PER_HOUR - mod$1(time + (this._isUTC ? 0 : this.utcOffset() * MS_PER_MINUTE), MS_PER_HOUR) - 1;
                break;
            case 'minute':
                time = this._d.valueOf();
                time += MS_PER_MINUTE - mod$1(time, MS_PER_MINUTE) - 1;
                break;
            case 'second':
                time = this._d.valueOf();
                time += MS_PER_SECOND - mod$1(time, MS_PER_SECOND) - 1;
                break;
        }

        this._d.setTime(time);
        hooks.updateOffset(this, true);
        return this;
    }

    function valueOf () {
        return this._d.valueOf() - ((this._offset || 0) * 60000);
    }

    function unix () {
        return Math.floor(this.valueOf() / 1000);
    }

    function toDate () {
        return new Date(this.valueOf());
    }

    function toArray () {
        var m = this;
        return [m.year(), m.month(), m.date(), m.hour(), m.minute(), m.second(), m.millisecond()];
    }

    function toObject () {
        var m = this;
        return {
            years: m.year(),
            months: m.month(),
            date: m.date(),
            hours: m.hours(),
            minutes: m.minutes(),
            seconds: m.seconds(),
            milliseconds: m.milliseconds()
        };
    }

    function toJSON () {
        // new Date(NaN).toJSON() === null
        return this.isValid() ? this.toISOString() : null;
    }

    function isValid$2 () {
        return isValid(this);
    }

    function parsingFlags () {
        return extend({}, getParsingFlags(this));
    }

    function invalidAt () {
        return getParsingFlags(this).overflow;
    }

    function creationData() {
        return {
            input: this._i,
            format: this._f,
            locale: this._locale,
            isUTC: this._isUTC,
            strict: this._strict
        };
    }

    // FORMATTING

    addFormatToken(0, ['gg', 2], 0, function () {
        return this.weekYear() % 100;
    });

    addFormatToken(0, ['GG', 2], 0, function () {
        return this.isoWeekYear() % 100;
    });

    function addWeekYearFormatToken (token, getter) {
        addFormatToken(0, [token, token.length], 0, getter);
    }

    addWeekYearFormatToken('gggg',     'weekYear');
    addWeekYearFormatToken('ggggg',    'weekYear');
    addWeekYearFormatToken('GGGG',  'isoWeekYear');
    addWeekYearFormatToken('GGGGG', 'isoWeekYear');

    // ALIASES

    addUnitAlias('weekYear', 'gg');
    addUnitAlias('isoWeekYear', 'GG');

    // PRIORITY

    addUnitPriority('weekYear', 1);
    addUnitPriority('isoWeekYear', 1);


    // PARSING

    addRegexToken('G',      matchSigned);
    addRegexToken('g',      matchSigned);
    addRegexToken('GG',     match1to2, match2);
    addRegexToken('gg',     match1to2, match2);
    addRegexToken('GGGG',   match1to4, match4);
    addRegexToken('gggg',   match1to4, match4);
    addRegexToken('GGGGG',  match1to6, match6);
    addRegexToken('ggggg',  match1to6, match6);

    addWeekParseToken(['gggg', 'ggggg', 'GGGG', 'GGGGG'], function (input, week, config, token) {
        week[token.substr(0, 2)] = toInt(input);
    });

    addWeekParseToken(['gg', 'GG'], function (input, week, config, token) {
        week[token] = hooks.parseTwoDigitYear(input);
    });

    // MOMENTS

    function getSetWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input,
                this.week(),
                this.weekday(),
                this.localeData()._week.dow,
                this.localeData()._week.doy);
    }

    function getSetISOWeekYear (input) {
        return getSetWeekYearHelper.call(this,
                input, this.isoWeek(), this.isoWeekday(), 1, 4);
    }

    function getISOWeeksInYear () {
        return weeksInYear(this.year(), 1, 4);
    }

    function getWeeksInYear () {
        var weekInfo = this.localeData()._week;
        return weeksInYear(this.year(), weekInfo.dow, weekInfo.doy);
    }

    function getSetWeekYearHelper(input, week, weekday, dow, doy) {
        var weeksTarget;
        if (input == null) {
            return weekOfYear(this, dow, doy).year;
        } else {
            weeksTarget = weeksInYear(input, dow, doy);
            if (week > weeksTarget) {
                week = weeksTarget;
            }
            return setWeekAll.call(this, input, week, weekday, dow, doy);
        }
    }

    function setWeekAll(weekYear, week, weekday, dow, doy) {
        var dayOfYearData = dayOfYearFromWeeks(weekYear, week, weekday, dow, doy),
            date = createUTCDate(dayOfYearData.year, 0, dayOfYearData.dayOfYear);

        this.year(date.getUTCFullYear());
        this.month(date.getUTCMonth());
        this.date(date.getUTCDate());
        return this;
    }

    // FORMATTING

    addFormatToken('Q', 0, 'Qo', 'quarter');

    // ALIASES

    addUnitAlias('quarter', 'Q');

    // PRIORITY

    addUnitPriority('quarter', 7);

    // PARSING

    addRegexToken('Q', match1);
    addParseToken('Q', function (input, array) {
        array[MONTH] = (toInt(input) - 1) * 3;
    });

    // MOMENTS

    function getSetQuarter (input) {
        return input == null ? Math.ceil((this.month() + 1) / 3) : this.month((input - 1) * 3 + this.month() % 3);
    }

    // FORMATTING

    addFormatToken('D', ['DD', 2], 'Do', 'date');

    // ALIASES

    addUnitAlias('date', 'D');

    // PRIORITY
    addUnitPriority('date', 9);

    // PARSING

    addRegexToken('D',  match1to2);
    addRegexToken('DD', match1to2, match2);
    addRegexToken('Do', function (isStrict, locale) {
        // TODO: Remove "ordinalParse" fallback in next major release.
        return isStrict ?
          (locale._dayOfMonthOrdinalParse || locale._ordinalParse) :
          locale._dayOfMonthOrdinalParseLenient;
    });

    addParseToken(['D', 'DD'], DATE);
    addParseToken('Do', function (input, array) {
        array[DATE] = toInt(input.match(match1to2)[0]);
    });

    // MOMENTS

    var getSetDayOfMonth = makeGetSet('Date', true);

    // FORMATTING

    addFormatToken('DDD', ['DDDD', 3], 'DDDo', 'dayOfYear');

    // ALIASES

    addUnitAlias('dayOfYear', 'DDD');

    // PRIORITY
    addUnitPriority('dayOfYear', 4);

    // PARSING

    addRegexToken('DDD',  match1to3);
    addRegexToken('DDDD', match3);
    addParseToken(['DDD', 'DDDD'], function (input, array, config) {
        config._dayOfYear = toInt(input);
    });

    // HELPERS

    // MOMENTS

    function getSetDayOfYear (input) {
        var dayOfYear = Math.round((this.clone().startOf('day') - this.clone().startOf('year')) / 864e5) + 1;
        return input == null ? dayOfYear : this.add((input - dayOfYear), 'd');
    }

    // FORMATTING

    addFormatToken('m', ['mm', 2], 0, 'minute');

    // ALIASES

    addUnitAlias('minute', 'm');

    // PRIORITY

    addUnitPriority('minute', 14);

    // PARSING

    addRegexToken('m',  match1to2);
    addRegexToken('mm', match1to2, match2);
    addParseToken(['m', 'mm'], MINUTE);

    // MOMENTS

    var getSetMinute = makeGetSet('Minutes', false);

    // FORMATTING

    addFormatToken('s', ['ss', 2], 0, 'second');

    // ALIASES

    addUnitAlias('second', 's');

    // PRIORITY

    addUnitPriority('second', 15);

    // PARSING

    addRegexToken('s',  match1to2);
    addRegexToken('ss', match1to2, match2);
    addParseToken(['s', 'ss'], SECOND);

    // MOMENTS

    var getSetSecond = makeGetSet('Seconds', false);

    // FORMATTING

    addFormatToken('S', 0, 0, function () {
        return ~~(this.millisecond() / 100);
    });

    addFormatToken(0, ['SS', 2], 0, function () {
        return ~~(this.millisecond() / 10);
    });

    addFormatToken(0, ['SSS', 3], 0, 'millisecond');
    addFormatToken(0, ['SSSS', 4], 0, function () {
        return this.millisecond() * 10;
    });
    addFormatToken(0, ['SSSSS', 5], 0, function () {
        return this.millisecond() * 100;
    });
    addFormatToken(0, ['SSSSSS', 6], 0, function () {
        return this.millisecond() * 1000;
    });
    addFormatToken(0, ['SSSSSSS', 7], 0, function () {
        return this.millisecond() * 10000;
    });
    addFormatToken(0, ['SSSSSSSS', 8], 0, function () {
        return this.millisecond() * 100000;
    });
    addFormatToken(0, ['SSSSSSSSS', 9], 0, function () {
        return this.millisecond() * 1000000;
    });


    // ALIASES

    addUnitAlias('millisecond', 'ms');

    // PRIORITY

    addUnitPriority('millisecond', 16);

    // PARSING

    addRegexToken('S',    match1to3, match1);
    addRegexToken('SS',   match1to3, match2);
    addRegexToken('SSS',  match1to3, match3);

    var token;
    for (token = 'SSSS'; token.length <= 9; token += 'S') {
        addRegexToken(token, matchUnsigned);
    }

    function parseMs(input, array) {
        array[MILLISECOND] = toInt(('0.' + input) * 1000);
    }

    for (token = 'S'; token.length <= 9; token += 'S') {
        addParseToken(token, parseMs);
    }
    // MOMENTS

    var getSetMillisecond = makeGetSet('Milliseconds', false);

    // FORMATTING

    addFormatToken('z',  0, 0, 'zoneAbbr');
    addFormatToken('zz', 0, 0, 'zoneName');

    // MOMENTS

    function getZoneAbbr () {
        return this._isUTC ? 'UTC' : '';
    }

    function getZoneName () {
        return this._isUTC ? 'Coordinated Universal Time' : '';
    }

    var proto = Moment.prototype;

    proto.add               = add;
    proto.calendar          = calendar$1;
    proto.clone             = clone;
    proto.diff              = diff;
    proto.endOf             = endOf;
    proto.format            = format;
    proto.from              = from;
    proto.fromNow           = fromNow;
    proto.to                = to;
    proto.toNow             = toNow;
    proto.get               = stringGet;
    proto.invalidAt         = invalidAt;
    proto.isAfter           = isAfter;
    proto.isBefore          = isBefore;
    proto.isBetween         = isBetween;
    proto.isSame            = isSame;
    proto.isSameOrAfter     = isSameOrAfter;
    proto.isSameOrBefore    = isSameOrBefore;
    proto.isValid           = isValid$2;
    proto.lang              = lang;
    proto.locale            = locale;
    proto.localeData        = localeData;
    proto.max               = prototypeMax;
    proto.min               = prototypeMin;
    proto.parsingFlags      = parsingFlags;
    proto.set               = stringSet;
    proto.startOf           = startOf;
    proto.subtract          = subtract;
    proto.toArray           = toArray;
    proto.toObject          = toObject;
    proto.toDate            = toDate;
    proto.toISOString       = toISOString;
    proto.inspect           = inspect;
    proto.toJSON            = toJSON;
    proto.toString          = toString;
    proto.unix              = unix;
    proto.valueOf           = valueOf;
    proto.creationData      = creationData;
    proto.year       = getSetYear;
    proto.isLeapYear = getIsLeapYear;
    proto.weekYear    = getSetWeekYear;
    proto.isoWeekYear = getSetISOWeekYear;
    proto.quarter = proto.quarters = getSetQuarter;
    proto.month       = getSetMonth;
    proto.daysInMonth = getDaysInMonth;
    proto.week           = proto.weeks        = getSetWeek;
    proto.isoWeek        = proto.isoWeeks     = getSetISOWeek;
    proto.weeksInYear    = getWeeksInYear;
    proto.isoWeeksInYear = getISOWeeksInYear;
    proto.date       = getSetDayOfMonth;
    proto.day        = proto.days             = getSetDayOfWeek;
    proto.weekday    = getSetLocaleDayOfWeek;
    proto.isoWeekday = getSetISODayOfWeek;
    proto.dayOfYear  = getSetDayOfYear;
    proto.hour = proto.hours = getSetHour;
    proto.minute = proto.minutes = getSetMinute;
    proto.second = proto.seconds = getSetSecond;
    proto.millisecond = proto.milliseconds = getSetMillisecond;
    proto.utcOffset            = getSetOffset;
    proto.utc                  = setOffsetToUTC;
    proto.local                = setOffsetToLocal;
    proto.parseZone            = setOffsetToParsedOffset;
    proto.hasAlignedHourOffset = hasAlignedHourOffset;
    proto.isDST                = isDaylightSavingTime;
    proto.isLocal              = isLocal;
    proto.isUtcOffset          = isUtcOffset;
    proto.isUtc                = isUtc;
    proto.isUTC                = isUtc;
    proto.zoneAbbr = getZoneAbbr;
    proto.zoneName = getZoneName;
    proto.dates  = deprecate('dates accessor is deprecated. Use date instead.', getSetDayOfMonth);
    proto.months = deprecate('months accessor is deprecated. Use month instead', getSetMonth);
    proto.years  = deprecate('years accessor is deprecated. Use year instead', getSetYear);
    proto.zone   = deprecate('moment().zone is deprecated, use moment().utcOffset instead. http://momentjs.com/guides/#/warnings/zone/', getSetZone);
    proto.isDSTShifted = deprecate('isDSTShifted is deprecated. See http://momentjs.com/guides/#/warnings/dst-shifted/ for more information', isDaylightSavingTimeShifted);

    function createUnix (input) {
        return createLocal(input * 1000);
    }

    function createInZone () {
        return createLocal.apply(null, arguments).parseZone();
    }

    function preParsePostFormat (string) {
        return string;
    }

    var proto$1 = Locale.prototype;

    proto$1.calendar        = calendar;
    proto$1.longDateFormat  = longDateFormat;
    proto$1.invalidDate     = invalidDate;
    proto$1.ordinal         = ordinal;
    proto$1.preparse        = preParsePostFormat;
    proto$1.postformat      = preParsePostFormat;
    proto$1.relativeTime    = relativeTime;
    proto$1.pastFuture      = pastFuture;
    proto$1.set             = set;

    proto$1.months            =        localeMonths;
    proto$1.monthsShort       =        localeMonthsShort;
    proto$1.monthsParse       =        localeMonthsParse;
    proto$1.monthsRegex       = monthsRegex;
    proto$1.monthsShortRegex  = monthsShortRegex;
    proto$1.week = localeWeek;
    proto$1.firstDayOfYear = localeFirstDayOfYear;
    proto$1.firstDayOfWeek = localeFirstDayOfWeek;

    proto$1.weekdays       =        localeWeekdays;
    proto$1.weekdaysMin    =        localeWeekdaysMin;
    proto$1.weekdaysShort  =        localeWeekdaysShort;
    proto$1.weekdaysParse  =        localeWeekdaysParse;

    proto$1.weekdaysRegex       =        weekdaysRegex;
    proto$1.weekdaysShortRegex  =        weekdaysShortRegex;
    proto$1.weekdaysMinRegex    =        weekdaysMinRegex;

    proto$1.isPM = localeIsPM;
    proto$1.meridiem = localeMeridiem;

    function get$1 (format, index, field, setter) {
        var locale = getLocale();
        var utc = createUTC().set(setter, index);
        return locale[field](utc, format);
    }

    function listMonthsImpl (format, index, field) {
        if (isNumber(format)) {
            index = format;
            format = undefined;
        }

        format = format || '';

        if (index != null) {
            return get$1(format, index, field, 'month');
        }

        var i;
        var out = [];
        for (i = 0; i < 12; i++) {
            out[i] = get$1(format, i, field, 'month');
        }
        return out;
    }

    // ()
    // (5)
    // (fmt, 5)
    // (fmt)
    // (true)
    // (true, 5)
    // (true, fmt, 5)
    // (true, fmt)
    function listWeekdaysImpl (localeSorted, format, index, field) {
        if (typeof localeSorted === 'boolean') {
            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        } else {
            format = localeSorted;
            index = format;
            localeSorted = false;

            if (isNumber(format)) {
                index = format;
                format = undefined;
            }

            format = format || '';
        }

        var locale = getLocale(),
            shift = localeSorted ? locale._week.dow : 0;

        if (index != null) {
            return get$1(format, (index + shift) % 7, field, 'day');
        }

        var i;
        var out = [];
        for (i = 0; i < 7; i++) {
            out[i] = get$1(format, (i + shift) % 7, field, 'day');
        }
        return out;
    }

    function listMonths (format, index) {
        return listMonthsImpl(format, index, 'months');
    }

    function listMonthsShort (format, index) {
        return listMonthsImpl(format, index, 'monthsShort');
    }

    function listWeekdays (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdays');
    }

    function listWeekdaysShort (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysShort');
    }

    function listWeekdaysMin (localeSorted, format, index) {
        return listWeekdaysImpl(localeSorted, format, index, 'weekdaysMin');
    }

    getSetGlobalLocale('en', {
        dayOfMonthOrdinalParse: /\d{1,2}(th|st|nd|rd)/,
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    // Side effect imports

    hooks.lang = deprecate('moment.lang is deprecated. Use moment.locale instead.', getSetGlobalLocale);
    hooks.langData = deprecate('moment.langData is deprecated. Use moment.localeData instead.', getLocale);

    var mathAbs = Math.abs;

    function abs () {
        var data           = this._data;

        this._milliseconds = mathAbs(this._milliseconds);
        this._days         = mathAbs(this._days);
        this._months       = mathAbs(this._months);

        data.milliseconds  = mathAbs(data.milliseconds);
        data.seconds       = mathAbs(data.seconds);
        data.minutes       = mathAbs(data.minutes);
        data.hours         = mathAbs(data.hours);
        data.months        = mathAbs(data.months);
        data.years         = mathAbs(data.years);

        return this;
    }

    function addSubtract$1 (duration, input, value, direction) {
        var other = createDuration(input, value);

        duration._milliseconds += direction * other._milliseconds;
        duration._days         += direction * other._days;
        duration._months       += direction * other._months;

        return duration._bubble();
    }

    // supports only 2.0-style add(1, 's') or add(duration)
    function add$1 (input, value) {
        return addSubtract$1(this, input, value, 1);
    }

    // supports only 2.0-style subtract(1, 's') or subtract(duration)
    function subtract$1 (input, value) {
        return addSubtract$1(this, input, value, -1);
    }

    function absCeil (number) {
        if (number < 0) {
            return Math.floor(number);
        } else {
            return Math.ceil(number);
        }
    }

    function bubble () {
        var milliseconds = this._milliseconds;
        var days         = this._days;
        var months       = this._months;
        var data         = this._data;
        var seconds, minutes, hours, years, monthsFromDays;

        // if we have a mix of positive and negative values, bubble down first
        // check: https://github.com/moment/moment/issues/2166
        if (!((milliseconds >= 0 && days >= 0 && months >= 0) ||
                (milliseconds <= 0 && days <= 0 && months <= 0))) {
            milliseconds += absCeil(monthsToDays(months) + days) * 864e5;
            days = 0;
            months = 0;
        }

        // The following code bubbles up values, see the tests for
        // examples of what that means.
        data.milliseconds = milliseconds % 1000;

        seconds           = absFloor(milliseconds / 1000);
        data.seconds      = seconds % 60;

        minutes           = absFloor(seconds / 60);
        data.minutes      = minutes % 60;

        hours             = absFloor(minutes / 60);
        data.hours        = hours % 24;

        days += absFloor(hours / 24);

        // convert days to months
        monthsFromDays = absFloor(daysToMonths(days));
        months += monthsFromDays;
        days -= absCeil(monthsToDays(monthsFromDays));

        // 12 months -> 1 year
        years = absFloor(months / 12);
        months %= 12;

        data.days   = days;
        data.months = months;
        data.years  = years;

        return this;
    }

    function daysToMonths (days) {
        // 400 years have 146097 days (taking into account leap year rules)
        // 400 years have 12 months === 4800
        return days * 4800 / 146097;
    }

    function monthsToDays (months) {
        // the reverse of daysToMonths
        return months * 146097 / 4800;
    }

    function as (units) {
        if (!this.isValid()) {
            return NaN;
        }
        var days;
        var months;
        var milliseconds = this._milliseconds;

        units = normalizeUnits(units);

        if (units === 'month' || units === 'quarter' || units === 'year') {
            days = this._days + milliseconds / 864e5;
            months = this._months + daysToMonths(days);
            switch (units) {
                case 'month':   return months;
                case 'quarter': return months / 3;
                case 'year':    return months / 12;
            }
        } else {
            // handle milliseconds separately because of floating point math errors (issue #1867)
            days = this._days + Math.round(monthsToDays(this._months));
            switch (units) {
                case 'week'   : return days / 7     + milliseconds / 6048e5;
                case 'day'    : return days         + milliseconds / 864e5;
                case 'hour'   : return days * 24    + milliseconds / 36e5;
                case 'minute' : return days * 1440  + milliseconds / 6e4;
                case 'second' : return days * 86400 + milliseconds / 1000;
                // Math.floor prevents floating point math errors here
                case 'millisecond': return Math.floor(days * 864e5) + milliseconds;
                default: throw new Error('Unknown unit ' + units);
            }
        }
    }

    // TODO: Use this.as('ms')?
    function valueOf$1 () {
        if (!this.isValid()) {
            return NaN;
        }
        return (
            this._milliseconds +
            this._days * 864e5 +
            (this._months % 12) * 2592e6 +
            toInt(this._months / 12) * 31536e6
        );
    }

    function makeAs (alias) {
        return function () {
            return this.as(alias);
        };
    }

    var asMilliseconds = makeAs('ms');
    var asSeconds      = makeAs('s');
    var asMinutes      = makeAs('m');
    var asHours        = makeAs('h');
    var asDays         = makeAs('d');
    var asWeeks        = makeAs('w');
    var asMonths       = makeAs('M');
    var asQuarters     = makeAs('Q');
    var asYears        = makeAs('y');

    function clone$1 () {
        return createDuration(this);
    }

    function get$2 (units) {
        units = normalizeUnits(units);
        return this.isValid() ? this[units + 's']() : NaN;
    }

    function makeGetter(name) {
        return function () {
            return this.isValid() ? this._data[name] : NaN;
        };
    }

    var milliseconds = makeGetter('milliseconds');
    var seconds      = makeGetter('seconds');
    var minutes      = makeGetter('minutes');
    var hours        = makeGetter('hours');
    var days         = makeGetter('days');
    var months       = makeGetter('months');
    var years        = makeGetter('years');

    function weeks () {
        return absFloor(this.days() / 7);
    }

    var round = Math.round;
    var thresholds = {
        ss: 44,         // a few seconds to seconds
        s : 45,         // seconds to minute
        m : 45,         // minutes to hour
        h : 22,         // hours to day
        d : 26,         // days to month
        M : 11          // months to year
    };

    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, locale) {
        return locale.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime$1 (posNegDuration, withoutSuffix, locale) {
        var duration = createDuration(posNegDuration).abs();
        var seconds  = round(duration.as('s'));
        var minutes  = round(duration.as('m'));
        var hours    = round(duration.as('h'));
        var days     = round(duration.as('d'));
        var months   = round(duration.as('M'));
        var years    = round(duration.as('y'));

        var a = seconds <= thresholds.ss && ['s', seconds]  ||
                seconds < thresholds.s   && ['ss', seconds] ||
                minutes <= 1             && ['m']           ||
                minutes < thresholds.m   && ['mm', minutes] ||
                hours   <= 1             && ['h']           ||
                hours   < thresholds.h   && ['hh', hours]   ||
                days    <= 1             && ['d']           ||
                days    < thresholds.d   && ['dd', days]    ||
                months  <= 1             && ['M']           ||
                months  < thresholds.M   && ['MM', months]  ||
                years   <= 1             && ['y']           || ['yy', years];

        a[2] = withoutSuffix;
        a[3] = +posNegDuration > 0;
        a[4] = locale;
        return substituteTimeAgo.apply(null, a);
    }

    // This function allows you to set the rounding function for relative time strings
    function getSetRelativeTimeRounding (roundingFunction) {
        if (roundingFunction === undefined) {
            return round;
        }
        if (typeof(roundingFunction) === 'function') {
            round = roundingFunction;
            return true;
        }
        return false;
    }

    // This function allows you to set a threshold for relative time strings
    function getSetRelativeTimeThreshold (threshold, limit) {
        if (thresholds[threshold] === undefined) {
            return false;
        }
        if (limit === undefined) {
            return thresholds[threshold];
        }
        thresholds[threshold] = limit;
        if (threshold === 's') {
            thresholds.ss = limit - 1;
        }
        return true;
    }

    function humanize (withSuffix) {
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var locale = this.localeData();
        var output = relativeTime$1(this, !withSuffix, locale);

        if (withSuffix) {
            output = locale.pastFuture(+this, output);
        }

        return locale.postformat(output);
    }

    var abs$1 = Math.abs;

    function sign(x) {
        return ((x > 0) - (x < 0)) || +x;
    }

    function toISOString$1() {
        // for ISO strings we do not use the normal bubbling rules:
        //  * milliseconds bubble up until they become hours
        //  * days do not bubble at all
        //  * months bubble up until they become years
        // This is because there is no context-free conversion between hours and days
        // (think of clock changes)
        // and also not between days and months (28-31 days per month)
        if (!this.isValid()) {
            return this.localeData().invalidDate();
        }

        var seconds = abs$1(this._milliseconds) / 1000;
        var days         = abs$1(this._days);
        var months       = abs$1(this._months);
        var minutes, hours, years;

        // 3600 seconds -> 60 minutes -> 1 hour
        minutes           = absFloor(seconds / 60);
        hours             = absFloor(minutes / 60);
        seconds %= 60;
        minutes %= 60;

        // 12 months -> 1 year
        years  = absFloor(months / 12);
        months %= 12;


        // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
        var Y = years;
        var M = months;
        var D = days;
        var h = hours;
        var m = minutes;
        var s = seconds ? seconds.toFixed(3).replace(/\.?0+$/, '') : '';
        var total = this.asSeconds();

        if (!total) {
            // this is the same as C#'s (Noda) and python (isodate)...
            // but not other JS (goog.date)
            return 'P0D';
        }

        var totalSign = total < 0 ? '-' : '';
        var ymSign = sign(this._months) !== sign(total) ? '-' : '';
        var daysSign = sign(this._days) !== sign(total) ? '-' : '';
        var hmsSign = sign(this._milliseconds) !== sign(total) ? '-' : '';

        return totalSign + 'P' +
            (Y ? ymSign + Y + 'Y' : '') +
            (M ? ymSign + M + 'M' : '') +
            (D ? daysSign + D + 'D' : '') +
            ((h || m || s) ? 'T' : '') +
            (h ? hmsSign + h + 'H' : '') +
            (m ? hmsSign + m + 'M' : '') +
            (s ? hmsSign + s + 'S' : '');
    }

    var proto$2 = Duration.prototype;

    proto$2.isValid        = isValid$1;
    proto$2.abs            = abs;
    proto$2.add            = add$1;
    proto$2.subtract       = subtract$1;
    proto$2.as             = as;
    proto$2.asMilliseconds = asMilliseconds;
    proto$2.asSeconds      = asSeconds;
    proto$2.asMinutes      = asMinutes;
    proto$2.asHours        = asHours;
    proto$2.asDays         = asDays;
    proto$2.asWeeks        = asWeeks;
    proto$2.asMonths       = asMonths;
    proto$2.asQuarters     = asQuarters;
    proto$2.asYears        = asYears;
    proto$2.valueOf        = valueOf$1;
    proto$2._bubble        = bubble;
    proto$2.clone          = clone$1;
    proto$2.get            = get$2;
    proto$2.milliseconds   = milliseconds;
    proto$2.seconds        = seconds;
    proto$2.minutes        = minutes;
    proto$2.hours          = hours;
    proto$2.days           = days;
    proto$2.weeks          = weeks;
    proto$2.months         = months;
    proto$2.years          = years;
    proto$2.humanize       = humanize;
    proto$2.toISOString    = toISOString$1;
    proto$2.toString       = toISOString$1;
    proto$2.toJSON         = toISOString$1;
    proto$2.locale         = locale;
    proto$2.localeData     = localeData;

    proto$2.toIsoString = deprecate('toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)', toISOString$1);
    proto$2.lang = lang;

    // Side effect imports

    // FORMATTING

    addFormatToken('X', 0, 0, 'unix');
    addFormatToken('x', 0, 0, 'valueOf');

    // PARSING

    addRegexToken('x', matchSigned);
    addRegexToken('X', matchTimestamp);
    addParseToken('X', function (input, array, config) {
        config._d = new Date(parseFloat(input, 10) * 1000);
    });
    addParseToken('x', function (input, array, config) {
        config._d = new Date(toInt(input));
    });

    // Side effect imports


    hooks.version = '2.24.0';

    setHookCallback(createLocal);

    hooks.fn                    = proto;
    hooks.min                   = min;
    hooks.max                   = max;
    hooks.now                   = now;
    hooks.utc                   = createUTC;
    hooks.unix                  = createUnix;
    hooks.months                = listMonths;
    hooks.isDate                = isDate;
    hooks.locale                = getSetGlobalLocale;
    hooks.invalid               = createInvalid;
    hooks.duration              = createDuration;
    hooks.isMoment              = isMoment;
    hooks.weekdays              = listWeekdays;
    hooks.parseZone             = createInZone;
    hooks.localeData            = getLocale;
    hooks.isDuration            = isDuration;
    hooks.monthsShort           = listMonthsShort;
    hooks.weekdaysMin           = listWeekdaysMin;
    hooks.defineLocale          = defineLocale;
    hooks.updateLocale          = updateLocale;
    hooks.locales               = listLocales;
    hooks.weekdaysShort         = listWeekdaysShort;
    hooks.normalizeUnits        = normalizeUnits;
    hooks.relativeTimeRounding  = getSetRelativeTimeRounding;
    hooks.relativeTimeThreshold = getSetRelativeTimeThreshold;
    hooks.calendarFormat        = getCalendarFormat;
    hooks.prototype             = proto;

    // currently HTML5 input type only supports 24-hour formats
    hooks.HTML5_FMT = {
        DATETIME_LOCAL: 'YYYY-MM-DDTHH:mm',             // <input type="datetime-local" />
        DATETIME_LOCAL_SECONDS: 'YYYY-MM-DDTHH:mm:ss',  // <input type="datetime-local" step="1" />
        DATETIME_LOCAL_MS: 'YYYY-MM-DDTHH:mm:ss.SSS',   // <input type="datetime-local" step="0.001" />
        DATE: 'YYYY-MM-DD',                             // <input type="date" />
        TIME: 'HH:mm',                                  // <input type="time" />
        TIME_SECONDS: 'HH:mm:ss',                       // <input type="time" step="1" />
        TIME_MS: 'HH:mm:ss.SSS',                        // <input type="time" step="0.001" />
        WEEK: 'GGGG-[W]WW',                             // <input type="week" />
        MONTH: 'YYYY-MM'                                // <input type="month" />
    };

    return hooks;

})));

},{}]},{},[1]);
