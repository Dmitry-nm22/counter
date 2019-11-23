import React from 'react';
import './App.css';
import Button from "./Button";

class App extends React.Component {

    componentDidMount() {
        this.restoreState()
    };

    saveState = (state) => {
        let stateToString = JSON.stringify(this.state);
        localStorage.setItem('store', stateToString)
    }

    restoreState =()=> {let state = {}, stringToState = localStorage.getItem('store');
        if (stringToState != null) {state = JSON.parse(stringToState)} this.setState(state)
    }



    state={
        count: 0,
        maxCount: 5,
        minCount: 0,
        incBtnDisabled: false,
        setBtnDisabled: false,
        incorrectNum: false
    };



    incCount = () => {
        if(this.state.count < this.state.maxCount){
            this.setState({count: this.state.count + 1}, this.incBtnDisabled)
        }
    }


    resCount = () =>{
        this.setState({
            count:  this.state.minCount,
            incBtnDisabled: false

        })
    }

    setStartValue = (min) => {
        this.setState({
            minCount: Number(min)
        }, this.checkInput)
    }

    setMaxValue = (max) => {
        this.setState({
            maxCount: Number(max)
        })
    }

    onSetValue = () => {
        this.setState({
            count: this.state.minCount
        }, () =>{this.saveState()} )

    }

    checkInput = () =>{
        if (this.state.minCount >=   this.state.maxCount || this.state.minCount < 0 || this.state.maxCount < 0){
            this.setState({setBtnDisabled: true,
                                 incorrectNum: true})
        }else {
            this.setState({setBtnDisabled: false, incorrectNum: false})
        }
    }

    incBtnDisabled =() =>{
        if(this.state.count === this.state.maxCount){
            this.setState({incBtnDisabled: true})
        }
    }


  render = () => {


      let changeStartValue = (event) => {
          let value = Number(event.currentTarget.value);
          this.setStartValue(value);
      }
      let changeMaxValue = (event) => {
          let value = Number(event.currentTarget.value);
          this.setMaxValue(value);
      }

      let classForInput = this.state.setBtnDisabled ? 'active' : ''
      let classForCount = this.state.count === this.state.maxCount ? 'dis' : ''




      return (
    <div className="App">
      <div className='Counter'>
          <div className={classForCount}> {this.state.count} </div>
          <Button title ='inc'
                  onClick={this.incCount}
                  disabled={this.state.incBtnDisabled}
          />
          <Button title='res'
                  onClick={this.resCount}

          />
      </div>
      <div className='Counter'>
          <input placeholder='max count'
                 type='Number'
                 value={this.state.maxCount}
                 onChange={changeMaxValue}
                 className={classForInput}
          />
          <input placeholder='min count'
                 type='Number'
                 value={this.state.minCount}
                 onChange={changeStartValue}
                 className={classForInput}
          />
          <Button title='set'
                  onClick={this.onSetValue}
                  disabled={this.state.setBtnDisabled}

          />
          {this.state.incorrectNum && <span className='span__item'>incorrect number</span>}
      </div>
    </div>
  );
}}

export default App;
