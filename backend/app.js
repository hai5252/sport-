//  import express module
const express = require("express");

//  import body-parser module
const bodyParser = require("body-parser");

//  import mongoose module

const mongoose = require("mongoose");
mongoose.connect('mongodb://127.0.0.1:27017/footDB');

// import bcrypt module
const bcrypt = require("bcrypt");

// import multer module
const multer = require("multer");

// import path module
const path = require("path");

//  import jwt module
const jwt = require('jsonwebtoken');

// import express-session module
const session = require('express-session');
// import
const axios = require("axios");
// creates express application (app)
const app = express();

// App Configuration
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req, res, next) => {

    res.setHeader("Access-Control-Allow-Origin", "*");

    res.setHeader(

        "Access-Control-Allow-Headers",

        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"

    );

    res.setHeader(

        "Access-Control-Allow-Methods",

        "GET, POST, DELETE, OPTIONS, PATCH, PUT"

    );

    next();

});

//  /files : shortcut that replace /backend/images
app.use("/files", express.static(path.join("backend/images")));

const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
};

const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-crococoder-' + '.' +
            extension;
        cb(null, imgName);
    }
});


const secretKey = "crocoSoir23";
app.use(session({
    secret: secretKey,
}));


// Models Importation
const Match = require("./models/match");
const Team = require("./models/team");
const Stadium = require("./models/stadium");
const Player = require("./models/player");
const User = require("./models/user");



// DataBase Simulation
let matchesTab = [
    { id: 1, scoreOne: 0, scoreTwo: 1, teamOne: "EST", teamTwo: "CA" },
    { id: 2, scoreOne: 0, scoreTwo: 2, teamOne: "FCB", teamTwo: "RMD" },
    { id: 3, scoreOne: 0, scoreTwo: 3, teamOne: "MC", teamTwo: "JUV" }
];

let usersTab = [
    { id: 1, firstName: "Ali", lastName: "Ben A", email: "mmm@gmail.com", pwd: "12345678" },
    { id: 2, firstName: "Mohamed", lastName: "Ben M", email: "hhh@gmail.com", pwd: "12345678" },
    { id: 3, firstName: "Yassine", lastName: "Ben Y", email: "ggg@gmail.com", pwd: "12345678" }
];

function gnerateId(T) {
    let max;
    if (T.length == 0) {
        max = 0;
    } else {
        max = T[0].id;
        for (let i = 0; i < T.length; i++) {
            if (T[i].id > max) {
                max = T[i].id;

            }

        }
    }
    return max + 1;
}

// Business Logic : Get All Matches
app.get("/api/matches", (req, res) => {
    console.log("Here into BL: Get All Matches");
    Match.find().then(
        (docs) => {
            console.log("Here documents from matches collection", docs);
            res.json({ matches: docs });
        });
    // res.json({x:matchesTab});
});


// Business Logic : Get All Players
app.get("/api/players", (req, res) => {
    console.log("Here into BL: Get All Players");
    Player.find().populate("team_id").then(
        (docs) => {
            console.log("Here documents from players collection", docs);
            res.status(200).json({ players: docs });
        });
});


// Business Logic : Get All Teams
app.get("/api/teams", (req, res) => {
    console.log("Here into BL: Get All Teams");
    Team.find().then(
        (docs) => {
            console.log("Here documents from teams collection", docs);
            res.json({ teams: docs });
        });
});

// Business Logic : Get All Stadiums
app.get("/api/stadiums", (req, res) => {
    console.log("Here into BL: Get All Stadiums");
    Stadium.find().then(
        (docs) => {
            console.log("Here documents from stadiums collection", docs);
            res.json({ stadiums: docs });
        });
});

// Business Logic : Get All Teams
app.get("/api/teams/populate", (req, res) => {
    console.log("Here into BL: Get All Teams");
    Team.find().populate("players").then(
        (docs) => {
            console.log("Here documents from teams collection", docs);
            res.json({ teams: docs });
        });
});


