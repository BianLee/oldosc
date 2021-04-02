import React from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/styles.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import firebase from "firebase";
import ReactLoading from "react-loading";
import sponsorpic from "../images/interstem.png";
import logo from "../images/logo.png";
export default class HomeMainComponent extends React.Component {
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
            message: "Apply filter",
            messageTwo: "Sort by",
            messageThree: "Search",

            permDate: "",
            permDescription: "",
            permTitle: "",
            permCategory: "",
            permID: "",
            permZoom: "",

            amountOfPages: 0,
            // amount of posts per page
            currentAmount: 16,
            // current page number (1 = first page)
            currentPlace: 1,
        };
    }

    componentDidMount = () => {
        this.getPost();
    };

    getPost = () => {
        // https://bianbackend.herokuapp.com/api/getMessage
        axios
            .get("https://server-opal-alpha.vercel.app/api/getMessage")
            .then((response) => {
                const data = response.data.reverse();
                this.setState({ posts: data });
                console.log("data has been received");
                const n = Math.ceil(this.state.posts.length / 16);
                this.setState({
                    amountOfPages: n,
                });
                //console.log(JSON.stringify(this.state.posts))
            })
            .catch(() => {
                alert("error retreving data!!");
            });
    };

    onChangeDate(date) {
        this.setState({
            date: date,
        });
    }

    /**
     * Modify the perm* variables to make the selected event either show a black dotted border
     * or to clear the border if it had been previously selected
     * @param e The event that happened
     */
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
                permCategory: "",
                permZoom: "",
            });
        } else {
            // console.log(e.target.dataset.zoomLink)
            this.setState({
                permDescription: e.target.dataset.description,
                permTitle: e.target.dataset.title,
                permID: e.target.dataset.id,
                permDate: e.target.dataset.date,
                permCategory: e.target.dataset.category,
                permZoom: e.target.dataset.zoom,
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
    handleCategoryCount = (e) => {
        // console.log(this.state.category);
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
        }

        {
            /*
        console.log(this.state.category); 
        if (this.state.categoryCount == 3) {
           this.setState({alert: false}) 
        }
        if (e.target.checked) {
            if (this.state.categoryCount > 2) {
                e.preventDefault(); 
                this.setState({alert: true}) 
            }
            else {
                this.setState({categoryCount: this.state.categoryCount + 1})
                this.setState({ category: [...this.state.category, e.target.id] }, function () {
                    console.log(this.state.category);
                });
            }
        }
        else {
            this.setState({categoryCount: this.state.categoryCount - 1})
            this.setState({category: this.state.category.filter(item => item !== e.target.id)}, function() {
                console.log(this.state.category); 
            })

        }
        */
        }
    };

    onUnselected = () => {
        this.setState({
            permDescription: "",
            permTitle: "",
            permID: "",
            permDate: "",
            permCategory: "",
            permZoom: "",
        });
    };
    onSelected = (id, title, category, date, link, description) => {
        // console.log(e.target.dataset.zoomLink)
        this.setState({
            permDescription: description,
            permTitle: title,
            permDate: date,
            permId: id,
            permCategory: category,
            permZoom: link,
        });
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
        axios
            .post(
                "https://server-opal-alpha.vercel.app/api/postMessage",
                message
            )
            .then((res) => console.log(res.data))
            .catch((error) => {
                console.log("Error!");
            });

        this.getPost();
        console.log("page update?");
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
                    {/*
                    <div className="icon-bar-container">
                        <div className="blackLine" />
                        <div className="icon-bar">
                            <a
                                href="https://github.com/BianLee/nhscyber.club"
                                target="_blank"
                                className="github"
                            >
                                <i className="fab fa-github fa-2x" />
                            </a>
                            <a
                                href="https://discord.gg/K4sVMn8"
                                target="_blank"
                                className="discord"
                            >
                                <i className="fab fa-discord fa-2x" />
                            </a>
                            <a
                                href="https://www.instagram.com/nhscybersecurity/"
                                target="_blank"
                                className="instagram"
                            >
                                <i className="fab fa-instagram fa-2x" />
                            </a>
                        </div>
                    </div>
                     */}
                    <section className="dod-layout-default">
                        <NavBar />
                        {/* 
                {this.state.posts.slice(0).reverse().map(post => {
                   return post.category.includes("science") ?
                        <p key={post.id}>science</p>
                    :
                    <p>Hello</p>
                })}
                */}

                        <PostDisplay
                            posts={this.state.posts}
                            onSelected={this.onSelected}
                            onUnselected={this.onUnselected}
                            currentPlace={this.state.currentPlace}
                            amountOfPages={this.state.amountOfPages}
                        />
                        {this.state.permTitle != "" &&
                        this.state.permCategory != "" ? (
                            <PostExtraInfo
                                title={this.state.permTitle}
                                category={this.state.permCategory}
                                link={this.state.permZoom}
                                date={this.state.permDate}
                                description={this.state.permDescription}
                            />
                        ) : (
                            <AboutUsBox />
                        )}
                        {/* 
               <>
                  <b><p style={{fontSize: "2rem", fontWeight: "lighter",  lineHeight: "40px"}}>{this.state.selectedTitle}{'\u00A0'}
                  <span id={this.state.selectedCategory} style={{fontSize: "20px"}}>{'\u00A0'}{this.state.selectedCategory}{'\u00A0'}</span>
                  </p></b>
                  
                  <br></br><a href={this.state.permZoom} target="_blank" style={{color: "purple"}}>{this.state.selectedZoom}</a>
                  <br></br><p>{this.state.selectedDate}</p>
            <br></br><p>{this.state.selectedDescription}</p>
               </> */}
                        {/* 
                {this.state.posts.map(post => {
                    return post.id == this.state.selectedID ?
                        <p key={post.id}>{post.description}</p>
                        :
                        <p></p>
                })}   
                */}
                        <FeaturedOrg />
                        {/* 
                        <footer data-grid-area="footer">
                            <br></br>
                            <span
                                style={{
                                    textDecoration: "none",
                                    fontSize: "25px",
                                }}
                            >
                                <a
                                    href="https://github.com/bianlee/opensourcecollage.com"
                                    target="_blank"
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "25px",
                                    }}
                                >
                                    {"\u00A0"}
                                    OSC+ ❤ Open Source: Become a contributor
                                    today!{" "}
                                </a>
                            </span>
                            <br />
                            <br />
                            <br />
                        </footer>*/}
                    </section>
                    <br />
                    <br />
                </div>
            </>
        );
    }
}

