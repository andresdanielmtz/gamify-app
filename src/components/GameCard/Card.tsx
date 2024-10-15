
interface Props { 
    key?: string; 
    title: string;
    description: string;
    image: string;
}

export default function GameCard(props: Props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <p>{props.description}</p>
            <img src={props.image} alt={props.title} />
        </div>
    )
}