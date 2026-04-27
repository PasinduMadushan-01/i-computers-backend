export default function ProductCard(props){
 
  
    return(
        <div className="bg-red-400 border w-100" >
            <h1 className="text-white">{props.name}</h1>
            <img src={props.image} alt="random image" />
            <p>{props.price}</p>
            <button>buy now</button>
        </div>
    )
}