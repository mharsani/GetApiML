import React from 'react';
import { Router, Link } from 'react-router';

export default class App extends React.Component {
  
  constructor() {
    super();
    this.state = {  value: '', items: [], itemID: [] }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
 handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    const url = fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${this.state.value}`)
    url.then(result=>result.json())
    .then(items=>this.setState({items: items.results.slice(0, 4)}))
  }
    handleClick(id, event){
      const response = fetch(`https://api.mercadolibre.com/items/${id}`);
      response.then(result=>result.json())
     .then(itemIDpicture=>this.setState({itemIDpicture: itemIDpicture.pictures[0].url}))
    
      const responseDescription = fetch(`https://api.mercadolibre.com/items/${id}/descriptions`);
      responseDescription.then(result=>result.json())
      .then(itemDescription=>this.setState({itemDescription: itemDescription[0].plain_text}))
      
    }
  render() {
    return (
<div>
   <header className="header">
      <nav className="header-navbar">
         <div className="header-navbar__logo">
            <img src="https://http2.mlstatic.com/ui/navigation/2.3.5/mercadolibre/logo__large.png" />
         </div>
         <form onSubmit={this.handleSubmit}>
            <label htmlFor="search"></label>
            <input id="search" className="header-navbar__input" type="text" value={this.state.value} onChange={this.handleChange} />
            <label htmlFor="search-submit"></label>
            <button id="search-submit"  className="header-navbar__button" type="submit" value="Submit"> <i className="fa fa-search" aria-hidden="true"></i></button>
         </form>
      </nav>
   </header>
   <div className="result">
      {this.state.items.map(item=>
      <div  className="result-list" key={item.id} id={item.id}  onClick={(e) =>
         this.handleClick(item.id,e)}>
         <div className="result-list__img">
            <img src={item.thumbnail}/ >
         </div>
         <div className="result-list__text">
            <div className="result-list__price">$ {item.price}</div>
            <div className="result-list__title">{item.title}</div>
         </div>
      </div>
      )}
   </div>
   <div className="product-page">
      <div>
         <img src= {this.state.itemIDpicture} />
         <div>{this.state.itemDescription}</div>
      </div>
   </div>
</div>
    
    );
  }
}