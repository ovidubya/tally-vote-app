# Tally Vote App

# Deploy (one click)

<a href="https://heroku.com/deploy?template=https://github.com/ovidubya/tally-vote-app">
   <img src="https://www.herokucdn.com/deploy/button.svg" alt="Deploy">
</a>

# API

POST `/vote` - Creates a new vote post

```json
{
  "user": "ovadia.shaloam@gmail.com",
  "vote": {
    "repo": "https://github.com/facebook/react",
    "name": "React"
  }
}
```

GET `/vote` - Returns all users vote

```json
{
  "data": [
    {
      "id": 1,
      "email": "ovadia.shalom@gmail.com",
      "vote": {
        "id": 1,
        "repo": "https://github.com/facebook/react",
        "name": "React"
      }
    }
  ]
}
```

GET `/tally` - Returns the voting result

```json
{
  "data": {
    "React": 1
  }
}
```