// Business Logic : Get Matche By ID
app.get("/api/matches/:id", (req, res) => {
    console.log("Here into BL: Get Matche By ID", req.params.id);
    Match.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            res.json({ match: doc });
        });
    // let findedMatch = {};
    // for (let i = 0; i < MatchesTab.length; i++) {
    //     if (MatchesTab[i].id == req.params.id) {
    //       findedMatch = MatchesTab[i];
    //       break;
    //     }
    //   }
    // let findedMatch = matchesTab.find((obj) => {
    //     return obj.id == req.params.id;
    // });
    // res.json({match:findedMatch});
});


// Business Logic : Get Player By ID
app.get("/api/players/:id", (req, res) => {
    console.log("Here into BL: Get Player By ID", req.params.id);
    Player.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            res.json({ player: doc });
        });
});


// Business Logic : Get Team By ID
app.get("/api/teams/:id", (req, res) => {
    console.log("Here into BL: Get Team By ID", req.params.id);
    Team.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            res.json({ team: doc });
        });
});

// Business Logic : Delete Match By ID
app.delete("/api/matches/:id", (req, res) => {
    console.log("Here into BL: Delete Matche By ID", req.params.id);
    Match.deleteOne({ _id: req.params.id }).then((response) => {
        //   console.log("Here response after delete", response);
        response.deletedCount ?
            res.json({ msg: "Deleted with succes" }) :
            res.json({ msg: "Error" });
    });
    // let isDeleted = false;
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == req.params.id) {
    //         matchesTab.splice(i, 1);
    //         isDeleted = true;
    //         break;
    //     } 
    //   }
    // if (isDeleted) {
    //     res.json({msg: "Deletedwith success", tab: matchesTab});
    // } else {
    //     res.json({msg: "ID does not exist"});
    // }  
});


// Business Logic : Delete Player By ID
app.delete("/api/players/:id", (req, res) => {
    console.log("Here into BL: Delete Player By ID", req.params.id);
    Player.deleteOne({ _id: req.params.id }).then((response) => {
        response.deletedCount ?
            res.json({ msg: "Deleted with succes" }) :
            res.json({ msg: "Error" });
    });
});


// Business Logic : Delete Team By ID
app.delete("/api/teams/:id", (req, res) => {
    console.log("Here into BL: Delete Team By ID", req.params.id);
    Team.deleteOne({ _id: req.params.id }).then((response) => {
        response.deletedCount ?
            res.json({ msg: "Deleted with succes" }) :
            res.json({ msg: "Error" });
    });
});

// Business Logic : Add Match
app.post("/api/matches", (req, res) => {
    console.log("Here into BL: Add Match", req.body);
    // req.body.id = gnerateId(matchesTab);
    // matchesTab.push(req.body);
    // res.json({msg: "Added with success"});
    const match = new Match(req.body);
    match.save();
    res.json({ msg: "Added with Success" });
});

// Business Logic : Add Team
app.post("/api/teams", (req, res) => {
    console.log("Here into BL: Add Team", req.body);
    const team = new Team(req.body);
    team.save((err, doc) => {
        if (err) {
            res.json({ msg: "Echec" });
        } else {
            res.json({ msg: "Added with Success" });
        }
    });
    // res.status(200).json({msg: "Added with Success"});
});

// Business Logic : Add Stadium
app.post("/api/stadiums", (req, res) => {
    console.log("Here into BL: Add Stadium", req.body);
    const stadium = new Stadium(req.body);
    stadium.save((err, doc) => {
        if (err) {
            res.json({ msg: "Echec" });
        } else {
            res.json({ msg: "Added with Success" });
        }
    });
    // res.status(200).json({msg: "Added with Success"});
});



