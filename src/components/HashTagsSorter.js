import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Box
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
        <Box sx={{ marginLeft: 4, marginRight: 4}}>
            <FormControl>
                <FormLabel>#タグ　履歴</FormLabel>
                <RadioGroup
                    row
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                >
                    <FormControlLabel value="date" control={<Radio />} label="新しい順" />
                    <FormControlLabel value="useTime" control={<Radio />} label="頻度順" />
                </RadioGroup>
            </FormControl>
        </Box>
    );
}