const express = require('express')
const bodyParser = require("body-parser")
const cors = require('cors');
const mysql = require('mysql');
const bcrypt = require("bcrypt")
const PDFDocument = require('pdfkit');
const blobStream  = require('blob-stream');

const app = express()
const port = 5000

app.use(bodyParser.json());
app.use(cors());
app.use(express());
// app.use(express.static(path.join(__dirname, "public")));

//connexion à la base de donnée
const con = mysql.createConnection({
    host: "",
    user: "",
    password: "",
    database: ""
});
con.connect(function(err) {
if (err) throw err;
console.log("Connected db testPdf!");
});

app.get('/', (req, res) => {
  res.send("Hello world!")
})

// Endpoint pour gérer l'inscription
app.post('/register', (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password,10,(error, hashedPassword)=>{
        if (error) {
            console.error("Erreur lors du hachage du mot de passe:", error);
            return res.status(500).json({ message: "Erreur lors de l'inscription" });
        }
        // Insérer les données d'inscription dans la base de données
        const sql = "INSERT INTO users (email, password) VALUES (?,?)";
        con.query(sql, [email, hashedPassword], (err, result) => {
          if (err) {
            console.error("Erreur lors de l'inscription:", err);
            return res.status(500).json({ message: "Erreur lors de l'inscription" });
          }
          console.log("Utilisateur inscrit avec succès:", result);
          return res.status(200).json({ message: "Inscription réussie"+ result.insertId });
        });
    })
});
app.post('/login', (req, res) => {
    const {email, password} = req.body;
    // Recherche de l'utilisateur dans la base de données
    con.query("SELECT * FROM users WHERE email = ?", [email], (error, results) => {
        if (error) {
            console.error("Erreur lors de la recherche de l'utilisateur:", error);
            return res.status(500).json({ message: "Erreur lors de la connexion" });
        }
        
        // Vérification si l'utilisateur existe
        if (results.length === 0) {
            return res.status(401).json({ message: "Adresse e-mail incorrecte ou utilisateur non trouvé" });
        }
        
        const user = results[0]; // Première correspondance
        // Vérification du mot de passe
        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err) {
                console.error("Erreur lors de la comparaison des mots de passe:", err);
                return res.status(500).json({ message: "Erreur lors de la connexion" });
            }
            if (!passwordMatch) {
                return res.status(401).json({ message: "Mot de passe incorrect" });
            }
            // Authentification réussie
            res.status(200).json({ message: "Connexion réussie", userId: user.email });
        });
    });
});


//Pour générer la facture
app.post('/facture-pdf', (req, res) => {
    // Récupérons les données du formulaire
    const { 
        societeName,
        societe,
        client,
        adresseClient,
        date,
        numero,
        echeance,
        paiement,
        reference 
    } = req.body;
  
    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // pipe the document to a blob
    // const stream = doc.pipe(blobStream());
  
    // Écrire les données du formulaire dans le PDF
    doc.fontSize(15)

    doc.text("Facture",{
        align:"center",
    }).moveDown();
    
    // Éléments société
    doc.text(`Nom de la société:${societeName}`);
    doc.text(`adresse société: ${societe}`);
    doc.moveDown();
    
    // Éléments client
    doc.text(`Client:${client}`,{
        align:"right"
    })
    doc.text(`adresse client: ${adresseClient}`,{
        align:"right"
    });
    doc.text(`date de facturation:${date}`,{
        align:"right"
    });
    doc.text(`numero de facture:${numero}`,{
        align:"right"
    });
    doc.text(`Echéance:${echeance}`,{
        align:"right",
    });
    doc.text(`Paiement:${paiement}`,{
        align:"right"
    });
    doc.text(`Référence:${reference}`,{
        align:"right"
    });
    doc.moveDown();
  
    // Envoyer le PDF au client en réponse à la requête POST en convertissant
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment`);

    // Nom du fichier PDF basé sur le nom et le prénom
    const pdfFileName = `http://localhost:5000/${client}.pdf`; 

    doc.pipe(res);
    doc.end();

    //Pour enregistrer dans la bd
    const insertUrl = "INSERT INTO pdf_history (filename) VALUES (?)"; // Requête d'insertion du lien du PDF dans la base de données
    con.query(insertUrl,[pdfFileName], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'insertion du lien du PDF dans la base de données:", error);
            return res.status(500).json({ message: "Erreur lors de la génération du PDF" });
        }
        console.log("Lien du PDF inséré avec succès dans la base de données.");
        res.status(200).json({message:"Success" });
    });
});

