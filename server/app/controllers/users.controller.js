﻿var config = require('../../config/database.config');
var express = require('express');
var router = express.Router();
var userService = require('../services/user.service');

// routes
router.post('/authenticate', authenticate);
router.post('/register', register);
router.get('/', getAll);
router.get('/groups',getGroups);
router.get('/tickets',tickets);

router.get('/ticketsopen',ticketsopen);
router.get('/ticketspending',ticketspending);
router.get('/ticketsclose',ticketsclose);



router.post('/ticketinfo',ticketinfo);
router.post('/ticketinform',ticketinform);

router.get('/tags',getTags);
router.get('/types',types);

router.get('/current', getCurrent);
router.post('/', update);
router.delete('/:_id', _delete);
router.post('/registerone', registerone);
router.post('/tag', tag);
router.post('/tickettype',tickettype);
router.post('/group',group);
router.post('/account',account);

module.exports = router;

function authenticate(req, res) {
    console.log(req.body.username);
    userService.authenticate(req.body.username, req.body.password)
        .then(function (user) {
            if (user) {
                // authentication successful
                res.send(user);
            } else {
                // authentication failed
                res.status(400).send('Username or password is incorrect');
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function ticketinfo(req, res) {
    
    userService.getTicketInfo(req.body.ownername)
        .then(function (ticket) {
            res.send(ticket);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function ticketinform(req, res) {
    
    userService.getTicketInform(req.body.status)
        .then(function (ticket) {
            res.send(ticket);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function register(req, res) {
    userService.create(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function registerone(req, res) {
    //console.log(req.body);
    userService.createone(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function tag(req, res) {
    //console.log(req.body);
    userService.tagone(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function tickettype(req, res) {
    //console.log(req.body);
    userService.typeone(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function group(req, res) {
    
    userService.groupone(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}



function account(req, res) {
    
    userService.accountone(req.body)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    userService.getAll()
        .then(function (users) {
            res.send(users);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}


function getGroups(req, res) {
    
    userService.getAllGroups()
        .then(function (groups) {
            res.send(groups);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function tickets(req, res) {
    
    userService.getAllTickets()
        .then(function (tickets) {
            res.send(tickets);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function ticketsopen(req, res) {
    
    userService.getAllTicketsopen()
        .then(function (tickets) {
            res.send(tickets);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function ticketspending(req, res) {
    
    userService.getAllTicketspending()
        .then(function (tickets) {
            res.send(tickets);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function ticketsclose(req, res) {
    
    userService.getAllTicketsclose()
        .then(function (tickets) {
            res.send(tickets);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}





function getTags(req, res) {
    
    userService.getAllTags()
        .then(function (groups) {
            res.send(groups);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}
function types(req, res) {
    
    userService.getTypes()
        .then(function (groups) {
            res.send(groups);
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    userService.getById(req.body._id)
        .then(function (user) {
            if (user) {
                res.send(user);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function update(req, res) {
    userService.update(req.body.ownername,req.body.status,req.body.priority)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    userService.delete(req.params._id)
        .then(function () {
            res.json('success');
        })
        .catch(function (err) {
            res.status(400).send(err);
        });
}