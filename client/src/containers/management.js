import React from "react";
import "../styles/styles.css";
import BianLee from "../images/bianlee.jpeg";
import AnthonyFoo from "../images/anthonyfoo.png";
import RutvijHolay from "../images/rutvijholay.jpg";
import NoPic from "../images/no.jpg";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "../images/logo.png";
export default class ManagementComponent extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    render() {
        return (
            <>
                <div>
                    <meta charSet="UTF-8" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                    <title>Bian</title>
                    <link rel="alternate icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="styles.css" />
                    <section className="dod-layout-default">
                        <header
                            data-grid-area="header"
                            className="dod-space-between-responsive"
                        >
                            <div>
                                <h1
                                    className="dod-heading-1 dod-stack-4 logo"
                                    style={{ justifyContent: "trie" }}
                                >
                                    <Link to="/">
                                        <div className="sponsor">
                                            <img id="logo" src={logo}></img>
                                        </div>
                                    </Link>
                                </h1>
                            </div>
                            <p></p>
                            {/* <Link to="/blog" style={{ marginLeft: "10px" }}>
                                Blog
                            </Link> */}
                            <a
                                href="https://discord.gg/zPyjsCJ5Sn"
                                target="_blank"
                            >
                                Discord
                            </a>
                            <a
                                href="https://github.com/BianLee/opensourcecollage.com"
                                target="_blank"
                                style={{ marginLeft: "10px" }}
                            >
                                Contribute
                            </a>
                            <Link
                                to="/management"
                                style={{ marginLeft: "10px" }}
                            >
                                Management
                            </Link>
                            {/* <Link to="/faq" style={{ marginLeft: "10px" }}>
                                FAQ
                            </Link> */}
                            <Link to="/post" style={{ marginLeft: "10px" }}>
                                Post
                            </Link>
                        </header>
                        <main data-grid-area="main">
                            <div className="bio">
                                <img src={BianLee}></img>
                            </div>
                            <h1 className="bio-heading">
                                Bian Lee - Chief Executive Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Bian is a Junior at Northwood High school. He is
                                passionate about computer engineering and
                                information technology. He believes in the
                                importance of general education, and through
                                developing Open Source Collage he aim to help
                                high school students find their passion and
                                connect them with numerous non-profits and other
                                student organizations. He enjoys listening to
                                and playing music (as a pianist & cellist),
                                watching musicals, and he holds strong political
                                beliefs. <br />
                                <br />
                            </p>

                            <div className="bio">
                                <img src={NoPic}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Ian Lee - Chief Operating Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Ian is a Junior at Northwood High school who
                                aspires to be a logical and an independent
                                thinker. He engages in various activities such
                                as playing cello and participating in MUN
                                conferences, and hopes to make it easier for
                                students to explore and further their passions
                                through this platform. In his free time, Ian
                                enjoys reading well-written books, as well as
                                watching all types of Youtube videos. <br />
                                <br /> <br />
                            </p>

                            <div className="bio">
                                <img src={NoPic}></img>
                            </div>
                            <h1
                                className="bio-heading"
                                style={{ marginTop: "70px" }}
                            >
                                Pranav Rajpal - Chief Technology Officer
                            </h1>
                            <p
                                style={{
                                    fontSize: "1rem",
                                    fontWeight: "lighter",
                                    lineHeight: "25px",
                                    marginBottom: "40px",
                                    fontFamiliy: "Giga Sans Light",
                                }}
                            >
                                Pranav is a senior at Northwood High School. He
                                enjoys learning about computers, technology, and
                                how they work in his free time. He also spends
                                his free time programming and learning more
                                about math and science-related topics. <br />
                                <br />
                                <br /> <br />
                            </p>
                        </main>
                    </section>
                </div>
            </>
        );
    }
}
