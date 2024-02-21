import { useEffect, useState } from "react";

export default function GeneratePdf() {
    const [selectedType, setSelectedType] = useState("");
    const [pdf, setPdf] = useState<string>("");
    const [tas, setTas] = useState([])

    const [societeName, setSocieteName] = useState("")
    const [societe, setSociete] = useState("");
    const [client, setClient] = useState("");
    const [adresseClient, setAdresseClient] = useState("")
    const [date, setDate] = useState("");
    const [numero, setNumero] = useState("");
    const [echeance, setEcheance] = useState("");
    const [paiement, setPaiement] = useState("");
    const [reference, setReference] = useState("")
    const [isButtonDisable, setIsButtonDisable] = useState(true);

    useEffect(()=>{
        societeName &&
        societe &&
        client &&
        adresseClient &&
        date &&
        numero &&
        echeance &&
        paiement &&
        reference ?
            setIsButtonDisable(false)
        :
            setIsButtonDisable(true)
    },[
        societeName,
        societe,
        client,
        adresseClient,
        date,
        numero,
        echeance,
        paiement,
        reference
    ])

    //Value de select
    // const handleDocumentTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    //     setSelectedType(event.target.value);
    // };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:5000/pdf-history');
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la récupération des données.');
                }

                // Convertir la réponse en JSON
                const data = await response.json();

                setTas(data)
                console.log(data);
            } catch (error) {
                console.error('Une erreur est survenue lors de la récupération des données :', error);
            }
        };
        fetchData();
    }, [])
    const handleSubmit = async (e:any) => {
        e.preventDefault();

        if (selectedType === "facture") {
            try {
                // Envoyer les données au serveur pour générer le PDF
                const response = await fetch('http://localhost:5000/facture-pdf', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        societeName,
                        societe,
                        client,
                        adresseClient,
                        date,
                        numero,
                        echeance,
                        paiement,
                        reference
                    }),
                });
            
                // Vérifier si la requête a réussi
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la génération du PDF.');
                }
                if (response.ok) {
                    setSocieteName("");
                    setSociete("");
                    setClient("");
                    setAdresseClient("");
                    setDate("");
                    setNumero("");
                    setEcheance("");
                    setPaiement("");
                    setReference("");
                }

                // Extraire l'URL du PDF de la réponse
                const data = await response.json();
                const pdfUrl = data.pdfUrl;

                // Ajouter le lien de téléchargement à l'élément <p>
                const downloadLink = `<a href="${pdfUrl}" download>Télécharger</a>`;
                setPdf(downloadLink);
    
                const pdfBlob = await response.blob();
                const url = URL.createObjectURL(pdfBlob);
                // setPdf(url)
                const pdfIf= document.getElementById("pdf-iframe") as HTMLIFrameElement;
                pdfIf.src = url;
                window.open(url);
            } catch (error) {
                console.error('Une erreur est survenue lors de la soumission du formulaire :', error);
            }
        } else if(selectedType==="cv"){

            try {
                // Envoyer les données au serveur pour générer le PDF
                const response = await fetch('http://localhost:5000/facture-pdf', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({

                    }),
                });
            
                // Vérifier si la requête a réussi
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la génération du PDF.');
                }

                if (response.ok) {
                    setSocieteName("");
                    setSociete("");
                    setClient("");
                    setAdresseClient("");
                    setDate("");
                    setNumero("");
                    setEcheance("");
                    setPaiement("");
                    setReference("");
                }
    
                const pdfBlob = await response.blob();
                const url = URL.createObjectURL(pdfBlob);
                // setPdf(url)
                const pdfIf= document.getElementById("pdf-iframe") as HTMLIFrameElement;
                pdfIf.src = url;
                window.open(url);
            } catch (error) {
                console.error('Une erreur est survenue lors de la soumission du formulaire :', error);
            }

        } else if (selectedType ==="devis"){

            try {
                // Envoyer les données au serveur pour générer le PDF
                const response = await fetch('http://localhost:5000/devis-pdf', {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        societeName,
                        societe,
                        client,
                        adresseClient,
                        date,
                        numero,
                        echeance,
                        paiement,
                        reference
                    }),
                });
            
                // Vérifier si la requête a réussi
                if (!response.ok) {
                    throw new Error('Une erreur est survenue lors de la génération du PDF.');
                }
                if (response.ok) {
                    
                }
    
                const pdfBlob = await response.blob();
                const url = URL.createObjectURL(pdfBlob);
                window.open(url);
            } catch (error) {
                console.error('Une erreur est survenue lors de la soumission du formulaire :', error);
            }
        }
    }
    
    return(
        <div className='mx-auto mt-3 w-50 p-3 border '>
            <h1 className='text-center'>Génération de PDF</h1>
            <div className='d-flex align-items-center justify-content-center'>
                <label>Sélectionnez le type de document :</label>
                <select name="type" id="type" onChange={e=>setSelectedType(e.target.value)}>
                    <option value=""></option>
                    <option value="facture">Facture</option>
                    <option value="devis">Devis</option>
                    <option value="cv">CV</option>
                </select>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="societeName">Nom de Société</label>
                    <input
                        type="text"
                        className="form-control"
                        id="societeName"
                        value={societeName}
                        onChange={e=> setSocieteName(e.target.value)}
                        placeholder="Nom de Société"
                    />
                </div>
                <div>
                    <label htmlFor="societe">Société</label>
                    <input
                        type="text"
                        className="form-control"
                        id="societe"
                        value={societe}
                        onChange={e=> setSociete(e.target.value)}
                        placeholder="Société"
                    />
                </div>
                <div>
                    <label htmlFor="client">Client</label>
                    <input
                        type="text"
                        className="form-control"
                        id="client"
                        value={client}
                        onChange={e=> setClient(e.target.value)}
                        placeholder="Client"
                    />
                </div>
                <div>
                    <label htmlFor="adresseClient">Adresse Client</label>
                    <input
                        type="text"
                        className="form-control"
                        id="adresseClient"
                        value={adresseClient}
                        onChange={e=> setAdresseClient(e.target.value)}
                        placeholder="adresseClient"
                    />
                </div>
                <div>
                    <label htmlFor="date">Date de facturation</label>
                    <input
                        className="form-control"
                        type="text"
                        value={date}
                        id="date"
                        onChange={e=> setDate(e.target.value)}
                        placeholder="Date"
                    />
                </div>
                <div>
                    <label htmlFor="numero">Numéro  de facture</label>
                    <input
                        className="form-control"
                        type="text"
                        value={numero}
                        id="numero"
                        onChange={e=> setNumero(e.target.value)}
                        placeholder="Numero"
                    />
                </div>
                <div>
                    <label htmlFor="echeance">Echéance </label>
                    <input
                        className="form-control"
                        type="text"
                        value={echeance}
                        id="echeance"
                        onChange={e=> setEcheance(e.target.value)}
                        placeholder="Echeance"
                    />
                </div>
                <div>
                    <label htmlFor="paiement">Paiement </label>
                    <input
                        className="form-control"
                        type="text"
                        value={paiement}
                        id="paiement"
                        onChange={e=> setPaiement(e.target.value)}
                        placeholder="Paiement"
                    />
                </div>
                <div>
                    <label htmlFor="reference">Référence </label>
                    <input
                        className="form-control"
                        type="text"
                        value={reference}
                        id="reference"
                        onChange={e=> setReference(e.target.value)}
                        placeholder="Référence"
                    />
                </div>
                <div className='d-flex align-items-center justify-content-center m-2'>
                    <button type="submit" className='btn btn-primary' disabled={isButtonDisable}>Générer PDF</button>
                </div>
            </form>
            {pdf && (
                <div className="mt-3">
                    <h2 className="text-center">Aperçu du PDF</h2>
                    <iframe src={pdf} width="100%" height="500" style={{ border: "1px solid red" }}></iframe>
                </div>
            )}
            <ul>
                {
                    tas.map((item:any)=>(
                        <p key={item.id}> { item.id } - { item.filename }</p>
                    ))
                }

            </ul>
            
        </div>
    )
};