/**
 * The navigation bar and logo at the top of the page
 */
function NavBar(props) {
    function refreshPage() {
        window.location.reload(false);
    }

    return (
        <>
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
                                <img
                                    id="logo"
                                    src={logo}
                                    onClick={refreshPage}
                                ></img>
                            </div>
                        </Link>
                    </h1>
                </div>
                <p></p>
                {/* <Link to="/blog" style={{ marginLeft: "10px" }}>
                                Blog
                </Link> */}
                <a href="https://discord.gg/zPyjsCJ5Sn" target="_blank">
                    Discord
                </a>
                <a
                    href="https://github.com/BianLee/opensourcecollage.com"
                    target="_blank"
                    style={{ marginLeft: "10px" }}
                >
                    Contribute
                </a>
                <Link to="/management" style={{ marginLeft: "10px" }}>
                    Management
                </Link>
                {/* <Link to="/faq" style={{ marginLeft: "10px" }}>
                                FAQ
                </Link> */}
                <Link to="/post" style={{ marginLeft: "10px" }}>
                    Post
                </Link>
            </header>
        </>
    );
}

/**
 * The extra info about a specific post at the bottom of the page
 * @param {{
 *  title: string,
 *  category: string,
 *  link: string,
 *  date: string,
 *  description: string
 * }} props the info about the post, including the title of the event, the category that
 * the event is in, the link to the event, the date of the event, and the description of the
 * event
 */
function PostExtraInfo(props) {
    return (
        <>
            <main
                className="eventdesc"
                data-grid-area="main"
                id={"" + props.category + "border"}
            >
                <b>
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "lighter",
                            lineHeight: "30px",
                            fontFamiliy: "Giga Sans Light",
                        }}
                    >
                        {props.title}
                        {"\u00A0"}
                        <span id={props.category} style={{ fontSize: "20px" }}>
                            {"\u00A0"}
                            {props.category}
                            {"\u00A0"}
                        </span>
                    </p>
                </b>

                <br></br>
                <a
                    style={{
                        fontSize: "1rem",
                        fontWeight: "lighter",
                        lineHeight: "25px",
                        marginBottom: "10px",
                        fontFamiliy: "Giga Sans Light",
                    }}
                    href={props.link}
                    target="_blank"
                    style={{ color: "purple" }}
                >
                    {props.link}
                </a>
                <p
                    style={{
                        fontSize: "1rem",
                        fontWeight: "lighter",
                        lineHeight: "25px",
                        marginBottom: "10px",
                        fontFamiliy: "Giga Sans Light",
                    }}
                >
                    {props.date}
                </p>
                <p
                    style={{
                        fontSize: "1rem",
                        fontWeight: "lighter",
                        lineHeight: "25px",
                        marginBottom: "10px",
                        fontFamiliy: "Giga Sans Light",
                    }}
                >
                    {props.description}
                </p>
            </main>
        </>
    );
}

