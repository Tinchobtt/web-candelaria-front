import './login.scss'
import Header from "../../layout/header/Header"
import { Button, FilledInput, FormControl, FormHelperText, IconButton, Input, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const {handleSubmit, handleChange, handleBlur, touched, values, errors} = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .required('Campo obligatorio'),
            password: Yup.string()
                .required('La contraseña es obligatoria')
        }),
        onSubmit: async (values, actions) => {
            try {
                const response = await fetch('http://localhost:8080/api/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(values),
                });

                if (!response.ok) {
                    throw new Error('Error en la autenticación');
                }
                //TODO: Guardar credenciales para confirmarlas en ProtectedRoutes
                navigate('/admin');
                
            } catch (error) {
                console.error('Error:', error);
            } finally {
                actions.resetForm(); 
            }
        }
    })

    return (
        <>
        <Header />
        <main id="main-login">
            <div className="login">
                <h2>Iniciar sesión</h2>
                <form className="login-form" onSubmit={handleSubmit}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.username && touched.username}>
                    <InputLabel htmlFor="filled-adornment-username">Usuario</InputLabel>
                    <FilledInput
                        type="text"
                        name="username"
                        label="username"
                        className='input-login'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                        error={!!errors.username && touched.username} // Esto también aplica el estilo de error al borde del input
                        aria-describedby="username-helper-text"
                    />
                    <FormHelperText id="username-helper-text">
                        {errors.username && touched.username && errors.username}
                    </FormHelperText>
                </FormControl>

                <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" error={!!errors.password && touched.password}>
                    <InputLabel htmlFor="filled-adornment-password">Contraseña</InputLabel>
                    <FilledInput
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        label="Password"
                        className='input-login'
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                        error={!!errors.password && touched.password} // Esto también aplica el estilo de error al borde del input
                        id="filled-adornment-password"
                        aria-describedby="password-helper-text"
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            >
                            {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                            </IconButton>
                        </InputAdornment>
                        }
                    />
                    <FormHelperText id="password-helper-text">
                        {errors.password && touched.password && errors.password}
                    </FormHelperText>
                </FormControl>

                    <Button type={'submit'} className="login-btn" size={"large"} variant='contained'>Ingresar</Button>
                </form>
            </div>
        </main>
        </>
    )
}
export default Login