import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import useStore from '../../createStore';

interface RatingProps {
    value: number;
    id: string;
    onChange: (event: React.ChangeEvent<{}>, newValue: number | null) => void;
}

export default function RatingGame({ value, id, onChange }: RatingProps) {
    const [rating, setRatingState] = useState(value);
    const setRating = useStore((state) => state.setRating);
    const decreasePendingRatings = useStore((state) => state.decreasePendingRatings);
    const ratings = useStore((state) => state.ratings);

    useEffect(() => {
        setRatingState(value);
    }, [value]);

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        if (newValue !== null) {
            setRatingState(newValue);
            setRating(id, newValue);
            onChange(event, newValue);

            if (!ratings[id]) {
                decreasePendingRatings();
            }
        }
    };

    return (
        <Rating
            name={`rating-${id}`}
            value={rating}
            precision={0.5}
            emptyIcon={<StarIcon style={{ opacity: 0.2, color: 'white' }} fontSize="inherit" />}
            defaultValue={0}
            max={5}
            onChange={handleRatingChange}
        />
    );
}