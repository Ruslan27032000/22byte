import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Box, Button, TextField} from '@mui/material';
import {LinkInput} from "./LinkInput.jsx";

const App = () => {
    const [isLogged, setIsLogged] = useState(false)
    const {handleSubmit, register, errors} = useForm();

    const onSubmit = (data) => {
        if (data.login === 'admin' && data.password === 'admin') {
            setIsLogged(true)
        } else {
            alert('Invalid login or password');
        }
    };

    if (isLogged) return <LinkInput/>

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display="flex" flexDirection="column" width={400} margin={"0 auto"} gap={2}>
                <TextField
                    {...register("login", {required: true})}
                    name="login"
                    label="Login"
                    variant="outlined"
                    error={errors?.login}
                    helperText={errors?.login ? 'Login is required' : ''}
                />
                <TextField
                    {...register("password", {required: true})}
                    name="password"
                    label="Password"
                    variant="outlined"
                    type="password"
                    error={errors?.password}
                    helperText={errors?.password ? 'Password is required' : ''}
                />
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </Box>
        </form>
    )
};

export default App;
