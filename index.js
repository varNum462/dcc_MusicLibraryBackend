const express = require("express")
const cors = require("cors");
const repoContext = require("./repository/repository-wrapper")
const musicValidate = require("./middleware/music-validation")
const app = express()

//Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}));

//Endpoints
app.get("/api/songs",(req, res) => {
    const songs = repoContext.songs.findAllSongs();
    return res.send(songs);
})

app.get("/api/songs/:id",(req, res) => {
    const id = req.params.id;
    const song = repoContext.songs.findSongById(id);
    return res.send(song);
});

app.post("/api/songs",[musicValidate],(req, res) => {
    const newSong = req.body;
    const addedSong = repoContext.songs.createSong(newSong)
    return res.status(201).send(addedSong);
});

app.put("/api/songs/:id",[musicValidate],(req, res) => {
    const id = parseInt(req.params.id);
    const songPropsToModify = req.body;
    const songToUpdate = repoContext.songs.updateSong(
        id,
        songPropsToModify
    );
    return res.send(songToUpdate);
});

app.delete("/api/songs/:id",(req, res) => {
    const id = parseInt(req.params.id);
    const deletedSong = repoContext.songs.deleteSong(id);
    return res.send(deletedSong);
});


//Start server
const PORT = process.env.port || 5005

app.listen(PORT, () => {
    console.log(`Server running! On port: ${PORT}`)
})