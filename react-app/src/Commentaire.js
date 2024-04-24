import * as CONFIG from "./utils/config.js"
import { useEffect, useState } from "react";

const Commentaire = () => {

    const [nouveau, setNouveau] = useState('')
    const [commentaires, setCommentaire] = useState([]);
    const [isPosting, setIsPosting] = useState(false);
    const [cote, setCote] = useState(5);

    const HandleCote = (event) => {
        setCote(event.target.value);
    };


    const fetchCommentaires = async () => {
        try {
            const url = `${CONFIG.API_URL_CLIENT}/commentaires/`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await response.json();
            setCommentaire(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchCommentaires();
    }, []);

    const handleEnvoiCommentaire = async () => {
        try {
            setIsPosting(true);
            const url = `${CONFIG.API_URL_CLIENT}/postCommentaire/`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentaire: nouveau, cote: cote }),
            });
            if (!response.ok) {
                throw new Error("Failed to post data");
            }
            setNouveau('');
            setCote(5);
            setIsPosting(false);
            fetchCommentaires();
        } catch (error) {
            console.error("Error posting data:", error);
            setIsPosting(false);
        }
    };


    return (
        <div className="Commentaire">
            <div className="CommentaireText">
                Votre commentaire:
                <br />
                <textarea
                    rows="4"
                    cols="50"
                    value={nouveau}
                    onChange={(e) => setNouveau(e.target.value)}
                />
                Votre cote:
                <select id="cote" onChange={HandleCote}>
                    <option value="5">5/5</option>
                    <option value="4">4/5</option>
                    <option value="3">3/5</option>
                    <option value="2">2/5</option>
                    <option value="1">1/5</option>

                </select>
            </div>
            <button onClick={handleEnvoiCommentaire} disabled={isPosting}>
                {isPosting ? 'En envoi' : 'Envoyer'}
            </button>

            <div className="CommentaireList">
                {commentaires.map((commentaire, index) => (
                    <div key={index}>
                        ({commentaire.cote}/5) {commentaire.commentaire}
                    </div>

                ))}
            </div>
        </div>
    );

}

export default Commentaire;