/**
 * The box at the bottom of the page with information about the organization
 * that shows up when no event is selected
 */
function AboutUsBox(props) {
    return (
        <main
            className="eventdesc"
            data-grid-area="main"
            style={{
                borderColor: "#bad0e6 ",
                borderStyle: "solid",
                borderWidth: "6px",
            }}
        >
            {" "}
            <p
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "lighter",
                    lineHeight: "30px",
                    marginBottom: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                Welcome to Open Source Collage!
            </p>
            <p
                style={{
                    fontSize: "1.3rem",
                    fontWeight: "lighter",
                    lineHeight: "25px",
                    marginBottom: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                <span style={{ color: "#00008B" }}>
                    As students, it's easy to feel lost in a myriad of
                    opportunities and finding the right extracurricular.
                </span>{" "}
                <span style={{ color: "#ad0778" }}>
                    Open Source Collage is a user-friendly platform designed to
                    help students develop their passion and discover new
                    opportunities through providing a search mechanism for
                    events, lectures, scholarships, competitions, and
                    organizations you can get involved with.
                </span>{" "}
                <span style={{ color: "#00008B" }}>
                    It also allows you to share your own events upon creating an
                    account, which will help you and your organization connect
                    with thousands of others in all parts of the country. Open
                    Source Collage also leads an effort on its own to bring
                    useful resources to students through facilitating new
                    connections between students and organizations, and through
                    the “featured organization” page, which is reserved for most
                    highly valuable opportunities and organizations.
                </span>
            </p>
            {/* 
            <p
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "lighter",
                    lineHeight: "30px",
                    marginBottom: "10px",
                    marginTop: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                What is <i>Open Source Collage</i> and how do I use this
                platform?
            </p>
            <p
                style={{
                    fontSize: "1rem",
                    fontWeight: "lighter",
                    lineHeight: "25px",
                    marginBottom: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                Open Source Collage is a platform...
            </p>*/}
        </main>
    );
}

/**
 * The Featured Organization box at the bottom of the page
 */
function FeaturedOrg(props) {
    return (
        <main
            className="featuredOrg"
            data-grid-area="main"
            style={{ marginTop: "18px" }}
        >
            <br></br>
            <div className="featured">
                <img src={sponsorpic}></img>
            </div>
            <p
                style={{
                    fontSize: "1.5rem",
                    fontWeight: "lighter",
                    lineHeight: "30px",
                    marginBottom: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                InterSTEM - Featured Organization
            </p>
            <p
                style={{
                    fontSize: "1rem",
                    fontWeight: "lighter",
                    lineHeight: "25px",
                    marginBottom: "10px",
                    fontFamiliy: "Giga Sans Light",
                }}
            >
                InterSTEM is a non-profit organization that hopes to raise
                awareness about the relevance of STEM-related topics to the
                world. Functioning mainly online, this platform offers a
                tutoring service for students, updates readers about current
                news in STEM through articles and blog posts, and plans
                collaborative projects between high school and elementary
                students. Through the integration of science, technology,
                engineering, and mathematics, InterSTEM provides students of all
                backgrounds the opportunity to explore and dive deeper into the
                world of STEM. Learn more about InterSTEM{" "}
                <a
                    href="https://interstem.us"
                    target="_blank"
                    style={{ color: "purple" }}
                >
                    here
                </a>
                .<br></br>
                <br></br>
                <br></br>
            </p>
        </main>
    );
}

/**
 * The grid of posts at the top of the page, including the Prev and Next buttons, but not the filtering
 * props passed in are:
 *  posts: the list of posts to display
 *  selectedId: id of the selected post
 *  onClick: a function called whenever a post is clicked
 */
class PostGrid extends React.Component {
    constructor(props) {
        super(props);
        console.log("constructor", this.props);
        this.state = {
            currentAmount: 16,
            // current page number (1 = first page)
            currentPlace: 1,
            search: this.props,
        };
    }
    componentDidUpdate(prevProps) {
        if (this.props.posts.length !== prevProps.posts.length) {
            // number of posts changed, probably because one of the filters changed, so we should
            // move back to the first page
            const amountOfPages = Math.ceil(this.props.posts.length / 16);
            this.setState({
                currentAmount: 16,
                currentPlace: 1,
                amountOfPages: amountOfPages,
            });
        }
    }

    scrollPrev = (e) => {
        if (this.state.currentPlace > 1) {
            this.setState({
                currentAmount: this.state.currentAmount - 16,
                currentPlace: this.state.currentPlace - 1,
            });
        }
    };

    scrollNext = (e) => {
        const amountOfPages = Math.ceil(this.props.posts.length / 16);
        if (this.state.currentPlace < amountOfPages) {
            this.setState({
                currentAmount: this.state.currentAmount + 16,
                currentPlace: this.state.currentPlace + 1,
            });
        }
    };

    scrollNextTwo = (e) => {
        const amountOfPages = Math.ceil(17 / 16);
        if (this.state.currentPlace < amountOfPages) {
            this.setState({
                currentAmount: this.state.currentAmount + 16,
                currentPlace: this.state.currentPlace + 1,
            });
            console.log("hello");
        }
    };

    render() {
        console.log(this.state.currentAmount);
        const {
            posts,
            selectedId,
            onClick,
            search,
            searchEnabled,
        } = this.props;
        console.log(this.state, this.props);
        if (search.length == 0 && searchEnabled == false) {
            const amountOfPages = Math.ceil(posts.length / 16);
            return (
                <>
                    <div className="dod-media-grid dod-stack-15">
                        {posts
                            .slice(
                                this.state.currentAmount - 16,
                                this.state.currentAmount
                            )
                            .map((post) => (
                                <Post
                                    post={post}
                                    selected={selectedId == post._id}
                                    onClick={onClick}
                                />
                            ))}
                    </div>
                    <br />
                    <a
                        style={{
                            cursor: "pointer",
                            color: "purple",
                        }}
                        onClick={this.scrollPrev}
                    >
                        ← Prev
                    </a>
                    <a
                        style={{
                            marginLeft: "20px",
                            cursor: "pointer",
                            color: "purple",
                        }}
                        onClick={this.scrollNext}
                    >
                        Next →
                    </a>
                    <a
                        style={{
                            marginLeft: "20px",
                            color: "purple",
                        }}
                    >
                        {this.state.currentPlace} of {amountOfPages}
                    </a>
                </>
            );
        } else {
            var amountOfPages = Math.ceil(search.length / 16);
            if (amountOfPages == 0) {
                amountOfPages = 1;
            }
            return (
                <>
                    <div className="dod-media-grid dod-stack-15">
                        {search
                            .slice(
                                this.state.currentAmount - 16,
                                this.state.currentAmount
                            )
                            .map((post) => (
                                <Post
                                    post={post}
                                    selected={selectedId == post._id}
                                    onClick={onClick}
                                />
                            ))}
                    </div>
                    <br />
                    <a
                        style={{
                            cursor: "pointer",
                            color: "purple",
                        }}
                        onClick={this.scrollPrev}
                    >
                        ← Prev
                    </a>
                    <a
                        style={{
                            marginLeft: "20px",
                            cursor: "pointer",
                            color: "purple",
                        }}
                        onClick={this.scrollNextTwo}
                    >
                        Next →
                    </a>
                    <a
                        style={{
                            marginLeft: "20px",
                            color: "purple",
                        }}
                    >
                        {this.state.currentPlace} of {amountOfPages}
                    </a>
                </>
            );
        }
    }
}

/**
 * The display for all the posts, including the grid of posts, the Next and Prev buttons, and
 * the filtering logic
 *
 * takes the functions `onUnselected` and `onPostSelected` in props
 * `onUnselected()` is called when the user unselects any event, leaving no events selected
 * `onSelected(id, title, category, date, link, description)` is called when the user selects on
 * a new post
 */
class PostDisplay extends React.Component {
    constructor(props) {
        super(props);
        // this.searchKeyWord = this.searchKeyWord.bind(this);
        this.state = {
            showMessage: false,
            message: "Apply filter",
            messageTwo: "Sort by",
            messageThree: "Search",
            permId: "",
            search: "",
            searchEnabled: false,
            // categories selected in the filtering
            categories: [],
            // if any filter checkboxes are currently selected
            filteringEnabled: false,
            currentPlace: this.props.currentPlace,
            amountOfPages: this.props.amountOfPages,
        };
    }
    _showMessage = (bool, e) => {
        this.setState({
            showMessage: bool,
        });
        if (bool) {
            this.setState({
                message: "Collapse filter",
            });
        } else {
            this.setState({
                message: "Apply filter",
            });
        }
    };

    _showMessageTwo = (bool, e) => {
        this.setState({
            showMessageTwo: bool,
        });
        if (bool) {
            this.setState({
                messageTwo: "Collapse sort",
            });
        } else {
            this.setState({
                messageTwo: "Sort by",
            });
        }
    };

    _showMessageThree = (bool, e) => {
        this.setState({
            showMessageThree: bool,
        });
        this.setState({});
        if (bool) {
            this.setState({
                messageThree: "Collapse search",
            });
        } else {
            this.setState({
                messageThree: "Search",
            });
        }
    };

    unselectPost() {
        this.props.onUnselected();
        this.setState({
            permID: "",
        });
    }

    /**
     * Modify the perm* variables to make the selected event either show a black dotted border
     * or to clear the border if it had been previously selected
     * @param e The event that happened
     */
    handlePerm = (e) => {
        if (
            this.state.permTitle != "" &&
            e.target.dataset.id == this.state.permID
        ) {
            this.unselectPost();
        } else {
            const postInfo = e.target.dataset;
            this.props.onSelected(
                postInfo.id,
                postInfo.title,
                postInfo.category,
                postInfo.date,
                postInfo.zoom,
                postInfo.description
            );
            this.setState({ permID: postInfo.id });
        }
    };

    filterChanged = (e) => {
        console.log("hello");
        // don't keep posts selected after filters change because then a post might
        // be selected that isn't being shown
        this.unselectPost();

        // go back to the first page - if we don't do this, people might see just a blank
        // screen after changing the filters if they weren't originally on the first page

        /* 
        this.setState({
            currentAmount: 16,
            currentPlace: 1,
        });
        */

        const id = e.target.id;
        const category = id.replace("Button", "");
        if (document.getElementById(id).checked) {
            // someone checks a new category
            this.setState({
                categories: this.state.categories.concat([category]),
                filteringEnabled: true,
            });
        } else {
            if (this.state.categories.length === 1) {
                // categories is about to become empty
                this.setState({
                    filteringEnabled: false,
                });
            }
            this.setState({
                categories: this.state.categories.filter(
                    (item) => item !== category
                ),
            });
        }
    };

    /**
     * Whether to show the given post
     */
    shouldInclude = (post) => {
        if (!this.state.filteringEnabled) {
            // if filtering is not enabled, include everything
            return true;
        }
        return this.state.categories.some((category) =>
            post.category.includes(category)
        );
    };

    filterByLatestPosts = (e) => {
        var data = this.props.posts.reverse();
        this.setState({
            posts: data,
        });
    };

    filterByOldestPosts = (e) => {
        console.log("this clicked");
        var data = this.props.posts.reverse();
        this.setState({
            posts: data,
        });
    };

    searchKeyWord = (e) => {
        console.log(this.state.currentPlace);
        this.setState({
            searchEnabled: true,
        });

        if (e.target.value.length == 0) {
            console.log("resetting to 0");
            this.setState({
                search: [],
                searchEnabled: false,
            });
        } else {
            console.log(e.target.value);
            var data = this.props.posts.filter((p) => {
                return p.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
            });
            console.log(data);
            this.setState({
                search: data,
            });
            console.log(this.state.search);
        }
    };

    render() {
        console.log(this.state.currentPlace);
        return this.props.posts != "" ? (
            <main data-grid-area="main">
                {/* <h2 className="dod-heading-2 dod-stack-24">Upcoming events!</h2> */}
                <PostGrid
                    posts={this.props.posts.filter(this.shouldInclude)}
                    selectedId={this.state.permID}
                    onClick={this.handlePerm}
                    amountOfPages={this.state.amountOfPages}
                    search={this.state.search}
                    searchEnabled={this.state.searchEnabled}
                />
                <p
                    style={{
                        marginLeft: "20px",
                        display: "inline",
                    }}
                ></p>
                <a
                    style={{
                        cursor: "pointer",
                        display: "inline",
                    }}
                    onClick={this._showMessage.bind(
                        null,
                        !this.state.showMessage
                    )}
                >
                    {this.state.message}
                </a>{" "}
                {"\u00A0"}
                {"\u00A0"}
                <a
                    style={{
                        cursor: "pointer",
                        display: "inline",
                    }}
                    onClick={this._showMessageTwo.bind(
                        null,
                        !this.state.showMessageTwo
                    )}
                >
                    {this.state.messageTwo}
                </a>
                {"\u00A0"}
                {"\u00A0"}
                {"\u00A0"}
                <a
                    style={{
                        cursor: "pointer",
                        display: "inline",
                    }}
                    onClick={this._showMessageThree.bind(
                        null,
                        !this.state.showMessageThree
                    )}
                >
                    {this.state.messageThree}
                </a>
                <>
                    <div
                        style={{
                            display: this.state.showMessage ? "inline" : "none",
                        }}
                    >
                        <br></br>
                        <br></br>
                        <FilterBoxes onChange={this.filterChanged} />
                    </div>
                </>
                <>
                    <div
                        style={{
                            display: this.state.showMessageTwo
                                ? "inline"
                                : "none",
                        }}
                    >
                        <br></br>
                        <br></br>
                        <>
                            <label>
                                <input
                                    name="test2"
                                    type="radio"
                                    onChange={this.filterByLatestPosts}
                                    defaultChecked
                                />
                                Latest posts
                            </label>
                            {"\u00A0"}
                            {"\u00A0"}
                            <label>
                                <input
                                    name="test2"
                                    type="radio"
                                    onChange={this.filterByOldestPosts}
                                />
                                Oldest posts
                            </label>
                        </>
                    </div>
                </>
                <>
                    <div
                        style={{
                            display: this.state.showMessageThree
                                ? "inline"
                                : "none",
                        }}
                    >
                        <br></br>
                        <br></br>
                        <input
                            type="text"
                            name="name"
                            placeholder="Search Keyword"
                            className="dod-input"
                            style={{ outline: "none", width: "50%" }}
                            onChange={this.searchKeyWord}
                            autocomplete="off"
                        />
                        <br></br>
                        {}
                    </div>
                </>
            </main>
        ) : (
            <>
                <main data-grid-area="main">
                    <div className="dod-media-grid dod-stack-15">
                        <ReactLoading
                            type={"spin"}
                            color={"gray"}
                            height={70}
                            width={70}
                        />
                    </div>
                </main>
            </>
        );
    }
}

/**
 * The list of checkboxes that control what is being filtered
 */
class FilterBoxes extends React.Component {
    render() {
        return (
            <>
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="mathButton"
                    text="Math"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="physicsButton"
                    text="Physics"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="chemistryButton"
                    text="Chemistry"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="biologyButton"
                    text="Biology"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="csButton"
                    text="CS"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="engineeringButton"
                    text="Engineering"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="humanitiesButton"
                    text="Humanities"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="musicButton"
                    text="Music"
                />
                <FilterCheckbox
                    onChange={this.props.onChange}
                    id="otherButton"
                    text="Other"
                />
            </>
        );
    }
}

/**
 * Display a checkbox with text next to it, which is used in the filter UI
 * @param {{
 *  id: string,
 *  text: string
 *  onChange: any
 * }} props `id` is the id of the checkbox, `text` is the text displayed for the checkbox,
 * and `onChange` is called whenever the checkbox's state changes
 */
function FilterCheckbox(props) {
    return (
        <>
            <input id={props.id} type="checkbox" onChange={props.onChange} />
            <label htmlFor={props.id}>{props.text}</label>
            {"\u00A0"}
            {"\u00A0"}
        </>
    );
}

/**
 * A box representing a post in the grid at the top of the page
 * @param props The properties passed to the element, which are:
 *  post: the information about the post
 *  selected: whether the post has been selected by the user
 * onClick: a function called when a post is clicked
 */
function Post({ post, selected, onClick }) {
    let style = {};
    if (selected) {
        style = {
            borderStyle: "dotted",
            borderWidth: "2.5px",
            borderColor: "black",
        };
    }
    return (
        <>
            <div
                href="/dogs/frieda/"
                style={style}
                key={post._id}
                data-category={post.category}
                data-date={post.date}
                data-id={post._id}
                data-description={post.description}
                data-title={post.title}
                data-zoom={post.zoomLink}
                className="dod-card"
                id={`${post.category}`}
                onClick={onClick}
            >
                <p
                    className="dod-heading-3 dod-stack-16"
                    data-zoom={post.zoomLink}
                    data-description={post.description}
                    data-date={post.date}
                    data-id={post._id}
                    data-title={post.title}
                    data-category={post.category}
                >
                    {post.title}
                </p>
            </div>
        </>
    );
}
