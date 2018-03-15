﻿var config = require('../../config/database.config');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
//var mongo = require("mongoose");
var db = mongo.db(config.connectionString, { native_parser: true });





db.bind('users');
db.bind('books');
db.bind('tags');
db.bind('groups');
db.bind('Note');
db.bind('accounts');
db.bind('tickettypes');

var service = {};

service.authenticate = authenticate;
service.getAll = getAll;
service.getAllGroups = getAllGroups;
service.getAllTags = getAllTags;
service.getTypes = getTypes;
service.getAllTickets = getAllTickets;
service.getAllTicketsopen = getAllTicketsopen;
service.getAllTicketspending = getAllTicketspending;
service.getAllTicketsclose = getAllTicketsclose;


service.getById = getById;
service.getTicketInfo = getTicketInfo;
service.getTicketInform = getTicketInform;
service.create = create;
service.update = update;
service.delete = _delete;
service.createone = createone;
service.tagone = tagone;
service.typeone = typeone;
service.groupone = groupone;
service.accountone = accountone;
module.exports = service;



/*function authenticate(username, password) {
    var deferred = Q.defer();
    console.log(username);
    db.Note.findOne({ username: username }, function (err, user) {
        console.log(user);
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && (password, user.password)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                //firstName: user.firstName,
                //lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
                //token: jwt.sign({ sub: user._id })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}*/

function authenticate(username, password) {
    var deferred = Q.defer();
  
    db.users.findOne({ username: username }, function (err, user) {
        console.log(user);
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user && bcrypt.compareSync(password, user.hash)) {
            // authentication successful
            deferred.resolve({
                _id: user._id,
                username: user.username,
                fullname: user.fullname,
                role:user.role,
                //lastName: user.lastName,
                token: jwt.sign({ sub: user._id }, config.secret)
                //token: jwt.sign({ sub: user._id })
            });
        } else {
            // authentication failed
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function getTicketInfo(ownername) {
    var deferred = Q.defer();
console.log(ownername);
    db.books.findOne(
        { ticketid:ownername },
        function (err, ticket) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (ticket) {
                console.log(ticket.ownername);
                deferred.resolve({
                    _id: ticket._id,
                    ticketid:ticket.ticketid,
                    ownername: ticket.ownername,
                    status: ticket.status,
                    ticketdate:ticket.ticketdate,
                    subject:ticket.subject,
                    description:ticket.description,
                    group:ticket.group,
                    tags:ticket.tags,
                    type:ticket.type,
                    priority:ticket.priority
                   
                });
               
            } else {
                deferred.resolve(ticket);
            }
        });

    return deferred.promise;
}  

function getTicketInform(status) {
    var deferred = Q.defer();
console.log(status);
    db.books.findOne(
        { status:status },
        function (err, ticket) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (ticket) {
                console.log(ticket.ownername);
                deferred.resolve({
                    _id: ticket._id,
                    ticketid:ticket.ticketid,
                    ownername: ticket.ownername,
                    status: ticket.status,
                    ticketdate:ticket.ticketdate,
                    subject:ticket.subject,
                    description:ticket.description,
                    group:ticket.group,
                    tags:ticket.tags,
                    type:ticket.type,
                    priority:ticket.priority
                   
                });
               
            } else {
                deferred.resolve(ticket);
            }
        });

    return deferred.promise;
}


function getAll() {
    var deferred = Q.defer();

    db.users.find().toArray(function (err, users) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        users = _.map(users, function (user) {
            return _.omit(user, 'hash');
        });

        deferred.resolve(users);
    });

    return deferred.promise;
}


function getAllGroups() {
    var deferred = Q.defer();

    db.groups.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(groups);
    });

    return deferred.promise;
}


function getAllTags() {
    var deferred = Q.defer();

    db.tags.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(groups);
    });

    return deferred.promise;
}

function getTypes() {
    var deferred = Q.defer();

    db.tickettypes.find().toArray(function (err, groups) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(groups);
    });

    return deferred.promise;
}


function getAllTickets() {
    var deferred = Q.defer();

    db.books.find().toArray(function (err, tickets) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(tickets);
    });

    return deferred.promise;
}

function getAllTicketsopen() {
    var deferred = Q.defer();

    db.books.find({status:'Open'}).toArray(function (err, tickets) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(tickets);
    });

    return deferred.promise;
}


function getAllTicketspending() {
    var deferred = Q.defer();

    db.books.find({status:'Pending'}).toArray(function (err, tickets) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(tickets);
    });

    return deferred.promise;
}


function getAllTicketsclose() {
    var deferred = Q.defer();

    db.books.find({status:'Close'}).toArray(function (err, tickets) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
        deferred.resolve(tickets);
    });

    return deferred.promise;
}






function getById(_id) {
    var deferred = Q.defer();
          
    db.books.findOne({ _id: _id }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(user);
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}



function createone(userParam) {
    var deferred = Q.defer();

    // validation
    

    //function createUserOne() {
        // set user object to userParam without the cleartext password
        var user = (userParam);

        // add hashed password to user object
       // user.hash = bcrypt.hashSync(userParam.password, 10);

        db.books.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    //}

    return deferred.promise;
}

function tagone(userParam) {
    var deferred = Q.defer();

        var user = (userParam);
 db.tags.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    //}

    return deferred.promise;
}



function typeone(userParam) {
    var deferred = Q.defer();

        var user = (userParam);
 db.tickettypes.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    //}

    return deferred.promise;
}

function groupone(userParam) {
    var deferred = Q.defer();

    // validation
    db.groups.findOne(
        { groupname: userParam.groupname },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
               
                // username already exists
                deferred.reject('Group Name "' + userParam.groupname + '" isssssssssss already taken');
            } else {
                grouponee();
            }
        });

function grouponee() {
    var deferred = Q.defer();

        var user = (userParam);
 db.groups.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function accountone(userParam) {
    var deferred = Q.defer();

    // validation
    console.log(userParam);
    db.accounts.findOne(
        { accountname: userParam.accountname },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
               
                // username already exists
                deferred.reject('account Name "' + userParam.accountname + '" is already taken');
            } else {
                accountonee();
            }
        });

function accountonee() {
    var deferred = Q.defer();

        var user = (userParam);
 db.accounts.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function create(userParam) {
    var deferred = Q.defer();

    // validation
    db.users.findOne(
        { username: userParam.username },
        function (err, user) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (user) {
                // username already exists
                deferred.reject('Username "' + userParam.username + '" isssss already taken');
            } else {
                createUser();
            }
        });

    function createUser() {
        // set user object to userParam without the cleartext password
        var user = _.omit(userParam, 'password');

        // add hashed password to user object
        user.hash = bcrypt.hashSync(userParam.password, 10);

        db.users.insert(
            user,
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}



function update(ownername,status,priority) {
    var deferred = Q.defer();
    console.log("vgr");
    console.log(ownername);
    console.log(status);
    console.log(priority);
    // validation
    db.books.findOne({ ticketid: ownername }, function (err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

       
            updateUser();
        
        
    });

    function updateUser() {
        // fields to update
        var set = {
            status: status,
            priority: priority,
          
        };

        
        db.books.update(
            { ticketid: ownername },
            { $set: set },
            function (err, doc) {
                if (err) deferred.reject(err.name + ': ' + err.message);

                deferred.resolve();
            });
    }

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    db.books.remove(
        { _id: mongo.helper.toObjectID(_id) },
        function (err) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve();
        });

    return deferred.promise;
}