import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Header from '../components/Header'
import MainSection from '../components/MainSection'
import * as UserActions from '../actions'

const App = ({destinations, actions}) => (
  <div>
    <Header
      addDestination={actions.addDestination}
      fetchDestinations={actions.fetchDestinations}
    />
    <MainSection destinations={destinations} actions={actions} />
  </div>
)

App.propTypes = {
  destinations: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  destinations: state.destinations
})

const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(UserActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
