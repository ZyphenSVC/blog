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
                                    <p>I am a 17 year old security researcher studying computer science.</p>
                                    <p>In my free time, I play CTFs, write stories, or do photography.</p>
                                </div>
                            </div>
                            <div className="col-lg-3 col-md-4 col-sm-7 col-8">
                                <div className="main-fade-in-animation-delay-1">
                                    <StaticImage width={300} height={300} className="main-fit-element main-circle" src="../img/profilepic.jpg" alt="Portrait" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6 offset-md-1">
                                <div className="main-fade-in-animation-delay-2">
                                    <LatestPost />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="skills" className="container-fluid mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-10 ">
                                <RevealAnimation animationClass="main-reveal-text">
                                    <h1>Here are my certifications.</h1>
                                </RevealAnimation>
                                <RevealAnimation animationClass="main-reveal-text-reverse">
                                    <p>I am committed to reaching the highest standards and pushing the limits of my knowledge.</p>
                                </RevealAnimation>
                            </div>
                        </div>
                        <RevealAnimation animationClass="main-fade-in-animation">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-md-3 col-sm-4 col-5">
                                    <a aria-label="CompTIA Security+ on Credly" target="_blank" rel="noopener noreferrer" href="https://www.credly.com/badges/9b6c81d3-8bfc-4472-b149-206db3e8b25a">
                                        <StaticImage width={256} height={256} className="main-badge" src="../img/Security.png" alt="CompTIA Security+" />
                                    </a>
                                </div>
                                <div className="col-md-7 col-12">
                                    <div className="row justify-content-center">
                                        <div className="col-sm-4 col-5">
                                            <a aria-label="MTA Networking Fundamentals on Certiport" target="_blank" rel="noopener noreferrer" href="https://portal.certiport.com/Portal/Pages/CredentialVerification.aspx">
                                                <StaticImage width={200} height={200} className="main-badge" src="../img/mtanf.png" alt="MTA Networking Fundamentals" />
                                            </a>
                                        </div>
                                        <div className="col-sm-4 col-5">
                                            <a aria-label="MTA Software Development Fundamentals on Certiport" target="_blank" rel="noopener noreferrer" href="https://portal.certiport.com/Portal/Pages/CredentialVerification.aspx">
                                                <StaticImage width={200} height={200} className="main-badge" src="../img/mtasdf.png" alt="MTA Software Development Fundamentals" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </RevealAnimation>
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
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-10">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <div className="card main-box main-color-surface">
                                        <div className="row align-items-center justify-content-center g-0">
                                            <div className="col-md-7">
                                                <div className="card-body">
                                                    <p className="h5 card-title">Egg Heads Cyber Team</p>
                                                    <p className="card-text m-0">During high school, I joined Egg Heads and became a team captain for cybersecurity competitions. We have placed first in state for a large majority of our competitions including CyberPatriot.</p>
                                                    <p className="card-text m-0"><a aria-label="Egg Heads Github" target="_blank" rel="noopener noreferrer" href="https://github.com/EggHeadsCTF">See website</a></p>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <StaticImage width={1024} height={768} className="img-fluid main-rounded-end-lg" src="../img/cypatxiii.jpg" alt="Egg Heads CP-XIV Team" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-10">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <div className="card main-box main-color-surface">
                                        <div className="row align-items-center justify-content-center g-0">
                                            <div className="col-md-7 order-md-2">
                                                <div className="card-body">
                                                    <p className="h5 card-title">ImaginaryCTF</p>
                                                    <p className="card-text m-0">This was a volunteering hobby I did on the side, but it became something larger. I have hosted international events, handled customer support and incidents, deployed new services, and ensured uptime and stability in security.</p>
                                                    <p className="card-text m-0"><a aria-label="ImaginaryCTF Website" target="_blank" rel="noopener noreferrer" href="https://imaginaryctf.org/">See website</a></p>
                                                </div>
                                            </div>
                                            <div className="col-md-5 order-md-1">
                                                <StaticImage width={1024} height={768} className="img-fluid main-rounded-start-lg" src="../img/ictf.png" alt="ImaginaryCTF Logo" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-10">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <div className="card main-box main-color-surface">
                                        <div className="row align-items-center justify-content-center g-0">
                                            <div className="col-md-7">
                                                <div className="card-body">
                                                    <p className="h5 card-title">CyberAvengers</p>
                                                    <p className="card-text">I'm proud to have been a part of CyberAvengers for all four years. I have played roles such as Vice President and Team Captain during my time here. Currently, I organize events and educate and mentor others about cybersecurity, leading my own workshops for school.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <StaticImage width={1024} height={768} className="img-fluid main-rounded-end-lg" src="../img/cypatxiv.jpg" alt="CyberAvengers Team" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-10">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <div className="card main-box main-color-surface">
                                        <div className="row align-items-center justify-content-center g-0">
                                            <div className="col-md-7 order-md-2">
                                                <div className="card-body">
                                                    <p className="h5 card-title">Future Business Leaders of America</p>
                                                    <p className="card-text">I am also proud being a member of FBLA for all four years, gaining achievements and placing nationally in competitions. I have also learned leadership, and continue to accomplish more in this.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5 order-md-1">
                                                <StaticImage width={1024} height={768} className="img-fluid main-rounded-end-lg" src="../img/fbla.jpg" alt="FBLA State Leadership Conference" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-md-10">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <div className="card main-box main-color-surface">
                                        <div className="row align-items-center justify-content-center g-0">
                                            <div className="col-md-7">
                                                <div className="card-body">
                                                    <p className="h5 card-title">Cyber Teams</p>
                                                    <p className="card-text">I have also been scouted out by teams such as Ducksociety and TeamlessCTF. I am proud to be with them, we have placed very high internationally and I continue to participate with them.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <StaticImage width={1024} height={768} className="img-fluid main-rounded-start-lg" src="../img/ducks0ci3ty.png" alt="Ducksociety Logo" />
                                            </div>
                                        </div>
                                    </div>
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center mb-4">
                            <div className="col-lg-10 text-center">
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <StaticImage width={1024} height={768} className="img-fluid main-rounded-start-lg" alt="CyberPatriot First State" />
                                </RevealAnimation>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="col-md-10">
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">Achievements</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
                                        <li><a aria-label="National Cyber Scholarship website" target="_blank" rel="noopener noreferrer" href="https://www.nationalcyberscholarship.org/winners-2021#block-yui_3_17_2_1_1620649009028_757451">National Cyber Scholar</a></li>
                                        <li><a aria-label="FBLA Nationals" target="_blank" rel="noopener noreferrer" href="https://www.fbla-pbl.org/">FBLA National Finalist for Management Information Systems</a></li>
                                        <li>AP Scholar with Honors</li>
                                    </ul>
                                </RevealAnimation>
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">CyberPatriot</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <ul>
                                        <li>CyberPatriot X - Semifinalist, Middle School</li>
                                        <li>CyberPatriot XI - Semifinalist</li>
                                        <li>CyberPatriot XII - Semifinalist, 1st Place Georgia</li>
                                        <li>CyberPatriot XIII - Semifinalist, 1st Place Georgia</li>
                                        <li>CyberPatriot XIV - Semifinalist, 1st Place Georgia</li>
                                    </ul>
                                </RevealAnimation>
                                <div className="d-inline-block">
                                    <RevealAnimation animationClass="main-reveal-text">
                                        <p className="h5">CTF Competitions</p>
                                    </RevealAnimation>
                                </div>
                                <RevealAnimation animationClass="main-fade-in-animation">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Rank</th>
                                                <th>Team or Alias</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr><td>PicoCTF 2019</td><td>43 / 60595</td><td>Egg Heads (Solo)</td></tr>
                                            <tr><td>NGA CTF 2019</td><td>35 / ???</td><td>Egg Heads</td></tr>
                                            <tr><td>ångstromCTF 2019</td><td>71 / 1570</td><td>Egg Heads</td></tr>
                                            <tr><td>TJCTF 2019</td><td>65 / 483</td><td>Egg Heads</td></tr>
                                            <tr><td>NeverLAN CTF 2020</td><td>114 / 1158</td><td>Egg Heads</td></tr>
                                            <tr><td>TJCTF 2020</td><td>298 / 1205</td><td>Egg Heads</td></tr>
                                            <tr><td>Newark Academy CTF 2020</td><td>76 / 968</td><td>Egg Heads</td></tr>
                                            <tr><td>NCL Fall 2020 Preseason</td><td>41 / 6072</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Fall 2020 Individual Game</td><td>38 / 6013</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Fall 2020 Team Game</td><td>27 / 957</td><td>Egg Heads</td></tr>
                                            <tr><td>X-MAS CTF 2020</td><td>9 / 1064</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>KSU ISA CTF 2020</td><td>3 / 12</td><td>sriadityavedantam</td></tr>
                                            <tr><td>JustCTF 2020</td><td>189 / 804</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>DiceCTF 2021</td><td>282 / 1059</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>NGA CTF 2021</td><td>17 / ???</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Spring 2021 Preseason</td><td>93 / 5794</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Spring 2021 Individual Game</td><td>29 / 4180</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Spring 2021 Team Game</td><td>26 / 922</td><td>Egg Heads</td></tr>
                                            <tr><td>National Cyber Scholarship Competition 2021</td><td>51 / 3277</td><td>sriadityavedantam</td></tr>
                                            <tr><td>HackTheBox Cyber Apocalypse 2021</td><td>140 / 4740</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>CSAW '21 Qualifiers</td><td>140 / 1216</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>H@cktivityCon 2021 CTF</td><td>37 / 1721</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>DownUnderCTF 2021</td><td>206 / 1594</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>TamilCTF 2021</td><td>16 / 333</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>DeconstruCT.F 2021</td><td>4 / 300</td><td>ducks0ci3ty</td></tr>
                                            <tr><td>pbctf 2021</td><td>44 / 210</td><td>The Teamless</td></tr>
                                            <tr><td>NCL Fall 2021 Preseason</td><td>56 / 6455</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Fall 2021 Individual</td><td>48 / 6481</td><td>sriadityavedantam</td></tr>
                                            <tr><td>NCL Fall 2021 Team</td><td>35 / 3917</td><td>Egg Heads</td></tr>
                                            <tr><td>UTCTF 2022</td><td>23 / 560</td><td>TAMU Cyber Club</td></tr>
                                            <tr><td>picoCTF 2022</td><td>27 / 7794</td><td>The Teamless A</td></tr>
                                        </tbody>
                                    </table>
                                </RevealAnimation>
                            </div>
                        </div>
                    </div>
                </section>
                <section id="hobbies" className="container-fluid mb-5">
                    <div className="container h-100">
                        <div className="row justify-content-center">
                            <div className="col-md-10">
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
