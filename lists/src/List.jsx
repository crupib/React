/* eslint-disable react/prop-types */
function List(props) {
    const itemList = props.items;
    const category = props.category;
    itemList.sort((a,b) => a.name.localeCompare(b.name));
    //fruits.sort((a,b) => a.name.localeCompare(b.name));
    //fruits.sort((a,b) => b.name.localeCompare(a.name));
    //fruits.sort((a,b) => a.calories - b.calories);
    //fruits.sort((a,b) => b.calories - a.calories);
    //const lowCalFruits = fruits.filter(fruit => fruit.calories < 100)
    //const highCalFruits = fruits.filter(fruit => fruit.calories > 100)
    const listItems = itemList.map(item => <li key={item.id}>
        {item.name}: &nbsp;
        <b>{item.calories}</b> </li>);
    //const listItems = lowCalFruits.map(lowCalFruits => <li key={lowCalFruits.id}>
    //                  {lowCalFruits.name}: &nbsp;
    //                  <b>{lowCalFruits.calories}</b> </li>);
    //const listItems = highCalFruits.map(highCalFruits => <li key={highCalFruits.id}>
    //    {highCalFruits.name}: &nbsp;
    //    <b>{highCalFruits.calories}</b> </li>);                 
    return(<>
    <h3>{category}</h3>
    <ol>{listItems}</ol></>);
}
export default List;