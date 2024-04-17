import { useEffect, useState } from "react"
import { apiClient } from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function SavedFiles() {
    const [loading, setLoading] = useState<boolean>(true);
    const [files, setFiles] = useState<{
        title: string;
        content: string;
        userRef: any;
        _id: string;
        createdAt: string;
        updatedAt: string;
    }[] | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        apiClient.get(`/code`, { withCredentials: true }).then((res) => {
            setFiles(res.data);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="landing-container">
            <div className="room-gradient-1"></div>
            <div className="room-gradient-2"></div>
            {loading && (
                <h2>Loading ....</h2>
            )}
            {!loading && (!files || files.length === 0) && (
                <h2>No files found!</h2>
            )}
            {!loading && (
                <div className="section-a">
                    {files?.map((item) => (
                        <div key={item._id} className="file">
                            <h2 onClick={() => {
                                navigate(`/editor/${uuidv4()}?saved=true&_id=${item._id}`);
                            }}>{item.title}</h2>
                            <div className="date">
                                <span>created at : {new Date(item.createdAt).toLocaleString()}</span>
                                <span>updated at : {new Date(item.updatedAt).toLocaleString()}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
