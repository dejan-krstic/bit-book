import React, { Component } from 'react';
import { getData } from '../services/DataService'
import _ from 'lodash'
import FeedVideo from './FeedVideo';
import FeedText from './FeedText';
import FeedImage from './FeedImage';
import { Link } from 'react-router-dom';
import Loader from '../partials/Loader'

class FeedList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: {
                all: "",
                texts: "basic",
                images: "basic",
                videos: "basic"
            },
            postList: [],
            topMargin: "100px",
            filteredList: [],
            infiniteControl:15,
            dimensions: {},  // adjusting image modal top margin
        };
        this.onImgLoad = this.onImgLoad.bind(this);
    }

    renderFeed() {
        if (sessionStorage.getItem('sessionId')) {
        getData.fetchPosts()
        .then((result) => {
                this.setState({
                    postList: result,
                    filteredList: result
                })
            })
        }
    }

    showVideos = () => {
        let newPostList = [];
        this.state.postList.forEach(element => {
            if (element.type === 'video') {
                newPostList.push(element)
            }
        });
        this.setState({ 
            filteredList: newPostList,
            show: {
                all: "basic",
                texts: "basic",
                images: "basic",
                videos: ""
            },
         });
    }

    showImages = () => {
        let newPostList = [];
        this.state.postList.forEach(element => {

            if (element.type === 'image') {
                newPostList.push(element)
            }
        });
        this.setState({ 
            filteredList: newPostList,
            show: {
                all: "basic",
                texts: "basic",
                images: "",
                videos: "basic"
            },
         });
    }

    showAll = () => {
        this.setState(prevState => ({ 
            filteredList: prevState.postList,
            show: {
                all: "",
                texts: "basic",
                images: "basic",
                videos: "basic"
            },
         }));
    }

    showTexts = () => {
        let newPostList = [];
        this.state.postList.forEach(element => {
            if (element.type === 'text') {
                newPostList.push(element)
            }
        });
        this.setState({ 
            filteredList: newPostList,
            show: {
                all: "basic",
                texts: "",
                images: "basic",
                videos: "basic"
            },
         });
    }

    componentDidMount() {
        this.renderFeed()
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillReceiveProps(nextProps) {
        this.renderFeed()
    }

    /* shouldComponentUpdate(nextProps, nextState) {
        if ((nextProps.reRender === this.props.reRender) && _.isEqual(this.state.filteredList, nextState.filteredList) && (nextState.infiniteControl === this.state.infiniteControl)&&(nextState.topMargin === this.state.topMargin)) {
            return false;
        }
        return true;
    } */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    map = (post) => {
        if (post.type === "video") {
            return <Link to={`/${post.type}/${post.id}`}><FeedVideo key={post.id} post={post} /></Link>
        } else
            if (post.type === "text") {
                return <FeedText key={post.id} post={post} />
            } else {
                console.log(this.state.topMargin);
                return <FeedImage key={post.id} post={post} onLoad={this.onImgLoad} src={this.props.src} dimensions={this.state.dimensions} topMargin={this.state.topMargin} />
            }
    }

    onScroll = () => {  // 
        if ((window.innerHeight + window.scrollY) >= (document.getElementById('root').offsetHeight - 200) && this.state.filteredList.length > 8) {
            this.setState((prevState) => {
                return { infiniteControl: prevState.infiniteControl + 3 }
            })
        }
    }
    async onImgLoad({ target: img }) {    // adjusting image modal top margin
        await this.setState({
            dimensions: {
                height: img.offsetHeight,
                width: img.offsetWidth
            }
        });
        this.setState ({topMargin : (window.innerHeight - this.state.dimensions.height)/2 +"px"})
        
    }

        render() {
            return (
                <div className="container fluid">
                    <div className="row">
                        {/* {console.log(this.state.postList)} */}
                        <div className='text-align-center'>
                            <button className={`ui teal button ${this.state.show.images}`} onClick={this.showImages}>Show Images</button>
                            <button className={`ui red button ${this.state.show.texts}`} onClick={this.showTexts}>Show Texts</button>
                            <button className={`ui yellow button ${this.state.show.videos}`} onClick={this.showVideos}>Show Videos</button>
                            <button className={`ui orange button ${this.state.show.all}`} onClick={this.showAll}>Show All</button>

                        </div>
                        {_.isEmpty(this.state.filteredList) ?
                        <Loader /> :
                        this.state.filteredList.slice(0, this.state.infiniteControl).map(this.map)
                        }
                    </div>
                </div>
            );
        }
    }

    export default FeedList;