import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

const users = {
  usersList: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
}

const findUserByName = (name) => {
  return users["usersList"].filter(
    (user) => user.name === name
  );
};

const findUserByNameAndJob = (name, job) => {
  return users["usersList"].filter(
    (user) => user.name === name && user.job === job
  );
}

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  if (name && job) {
    let result = findUserByNameAndJob(name, job);
    result = { usersList: result };
    res.send(result);
  } else if (name) {
    let result = findUserByName(name);
    result = { usersList: result };
    res.send(result);
  } else {
    res.send(users);
  }
});

const findUserById = (id) =>
  users["usersList"].find((user) => user.id === id);

app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});

const addUser = (user) => {
  users["usersList"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

const deleteUserById = (id) => {
  const userIndex = users["usersList"].findIndex((user) => user.id === id);
  if (userIndex !== -1) {
    const deletedUser = users["usersList"].splice(userIndex, 1);
    return deletedUser;
  }
  return null;
}

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  let result = deleteUserById(id);
  if (result === null) {
    res.status(404).send("Resource not found.")
  } else {
    res.send();
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});