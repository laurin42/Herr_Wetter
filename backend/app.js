import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express()
const port = 3000
const apiKey = process.env.API_KEY;

app.use(cors());



app.get('/api/currentWeather', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "latitude und longitute müssen angegeben werden" })
    }

    try {
        const currentWeather = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&lang=de`
        )
        const data = await currentWeather.json();
        if (data.error) {
            return res.status(500).json({ error: "Keine daten vorhanden" });
        }
        res.json(data)
    } catch (error) {
        return res.status(500).json({ error: "keine daten vorhanden" });
    }
});


app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`)
})
