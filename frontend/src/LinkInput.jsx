import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";
import axios from "axios";

export const LinkInput = () => {
    const [link, setLink] = useState('')

    const onSubmit = () => {
        console.log('test')
        axios.post('http://localhost:3000/data', {encryptedString: link},).then(() => {
            setLink('')
        })
    }

    return (
        <Box display="flex" flexDirection="column" width={400} margin={"0 auto"} gap={2}>
            <TextField
                label="Enter link"
                variant="outlined"
                value={link}
                onChange={e => setLink(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={onSubmit}>Send Link</Button>
        </Box>
    )
}
