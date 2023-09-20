import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel
} from '@mui/material';
import { useEffect, useState } from 'react';

export default function HashTagsSorter({ hashTags, setHashTags }) {
    const [order, setOrder] = useState('date');

    useEffect(() => {
        if (order === "date") {
            const sortedHashTags = hashTags.slice().sort((a, b) => b.lastUsedDate - a.lastUsedDate);
            if (hashTags.some((hashTag, i) => hashTag !== sortedHashTags[i])) {
                setHashTags(sortedHashTags);
            }
        } else {
            // sort by used Times
            const sortedHashTags = hashTags.slice().sort((a, b) => b.count - a.count);
            if (hashTags.some((hashTag, i) => hashTag !== sortedHashTags[i])) {
                setHashTags(sortedHashTags);
            }
        }
    }, [order]);

    return (
        <FormControl>
            <FormLabel>Sort order</FormLabel>
            <RadioGroup
                row
                value={order}
                onChange={(e) => setOrder(e.target.value)}
            >
                <FormControlLabel value="date" control={<Radio />} label="Last used" />
                <FormControlLabel value="useTime" control={<Radio />} label="Used times" />
            </RadioGroup>
        </FormControl>
    );
}