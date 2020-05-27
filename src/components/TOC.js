import React, { Component } from 'react';

class TOC extends Component {
    render() {
        var data = this.props.data;
        var lists = [];
        for (var i = 0; i < data.length; i++) {
            lists.push(<li key={data[i].id}><a data-id={data[i].id} href={"/content/" + data[i].id}
                onClick={function (id, event) {
                    event.preventDefault();
                    this.props.onChangePage(id);
                }.bind(this, data[i].id)}
            >{data[i].title}</a></li>)
        }
        return (
            <nav>
                <ul>
                    {lists}
                </ul>
            </nav>
        );
    }
}

export default TOC;