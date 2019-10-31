import React from 'react';
import { connect } from 'react-redux';
import Pic from '../../components/Pic/Pic';
import Loader from '../../components/UI/Loader/Loader';
import { startLoader, destroyLoader } from '../../store/actions/ui';
import { initFetch } from '../../store/actions/fetch';

class Gallery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        }
    }

    componentDidMount() {
        if(!this.props.imgs) {
            this.props.startLoader();
            this.props.initFetch();
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.props.loading === false) {
            return true;
        }

        if(this.props.imgs !==  nextProps.imgs) {
            return true;
        }

        return false;
    }

    renderContent = () => {
        const { imgs, loading, searchTerm } = this.props;
        if(imgs) {
            this.props.destroyLoader();
            if(imgs.length === 0) {
                return <h2 className="heading-secondary center">
                            No results for <strong>"{searchTerm}"</strong>
                       </h2>
            }
            return (
                imgs.map((val, index) => {
                return <Pic key={val.imgId} 
                            img={val} 
                            scrollPosition={this.props.scrollPosition}/>;
                })
            );
        }
        if(loading) {
            return <Loader width="80px"
                           height="80px"
                           top="7rem" 
                           left="50%"
                           transform="translate(-50%,0%)"/>;
        }
        return null;
    }

    render() {
        return (
            <section className="gallery">
                <h2 className="heading-secondary mb-small">- Gallery</h2>
                <div className="gallery__content">
                    {this.renderContent()}
                </div>
            </section>
        );
    }
}

const mapStateToProps = state => {
    return {
        imgs: state.fetchReducer.imgs,
        searchTerm: state.fetchReducer.searchTerm,
        loading: state.uiReducer.loading,
    }
}

export default connect(mapStateToProps, { destroyLoader, initFetch, startLoader })(Gallery);