import * as CONFIG from "./utils/config.js"
import { useEffect, useState } from "react";

const Commentaire = () => {

    const [nouveau, setNouveau] = useState('')
    const [commentaires, setCommentaire] = useState([]);
    const [isPosting, setIsPosting] = useState(false);


    const fetchCommentaires = async () => {
        try {
            const url = `${CONFIG.API_URL_CLIENT}/commentaire/`;
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
            const url = `${CONFIG.API_URL_CLIENT}/commentaire/`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ commentaire: nouveau }),
            });
            if (!response.ok) {
                throw new Error("Failed to post data");
            }
            setNouveau('');
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
            </div>
            <button onClick={handleEnvoiCommentaire} disabled={isPosting}>
                {isPosting ? 'En envoi' : 'Envoyer'}
            </button>

            <div className="CommentaireList">
                {commentaires.map((commentaire, index) => (
                    <div key={index}>
                        {commentaire}
                    </div>
                ))}
            </div>
        </div>
    );

}

export default Commentaire;