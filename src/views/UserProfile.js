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


class UserProfile extends React.Component {

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
          const name = await contract.methods.get().call()
          //const name = users[_name];
          this.setState({ name })
          // Setup local variables
          //const users = await contract.methods.get().call()
          //var name = users[_name]; // _name argument that was passed in by addUser()  
           // users.name = _name; // assign the passed in argument to a local variable
           // try - this.setState({ users.name })
          //const memehash = await contract.methods.get().call()
          //this.setState({ memehash })
        } else {
          window.alert('Smart contract not deployed to detected network.')
        }
      }
    
      constructor(props) {
        super(props)
    
        this.state = {
          memehash: '',
          contract: null,
          web3: null,
          buffer: null,
          account: null
        }
      }
    

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
            const recipient = this.recipient.value
            const amount = window.web3.utils.toWei(this.amount.value, 'Ether')
            this.transfer(recipient, amount)
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

                <div className="card-description">LONGDESCRIPTION</div><br />
                    
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
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar"
                        src={require("assets/img/waviii_ops.png")}
                      />
                    </a>
                    <h5 className="title">{this.state.name}</h5>
                    <p className="description">SUBTITLE</p>  
              <Card>               
                <div className="card-description">SHORTDESCRIPTION</div>             
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

export default UserProfile;
