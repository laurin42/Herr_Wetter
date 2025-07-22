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

app.get("/api/cities", async (req, res) => {
    const query = req.query.q?.toString().trim();
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const username = process.env.GEONAMES_USERNAME;

    if (!username) {
        return res.status(500).json({ error: "Kein Benutzername gesetzt" });
    }

    const fetchCities = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        const geonamesList = data.geonames || [];
        return geonamesList.map((city) => ({
            city: city.name,
            region: city.adminName1 ?? null,
            country: city.countryName ?? null,
            id: city.geonameId,
        }));

    };

    try {
        if (latitude && longitude) {
            const url = `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&lang=de&username=${username}`;
            const result = await fetchCities(url);
            return res.json(result);
        }

        if (query && query.length >= 2) {
            const urlDE = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&country=DE&featureClass=P&lang=de&maxRows=20&username=${username}`;
            let result = await fetchCities(urlDE);


            if (result.length === 0) {
                const urlINT = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(query)}&featureClass=P&lang=de&maxRows=10&username=${username}`;
                result = await fetchCities(urlINT);
            }

            return res.json(result);
        }

        res.json([]);
    } catch (err) {
        console.error("GeoNames Fehler:", err);
        res.status(500).json({ error: "Fehler beim Abrufen von GeoNames" });
    }

});

app.get('/api/currentWeather', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "latitude und longitude müssen angegeben werden" });
    }

    try {
        const weatherResponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&lang=de`);
        const weatherData = await weatherResponse.json();

        if (weatherData.error) {
            return res.status(500).json({ error: "Keine Wetterdaten vorhanden" });
        }

        const username = process.env.GEONAMES_USERNAME;
        const geoResponse = await fetch(`http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&lang=de&username=${username}`);
        const geoData = await geoResponse.json();

        let germanLocation = { city: null, region: null, country: null };

        if (geoData.geonames && geoData.geonames.length > 0) {
            germanLocation = {
                city: geoData.geonames[0].name,
                region: geoData.geonames[0].adminName1 ?? null,
                country: geoData.geonames[0].countryName ?? null,
            };
        }

        res.json({
            ...weatherData,
            location: {
                ...weatherData.location,
                name: germanLocation.city || weatherData.location.name,
                region: germanLocation.region || weatherData.location.region,
                country: germanLocation.country || weatherData.location.country,
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Fehler beim Abrufen der Daten" });
    }
});


app.get("/api/forecastWeather", async (req, res) => {
    console.log("WeatherAPI Antwort:", weatherData);
    console.log("WeatherAPI forecast:", forecastData);
    console.log("WeatherAPI forecast:", forecastday);
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: "latitude und longitude müssen angegeben werden" });
    }

    try {
        const weatherResponse = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&days=3&lang=de`
        );
        const weatherData = await weatherResponse.json();

        if (weatherData.error) {
            return res.status(500).json({ error: "Keine Vorhersagedaten vorhanden" });
        }

        const username = process.env.GEONAMES_USERNAME;
        const geoResponse = await fetch(
            `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&lang=de&username=${username}`
        );
        const geoData = await geoResponse.json();

        let germanLocation = { city: null, region: null, country: null };

        if (geoData.geonames && geoData.geonames.length > 0) {
            germanLocation = {
                city: geoData.geonames[0].name,
                region: geoData.geonames[0].adminName1 ?? null,
                country: geoData.geonames[0].countryName ?? null,
            };
        }

        res.json({
            location: {
                ...weatherData.location,
                name: germanLocation.city || weatherData.location.name,
                region: germanLocation.region || weatherData.location.region,
                country: germanLocation.country || weatherData.location.country,
            },
            forecast: weatherData.forecast.forecastday,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Abrufen der Forecast-Daten" });
    }
});

app.listen(port, '0.0.0.0', () => {
    console.log(`app listening on port ${port}`)
})
