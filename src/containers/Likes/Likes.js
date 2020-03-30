import React from 'react';
import { connect } from 'react-redux';
import Pic from '../../components/Pic/Pic';
import Loader from '../../components/UI/Loader/Loader';

class Likes extends React.Component {

    renderPictures = () => {
        if(this.props.imgs === false) {
            return <Loader width="80px"
                    height="80px"
                    top="7rem"
                    left="50%"
                    transform="translate(-50%,0%)"/>;
        } else {
            if(this.props.imgs) {
                const imgs = Object.values(this.props.imgs.images);
                return imgs.map((val, index) => {
                    return <Pic key={val.imgId} img={val} />;
                });
            }

            return <h4 className="heading-fourth center">
                        You don't have any saved images.
                   </h4>;
        }
    }

    render() {
        return (
            <section className="gallery">
                <h2 className="heading-secondary mb-small">- Likes</h2>
                <div className="gallery__content">
                    {this.renderPictures()}
                </div>
            </section>
        );
    };
}

const mapStateToProps = state => {
    return {
        imgs: state.dbReducer.imgs,
    }
}

export default connect(mapStateToProps)(Likes);