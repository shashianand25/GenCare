import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"GenCare",
    password:"1612",
    port:5432,
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


db.connect();

let DrugList = [];

db.query("SELECT * FROM drug_list", (err , res) => {
    if(err){
        console.log("Error executing query", err.stack);
    }
    else{
        DrugList = res.rows;
    }

    db.end();
});

app.get("/search", (req, res) => {
    const searchTerm = req.query.q.toLowerCase(); // Get the query parameter
    const filteredDrugs = DrugList.filter(drug =>
        drug.name.toLowerCase().includes(searchTerm)
    );
    res.json(filteredDrugs); // Send filtered results as JSON
});

app.get("/all", (req, res) => {
    res.json(DrugList); // Send all medicines as JSON
});


app.get("/",(req, res) => {
    res.render("index.ejs", {DrugList: DrugList});
});

// About route
app.get("/about", (req, res) => {
    res.render("about.ejs");
});
//home page
app.get("/views/genmed.ejs" , (req, res) => {
    res.render("genmed.ejs", {});
})

// Contact route
app.get("/contact", (req, res) => {
    res.render("contact.ejs");
});
    




app.listen(3000, () => {
    console.log(`server running on port ${3000}`);
});
