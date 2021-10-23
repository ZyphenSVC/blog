import React from "react"
import ScrollTracker from "./scroll-tracker"
import ShareBanner from "./share-banner"

class PostSidebar extends React.Component {
    sidebarStyle = {
        paddingTop: 100,
        marginLeft: -30
    }
    static defaultProps = {
        shareUrl: "https://zyphensvc.github.io"
    }
    render() {
        return(
            <ScrollTracker>
                <div style={this.sidebarStyle}>
                    <p>Written by <br /><strong>ZyphenSVC</strong></p>
                    <p>Share this post!</p>
                    <ShareBanner shareUrl={this.props.shareUrl} />
                </div>
            </ScrollTracker>
        )
    }
}

export default PostSidebar