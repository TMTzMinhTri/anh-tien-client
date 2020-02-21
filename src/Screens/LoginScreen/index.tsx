import React from 'react';
import './index.css';
import { useLocation, useHistory } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';
import { LayoutContext } from '../Layout/LayoutContext';
import { IResponse } from '../../Api';
import { IResponseLogin } from '../../modal/response/auth';

interface IinputForm {
    email: string,
    password: string,
}


export const LoginScreen: React.FC<{}> = () => {
    const that = React.useRef(null)
    let history = useHistory();
    let location = useLocation();
    let from  = location.state || { from: { pathname: "/" } };

    const [userInput, setUserInput] = React.useState<IinputForm>({ password: '', email: "" })
    const [error, setError] = React.useState<string>("")
    // const [disable, setDisable] = React.useState<boolean>(false)
    // const { SignIn } = React.useContext(LayoutContext)


    const submit = (e: React.FormEvent<HTMLElement>) => {
        e.preventDefault()
        // SignIn(userInput, (rsp: IResponse<IResponseLogin>) => {
        //     if (rsp.status === true) {
        //         history.replace(from);
        //     }
        //     else {
        //         if (rsp.error.code === "incorrect") {
        //             setError("Email hoặc password không đúng")
        //         }
        //     }
        // })
    }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target } = event, { value, name } = target
        if (error) setError("")
        setUserInput({ ...userInput, [name]: value })
    }

    //#region Paste images

    // const getBase64 = (file: any, cb: Function) => {
    //     let reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function () {
    //         cb(reader.result)
    //     };
    //     reader.onerror = function (error) {
    //         console.log('Error: ', error);
    //     };
    // }

    // const onPasteImage = (event: React.ClipboardEvent<HTMLInputElement>) => {
    //     const file = event.clipboardData.items[0].getAsFile()
    //     getBase64(file, (result: any) => {
    //         setImage(result)
    //     })
    // }
    // const checkPopup = () => {
    //     const check = setInterval(() => {
    //         const { popup } = this
    //         if (!popup || popup.closed || popup.closed === undefined) {
    //             clearInterval(check)
    //             this.setState({ disabled: '' })
    //         }
    //     }, 1000)
    // }
    //#endregion

    //#region Login Facebook
    // const startAuth = () => {
    //     if (!disable) {
    //         openPopup()
    //         // checkPopup()
    //         setDisable(true)
    //     }
    // }

    // const openPopup = () => {
    //     const width = 600, height = 600
    //     const left = (window.innerWidth / 2) - (width / 2)
    //     const top = (window.innerHeight / 2) - (height / 2)
    //     const url = `http://localhost:5000/api/v1/auth/facebook`
    //     console.log(that)

    //     // return window.open(url, '',
    //     //     `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    //     //   scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    //     //   height=${height}, top=${top}, left=${left}`
    //     // )
    // }
    //#endregion
    return <Container ref={that} >
        <Form onSubmit={submit} >
            {error && <Alert color="danger">{error}</Alert>}
            <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="email" onChange={onChange} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="password" onChange={onChange} />
            </FormGroup>
            {/* <FormGroup>
                    <Label for="test">test</Label>
                    <Input type="text" name="test" id="test" placeholder="password" onPaste={onPasteImage} />
                </FormGroup>
                {image.length > 0 && < img src={image} alt="asd" style={{width:500, height:300}}/>} */}
            <Button>Submit</Button>
        </Form>
    </Container>
}

