import React, { Component } from 'react';
import { Modal } from 'react-bootstrap'
import AddGoods from '../AddGoods/AddGoods'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            goodsList: [
                { name: "p", category: "1", price: "$123" },
                { name: "p", category: "1", price: "$123" },
                { name: "p", category: "1", price: "$123" },
                { name: "p", category: "1", price: "$123" },
                { name: "p", category: "1", price: "$123" },
            ],

            isShowAddModal: false,
            // addedOne:{
            //     name:"peter",
            //     price:"$1",
            //     category:"test2"
            // }


        }

        this.closeAddModal = this.closeAddModal.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        // this.addGoods=this.addGoods.bind(this);
    }

    closeAddModal() {
        this.setState({ isShowAddModal: false })
    }

    showAddModal() {
        this.setState({ isShowAddModal: true })
    }

    addGoods(data){
        console.log(data);
        this.state.goodsList.push(data);
        this.setState({isShowAddModal: false ,goodsList : this.state.goodsList })
    }

    render() {
        return (
            <div>
                <button onClick={this.showAddModal}>add new goods</button>
                {

                    this.state.goodsList.map((item, index) => {
                        return <div key={index}>{item.name}-{item.category}-{item.price}</div>
                    })
                }

                <Modal show={this.state.isShowAddModal} >
                    <Modal.Header>
                        <Modal.Title>
                            Peter
                        </Modal.Title>

                    </Modal.Header>
                    <Modal.Body>
                        <AddGoods handleAddEvent={(data)=>this.addGoods.call(this,data)}></AddGoods>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}

export default Home;