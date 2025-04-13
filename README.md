# minigamelibrary

mini-game-library/
├── index.html                        <-- Homepage with game list
├── style.css                         <-- Global styling for site
├── games/
│   └── concentration-64/
│       ├── index.html                <-- Game UI
│       ├── script.js                 <-- Game logic
│       └── styles.css                <-- Game styling
└── assets/                           <-- (optional icons/images)


<!-- minigamelibrary/index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Mini Game Library</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <h1>🎮 Mini Game Library</h1>
  <p>cute fun mini games to play when you're bored</p>

  <ul>
    <li><a href="games/concentration-64/index.html">Play Concentration 64</a></li>
    <li><a href="games/coming-soon.html">More games coming soon!</a></li>
  </ul>
</body>
</html>


body {
  font-family: sans-serif;
  background: #f9f9f9;
  color: #333;
  text-align: center;
  padding: 2rem;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  margin: 1rem 0;
  font-size: 1.2rem;
}


