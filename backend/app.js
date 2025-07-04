import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Pool } from "pg";

dotenv.config();

const app = express()
const port = 3000
const apiKey = process.env.API_KEY;

const pool = new Pool({
    host: "localhost",
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
})

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

app.get("/api/cities", async (req, res) => {
    const query = req.query.q?.toString().trim();
    const username = process.env.GEONAMES_USERNAME;

    if (!username) return res.status(500).json({ error: "Kein Benutzername gesetzt" });

    if (!query || query.length < 2) {
        return res.json([]);
    }

    const isGerman = /^[a-zA-ZäöüßÄÖÜ\s-]+$/.test(query);

    const url = isGerman
        ? `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&country=DE&featureClass=P&lang=de&maxRows=20&username=${username}`
        : `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&lang=de&maxRows=10&username=${username}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        const mapped = (data.geonames || []).map((city) => ({
            city: city.name,
            region: city.adminName1 ?? null,
            country: city.countryName ?? null,
            id: city.geonameId,
        }));
        res.json(mapped);
    } catch (err) {
        console.error("GeoNames Fehler:", err);
        res.status(500).json({ error: "Fehler beim Abrufen von GeoNames" });
    }
});


app.listen(port, '0.0.0.0', () => {
    console.log(`app listening on port ${port}`)
})
