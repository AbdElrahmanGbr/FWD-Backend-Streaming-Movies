CREATE TABLE userList (
    id SERIAL PRIMARY KEY,
    userID INT REFERENCES users(id),
    movieID INT 
);
