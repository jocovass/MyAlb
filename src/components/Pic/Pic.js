import React from 'react';
import { connect } from 'react-redux';
import svg from '../../img/sprite.svg';
import { likeImage, dislikeImage } from '../../store/actions/likes';
import { onAddImage, onRemoveImage } from '../../store/actions/db';

const Pic = (props) => {
    const { img, userId, userName, dbImgs, likeImage, isSignedIn, likes, dislikeImage, verified, onAddImage, onRemoveImage } = props;
    
    const onSaveImageClick = () => {
        const data = {...img, userName };
        likeImage(img.imgId);
        onAddImage(userId, data);
    };

    const onDeleteImageClick = () => {
        dislikeImage(img.imgId);
        onRemoveImage(userId, img.imgId);
    };

    const renderLikeButton = () => {
        if(isSignedIn && verified) {
            const isLiked = likes.includes(img.imgId);
            let isImgSaved = false;
            if(dbImgs) {
                isImgSaved = Object.keys(dbImgs.images).includes(img.imgId); 
            }
            if(isLiked || isImgSaved) {
                return (
                    <button onClick={onDeleteImageClick}>
                        <svg className="figure__icon figure__icon--heart liked">
                            <use xlinkHref={`${svg}#icon-heart`}></use>
                        </svg>
                    </button>
                    
                );
            } else {
                return (
                    <button onClick={onSaveImageClick}>
                        <svg className="figure__icon figure__icon--heart">
                            <use xlinkHref={`${svg}#icon-heart`}></use>
                        </svg>
                    </button>
                )
            }
        } else {
            return null;
        }
    };

    return (
        <figure className="figure">
            <img className="figure__pic" src={img.imgs.small} alt={img.alt}/>
            <figcaption className="figure__caption">
                <div className="figure__caption--top">
                    <p className="figure__author">by {img.madeBy}</p>
                    <a href={img.download} target="_blank" rel="noopener noreferrer">
                        <svg className="figure__icon figure__icon--download">
                            <use xlinkHref={`${svg}#icon-folder-download`}></use>
                        </svg>
                    </a>
                    {renderLikeButton()}
                </div>
                <div className="figure__caption--bottom">
                    <p className="figure__desc">{img.alt}</p>
                </div>
            </figcaption>
        </figure>
    );
}

const mapStateToProps = state => {
    return {
        token: state.authReducer.token,
        userId: state.authReducer.userId,
        userName: state.authReducer.userName,
        isSignedIn: state.authReducer.isSignedIn,
        verified: state.authReducer.verified,
        likes: state.likesReducer.likes,
        dbImgs: state.dbReducer.imgs,
    }
}

export default connect(mapStateToProps, 
                       { likeImage, dislikeImage, onAddImage, onRemoveImage })(Pic);