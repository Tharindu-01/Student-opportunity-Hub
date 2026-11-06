
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("WayaLink Backend Server is Running!");
});

const PORT = process.env.PORT || 5000;

app.get("/api/opportunities", (req, res) => {
  const opportunities = [
    {
      id: 1,
      title: "Software Engineering Internship",
      category: "Internship",
      organization: "Tech Company",
      location: "Colombo",
    },
    {
      id: 2,
      title: "Undergraduate Scholarship",
      category: "Scholarship",
      organization: "Education Foundation",
      location: "Sri Lanka",
    },
    {
      id: 3,
      title: "IEEE Student Branch Membership",
      category: "Club",
      organization: "University Student Club",
      location: "Wayamba University",
    },
  ];

  res.json(opportunities);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
