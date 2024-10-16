import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import useStore from '../../createStore';


interface RatingProps {
    value: number;
    id: string,
}

export default function RatingGame({ value, id }: RatingProps & { id: string }) {
    const setRating = useStore((state) => state.setRating);
    return (
        <Rating
            name="text-feedback"
            value={value}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            defaultValue={0}
            max={5}
            onChange={(_event, newValue) => {
                if (newValue !== null) {
                    setRating(id, newValue);
                }
            }}
        />
    );
}
