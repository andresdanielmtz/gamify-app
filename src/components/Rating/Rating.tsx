import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

interface RatingProps {
    value: number;
    id: string,
    onChange: (event: React.ChangeEvent<{}>, newValue: number | null) => void;

}

export default function RatingGame({ value, id, onChange }: RatingProps & { id: string }) {
    return (
        <Rating
            name={`rating-${id}`}
            value={value}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.2, color: "white" }} fontSize="inherit" />}
            defaultValue={0}
            max={5}
            onChange={onChange}
        />
    );
}
