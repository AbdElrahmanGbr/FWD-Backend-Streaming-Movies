CREATE TABLE movieList (
    userlistID INT REFERENCES userList(id),
    movieID INT REFERENCES movies(id),
    name varchar(25),
    PRIMARY KEY(userlistID, movieID)
);
 