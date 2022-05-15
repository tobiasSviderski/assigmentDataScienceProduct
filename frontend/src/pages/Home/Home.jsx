import './Home.scss';


const Home = () =>{
    return (
        <>
            <h1 className={"home_title"}>Credit Card risk management</h1>
            <div className="home_container">
                <p>Look what banks prefer and look for while assessing your credit card application.</p>
                <p>We will help you to find the best solution for you and give you recommendation to improve.</p>
                <br/>
                <p>Our Machine Learning model was feed with credit card data and their results to find patterns.</p>
                <p>You can discover the findings on the accepted applicants when clicking on <b>See the main results button </b>
                or you can try to compile your own mock application and see the results by clicking on <b>try your own application</b>.</p>
            </div>
            <div className="home_a_container">
            <a className="home_a" href="/main">See the main graphs</a>
            <a className="home_a" href="/new">Try your own application</a>
            </div>
        </>
    );
}

export default Home;