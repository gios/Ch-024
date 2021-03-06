var db = require('../lib/mongoose'),
    async = require('async'),
    _ = require('underscore');

exports.get = function (req, res) {
    var eventQuery = db.eventModel.find({});
    var subscribeQuery = db.subscribeModel.find({});
    subscribeQuery.select('user._id');

    async.parallel({
            events: function (callback) {
                eventQuery.exec(function (err, queryRes) {
                    if (err) {
                        return handleError(err);
                    } else {
                        callback(null, queryRes);
                    }
                });
            },
            students: function (callback) {
                subscribeQuery.exec(function (err, queryRes) {
                    if (err) {
                        return handleError(err);
                    } else {
                        callback(null, queryRes);
                    }
                });
            }
        },
        function (err, result) {
            if (err) return handleError(err);
            var data = [];

            for(var elements in result.events) {
                var tmpEvent = {
                    event: result.events[elements]
                };
                data.push(tmpEvent);
            }
            res.send(data);
        });
};

exports.students = function(req, res) {
    var studentsQuery = db.subscribeModel.find({'event._id': req.params.id});
    studentsQuery.select('user');
    async.parallel({
        students: function(callback) {
            studentsQuery.exec(function (err, queryRes) {
                if (err) {
                    return handleError(err);
                } else {
                    callback(null, queryRes);
                }
            });
        }
    }, function(err, result) {
        if (err) return handleError(err);
        res.send(result.students);
    });
};