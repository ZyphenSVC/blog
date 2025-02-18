import React from "react"
import { StaticImage } from "gatsby-plugin-image"

import Footer from "../components/footer"
import LatestPost from "../components/latest-post"
import NavigationSpacer from "../components/navigation-spacer"
import RevealAnimation from "../components/reveal-animation"
import Seo from "../components/seo"

class Home extends React.Component {
    render() {
        return (
            <div className="main-page h-100">
                <Seo title="Home" />
                <section id="intro" className="container-fluid main-mh-100 mb-5">
                    <NavigationSpacer />
                    <div className="container h-100">
                        <div className="row h-50 justify-content-center">
                            <div className="col-lg-7 col-md-6">
                                <h1 className="main-reveal-text-short">Hi, I'm Sriaditya.<br />I make things.</h1>
                                <div className="main-fade-in-animation">
                                    <p>Interested in Algebraic Geometry with extensions onto Discrete Mathematics.</p>
                                    <p>Emphasis on Elliptic Curves and Post-Quantum Cryptographic Applications.</p>
                                    <p></p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-7 col-8">
                                <div className="main-fade-in-animation-delay-1">
                                    <StaticImage width={300} height={300} className="main-fit-element main-circle" src="../img/face.jpg" alt="Portrait" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-1">
                                <div className="main-fade-in-animation-delay-2">
                                    <p><a href="https://zyphensvc.com/media/cv.pdf">Curriculum Vitae</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="experiences" className="container-fluid mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <h1>Below are some of my experiences.</h1>
                                    </RevealAnimation>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">Talks</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
                                        <li>Spring 2023 - Primes and Fakes, Carmichael and the Twisted Prime Omega Function</li>
                                        <ul>
                                            <li>University of Georgia Directed Reading Program Student Seminar, Athens, GA</li>
                                        </ul>
                                        <li>Fall 2023 - Rational Solutions to Pythagorean Triples</li>
                                        <ul>
                                            <li>University of Georgia Directed Reading Program Student Seminar, Athens, GA</li>
                                        </ul>
                                    </ul>
                                </RevealAnimation>
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">Research Experience</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
                                    <li>Undergraduate Research Assistant - Small Satellite Research Lab</li>
					<ul>
						<li>Topological Data Analyst - Data Science Team</li>
						<ul>
						  <li>Implementing and optimizing neural network algorithms with Algebraic Topology/Topological Data Analysis.</li>
						  <li>Working with NeRF (Neural Radiance Fields) in relation to satellite imaging.</li>
						  <li>Implementing prior research projects from Algebraic Geometry onto this project.</li>
            </ul>
					</ul>
					<li>Undergraduate Research Program</li>
					<ul>
						<li>Spring 2024 - Exceptional Lie Algebras and Focus on Coxeter-Dynkin Diagrams</li>
						<ul>
							<li>Readings: AG - Hartshorne, Royal Road - Holme, UAG - Miles Reid, Comm. Algebra - Eisenbud</li>
						</ul>
					</ul>
                                        <li>Directed Reading Program Mentee - UGA</li>
                                        <ul>
                                            <li>Spring 2025 - Focus on Birch and Swinnerton-Dyer Conjecture</li>
                                            <ul>
                                                <li>Mentored by Peter Cassels</li>
                                                <li>Content - "Arithmetic of Elliptic Curves", Joseph Silverman</li>
                                                <li>Reading Reasearch Papers, will update as we review them</li>
                                            </ul>
                                            <li>Fall 2023 - Focus on Elliptic Curves</li>
                                            <ul>
                                                <li>Mentored by Haiyang Wang</li>
                                                <li>Content - "Rational Points on Elliptic Curves, 2nd Edition", John Tate, Joseph Silverman</li>
                                            </ul>
                                            <li>Spring 2023 - Focus on Fermat's Little Theorem</li>
                                            <ul>
                                                <li>Mentored by Haiyang Wang</li>
                                            </ul>
                                        </ul>
                                        <li>Google 20% Time Project - Georgia Institute of Technology</li>
                                        <ul>
                                            <li>Applied Combinatorics</li>
                                            <ul>
                                                <li>Research project involving Dijkstra's algorithm with Eulerian Circuits.</li>
                                                <li>Implementation involved using open maps and coding in Java.</li>
                                            </ul>
                                        </ul>
                                        <li>ImaginaryCTF</li>
                                        <ul>
                                            <li>Created cryptographic competition problems using more efficient algorithms from IACR.</li>
                                        </ul>
                                    </ul>
                                </RevealAnimation>
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">Teaching Experience</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
					<li>Mathematics Tutor (Current) - Helped students in precalculus, calculus, and introductory proof classes</li>
                                        <li>Spring 2023 - Peer Learning Assistant, Calculus III for Science and Engineering - MATH 2270 (UGA, 1 section)</li>
                                        <li>Fall 2023 - Peer Learning Assistant, Calculus II for Science and Engineering - MATH 2260 (UGA, 1 section)</li>
                                    </ul>
                                </RevealAnimation>
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">Coursework</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
					<p classname="h6">Fall 2025</p>
					<ul>
						<li><b>Introduction to Algebraic Geometry - MATH8300</b></li>
					</ul>
                                        <p classname="h6">Summer 2024</p>
					<ul>
						<li><b>Data Structures - CSCI 2720</b></li>
					</ul>
					<p className="h6">Spring 2024</p>
                                        <ul>
                                            <li><b>Modern Algebra and Geometry II (Abstract Algebra) - MATH 6010</b></li>
                                            <ul>
                                                <li>Content - "Abstract Algebra: An Introduction, 3rd Edition", Thomas Hungerford</li>
                                                <li><a href="https://zyphensvc.com/media/AbstractAlgebraTextbook.pdf">My Notes</a></li>
                                            </ul>
                                            <li><b>Linear Algebra - MATH 3000</b></li>
                                        </ul>
                                        <p className="h6">Fall 2023</p>
                                        <ul>
                                            <li><b>Modern Algebra and Geometry I (Abstract Algebra) - MATH 6000</b></li>
                                            <ul>
                                                <li>Content - "Abstract Algebra: An Introduction, 3rd Edition", Thomas Hungerford</li>
                                                <li><a href="https://zyphensvc.com/media/AbstractAlgebraTextbook.pdf">My Notes</a></li>
                                            </ul>
                                            <li>Sequences and Series (Introduction to Real Analysis) - MATH 3100</li>
                                            <li>Calculus III for Science and Engineering - MATH 2270</li>
                                            <li>Systems Programming in C - CSCI 1730</li>
                                        </ul>
                                        <p className="h6">Spring 2023</p>
                                        <ul>
                                            <li>Introduction to Higher Mathematics (Introduction to Proofs) - MATH 3200</li>
                                            <li>Calculus II for Science and Engineering - MATH 2260</li>
                                            <li>Discrete Mathematics - CSCI 2610</li>
                                        </ul>
                                        <p className="h6">Fall 2022</p>
                                        <ul>
                                            <li>Calculus I for Science and Engineering - MATH 2250</li>
					    <ul>
						<li><a href="https://drive.google.com/file/d/18oajbLtEXl6UMGfV8U2BwxBucbkUGim7/view?usp=sharing">My Notes</a></li>
					    </ul>
                                            <li>Software Development in Java - CSCI 1302</li>
                                        </ul>
                                    </ul>
                                </RevealAnimation>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        )
    }
}

export default Home
