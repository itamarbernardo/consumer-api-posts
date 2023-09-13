import './styles.css';
import { Component } from 'react';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component{
  state = {
      posts: [ ],
      allPosts: [ ],
      page: 0,
      postsPerPage: 10,
      searchValue: ""
    }

  async componentDidMount(){
    //Executa quando o componente é montado

    const { page, postsPerPage } = this.state

    const postsAndPhotos = await loadPosts()
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos
    }) //dá um setState pra preencher o array de posts com os dados carregados da API
  }

  componentDidUpdate(){
    //Executa toda vez que o componente é atualizado

  }

  componentWillUnmount(){
    //Executa toda vez que o componente é desmontado, quando a execução para, por exemplo

  }


  loadMorePosts = () => {
    const {posts, allPosts, page, postsPerPage} = this.state
    const nextPage = page + postsPerPage
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

    posts.push(...nextPosts)

    this.setState({posts: posts, page: nextPage})

  }

  handleChange = (event) => {
    const {value} = event.target
    this.setState({searchValue: value})
  }

  //Faz a mesma coisa da funcao abaixo
  render(){
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length

    const filteredPosts = !!searchValue ? 
      (allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      }) ) 
      : 
      (posts)

    return (
      <section className='container'>
        <div className="search-container">
          {!!searchValue && (
              <h1>Search Value: {searchValue}</h1>
          )}

          <TextInput searchValue={searchValue} handleChange={this.handleChange}/><br/><br/>
        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts com a busca: {searchValue}</p>
        )}

        <div className="button-container">
          {!searchValue && (
              <Button text="Carregar mais posts" disabled={noMorePosts} handleClick={this.loadMorePosts}/>
          )}
        </div>

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

