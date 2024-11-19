import styled, { ThemeProvider } from "styled-components/native";
import theme from "@/theme";
import { View, Image, Text, TextInput, Pressable } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { Input, Icon } from "react-native-elements";
import { useCallback, useEffect, useState } from "react";
import { apiConfig } from "@/Utils/axios";
import { Alert } from "react-native";
import { router, useFocusEffect } from "expo-router"


export default function Login(){
 
 const [passwordVisible, SetPasswordVisible] = useState(true)
 const [email, setEmail] = useState('@')
 const [password, setPassword] = useState('_password_')
 const [loginError, setLoginError] = useState(false)


 const opacity = useSharedValue(0); // Opacidade inicial a 0 para efeito de fade-in
 const animatedImageStyle = useAnimatedStyle(() => {
    return {
        opacity: opacity.value,
        transform: [{ scale: withTiming(opacity.value, { duration: 800 }) }],
    };
});

useFocusEffect(
    useCallback(() => {
        // Resetar os estados ao abrir a tela
        SetPasswordVisible(true);
        setLoginError(false);
        setEmail('');
        setPassword('');
    }, [])
);

async function loginFunc()
    {
        try
            {
                //Ja que a API é padrão para todo o sistema, isolei as configurações gerais
                //e apenas importo elas aonde preciso e uso o método http que eu quero
                if(email != '' && password != ''){
                let res = await apiConfig.post('/login',{
                    email: email,
                    senha: password
                });

                if(res.status == 204){
                    setLoginError(true)
                }
                else
                {
                   router.push('/(Pagprof)') 
                }}
            }
            catch(error)
            {
                console.log(error)
                throw new Error('Erro ao logar... :');        
            }
        }
        {console.log(email)}
    return(
        <ThemeProvider theme={theme}>
        <Container>
                <Section>
                    
                    <Info>
                    <Image style={{height: 100, width: 300}} source={require('../../assets/images/Logo.png')}/>
                    </Info>

                    <Caixa>
                  
                    <View style={{marginTop: 40}}>
                       <Title> Login </Title>
                       <Subtitle2>Acesse a página do professor!</Subtitle2>
                       
                    </View>

                    <View style={{gap: 20}}>
                    {/* {email != '@' ? 
                            <Input placeholder="Email" onChangeText={text => setEmail(text)}/> 
                            :
                            <Input placeholder="Email" onChangeText={text => setEmail(text)} value=""/>} */}
                        <Input placeholder="Email" 
                        onChangeText={text => setEmail(text)}
                         value={email}
                         inputStyle={{
                         fontStyle: 'italic'
                         
                          }} 
                         leftIcon={
                  <Icon name="mail" type="material" size={22} color={theme.COLORS.BLUE_500} />
                }/> 
                       {/* Input de Senha */}
                       <Input 
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={passwordVisible} // Determina se a senha será visível ou não
        leftIcon={
          <Icon 
            name="lock"
            type="material"
            size={22}
            color={theme.COLORS.BLUE_500} // O ícone de "lock" ficará sempre visível
          />
        }
        inputStyle={{
            fontStyle: 'italic', // Aplica itálico ao texto digitado e ao placeholder
            
           
          }}
        rightIcon={
          password.length > 0 && ( // Mostrar o ícone de visibilidade apenas se o campo de senha não estiver vazio
            <Icon 
              name={passwordVisible ? "visibility-off" : "visibility"} // Alterna entre os ícones
              type="material"
              size={22}
              color={theme.COLORS.BLUE_500}
              onPress={() => SetPasswordVisible(!passwordVisible)} // Alterna a visibilidade da senha
            />
          )
        }
      />
                    </View>
                    <View style={{gap: 30}}>
                       <Button onPress={()=> loginFunc()}>
                         <Text style={{color: '#fff'}}>Entrar</Text>
                       </Button>
                    </View>
                  
                 
                    </Caixa>
                </Section>
        </Container>   
        </ThemeProvider> 
        )
}

const Container = styled.View`
    height: 100rem;
    background-color: ${({theme}) => theme.COLORS.WHITE_BLUE};
   
    `

const Title = styled.Text`
    font-size: ${({theme}) => theme.FONT_SIZE.XL};
    color: ${({theme}) => theme.COLORS.BLUE_500};
    margin-top: 2rem;
    text-align: center;
    font-style: italic

    `
    

const Subtitle = styled.Text`
font-size: ${({theme}) => theme.FONT_SIZE.LG};
font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
`
const Subtitle2 = styled.Text`
font-size: ${({theme}) => theme.FONT_SIZE.MD};
font-family: ${({theme}) => theme.FONT_FAMILY.REGULAR};
color: ${({theme}) => theme.COLORS.GRAY_200};
`

const Section = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-top: 5rem;
    `

const Info = styled.View`
    height: 35rem;
    width: 30rem;
    justify-content: center;
    align-items: center;
    background-color: ${({theme}) => theme.COLORS.BLUE_700};   
    border-bottom-left-radius: 2rem;
    border-top-left-radius: 2rem;
    `

const Caixa = styled.View`
    height: 35rem;
    width: 25rem;
    align-items: center;
    gap: 4rem;
    background-color: ${({theme}) => theme.COLORS.WHITE};
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    `
    
const Button = styled.Pressable`
    height: 2.5rem;
    width: 10rem;
    border-radius: 0.7rem;
    align-items: center;
    justify-content: center;
    background-color: ${({theme}) => theme.COLORS.BLUE_500};
    
    
    `

function loadData(controller: AbortController) {
    throw new Error("Function not implemented.");
}