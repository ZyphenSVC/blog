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
                            <h1><p className="main-reveal-text-short d-inline-block">Yedirinchuta - To cross</p></h1>
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
                                <td>Yedirinchanu</td>
                                <td>Yedirinchutunnanu</td>
                                <td>Yedirinchutaanu</td>
                            </tr>
                            <tr>
                                <td>You (informal) (-vu)</td>
                                <td>Yedirinchavu</td>
                                <td>Yedirinchutunnavu</td>
                                <td>Yedirinchutaavu</td>
                            </tr>
                            <tr>
                                <td>You (formal) (-ru)</td>
                                <td>Yedirincharu</td>
                                <td>Yedirinchutunnaru</td>
                                <td>Yedirinchutaaru</td>
                            </tr>
                            <tr>
                                <td>He (-du)</td>
                                <td>Yedirinchadu</td>
                                <td>Yedirinchutunnadu</td>
                                <td>Yedirinchutaadu</td>
                            </tr>
                            <tr>
                                <td>She (-di)</td>
                                <td>Yedirinchindi</td>
                                <td>Yedirinchutunidi</td>
                                <td>Yedirinchutaadi</td>
                            </tr>
                            <tr>
                                <td>We (-mu)</td>
                                <td>Yedirinchamu</td>
                                <td>Yedirinchutunnamu</td>
                                <td>Yedirinchutaamu</td>
                            </tr>
                            <tr>
                                <td>They (-ru)</td>
                                <td>Yedirincharu</td>
                                <td>Yedirinchutunnaru</td>
                                <td>Yedirinchutaaru</td>
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