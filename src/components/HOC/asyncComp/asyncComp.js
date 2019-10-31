import React from 'react';

const asyncComp = importComp => {
    return class extends React.Component {
        state = {
            component: null,
        }

        componentDidMount() {
            importComp()
                .then(resp => {
                    this.setState({ component: resp.default });
                })
        }

        render() {
            let C = this.state.component;

            return C ? <C {...this.props}/> : null;
        }
    };
}

export default asyncComp;