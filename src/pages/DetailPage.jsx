import React from "react";
import {useParams} from "react-router-dom";
import {getNote} from "../utils/network-data";
import Loading from "../state/Loading";
import NoteDetail from "../components/NoteDetail";

const DetailPage = () => {
    const {id} = useParams();
    const [note, setNote] = React.useState({});
    const [loader, setLoader] = React.useState(true);
    

    React.useEffect(()=> {
        getNote(id).then(({data}) => {
            setNote(data);
            setLoader(false);
        });
    }, []);
    
    if(loader){
        return <Loading />;
    }

    return (
        <NoteDetail {...note} />
    );
}

export default DetailPage;