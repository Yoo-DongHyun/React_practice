import React, { Component } from 'react';
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent"
import CreateContent from "./components/CreateContent"
import UpdateContent from "./components/UpdateContent"
import Subject from "./components/Subject"
import Control from "./components/Control"

import './App.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: 'welcome',
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web" },
      welcome: { title: 'welcome', desc: 'Hello, React' },
      contents: [
        { id: 1, title: 'HTML', desc: 'HTML is HyperText...' },
        { id: 2, title: 'CSS', desc: 'CSS is...' },
        { id: 3, title: 'JavaScript', desc: 'JavaScript is interactive' }
      ]

    }
  }
  getReadContent() {
    for (var i = 0; i < this.state.contents.length; i++) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
        break;
      }
    }
  }
  getContent() {
    var _title, _desc, _article = null;
    if (this.state.mode === 'welcome') {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>
    }
    else if (this.state.mode === 'read') {
      var _content = this.getReadContent();
      _title = this.getReadContent().title;
      _desc = this.getReadContent().desc;
      _article = <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
    }
    else if (this.state.mode === 'create') {
      _article = <CreateContent
        onSubmit={function (_title, _desc) {
          this.max_content_id++;
          var _contents = this.state.contents.concat({ id: this.max_content_id, title: _title, desc: _desc })
          this.setState({
            contents: _contents,
            mode: 'read',
            selected_content_id: this.max_content_id
          })
          //console.log(_title, _desc)
        }.bind(this)}
      ></CreateContent>
    }
    else if (this.state.mode === 'update') {
      _content = this.getReadContent();
      _article = <UpdateContent data={_content}
        onSubmit={function (_id, _title, _desc) {
          var _contents = Array.from(this.state.contents);
          console.log(_contents)
          for (var i = 0; i < _contents.length; i++) {
            if (_id === _content.id) {
              _contents[_id - 1].title = _title;
              _contents[_id - 1].desc = _desc;
            }
          }
          this.setState({ contents: _contents })
          this.setState({ mode: 'read' })

          //var _contents = this.state.contents.concat({ id: this.max_content_id, title: _title, desc: _desc })
          //this.setState({ contents: _contents })
          //console.log(_title, _desc)
        }.bind(this)}
      ></UpdateContent>
    }
    return _article
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: 'welcome' })
          }.bind(this)}
        ></Subject>
        <TOC
          onChangePage={function (id_num) {
            this.setState({ mode: 'read', selected_content_id: Number(id_num) })
          }.bind(this)}
          data={this.state.contents}>
        </TOC>
        <Control
          onChangeMode={function (_mode) {
            if (_mode === 'delete') {
              if (window.confirm(`${this.getReadContent().title}을(를) 정말 지우시겠습니까?`)) {
                var _contents = Array.from(this.state.contents)
                for (var i = 0; i < _contents.length; i++) {
                  if (_contents[i].id == this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                }
                this.setState({ contents: _contents, mode: 'welcome' })
                alert('삭제 완료')
              }
            }
            else { this.setState({ mode: _mode }) }

          }.bind(this)}
        ></Control>
        {this.getContent()}
      </div>
    );
  }
}

export default App;