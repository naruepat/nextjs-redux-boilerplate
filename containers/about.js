import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Layout from '../components/layout';
import { getKittens } from '../api/kittens';
import * as kittensActions from '../actions/kittensActions';
/**
 * About component to show a list of kittens fetched from an external api.
 * Express api demo with nextJS coming soon!
 */
class About extends Component {
  static propTypes = {
    /**
     * an object response from api call, this is set from redux action.
     */
    kittens: PropTypes.object.isRequired,
    /**
     * A redux function to set the kittens fetched from the api.
     */
    setKittens: PropTypes.func.isRequired
  };

  componentWillMount() {
    const { setKittens } = this.props;
    getKittens().then(function (response) {
      console.log(response);
      setKittens(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { kittens } = this.props;
    return (
      <Layout title="About us">
        {
          kittens.data
          ? <div>
              <h2>About us</h2>
              <p>We are kittens: </p>
              <ul>
                {
                  kittens.data.map((cat, index) => {
                    return (
                      <li key={index}>
                        {cat.name}
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          : <p>Loading</p>
        }
      </Layout>
    )
  }
}

function mapStateToProps(state) {
  return {
    kittens: state.kittens
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(kittensActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(About);
