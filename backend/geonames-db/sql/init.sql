CREATE TABLE IF NOT EXISTS cities (
    geoname_id INTEGER PRIMARY KEY,
    name TEXT,
    ascii_name TEXT,
    alternate_names TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    feature_class TEXT,
    feature_code TEXT,
    country_code TEXT,
    cc2 TEXT,
    admin1_code TEXT,
    admin2_code TEXT,
    admin3_code TEXT,
    admin4_code TEXT,
    population BIGINT,
    elevation INTEGER,
    dem INTEGER,
    timezone TEXT,
    modification_date DATE
);
COPY cities
FROM '/docker-entrypoint-initdb.d/cities5000.txt' WITH (
        FORMAT 'text',
        DELIMITER E'\t',
        NULL '',
        HEADER FALSE
    );