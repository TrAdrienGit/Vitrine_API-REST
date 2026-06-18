"use strict";

const express = require("express");
const mongoose = require("mongoose");

const Member = require("./models/Member");
const Project = require("./models/Project");

const app = express();
const port = 3000;

//--------------------------------------------------------------

// Middleware JSON
app.use(express.json());

// Connection MongoDB
mongoose
    .connect("mongodb://localhost:27017/VitrineBDD")
    .then(() => {
        console.log("MongoDB connecté");
    })
    .catch((error) => {
        console.error("Erreur MongoDB :", error);
    });


//--------------------------------------------------------------
// Debug

console.log("Collection Member :", Member.collection.name);
console.log("Collection Project :", Project.collection.name);


app.get("/test", async (req, res) => {

    const collections = await mongoose.connection.db
        .listCollections()
        .toArray();

    res.json(collections);
});




//----------------------------------------------------------------
// API REST

// MEMBERS
// GET tous les membres
app.get("/members", async (req, res) => {
    try {
        const members = await Member.find();

        res.status(200).json(members);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des membres",
            error: error.message
        });
    }
});

// GET un membre par ID
app.get("/members/:id", async (req, res) => {
    try {
        const member = await Member.findOne({id: req.params.id});

        if (!member) {
            return res.status(404).json({
                message: `Membre introuvable: ${req.params.id}`
            });
        }

        res.status(200).json(member);
    }
    catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la récupération du membre: ${req.params.id}`,
            error: error.message
        });
    }
});



// PROJETCS
// GET tous les projets
app.get("/projects", async (req, res) => {
    try {
        const projects = await Project.find();

        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la récupération des projets",
            error: error.message
        });
    }
});

// GET un projet par ID
app.get("/projects/:id", async (req, res) => {
    try {
        const project = await Project.findOne({id: req.params.id});

        if (!project) {
            return res.status(404).json({
                message: `Projet introuvable: ${req.params.id}`
            });
        }

        res.status(200).json(project);
    }
    catch (error) {
        res.status(500).json({
            message: `Erreur serveur lors de la récupération du projet: ${req.params.id}`,
            error: error.message
        });
    }
});




//------------------------------------------------------------
// Démarrage serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});