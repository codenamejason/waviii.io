/*! waviii.io */
import React, { Component } from 'react';
import Web3 from 'web3';
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";
//import Meme from './abis/Meme2.json'
import Profile from './abis/Profile.json'

import { WaveTopBottomLoading } from 'react-loadingg';

//Mainnet Profile Contract: 0xecbc02279b7cd09d1d975bdfa471008da347d51d

const ipfsClient = require('ipfs-http-client')
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' }) // leaving out the arguments will default to these values


class EditProfile extends React.Component {

    async componentWillMount() {
        await this.loadWeb3()
        await this.loadBlockchainData()
      }
    
      async loadWeb3() {
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum)
          await window.ethereum.enable()
        }
        else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider)
        }
        else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
      }
    
      async loadBlockchainData() {
        const web3 = window.web3
        // Load account
        const accounts = await web3.eth.getAccounts()
        this.setState({ account: accounts[0] })
        const networkId = await web3.eth.net.getId()
        const networkData = Profile.networks[networkId]
        if(networkData) {
          const contract = web3.eth.Contract(Profile.abi, networkData.address)
          this.setState({ contract })

          const users = await contract.methods.get().call()
          this.setState({ users })
          console.log(this.state.users)
         // this.setState({ Users: users[] })
          //this.setState({ Users.name })

        } else {
          window.alert('Smart contract not deployed to detected network.')
        }
      }
    
      constructor(props) {
        super(props)
    
        this.state = {
          name: "",
          subtitle: "",
          sdescription: "",
          ldescription: "",
          weburl: "",
          imghash: "",
          contract: null,
          web3: null,
          buffer: null,
          account: null
        }
      }
    
      captureFile = (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        const reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({ buffer: Buffer(reader.result) })
          console.log('buffer', this.state.buffer)
        }
      }
    
      onSubmit = (event) => {
        event.preventDefault()
        console.log("Submitting file to ipfs...")

           this.state.contract.methods.set("Luc1d").send({ from: this.state.account }).on('transactionHash', (hash) => {
            this.setState({ loading: true })
            }).on('confirmation', (reciept) => {
              this.setState({ loading: false })
              window.location.reload()
            }).then((r) => {
             return this.setState({ name: "Luc1d" })
           })
      }
    
    
//      async loadWeb3() {
//        if (window.ethereum) {
//          window.web3 = new Web3(window.ethereum)
//          await window.ethereum.enable()
//        }
//        else if (window.web3) {
//          window.web3 = new Web3(window.web3.currentProvider)
//        }
//        else {
//          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
//          this.setState({ loading: true })
//          this.setState({ noEth: true })
//        }
//      }

handleName = event => {
  this.setState({ name: event.target.value });  
};

handleSubtitle = event => {
  this.setState({ subtitle: event.target.value });  
};

handleSdescription = event => {
  this.setState({ sdescription: event.target.value });  
};

handleLdescription = event => {
  this.setState({ ldescription: event.target.value });  
};

handleWeburl = event => {
  this.setState({ weburl: event.target.value });  
};

handleImghash = event => {
  this.setState({ imghash: event.target.value });  
};

  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
            <div className="card mb-4" >
            <div className="card-body" >


          <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            console.log("Submitting..")
            console.log(this.state.name); 
            console.log(this.state.subtitle);  
            console.log(this.state.sdescription);
            console.log(this.state.ldescription);
            console.log(this.state.weburl);
            //this.state.contract.methods.set(this.state.name).send({ from: this.state.account }).then((r) => {
            //  return this.setState({ _name: name })
            //})
          }}>

            <a  
                    className="title right"
                    href={`https://etherscan.io/address/${this.state.account}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                      <span>{this.state.account}</span>  
                  </a>
                  
                  <br /><br />

              <Card>
                <CardHeader>
                    <h5 className="title">Edit Profile:</h5>
            <div className="form-group">
              <input
                id="name"
                type="text"
                onChange={this.handleName} 
                className="form-control form-control-lg"
                placeholder="Name"
                />
            </div>
            <div className="form-group">
              <input
                id="subtitle"
                type="text"
                className="form-control form-control-lg"
                onChange={this.handleSubtitle} 
                placeholder="Subtitle"
                />
            </div>
            <div className="form-group">
              <input
                id="sdescription"
                type="text"
                className="form-control form-control-lg"
                onChange={this.handleSdescription} 
                placeholder="Short Description"
                />
            </div>
            <div className="form-group">
              <textarea
                id="ldescription"
                type="textarea"
                className="form-control form-control-lg"
                onChange={this.handleLdescription} 
                placeholder="Long Description"
                />
            </div>
            <div className="form-group">
              <input
                id="weburl"
                type="text"
                className="form-control form-control-lg"
                onChange={this.handleWeburl} 
                placeholder="Website URL"
                />
            </div>
                      <input className="btn btn-primary btn-block btn-lg" type="submit" value="Submit" />
                    
                </CardHeader>
              </Card>
              </form>
              </div></div>
            </Col>

            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <img className="avatar" src={`https://ipfs.infura.io/ipfs/${this.state.memehash}`} />
                      <Card>
                      <h5 className="title">Upload Profile Picture</h5>
                      <form onSubmit={this.onSubmit} >
                         <input type='file' onChange={this.captureFile} />
                          <input className="btn btn-primary btn-block btn-lg" type='submit' />
                      </form>
                      </Card>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default EditProfile;