// Business Logic : Add Player
app.post("/api/players", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("Here into BL: Add Player", req.body);

    try {
        Team.findById(req.body.tId).then((team) => {
            if (!team) {
                return res.status(404).json({ message: "Team not found" });
            }
            const player = new Player({
                name: req.body.name,
                nbr: req.body.nbr,
                position: req.body.position,
                teamId: team._id,
            });
            player.save((err, doc) => {
                if (doc) {
                    team.players.push(player);
                    team.save();
                    res.status(201).json({ message: "Success" });
                }

            });
        });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Error creating player", error: error.message });
    }



    // req.body.avatar = `http://localhost:3000/files/${req.file.filename}`;
    // const player = new Player(req.body);
    // player.save((err,doc)=>{
    //     if (doc) {
    //         res.json({msg: "Added with Success"});  
    //     } else {
    //         res.json({msg: "Error"}); 
    //     }
    // });

});

// app.post("/api/players", (req, res) => {
//     console.log("Here into BL: Add Player", req.body);
//     Team.findById(req.body.team_id).then((team)=>{
//         if (!team) {
//             res.status(500).json({msg: "team not found"}); 
//         } else {
//             const player = new Player(req.body);
//             player.save();
//             team.players.push(player);
//             team.save();
//             res.status(200).json({msg: "Added with Success"});
//         }
//     })

// });


// Business Logic : Get All Team players (teamId)
app.post("/api/searchTeamPlayers", (req, res) => {
    console.log("Here into BL: Get All Team Players", req.body);
    try {
        Team.findById(req.body.tId).populate("players").then((team) => {
            console.log("Here founded team", team);
            res.json({ team: team });
        });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ msg: error });
    }
});


// Business Logic : Get All Stadium Team (stadiumId)
app.post("/api/searchStadiumTeam", (req, res) => {
    console.log("Here into BL: Get All Stadium Team", req.body);
    try {
        Stadium.findById(req.body.stadiumId).populate("team").then((stadium) => {
            console.log("Here founded stadium", stadium);
            res.json({ stadium: stadium });
        });
    } catch (error) {
        console.log("Error", error);
        res.status(500).json({ msg: error });
    }
});


// Business Logic : Update Match
app.put("/api/matches", (req, res) => {
    console.log("Here into BL: Update Matche", req.body);
    Match.updateOne({ _id: req.body._id }, req.body).then((response) => {
        console.log("Here response after editing", response);
        response.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    });
    // for (let i = 0; i < matchesTab.length; i++) {
    //     if (matchesTab[i].id == req.body.id) {
    //         matchesTab[i] = req.body;
    //       break;
    //     }
    //   }
    //   res.json({isUpdated: true});  
});


// Business Logic : Update Player
app.put("/api/players", (req, res) => {
    console.log("Here into BL: Update Player", req.body);
    Player.updateOne({ _id: req.body._id }, req.body).then((response) => {
        console.log("Here response after editing", response);
        response.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    });
});

// Business Logic : Update Team
app.put("/api/teams", (req, res) => {
    console.log("Here into BL: Update Team", req.body);
    Team.updateOne({ _id: req.body._id }, req.body).then((response) => {
        console.log("Here response after editing", response);
        response.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    });
});

// function verfi email

function verifUniqueEmail(T, email) {
    return T.find((elt) => {
        return elt.email == email;
    });

}

// Business Logic : Signup
// Response 0 true

app.post("/api/users/signup", multer({ storage: storageConfig }).single("img"), (req, res) => {
    console.log("Here into BL: Signup", req.body);
    bcrypt.hash(req.body.pwd, 10).then((cryptedPwd) => {
        console.log("Here crypted PWD", cryptedPwd);
        req.body.pwd = cryptedPwd;
        req.body.avatar = `http://localhost:3000/files/${req.file.filename}`;
        const user = new User(req.body);
        user.save((err, doc) => {
            if (doc) {
                res.json({ msg: 0 });
            } else {
                if (err.errors.email) {
                    res.json({ msg: 1 });
                }
            }
        });
    });
    // if (verifUniqueEmail(usersTab, req.body.email)) {
    //     res.json({ msg: "Email Exist" });
    // } else {
    //     req.body.id = gnerateId(usersTab);
    //     usersTab.push(req.body);
    //     res.json({ msg: "Inscription with success" });
    // }
});

