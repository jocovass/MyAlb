import React from 'react';
import svg from '../../img/sprite.svg';
import { connect } from 'react-redux';
import axios from '../../axios';
import { initSearch } from '../../store/actions/fetch';
import { startLoader } from '../../store/actions/ui';

class Search extends React.Component {
    state = {
        bgUrl: {},
        inputValue: '',
    }

    componentDidMount() {
        axios.get('/photos/random?client_id=746eb8e8d57534c47c3767d711d036488ead28db069162c55692d64d433cb09f&query=landscape')
        .then(resp => {
            const bgs = {
                small: resp.data.urls.small,
                regular: resp.data.urls.regular,
                full: resp.data.urls.full,
            };
            this.setState({bgUrl: bgs});
        })
        .catch(error => console.log(error));
    }

    onInputChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    onSubmitHandler = (e) => {
        const { initSearch, startLoader } = this.props;
        e.preventDefault();
        startLoader();
        initSearch(this.state.inputValue);
        this.setState({ inputValue: '' });
    }

    render() {
        const bgm = {backgroundImage: `linear-gradient(to right, rgba(0,0,0,.5), rgba(0,0,0,.5)), url(${this.state.bgUrl.regular})`};
        
        return (
            <section className="search" style={bgm}>
                <div className="search__content">
                    <h1 className="heading-primary">
                        Quality Pictures
                        <span className="heading-primary__sub">- Using Unsplash API</span>
                    </h1>
                    <form className="search__form"
                            onSubmit={this.onSubmitHandler}>
                        <input className="search__input" 
                                type="text" 
                                placeholder="Search..." 
                                value={this.state.inputValue}
                                onChange={this.onInputChange} />
                        <button className="search__button">
                            <svg className="search__icon">
                                <use xlinkHref={`${svg}#icon-search`}></use>
                            </svg>
                        </button>
                    </form>
                </div>
            </section>
        );
    }
}

export default connect(null, { initSearch, startLoader })(Search);