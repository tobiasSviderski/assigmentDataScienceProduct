import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import loadingLogo from "../../graphics/credit_swiping.gif";
import {getDetails} from "../../api/RecordAPISingle";
import DetailsTable from "./DetailsTable";

// Import styles
import "./Details.scss";
import DetailsGraphs from "./DetailsGraphs";

function Details() {
    let {id} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        getDetails(id).then(response => {
            setData(response.data);
            setLoading(false);
        });
    }, [id]);

    return loading
        ? <img src={loadingLogo} alt="Loading" width={500} height={500}/>
        :   data && data.person ?
            <>
                <h1>Your application result</h1>
                <h3 style={{marginTop: 0}}>Status: {data.person.status ===  true ?
                    <span style={{color: "green"}}>Success</span> : <span style={{color: "red"}}>Rejected</span>}</h3>

                <DetailsGraphs data={data} />
                <DetailsTable person={data.person}/>
                <div className="home_a_container">
                    <a className="home_a" href="/main">See the main graphs</a>
                    <a className="home_a" href="/new">Try your own application</a>
                </div>
            </>: null;
}

export default Details;