import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/styles.css";
import { LoginSetupContainer } from "./loginsetup";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "firebase";
import logo from "../images/logo.png";
import moment from "moment";
export default class LoginFirstFrame extends React.Component {
    constructor() {
        super();
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: new Date(),
            titleLimit: 40,
            descriptionLimit: 500,
            titleText: "",
            dateText: "",
            zoomLink: "",
            chkbox: true,
            description: "",
            categoryCount: 0,
            category: [],
            disabled: false,
            alert: false,
            posts: [],
            showMessage: false,
            message: "View all events",

            selectedDate: "",
            selectedDescription: "",
            selectedTitle: "",

            permDate: "",
            permDescription: "",
            permTitle: "",
            permID: "",

            loggedIn: "",
            errorMessage: "",
        };
    }

    _showMessage = (bool, e) => {
        this.setState({
            showMessage: bool,
        });
        if (bool) {
            this.setState({
                message: "Collapse all events",
            });
        } else {
            this.setState({
                message: "View all events",
            });
        }
    };

    componentDidMount = () => {
        this.getPost();
        firebase.auth().onAuthStateChanged(
            function (user) {
                if (user) {
                    console.log("hwhat is going on");
                    this.setState({ loggedIn: "yes" });
                } else {
                    this.setState({ loggedIn: "no" });
                }
            }.bind(this)
        );
    };

    getPost = () => {
        // https://bianbackend.herokuapp.com/api/getMessage
        axios
            .get("https://server-opal-alpha.vercel.app/api/getMessage")
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log("data has been received");
                //console.log(JSON.stringify(this.state.posts))
            })
            .catch(() => {
                alert("error retreving data!!");
            });
    };

    handleSelectItem = (e) => {
        //console.log(e.target.dataset.description)
        //console.log(e.target.dataset.title)
        console.log(e.target.dataset.date);
        this.setState({
            selectedDescription: e.target.dataset.description,
            selectedTitle: e.target.dataset.title,
            selectedDate: e.target.dataset.date,
        });
    };

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    handlePerm = (e) => {
        if (
            this.state.permTitle != "" &&
            e.target.dataset.id == this.state.permID
        ) {
            this.setState({
                permDescription: "",
                permTitle: "",
                permID: "",
                permDate: "",
            });
        } else {
            this.setState({
                permDescription: e.target.dataset.description,
                permTitle: e.target.dataset.title,
                permID: e.target.dataset.id,
                permDate: e.target.dataset.date,
            });
        }
    };

    handleTitleLimit = (e) => {
        this.setState({
            titleLimit: 40 - e.target.value.length,
            titleText: e.target.value,
        });
    };
    handleDescriptionLimit = (e) => {
        this.setState({
            descriptionLimit: 500 - e.target.value.length,
            description: e.target.value,
        });
    };

    handleStartTime = (e) => {
        this.setState({ startTime: e.target.value });
    };
    handleEndTime = (e) => {
        this.setState({ endTime: e.target.value });
    };

    handleZoomLink = (e) => {
        this.setState({ zoomLink: e.target.value });
    };

    handleEst = (e) => {
        if (e.target.value == "on") {
            this.setState({ chkbox: false, timeZone: "EST" });
        } else {
            this.setState({ chkbox: true, timeZone: "EST" });
        }
    };
    handlePst = (e) => {
        if (e.target.value == "on") {
            this.setState({ chkbox: true, timeZone: "PST" });
        } else {
            this.setState({ chkbox: false, timeZone: "PST" });
        }
    };
    handleDiscardItem = (e) => {
        this.setState({
            selectedDescription: "",
            selectedTitle: "",
            selectedDate: "",
        });
    };
    handleCategoryCount = (e) => {
        // console.log(this.state.category);

        this.setState({
            category: [e.target.dataset.name],
        });

        /*
        if (this.state.categoryCount == 2) {
            this.setState({ alert: false });
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 1) {
                e.preventDefault();
                this.setState({ alert: true });
            } else {
                this.setState({ categoryCount: this.state.categoryCount + 1 });
                this.setState(
                    {
                        category: [
                            ...this.state.category,
                            e.target.dataset.name,
                        ],
                    },
                    function () {
                        // console.log(this.state.category);
                    }
                );
            }
        } else {
            this.setState({ categoryCount: this.state.categoryCount - 1 });
            this.setState(
                {
                    category: this.state.category.filter(
                        (item) => item !== e.target.dataset.name
                    ),
                },
                function () {
                    // console.log(this.state.category);
                }
            );
        }*/

        {
        }
    };

    onSubmit(e) {
        e.preventDefault();
        // console.log(this.state.category)
        const message = {
            title: this.state.titleText,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            timeZone: this.state.timeZone,
            zoomLink: this.state.zoomLink,
            description: this.state.description,
            category: this.state.category,
        };
        // console.log(message);
        //  const path = '/api/postMessage';
        // https://bianbackend.herokuapp.com/api/postMessage

        if (
            this.state.titleText.length > 0 &&
            this.state.zoomLink.length > 0 &&
            this.state.description.length > 0 &&
            this.state.category.length > 0
        ) {
            axios
                .post(
                    "https://server-opal-alpha.vercel.app/api/postMessage",
                    message
                )
                .then(
                    (res) => this.props.history.push("/"),
                    console.log("page update?"),
                    this.getPost(),
                    this.componentDidMount()
                )
                .catch((error) => {
                    console.log("Error!");
                });
        } else {
            console.log("missing something");
            this.setState({
                errorMessage: "Please make sure all fields are completed",
            });
        }
    }
    render() {
        var maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 1);
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
                        <main
                            data-grid-area="main"
                            style={{
                                backgroundColor: "#fcfcfc",
                            }}
                        >
                            {this.state.loggedIn == "yes" ? (
                                <>
                                    <article className="dod-article dod-flow">
                                        <h2 className="dod-heading-2 dod-stack-24">
                                            Share an event!
                                        </h2>
                                        <form
                                            name="Submit a Dog"
                                            action="/success"
                                            className="dod-flow"
                                            method="post"
                                        >
                                            <input
                                                type="hidden"
                                                name="form-name"
                                                defaultValue="Submit a Dog"
                                            />
                                            <div>
                                                <label
                                                    htmlFor="name"
                                                    className="dod-label dod-stack-4"
                                                    style={{ color: "#9c066c" }}
                                                >
                                                    Event Title (40 characters
                                                    max)
                                                </label>

                                                <input
                                                    type="text"
                                                    maxLength={40}
                                                    name="name"
                                                    placeholder=""
                                                    className="dod-input"
                                                    onChange={
                                                        this.handleTitleLimit
                                                    }
                                                    style={{ outline: "none" }}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="url"
                                                    className="dod-label  dod-stack-4"
                                                    style={{ color: "#1b4d94" }}
                                                >
                                                    Event Date (Click to change)
                                                </label>
                                                <div>
                                                    <div>
                                                        <DatePicker
                                                            selected={
                                                                this.state.date
                                                            }
                                                            onChange={
                                                                this
                                                                    .onChangeDate
                                                            }
                                                            minDate={new Date()}
                                                            maxDate={maxDate}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="url"
                                                    className="dod-label  dod-stack-4"
                                                    style={{ color: "#9c066c" }}
                                                >
                                                    Zoom or Website Link
                                                </label>
                                                <input
                                                    type="text"
                                                    maxLength={128}
                                                    name="url"
                                                    placeholder="https://us00web.zoom.us/s/0123456789"
                                                    onChange={
                                                        this.handleZoomLink
                                                    }
                                                    style={{ outline: "none" }}
                                                    className="dod-input"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="bio"
                                                    className="dod-label  dod-stack-4"
                                                    style={{ color: "#1b4d94" }}
                                                >
                                                    Event Description (500
                                                    characters max)
                                                </label>
                                                <textarea
                                                    maxLength={500}
                                                    name="bio"
                                                    placeholder="Briefly describe the event!"
                                                    className="dod-input dod-stack-4"
                                                    onChange={
                                                        this
                                                            .handleDescriptionLimit
                                                    }
                                                    style={{ outline: "none" }}
                                                    defaultValue={""}
                                                />
                                                {this.state.descriptionLimit >
                                                0 ? (
                                                    <label>
                                                        Characters left:{" "}
                                                        {
                                                            this.state
                                                                .descriptionLimit
                                                        }
                                                    </label>
                                                ) : (
                                                    <label>
                                                        Characters left:{" "}
                                                        {
                                                            this.state
                                                                .descriptionLimit
                                                        }{" "}
                                                        - No more characters
                                                        allowed!
                                                    </label>
                                                )}
                                            </div>
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="mathsButton"
                                                    data-name="math"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Math
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="physicssButton"
                                                    data-name="physics"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Physics
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="chemistrysButton"
                                                    data-name="chemistry"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Chemistry
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="biologyButton"
                                                    data-name="biology"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Biology
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="computerscienceButton"
                                                    data-name="cs"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                CS
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="engineeringButton"
                                                    data-name="engineering"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Engineering
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="humanitiesButton"
                                                    data-name="humanities"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Humanities
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="musicsButton"
                                                    data-name="music"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Music
                                            </label>
                                            {"\u00A0"}
                                            {"\u00A0"}
                                            <label>
                                                <input
                                                    name="test2"
                                                    type="radio"
                                                    id="otherButton"
                                                    data-name="other"
                                                    onChange={
                                                        this.handleCategoryCount
                                                    }
                                                />
                                                Other
                                            </label>
                                            {this.state.alert == true ? (
                                                <label htmlFor="name">
                                                    <b>
                                                        <br></br>You can only
                                                        select up to two
                                                        categories
                                                    </b>
                                                </label>
                                            ) : (
                                                <label htmlFor="name"></label>
                                            )}
                                            <br />
                                            <button
                                                class="dod-button"
                                                type="submit"
                                                onClick={this.onSubmit}
                                                style={{ marginTop: "20px" }}
                                            >
                                                Post
                                            </button>
                                            <p
                                                style={{
                                                    display: "inline",
                                                    color: "#9c066c",
                                                }}
                                            >
                                                {"\u00A0"}
                                                {"\u00A0"}
                                                {this.state.errorMessage}
                                            </p>
                                        </form>
                                    </article>
                                </>
                            ) : (
                                <>
                                    <p>You must be logged in to make a post.</p>
                                </>
                            )}
                        </main>
                        <main
                            data-grid-area="main"
                            style={{
                                marginTop: "15px",
                                backgroundColor: "#fcfcfc",
                            }}
                        >
                            <center>
                                <LoginSetupContainer />
                            </center>
                        </main>
                    </section>
                </div>
            </>
        );
    }
}
