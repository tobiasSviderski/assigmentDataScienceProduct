import React, {useEffect, useRef, useState} from 'react';
import BoxPlotSkeletonChartClass from "../../components/BoxPlotSkeletonChartClass";
import {countYears, multipleYears} from "../../utils/DateManipulation";

function DetailsGraphs(data) {
    const [person, ] = useState(data.data.person);
    const [graphs, ] = useState(data.data.details);
    const ageCanvas = useRef(null);
    const employedCanvas = useRef(null);
    const incomeCanvas = useRef(null);
    const membersCanvas = useRef(null);
    const childrenCanvas = useRef(null);


    useEffect(() => {
        // console.log(graphs.birth);
        // let ageOverall = ;
        // console.log(ageOverall);
        const age = new BoxPlotSkeletonChartClass(ageCanvas.current,
            {
                overall: multipleYears(graphs.birth),
                person: person.days_birth,
                width: 300,
                height: 50,
            });
        age.draw();

        const employed = new BoxPlotSkeletonChartClass(employedCanvas.current,
            {
                overall: multipleYears(graphs.employed),
                person: person.days_employed,
                width: 300,
                height: 50,
            });
        employed.draw();

        const income = new BoxPlotSkeletonChartClass(incomeCanvas.current,
            {
                overall: graphs.income,
                person: person.amt_income_total,
                width: 300,
                height: 50,
            });
        income.draw();

        const members = new BoxPlotSkeletonChartClass(membersCanvas.current,
            {
                overall: graphs.members,
                person: person.cnt_fam_members,
                width: 300,
                height: 50,
            });
        members.draw();

        const children = new BoxPlotSkeletonChartClass(childrenCanvas.current,
            {
                overall: graphs.children,
                person: person.cnt_children,
                width: 300,
                height: 50,
            });
        children.draw();

    }, [graphs, person]);

    return (
        <div>
            <div className="numbers_container">
                <div className="number_legend">

                </div>
            <div className="numbers">
                <h4>Age</h4>
                <div className="number_flex_container">
                    <div className={"detail_graph"} ref={ageCanvas} />
                    <div className={"detail_graph_description"}>
                    <table className={"table_details"}>
                        <tbody>
                            <tr>
                                <th>Min:</th>
                                <td>{countYears(graphs.birth.max)}</td>
                            </tr>
                            <tr>
                                <th>Max:</th>
                                <td>{countYears(graphs.birth.min)}</td>
                            </tr>
                            <tr>
                                <th>1 quadrant:</th>
                                <td>{countYears(graphs.birth.third)}</td>
                            </tr>
                            <tr>
                                <th>3 quadrant:</th>
                                <td>{countYears(graphs.birth.first)}</td>
                            </tr>
                            <tr>
                                <th>Your age</th>
                                <td>{countYears(person.days_birth)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
                <h4>Years of employment</h4>
                <div className="number_flex_container">
                    <div className={"detail_graph"} ref={employedCanvas} />
                    <div className={"detail_graph_description"}>
                        <table className={"table_details"}>
                            <tbody>
                            <tr>
                                <th>Min:</th>
                                <td>0</td>
                            </tr>
                            <tr>
                                <th>Max:</th>
                                <td>{countYears(graphs.employed.min)}</td>
                            </tr>
                            <tr>
                                <th>1 quadrant:</th>
                                <td>{countYears(graphs.employed.third)}</td>
                            </tr>
                            <tr>
                                <th>3 quadrant:</th>
                                <td>{countYears(graphs.employed.first)}</td>
                            </tr>
                            <tr>
                                <th>Your years of employment</th>
                                <td>{countYears(person.days_employed)}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4>Yearly income</h4>
                <div className="number_flex_container">
                    <div className={"detail_graph"} ref={incomeCanvas} />
                    <div className={"detail_graph_description"}>
                        <table className={"table_details"}>
                            <tbody>
                            <tr>
                                <th>Min:</th>
                                <td>{graphs.income.min}</td>
                            </tr>
                            <tr>
                                <th>Max:</th>
                                <td>{graphs.income.max}</td>
                            </tr>
                            <tr>
                                <th>1 quadrant:</th>
                                <td>{graphs.income.first}</td>
                            </tr>
                            <tr>
                                <th>3 quadrant:</th>
                                <td>{graphs.income.third}</td>
                            </tr>
                            <tr>
                                <th>Your yearly income</th>
                                <td>{person.amt_income_total}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4>Members of family</h4>
                <div className="number_flex_container">
                    <div className={"detail_graph"} ref={membersCanvas} />
                    <div className={"detail_graph_description"}>
                        <table className={"table_details"}>
                            <tbody>
                            <tr>
                                <th>Min:</th>
                                <td>{graphs.members.min}</td>
                            </tr>
                            <tr>
                                <th>Max:</th>
                                <td>{graphs.members.max}</td>
                            </tr>
                            <tr>
                                <th>1 quadrant:</th>
                                <td>{graphs.members.first}</td>
                            </tr>
                            <tr>
                                <th>3 quadrant:</th>
                                <td>{graphs.members.third}</td>
                            </tr>
                            <tr>
                                <th>Your number of family members</th>
                                <td>{person.cnt_fam_members}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <h4>Number of children</h4>
                <div className="number_flex_container">
                    <div className={"detail_graph"} ref={childrenCanvas} />
                    <div className={"detail_graph_description"}>
                        <table className={"table_details"}>
                            <tbody>
                            <tr>
                                <th>Min:</th>
                                <td>{graphs.children.min}</td>
                            </tr>
                            <tr>
                                <th>Max:</th>
                                <td>{graphs.children.max}</td>
                            </tr>
                            <tr>
                                <th>1 quadrant:</th>
                                <td>{graphs.children.first}</td>
                            </tr>
                            <tr>
                                <th>3 quadrant:</th>
                                <td>{graphs.children.third}</td>
                            </tr>
                            <tr>
                                <th>Your yearly income</th>
                                <td>{person.cnt_children}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
}

export default DetailsGraphs;