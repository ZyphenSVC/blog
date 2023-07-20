import React from "react"

import Footer from "../../../components/footer"
import NavigationSpacer from "../../../components/navigation-spacer"
import Seo from "../../../components/seo"

const variants = {
    paragraph: {
        color: "var(--color-primary)",
        display: "block",
        fontSize: "1em",
        marginTop: "0.67em",
        marginLeft: 0,
        marginRight: 0,
        visibility: "visible",
        position: "absolute"
    },
    header: {
        color: "var(--color-title)",
        display: "block",
        fontSize: "2em",
        marginTop: "0.67em",
        marginLeft: 0,
        marginRight: 0,
        fontWeight: "bold",
        visibility: "visible",
        position: "absolute",
        top: 0
    },
    gone: {
        visibility: "hidden"
    }
}

const ConjIndex = () => {
    return (
        <div className="main-page h-100">
            <Seo title="Posts" description="See and read all posts from Zyphen. I am a pretty good documenter." />
            <div className="container-fluid d-flex flex-column main-mh-100">
                <NavigationSpacer />
                <div className="container flex-grow-1">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-xl-8">
                            <h1><p className="main-reveal-text-short d-inline-block">Teeruta - To finish</p></h1>
                            <table>
                            <thead>
                            <tr>
                                <th></th>
                                <th>Past Tense</th>
                                <th>Present Tense</th>
                                <th>Future Tense</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Me (-nu)</td>
                                <td>Teeranu</td>
                                <td>Teerutunnanu</td>
                                <td>Teerutaanu</td>
                            </tr>
                            <tr>
                                <td>You (informal) (-vu)</td>
                                <td>Teeravu</td>
                                <td>Teerutunnavu</td>
                                <td>Teerutaavu</td>
                            </tr>
                            <tr>
                                <td>You (formal) (-ru)</td>
                                <td>Teeraru</td>
                                <td>Teerutunnaru</td>
                                <td>Teerutaaru</td>
                            </tr>
                            <tr>
                                <td>He (-du)</td>
                                <td>Teeradu</td>
                                <td>Teerutunnadu</td>
                                <td>Teerutaadu</td>
                            </tr>
                            <tr>
                                <td>She (-di)</td>
                                <td>Teerindi</td>
                                <td>Teerutunidi</td>
                                <td>Teerutaadi</td>
                            </tr>
                            <tr>
                                <td>We (-mu)</td>
                                <td>Teeramu</td>
                                <td>Teerutunnamu</td>
                                <td>Teerutaamu</td>
                            </tr>
                            <tr>
                                <td>They (-ru)</td>
                                <td>Teeraru</td>
                                <td>Teerutunnaru</td>
                                <td>Teerutaaru</td>
                            </tr>
                            </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default ConjIndex