import {  Text, TouchableOpacity  } from "react-native-web";
import { TextInput, IconButton, Button, Stack } from "@react-native-material/core";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react"

import { authLogin } from "../utils/auth";

const Login = ({ navigation, route }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <Stack
            direction="column"
            style={{
                justifyContent: 'center',
                height: '100%',
                padding:  20
            }}
        >
            <TextInput
                label="E-mail"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                leading={props => <Icon name="account" {...props} />}
    
    />
            <TextInput
                label="Senha"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                secureTextEntry={!showPassword}
                leading={props => <Icon name="lock" {...props} />}
                trailing={props => (
                    <IconButton 
                        onPress={() => setShowPassword(!showPassword)}
                        icon={props => <Icon name={showPassword ? "eye-off" : "eye"} {...props} />} 
                        {...props} />
                )}
            />
            <Button
                title="Entrar"
                onPress={async () =>{
                    if (email !== "" && password !== "") {
                        try{
                            await authLogin(
                                route.params.firebaseApp,
                                email,
                                password
                                );
                                route.params.setIsLoggedIn(true);
                        }catch(err){
                            alert("Deu ruim fio, não vai logar")
                        }
                    } else{
                        alert("Todos os campos são obrigatórios")
                    }

                }}  
                leading={(props) => <Icon name="send" {...props} />}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={{
                    paddingBottom: 10,
                    paddingTop: 10,
                    width:'100%',
                    textAlign: 'center'
                }}
            >
                <Text>Registrar</Text>
            </TouchableOpacity>
        </Stack>
    )
}

export default Login;