// Business Logic : Login

// app.post("/api/users/login", (req, res) => {
//     console.log("Here into BL: Login", req.body);
//     User.findOne({email:req.body.email}).then(

//    async (findedUser) => {
//     let user = findedUser;
//         if (!findedUser) {
//             res.json({msg: "check email"});
//         } else {
//             let compare = await bcrypt.compare(req.body.pwd, findedUser.pwd);
//             if (!compare) {
//                 res.json({msg: "check pwd"});
//             } else {
//                 let finalUser = {id: user._id, role: user.role}
//                 res.json({msg: "welcome", foulan:finalUser}); 
//             }
//         }
// console.log("bcrypt", x);
// });


// let findedUser = usersTab.find((elt)=>{
//     return elt.email == req.body.email && elt.pwd == req.body.pwd;
// });

// findedUser 
//      ?
// res.json({ msg: "welcome" }):
// res.json({ msg: "Please check Email/pwd" });
// });

// Business Logic : Login
// Response 0 => Check Email
// Response 1 => Check pwd
// Response 2 => Welcome
app.post("/api/users/login", (req, res) => {
    console.log("Here into BL: Login", req.body);
    let user;
    User.findOne({ email: req.body.email })
        .then(
            (doc) => {
                console.log("Here response after search by Email", doc);
                if (!doc) {
                    res.json({ msg: "0" });
                } else {
                    user = doc;
                    // compare PWD xith Crypted PWD
                    return bcrypt.compare(req.body.pwd, doc.pwd);
                }
            })
        .then((compareResult) => {
            console.log("compareResult", compareResult);
            if (!compareResult) {
                res.json({ msg: "1" });
            } else {
                let userToSend = {
                    fName: user.firstName,
                    lName: user.lastName,
                    role: user.role,
                    id: user._id,
                };
                const token = jwt.sign(userToSend, secretKey, {
                    expiresIn: '1h'
                });
                console.log("Here generated token", token);
                res.json({ msg: "2", token: token });
            }
        });

});

function weatherApi() {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=36.44&lon=10.04&exclude=hourly,daily&appid=16e42ecff1d1fe4b229b2e66036ed0e0").then((res) => {
        console.log(res);
    }).catch((err) => console.log(err));
}

weatherApi();


// Business Logic Get All Users

app.get("/api/users", (req, res) => {
    console.log("Here into BL: Get All users");
    User.find().then((docs) => {
        res.json({ users: docs });
    });
});




// Business Logic : Get User By ID
app.get("/api/users/:id", (req, res) => {
    console.log("Here into BL: Get User By ID", req.params.id);
    User.findOne({ _id: req.params.id }).then(
        (doc) => {
            console.log("Here doc", doc);
            res.json({ user: doc });
        });
});

// Business Logic : Update User
app.put("/api/users", (req, res) => {
    console.log("Here into BL: Update User", req.body);
    User.updateOne({ _id: req.body._id }, req.body).then((response) => {
        console.log("Here response after editing", response);
        response.nModified ?
            res.json({ isUpdated: true }) :
            res.json({ isUpdated: false });
    });
});










// Business Logic IMC
app.post("/api/imc", (req, res) => {
    console.log("Here into BL: imc", req.body);
    let imc = (req.body.poid) / ((req.body.taille / 100) * (req.body.taille / 100));
    if (imc < 16.5) {
        res.json({ msg: "Maigreur extreme dénutrition" });
    } else if (imc >= 16.5 && imc < 18.5) {
        res.json({ msg: "Maigreur" });
    } else if (imc >= 18.5 && imc < 25) {
        res.json({ msg: "Normale" });
    } else {
        res.json({ msg: "obésite" });
    }
});


//  busness logic test 

// make app importable from another files
module.exports = app;
