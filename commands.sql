CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes integer DEFAULT 0
);

INSERT INTO blogs (author, url, title, likes) VALUES
('Dan Abramov', 'https://overreacted.io/on-let-vs-const/', 'On let vs const', 0),
('Matti Luukkainen', 'https://fullstackopen.com/', 'Kun MOOCit Helsingin yliopistoon tulivat', 0);

SELECT * FROM blogs;