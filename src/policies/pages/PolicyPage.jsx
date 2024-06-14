import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePolicy from '../hooks/usePolicy';
import LoadSpinner from '../../components/LoadSpinner';
import { Button, Container, Divider, Stack, Typography } from '@mui/material';
import { useLocalStorageUser } from '../../users/providers/UserProvider';
import ROUTES from '../../routes/routesModel';

export default function PolicyPage() {
    const { id } = useParams();
    const { user } = useLocalStorageUser();
    const [signed, setSigned] = useState(false);
    const { isLoading, data, handleGetPolicy, handleSignPolicy } = usePolicy();
    const navigate = useNavigate();

    useEffect(() => {
        handleGetPolicy(id)
    }, [handleGetPolicy, id])

    useEffect(() => {
        if (data.signatures && user) {
            if (data.signatures.includes(user.id)) {
                setSigned(true)
            }
            else (setSigned(false))
        }
    }, [data, user])

    const handleButtonClick = () => {
        if (user) {
            handleSignPolicy(data.id, signed)
            window.location.reload();
        }
        else{
            navigate(ROUTES.LOGIN_PAGE)
        }
    }

    return (
        <>
            {!isLoading ?
                <>
                    <Typography variant='h1' align='center' sx={{ mb: '-2vh' }}>{data.title}</Typography>
                    <Typography variant='h5' align='center' sx={{ fontStyle: 'italic' }} >{data.subtitle}</Typography>
                    <Divider />
                    <Container sx={{ mt: '1%', minWidth: "75vw", minHeight: "40vh" }}>
                        <Typography>{data.description} </Typography>
                    </Container>
                    <Stack style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Typography>{data.signatures.length > 0 ? "Signatures: " + data.signatures.length : "No signatures!"}</Typography>
                        <Button variant='contained'
                            disabled={user && false}
                            onClick={() => handleButtonClick()}
                        >{!user ? "Log in to sign" : (!signed ? "Sign" : "Unsign")}</Button>
                    </Stack>
                </>
                : <LoadSpinner />
            }
        </>
    )
}
