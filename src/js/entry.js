  var React = require('react');
  var ReactDom = require('react-dom');
  // var Input = React.createClass({
  // 	  getInitialState: function () {
  // 	  	 return {
  // 	  	 	value: ''
  // 	  	 }
  // 	  },
  // 	  onHandleChange: function () {
  // 	  	 this.setState({
  // 	  	 	value: this.refs.inp.value
  // 	  	 })
  // 	  },
  // 	  render: function () {
  // 	  	 return (
  //           <div>
  //               <input ref="inp" type="text" onChange={this.onHandleChange}/>
  //               <span>{this.state.value}</span>
  //           </div>
  // 	  	 )
  // 	  }
  // });
  // ReactDom.render(
  //     <Input></Input>,
  //     document.getElementById('root')
  // )
  var PRODUCTS = [
      {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
      {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
      {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
      {category: 'Electronics', price: '$99.99', stocked: true, name: 'ipod Touch'},
      {category: 'Electronics', price: '$199.99', stocked: false, name: 'iWatch'},
      {category: 'Electronics', price: '$399.99', stocked: true, name: 'iPad'},
  ];
  var SearchBar = React.createClass({
      onHandleChange: function () {
         this.props.changeFilerText( this.refs.inp.value );
      },
  	  render: function () {
  		  return (
  		     <div>
  		        <input type="text" ref='inp' onChange={this.onHandleChange}/>
  		        <br/>
  		        <input type="checkbox" onClick={this.props.changeOnlyStocked}/>
  		         <span>onlyShowStocked</span>
           </div>	
  		  )
    	  }
  });
  var ProductTable = React.createClass({
      componentWillMount: function () {
          this.onHandleChange();
      },
      shouldComponentUpdate: function (nextProps, nextState) {
          this.props = nextProps;
          this.onHandleChange();
          return true;
      },
      onHandleChange: function () {
          var lastCategroy = '';
          var rows = [];
          var _self = this;
          var products = this.props.products;
          products.forEach(function(ele, index){
              if(lastCategroy !== ele.category){
                 rows.push(
                    <ProductCategoryRow key={index} category={ele.category}></ProductCategoryRow>
                 )
              }
              lastCategroy = ele.category;
              if( !_self.props.onlyShowStocked || (_self.props.onlyShowStocked && ele.stocked)){
                 if(ele.name.indexOf(_self.props.filerText) !== -1){
                    rows.push(
                      <ProductRow key={index + 1000} stocked={ele.stocked} name={ele.name} price={ele.price}></ProductRow> 
                    )
                 }
              }
          })
             this.rows = rows;
      },
  	  render: function () {
	  	  return (
	  	  	  <table>
	              <thead>
	                  <tr>
	                     <th>name</th>
	                     <th>price</th>
	                  </tr>
	              </thead>
	              <tbody>
	                     {
                        this.rows
                       }
	              </tbody>

	  	  	  </table>
	         	
	  	  )
  	}
  });
    var ProductCategoryRow = React.createClass({
    	render: function () {
	  	  return (
	         <tr style={ {fontWeight: 900, color: '#0ff'}}>
	             <td>{this.props.category}</td>
	         </tr>	
	  	  )
  	}
  });
  var ProductRow = React.createClass({
  	  render: function () {
	  	  return (
	         <tr style={ this.props.stocked ? {} : {color: '#f00'}}>
	             <td>{this.props.name}</td>
	             <td>{this.props.price}</td>
	         </tr>	
	  	  )
  	}
  });
  var App = React.createClass({
      getInitialState: function () {
        return{
          onlyShowStocked: false,
          filerText: ''
        }
      },
      changeOnlyStocked: function () {
        this.setState({
           onlyShowStocked: !this.state.onlyShowStocked
        })
      },
      changeFilerText: function (text) {
        this.setState({
          filerText: text
        })
      },
  	  render: function () {
  	  	return (
           <div>
              <SearchBar changeFilerText={this.changeFilerText} changeOnlyStocked={this.changeOnlyStocked}></SearchBar>
              <ProductTable filerText={this.state.filerText} onlyShowStocked={this.state.onlyShowStocked} products={this.props.products}></ProductTable>
           </div>     
  	    )
  	  }
  });
  ReactDom.render(
     <App products={PRODUCTS}></App>,
     document.getElementById('root')

 )