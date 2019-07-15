import React from 'react';

class TodoList extends React.Component {

  state = {
    data: []
  }

  componentDidMount = async () => {
    const resp = await fetch('http://localhost:8000/api/todo-list');
    const data = await resp.json();
    console.log({data, });
    this.setState({ data: data.data })
  }

  render() {

    const { data } = this.state;
    console.log(data.length);
    console.log(data);

    const test = data[0];
    console.log(test);

    return (
      <div>

        {data.map((item, index) => {
          return (
            <div key={index}>
              <p>{item.title}</p>
            </div>
          )
        })}

      </div>
    )
  }
}

export default TodoList;
