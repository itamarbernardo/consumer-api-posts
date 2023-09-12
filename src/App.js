import './App.css';
import { Component } from 'react';

import { loadPosts } from './utils/load-posts';
import { Posts } from './components/Posts';

class App extends Component{
  state = {
      posts: [ ]

    }

  async componentDidMount(){
    //Executa quando o componente é montado
    const postsAndPhotos = await loadPosts()
    this.setState({posts: postsAndPhotos}) //dá um setState pra preencher o array de posts com os dados carregados da API
  }

  componentDidUpdate(){
    //Executa toda vez que o componente é atualizado

  }

  componentWillUnmount(){
    //Executa toda vez que o componente é desmontado, quando a execução para, por exemplo

  }

  //Faz a mesma coisa da funcao abaixo
  render(){
    const { posts } = this.state

    return (
      <section className='container'>
        <Posts posts={posts}/>
      </section>

    );
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
