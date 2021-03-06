var db = require('../lib/mongoose');


exports.create = function(req, res) {

    var data = new db.eventModel({
        title: req.body.title,
        subjectId: req.body.subject._id,
        subject: req.body.subject,
        start: req.body.start,
        end: req.body.end,
        editable: false,
        color: req.body.color,
        textColor: req.body.textColor,
        classroom: req.body.classroom,
        authorId: req.body.authorId,
        currentCount: req.body.currentCount,
        amountOfStudents: req.body.amountOfStudents
    });


    data.save(function(err, model) {
        if (!err) {
            res.json(model);
            res.end;
        } else {

            res.send({
                action: "failSave"
            });
            res.end;
        }
    });
};

exports.getAll = function(req, res) {

    var query = db.eventModel.find({});
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });
};

exports.getOne = function(req, res) {

    var query = db.eventModel.findOne({'_id': req.params.id});
    query.exec(function(err, queryRes) {
        if (err) {
            return handleError(err)
        } else {
            res.send(JSON.stringify(queryRes));
            res.end;
        }
    });
};

exports.delete = function(req, res) {
    var query = db.eventModel.find({'_id': req.params.id});
    query.remove(function(err) {
        if(err) {
            return handleError(err);
        } else {
            res.send("Delete Event ID: " + req.params.id);
        }
    });
};

