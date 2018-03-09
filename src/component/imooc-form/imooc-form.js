import React from 'react';

const ImoocForm = Comp => {
  class newComp extends React.Component{
    constructor(props) {
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, val){
      this.setState({
        [key]: val
      })
    }
    render(){
      return (
        <Comp handleChange={this.handleChange} {...this.props} state={this.state} />
      )
    }
  }
  return newComp
}

export default ImoocForm