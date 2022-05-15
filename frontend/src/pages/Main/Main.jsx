import headerLogo from '../../graphics/header-background.png';
import {ReactComponent as QuestionMark} from '../../graphics/question-mark.svg';
import {ReactComponent as ExclamationMark} from '../../graphics/exclamation-mark.svg';

import CreditScoreGaugeChart from "../../components/charts/CreditScore/CreditScoreGaugeChart";
import CategoryBarChart from "../../components/charts/Category/CategoryBarChart";
import BooleanGroupedBarChart from "../../components/charts/Boolean/BooleanGroupedBarChart";
import AgeLineChart from "../../components/charts/Line/AgeLineChart";
import EmploymentLineChart from "../../components/charts/Line/EmploymentLineChart";
import IncomeLineChart from "../../components/charts/Line/IncomeLineChart";
import PeopleGroupedBarChart from "../../components/charts/People/PeopleGroupedBarChart";

import './Main.scss';


const Main = () => {
    return (
        <>
            <header>
                <h1>Are you eligible for a credit card <QuestionMark /></h1>
                <h2>Boost your chances and &nbsp;<span>STOP</span>&nbsp;being rejected<ExclamationMark /></h2>
                <img src={headerLogo} alt="background"/>
                <div className="circle"></div>
            </header>
            <article>
                <h3>Interact with our graphs</h3>
                <h3>&</h3>
                <h3><span>DISCOVER</span>&nbsp;what banks like.</h3>
            </article>
            <article>
                <h4>Firstly, check your Credit Score</h4>
                <section>
                    <CreditScoreGaugeChart />
                </section>
            </article>
            <article>
                <h4>In categorical values banks prefer</h4>
                <section>
                    <p>When looking at the category charts we can see that</p>
                    <ul>
                        <li>
                            <p>In the Income type of applicants</p>
                            <p>most applicants are <b>Working</b></p>
                        </li>
                        <li>
                            <p>In the Education type of applicants</p>
                            <p>most applicants are <b>Secondary / secondary special</b></p>
                        </li>
                        <li>
                            <p>In the Family status type of applicants</p>
                            <p>most applicants are <b>Married</b></p>
                        </li>
                        <li>
                            <p>In the Housing type of applicants</p>
                            <p>most applicants owns <b>House / apartment</b></p>
                        </li>
                    </ul>
                </section>
                <section>
                    <CategoryBarChart />
                </section>
            </article>
            <article>
                <h4>In YES/NO values accepted applicants have</h4>
                <section>
                    <p>When looking at the yes no chart we can see that in higher rate accepted applicants
                    have or own</p>
                    <ul>
                        <li>Car </li>
                        <li>Realty</li>
                    </ul>
                    <p>Rest of the columns that have mostly rejected status. This could also be because the applicant did not fill that they own such a (phone, email, etc.)</p>
                </section>
                <section>
                    <BooleanGroupedBarChart />
                </section>
            </article>
            <article>
                <h4>Find how age affects accepted applications</h4>
                <section>
                    <p>When considering age you can see from the graph that mid 20 to 40 is the preferred age group.</p>
                    <p>With the ages after that the number of applications is decreasing</p>
                    <p>You can also look at the graphs with applying densities (grouping by age, selecting specific grouping measure) to find the preferable candidates.</p>
                    <p>You can also apply filter to look only at a specific age group.</p>
                </section>
                <section>
                    <AgeLineChart />
                </section>
            </article>
            <article>
                <h4>Find how the length of employment affects accepted applications</h4>
                <section>
                    <p>When considering years of employment you can see the highest applicants have 2-5 years.</p>
                    <p>With more years employed the number of applications is decreasing</p>
                    <p>You can also look at the graphs with applying densities (grouping by age, selecting specific grouping measure) to find the preferable candidates.</p>
                    <p>You can also apply filter to look only at a specific years of employment group.</p>
                </section>
                <section>
                    <EmploymentLineChart/>
                </section>
            </article>
            <article>
                <h4>Find how income affects accepted applications</h4>
                <section>
                    <p>When considering applicants income the highest spike in the graph is in the 150k yearly income.</p>
                    <p>With different income ranges the number of applicants vary.</p>
                    <p>You can also look at the graphs with applying densities (grouping by age, selecting specific grouping measure) to find the preferable candidates.</p>
                    <p>You can also apply filter to look only at a specific income group.</p>
                </section>
                <section>
                    <IncomeLineChart/>
                </section>
            </article>
            <article>
                <h4>Find how value size and number of children affects accepted applications</h4>
                <section>
                    <p>When considering number of children the applicant with the highest number of applicants have 0 children.</p>
                    <p>When considering the number of family members the applicants with the highest number of applicants have 2 other family members.</p>
                    <p>With more number of children or number of families the number of accepted applicants is decreasing.</p>
                    <p>Witch colour is number of children and which colour is number of families is based on the legend next to it.</p>
                </section>
                <section>
                    <PeopleGroupedBarChart/>
                </section>
            </article>
            <footer>
                <a href="/new">Create your own application</a>
                <a href="/">See the home page</a>
            </footer>
        </>
    );
}

export default Main;


// <article className="graphs">
//     <section>
//         <h2>Text of the thing {i}</h2>
//         <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, delectus, dolor ducimus error exercitationem impedit ipsa itaque laudantium magnam nobis nostrum nulla qui quidem quisquam quos ratione suscipit tenetur unde!</p>
//     </section>
//     <section>
//         <span>Graph here </span>
//     </section>
// </article>
