export default function ProductCard(props){
 
  
    return(
        <div>
            <h1>{props.name}</h1>
            <img src={props.image} alt="random image" />
            <p>{props.price}</p>
            <button>buy now</button>
        </div>
    )
}