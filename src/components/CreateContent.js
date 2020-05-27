import React, { Component } from 'react';

class CreateContent extends Component {
    render() {
        return (
            <article>
                <h2>Create</h2>
                <form action="/create_process" method="post"
                    onSubmit={function (e) {
                        e.preventDefault();
                        this.props.onSubmit(
                            e.target.title.value,
                            e.target.desc.value
                        );

                    }.bind(this)}
                >
                    <p><input type="text" name="title" placeholder="제목을 적어주세요"></input></p>
                    <p><textarea name="desc" placeholder="내용을 적어주세요"></textarea></p>
                    <p><input type="submit" value="확인"></input></p>
                </form>
            </article>
        );
    }
}

export default CreateContent;