//Pour générer la devis
app.post('/devis-pdf', (req, res) => {
    // Récupérons les données du formulaire
    const { 
        societeName,
        societe,
        client,
        adresseClient,
        date,
        numero,
        echeance,
        paiement,
        reference 
    } = req.body;
  
    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // pipe the document to a blob
    // const stream = doc.pipe(blobStream());
  
    // Écrire les données du formulaire dans le PDF
    doc.fontSize(15)

    doc.text("Dévis",{
        align:"center",
    }).moveDown();
    
    // Éléments société
    doc.text(`Nom de la société:${societeName}`);
    doc.text(`adresse société: ${societe}`);
    doc.moveDown();
    
    // Éléments client
    doc.text(`Client:${client}`,{
        align:"right"
    })
    doc.text(`adresse client: ${adresseClient}`,{
        align:"right"
    });
    doc.text(`date de facturation:${date}`,{
        align:"right"
    });
    doc.text(`numero de facture:${numero}`,{
        align:"right"
    });
    doc.text(`Echéance:${echeance}`,{
        align:"right",
    });
    doc.text(`Paiement:${paiement}`,{
        align:"right"
    });
    doc.text(`Référence:${reference}`,{
        align:"right"
    });
    doc.moveDown();
  
    // Envoyer le PDF au client en réponse à la requête POST en convertissant
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment;filename:${client}`);

    // Nom du fichier PDF basé sur le nom et le prénom
    const pdfFileName = `http://localhost:5000/${client}.pdf`; 

    doc.pipe(res);
    doc.end();

    //Pour enregistrer dans la bd
    const insertUrl = "INSERT INTO pdf_history (filename) VALUES (?)"; // Requête d'insertion du lien du PDF dans la base de données
    con.query(insertUrl,[pdfFileName], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'insertion du lien du PDF dans la base de données:", error);
            return res.status(500).json({ message: "Erreur lors de la génération du PDF" });
        }
        console.log("Lien du PDF inséré avec succès dans la base de données.");
        res.status(200).json({message:"Success" });
    });
});

//Pour générer le cv
app.post('/cv-pdf', (req, res) => {
    // Récupérons les données du formulaire
    const { 
        lastName,
        firstname,
    } = req.body;
  
    // Créer un nouveau document PDF
    const doc = new PDFDocument();

    // pipe the document to a blob
    // const stream = doc.pipe(blobStream());
  
    // Écrire les données du formulaire dans le PDF
    doc.fontSize(15)

    doc.text("Cv",{
        align:"center",
    }).moveDown();
    
    
    // Éléments client
    doc.text(`Client:${lastName}`,{
        align:"right"
    })
    doc.text(`adresse client: ${firstname}`,{
        align:"right"
    });
  
    // Envoyer le PDF au client en réponse à la requête POST en convertissant
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment;filename:${lastName}`);

    // Nom du fichier PDF basé sur le nom et le prénom
    const pdfFileName = `http://localhost:5000/${lastName}.pdf`; 

    doc.pipe(res);
    doc.end();

    //Pour enregistrer dans la bd
    const insertUrl = "INSERT INTO pdf_history (filename) VALUES (?)"; // Requête d'insertion du lien du PDF dans la base de données
    con.query(insertUrl,[pdfFileName], (error, result) => {
        if (error) {
            console.error("Erreur lors de l'insertion du lien du PDF dans la base de données:", error);
            return res.status(500).json({ message: "Erreur lors de la génération du PDF" });
        }
        console.log("Lien du PDF inséré avec succès dans la base de données.");
        res.status(200).json({message:"Success" });
    });
});


//POur gérer l'historique
app.get('/pdf-history', (req, res) => {
    con.query("SELECT * FROM pdf_history", (error, results) => {
        if (error) {
            console.error("Erreur lors de la récupération de l'historique des PDF:", error);
            return res.status(500).json({ message: "Erreur lors de la récupération de l'historique des PDF" });
        }
        res.status(200).json(results);
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
